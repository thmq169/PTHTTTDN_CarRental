const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Wishlist = new Schema({
    username: {
        type: Schema.Types.ObjectId,
        ref: 'rental_customers'
    },
    cars: [{
        type: Schema.Types.ObjectId,
        ref: 'cars'
    }],
})

module.exports = mongoose.model('wishlists', Wishlist)