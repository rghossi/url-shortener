var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var UrlController = require('./urlController');
var mongoose = require('mongoose');

var MONGODB_URI = process.env.database || 'mongodb://localhost/urlshortener';
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log("Successfully connected to mongodb!")
})

mongoose.connect(MONGODB_URI);

app.get('/', function (req, res) {
	res.send("Hello");
});

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

app.get('/:shortUrl', UrlController.goToUrl);

app.get('/new/:url(*)', 
	UrlController.validate, 
	UrlController.checkIfAlreadyStored, 
	UrlController.shorten);

app.listen(PORT, function () {
  console.log('App listening on port ' + PORT + '!');
});