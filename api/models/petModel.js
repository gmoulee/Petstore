'use strict';
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    photourl: {
        type: String,
        required: true
    },
    tags: {
        type: String
    },
    category: {
        type: String
    },
    status: {
        type: String,
        enum: ['available', 'pending', 'sold'],
        default: 'available'
    }
});

module.exports = mongoose.model('Pets', PetSchema);