
/**
 * Created by win7 on 2017/5/19.
 * 检测包申请
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let samplePackageSchema = new mongoose.Schema({
    organization_id:String,
    apply_date:Date,            //申请日期
    applicant:String,           //申请人id
    state:Number,              //申请：1，审批完成：2，发货完成：3
    send_date:Date,            //发货日期
    courier_number:String,     //快递单号
    courier_company:String,    //快递公司
    sender:{id:String,Name:String,tel:String},            //发货人
    receiver:{id:String,name:String,tel:String},           //接收人
    packages:[{name:String,number:Number}],//检测包的名字和数量

})
let samplePackageModel = mongodb.model('samplePackage',samplePackageSchema,'samplePackage');

module.exports = samplePackageModel;
