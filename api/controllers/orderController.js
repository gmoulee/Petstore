'use strict';

var mongoose = require('mongoose')
var Order = mongoose.model('Orders')
var Pets = mongoose.model('Pets')

//Create a new order
exports.create_order = function(req, res){
    Order.create(req.body, function(error, order){
        if(error) return res.status(400).send("ERROR")

        if(!order) return res.status(400).send("Invalid order")

        res.send(order)
    })
}

//Get the order info by {id}
exports.get_order = function(req, res){
    Order.findById(req.query.id, function(error, order){
        if(error) return res.status(400).send("ERROR")

        if(!order) return res.status(404).send("Order not found")

        res.send(order)
    })
}

//Deletes a order by {id}, requires authorization
exports.delete_order = function(req, res){
    Order.findByIdAndDelete(req.query.id, function(error, order){
        if(error) return res.status(400).send("ERROR")

        if(!order) return res.status(404).send("Order not found")

        res.send("Order deleted")
    })
}

//Get inventory of petstore [orders and pets]
exports.get_inventory = function(req, res){
    Order.aggregate([
        {
            $group: {
                _id: "$status",
                count: {$sum:1} 
            }
        }
    ], function(error, orders){
        if(error) return res.status(400).send(error)
        Pets.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: {$sum:1} 
                }
            }
        ], function(error, inv){
            if(error) return res.status(400).send(error)
            var inventory = {
                "orders" : orders,
                "pets"   : inv
            }
            res.send(inventory)
        })
    })
}