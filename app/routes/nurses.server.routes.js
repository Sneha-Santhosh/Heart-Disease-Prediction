// Load the 'nurses' controller
var nurses = require('../../app/controllers/nurses.server.controller');
var express = require('express');
var router = express.Router();
// Define the routes module' method
module.exports = function (app) {
    // handle a get request made to /nurses path
    // and list nurses when /nurses link is selected
    app.get("/nurses",nurses.requiresLogin,nurses.list); //go to http://localhost:3000/nurses to see the list
    //handle a post request made to root path
    app.post('/nurse', nurses.create);
    //
    // Set up the 'nurses' parameterized routes 
	app.route('/nurses/:nurseId')
    .get(nurses.read)
    .put(nurses.update)
    .delete(nurses.delete)
    // Set up the 'nurseId' parameter middleware
    //All param callbacks will be called before any handler of 
    //any route in which the param occurs, and they will each 
    //be called only once in a request - response cycle, 
    //even if the parameter is matched in multiple routes
    app.param('nurseId', nurses.nurseByID);
    //authenticate nurse
    app.post('/nursesignin', nurses.authenticate);
    app.get('/nursesignout', nurses.signout);
    app.get('/read_cookie', nurses.isSignedIn);


    //path to a protected page
	app.get('/welcome',nurses.welcome);
    
};

