'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var nurseSchema = new mongoose.Schema({
    _id: String,
    realName: String,
    IDNo: String,
    sex: String,
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
    photo_file: String,
    certificate_No: String,
    certificate_file: String,
    checked: Number,
    referee_name: String,
    referee_tel: String });

var nurseModel = mongodb.model('nurse', nurseSchema, 'nurse');

module.exports = nurseModel;