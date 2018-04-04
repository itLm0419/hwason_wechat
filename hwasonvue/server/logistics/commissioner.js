/**
 * Created by win7 on 2017/6/8.
 * 物流专员
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
let fs = require('fs');
var JSZip = require("jszip");
var xlsx = require('node-xlsx');
import nurseModel from '../util/schema/nurses';
import activityModel from '../util/schema/activities';
import hwasonModel from '../util/schema/hwason';
import organizationModel from '../util/schema/organizations';
import userModel from '../util/schema/user';
import userActivityModel from '../util/schema/userActivities';
import loginModel from '../util/schema/login';
import util from '../util2';
module.exports = function (app) {
  //查询未分配护士的活动
  app.get('/commissioner/unDistribution',async function (req,res,next) {
      let _id = req.cookies.userId;
      let hwason = await hwasonModel.findOne({_id:_id},{area:1},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              res.status(200).send(data);
         }
      });
      let organizations = await organizationModel.find({area:hwason.area},{_id:1,name:1},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              res.status(200).send(data);
          }
      });
      let data = [];
      for(let organization of organizations){
          let activities = await activityModel.find({nurses:{$size:0},organization_id:organization._id},
          {projects:1,activity_time:1,estimated_number:1,address:1},
          function (err) {
              if(err){
                  let data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
              }
          });
          let activity = {};
          for(let ac of activities){
              activity.name = organization.name;
              activity.projects = ac.projects;
              activity.activity_time = changeSingleDate(ac.activity_time);
              activity.estimated_number = ac.estimated_number;
              activity.address = ac.address;
              data.push(activity);
          }
      }
      res.status(200).send(data);

  });
  //查询已分配护士的活动
  app.get('/commissioner/distribution',async function (req,res,next) {
      let _id = req.cookies.userId;
      let hwason = await hwasonModel.findOne({_id:_id},{area:1},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              res.status(200).send(data);
          }
      });
      let organizations = await organizationModel.find({area:hwason.area},{_id:1,name:1},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              res.status(200).send(data);
          }
      });
      let data = [];
      for(let organization of organizations){
          let activities = await activityModel.find({  "nurses.0": {$exists:true},organization_id:organization._id},
              {projects:1,activity_time:1,estimated_number:1,address:1,"nurses.name":1},
              function (err) {
                  if(err){
                      let data = {};
                      data.result = "01";
                      data.name = "操作失败";
                      res.status(200).send(data);
                  }
              });
          let activity = {};
          for(let ac of activities){
              activity.name = organization.name;
              activity.projects = ac.projects;
              activity.activity_time = changeSingleDate(ac.activity_time);
              activity.estimated_number = ac.estimated_number;
              activity.address = ac.address;
              activity.nurseNum = ac.nurses.length;
              activity.nurses = ac.nurses;
              data.push(activity)
          }

      }
      res.status(200).send(data);
  });
  //根据活动查询活动所属机构所在地区的活动
  // params 活动id : _id
  app.get("/commissioner/showNursesByActivity",async function (req,res,next) {
      let aa = await loginModel.find({});
      console.log(aa);
      let _id = req.query._id;
      let activity = await activityModel.findOne({_id:_id},{organization_id:1},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              res.status(200).send(data);
          }
      });
      let organization_id = activity.organization_id;
      let organization = await organizationModel.findOne({_id:organization_id},{region:1},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              res.status(200).send(data);
          }
      });
      let nurses = await nurseModel.find({region:organization.region},{name:1,sex:1,region:1,certificate_No:1},
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
  //根据地区查询护士(模糊查询)
  //params 地区 : region
  app.get('/commissioner/showNursesByRegion',async function (req,res,next) {
      let region = req.query.region;
      let query = {};
      if(region){
        query.region = new RegExp(region);
      }
      let nurses = await nurseModel.find(query,{name:1,sex:1,region:1,certificate_No:1},
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
  //活动添加护士
  // params 活动id:_id;
  //        护士(数组):nurses 格式为[{nurse_id:String,name:String}]
  app.post('/commissioner/addNurses',async function (req,res,next) {
      let _id = req.body.params._id;
      let nurses = req.body.params.nurses;
      for( let nurse of nurses){
          let num = await activityModel.count({_id:_id,"nurses.nurse_id":nurse.nurse_id},function (err) {
              if(err){
                  let data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
              }
          });
          if(num==0){
              await activityModel.update({_id:_id},{$push:{nurses:nurse}},function (err) {
                  if(err){
                      let data = {};
                      data.result = "01";
                      data.name = "操作失败";
                      res.status(200).send(data);
                  }
              })
          }
      }
      let data = {};
      data.result = "02";
      data.name = "操作成功";
      res.status(200).send(data);

  });
  //活动删除护士
  // params 活动id:_id
  //        护士id:nurse_id
  app.post('/commissioner/removeNurses',async function (req,res,next) {
      let _id = req.body.params._id;
      let nurse_id = req.body.params.nurse_id;
      console.log(_id,nurse_id);
      await activityModel.update({_id:_id},{$pull:{nurse:{$elemMatch:{nurse_id:nurse_id}}}},function (err) {
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
  //查询行事历(分页查询,参数可无)
  // params 页码:pageNo  (默认第一页)
  //        每页显示条数:pageSize  (默认10条)
  //        企业名称:name      (模糊查询)
  //        开始时间:begin
  //        结束时间:end
  app.get('/logistics/commissioner/showActivities',async function (req,res,next) {
    let salesman_id = req.cookies.userId;
    let name = req.query.name||"";
    let pageNo = req.query.pageNo||1;
    let pageSize = req.query.pageSize||10;
    let begin = req.query.begin;
    let end = req.query.end;
    let hwason = await hwasonModel.findOne({_id:salesman_id},{area:1},function (err) {
      if(err){
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        return res.status(200).send(data);
      }
    });
    let organizations = await organizationModel.find({area:hwason.area,name:{$regex:name}},{
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
  app.get('/logistics/commissioner/showReports',async function (req,res,next) {
    let salesman_id = "5934f6cb0e3dda2eb88744a9";//req.cookies.userId;
    let name = req.query.name||"";
    let pageNo = req.query.pageNo||1;
    let pageSize = req.query.pageSize||10;
    let begin = req.query.begin;
    let end = req.query.end;
    let hwason = await hwasonModel.findOne({_id:salesman_id},{area:1},function (err) {
      if(err){
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        return res.status(200).send(data);
      }
    });
    let organizations = await organizationModel.find(
      {area:hwason.area,name:{$regex:name}},
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
    return (date.getYear() + 1900) + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getMinutes();
  }
};
