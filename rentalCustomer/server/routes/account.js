const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/auth')

const Car = require('../models/Rental_customer')
const RentalCustomer_document = require('../models/RentalCustomer_document')
const Rental_customer = require('../models/Rental_customer')
const Wishlist = require('../models/Wishlist')
const Rental_invoice = require('../models/Rental_invoice')

// @route GET api/accout/
// @desc update  
// @access Private
router.put('/', verifyToken, async (req, res) => {
    const {
        fullname,
        username,
        address,
        email,
        phone_number,
        CIC_id,
        CIC_lincense_ID,
        CIC_date,
        driverLicense_id,
        driverLicense_lincense_ID,
        driverLicense_date,
    } = req.body

    let updateInfo = {
        fullname,
        username,
        address,
        email,
        phone_number
    }

    const updateInfoCondition = { _id: req.userId }

    let updateCIC = {
        lincense_ID: CIC_lincense_ID,
        date: CIC_date,
    }

    const updateCICCondition = { _id: CIC_id, rentalCustomer_ID: req.userId }

    let updateDriverLicense = {
        lincense_ID: driverLicense_lincense_ID,
        date: driverLicense_date,
    }

    const updateDriverLicenseCondition = { _id: driverLicense_id, rentalCustomer_ID: req.userId }

    updateInfo = await Rental_customer.findOneAndUpdate(updateInfoCondition, updateInfo, { new: true })
    updateCIC = await RentalCustomer_document.findOneAndUpdate(updateCICCondition, updateCIC, { new: true })
    updateDriverLicense = await RentalCustomer_document.findOneAndUpdate(updateDriverLicenseCondition, updateDriverLicense, { new: true })

    try {
        const cars = await Car.find({ inspection_status: "VERIFIED", rental_status: "AVAILABLE" })
        res.json({
            success: true,
            message: 'Update infor successfully',
            updateInfo,
            updateCIC,
            updateDriverLicense
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})



// @route GET api/accout/
// @desc getWishlist  
// @access Private
router.get('/wishlist', verifyToken, async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ username: req.userId }).populate('cars')

        res.json({
            success: true,
            message: 'get wishlist successfully',
            wishlist
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// @route POST api/accout/
// @desc getWishlist  
// @access Private
router.post('/wishlist/:id', verifyToken, async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ username: req.userId })

        const { cars } = wishlist

        let newCars = cars

        if (cars.includes(req.params.id)) {
            console.log("xóa")

            const index = wishlist.cars.indexOf(req.params.id);
            if (index > -1) {
                newCars = cars.splice(index, 1)
            }
        } else {
            newCars = cars.push(req.params.id)
        }

        const newWishlist = await Wishlist.findOneAndUpdate({ username: req.userId }, { ...wishlist, cars: newCars }, {new: true})

        res.json({
            success: true,
            message: 'get wishlist successfully',
            wishlist: await Wishlist.findOne({ username: req.userId }).populate('cars')
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

router.get('/history', verifyToken, async (req, res) => {
    try {
        const rentalInvoice = await Rental_invoice.find({ customer_ID: req.userId }).populate('car_ID').sort('start_day')

        res.json({
            success: true,
            message: 'get history successfully',
            rentalInvoice
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