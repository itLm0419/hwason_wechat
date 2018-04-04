/**
 * Created by win7 on 2017/4/5.
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let addressesSchema = new mongoose.Schema({
    address:String,
    name:String,
    code:String,
    age:String,
    gender:String,
    project:String,
    personalNum:String,
    salesman:String,
    tel:String,
    company:String,
    companyCn:String,
    organization:String,
    download:Boolean,
    time:Date,
    dateStr:String,
    genderStr:String
})
let addressModel = mongodb.model('files',addressesSchema,'files');

module.exports = addressModel;
