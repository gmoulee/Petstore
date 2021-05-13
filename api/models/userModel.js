'use strict';
var mongoose = require('mongoose')
var Schema = mongoose.Schema


var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique : true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    userstatus: {
        type: Number,
        required: true
  }
});

module.exports = mongoose.model('Users', UserSchema);