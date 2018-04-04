'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var projectDetailSchema = new mongoose.Schema({

      project: String,
      category: String,
      sex: String,
      item: [String]
});

var projectDetailModel = mongodb.model('orgCategory', projectDetailSchema, 'orgCategory');

module.exports = projectDetailModel;