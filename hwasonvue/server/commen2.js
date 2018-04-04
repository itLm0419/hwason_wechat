
let organizationModel = require('./util/schema/organizations');
let activityModel = require('./util/schema/activities');
let util = require('./util2');

module.exports = function (app) {

};
//获取添加行事历时可选择的项目名
// params 机构id : _id
app.get('/salesman/showChooseProject',async function (req,res,next) {
  let _id = req.query._id;
  let organization = await organizationModel.findOne({_id: _id}, {projects: 1}, function (err) {
    if (err) {
      let data = {};
      data.result = "01";
      data.name = "操作失败";
      return res.status(200).send(data);
    }
  });
  let data = new Set();
  for (let project of organization.projects) {
    data.add(project.category);
  }
  res.status(200).send(data);
});
  // 添加行事历
  // params 机构id : organization_id
  //        活动时间:activity_time
  //        活动地点:address
  //        预计人数:estimated_number
  //        项目(数组):projects
  //        备注:remark
  app.post('/salesman/addActivity',async function (req,res,next) {
    let params = req.body.params;
    let userId = req.cookies.userId;
    let activityEntity = new activityModel({
      projects:params.projects,
      activity_time:params.activity_time,
      address:params.address,
      remark:params.remark,
      create_man_id:userId,
      create_time:new Date(),
      organization_id:params.organization_id,
      estimated_number:params.estimated_number,     //预计人数
      registration_number:0,  //实际登记人数
      sampling_number:0,      //实际采样人数
      sample_status:0,        //样本状态
      feedback_state:0,       //反馈状态
      last_modify_time:new Date(),
      last_modify_people_id:userId,
    });
    await activityEntity.save(function (err) {
      if(err){
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        res.status(200).send(data);
      }else{
        let data = {};
        data.result = "00";
        data.name = "操作成功";
        res.status(200).send(data);
      }
    })
  });
  // 修改行事历
  // params 活动id:_id
  //        机构id : organization_id
  //        活动时间:activity_time
  //        活动地点:address
  //        预计人数:estimated_number
  //        项目(数组):projects
  //        备注:remark
  app.post('/salesman/modifyActivity',async function (req,res,next) {
    let params = req.body.params;;
    let userId = req.cookies.userId
    await activityModel.update({_id:params._id},{$set:{
      projects:params.projects,
      activity_time:params.activity_time,
      address:params.address,
      remark:params.address,
      organization_id:params.organization_id,
      estimated_number:params.estimated_number,     //预计人数
      last_modify_time:new Date(),
      last_modify_people_id:userId
    }},function (err) {
      if(err){
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        res.status(200).send(data);
      }else{
        let data = {};
        data.result = "00";
        data.name = "操作成功";
        res.status(200).send(data);
      }
    })
  });
  //查询报告详情
  // params 活动id:_id
  //        页码:pageNo (默认第一页)
  //        每页显示条数:pageSize (默认10条)
  app.get('/salesman/showReportDetail',async function (req,res,next) {
    let _id = req.query._id;
    let pageNo = req.query.pageNo||1;
    let pageSize = req.query.pageSize||10;
    let data = await util.queryReportDetail(_id,pageNo,pageSize,res);
    res.status(200).send(data);
  });
  //获取体检套餐
  app.get('/salesman/getProjects',async function (req,res,next) {
    let projects = projectModel.find({},function (err) {
      if(err){
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        return res.status(200).send(data);
      }
    });
    res.status(200).send(projects);
  });

