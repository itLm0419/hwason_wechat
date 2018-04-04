/**
 * Created by win7 on 2017/8/23.
 */
let mongoose = require('mongoose');
let mongodb = require('../mongodb');
let cardSchema = new mongoose.Schema({
    cardNo:String,
    password:String,
    userId:String,
    userName:String,
    familyId:[String],
    organization_id:String,
    salesman:{_id:String,realName:String,userName:String,tel:String,department:String},
    beginTime:Date,
    endTime:Date,
    cardType:Number, //1.目前卡的类型
    status:Number //0.未使用 1.激活
});
let cardModel = mongodb.model("card",cardSchema,"card");
module.exports = cardModel;