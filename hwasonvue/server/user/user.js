/**
 * Created by win7 on 2017/5/25.
 */
var express = require('express');
let fs = require('fs');
let activityModel = require('../util/schema/activities');
let organizationModel = require('../util/schema/organizations');
let loginModel = require('../util/schema/login');
let userModel = require('../util/schema/user');
let userActivityModel = require('../util/schema/userActivities');
let salesmanModel = require('../util/schema/salesman');
let provinces = require('../../../src/util/provinces');
let provinceModel = require('../util/schema/provinces');
module.exports = function (app) {
  //体检用户输入个人信息之前输入业务员工号
  //params 业务员工号 : userName
  app.get('/wechat/examination/examination',async function (req,res,next) {
      let userName = req.query.userName;
      let salesman = await loginModel.findOne({userName:userName},{realName:1,tel:1},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              res.status(200).send(data);
          }
      });
      res.cookie("salesman",salesman);
      res.status(200).send(salesman);
  });
  //提供体检用户录入个人信息时的活动选择
 app.get('/wechat/examination/getActivities',async function (req,res,next) {
      let _id = req.cookies.salesman._id;
      let salesman = await salesmanModel.findOne({_id:_id},{organization_id:1},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              res.status(200).send(data);
          }
      });
      let organization_id = salesman.organization_id;
      let date = new Date();
      let begin = new Date(date.getFullYear(),date.getMonth(),date.getDate());
      let end = new Date(date.getFullYear(),date.getMonth(),date.getDate()+1);
      let activities = await activityModel.find({organization_id:organization_id,activity_time:{$gte:begin,$lt:end}},
          {address:1,activity_time:1},function (err) {
              if(err){
                  let data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
              }
      });
      let data = [];
      for(let activity of activities){
        let ac = {};
        ac.address = activity.address;
        ac.activity_time = changeSingleDate(activity.activity_time);
        data.push(ac);
      }
      res.status(200).send(data);
 });
  //提供体检用户选择体检套餐
  //params 活动id:_id
  app.get('/wechat/examination/getProjects',async function (req,res,next) {
      let _id = req.query._id;
      let activity = await activityModel.findOne({_id:_id},{projects:1,organization_id:1},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              res.status(200).send(data);
          }
      });
      let projects = activity.projects;
      let data = [];
      let organization = await organizationModel.findOne({_id:activity.organization_id}
      ,{projects:1},function (err) {
          if(err){
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            res.status(200).send(data);
          }
      });
      for(let project of projects){
          let pro = {};
          pro.category = project;
          let arr = [];
          for(let proj of organization.projects){
            if(project == proj.category){
                arr.push(proj.name);
            }
          }
          pro.projects = arr;
          data.push(pro)
      }
      res.status(200).send(data);
  });
  //体检用户输入完信息后点击点击完成
  //params 体检套餐(字符串数组):projects
  //       参加的活动id:activity_id
  //       姓名:name
  //       生日:birthday
  //       性别:sex
  //       电话号码:tel
  //       身份证号:IDNo
  //       cookie里salesman
  app.post('/wechat/examination/addUser',async function (req,res,next) {
      let params = req.body.params;
      let user = await userModel.findOne({IDNo:params.IDNo},{_id:1},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              res.status(200).send(data);
          }
      });
      let userId;
      if(user){
          userId = user._id;
      }else{
          let userEntity = new userModel({
              name:params.name,
              sex:params.sex,
              birthday:params.birthday,
              tel:params.tel,
              create_time:new Date(),
              IDNo:params.IDNo
          });
          let result = await userEntity.save(function (err) {
              if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                res.status(200).send(data);
              }
          });
          userId = result._id;
      }
      let activity = await activityModel.findOne({_id:params.activity_id},{registration_number:1},function (err) {
          if(err){
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            res.status(200).send(data);
          }
      });
      let salesman = {};
      salesman.salesman_id = req.cookies.salesman._id;
      salesman.salesman_name = req.cookies.salesman.realName;
      let userActivityEntity = new userActivityModel({
          userId:userId,
          activity_id:params.activity_id,
          test_number:activity.registration_number+1,
          checked:false,
          create_time:new Date(),
          salesman:salesman,
          projects:params.projects
      });
      await userActivityEntity.save(function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              res.status(200).send(data);
          }
      });
      await activityModel.update({_id:params.activity_id},{$inc:{registration_number:1}},function (err) {
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
  })
  //改变时间格式
  function changeSingleDate(date) {
    return (date.getYear() + 1900) + "-" + (date.getMonth() + 1) + "-" + date.getDate()+" "+date.getHours()+":"+date.getMinutes();
  }
};
