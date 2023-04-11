const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Personal_document = new Schema({
    lincense_ID: {
        type: String,
        required: true,
        unique: true
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
    carOwner_ID:
    {
        type: Schema.Types.ObjectId,
        ref: 'carOwner_ID'
    },
    rentalCustomer_ID:
    {
        type: Schema.Types.ObjectId,
        ref: 'rental_customers'
    }

})

module.exports = mongoose.model('personal_documents', Personal_document)