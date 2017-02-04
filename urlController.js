var validUrl = require('valid-url');

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
	res.send(":)");
}