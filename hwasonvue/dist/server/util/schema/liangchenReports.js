'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var liangchenReportsSchema = new mongoose.Schema({
    user_id: String,
    project: String,
    reports: [{
        name: String,
        value: String,
        unit: String,
        result: String,
        range: String,
        date: Date,
        dateStr: String
    }]
});

var liangchenReportsModel = mongodb.model('liangchenReports', liangchenReportsSchema, 'liangchenReports');

module.exports = liangchenReportsModel;