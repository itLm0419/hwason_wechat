'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var authoritySchema = new mongoose.Schema({
     role: String,
     path: String,
     login: Boolean
});

var authorityModel = mongodb.model('authority', authoritySchema);

module.exports = authorityModel;