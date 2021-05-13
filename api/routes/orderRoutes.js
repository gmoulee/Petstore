'use strict';

var order = require('../controllers/orderController');
var pet = require('../controllers/petController');
var auth = require('../auth/authController')

module.exports = function (app){
    app.post('/store/order',pet.check_availability, order.create_order)
    app.get('/store/order', order.get_order)
    app.delete('/store/order',auth.verifyToken, order.delete_order)
    app.get('/store/inventory', order.get_inventory)
 };