const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Rental_invoice = new Schema({
    start_day: {
        type: Date,
        required: true,
    },
    end_day: {
        type: Date,
        required: true,
    },
    delivery_location: {
        type: String,
        require: true
    },
    returning_location: {
        type: String,
        require: true
    },
    transportation_status: {
        type: String,
        require: true,
        default: "PENDING",
        enum: ['DELIVERY_REQUEST', 'DELIVERING', 'DELIVERY SUCESSFULL', 'DELIVERY FAIL',
            'RETURNING_REQUEST', 'RECEIVING', 'RECEIVING SUCESSFULL', 'RECEIVING FAIL', 'PENDING'],
    },
    payment_status: {
        type: String,
        require: true,
        default: 'PENDING',
        enum: ['PENDING', '30%', 'COMPLETED', 'UNCOMPLETED']
    },
    general_status: {
        type: String,
        require: true,
        default: 'PENDING',
        enum: ['PENDING', 'CONFIRM', 'CANCEL', 'BREACH', 'IN CONTRACT', 'ENDED']
    },
    car_ID: {
        type: Schema.Types.ObjectId,
        ref: 'cars'
    },
    customer_ID: {
        type: Schema.Types.ObjectId,
        ref: 'rental_customers'
    },
    staff_delivery_ID: {
        type: Schema.Types.ObjectId,
        ref: 'staff'
    },
    staff_receive_ID: {
        type: Schema.Types.ObjectId,
        ref: 'staff'
    }, 
})

module.exports = mongoose.model('rental_invoices', Rental_invoice)