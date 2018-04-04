/**
 * 体检用户表
 * Created by win7 on 2017/4/5.
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let userSchema = new mongoose.Schema({
    name:String,
    sex:String,
    birthday:Date,
    tel:String,
    region: String,
    address:String,
    email:String,
    profession:String,
    createTime:Date,
    IDNo:String,    //身份证号码
    organization_id:String,
    salesman:{id:String,name:String},
    //create_time:Date,
    password:String,
    userType:Number //1.体检录入 2.  家庭卡录入
});

let userModel = mongodb.model('user', userSchema,'user');

module.exports = userModel;
