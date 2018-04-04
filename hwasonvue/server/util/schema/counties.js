/**
 * Created by win7 on 2017/6/14.
 * 县及县编码
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let countySchema = new mongoose.Schema({
  city_id:String,
  name:String,
  code:String
});

let countyModel = mongodb.model('counties',countySchema,'counties');

module.exports = countyModel;
