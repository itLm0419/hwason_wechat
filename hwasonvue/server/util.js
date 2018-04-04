/**
 * Created by win7 on 2017/4/13.
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
let fs = require('fs');
let loginModel = require('./util/schema/login');
module.exports = function (app) {
  //企业登录
  app.post('/wechat/login',async function (req,res,next){
    let userName = req.body.params.userName;
    let password = req.body.params.password;
    let result = await loginModel.findOne({'userName':{},'password':password},
      {_id:1,role:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
    if(!result){
      result =await loginModel.findOne({tel:userName,password:password},{_id:1,role:1},
        function (err) {
          if(err){
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            return res.status(200).send(data);
          }
        })
    }
    if(!result){
      let data = {};
      data.result = "02";
      data.name = "用户名或密码不正确";
      return res.status(200).send(data);
    }else{
      res.cookie('userId',result._id);
      return res.status(200).send(result);
    }
  });
  //修改密码
  //params  手机号码:tel
  //        新密码；password
  app.post('/wechat/modifyPassword',async function (req,res,next) {
      let tel = req.body.params.tel;
      let password = req.body.params.password;
      await loginModel.update({tel:tel},{$set:{password:password}},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }else{
          let data = {};
          data.result = "02";
          data.name = "操作成功";
          return res.status(200).send(data);
        }
      })
  })
};
