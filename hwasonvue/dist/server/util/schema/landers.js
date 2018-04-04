'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var landerSchema = new mongoose.Schema({
    userName: String,
    password: String,
    role: String,
    tel: String,
    manager: {
        name: String,
        organization_id: String
    },
    org_salesman: {},
    hs_salesman: {},
    nurse: {}
});
var landerModel = mongodb.model('landers', landerSchema);

module.exports = landerModel;