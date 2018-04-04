'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');
var userActivitiesSchema = new mongoose.Schema({
  userId: String,
  name: String,
  IDNo: String,
  activity_id: String,
  create_time: Date,
  test_number: Number,
  barcode: String,
  checked: Boolean,
  doubleChecked: Boolean,
  sample_time: Date,
  salesman: { id: String, name: String, tel: String },
  projects: [String],
  projects2: [{ category: String, item: String, num: Number, content: [String] }],
  category: String,
  sampled: Boolean,
  organization_id: String,
  nurse: {
    id: String, name: String
  }
});
var userActivitiesModel = mongodb.model('userActivities', userActivitiesSchema, 'userActivities');
module.exports = userActivitiesModel;