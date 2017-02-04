var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  url: { type: String, unique: true },
  shortUrl: { type: Number, unique: true }
});

var urlModel = mongoose.model('Url', urlSchema);

module.exports.urlModel;