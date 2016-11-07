
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    maxSalary: Number,
    minSalary: Number,
    employmentType: String,
    notes: [{
        note: String,
        date: Date
    }],
    companyLogo: String,
    review: Number, // Need to check glass door api for this information
    connections: [
    {
        name: String,
        imageUrl: String,
        url: String
    }]

});

// Schema
//var note = new mongoose.Schema({
//    note: String

//});

//var connection = new mongoose.Schema({
//    name: String,
//    imageUrl: String,
//    url: String

//});

// Return model
module.exports = restful.model('jobInformation', jobSchema);