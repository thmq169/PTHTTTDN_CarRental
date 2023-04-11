const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const Car_owner = require('../../models/Car_owner')
const Personal_document = require('../../models/CarOwner_document')

const verifyToken = require('../../middlewares/auth')

// @route GET api/auth/
// @desc Check if user is logged in 
// @access Public
router.get('/', verifyToken, async (req, res) => {
    try {
        const rental_customer = await Rental_customer.findById(req.userId).select('-password')
        if (!rental_customer)
            return res.status(400)
                .json({
                    success: false,
                    message: 'User not found',
                })

        res.json({ success: true, message: 'User logged in', rental_customer })

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
        CIC_lincense, CIC_date } = req.body

    if (!username || !password || !email || !fullname || !phone_number || !address ||
        !CIC_lincense || !CIC_date)
        return res.status(400)
            .json({ success: false, message: 'Missing information sss' })

    try {
        const car_owner = await Car_owner.findOne({ username })

        // check for existing user  
        if (car_owner)
            return res.status(400)
                .json({ success: false, message: 'Username already taken' })


        // All good 
        const hashPassword = await argon2.hash(password)
        const newCar_owner = new Car_owner(
            {
                username,
                password: hashPassword,
                email, fullname, phone_number, address
            })
        await newCar_owner.save()

        // personal document
        const CIC = new Personal_document({
            lincense_ID: CIC_lincense,
            type: 'Citizen Identification Card',
            date: CIC_date,
            personal_ID: newCar_owner._id
        })

        await CIC.save()

        // Return token
        const accessToken = jwt.sign({ userId: newCar_owner._id }, process.env.ACCESS_TOKEN_SECRET);

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
        const car_owner = await Car_owner.findOne({ username })

        // check for existing user 
        if (!car_owner)
            return res.status(400)
                .json({ success: false, message: 'Incorrect username' })

        const passwordValid = await argon2.verify(car_owner.password, password)
        if (!passwordValid) {
            return res.status(400)
                .json({ success: false, message: 'Incorrect password' })
        }

        const accessToken = jwt.sign({ userId: car_owner._id }, process.env.ACCESS_TOKEN_SECRET);

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