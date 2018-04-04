/**
 * Created by win7 on 2017/4/5.
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let activitiesSchema = new mongoose.Schema({
    projects:[String],
    reportGl:Boolean,
    activity_time:Date,
    address:String,
    remark:String,
    create_man:{tel:String,name:String,tel:String},
    create_time:Date,
    organization_id:String,
    laboratory_checked:Number,    //0:未核对 1:已核对 2:等待反馈
    receiver: {tel:String,name:String},
    estimated_number:Number,     //预计人数
    registration_number:Number,  //实际登记人数
    sampling_number:Number,      //实际采样人数
    sample_status:Number,        //样本状态 样本状态
                                    // 0 无状态
                                    // 1 运输中
                                    // 2 检测中
                                    // 3 检测结束
                                    // 4 运回中
                                    // 5 已接收
                                    //10 活动开始
                                    //11 活动结束
    feedback_state:Number,       //反馈状态 0:未确认 1:已确认 2:
    advise:[{project:String,advise_status:Number}],  //医生建议状态 1.建议未完成 2.建议完成
    last_modify_time:Date,
    last_modify_people_id:String,
    nurses:[{
        id:String,name:String
    }],
    nurse_number:Number,  //安排护士人数
    delivery_id:String,
    delivery_file_path:String
});
let activityModel = mongodb.model('activities',activitiesSchema,'activities');

module.exports = activityModel;
