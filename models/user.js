
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var userSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    ContactNumber: String,
    Address: String,
    Email: String,
    Password: String
    
});

// Return model
module.exports = restful.model('Users', userSchema);
