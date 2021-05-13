'use strict';

var user = require('../controllers/userController');
var auth = require('../auth/authController');

module.exports = function (app){
    app.post('/user', auth.register_user)
    app.get('/user/login', auth.login_user)
    app.get('/user/logout', auth.logout_user)
    app.get('/user', user.get_user)
    app.delete('/user',auth.verifyToken, user.delete_user)
    app.put('/user',auth.verifyToken, user.update_user)
    app.post('/user/createWithArray', user.register_users)
 };