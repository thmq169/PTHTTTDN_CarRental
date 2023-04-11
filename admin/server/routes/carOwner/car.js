const express = require('express')
const router = express.Router()

const Car = require('../../models/Car')
const Car_document = require('../../models/Car_document')
const verifyToken = require('../../middlewares/auth')

// @route POST api/car-owner/cars/
// @desc Post a car
// @access Private
router.post('/', verifyToken, async (req, res) => {
    const { license_plates, image, type, manufacturer, manufacturer_year,
        fuel, seat, transmission,
        registration_license, registration_date,
        inspection_license, inspection_date,
        insurance_license, insurance_date } = req.body

    if (!license_plates || !image || !type || !manufacturer || !manufacturer_year ||
        !fuel || !seat || !transmission ||
        !registration_license || !registration_date ||
        !inspection_license || !inspection_date ||
        !insurance_license || !insurance_date)
        return res.status(400)
            .json({ success: false, message: 'Missing information' })

    try {
        const newCar = new Car({
            license_plates, image,
            type, manufacturer, manufacturer_year,
            fuel, seat, transmission,
            owner_ID: req.userId
        })

        await newCar.save();

        const registration_certificate = new Car_document({
            lincense_ID: registration_license,
            type: 'Registration certificate',
            date: registration_date,
            car_ID: newCar._id
        })

        await registration_certificate.save();

        const inspection_certificate = new Car_document({
            lincense_ID: inspection_license,
            type: 'Inspection certificate',
            date: inspection_date,
            car_ID: newCar._id
        })

        await inspection_certificate.save();

        const insurance_certificate = new Car_document({
            lincense_ID: insurance_license,
            type: 'Insurance certificate',
            date: insurance_date,
            car_ID: newCar._id
        })

        await insurance_certificate.save();

        res.json({
            success: true,
            message: 'Post car successfully!', newCar
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error hehe'
        })
    }
})

// @route GET api/posts/
// @desc Get cars 
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const cars = await Car.find({ owner_ID: req.userId }).populate('owner_ID', ['fullname'])
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
router.get('/:id', verifyToken, async (req, res) => {
    const { id } = req.params
    try {
        const car = await Car.findOne({ _id: id, owner_ID: req.userId }).populate('owner_ID', ['fullname'])
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
router.put('/:id', verifyToken, async (req, res) => {
    const { license_plates, image, type, manufacturer, manufacturer_year,
        fuel, seat, transmission,
        registration_license, registration_date,
        inspection_license, inspection_date,
        insurance_license, insurance_date } = req.body

    if (!license_plates || !image || !type || !manufacturer || !manufacturer_year ||
        !fuel || !seat || !transmission ||
        !registration_license || !registration_date ||
        !inspection_license || !inspection_date ||
        !insurance_license || !insurance_date)
        return res.status(400)
            .json({ success: false, message: 'Missing information' })

    try {
        let updateCar = {
            license_plates, image,
            type, manufacturer, manufacturer_year,
            fuel, seat, transmission,
            inspection_status: "PENDING",
        }

        const carUpdateCondition = { _id: req.params.id, owner_ID: req.userId }

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
        }

        let update_inspection_certificate = {
            lincense_ID: inspection_license,
            type: 'Inspection certificate',
            date: inspection_date,
        }

        let update_insurance_certificate = {
            lincense_ID: insurance_license,
            type: 'Insurance certificate',
            date: insurance_date,
        }

        const documentUpdateCondition = { car_ID: req.params.id }

        update_registration_certificate = await Car_document.findOneAndUpdate
            (documentUpdateCondition, update_registration_certificate,
                { new: true })

        update_inspection_certificate = await Car_document.findOneAndUpdate
            (documentUpdateCondition, update_inspection_certificate,
                { new: true })

        update_insurance_certificate = await Car_document.findOneAndUpdate
            (documentUpdateCondition, update_insurance_certificate,
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