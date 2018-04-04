/**
 * Created by win7 on 2017/4/5.
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let companyScheduleSchema = new mongoose.Schema({
    company_id:String,
    combo:String,
    time:Date,
    place:String,
    personNum:Number,
    remark:String
})
let companyScheduleModel = mongodb.model('companysschedules',companyScheduleSchema,'companysschedules');

module.exports = companyScheduleModel;
