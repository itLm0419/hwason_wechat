'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var hwasonSchema = new mongoose.Schema({
  _id: String,
  realName: String,
  area: String,
  role: Number,
  department: String
});

var hwasonModel = mongodb.model('hwason', hwasonSchema, 'hwason');
module.exports = hwasonModel;