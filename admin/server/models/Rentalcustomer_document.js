const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Rentalcustomer_document = new Schema({
    lincense_ID: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        require: true,
        default: null,
        enum: ['National identification card', 'Citizen Identification Card',
            'Driver license B1', 'Driver license B2', null]
    },
    date: {
        type: Date,
        require: true,
    },
    status: {
        type: String,
        default: 'PENDING',
        enum: ['PENDING', 'WAITING UPDATE', 'VERIFIED']
    },
    rentalCustomer_ID:
    {
        type: Schema.Types.ObjectId,
        ref: 'rental_customers'
    }

})

module.exports = mongoose.model('rentalcustomer_documents', Rentalcustomer_document)