'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var countySchema = new mongoose.Schema({
  city_id: String,
  name: String,
  code: String
});

var countyModel = mongodb.model('counties', countySchema, 'counties');

module.exports = countyModel;