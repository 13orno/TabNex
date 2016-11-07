
// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


// MongoDB
mongoose.connect('mongodb://localhost/tabnex_db');


// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});
// Routes
app.use('/api', require('./routes/api'));
require('./routes/routes')(app);


//user management
/*var USERNAME = 'rubel';
var PASSWORD = '123456';
var EXTRAS = {
  name: 'Finnius F. Bar'
};


users.load(function(err) {
  console.log('Checking if the user exists');
  users.userExists(USERNAME, function(err, exists) {
    if (exists) {
      console.log('  User already exists');
      users.close();
    } else {
      console.log('  User does not exist');
      console.log('Creating the user');
      users.createUser(USERNAME, PASSWORD, EXTRAS, function (err) {
        console.log('  User created');
        users.close();
      });
    }
  });
});*/




// Start server
app.listen(3000);
console.log('API is running on port 3000');
