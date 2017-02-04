var validUrl = require('valid-url');
var Url = require('./models/url');

module.exports.validate = function(req, res, next) {
	var url = req.params.url;
	if (validUrl.isWebUri(url)) {
		next();
	} else {
		res.json({error: "Invalid URL. Make sure you use a valid protocol!"});
	}
}

module.exports.shorten = function(req, res) {
	var url = req.params.url;
	var shortUrl = Math.floor(Math.random() * (10000 - 1000) ) + 1000;
	res.send(shortUrl.toString());
}