/**
 * Created by win7 on 2017/4/5.
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let organizationSchema = new mongoose.Schema({
    name:String,
    manager_id:String,  //引用登录表里的_id
    code:String,
    checked:Boolean,    //是否已审核 销售经理来审核
    area:String,        //A区还是B区
    industry: {industry_code:String,industry_name:String},  //行业类别 保险or证券
    create_time:Date,
    contactsalesman: {id:String,name:String},
    region:String,
    address:String,
    director_name: String,
    director_tel: String,
    receiver_name: String,
    receiver_tel:String,
    organizer_name:String,
    organizer_tel:String,
    notice_status:Number, //告知书状态 0:未看 1:已看
    reportGl:[{flag:Boolean,beginTime:Date,endTime:Date}],//是否需要鼓楼医院报告 true:需要 false:不需要
    //projects:[{category:String,name:String,price:Number,discount:Number,beginTime:Date,endTime:Date}],
    projects:[{
        category:String,
        name:String,
        price:Number,
        sampleNum:Number,      //需要的抽血管子数
        sampleType:String,     //血清或口腔黏膜
        remark:String,         //采样所需什么样的容器
        discount:Number,
        beginTime:Date,
        endTime:Date
    }],
    giveProjects:[{
        category:String,
        name:String,
        price:Number,
        sampleNum:Number,
        sampleType:String,
        remark:String,
        discount:Number,
        beginTime:Date,
        endTime:Date
    }],
    old_projects:[{category:String,name:String,price:Number,discount:Number}],
});
let organizationModel = mongodb.model('organizations',organizationSchema,'organizations');
module.exports = organizationModel;
