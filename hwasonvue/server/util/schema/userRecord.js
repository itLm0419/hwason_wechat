/**
 * Created by win7 on 2017/8/23.
 */

var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let userRecordSchema = new mongoose.Schema({
    userId:String,
    organization_id:String,
    salesman:{_id:String,realName:String,userName:String,tel:String,department:String},
    createTime:Date,
    cardNo:String,
    password:String,
    name:String,
    IDNo:String,
    sex:String,
    tel:String,
    region:String,
    address:String,
    relatives:[{relationship:String,name:String,IDNo:String}],
    height:Number,
    weight:Number,
    regularTest:String,//是否定期体检
    recentResidence:String,//最近居住地
    cardioCerebrovascular:[String], //心脑血管疾病类
    digestiveSystem:[String],//消化系统疾病类
    respiratorySystem:[String],//呼吸系统疾病类
    endocrine:[String],//内分泌系统疾病类
    gynaecopathia:[String],//妇科疾病类
    tumour:[String],//肿瘤疾病类
    otherDiseases:String,  //其他疾病
    familyDiseases:[String],  //亲人患有的疾病
    health:String,//健康状况
    fatigue:String,//近期的疲劳程度
    sleep:String,//近期睡眠时间如何
    stayUpLate:String,//熬夜状况
    weightChange:String,//近一年体重变化情况
    reduceWeight:String,//近期是否试图减肥过
    smokeYear:String,//吸烟多久
    smokeOneDay:String,//一天吸多少烟
    drinkYear:String,//饮酒年限
    drinkOneDay:String,//每天喝多少酒
    exerciseFrequency:String, //多久锻炼一次
    exerciseTimeOnce:String,   //一次锻炼多久
    other:String,//其他健康状况说明
    complete:Boolean,//健康档案信息是否已补全完整
});

let userRecordModel = mongodb.model('userRecord', userRecordSchema,"userRecord");

module.exports = userRecordModel;
