/**
 * Created by win7 on 2017/5/23.
 * 机构的类别
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let orgCategorySchema = new mongoose.Schema({
  industry_id:String,
  name:String,
  code:String,
  organization_id:[String]  //引用机构表的id
});

let orgCategoryModel = mongodb.model('orgCategory',orgCategorySchema,'orgCategory');

module.exports = orgCategoryModel;
