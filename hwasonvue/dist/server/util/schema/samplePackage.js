'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var samplePackageSchema = new mongoose.Schema({
    organization_id: String,
    apply_date: Date,
    applicant: String,
    state: Number,
    send_date: Date,
    courier_number: String,
    courier_company: String,
    sender: { id: String, Name: String, tel: String },
    receiver: { id: String, name: String, tel: String },
    packages: [{ name: String, number: Number }] });
var samplePackageModel = mongodb.model('samplePackage', samplePackageSchema, 'samplePackage');

module.exports = samplePackageModel;