/**
 * Created by win7 on 2017/6/14.
 * 市及市编码
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let citySchema = new mongoose.Schema({
  province_id:String,
  name:String,
  code:String
});

let cityModel = mongodb.model('cities',citySchema);

module.exports = cityModel;
