/**
 * Created by Bright xia on 2017/5/18.
 */
'use strict'
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//var articleDbUtil = require('../dbUtil/articleDbUtil')
//var dateUtil = require('../util/dateUtil')
//let date = require('../util/date/dateFormat');

let activityModel = require('../../../util/schema/activities');
let organizationModel = require('../../../util/schema/organizations');
let userActivityModel = require('../../../util/schema/userActivities');

import util from  '../../../util/common';


//var appResponse  = require('./app-response')

module.exports = function (app) {

//企业行事历当月活动
  app.get('/wechat/activitysheet/activity/GetDayofActivities', async function (req, res, next) {
    let organization_id = req.cookies.userId;
    //console.log("organization_id",organization_id)
    let date = new Date(req.query.year, req.query.month, req.query.day);

    let begin = new Date(date.getFullYear(), date.getMonth(),"1");

    let end = new Date(date.getFullYear(), date.getMonth() + 1,"1");

    let activities = await activityModel.find({'organization_id': organization_id}, {activity_time: 1},{sort: {'activity_time':1}}).where('activity_time').gte(begin).lt(end);
    //console.log(activities)
    if (activities == null) {
      return res.status(200).send(activities)

    }
    else {

      let days = [{}]
      let lastday0={}

      days.splice(0, days.length)
      let i;
      for (i = 0; i < activities.length; i++) {
        let day0 = {}
        day0.day = (new Date(activities[i].activity_time)).getDate();
        if(day0.day  !=lastday0.day)
              days.push(day0)
             lastday0=day0;
      }
      //console.log(days)
      return res.status(200).send(days)
    }
  })

//查询指定日活动的页面
  app.get('/wechat/activitysheet/activity/GetAllActivities', async function (req, res, next) {
    //let data = req.body;
    // if(data.day != '' && data.organization != null){
    //   resource.organization = data.organization;
    // }
    let i=0;
    let organization_id = req.cookies.userId;

    let date = new Date(req.query.year, req.query.month, req.query.day);

    let begin = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    let end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

    let activities = await activityModel.find({'organization_id': organization_id},{
        _id:1,
      projects: 1,
      estimated_number: 1,
      activity_time: 1,
      address: 1,
      remark: 1,
      nurses:1
    }).where('activity_time').gte(begin).lt(end);

    if (activities == null) {
      return res.status(200).send(activities)
      //console.log("start200")
    }
    else {
      let data=[];

      for(i=0;i<activities.length;i++) {
        let activity={};
         activity.activity_time=util.changeSingleDate(activities[i].activity_time);
        for(let k=0;k<activities[i].projects.length;k++)
        {
          if(k==0) activity.projects=activities[i].projects[k];
          else {
            activity.projects=activity.projects+'+'+activities[i].projects[k];
          }
        }
        activity.estimated_number=activities[i].estimated_number;
        activity.address=activities[i].address;
        activity.remark=activities[i].remark;
        activity.activity_id=activities[i]._id;
        activity.nurses=activities[i].nurses;
        data.push(activity);

      }
      return res.status(200).send(data)
    }

  })

    //查询企业的签约套餐
    app.get('/wechat/activitysheet/activity/GetProjects', async function (req, res, next) {
        let organization_id=req.query.organization_id;

        let time= new Date();

        let projects = await organizationModel.findOne({'_id': organization_id},{projects:1,giveProjects:1},function (err) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        });
        console.log(projects.projects,projects.giveProjects,333)
        let allProjects = [...projects.projects,...projects.giveProjects]
        let pro=[];
        let i;
        for(i=0;i<allProjects.length;i++) {

            if((allProjects[i].beginTime<=new Date() )&&(allProjects[i].endTime>=new Date()) )
            {
                if (pro.indexOf(allProjects[i].category) == -1) {
                    pro.push(allProjects[i].category);
                }
            }
        }
        let pros=[];
        if(pro.length>0)
        {
            for(let i=0;i<pro.length;i++)
            {
                if(i==0) pros=pro[0];
                else { pros=pros+'+'+pro[i];}
            }
        }
        return   res.status(200).send(pros)
     })

    //增加活动
    app.post('/wechat/activitysheet/activity/addactivity',async function (req, res, next) {

        let params = req.body;
        let userId = req.cookies.userId; //userId=organization 表的id
        let projects=[];
        if (params.projects.indexOf('+') != -1) {
            projects = params.projects.split(',');
        } else {
            projects = params.projects;
        }
        let organization = await organizationModel.findOne({_id:userId},{organizer_name:1,organizer_tel:1,receiver_name:1,receiver_tel:1,reportGl:1},function (err) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        });
        if(organization ==null)
        {
            let data = {};
            data.result = "03";
            data.name = "机构信息有误，请与华晟客服人员联系";
            return res.status(200).send(data);

        }
        let reportGl = false;
        for(let rg of organization.reportGl){
            if(new Date(params.activity_time)>=rg.beginTime&&new Date(params.activity_time)<=rg.endTime){
                if(rg.flag){
                    reportGl=true;
                    break;
                }
            }
        }
        let activity = await activityModel.findOne({organization_id:userId,activity_time:params.activity_time,address:params.address},{_id:1},function (err) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        });

