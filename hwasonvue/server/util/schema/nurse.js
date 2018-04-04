/**
 * Created by win7 on 2017/4/18.
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let nurseSchema = new mongoose.Schema({
    _id:String,
    realName:String,
    IDNo:String,  //身份证号码
    sex:String,
    tel: String, //login name
    region: String,
    address:String,
    create_time:Date,
    cardholder:String,  //持卡人
    owned_bank:String,  //所属银行
    card_number:String,  //银行卡号
    open_bank:String,    //开户行
    post:String,     //职务
    unit_name:String,  //单位名称N
    photo_file:String,
    certificate_No:String,//从业资格证号
    certificate_file:String,//从业资格证照片
    checked:Number,  //是否已通过审核,物流主管审核,0--未审核，1--驳回，2--审核通过
    referee_name:String, //推荐人名字
    referee_tel:String   //推荐人电话

});

let nurseModel = mongodb.model('nurse',nurseSchema,'nurse');

module.exports = nurseModel;
