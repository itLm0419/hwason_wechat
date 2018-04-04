'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var adminSchema = new mongoose.Schema({
    name: String,
    password: String,
    permission: Number
});

var adminModel = mongodb.model('admins', adminSchema, 'admins');

module.exports = adminModel;