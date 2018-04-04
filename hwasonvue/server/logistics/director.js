/**
 * Created by win7 on 2017/6/8.
 * 物流主管
 */
import nurseModel from '../util/schema/nurses';
import organizationModel from '../util/schema/organizations';
import userModel from '../util/schema/user';
import userActivityModel from '../util/schema/userActivities';
import activityModel from '../util/schema/activities';
import loginModel from '../util/schema/login';
import util from '../util2'
module.exports = function (app) {
  //查询未审核护士
  app.get('/director/showUncheckedNurse',async function (req,res,next) {
      let nurses = await nurseModel.find({checked:false},
      {_id:1,realName:1,sex:1,region:1,certificate_No:1,create_time:1},
      function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              res.status(200).send(data);
          }
      });
      res.status(200).send(nurses);
  });
  //查询护士详情
  // params 护士id : _id
  app.get('/director/showNurseDetail',async function (req,res,next) {
      let _id = req.query._id;
      console.log(_id);
      let nurse = await nurseModel.findOne({_id:_id},
      {
          name:1,
          sex:1,
          tel:1,
          IDNo:1,
          region:1,
          cardholder:1,  //持卡人
          owned_bank:1,  //所属银行
          card_number:1,  //银行卡号
          open_bank:1,    //开户行
          post:1,     //职务
          unit_name:1,  //单位名称
          photo:1,
          certificate_No:1,
          certificate_photo:1
      },function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              res.status(200).send(data);
          }
      });
      console.log(nurse)
      res.status(200).send(nurse);
  });
  //通过审核
  // params 护士id : _id
  app.post('/director/checked',async function (req,res,next) {
      let _id = req.body.params._id;
      await nurseModel.update({_id:_id},{checked:true},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              res.status(200).send(data);
          }else{
              let data = {};
              data.result = "02";
              data.name = "操作成功";
              res.status(200).send(data);
          }
      })
  });
  //查看已通过审核护士
  // params 护士地区 :region
  //        护士姓名 :realName
  app.get('/director/showCheckedNurse',async function (req,res,next) {
      let region = req.query.region;
      let realName = req.query.realName;
      let query = {};
      if(region){
        query.region = new RegExp(region)
      }
      if(realName){
        query.realName = new RegExp(realName);
      }
      query.checked = true;
      console.log(region,realName,query);
      let nurses = await nurseModel.find(query,
      {realName:1,sex:1,region:1,tel:1,IDNo:1,certificate_No:1,cardholder:1,owned_bank:1,card_number:1,
      open_bank:1,checked:1},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              res.status(200).send(data);
          }
      });
      res.status(200).send(nurses);
  });
  //查询行事历(分页查询,参数可无)
  // params 页码:pageNo  (默认第一页)
  //        每页显示条数:pageSize  (默认10条)
  //        企业名称:name      (模糊查询)
  //        开始时间:begin
  //        结束时间:end
  app.get('/logistics/director/showActivities',async function (req,res,next) {
    let name = req.query.name||"";
    let pageNo = req.query.pageNo||1;
    let pageSize = req.query.pageSize||10;
    let begin = req.query.begin;
    let end = req.query.end;
    let organizations = await organizationModel.find({name:{$regex:name}},{
      _id:1,name:1},function (err) {
      if(err){
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        return res.status(200).send(data);
      }
    });
    let arr = [];
    for(let organization of organizations){
      arr.push(organization._id);
    }
    let orgIds = {};
    orgIds.$in = arr;
    let query = {};
    query.organization_id = orgIds;
    let dateParam = {};
    if(begin){
      dateParam.$gte = begin;
    }
    if(end){
      dateParam.lte = end;
    }
    if(dateParam.hasOwnProperty()){
      query.activity_time = dateParam;
    }
    let data = await util.queryActivities(pageNo,pageSize,query,res);

    return res.status(200).send(data);
  });
  //查询报告批次(分页查询,参数可无)
  // params 页码:pageNo  (默认第一页)
  //        每页显示条数:pageSize  (默认10条)
  //        企业名称:name      (模糊查询)
  //        开始时间:begin
  //        结束时间:end
  app.get('/logistics/director/showReports',async function (req,res,next) {
    let name = req.query.name||"";
    let pageNo = req.query.pageNo||1;
    let pageSize = req.query.pageSize||10;
    let begin = req.query.begin;
    let end = req.query.end;
    let organizations = await organizationModel.find(
      {name:{$regex:name}},
      {_id:1,name:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
    let arr = [];
    for(let organization of organizations){
      arr.push(organization._id);
    }
    let orgIds = {};
    orgIds.$in = arr;
    let query = {};
    query.organization_id = orgIds;
    let dateParam = {};
    if(begin){
      dateParam.$gte = begin;
    }
    if(end){
      dateParam.lte = end;
    }
    if(dateParam.hasOwnProperty()){
      query.activity_time = dateParam;
    }
    let sample_status = {};
    sample_status.$nin = 0;
    query.sample_status = sample_status;
    let aa = await util.queryReports(pageNo,pageSize,query,res);
    return res.status(200).send(aa);
  });
  //改变时间格式
  function changeSingleDate(date) {
    return "aa";
    return (date.getYear() + 1900) + "." + (date.getMonth() + 1) + "." + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getMinutes();
  }
};
