'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var userRecordSchema = new mongoose.Schema({
    userId: String,
    organization_id: String,
    salesman: { _id: String, realName: String, userName: String, tel: String, department: String },
    createTime: Date,
    cardNo: String,
    password: String,
    name: String,
    IDNo: String,
    sex: String,
    tel: String,
    region: String,
    address: String,
    relatives: [{ relationship: String, name: String, IDNo: String }],
    height: Number,
    weight: Number,
    regularTest: String,
    recentResidence: String,
    cardioCerebrovascular: [String],
    digestiveSystem: [String],
    respiratorySystem: [String],
    endocrine: [String],
    gynaecopathia: [String],
    tumour: [String],
    otherDiseases: String,
    familyDiseases: [String],
    health: String,
    fatigue: String,
    sleep: String,
    stayUpLate: String,
    weightChange: String,
    reduceWeight: String,
    smokeYear: String,
    smokeOneDay: String,
    drinkYear: String,
    drinkOneDay: String,
    exerciseFrequency: String,
    exerciseTimeOnce: String,
    other: String,
    complete: Boolean });

var userRecordModel = mongodb.model('userRecord', userRecordSchema, "userRecord");

module.exports = userRecordModel;