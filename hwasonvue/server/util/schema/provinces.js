/**
 * Created by win7 on 2017/6/14.
 * 省及省编码
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let provinceSchema = new mongoose.Schema({
    name:String,
    code:String
});

let provinceModel = mongodb.model('provinces',provinceSchema,'provinces');

module.exports = provinceModel;

