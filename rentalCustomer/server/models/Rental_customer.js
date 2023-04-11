const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Rental_customer = new Schema({
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
    phone_number: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: 'PENDING',
        enum: ['PENDING', 'WAITING UPDATE', 'VERIFIED']
    }
})

module.exports = mongoose.model('rental_customers', Rental_customer)