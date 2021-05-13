'use strict';

var mongoose = require('mongoose')
var User = mongoose.model('Users')
var auth = require('../auth/authController')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var secret = process.env.SECRET_KEY || "secretkey"// secret key


//Get User details with {username}
exports.get_user = function(req, res){
    User.findOne({"username" : req.query.username}, function(error, user){
        if(error) return res.send(JSON.stringify(error))

        if(!user) return res.status(404).send("No user found")

        res.send(user)
    })
}

//Delete user with {username}
exports.delete_user = function(req, res){
    User.findOneAndDelete({"username": req.query.username}, function(error, user){
        if(error) return res.send(JSON.stringify(error))

        if(!user) return res.status(404).send("User not found")
        
        res.send(" USER "+user.username+" deleted")
    })
    
}

//Update user with {username}
exports.update_user = function(req, res){
    if(req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 8)  // if changing password then encrypt password before updating
    User.findOneAndUpdate({"username": req.query.username}, req.body, {new : true, useFindAndModify: false}, function(error, user){
        
        if(error) return res.send(JSON.stringify(error))

        if(!user) return res.status(404).send("User not found")

        res.send(user)
    })
}

//Create multiple users with [{user1},{user2},..]
exports.register_users = function(req, res){
    var tokens = [] // to send tokens of all newly created users
    for( let i=0;i<req.body.length; i++){
        req.body[i].password = bcrypt.hashSync(req.body[i].password, 8) 
        User.create(req.body[i], function(error, user){
            if(error) return res.status(400).send("Error")

            var token = jwt.sign({ id: user._id }, secret, {
                expiresIn: 86400 // expires in 24 hours
            })
            tokens.push(token)
            if(tokens.length === req.body.length) res.send(tokens)
        })
    }
}