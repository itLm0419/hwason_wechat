/**
 * 体检用户表
 * Created by win7 on 2017/5/31.
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');
let userActivitiesSchema = new mongoose.Schema({
  userId: String, //引用userschema
  name:String,    //用户名字
  IDNo:String,    //用户身份证
  activity_id: String,//引用activitiesschema
  create_time:Date,     //用户录入时间，活动当天录入
  test_number: Number,  //检测序号
  barcode: String,      //条形码
  checked: Boolean,    //是否已核对，机构业务员操作
  doubleChecked:Boolean,  //是否已核对，机构核实
  sample_time: Date,    //采样时间
  salesman: {id: String, name: String, tel: String},  //业务员
  projects: [String],   //体检项目
  projects2:[{category:String,item:String,num:Number,content:[String]}],
  adviseBy:[{
      _id:String,     //给出建议医生的id
      project:String,  //对于哪个项目给出的建议
      status:Number,  // 10.未出检测结果，1.未完成 2.处理中 3.已完成
      userName:String,
      realName:String,
      createTime:Date,
      content:String,
      department:String,
  }],
  category:String,      //项目类别
  sampled: Boolean,  //是否已采样
  organization_id: String,//提供业务的公司 id
  nurse: {          //提供服务的护士
    id: String, name: String
  }
})
let userActivitiesModel = mongodb.model('userActivities', userActivitiesSchema,'userActivities');
module.exports = userActivitiesModel;

