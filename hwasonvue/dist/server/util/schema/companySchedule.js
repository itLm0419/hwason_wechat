'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var companyScheduleSchema = new mongoose.Schema({
    company_id: String,
    combo: String,
    time: Date,
    place: String,
    personNum: Number,
    remark: String
});
var companyScheduleModel = mongodb.model('companysschedules', companyScheduleSchema, 'companysschedules');

module.exports = companyScheduleModel;