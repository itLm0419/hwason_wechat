'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var nurseSchema = new mongoose.Schema({
    _id: String,
    realName: String,
    IDNo: String,
    sex: Number,
    tel: String,
    region: String,
    address: String,
    create_time: Date,
    cardholder: String,
    owned_bank: String,
    card_number: String,
    open_bank: String,
    post: String,
    unit_name: String,
    photo: String,
    certificate_No: String,
    certificate_photo: String,
    checked: Boolean,
    referee_name: String,
    referee_tel: String });

var nurseModel = mongodb.model('nurses', nurseSchema, 'nurses');

module.exports = nurseModel;