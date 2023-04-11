const express = require('express')
const router = express.Router()

const Rental_customer = require('../../models/Rental_customer') 
const Rental_invoice = require('../../models/Rental_invoice')
const Rentalcustomer_documents = require('../../models/Rentalcustomer_document')
const Car_document = require('../../models/Car_document')

// const Rental_invoice = require('../../models/Personal_document')
const verifyToken = require('../../middlewares/auth')

const verifyRentalDate = require('../../lib/verifyRentalDate')

// @route POST api/posts/
// @desc Rent a car
// @access Private
router.post('/', verifyToken, async (req, res) => {
    const { start_day, end_day, delivery_location, returning_location,
        car_ID, customer_ID } = req.body

    if (!start_day || !end_day || !delivery_location || !returning_location ||
        !car_ID || !customer_ID)
        return res.status(400)
            .json({ success: false, message: 'Missing information' })

    if (!await verifyRentalDate(start_day, car_ID))
        return res.status(400)
            .json({ success: false, message: 'Car is unavailable on' + start_day })

    if (!await verifyRentalDate(end_day, car_ID))
        return res.status(400)
            .json({ success: false, message: 'Car is unavailable on' + end_day })

    try {
        const newRental_invoice = new Rental_invoice({
            start_day, end_day,
            delivery_location, returning_location,
            car_ID, customer_ID
        })

        await newRental_invoice.save();

        const invoiceID = newRental_invoice._id.toString()
        console.log(invoiceID.substring(invoiceID.length - 6))
        let invoiceCode = "HC#" + invoiceID

        res.json({
            success: true,
            message: 'Booking successfull!',
            invoiceCode
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// @route GET api/posts/
// @desc Get invoice
// @access Private
router.get('/', async (req, res) => {
    try {
        const invoices = await Rental_invoice.find()
                                        .populate('car_ID')
                                        .populate('customer_ID')
                                        .populate('staff_delivery_ID')
                                        .populate('staff_receive_ID')

        const test = await Rental_invoice.find({end_day: new Date('2023-04-09')})


        res.json({
            success: true,
            message: 'Get invoices successfully',
            invoices,
            test
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// @route GET api/posts/
// @desc Get invoice
// @access Private
router.get('/:id', async (req, res) => {
    try {
        const invoice = await Rental_invoice.findOne({ _id: req.params.id }).populate('customer_ID', ['fullname'])
        
        const car_documents = await Car_document.find({ car_ID: invoice.car_ID})

        const rentalcustomer_documents = await Rentalcustomer_documents.find({ rentalCustomer_ID: invoice.customer_ID})
        
        res.json({
            success: true,
            message: 'Get invoice successfully',
            invoice,
            car_documents,
            rentalcustomer_documents
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// @route PUT api/posts/
// @desc Update Returning location
// @access Private
router.put('/:id', async (req, res) => {
    const { start_day, end_day, delivery_location, returning_location,
        car_ID, customer_ID } = req.body

    if (!start_day || !end_day || !delivery_location || !returning_location ||
        !car_ID || !customer_ID)
        return res.status(400)
            .json({ success: false, message: 'Missing information' })

    try {
        let updateInvoice = {
            start_day, end_day, 
            delivery_location, 
            returning_location,
            car_ID, customer_ID
        }

        const postUpdateCondition = { _id: req.params.id }

        updateInvoice = await Rental_invoice.findOneAndUpdate(postUpdateCondition, updateInvoice, { new: true })

        // Post not found or user not authorised
        if (!updateInvoice)
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'invoice not found or user not authorised'
                })

        res.json({
            success: true,
            message: 'Update invoice successfully',
            updateInvoice
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})


router.put('/update/:id', async (req, res) => {
    const { start_day, end_day, delivery_location, returning_location,payment_status,general_status,transportation_status,
        car_ID, customer_ID } = req.body

    if (!start_day || !end_day || !delivery_location || !returning_location ||
        !car_ID || !customer_ID)
        return res.status(400)
            .json({ success: false, message: 'Missing information' })

    try {
        let updateInvoice = {
            start_day, end_day, 
            delivery_location, 
            returning_location,
            payment_status,
            general_status,
            transportation_status,
            car_ID, customer_ID
        }

        const postUpdateCondition = { _id: req.params.id }

        updateInvoice = await Rental_invoice.findOneAndUpdate(postUpdateCondition, updateInvoice, { new: true }).populate("customer_ID")
                                                                                                                    .populate("car_ID")

        // Post not found or user not authorised
        if (!updateInvoice)
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'invoice not found or user not authorised'
                })

        res.json({
            success: true,
            message: 'Update invoice successfully',
            updateInvoice
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})


router.put('/update/delivery/:id', async (req, res) => {
    const { general_status, transportation_status, idStaff } = req.body

    // if (!start_day || !end_day || !delivery_location || !returning_location ||
    //     !car_ID || !customer_ID)
    //     return res.status(400)
    //         .json({ success: false, message: 'Missing information' })

    try {
        let updateInvoice = {
        
            transportation_status,
            staff_delivery_ID: idStaff ? idStaff : null,
            general_status
        }

        const postUpdateCondition = { _id: req.params.id }

        updateInvoice = await Rental_invoice.findOneAndUpdate(postUpdateCondition, updateInvoice, { new: true }).populate('car_ID')
                                                                                                                .populate('customer_ID')
                                                                                                                .populate('staff_delivery_ID')

        // Post not found or user not authorised
        if (!updateInvoice)
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'invoice not found or user not authorised'
                })

        res.json({
            success: true,
            message: 'Update invoice successfully',
            updateInvoice
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

router.put('/update/receive/:id', async (req, res) => {
    const { general_status, transportation_status, idStaff } = req.body

    // console.log(general_status, transportation_status, idStaff);

    // if (!start_day || !end_day || !delivery_location || !returning_location ||
    //     !car_ID || !customer_ID)
    //     return res.status(400)
    //         .json({ success: false, message: 'Missing information' })

    try {
        let updateInvoice = {
        
            transportation_status,
            staff_receive_ID: idStaff ? idStaff : null,
            general_status
        }

        const postUpdateCondition = { _id: req.params.id }

        updateInvoice = await Rental_invoice.findOneAndUpdate(postUpdateCondition, updateInvoice, { new: true }).populate('car_ID')
                                                                                                   .populate('customer_ID')
                                                                                                                .populate('staff_receive_ID')
        console.log("receive\n",updateInvoice);
        // Post not found or user not authorised
        if (!updateInvoice)
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'invoice not found or user not authorised'
                })

        res.json({
            success: true,
            message: 'Update invoice successfully',
            updateInvoice
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})


// @route DELETE api/posts/
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
    const postDeleteCondition = { _id: req.params.id, user: req.userId }

    try {
        const deletePost = await Post.findOneAndDelete(postDeleteCondition)

        // Post not found or user not authorised
        if (!deletePost)
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Post not found or user not authorised'
                })

        res.json({
            success: true,
            message: 'Delete post successfully',
            deletePost
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})


module.exports = router