const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Car = new Schema({
    license_plates: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum: ['Sedan', 'SUV', 'Hatchback', 'Pickup truck', 'Coupe', 'Orther'],
        require: true,
    },
    manufacturer: {
        type: String,
        require: true
    },
    manufacturer_year: {
        type: Number,
        require: true
    },
    fuel: {
        type: String, 
        default: 'Gasoline', 
        enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Orther'],
        require: true
    }, 
    seat: { 
        type: Number,
        default: 4,
        enum: [2, 4, 7, 11], 
        require: true
    },
    price:{
        type: Number,
        default: 0,
        require: true
    },
    transmission: {
        type: String,
        default: 'Manual', 
        enum: ['Manual', 'Automatic', 'Semi-automatic', 'Orther'],
        require: true
    },
    inspection_status: {
        type: String,
        default: 'PENDING',
        enum: ['PENDING', 'WAITING UPDATE', 'VERIFIED']
    },
    rental_status: {
        type: String,
        default: 'AVAILABLE',
        enum: ['AVAILABLE', 'UNAVAILABLE', 'STOP_RENTING']
    },
    owner_ID: {
        type: Schema.Types.ObjectId,
        ref: 'car_owners'
    }
})

module.exports = mongoose.model('cars', Car)