if(activity !=null) {
        let data = {};
        data.result = "02";
        data.name = "活动已经添加，请不要重复添加，请核实！";
        return res.status(200).send(data);
}
else {

        //存储活动信息
        let activityEntity = new  activityModel({
            projects:projects,
            reportGl:reportGl,
            activity_time:params.activity_time,
            address:params.address,
            remark:params.remark,
            create_man:{id:'',name:organization.organizer_name,tel:organization.organizer_tel},
            create_time:new Date(),
            organization_id:userId,
            laboratory_checked:0,    //0:未核对 1:已核对 2:等待反馈
            receiver: {tel:organization.receiver_tel,name:organization.receiver_name},
            estimated_number:params.estimated_number,     //预计人数
            nurse_number:params.nurse_number,     //安排护士人数
            registration_number:0,  //实际登记人数
            sampling_number:0,      //实际采样人数
            sample_status:0,        //样本状态 样本状态
            // 0 无状态
            // 1 运输中
            // 2 检测中
            // 3 检测结束
            // 4 运回中
            // 5 已接收
            feedback_state:0,       //反馈状态 0:未核对 1:已核对 2:等待反馈
            last_modify_time:new Date(),
            last_modify_people_id:'',
            delivery_id:'',
            delivery_file_path:''

        });
        await activityEntity.save(function (err) {
            if (err) {
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            } else {
                let data = {};
                data.result = "00";
                data.name = "操作成功";
                return res.status(200).send(data);
            }

        });
}

    });

    //修改活动
    app.post('/wechat/activitysheet/activity/modifyactivity',async function (req, res, next) {

        let params = req.body;
        let userId = req.cookies.userId;
        let projects=[];
        //console.log(params)
        if(params.projects.indexOf('+') !=-1)
        { projects=params.projects.split('+')}
        else {
          projects=params.projects;
        }

        let userActivity = await userActivityModel.findOne({activity_id:params.activity_id},{_id:1},function (err) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        });

        if(userActivity != null) {

            let data = {};
            data.result = "02";
            data.name = "活动开始，有用户已经录入，不能修改";
            return res.status(200).send(data);

        }

        //存储活动信息
        await activityModel.update({_id:params.activity_id},{$set:{
            projects:projects,
            activity_time:params.activity_time,
            address:params.address,
            estimated_number:params.estimated_number,
            nurse_number:params.nurse_number,     //安排护士人数
            remark:params.remark}},async function (err) {
            if (err) {
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        });
        let data = {};
        data.result = "00";
        data.name = "操作成功";
        return res.status(200).send(data);

    });

    //删除活动
    app.post('/wechat/activitysheet/activity/deleteactivity',async function (req, res, next) {

        let params = req.body;
         //console.log(params)

        let userActivity = await userActivityModel.findOne({activity_id:params.activity_id},{_id:1},function (err) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        });

         if(userActivity != null) {

             let data = {};
             data.result = "02";
             data.name = "活动开始，有用户已经录入，不能删除";
             return res.status(200).send(data);

         }

        //存储活动信息
        await activityModel.remove({_id:params.activity_id},async function (err) {
            if (err) {
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        });
        let data = {};
        data.result = "00";
        data.name = "操作成功";
        return res.status(200).send(data);
    });


}


