const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const Rental_customer = require('../models/Rental_customer')
const Personal_document = require('../models/RentalCustomer_document')
const Wishlist = require('../models/Wishlist')

const verifyToken = require('../middlewares/auth')

// @route GET api/auth/
// @desc Check if user is logged in 
// @access Public
router.get('/', verifyToken, async (req, res) => {
    try {
        const rental_customer = await Rental_customer.findById(req.userId).select('-password')
        const documents = await Personal_document.find({rentalCustomer_ID: req.userId})

        if (!rental_customer)
            return res.status(400)
                .json({
                    success: false,
                    message: 'User not found',
                })

        res.json({ success: true, 
            message: 'User logged in',
            user: rental_customer,
            documents })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
    const { username, password, email, fullname, phone_number, address,
        CIC_lincense, CIC_date,
        drive_lincense_type, drive_lincense, drive_lincense_date } = req.body

    if (!username || !password || !email || !fullname || !phone_number || !address ||
        !CIC_lincense || !CIC_date ||
        !drive_lincense_type || !drive_lincense || !drive_lincense_date)
        return res.status(400)
            .json({ success: false, message: 'Missing information' })

    try {
        const rental_customer = await Rental_customer.findOne({ username })

        // check for existing user  
        if (rental_customer)
            return res.status(400)
                .json({ success: false, message: 'Username already taken' })


        // All good 
        const hashPassword = await argon2.hash(password)
        const newRental_customer = new Rental_customer(
            {
                username,
                password: hashPassword,
                email, fullname, phone_number, address
            })
        await newRental_customer.save()

        // personal document
        const CIC = new Personal_document({
            lincense_ID: CIC_lincense,
            type: 'Citizen Identification Card',
            date: CIC_date,
            rentalCustomer_ID: newRental_customer._id
        })

        await CIC.save()

        const drive_lincense_document = new Personal_document({
            lincense_ID: drive_lincense,
            type: drive_lincense_type,
            date: drive_lincense_date,
            rentalCustomer_ID: newRental_customer._id
        })

        await drive_lincense_document.save()

        // wishlist
        const wishlist = new Wishlist({
            username: newRental_customer._id
        })
        await wishlist.save()

        // Return token
        const accessToken = jwt.sign({ userId: newRental_customer._id }, process.env.ACCESS_TOKEN_SECRET);

        return res.json({
            success: true,
            message: 'Register successfully',
            accessToken
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password)
        return res.status(400)
            .json({ success: false, message: 'Missing username and/or password' })

    try {
        const rental_customer = await Rental_customer.findOne({ username })

        // check for existing user 
        if (!rental_customer)
            return res.status(400)
                .json({ success: false, message: 'Incorrect username' })

        const passwordValid = await argon2.verify(rental_customer.password, password)
        if (!passwordValid) {
            return res.status(400)
                .json({ success: false, message: 'Incorrect password' })
        }

        const accessToken = jwt.sign({ userId: rental_customer._id }, process.env.ACCESS_TOKEN_SECRET);

        return res.json({
            success: true,
            message: 'User Logged in successfully',
            accessToken
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