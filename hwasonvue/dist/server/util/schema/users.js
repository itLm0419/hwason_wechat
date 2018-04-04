'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var usersSchema = new mongoose.Schema({
    name: String,
    code: String,
    gender: String,
    age: String,
    personalNum: String,
    company: String,
    date: Date,
    salesman: String,
    section: String,
    createTime: Date,
    project: String
});

var userModel = mongodb.model('users', usersSchema);

module.exports = userModel;