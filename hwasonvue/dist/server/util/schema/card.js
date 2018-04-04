'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb');
var cardSchema = new mongoose.Schema({
    cardNo: String,
    password: String,
    userId: String,
    userName: String,
    familyId: [String],
    organization_id: String,
    salesman: { _id: String, realName: String, userName: String, tel: String, department: String },
    beginTime: Date,
    endTime: Date,
    cardType: Number,
    status: Number });
var cardModel = mongodb.model("card", cardSchema, "card");
module.exports = cardModel;