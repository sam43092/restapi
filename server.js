//Creates server

const express = require('express'),
app = express(),
port = process.env.PORT || 8080;

const routes = require('./api/routes/routes'); //importing routes
routes(app);

app.listen(port);

//Check to see what port is being used
console.log('RESTful API server started on: ' + port);