'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var provinceSchema = new mongoose.Schema({
  name: String,
  code: String
});

var provinceModel = mongodb.model('provinces', provinceSchema, 'provinces');

module.exports = provinceModel;