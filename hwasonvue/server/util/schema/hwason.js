/**
 * Created by win7 on 2017/6/8.
 * 华晟全体员工表
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let hwasonSchema = new mongoose.Schema({
  _id:String,        //引用login表id
  realName: String,
  area:String,      // A区还是B区
  role:Number,
  department:String
});

let hwasonModel = mongodb.model('hwason',hwasonSchema,'hwason');
module.exports = hwasonModel;
