/**
 * Created by win7 on 2017/5/25.
 */
'use strict'
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var crypto = require('crypto');
let fs = require('fs');
var JSZip = require("jszip");
var xlsx = require('node-xlsx');
let activityModel = require('../../../util/schema/activities');
let organizationModel = require('../../../util/schema/organizations');
let loginModel = require('../../../util/schema/login');
let samplePackageModel = require('../../../util/schema/samplePackage');
let sampleMaterialModel = require('../../../util/schema/sampleMaterial');
let nurseModel = require('../../../util/schema/nurses');
let testModel = require('../../../util/schema/user');
module.exports=function (app) {
//企业活动咨询
  app.get('/wechat/company/consultation/consultation', async function (req, res, next) {
    let userId = req.cookies.userId;
    let user = await loginModel.findOne({'_id': userId},{_id:1});
    let organization = await organizationModel.findOne({manager_id:user._id},{_id:1},function (err) {
      if (err) {
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        res.status(200).send(data);
      }
    })
    let organization_id = organization._id;
    res.cookie('organization_id', organization_id);
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let todayActivity = await getTodayActivity(organization_id, year, month, day,res);
    let noCheckedActivity = await getNoCheckedActivity(organization_id,res);
    let data = {};
    data.todayActivity = todayActivity;
    data.noCheckedActivity = noCheckedActivity;
    res.status(200).send(data);
  });
//企业行事历主页
  app.get('/wechat/company/activity/main', async function (req, res, next) {
    let organization_id = req.cookies.organization_id;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let activity_days = await getMonthActivities(organization_id, year, month,res);
    let todayActivity = await getTodayActivity(organization_id, year, month, day,res);
    let data = {};
    data.activity_days = activity_days;
    data.todayActivity = todayActivity;
    res.status(200).send(data);
  });
//获取当月哪些天有活动
//参数 年 月 cook里organization_id
  app.get('/wechat/company/activity/getMonthActivities', async function (req, res, next) {
    let organization_id = req.cookies.organization_id;
    let year = parseInt(req.query.year);
    let month = parseInt(req.query.month) - 1;
    let activity_days = await getMonthActivities(organization_id, year, month,res);
    res.status(200).send(activity_days);
  });
//获取指定日期的活动
//参数 年 月 日 cook里organization_id
  app.get('/wechat/company/activity/getTodayActivity', async function (req, res, next) {
    let organization_id = req.cookies.organization_id;
    let year = parseInt(req.query.year);
    let month = parseInt(req.query.month) - 1;
    let day = parseInt(req.query.day);
    let todayActivity = await getTodayActivity(organization_id, year, month, day);
    res.status(200).send(todayActivity);
  });
//企业行事历添加
  app.post('/wechat/company/activity/doAdd', async function (req, res, next) {
    let data = req.body.params;
    let project = data.project;
    let activityTime = data.activityTime;
    let address = data.address;
    let peopleNum = data.peopleNum;
    let remark = data.remark;
    let createTime = new Date();
    let organization_id = req.cookies.organization_id;
    let userId = req.cookies.userId;
    let activityEntity = new activityModel({
      projects: project,
      activity_time: activityTime,
      address: address,
      remark: remark,
      create_man_id: userId,
      create_time: createTime,
      organization_id: organization_id,
      estimated_number: peopleNum,      //预计人数
      registration_number: 0,           //实际登记人数
      sampling_number: 0,               //实际采样状态
      sample_status: 0,                 //样本状态
      feedback_state: 0,                //反馈状态
    });

    activityEntity.save(function (err) {
      if (err) {
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        res.status(200).send(data);
      } else {
        let data = {};
        data.result = "02";
        data.name = "操作成功";
        res.status(200).send(data);
      }
    })
  });
//获取机构添加行事历时可选择的项目
  app.get('/wechat/company/activity/getProjects', async function (req, res, next) {
    let organization_id = req.cookies.organization_id;
    let organization = await organizationModel.findOne({_id: organization_id}, {projects: 1}, function (err) {
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
//通过活动Id获取单个活动,用于行事历修改页面的初始化
  app.get('/wechat/company/activity/modify', async function (req, res, next) {
    let data = req.query;
    let result = await activityModel.find({'_id': data.id}, {
      _id:1,
      projects: 1,
      activity_time: 1,
      address: 1,
      estimated_number: 1,
      remark: 1
    },function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          res.status(200).send(data);
        }
    });
    res.status(200).send(result);
  });
//修改行事历
  app.post('/wechat/company/activity/doModify', async function (req, res, next) {
    let data = req.body.params;
    await activityModel.update({
        _id: data.id
      },
      {
        $set: {
          projects: data.projects,
          activity_time: data.activity_time,
          address: data.address,
          peopleNum: data.peopleNum,
          remark: data.remark,
        }
      }, function (err) {
        if (err) {
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          res.status(200).send(data);
        } else {
          let data = {};
          data.result = "02";
          data.name = "操作成功";
          res.status(200).send(data);
        }
      });

  });
//机构管理员删除行事历
  app.post('/wechat/company/activity/remove', async function (req, res, next) {
    let id = req.body.params.id;
    await activityModel.remove({_id: id}, function (err) {
      if (err) {
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        res.status(200).send(data);
      } else {
        let data = {};
        data.result = "02";
        data.name = "操作成功";
        res.status(200).send(data);
      }
    });
  });
//企业活动列表
  app.get('/wechat/company/activity/list', async function (req, res, next) {
    let organization_id = req.cookies.organization_id;
    let finishActivity = await getFinishActivity(organization_id,res);
    res.status(200).send(finishActivity);
  });

//企业检测包
  app.get('/wechat/company/package/package', async function (req, res, next) {
    let organization_id = req.cookies.organization_id;
    let packages = await getPackage(organization_id,res);
    res.status(200).send(packages);
  });

// 申请
  app.get('/wechat/company/package/apply', async function (req, res, next) {
    let organization_id = req.cookies.organization_id;
    let inspectionPackages = await samplePackageModel.find({organization_id: organization_id});
    let index = inspectionPackages.length + 1;
    res.status(200).send(index);
  });
// 确定申请
  app.get('/wechat/company/package/confirm', async function (req, res, next) {
    let param = req.query;
    let organization_id = req.cookies.organization_id;
    let samplePackageEntity = samplePackageModel({
      organization_id: organization_id,
      gene_package: param.geneNum,
      senior_package: param.topNum,
      apply_date: new Date(),
      state:1
    });
    await samplePackageEntity.save(function (err) {
      if (err) {
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        res.status(200).send(data);
      } else {
        let data = {};
        data.result = "02";
        data.name = "操作成功";
        res.status(200).send(data);
      }
    });
  });
//报表下载
  app.post('/wechat/company/package/detail/download', async function (req, res, next) {
     let zip = new JSZip();
    // let organization_id = req.cookies.organization_id;
    // let result = await sampleMaterialModel.find({organization_id: organization_id});
    // console.log(result);
    // if (result != null) {
      let data = [];
      for (let i = 0; i < 5; i++) {
        let arr = [];
        arr.push("ssss");
        arr.push("dddd");
        arr.push("cccc");
        arr.push("vvvv");
        arr.push("mmmm");
        data.push(arr)
      }
      var buffer = xlsx.build([
        {
          name: 'sheet1',
          data: data
        }
      ]);
      //let organization = await organizationModel.findOne({_id: organization_id}, {name: 1});
      let organizationName = "qqqq";//organization.name;
      let date = new Date();
      let excelName = 'E:/excel/' + organizationName + '.xlsx';
      fs.writeFileSync(excelName, buffer, {'flag': 'w'});
      zip.file(organizationName + changeSingleDate(date) + '.xlsx', excelName);
      zip.generateAsync({type: "nodebuffer"}).then(function (content) {
        fs.writeFile('e://package.zip', content, function (err) {
          if (err) throw err;
          res.download('e://package.zip');
        });
      });
    // }
  });
// 物料明细
  app.get('/wechat/company/package/detail', async function (req, res, next) {
    let organization_id = req.cookies.organization_id;
    let date = new Date();
    let time = new Date(date.getFullYear(), date.getMonth()-1, date.getDate());
    await sampleMaterialModel.find({organization_id: organization_id,state:3,send_date:{$gte:time}},
      {
        _id: 1,
        send_date: 1,       //发货日期
        courier_number: 1,  //快递单号
        sender: 1,          //发货人
        contact: 1,         //联系方式
        receiver: 1,        //接收人
      },
      function (err, content) {
        if (err) {
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          res.status(200).send(data);
        } else {
          res.status(200).send(content);
        }
      })
  });

//物料明细表
  app.get('/wechat/company/package/detailForm', async function (req, res, next) {
    let id = req.query.id;
    await sampleMaterialModel.findOne({_id: id},
      { organization_id:0,
        state:0,               //申请：1，审批完成：2，发货完成：3
        apply_date:0,            //申请日期
        applicant:0,           //申请人id
        send_date:0,            //发货日期
        courier_number:0,     //快递单号
        courier_company:0,    //快递公司
        sender:0,              //发货人
        contact:0,            //联系方式
        receiver:0          //接收人
      },
      function (err, content) {
      if (err) {
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        res.status(200).send(data);
      } else {
        res.status(200).send(content);
      }
    });
  });

//企业样本跟踪
  app.get('/wechat/company/demo/demo', async function (req, res, next) {
    let organization_id = req.cookies.organization_id;
    await activityModel.find({organization_id: organization_id},
      {
        _id: 1,
        activity_time: 1,
        projects: 1,
        address: 1,
        sampling_number: 1
      },
      function (err, content) {
        if (err) {
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            res.status(200).send(data);
        } else {
          res.status(200).send(content);
        }
      });
  });
//根据活动id查报告批次及样本明细
  app.get('/wechat/company/demo/demoDetail', async function (req, res, next) {
    let id = req.query.id;
    let activity = await activityModel.find({_id: id}, {projects: 1, activity_time: 1});
    let users = await testModel.find({activity_id: id.toString(), sampled: true},
      {
        _id: 1,
        code: 1,
        name: 1,
        sex: 1,
        birthday: 1,
        projects: 1,
        cardNo: 1
      }
    )
    let data = {};
    data.user = users;
    data.activity = activity;
    res.status(200).send(data);
  })
//报告核对
  app.get('/wechat/company/demo/check', async function (req, res, next) {
    let id = req.query.id;
    await activityModel.update({_id: id}, {$set: {feedback_state: 0}}, function (err, content) {
      if (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          res.status(200).send(data);
        }
      } else {
        res.status(200).send(content);
      }
    })
  });

//机构管理员获取已完成的活动
  async function getFinishActivity(organization_id, res) {
    let finishActivity = await activityModel.find({organization_id: organization_id,sample_status:{$gte:1}}, {
      _id: 1,
      activity_time: 1,
      sample_status: 1,
      projects: 1,
      sampling_number: 1,
      address: 1
    },function (err) {
      if(err){
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        res.status(200).send(data);
      }
    })
    return finishActivity;
  }

//获取未核对的活动
  async function getNoCheckedActivity(organization_id) {
    let noCheckedActivity = await activityModel.find({organization_id: organization_id, feedback_state: {$in: [0, 1]}},
      {
        _id: 1,
        activity_time: 1,
        projects: 1,
        address: 1,
        sampling_number: 1,
        sample_status: 1,
        receiver: 1,
        feedback_state: 1
      });
    return noCheckedActivity;
  }

//通过机构id获取查询机构检测包
  async function getPackage(organization_id,res) {
    let date = new Date();
    let time = new Date(date.getFullYear(), date.getMonth()-1, date.getDate());
    let packages = await samplePackageModel.find({organization_id: organization_id,state:3,send_date:{$gte:time}},
      {
        send_date:1,
        courier_number:1,
        sender:1,
        contact:1,
        receiver:1
      },function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          res.status(200).send(data);
        }
      });
    return packages;
  }

