var express = require('express');
var router = express.Router();
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
var User = require('../models/userModel');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var secret = process.env.SECRET_KEY || "secretkey"// secret key

exports.register_user = function(req, res){
    req.body.password = bcrypt.hashSync(req.body.password, 8) //encrypting password
    User.create(req.body, function (err, user) {
        if (err) return res.status(500).send("There was a problem registering the user`.")
    
        // if user is registered without errors
        // create a token
        var token = jwt.sign({ id: user._id }, secret, {
          expiresIn: 86400 // expires in 24 hours
        })
        res.send({ auth: true, token: token })
      })
}

exports.login_user = function(req, res){
    User.findOne({ username: req.query.username }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('User not found.');
        
        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.query.password, user.password);
        if (!passwordIsValid) return res.status(401).send({error: "Password incorrect", auth: false, token: null });
    
        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: user._id }, secret, {
          expiresIn: 86400 // expires in 24 hours
        });
    
        // return the information including token as JSON
        res.send({ auth: true, token: token });
      });
}

exports.logout_user = function(req, res){
    res.send({ auth: false, token: null }); // token set to null
}

exports.verifyToken = function(req, res, next) {
  // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token']
    if (!token) 
      return res.status(403).send({ auth: false, message: 'No token provided.' })

    // verifies secret and checks exp
    jwt.verify(token, secret, function(err, decoded) {      
      if (err) 
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })    

      // if everything is good, save to request for use in other routes
      req.userId = decoded.id
      next()
    })
}