'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var addressesSchema = new mongoose.Schema({
    address: String,
    name: String,
    code: String,
    age: String,
    gender: String,
    project: String,
    personalNum: String,
    salesman: String,
    tel: String,
    company: String,
    companyCn: String,
    organization: String,
    download: Boolean,
    time: Date,
    dateStr: String,
    genderStr: String
});
var addressModel = mongodb.model('files', addressesSchema, 'files');

module.exports = addressModel;