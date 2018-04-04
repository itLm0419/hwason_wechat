'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var loginSchema = new mongoose.Schema({
            userName: String,
            password: String,
            role: String,
            tel: String,
            realName: String,
            department: String

});
var loginModel = mongodb.model('login', loginSchema, 'login');

module.exports = loginModel;