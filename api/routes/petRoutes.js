'use strict';

var pet = require('../controllers/petController');
var auth = require('../auth/authController');

module.exports = function (app){
    app.post('/pet', pet.create_pet)
    app.get('/pet', pet.get_pet)
    app.get('/pet/findByStatus', pet.get_pet_by_status)
    app.put('/pet', pet.update_pet)
    app.delete('/pet',auth.verifyToken, pet.delete_pet)
    app.post('/pet/update', pet.update_pet_by_form)
 };