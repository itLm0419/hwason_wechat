/**
 * Created by win7 on 2017/5/23.
 * 项目
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let projectDetailSchema = new mongoose.Schema({

      project:String,
      category:String,
      sex:String,
      item:[String]
});

let projectDetailModel = mongodb.model('orgCategory',projectDetailSchema,'orgCategory');

module.exports = projectDetailModel;
