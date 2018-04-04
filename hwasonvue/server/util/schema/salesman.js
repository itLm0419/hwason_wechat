'use strict';

/**
 * Created by win7 on 2017/5/5.
 * 机构业务员
 */
var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var salesmanSchema = new mongoose.Schema({
  _id: String,
  organization_id: String,
  realName: String,
  tel: String,
  department: String
});

var salesmanModel = mongodb.model('salesman', salesmanSchema,'salesman');

module.exports = salesmanModel;
