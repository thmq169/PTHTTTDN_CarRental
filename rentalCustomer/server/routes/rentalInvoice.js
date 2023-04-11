const express = require('express')
const router = express.Router()

const Rental_invoice = require('../models/Rental_invoice')
const verifyToken = require('../middlewares/auth')

const { verifyRentalDateStart, verifyRentalPeriod } = require('../lib/verifyRentalDateStart')

// @route POST api/posts/
// @desc Rent a car
// @access Private
router.post('/', verifyToken, async (req, res) => {
    const { start_day, end_day, 
        delivery_location, returning_location,
        car_ID, customer_ID, totalBill, payment_choice } = req.body

    try {
        const newRental_invoice = new Rental_invoice({
            start_day, end_day,
            delivery_location, returning_location,
            car_ID, customer_ID
        })

        await newRental_invoice.save();

        const invoiceID = newRental_invoice._id.toString()
        console.log(invoiceID.substring(invoiceID.length - 6))
        let invoiceCode = "HC#" + invoiceID.substring(invoiceID.length - 6)

        res.json({
            success: true,
            message: 'Booking successfull!',
            invoiceCode,
            prepayment: totalBill*payment_choice
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
router.get('/', verifyToken, async (req, res) => {
    try {
        const invoices = await Rental_invoice.find({ customer_ID: req.userId }).populate('customer_ID', ['fullname'])
        res.json({
            success: true,
            message: 'Get invoices successfully',
            invoices
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// @route GET api/posts/
// @desc Get invoice
// @access Private
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const invoice = await Rental_invoice.find({ _id: req.params.id, customer_ID: req.userId }).populate('customer_ID', ['fullname'])
        res.json({
            success: true,
            message: 'Get invoices successfully',
            invoice
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// @route PUT api/posts/
// @desc Update Returning location
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
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

        const postUpdateCondition = { _id: req.params.id, customer_ID: req.userId }

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
            updatePost
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

router.post('/dayCheck', async (req, res) => {
    const { day_check, car_id } = req.body
    console.log(day_check, car_id)
    try {
        if (!await verifyRentalDateStart(day_check, car_id))
            return res.status(400)
                .json({ success: false, message: 'Car is unavailable on ' + day_check })
        else
            return res.json({
                success: true,
                message: 'This date is valid'
            })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

router.post('/periodCheck', async (req, res) => {
    const { day_start, day_end, car_id } = req.body
    console.log(day_start, day_end, car_id)

    try {
        const unavailableDate = await verifyRentalPeriod(day_start, day_end, car_id)
        
        if (unavailableDate.length)
            return res.status(400)
                .json({ success: false, message: 'Car is unavailable', unavailableDate})
        else
            return res.json({
                success: true,
                message: 'This date is valid',
                unavailableDate
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