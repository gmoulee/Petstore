'use strict';
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var OrderSchema = new Schema({
    petId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
    },
    shipDate: {
        type: Date
    },
    complete: {
        type: Boolean
    },
    status: {
        type: String,
        enum: ['placed', 'approved', 'delivered'],
        default: 'placed'
    }
});

module.exports = mongoose.model('Orders', OrderSchema);