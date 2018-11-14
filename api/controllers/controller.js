//Samantha Long

//Implementation of defined routes.

var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://omega.unasec.info";

//Create a new review on the database
exports.create_a_review = function(req, res) {
    MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("amazon");
  var myobj = {day: 1.0, _id: {product: {title: "Test"}} }; //Would add more fields if actually adding real review
  dbo.collection("reviews").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
}); 
};

//Get a review from the database
exports.read_a_review = function(req, res){
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("amazon");
  dbo.collection('reviews').aggregate([{$match:{"reviewID": `${req.params.reviewid}`}}]).toArray(function(err,result){
    if (err) throw err;
    console.log(result);
    db.close();
  });
}); 
};  

//Update a review in the database
exports.update_a_review = function(req, res) {
    MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("amazon");
  var myquery = {"reviewID": `${req.params.reviewid}`};
  var newvalues = { $set: {product:{title: "Changed"}} }; //could add more fields is necessary
  dbo.collection("reviews").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});
};

//Delete a review from the database
exports.delete_a_review = function(req, res) {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("amazon");
  var myquery = {"reviewID": `${req.params.reviewid}`};
  dbo.collection("reviews").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
}); 
};

//Get a review from the database
exports.read_a_review_stars = function(req, res) {
    MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("amazon");
  var star = parseInt(req.params.stars);
  var query = [{$match: {"review.star_rating": star}}];
  dbo.collection("reviews").aggregate(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
}); 
};

exports.read_a_review_date = function(req, res) {
    MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("amazon");
  var query = [{ $match: {"review.date": {$lt: req.params.from_date, $gt: req.params.to_date}}}];
  dbo.collection("reviews").aggregate(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
};

exports.average_stars = function(req, res) {
    MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("amazon");
  var query = [{$match: {"review.date": {$lt: req.from_date, $gt: req.to_date}}}, {$group: {_id: null,"average": { $avg: {$sum: "$review.star_rating"}}}}];
  dbo.collection("reviews").aggregate(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
};

exports.helpful_votes = function(req, res) {
    MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("amazon");
  var query = [{$match: {"product.id": req.params.prodid}}, {$group:{_id:null, "average": {$avg: {$sum:"$votes.helpful_votes"}}}}];
  dbo.collection("reviews").aggregate(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
};

exports.average_review = function(req, res) {
   MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("amazon");
  var query = [{$match: {customer_id: "$req.params.custid"}},{$group: {_id: "$customer_id"}},{$count: "num_reviews"}];
  dbo.collection("reviews").aggregate(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
};