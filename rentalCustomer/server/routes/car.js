const express = require('express')
const router = express.Router()

const Car = require('../models/Car')
const Rental_invoice = require('../models/Rental_invoice')

const getRentalPeriod = require('../lib/getRentalPeriod')
// @route GET api/posts/
// @desc Get cars 
// @access Private
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find({inspection_status: "VERIFIED"})
        
        res.json({
            success: true,
            message: 'Get cars successfully',
            cars
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
// @desc Get a car 
// @access Private
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const car = await Car.findOne({ _id: id })
        const dayRentalOfCar = await getRentalPeriod(id) 
        
        res.json({
            success: true,
            message: 'Get the car successfully',
            car,
            dayRentalOfCar
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