const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Car_document = new Schema({
    lincense_ID: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        require: true,
        default: null,
        enum: ['Registration certificate', 'Inspection certificate',
            'Insurance certificate', null]
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
    car_ID: {
        type: Schema.Types.ObjectId,
        ref: 'cars'
    }
})

module.exports = mongoose.model('car_documents', Car_document)