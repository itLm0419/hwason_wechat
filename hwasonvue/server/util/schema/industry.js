/**
 * Created by win7 on 2017/5/23.
 * 行业分类及编码
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let industrySchema = new mongoose.Schema({
    name:String,
    code:String
});

let industryModel = mongodb.model('industry',industrySchema,'industry');

module.exports = industryModel;
