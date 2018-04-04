'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var organizationSchema = new mongoose.Schema({
    name: String,
    manager_id: String,
    code: String,
    checked: Boolean,
    area: String,
    industry: { industry_code: String, industry_name: String },
    create_time: Date,
    contactsalesman: { id: String, name: String },
    region: String,
    address: String,
    director_name: String,
    director_tel: String,
    receiver_name: String,
    receiver_tel: String,
    organizer_name: String,
    organizer_tel: String,
    notice_status: Number,
    reportGl: [{ flag: Boolean, beginTime: Date, endTime: Date }],
    projects: [{
        category: String,
        name: String,
        price: Number,
        sampleNum: Number,
        sampleType: String,
        remark: String,
        discount: Number,
        beginTime: Date,
        endTime: Date
    }],
    giveProjects: [{
        category: String,
        name: String,
        price: Number,
        sampleNum: Number,
        sampleType: String,
        remark: String,
        discount: Number,
        beginTime: Date,
        endTime: Date
    }],
    old_projects: [{ category: String, name: String, price: Number, discount: Number }]
});
var organizationModel = mongodb.model('organizations', organizationSchema, 'organizations');
module.exports = organizationModel;