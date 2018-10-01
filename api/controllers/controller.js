//Implementation of defined routes. For now, simple
//JSON messages are returned

//Create a new review on the database
exports.create_a_review = function(req, res) {
    res.json({message: 'Create New Review'});
};

//Get a review from the database
exports.read_a_review = function(req, res) {
    res.json({message: 'Reading Review'});
};

//Update a review in the database
exports.update_a_review = function(req, res) {
    res.json({message: 'Updating Review'});
};

//Delete a review from the database
exports.delete_a_review = function(req, res) {
    res.json({ message: 'Deleting Review' });
};


