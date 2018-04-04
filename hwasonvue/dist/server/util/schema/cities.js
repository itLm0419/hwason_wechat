'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var citySchema = new mongoose.Schema({
  province_id: String,
  name: String,
  code: String
});

var cityModel = mongodb.model('cities', citySchema);

module.exports = cityModel;