'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var userSchema = new mongoose.Schema({
    name: String,
    sex: String,
    birthday: Date,
    tel: String,
    region: String,
    address: String,
    email: String,
    profession: String,
    createTime: Date,
    IDNo: String,
    organization_id: String,
    salesman: { id: String, name: String },

    password: String,
    userType: Number });

var userModel = mongodb.model('user', userSchema, 'user');

module.exports = userModel;