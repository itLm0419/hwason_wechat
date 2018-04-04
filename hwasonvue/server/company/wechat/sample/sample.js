/**
 * Created by Bright xia on 2017/6/1.
 */
'use strict'
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
import common from "../../../util/common.js"
//let moment=require('moment')
let activityModel = require('../../../util/schema/activities');
let userActivitiesModel = require('../../../util/schema/userActivities');
let userModel = require('../../../util/schema/user');

let samplePackageModel = require('../../../util/schema/samplePackage');
let sampleMaterialModel = require('../../../util/schema/sampleMaterial');

import util from  '../../../util/common';

module.exports = function (app) {

//企业样本跟踪--样本数据统计,近一个月
  app.get('/wechat/sample/samplelist', async function (req, res, next) {
    let organization_id = req.cookies.userId;
      //  console.log("samplelist");
    let date = new Date();
    let time = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
    await activityModel.find({organization_id: organization_id, activity_time: {$gte: time},sampling_number:{$gt: 0}},
      {
        _id: 1,
        activity_time: 1,
        projects: 1,
        address: 1,
        sampling_number: 1,
        sample_status: 1,
        feedback_state: 1,
        receiver: 1
      },
      function (err, content) {
        if (err) {
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        } else {
          let data=[];
           for (let i=0;i<content.length;i++)
           {
             let activity={};

             activity.activity_time=util.changeSingleDate(content[i].activity_time);
             for(let k=0;k<content[i].projects.length;k++)
             {
               if(k==0) activity.projects=content[i].projects[k];
               else {
                 activity.projects=activity.projects+'+'+content[i].projects[k];
               }
             }

            //console.log("sample_status000",content[i].sample_status)

             if(content[i].feedback_state==0)
              {activity.feedback_state= "未核对"  }
              else if(content[i].feedback_state==1)
             {activity.feedback_state= "已核对"  }
             else if(content[i].feedback_state==2)
             {activity.feedback_state= "待核对"  }
             if(content[i].sample_status==0)
              {activity.sample_status= "未开始"  }
             else if(content[i].sample_status==1)
             {activity.sample_status= "运输中"  }
             else if(content[i].sample_status==2)
             {activity.sample_status= "检测中"  }
             else if(content[i].sample_status==3)
             {activity.sample_status= "检测结束"  }
             else if(content[i].sample_status==4)
             {activity.sample_status= "寄送中"  }
             else if(content[i].sample_status==5)
             {activity.sample_status= "已接收"  }
             else if(content[i].sample_status==10)
             {activity.sample_status= "活动开始"  }
             else if(content[i].sample_status==11)
             {activity.sample_status= "活动结束"  }
             else {
                 activity.sample_status= "未知"
             }
          activity.sampling_number=content[i].sampling_number;
          activity.address=content[i].address;
          activity.receiver=content[i].receiver.name;
          activity.activity_id=content[i]._id;
          data.push(activity);
           }

          return res.status(200).send(data);
        }
      });
  });
//根据活动id查报告批次及样本明细--已采样
  app.get('/wechat/sample/sampledetaillist', async function (req, res, next) {
    let activity_id = req.query.activity_id;
    let isSample = req.query.isSample;
    let page=req.query.page;
    let sum=0;
    let userActivities=[];

   // let companyname = await organizationModel.find({organization_id: activity.organization}, {name: 1})
   //    if(!isSample) {
   //        sum = await userActivitiesModel.count({activity_id:activity_id,sampled:true});
   //    }
   //    else {
   //        sum = await userActivitiesModel.count({activity_id:activity_id});
   //    }

      sum = await userActivitiesModel.count({activity_id:activity_id,sampled:true});

     let maxpage=Math.ceil(sum/8)

     console.log("maxpage",maxpage)

    let num=(page-1)*8
     //  if(!isSample) {
     // userActivities = await userActivitiesModel.find({activity_id: activity_id,sampled:true},
     //  {
     //    _id: 1,
     //    userId:1,
     //    test_number: 1,
     //    barcode: 1,
     //    projects: 1,
     //    salesman:1,
     //    doublecheck:1
     //  }).skip(num).limit(8).sort({test_number:1})}
     //  else {
     //       userActivities = await userActivitiesModel.find({activity_id: activity_id},
     //          {
     //              _id: 1,
     //              userId:1,
     //              test_number: 1,
     //              barcode: 1,
     //              projects: 1,
     //              salesman:1,
     //              doublecheck:1
     //          }).skip(num).limit(8).sort({test_number:1})
     //  }

      userActivities = await userActivitiesModel.find({activity_id: activity_id,sampled:true},
           {
             _id: 1,
             userId:1,
             test_number: 1,
             barcode: 1,
             projects: 1,
             salesman:1,
             doublecheck:1
           }).skip(num).limit(8).sort({test_number:1})

     let users=[];
    if(userActivities !=null) {
     for(let i=0;i<userActivities.length;i++)   {
         let user0={};
     let user = await userModel.findOne({_id: userActivities[i].userId},
      {
        _id: 1,
        name: 1,
        sex: 1,
        IDNo: 1,
        birthday: 1

      })

      user0.name=user.name;
      user0.sex=user.sex;
      console.log("today",new Date().getFullYear());
      console.log("birthday",user.birthday)
      console.log("birthday2",new Date(user.birthday).getFullYear())

      user0.age=new Date().getFullYear()-new Date(user.birthday).getFullYear();
         console.log("age",user0.age)
      user0.IDNo=user.IDNo;
    for(let j=0;j<userActivities[i].projects.length;j++) {
             if (j == 0) {
                 user0.projects = userActivities[i].projects[j];
             }
             else {
                 user0.projects = user0.projects + '+' + userActivities[i].projects[j];
             }
      }
      user0.barcode=userActivities[i].barcode;
      user0.salesman=userActivities[i].salesman;
      user0.id=userActivities[i]._id;
      user0.userId=user._id;
      users.push(user0);
      }
    let data = {};
     data.users = users;
     data.maxpage=maxpage;
     return res.status(200).send(data);

    }

  })


    //根据活动id查报告批次及样本明细--未采样
    app.get('/wechat/sample/sampledetaillist2', async function (req, res, next) {
        let activity_id = req.query.activity_id;
        let isSample = req.query.isSample;
        let page=req.query.page;
        let sum=0;
        let userActivities;

        // let companyname = await organizationModel.find({organization_id: activity.organization}, {name: 1})
        // if(!isSample) {
        //     sum = await userActivitiesModel.count({activity_id:activity_id,sampled:false});
        // }
        // else {
        //     sum = await userActivitiesModel.count({activity_id:activity_id});
        // }
        sum = await userActivitiesModel.count({activity_id:activity_id,sampled:false});

        let maxpage=Math.ceil(sum/8)

        console.log("sum",sum)

        let num=(page-1)*8;
        userActivities = await userActivitiesModel.find({activity_id: activity_id,sampled:false},
                {
                    _id: 1,
                    userId:1,
                    test_number: 1,
                    barcode: 1,
                    projects: 1,
                    salesman:1,
                    doublecheck:1
                }).skip(num).limit(8).sort({test_number:1})

        let users=[];
        console.log("userActivities",userActivities)
        if(userActivities !=null) {
            for(let i=0;i<userActivities.length;i++)   {
                let user0={};
                let user = await userModel.findOne({_id: userActivities[i].userId},
                    {
                        _id: 1,
                        name: 1,
                        sex: 1,
                        IDNo: 1,
                        birthday: 1

                    })

                user0.name=user.name;
                user0.sex=user.sex;


                user0.age=new Date().getFullYear()-new Date(user.birthday).getFullYear();

                user0.IDNo=user.IDNo;
                for(let j=0;j<userActivities[i].projects.length;j++) {
                    if (j == 0) {
                        user0.projects = userActivities[i].projects[j];
                    }
                    else {
                        user0.projects = user0.projects + '+' + userActivities[i].projects[j];
                    }
                }
                user0.barcode=userActivities[i].barcode;
                user0.salesman=userActivities[i].salesman;
                user0.id=userActivities[i]._id;
                user0.userId=user._id;
                users.push(user0);
            }
            let data = {};
            data.users = users;
            data.maxpage=maxpage;
            return res.status(200).send(data);

        }

    })

    //样本明细核对，每次只显示未核对的，
    app.get('/wechat/sample/samplecheck', async function (req, res, next) {
        let activity_id = req.query.activity_id;
        //console.log("id",activity_id)
                   // let companyname = await organizationModel.find({organization_id: activity.organization}, {name: 1})
           let userActivities = await userActivitiesModel.find({activity_id: activity_id, sampled: true,doubleChecked:false},
                {
                    _id: 1,
                    userId:1,
                    test_number: 1,
                    barcode: 1,
                    projects: 1,
                    salesman:1
                }
            ).sort({test_number:1}).limit(8)
            //console.log("userActivities:",userActivities)
            let users=[];
            if(userActivities !=null) {
                for(let i=0;i<userActivities.length;i++)   {
                  let user = await userModel.findOne({_id: userActivities[i].userId},
                        {
                            _id: 1,
                            name: 1,
                            sex: 1,
                            IDNo: 1,
                            birthday: 1

                        })
                    let user0={};
                    user0.name=user.name;
                    user0.sex=user.sex;
                    user0.age=new Date().getFullYear()-new Date(user.birthday).getFullYear();
                    user0.IDNo=user.IDNo;

                    for(let j=0;j<userActivities[i].projects.length;j++) {
                        if (j == 0) {
                            user0.projects = userActivities[i].projects[j];
                        }
                        else {
                            user0.projects = user0.projects + '+' + userActivities[i].projects[j];
                        }
                    }
                    user0.barcode=userActivities[i].barcode;
                    user0.salesman=userActivities[i].salesman;
                    user0.id=userActivities[i]._id;
                    user0.userId=user._id;
                    users.push(user0);


            }

            return res.status(200).send(users);
            //console.log(users)
        }

    })


    //样本明细核对，核对操作，
    app.post('/wechat/sample/confirm', async function (req, res, next) {
        let activity_id = req.body.activity_id;
        let users =req.body.users;
        // let companyname = await organizationModel.find({organization_id: activity.organization}, {name: 1})
        await userActivitiesModel.update({userId:{$in:users},activity_id:activity_id}, {$set: {doubleChecked:true}}, { multi: true },async function (err) {
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
        })

        })

//报告核对
  app.post('/wechat/wechat/company/demo/check', async function (req, res, next) {
    let id = req.body.id;
    await activityModel.update({_id: id}, {$set: {feedback_state: 0}}, function (err, content) {
      if (err) {
        if (err) {
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      } else {
        return res.status(200).send(content);
      }
    })
  });
}
