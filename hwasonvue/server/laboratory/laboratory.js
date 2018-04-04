/**
 * Created by win7 on 2017/6/13.
 * 销售经理业务
 */
'use strict'
var express = require('express');
var router = express.Router();
var http = require("http");
var JSZip = require("jszip");
var crypto = require('crypto');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var xlsx = require('node-xlsx');
var request = require('request');
let activityModel = require('../util/schema/activities');
let loginModel = require('../util/schema/login');
let salesmanModel = require('../util/schema/salesman');
let organizationModel = require('../util/schema/organizations');
let industryModel = require('../util/schema/industry');
let orgCategoryModel = require('../util/schema/orgCategory');
let projectModel = require('../util/schema/projects');
let cities = require('../util/code');
let industies = require('../util/industry');
let countryModel = require('../util/schema/counties');
let cityModel = require('../util/schema/cities');
let provinceModel = require('../util/schema/provinces');
let hwasonModel = require('../util/schema/hwason');
let util = require('../util2');
module.exports = function (app) {
  //查询报告批次(分页查询,参数可无)
  // params 页码:pageNo  (默认第一页)
  //        每页显示条数:pageSize  (默认10条)
  //        企业名称:name      (模糊查询)
  //        开始时间:begin
  //        结束时间:end
  //        检测项目(数组):projects  [String]
  app.get('/laboratory/showReports', async function (req, res, next) {
    let name = req.query.name || "";
    let pageNo = req.query.pageNo || 1;
    let pageSize = req.query.pageSize || 10;
    let begin = req.query.begin;
    let end = req.query.end;
    let organizations = await organizationModel.find(
      {name: {$regex: name}},
      {_id: 1, name: 1}, function (err) {
        if (err) {
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
    let arr = [];
    for (let organization of organizations) {
      arr.push(organization._id);
    }
    let orgIds = {};
    orgIds.$in = arr;
    let query = {};
    query.organization_id = orgIds;
    let dateParam = {};
    if (begin) {
      dateParam.$gte = begin;
    }
    if (end) {
      dateParam.lte = end;
    }
    if (dateParam.hasOwnProperty()) {
      query.activity_time = dateParam;
    }
    let sample_status = {};
    sample_status.$nin = 0;
    query.sample_status = sample_status;
    query.project = req.query.projects;
    let data = await util.queryReports(pageNo, pageSize, query, res);
    return res.status(200).send(data);
  });
  // 核对无误
  // params 活动id:_id
  app.post('/laboratory/checkedActivity',async function (req,res,next) {
      await activityModel.update({_id:req.body.params._id},{$set:{laboratory_checked:1}},function (err) {
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
  // 给体检用户添加条形码
  // params users(对象数组) : users  格式为 [{userId:String,laboratory_code:String}]
  app.post('/laboratory/addCode',async function (req,res,next) {
      let users = req.body.params.users;
      for(let user of users){
          await update({userId:user.userId},{$set:{laboratory_code:laboratory_code}},function (err) {
              if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                res.status(200).send(data);
              }
          })
      }
      let data = {};
      data.result = "00";
      data.name = "操作失败";
      res.status(200).send(data);
  });
  // 导出报告
  // 活动id(数组):_id [String]
  // app.post('/laboratory/exportReports',async function (req,res,next) {
  //     let pageNo = 1;
  //     let pageSize = Number.POSITIVE_INFINITY;
  //     let id = req.body.params._id;
  //     for(let _id of id){
  //         let data = await util.queryReportDetail(_id,pageNo,pageSize,res);
  //     }
  // })
  //导出测试
  app.post('/test/exportReports', async function (req, res, next) {
    res.download("C:/Users/win7/Downloads/temp (37)/TM3毕仁忠HS010828.pdf","aaa.pdf",function (err) {
        if(err){
          console.log(err);
        }
        console.log(222);
    });
    // function downloadFile(url,filename,callback){
    //   var stream = fs.createWriteStream(filename);
    //   request(url).pipe(stream).on('close', callback);
    // }
    //
    // var fileUrl  = 'E:/excel/' + "ssssss" + '.xlsx';
    // var filename = 'fff.xlsx';
    // downloadFile(fileUrl,filename,function(){
    //   console.log(filename+'下载完毕');
    // });

    // console.log("aaa");
    // let zip = new JSZip();
    // let result = await organizationModel.find({});
    //   let data = [];
    //   for (let i = 0; i < result.length; i++) {
    //     let arr = [];
    //     arr.push(result[i].address);
    //     arr.push(result[i].name);
    //     arr.push(result[i].region);
    //     arr.push(result[i].code);
    //     arr.push(result[i].director_tel);
    //     data.push(arr)
    //   }
    //   var buffer = xlsx.build([
    //     {
    //       name: 'sheet1',
    //       data: data
    //     }
    //   ]);
    //   //let organization = await organizationModel.findOne({_id: organization_id}, {name: 1});
    //   let organizationName = "ssssss";//organization.name;
    //   let excelName = 'E:/excel/' + organizationName + '.xlsx';
    //
    //   fs.writeFileSync(excelName, buffer, {'flag': 'w'});

      // let file_content = fs.readFileSync('E:/excel/' + organizationName + '.xlsx');
      // zip.file(organizationName  + '.xlsx', file_content);
      // zip.generateAsync({type: "nodebuffer"}).then(function (content) {
      //   fs.writeFile('e://package.zip', content, function (err) {
      //     if (err) throw err;
      //     res.download('e://package.zip');
      //   });
      // });
  });
  function changeSingleDate(date) {
    return (date.getYear() + 1900) + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getMinutes();
  }
};
