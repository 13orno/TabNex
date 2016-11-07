module.exports = function(app){


	var UserManagement = require('user-management');
	
    app.post('/login', function(req, res){
    	console.log(req.body.username);
        //res.json({ message: req.body.username }); 
        var USERNAME = req.body.username;
        var PASSWORD = req.body.password;
        var message;
        var extra;
		var usersM = new UserManagement();

        usersM.load(function(err) {
		  usersM.authenticateUser(USERNAME, PASSWORD, function(err, result) {
		    if (!result.userExists) {
		      console.log('Invalid username');
		      message ='Invalid username';
		       res.json({ message: message , status: 'fail'});

		    } else if (!result.passwordsMatch) {
		      console.log('Invalid password');
		       message = 'Invalid password';
		       res.json({ message: message , status: 'fail'});
		    } else {
		      console.log('User token is: '+ result.token);
		       message = result.token;
		       usersM.getExtrasForToken(result.token, function(err, extras) {
			        //console.log('The address is: ' + extras);
			        usersM.close();
			         res.json({ message: message , userExtra: extras, status: 'ok'});
			      });
		    }
		    //usersM.close();
		   
		  });

		});
    });


 app.post('/logout', function(req, res){
    	console.log(req.body.token);
        //res.json({ message: req.body.username }); 
        var token = req.body.token;
      
		  usersM.expireToken(token,function(err) {
		    res.json({ message: err , status: 'ok' });
		  });
		
    });



    //other routes..
}