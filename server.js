var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var UrlController = require('./urlController');

app.get('/', function (req, res) {
	res.send("Hello");
});

app.get('/new/:url(*)', UrlController.validate, UrlController.shorten);

app.listen(PORT, function () {
  console.log('App listening on port ' + PORT + '!');
});