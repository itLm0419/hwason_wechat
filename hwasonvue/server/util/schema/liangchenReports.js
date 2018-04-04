/**
 * Created by win7 on 2017/4/5.
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let liangchenReportsSchema = new mongoose.Schema({
    user_id:String,
    project:String,
    reports:[{
        name:String,
        value:String,
        unit:String,
        result:String,
        range:String,
        date:Date,
        dateStr:String
    }]
})

let liangchenReportsModel = mongodb.model('liangchenReports',liangchenReportsSchema,'liangchenReports');

module.exports = liangchenReportsModel;
