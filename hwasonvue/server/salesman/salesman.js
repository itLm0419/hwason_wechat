/**
 * Created by win7 on 2017/5/25.
 */

let userModel = require('../util/schema/user');
let userActivityModel = require('../util/schema/userActivities');
let activityModel = require('../util/schema/activities');
let loginModel = require('../util/schema/login');
let projects2Model = require('../util/schema/projects2');
let organizationModel = require('../util/schema/organizations');

let salesmanModel = require('../util/schema/salesman')
import util  from "../util/common.js"
module.exports = function (app) {
  //业务员首页
  app.get('/wechat/salesman/index', function(req, res, next) {
      res.render('wechat/salesman/index');
  });
  // 业务员查询他的当天体检客户,用于审核用户  param : cookie里userId
  app.get('/wechat/salesman/siteActivity',async function(req, res, next) {
      // let login = await loginModel.findOne({userName:"zhangsan"});
      // res.cookie('userId',login._id);
      let userId = req.cookies.userId;
      // userId="59423d021954bdc51f9454fd"
      //console.log(userId);
      let date = new Date();
      let begin = new Date(date.getFullYear(),date.getMonth(),date.getDate());
      let end = new Date(date.getFullYear(),date.getMonth(),date.getDate()+1);
      let userActivity = await userActivityModel.find({"salesman.id":userId,create_time:{$gte:begin,$lt:end}},
        {projects:1,checked:1,userId:1,organization_id:1,sampled:1,test_number:1},function (err) {
          if(err){
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            return res.status(200).send(data);
          }
        });

      let data = [];
      for(let i = 0;i<userActivity.length;i++){
        let user = {};
        for(let j=0;j<userActivity[i].projects.length;j++)
        {if (j==0)  user.projects=userActivity[i].projects[j];
         else {
          user.projects=user.projects+'+'+userActivity[i].projects[j];
        }
        }
        user.projects=user.projects+"体检套餐";
        user.activity_id=userActivity[i].activity_id;
        user.organization_id=userActivity[i].organization_id;
        user.id=userActivity[i]._id;
        user.test_number = userActivity[i].test_number;

        if(userActivity[i].checked==false){
          user.checked="未核对";
        } else if(userActivity[i].sampled==true) {user.checked="已采样"; }
          else {user.checked="未采样";}

        let result = await userModel.findOne({_id:userActivity[i].userId},{name:1,sex:1},function (err) {
          if(err){
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            return res.status(200).send(data);
          }
        });
        user.user_id=result._id;
        user.name = result.name;
        user.sex = result.sex;
        data.push(user);
        //console.log("result:",result)
      }
      return res.status(200).send(data);
  });
  //业务员审核通过
  //  pramas 体检用户id : userId
  app.post('/wechat/salesman/confirm',async function (req,res,next) {
    let userId = req.body.params.userId;
    await userActivityModel.update({userId:userId},{$set:{checked:true}},function(err){
      if(err){
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        return res.status(200).send(data);
      }else{
        let data = {};
        data.result = "00";
        data.name = "操作成功";
        return res.status(200).send(data);
      }
    })
  })
  // 业务员客户信息管理入口  param : cookie里userId
  app.get('/wechat/salesman/customerMsg',async function(req, res, next) {
      let userId = req.cookies.userId;
      //console.log("userID",userId);
      let salesman = await salesmanModel.findOne({_id:userId},{organization_id:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
      let date = new Date();
      let begin = new Date(date.getFullYear(), date.getMonth()-1, date.getDate());
      let activities = await activityModel.find({organization_id:salesman.organization_id,"activity_time":{$gte:begin}},
        {_id:1,projects:1,address:1,sample_status:1,activity_time:1},
        function (err) {
          if(err){
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            return res.status(200).send(data);
          }
        });
      let data = [];
    //  console.log("activities",activities)

      if(activities!=null){
        for(let i=0;i<activities.length;i++){
          let activity = {};
          let num = await userActivityModel.count({"salesman.id":userId,activity_id:activities[i]._id,sampled:true},
            function (err) {
              if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
              }
            });
        //  activities[i].num = num;
          if(num!=0){
            activity.activity_id = activities[i]._id;
            for(let j=0;j<activities[i].projects.length;j++) {
              if (j == 0) {
                activity.projects = activities[i].projects[j];
              }
              else {
                activity.projects = activity.projects + '+' + activities[i].projects[j];
              }

            }
            activity.activity_time =changeSingleDate(activities[i].activity_time)
            activity.address = activities[i].address;

           if (activities[i].sample_status == 0) {
                  activity.sample_status= '未开始'
              }
            else if (activities[i].sample_status == 1) {
              activity.sample_status= '运输中'
            }
            else if (activities[i].sample_status == 2) {
              activity.sample_status = '检测中'
            }
            else if (activities[i].sample_status == 3) {
              activity.sample_status = '检测结束'
            }
            else if (activities[i].sample_status == 4) {
              activity.sample_status = '报告在途中'
            }
            else if (activities[i].sample_status == 5) {
              activity.sample_status = '已接收'
            }
           else if (activities[i].sample_status == 10) {
               activity.sample_status = '活动开始'
           }
           else if (activities[i].sample_status == 5) {
               activity.sample_status = '活动结束'
           }
            activity.num = num;
              data.push(activity)
          }

        }
      }
        return res.status(200).send(data);
      //console.log("data",data);
  });


  //机构业务员查询今日的活动
  app.get('/wechat/salesman/getTodayActivity',async function (req,res,next) {
      let userId = req.cookies.userId;

      let salesman = await salesmanModel.findOne({_id:userId},{organization_id:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
      //console.log("todayactivity",salesman);
      let date = new Date();
      let begin = new Date(date.getFullYear(),date.getMonth(),date.getDate());
      let end = new Date(date.getFullYear(),date.getMonth(),date.getDate()+1);
      let activities = await activityModel.find({organization_id:salesman.organization_id,activity_time:{$gte:begin,$lt:end}},
        {_id:1,activity_time:1,address:1},function (err) {
          if(err){
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            return res.status(200).send(data);
          }
        });
    //  console.log("xym",activities);
      let data=[]
       for(let i=0;i<activities.length;i++)
       {
         let activity={};
         activity.activity_time=changeSingleDate(activities[i].activity_time);
         activity.address=activities[i].address;
         activity.activity_id=activities[i]._id;
         data.push(activity)
       }


      return res.status(200).send(data);
  });
  //机构业务员添加客户
  //params  cookie里业务员id:userId
  //        活动id:activity_id
  //        体检套餐(字符串数组) :projects
  //        姓名:name
  //        性别:sex
  //        电话号码:tel
  //        出生日期:birthday
  //        身份证号:IDNo
  //
  app.post('/wechat/salesman/addCustomer',async function(req, res, next) {
      let salesman_id = req.cookies.userId;

      let params = req.body;
    //console.log("IDNo:",params.IDNo)
      let user = await userModel.findOne({IDNo:params.IDNo},{_id:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
      let userId;
   // console.log("user:")
   //   console.log(user)

      if(user == null){
         let userEntity = new userModel({
            name:params.name,
            sex:params.sex,
            tel:params.tel,
            IDNo:params.IDNo,
            createTime:new Date(),
            birthday:new Date(params.birthday.substr(0,4)+'/'+params.birthday.substr(4,2)+'/'+params.birthday.substr(6,2))
         });
         await userEntity.save(function (err,content) {
           if(err){
             let data = {};
             data.result = "01";
             data.name = "操作失败";
             return res.status(200).send(data);
           }else{
             userId = content._id;
             //console.log("userid:",userId)
           }
         });
      }
      else{
        userId = user._id;

          let userActivity0 = await userActivityModel.findOne({activity_id:params.activity_id,userId:userId},{_id:1},function (err) {
              if(err){
                  let data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
              }
          });
          console.log("userActivity0",userActivity0)
          if(userActivity0 !=null) {
              let data = {};
              data.result = "06";
              data.name = "用户本场活动已经录入，不要重复提交";
              return res.status(200).send(data);

          }
      }



    let activity = await activityModel.findOneAndUpdate(
       {_id:params.activity_id},
       {$inc:{registration_number:1}},
      {new:true}
      );
      if(activity !=null && activity.registration_number==1)
      {
          await activityModel.update({'_id':params.activity_id
          },{$set: {
              sample_status: 10
          }},async function (err) {
              if (err) {
                  let data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
              }
          });


      }

     //console.log("activity:",activity)
      let salesman = {};
      let login = await loginModel.findOne({_id:salesman_id},{_id:1,realName:1,tel:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
      salesman.id = login._id;
      salesman.name = login.realName;
      salesman.tel = login.tel;
      let userActivityEntity = new userActivityModel({
        userId:userId,
        name:params.name,
        IDNo:params.IDNo,
        barcode:'',
        checked:true,
        doubleChecked:false,
        nurse: {},
        organization_id:activity.organization_id,
        activity_id:params.activity_id,
        test_number:activity.registration_number,
        create_time:new Date(),
        sample_time:new Date("2000-01-01"),
        salesman:salesman,
        projects:params.projects,
        projects2:params.projects2,
        category:params.category,
        sampled:false,
        doctor_advise_status:10
      });
      await userActivityEntity.save(function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }else{
             let data = {};
             data.test_number=activity.registration_number;
             return res.status(200).send(data);
            }
          })
       });
  // 查看客户详情
  // params  体检用户id :_id
  app.get('/wechat/salesman/customerDetail',async function(req, res, next) {
      let userActivities_id = req.query.userActivities_id;
      let user_id = req.query.user_id;
      let data = {};
      //console.log(user_id)
      let userActivity = await userActivityModel.findOne({_id:userActivities_id},{projects:1,activity_id:1,salesman:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });

    for(let j=0;j<userActivity.projects.length;j++)
    {if (j==0)  data.projects=userActivity.projects[j];
    else {
      data.projects=data.projects+'+'+userActivity.projects[j];
    }
    }
   // data.projects=data.projects+"体检套餐";

      //console.log(userActivity)
      let activity = await activityModel.findOne({_id:userActivity.activity_id},{activity_time:1,address:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
      if(activity !=null) {
        data.activity_time = util.changeSingleDate(activity.activity_time);
        data.address = activity.address;
      }
      let user = await userModel.findOne({_id:user_id},{name:1,sex:1,tel:1,IDNo:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
      if(user !=null) {
        data.name = user.name;
        data.sex = user.sex;
        data.tel = user.tel;
        data.IDNo = user.IDNo;
        data.userId=user_id;
      }
      let salesman_id = userActivity.salesman.id;
      //console.log("salesman")
       //console.log(salesman_id)
      let login = await loginModel.findOne({_id:salesman_id},{userName:1,realName:1,tel:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
      if(login !=null) {
      data.salesman_name = login.realName;
      data.salesman_number = login.userName;
      data.salesman_name_tel = login.tel;
      }
      return res.status(200).send(data);
  });

  // 查看体检用户，实验室未签收前可查看修改,查看已经采血客户
  app.get('/wechat/salesman/stateCustomerDetail',async function(req, res, next) {
      let salesman_id = req.cookies.userId;

    let activity_id = req.query.activity_id;
      //console.log("activity_id:",activity_id)
      let userActivity = await userActivityModel.find({"salesman.id":salesman_id,"activity_id":activity_id,sampled:true},{userId:1,projects:1},
        function (err) {
          if(err){
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            return res.status(200).send(data);
          }
      });
    //console.log("userActivity:",userActivity)
      if(userActivity.length == 0){
        let data = {};
        data.result = "02";
        data.name = "没有数据";
        return res.status(200).send(data);
      }else{
        let data = [];
        for(let i = 0;i<userActivity.length;i++){
          let user = {};

            for(let j=0;j<userActivity[i].projects.length;j++)
            {if (j==0)  user.projects=userActivity[i].projects[j];
            else {
              user.projects=user.projects+'+'+userActivity[i].projects[j];
            }
            }

          let _id = userActivity[i].userId;
          //console.log(_id);
          let result = await userModel.findOne({_id:_id},{name:1,sex:1},function (err) {
            if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              return res.status(200).send(data);
            }
          })
          user.activity_id=userActivity[i].activity_id;
          user.userActivity_id=userActivity[i]._id;
          user.user_id=result._id;
          user.name = result.name;
          user.sex = result.sex;
          data.push(user);
        }
        return res.status(200).send(data);
      }
  });


    // 修改客户信息
    // params     体检用户id:_id
    //            体检套餐(数组):projects
    //            活动id:activity_id
    //            姓名:name
    //            性别:sex
    //            电话号码:tel
    //            身份证号码:IDNo
    //            业务员工号:userName
    app.post('/wechat/salesman/modifyCustomer2',async function(req, res, next) {
        let params= req.body;

         await userActivityModel.update({_id: params.userActivities_id},
                {$set: {checked: true}},
                function (err) {
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
     });


  // 修改客户信息
  // params     体检用户id:_id
  //            体检套餐(数组):projects
  //            活动id:activity_id
  //            姓名:name
  //            性别:sex
  //            电话号码:tel
  //            身份证号码:IDNo
  //            业务员工号:userName
  app.post('/wechat/salesman/modifyCustomer',async function(req, res, next) {
      let params= req.body;
      let userId = req.cookies.userId;
      await userModel.update({_id:params.user_id},{$set:{name:params.name,sex:params.sex,tel:params.tel,IDNo:params.IDNo}},
        function (err) {
          if(err){
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            return res.status(200).send(data);
          }
      });
      //console.log(params);

      if(params.isChange_salesman) {
        let salesman = await salesmanModel.findOne({userName: params.salesman_name}, {_id: 1}, function (err) {
          if (err) {
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            return res.status(200).send(data);
          }
        });


        await userActivityModel.update({_id: params.userActivities_id},
          {$set: {projects: params.projects, name:params.name,IDNo:params.IDNo,"salesman.id": salesman._id}},
          function (err) {
            if (err) {
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              return res.status(200).send(data);
            }
          });
      }
      if(params.isChange_project) {
        await userActivityModel.update({_id: params.userActivities_id},
          {$set: {projects: params.projects,name:params.name,IDNo:params.IDNo,}},
          function (err) {
            if (err) {
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              return res.status(200).send(data);
            }
          });

      }
      let data = {};
      data.result = "00";
      data.name = "操作成功";
      return res.status(200).send(data);

  });

  //业务员搜索设置
  app.get('/wechat/salesman/searchCustomer',async function(req,res,next){
      let param = req.body;
      let query = query(param);
      let users = userModel.find(query);
      return res.status(200).send(users);
  });
  //动态查询条件
  function query(param) {
      let query = {};
      if(param.project!=null){
          query.project = param.project;
      }
      if(param.name!=null){
          query.name = param.name;
      }
      let time = {};
      if(param.begin!=null){
          time.$gte = param.begin;
      }
      if(param.end!=null){
          time.$lte = param.end
      }
      if(time.hasOwnProperty()){
          query.sample_time = time;
      }
      return query;

  }
  //业务员查看可修改的体检人员(24小时内可修改)-
  async function getTestMansByUserId(userId) {

      return users;
  }
  //通过业务员id查询今日活动
  async function getTodayActivityByUserId(userId) {

  }

  //通过机构业务员id查询今日体检人员登记核对情况
  async function getTestMansBySalesmanId(userId) {
      let date = new Date();
      let begin = new Date(date.getFullYear(),date.getMonth(),date.getDate());
      let end = new Date(date.getFullYear(),date.getMonth(),date.getDate()+1);
      let users = await userModel.find({salesman_id:userId.toString()},{name:1,sex:1,projects:1}).where('createTime').gte(begin).lt(end);
      return users;
  }


  //根据公司id查询公司所包含的套餐和项目
  app.get('/wechat/getProjects',async function (req,res,next) {
    let organization_id = req.query.organization_id;
    let time= new Date();
    let projects = await organizationModel.findOne({_id:organization_id},{projects:1,giveProjects:1},function (err) {
      if(err){
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        return res.status(200).send(data);
      }
    });
    let allProjects = [];
    let pgp = "";
    if(projects.giveProjects&&projects.giveProjects.length){
        for(let gp of projects.giveProjects){
            if(gp.beginTime<=time&&gp.endTime>=time){
                pgp+= "+"+gp.name
            }
        }
        allProjects = [...projects.giveProjects,...projects.projects]
    }else{
        allProjects = projects.projects
    }
    let pro=[];
    let proDetail=[];
    let i,j=-1;
    for(i=0;i<allProjects.length;i++) {

        if((allProjects[i].beginTime<=time )&&(allProjects[i].endTime>=time) )
        {
            if (pro.indexOf(allProjects[i].category) == -1) {
                pro.push(allProjects[i].category);
                j=j+1;
                proDetail[j]=new Array();

            }
            let names = pgp.indexOf(allProjects[i].name)<0?allProjects[i].name+pgp:allProjects[i].name
            proDetail[j].push(names);
        }
    }

    let data={};
      data.category=pro;
      data.projects=proDetail;

    return res.status(200).send(data);
  });
  app.get('/wechat/salesman/getProjects2',async function (req,res,next) {
      let projects2 = await projects2Model.findOne({category:req.query.category})
      return res.status(200).send(projects2);;
  })

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


};
