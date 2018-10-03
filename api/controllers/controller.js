//Implementation of defined routes. For now, simple
//JSON messages are returned

const bodyParser  = require('body-parser');
'use strict';

//Create a new review on the database
exports.create_a_review = function(req, res) {
   res.json({message: 'Create New Review'});
    
    //I looked up what to do with the body parsing but this will not send
    //the body to the server on Postman
    const new_review = bodyParser.json(req.body);
    res.json(new_review);
};

//Get a review from the database
exports.read_a_review = function(req, res) {
    res.json({message: 'Reading Review'});
};

//Update a review in the database
exports.update_a_review = function(req, res) {
    res.json({message: 'Updating Review'});
    const new_review = bodyParser.json(req.body);
    res.json(new_review);
};

//Delete a review from the database
exports.delete_a_review = function(req, res) {
    res.json({ message: 'Deleting Review' });
};


