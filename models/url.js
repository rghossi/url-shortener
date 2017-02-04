var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  url: { type: String, unique: true },
  shortUrl: { type: Number, unique: true }
});

module.exports = mongoose.model('Url', urlSchema);;