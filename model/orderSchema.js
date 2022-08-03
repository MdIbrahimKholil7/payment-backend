const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    email: String,
    transactionId: String,
    date: {
        type: Date,
        default: Date.now()
    }
})
module.exports = orderSchema