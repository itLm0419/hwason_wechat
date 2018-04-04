/**
 * Created by Bright xia on 2017/5/18.
 */
'use strict'
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//var articleDbUtil = require('../dbUtil/articleDbUtil')
//var dateUtil = require('../util/dateUtil')
//let date = require('../util/date/dateFormat');
let companyScheduleModel = require('./util/schema/companySchedule');


var appResponse  = require('./app-response')

module.exports = function (app) {
  // 保存文章
 /* app.post('/addactivity/saveActivity', function (req, res) {
    var activity = req.body
    // 获取用户id
   // article.userId = req.session.user.id
    // 获取当前时间
  //  article.publishTime = new Date().format('yyyy-MM-dd hh:mm:ss')
  //  articleDbUtil.saveArticle(article).then(function (response) {
    saveActivity(activity).then(function (response) {
      var resultObj = {
        status: 1,
        message: '保存成功',
        //articleId: response[0].id
      }
      appResponse(res, JSON.stringify(resultObj))
    }, function () {
      var resultObj = {
        status: 0,
        message: '保存失败'
      }
      appResponse(res, JSON.stringify(resultObj))
    })
  }) */


  // 保存文章
  app.post('/addactivity/saveActivity', async function (req, res) {
    var activity = req.body
    // 获取用户id
    // article.userId = req.session.user.id
    ///let company_id = req.cookies.company_id;
    let company_id = "2211";
    let data = req.body;
    console.log(data.time);
    var s =data.time;
    s = s.replace(/-/g,"/");
    var date = new Date(s);
    console.log(date);
    let companySchedule = new companyScheduleModel({
      company_id:company_id,
      combo:data.combo,
      time:date,
      place:data.place,
      personNum:data.personNum,
      remark:data.remark
    })
    console.log(companySchedule);
    let result = await companySchedule.save();
    console.log("result")
    console.log(result);
    var respResult = {
      status0: 1,
      message: '注册失败!'
    }
    console.log(respResult);
    res.status(200).send(respResult)
   // res.status(200).send(JSON.stringify(respResult))

    //appResponse(res, JSON.stringify(respResult))

    /*if(result != null){
      res.send({'msg':'增加成功'});
    }else{
      res.send({'msg':'操作失败，请重试！'});
    } */

  })





  async function saveActivity(activity){

    console.log(activity);
    var promise = new Promise(function (resolve, reject) {

          if(error) {
            reject(error)
          } else {
            resolve("ok")
          }

      })

  }

  //获取今日活动
  async  function getTodayActivity(organization_id) {
    let date = new Date();
    let begin = new Date(date.getFullYear(),date.getMonth(),date.getDate());
    let end = new Date(date.getFullYear(),date.getMonth(),date.getDate()+1);
    let todayActivity = await activityModel.find({organization_id:organization_id}).where('activityTime').gte(begin).lt(end);
    return todayActivity;
  }


}
