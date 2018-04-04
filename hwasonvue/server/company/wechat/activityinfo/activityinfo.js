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
let userActivitiesModel = require('../../../util/schema/userActivities');
let organizationModel = require('../../../util/schema/organizations');

//var appResponse  = require('./app-response')
module.exports = function (app) {


    //查询机构当天的活动
    app.get('/wechat/activityinfo/todayActivity', async function (req, res, next) {
        let organization_id = req.cookies.userId;
        let date = new Date();
        let begin = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        let end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        let todayActivities = await activityModel.find({organization_id:organization_id},{projects:1,activity_time:1,address:1,organization_id:1,feedback_state:1},
            function(err){
                if (err) {
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }
            }).where('activity_time').gte(begin).lt(end).sort({activity_time:1});
        let data=[]
        for(let i=0;i<todayActivities.length;i++)
        {
            let activity={};
            activity.activity_time=changeSingleDate(todayActivities[i].activity_time);
            activity.address=todayActivities[i].address;
            activity.activity_id=todayActivities[i]._id;
            activity.feedback_state=todayActivities[i].feedback_state;
            for (let j = 0; j < todayActivities[i].projects.length; j++) {
                if (j == 0) {
                    activity.projects = todayActivities[i].projects[j];
                }
                else {
                    activity.projects = activity.projects + '+' + todayActivities[i].projects[j];
                }
            }
            data.push(activity)
        }
        return res.status(200).send(data)

    });

//查询今日活动的页面
    app.get('/wechat/activityinfo/todayActivityReport', async function (req, res, next) {
            let todayActivity_id=req.query.activity_id;
                    console.log("id2",todayActivity_id);
            let count_total =await userActivitiesModel.aggregate(
                [
                    {$match : {activity_id:todayActivity_id}},
                    {$group:  { _id: {'projects':'$projects'}, count: { $sum: 1 }}}
                ]);
            console.log("count_total",count_total)
            let count_sampled =await userActivitiesModel.aggregate(
                [
                    {$match : {activity_id:todayActivity_id,sampled:true}},
                    {$group:  { _id: {'projects':'$projects'}, count: { $sum: 1 }}}
                ]);
            console.log("count_sampled",count_sampled)
            if(count_total.length ==0)
            {
                let data={};
                return res.status(200).send(data)
            }
            console.log("idd",count_total[0]._id)
            console.log("projects",count_total[0]._id.projects)
            let data=new Array();
            let i,j;
            for(i=0;i<count_total.length;i++) {
                //data=new Array();
                let activity={};
                let pro="";

                for(let k=0;k<count_total[i]._id.projects.length;k++)
                {
                    if(k==0) pro=count_total[i]._id.projects[k];
                    else pro=pro+'+'+count_total[i]._id.projects[k]
                }

                activity.projects=pro;
                activity.total_number=count_total[i].count;
                for(j=0;j<count_sampled.length;j++)
                   {
                   if(count_sampled[j]._id.projects.length==count_total[i]._id.projects.length){
                       let len=count_sampled[j]._id.projects.length;
                       let q;
                      for(q=0;q<len;q++)
                      {
                          if(count_sampled[j]._id.projects[q]!=count_total[i]._id.projects[q])
                             break;
                      }
                      if (q==len)
                      {
                          activity.sampled_number=count_sampled[j].count;;
                          break;
                      }

                     }
                }
                if(j==count_sampled.length)
                     activity.sampled_number=0;
                activity.nosample_number=activity.total_number-activity.sampled_number;
                data.push(activity)
            }
            //console.log(data)
            return res.status(200).send(data)
        })
      // app.get('/wechat/activityinfo/todayActivity', async function (req, res, next) {
      //   let organization_id = req.cookies.userId;
      //   let date = new Date();
      //   let begin = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      //
      //   let end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
      //   let todayActivity = await activityModel.findOne({organization_id:organization_id},{projects:1,registration_number:1,sampling_number:1}).where('activity_time').gte(begin).lt(end).sort({activity_time:1});
      //
      //   if(todayActivity ==null )
      //   {
      //     let data = null;
      //     return res.status(200).send(data);
      //  } else {
      //
      //     let todayActivity_id=todayActivity._id.toString()
      //     //console.log("id2",todayActivity_id);
      //     let count_total =await userActivitiesModel.aggregate(
      //       [
      //         {$match : {activity_id:todayActivity_id}},
      //         {$group:  { _id: {'category':'$category'}, count: { $sum: 1 }}}
      //       ]);
      //     //console.log(count_total)
      //     let count_sampled =await userActivitiesModel.aggregate(
      //       [
      //         {$match : {activity_id:todayActivity_id,sampled:true}},
      //         {$group:  { _id: {'category':'$category'}, count: { $sum: 1 }}}
      //       ]);
      //     //console.log(count_sampled)
      //     //console.log("idd",count_total[0]._id)
      //     //console.log("category",count_total[0]._id.category)
      //     let data=new Array();
      //     let i,j;
      //     for(i=0;i<count_total.length;i++) {
      //       //data=new Array();
      //       let activity={};
      //       activity.category=count_total[i]._id.category;
      //       activity.total_number=count_total[i].count;
      //
      //       for(j=0;j<count_sampled.length;j++)
      //       {
      //         if(count_sampled[j]._id.category==activity.category){
      //           activity.sampled_number=count_sampled[j].count;
      //           break;
      //         }
      //
      //       }
      //       if(j==count_sampled.length)
      //         activity.sampled_number=0;
      //       activity.nosample_number=activity.total_number-activity.sampled_number;
      //
      //
      //       data.push(activity)
      //     }
      //     //console.log(data)
      //    return res.status(200).send(data)
      //   }
      //
      // })

//查询未检查报告的页面
    app.get('/wechat/activityinfo/GetUnCheckActivity', async function (req, res, next) {

        let organization_id = req.cookies.userId;

        let unCheckActivity = await activityModel.find({organization_id:organization_id,feedback_state:{$gte:0}},{
            activity_time:1,projects:1,address:1,sampling_number:1,sample_status:1,receiver:1,feedback_state:1}).sort({activity_time:-1}).limit(2);
        if(unCheckActivity ==null)
        {return res.status(200).send(unCheckActivity);}
        else
        {
            //console.log("unCheckActivity",unCheckActivity)
            let activity_time={},data={};
            for(let i=0;i<unCheckActivity.length;i++) {
                activity_time[i] = changeSingleDate(unCheckActivity[i].activity_time); }

                data.unCheckActivity = unCheckActivity;
                data.activity_time = activity_time;

            //console.log(unCheckActivity);
            return res.status(200).send(data)
            //console.log("end200")
            }

    })

    //查询客户告知书状态
    app.get('/wechat/activityinfo/queryNote',async function (req, res, next) {

        let organization_id = req.cookies.userId;

        //存储活动信息
        let data = await organizationModel.findOne({_id:organization_id},{
            notice_status: 1},async function (err) {
            if (err) {
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        });
        return res.status(200).send(data)
    });


    //修改客户告知书状态
    app.post('/wechat/activityinfo/updateNote',async function (req, res, next) {

       let userId = req.cookies.userId;

        //存储活动信息
        await organizationModel.update({_id:userId},{$set: {
            notice_status: 1
        }},async function (err) {
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
    app.post('/wechat/sample/comfirmActivity',async function (req,res,next) {
        let _id = req.body.params._id;
        let update = {};
        let activity = await activityModel.findOne({_id:_id},{sample_status:1})
        if(activity.sample_status=="0"||"10"){
            update = {$set: {
                feedback_state: 1,
                    sample_status: 11
            }}
        }else{
            update = {$set: {
                feedback_state: 1
            }}
        }
        await activityModel.update({_id:_id},update);
        let data = {};
        data.result = "00";
        data.name = "操作成功";
        res.status(200).send(data);
    });
    //客户活动结束确认
    app.post('/wechat/activityinfo/confirm',async function (req, res, next) {
        let activity_id=req.body.activity_id;
        let count = await userActivitiesModel.count({activity_id:activity_id});
        if(count==0){
           let data = {};
           data.name = "活动还未开始，不可结束";
           data.result = "02";
            res.status(200).send(data);
        }else{
            await activityModel.update({'_id':activity_id
            },{$set: {
                feedback_state: 1,
                sample_status: 11
            }},async function (err) {
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
        }
    });



  function changeSingleDate(date) {
    let month;
    if((date.getMonth() + 1).toString().length == 1){
      month="0"+(date.getMonth() + 1).toString();
    }else{
      month=(date.getMonth() + 1).toString();
    }
    let minute=date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;

    let hour=date.getHours();
    hour = hour < 10 ? ('0' + hour) : hour;

    return (date.getYear() + 1900) + "/" + month + "/" + date.getDate()+" "+hour+":"+minute;
  }
}


