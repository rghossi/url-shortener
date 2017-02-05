var validUrl = require('valid-url');
var Url = require('./models/url');

module.exports. goToUrl = function(req, res) {
	var shortUrl = req.params.shortUrl;
	Url.findOne({shortUrl}, function(err, url){
		if (err) throw err;
		if (url) {
			res.redirect(url.url);
		} else {
			res.json({error: "Short url not found on our database!"});
		}
	})
}

var getRandomAvailableNumber = function(numbersList){
	var randomNumber = Math.floor(Math.random() * (10000 - 1000) ) + 1000;
	if (numbersList.indexOf(randomNumber) > -1){
		getRandomAvailableNumber(numbersList);
	} else {
		return randomNumber;
	}
}

module.exports.validate = function(req, res, next) {
	var url = req.params.url;
	if (validUrl.isWebUri(url)) {
		next();
	} else {
		res.json({error: "Invalid URL. Make sure you use a valid protocol!"});
	}
}

module.exports.checkIfAlreadyStored = function(req, res, next) {
	var url = req.params.url;
	var fullAppUrl = req.protocol + '://' + req.get('host');

	Url.findOne({url: url}, function(err, url){
		if (err) throw err;
		if (url) {
			var shortUrl = fullAppUrl + "/" + url.shortUrl;
			res.json({
				original_url: url.url,
				short_url: shortUrl
			});
		} else {
			next();
		}
	})
}

module.exports.shorten = function(req, res) {
	var fullAppUrl = req.protocol + '://' + req.get('host');
	var url = req.params.url;

	Url.find({}, function(err, urls){
		if (err) throw err;
		var existentUrls = urls.map(function(url) {
			return url.shortUrl;
		});
		var shortUrl = getRandomAvailableNumber(existentUrls);
		var urlModel = new Url({url, shortUrl});
		urlModel.save(function(err){
			if (err) throw err;
			var short_url = fullAppUrl + "/" + shortUrl;
			res.json({
				original_url: url,
				short_url: short_url
			});
		})
	});
}