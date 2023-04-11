const express = require('express')
const router = express.Router()

const Car_owner = require('../../models/Car_owner')
const moment = require('moment')

// @route GET api/posts/
// @desc Get cars 
// @access Private
router.get('/', async (req, res) => {
    try {
        const owner = await Car_owner.find()
        res.json({
            success: true,
            message: 'Get owner successfully',
            owner
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