'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var sampleMaterialSchema = new mongoose.Schema({
    organization_id: String,
    state: String,
    apply_date: Date,
    applicant: String,
    send_date: Date,
    courier_number: String,
    courier_company: String,
    sender: { id: String, Name: String, tel: String },
    receiver: { id: String, name: String, tel: String },
    ymlxgjjcyhxk: Number,
    nsjn: Number,
    ycxsyjmxycjrq: Number,
    ycxczg: Number,
    sld: Number,
    cy: Number,
    zj: Number,
    jcplsqd: Number,
    tjxmdjbyzqtzs: Number,
    txm: Number,
    hsf: Number,
    ymd: Number,
    sgj: Number,
    fp: Number,
    wp: Number,
    ycxyyzd: Number,
    ycxkz: Number,
    ycxst: Number,
    mq: Number,
    lqh: Number,
    ljd: Number,
    zfd: Number,
    dfxdy: Number,
    pfxdy: Number,
    lsexdy: Number,
    pf: Number,
    lxj: Number,
    ymlxgjjcy: Number,
    qm: Number,
    bg: Number,
    xcybqd: Number,
    bd: Number });

var sampleMaterialModel = mongodb.model('sampleMaterial', sampleMaterialSchema, 'sampleMaterial');

module.exports = sampleMaterialModel;