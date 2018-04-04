'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var companySchema = new mongoose.Schema({
  ename: String,
  name: String
});

var companyModel = mongodb.model('companies', companySchema, 'companies');

module.exports = companyModel;