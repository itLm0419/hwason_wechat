'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var materialDetailSchema = new mongoose.Schema({
    organization_id: String,
    send_date: Date,
    courier_number: String,
    sender: String,
    contact: String,
    receiver: String,
    top_package: Number,
    gene_package: Number,
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
    bd: Number
});

var materialDetailModel = mongodb.model('materialDetail', materialDetailSchema, 'materialDetail');

module.exports = materialDetailModel;