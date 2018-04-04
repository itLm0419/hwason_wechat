'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var orgCategorySchema = new mongoose.Schema({
  industry_id: String,
  name: String,
  code: String,
  organization_id: [String] });

var orgCategoryModel = mongodb.model('orgCategory', orgCategorySchema, 'orgCategory');

module.exports = orgCategoryModel;