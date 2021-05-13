const express = require('express')
var cors = require('cors')
var multer = require('multer'); //to parse form-data
var upload = multer();
const app = express()
app.use(cors())
app.use(express.json())
app.use(upload.array())
app.use(express.static('public'))
require('./api/models/userModel') //created model loading here
require('./api/models/petModel')
require('./api/models/orderModel')
require('dotenv').config() // to get env variables
const port = process.env.PORT || 3000
const dburl = 'mongodb://'+(process.env.DB_HOST||'mongo')+'/PetStoredb'

const  mongoose = require('mongoose')
mongoose.connect(dburl, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

require('./api/routes/userRoutes.js')(app);
require('./api/routes/petRoutes.js')(app);
require('./api/routes/orderRoutes.js')(app);

app.listen(port);

console.log('Petstore server started on: ' + port);
