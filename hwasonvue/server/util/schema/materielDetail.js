/**
 * Created by win7 on 2017/5/19.
 * 物料明细
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let materialDetailSchema = new mongoose.Schema({
    organization_id:String,
    send_date:Date,            //发货日期
    courier_number:String,    //快递单号
    sender:String,           //发货人
    contact:String,         //联系方式
    receiver:String,       //接收人
    top_package:Number,   //高档检测包
    gene_package:Number, //基因检测包
    ymlxgjjcyhxk:Number,
    nsjn:Number,
    ycxsyjmxycjrq:Number,
    ycxczg:Number,
    sld:Number,
    cy:Number,
    zj:Number,
    jcplsqd:Number,
    tjxmdjbyzqtzs:Number,
    txm:Number,
    hsf:Number,
    ymd:Number,
    sgj:Number,
    fp:Number,
    wp:Number,
    ycxyyzd:Number,
    ycxkz:Number,
    ycxst:Number,
    mq:Number,
    lqh:Number,
    ljd:Number,
    zfd:Number,
    dfxdy:Number,
    pfxdy:Number,
    lsexdy:Number,
    pf:Number,
    lxj:Number,
    ymlxgjjcy:Number,
    qm:Number,
    bg:Number,
    xcybqd:Number,
    bd:Number
})

let materialDetailModel = mongodb.model('materialDetail',materialDetailSchema,'materialDetail');

module.exports = materialDetailModel;