//通过机构id和年月日查询当天活动
  async function getTodayActivity(organization_id, year, month, day,res) {
    let date = new Date(year, month, day);
    let begin = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    console.log(year, month, day)
    let todayActivity = await activityModel.find({
        organization_id: organization_id,
        activity_time: {$gte: begin, $lt: end}
      },
      {_id: 1, activity_time: 1, projects: 1, address: 1, estimated_number: 1, nurses: 1},
      function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          res.status(200).send(data);
        }
      });
    return todayActivity;
  }

//通过物料id查看有哪些物料
  async function getMaterialDetail(id) {
    let materialDetail = await materialDetailModel.find({_id: id});
    return materialDetail;
  }

//根据机构id和年月查询当月哪些天有活动
  async function getMonthActivities(organization_id, year, month) {
    let date = new Date(year, month);
    let begin = new Date(date.getFullYear(), date.getMonth());
    let end = new Date(date.getFullYear(), date.getMonth() + 1);
    let activities = await activityModel.find({
      'organization_id': organization_id,
      'activity_time': {$gte: begin, $lt: end}
    }, {'activity_time': 1},function (err) {
      if(err){
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        res.status(200).send(data);
      }
    })
    let days = [];
    if (activities != null) {
      for (let i = 0; i < activities.length; i++) {
        let index = days.indexOf(activities[i].activity_time.getDate());
        if (index == -1) days.push(activities[i].activity_time.getDate());
      }
    }
    return days;
  }

