
// Dependencies
var express = require('express');
var router = express.Router();


// Models
//var Product = require('../models/product');
var User = require('../models/user');
var JobInformation = require('../models/jobInformation');

// Routes
//Product.methods(['get', 'put', 'post', 'delete']);
//Product.register(router, '/products');

User.methods(['get', 'put', 'post', 'delete']);
User.register(router, '/users');

JobInformation.methods(['get', 'put', 'post', 'delete']);
JobInformation.register(router, '/jobinformations');

// Return router
module.exports = router;
