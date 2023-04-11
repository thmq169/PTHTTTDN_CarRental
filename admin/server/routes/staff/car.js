const express = require('express')
const router = express.Router()

const Car = require('../../models/Car')
const Car_document = require('../../models/Car_document')
const CarOwner_document = require('../../models/CarOwner_document')
const verifyToken = require('../../middlewares/auth')
const moment = require('moment')
// @route GET api/posts/
// @desc Get cars 
// @access Private
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find().populate('owner_ID')
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
        const carData = await Car.findOne({ _id: id }).populate('owner_ID')
        const documentData = await Car_document.find({car_ID: id})
        const carowner_documents = await CarOwner_document.findOne({carOwner_ID: carData.owner_ID})

        let {
            name, license_plates, image, type, manufacturer, manufacturer_year,
        fuel, seat, transmission, inspection_status, start_day, end_day , price, owner_ID
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
            registration_id,inspection_license_id,insurance_id, owner_ID, carowner_documents}

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

// @route PUT api/posts/
// @desc Update post
// @access Private
router.put('/:id', async (req, res) => {
    const { name, license_plates, image, type, manufacturer, manufacturer_year,
        fuel, seat, transmission, inspection_status, start_day, end_day,
        registration_license, registration_date, registration_status,
        inspection_license, inspection_date, inspection_license_status,
        insurance_license, insurance_date, insurance_status,
        registration_id,inspection_license_id, insurance_id, price } = req.body

    // if (!license_plates || !image || !type || !manufacturer || !manufacturer_year ||
    //     !fuel || !seat || !transmission || !inspection_status ||
    //     !registration_license || !registration_date || !registration_status ||
    //     !inspection_license || !inspection_date || !inspection_license_status||
    //     !insurance_license || !insurance_date || !insurance_status)
    //     return res.status(400)
    //         .json({ success: false, message: 'Missing information' })

    try {
        let updateCar = {
            license_plates, image,
            type, manufacturer, manufacturer_year,
            fuel, seat, transmission,
            inspection_status, name, start_day, end_day, price: Number(price)
        }

        const carUpdateCondition = { _id: req.params.id}

        updateCar = await Car.findOneAndUpdate(carUpdateCondition, updateCar,
            { new: true })

        if (!updateCar)
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Post not found or user not authorised'
                })

        let update_registration_certificate = {
            lincense_ID: registration_license,
            type: 'Registration certificate',
            date: registration_date,
            status: registration_status
        }
        const update_registration_certificateCondition = { car_ID: req.params.id, _id:registration_id }


        let update_inspection_certificate = {
            lincense_ID: inspection_license,
            type: 'Inspection certificate',
            date: inspection_date,
            status: inspection_license_status
        }
        const update_inspection_certificateCondition = { car_ID: req.params.id , _id:inspection_license_id}


        let update_insurance_certificate = {
            lincense_ID: insurance_license,
            type: 'Insurance certificate',
            date: insurance_date,
            status: insurance_status
        }

        const update_insurance_certificateCondition = { car_ID: req.params.id, _id:insurance_id }

        update_registration_certificate = await Car_document.findOneAndUpdate
            (update_registration_certificateCondition, update_registration_certificate,
                { new: true })

        update_inspection_certificate = await Car_document.findOneAndUpdate
            (update_inspection_certificateCondition, update_inspection_certificate,
                { new: true })

        update_insurance_certificate = await Car_document.findOneAndUpdate
            (update_insurance_certificateCondition, update_insurance_certificate,
                { new: true })

        res.json({
            success: true,
            message: 'Update car successfully',
            updateCar,
            update_registration_certificate,
            update_inspection_certificate,
            update_insurance_certificate
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})


// @route DELETE api/posts/
// @desc Delete post
// @access Private
// router.delete('/:id', verifyToken, async (req, res) => {
//     const postDeleteCondition = { _id: req.params.id, user: req.userId }

//     try {
//         const deletePost = await Post.findOneAndDelete(postDeleteCondition)

//         // Post not found or user not authorised
//         if (!deletePost)
//             return res
//                 .status(401)
//                 .json({
//                     success: false,
//                     message: 'Post not found or user not authorised'
//                 })

//         res.json({
//             success: true,
//             message: 'Delete post successfully',
//             deletePost
//         })

//     } catch (error) {
//         console.log(error.message)
//         return res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         })
//     }
// })


module.exports = router