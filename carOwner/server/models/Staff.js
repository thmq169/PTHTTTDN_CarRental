const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Staff = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    fullname: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true,
        enum: ['HR', 'INFORMATION MANAGEMENT STAFF', 'SALES STAFF','TRANSPORTATION STAFF']
    }
})

module.exports = mongoose.model('staff', Staff) 