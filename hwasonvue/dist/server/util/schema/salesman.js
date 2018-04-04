'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var salesmanSchema = new mongoose.Schema({
  _id: String,
  organization_id: String,
  realName: String,
  tel: String,
  department: String
});

var salesmanModel = mongodb.model('salesman', salesmanSchema, 'salesman');

module.exports = salesmanModel;