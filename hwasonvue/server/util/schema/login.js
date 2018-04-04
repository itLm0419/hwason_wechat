/**
 * Created by win7 on 2017/5/15.
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let loginSchema = new mongoose.Schema({
    userName:String,
    password:String,
    role:String,//01:机构，02：机构业务员，
                // 11：华晟销售总监，12：华晟销售经理，13，华晟区域销售经理，13：销售代表
                //21：华晟物流经理，
                //31：护士
                //80：超级管理员，81：总经理
    tel:String,
    realName:String,
    department:String

})
let loginModel = mongodb.model('login',loginSchema,'login');

module.exports = loginModel;


