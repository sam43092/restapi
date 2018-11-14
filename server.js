//Creates server
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://omega.unasec.info";

MongoClient.connect(url, function(err, client){
    if (err) throw err;
    const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080;
    const bodyParser  = require('body-parser');
    app.use(bodyParser.json());
    const routes = require('./api/routes/routes'); //importing routes
    routes(app);
    
    app.listen(port);
    
    //Check to see what port is being used
    console.log('RESTful API server started on: ' + port);
});