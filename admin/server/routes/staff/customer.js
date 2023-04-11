const express = require('express')
const router = express.Router()

const Rental_customer = require('../../models/Rental_customer')
const moment = require('moment')

// @route GET api/posts/
// @desc Get cars 
// @access Private
router.get('/', async (req, res) => {
    try {
        const customer = await Rental_customer.find()
        res.json({
            success: true,
            message: 'Get customer successfully',
            customer
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
        const carData = await Car.findOne({ _id: id }).populate('owner_ID', ['fullname'])
        const documentData = await Car_document.find({car_ID: id})


        let {
            name, license_plates, image, type, manufacturer, manufacturer_year,
        fuel, seat, transmission, inspection_status, start_day, end_day , price
        } = carData

        start_day = moment(start_day).format('YYYY-MM-DD')
        end_day = moment(end_day).format('YYYY-MM-DD')

        let registration_id,registration_license, registration_date, registration_status,
        inspection_license_id, inspection_license, inspection_date, inspection_license_status,
        insurance_id, insurance_license, insurance_date, insurance_status

        documentData.forEach((document) => {
            if (document.type === 'Registration certificate') {
                registration_id = document._id
                registration_license = document.lincense_ID
                registration_date = moment(document.date).format('YYYY-MM-DD')
                registration_status = document.status
            }
            if (document.type === 'Inspection certificate') {
                inspection_license_id = document._id
                inspection_license = document.lincense_ID
                inspection_date = moment(document.date).format('YYYY-MM-DD')
                inspection_license_status = document.status
            }
            if (document.type === 'Insurance certificate') {
                insurance_id = document._id
                insurance_license = document.lincense_ID
                insurance_date = moment(document.date).format('YYYY-MM-DD')
                insurance_status = document.status
            }
        })

        const car = { name, license_plates, image, type, manufacturer, manufacturer_year, price,
        fuel, seat, transmission, inspection_status, start_day, end_day, registration_license, registration_date, registration_status,
            inspection_license, inspection_date, inspection_license_status, 
            insurance_license, insurance_date, insurance_status,
            registration_id,inspection_license_id,insurance_id}

        res.json({
            success: true,
            message: 'Get the car successfully',
            car
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