'use strict';

var mongoose = require('mongoose')
var Pets = mongoose.model('Pets')
var auth = require('../auth/authController')

//Create a new pet
exports.create_pet = function(req, res){
    Pets.create(req.body, function(error, pet){
        if(error) return res.status(400).send("ERROR")

        res.send(pet)
    })
}

//Get pet details by {id}
exports.get_pet = function(req, res){
    Pets.findById(req.query.id, function(error, pet){
        if(error) return res.status(400).send("ERROR")

        if(!pet) return res.status(404).send("No Pet found")

        res.send(pet)
    })
}

//Get pet by status {available,sold,..}
exports.get_pet_by_status = function(req, res){
    Pets.find({"status": {$in : req.query.status}}, function(error, pets){
        if(!pets) return res.status(404).send("NO pets found")

        if(error) return res.status(400).send("ERROR")

        res.send(pets)
    })
}

//Update pet info
exports.update_pet = function(req, res){
    Pets.findByIdAndUpdate(req.query.id, req.body, {new : true, useFindAndModify: false, runValidators: true}, function(error, pet){
        if(error){
            if(error._message === "Validation failed") return res.status(405).send("Validation Exception")
            
            return res.send(JSON.stringify(error))
        }
        
        if(!pet) return res.status(404).send("Pet not found")

        res.send(pet)
    })
}

//Delete a pet by {id}, requires authorization
exports.delete_pet = function(req, res){
    Pets.findByIdAndDelete(req.query.id, function(error, pet){
        if(error) return res.status(400).send(error)

        if(!pet) return res.status(404).send("Pet not found")

        res.send("Pet deleted successfully")
    })
}

//Update a pet info
exports.update_pet_by_form = function(req, res){
    Pets.findByIdAndUpdate(req.query.id, req.body, {new : true, useFindAndModify: false, runValidators: true}, function(error, pet){
    if(error){
        if(error._message === "Validation failed") return res.status(405).send("Validation Exception")
            return res.send(JSON.stringify(error))
    }
            
    if(!pet) return res.status(404).send("Pet not found")

    res.send(pet)
    
    })
}

//Checks availability status of pet
exports.check_availability = function(req, res, next){
    Pets.findOne({_id:req.body.petId, status: "available"}, function(error, pet){
        if(error) return res.status(400).send("ERROR")

        if(!pet) return res.status("404").send("Pet not available - Can't create order")

        next()
    })
}