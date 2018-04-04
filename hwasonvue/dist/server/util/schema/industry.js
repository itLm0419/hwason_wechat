'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var industrySchema = new mongoose.Schema({
  name: String,
  code: String
});

var industryModel = mongodb.model('industry', industrySchema, 'industry');

module.exports = industryModel;