//By: Samantha Long

//This file will define the routes that can be followed. Implementation is
//given in controller.js
module.exports = function(app) {
  const reviews = require('../controllers/controller');

  // Routes based on review ID
  
  app.route('/review/:reviewid')
    .get(reviews.read_a_review)
    .put(reviews.update_a_review)
    .delete(reviews.delete_a_review)
    .post(reviews.create_a_review);

  //Route to retrieve items by stars
  app.route('/review/:n/:stars')
    .get(reviews.read_a_review_stars);
    
    //Retrieve item by date
   app.route('/review/:n/:from_date/:to_date')
    .get(reviews.read_a_review_date);
    
    //Get average of review stars over time
    app.route('/review/:from/:to')
    .get(reviews.average_stars);
    
    //Get average of helpful votes by product
    app.route('/review/helpful/:prodid')
    .get(reviews.helpful_votes);
    
    //Get average review info for a customer by category
    app.route('/review/info/:custid')
    .get(reviews.average_review);
};