//通过公司id查看物料发放详情
  async function getMaterials(organization_id) {
    let materials = await materialDetailModel.find({organization_id: organization_id})
    return materials;
  }

//改变时间格式
  function changeSingleDate(date) {
    return (date.getYear() + 1900) + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getMinutes();
  }

  async function getMonthData(year, month) {
    let json = date.getMonthDayOfWeekByMonth(year, month);
    let lastMonthDays = json.lastMonthDays;
    let lastMonth = json.lastMonth;
    let nextMonth = json.nextMonth;
    let firstDay = json.firstDay;
    let lastDay = json.lastDay;
    let totalDays = json.totalDays;
    let startDay;
    //如果开始为星期6，即没有上一个月显示
    if (firstDay == 0) {
      startDay = new Date(year, month, '01');
    } else {
      //上一个月变成11，代表着变为上一年
      if (lastMonth == 11) {
        startDay = new Date(parseInt(year) - 1, parseInt(lastMonth) - 1, (lastMonthDays - (firstDay - 1)));
      } else {
        startDay = new Date(year, parseInt(lastMonth) - 1, (lastMonthDays - (firstDay - 1)));
      }
    }

    let endDay;
    //如果结尾为星期日，即没有下一个月显示
    if (lastDay == 6) {
      endDay = new Date(parseInt(year), month, totalDays);
    } else {
      if (nextMonth == 0) {
        endDay = new Date(parseInt(year) + 1, parseInt(nextMonth) - 1, 6 - lastDay);
      } else {
        endDay = new Date(year, parseInt(nextMonth) - 1, 6 - lastDay);
      }
    }

    let startDate = new Date(startDay.getYear() + 1900, startDay.getMonth(), startDay.getDate(), startDay.getHours() + 8);
    let endDate = new Date(endDay.getYear() + 1900, endDay.getMonth(), endDay.getDate() + 1, endDay.getHours() + 8);

    //company_id
    let company_id = 1;
    let result = await companyScheduleModel.find({'company_id': company_id}).where('time').gt(startDate).lt(endDate);

    let eventSet = new Set();
    if (result != null) {
      for (let i = 0; i < result.length; i++) {
        let dateStr = formatSingeDate(result[i].time);
        eventSet.add(dateStr);
      }
    }

    let arr = new Array();

    for (let item of eventSet) {
      arr.push(item);
    }
    json.eventArr = arr;

    function formatSingeDate(date) {
      return (date.getMonth() + 1) + "-" + date.getDate();
    }

    return json;
  }

}
