const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const Staff = require('../../models/Staff')

const verifyToken = require('../../middlewares/auth')

// @route GET api/auth/
// @desc Check if user is logged in 
// @access Public
// router.get('/:id', async (req, res) => {
//     try {
//         const rental_customer = await Staff.findOne(req.userId)
//         if (!rental_customer)
//             return res.status(400)
//                 .json({
//                     success: false,
//                     message: 'User not found',
//                 })

//         res.json({ success: true, message: 'User logged in', rental_customer })

//     } catch (error) {
//         console.log(error.message)
//         return res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         })
//     }
// })

router.get('/allStaffs', async (req, res) => {
    try {
        const allStaff = await Staff.find()
        res.json(allStaff)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const staff = await Staff.findOneAndDelete({_id:id})
        if(!staff){
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Delete Staff Failed'
                })
        }

        res.json({
            success: true,
            message: 'Delete Staff Successfully',
            staff
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})


router.put('/:id', async (req, res) => {
    const { username, email, fullname, address, role } = req.body

    if (!username || !email || !fullname || !address || !role)
        return res.status(400)
            .json({ success: false, message: 'Missing information' })

    try {
        let updateStaff = {
            username, 
            email, 
            fullname, 
            address, 
            role
        }

        const id = req.params.id

        updateStaff = await Staff.findOneAndUpdate({_id:id}, updateStaff, { new: true })

        // Post not found or user not authorised
        if (!updateStaff)
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Update Staff Failed'
                })

        res.json({
            success: true,
            message: 'Update Staff Successfully',
            updateStaff
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'One of information had been exist in other'
        })
    }
})

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
    const {username, password, email, fullname, address, role} = req.body

    if (!username || !password || !email || !fullname || !address || !role)
        return res.status(400)
            .json({ success: false, message: 'Missing information' })

    try {
        const staff = await Staff.findOne({ username })
        
        // check for existing user  
        if (staff)
            return res.status(400)
                .json({ success: false, message: 'Username already taken' })


        // All good 
        const hashPassword = await argon2.hash(password)
        const newStaff = new Staff(
            {
        
                username,
                password: hashPassword,
                email, fullname, address, role
            })
        await newStaff.save()

        // Return token
        const accessToken = jwt.sign({ userId: newStaff._id }, process.env.ACCESS_TOKEN_SECRET);

        return res.json({
            success: true,
            message: 'Register successfully',
            accessToken,
            role: newStaff.role
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
        const staff = await Staff.findOne({ username })

        // check for existing user 
        if (!staff)
            return res.status(400)
                .json({ success: false, message: 'Incorrect username' })

        const passwordValid = await argon2.verify(staff.password, password)
        // const passwordValid = staff.password === password
        if (!passwordValid) {
            return res.status(400)
                .json({ success: false, message: 'Incorrect password' })
        }

        const accessToken = jwt.sign({ userId: staff._id }, process.env.ACCESS_TOKEN_SECRET);

        return res.json({
            success: true,
            message: 'User Logged in successfully',
            accessToken,
            role: staff.role,
            staff
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