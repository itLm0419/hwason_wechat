/**
 * Created by win7 on 2017/5/25.
 */


let activityModel = require('../util/schema/activities');
let organizationModel = require('../util/schema/organizations');
let loginModel = require('../util/schema/login');
let userModel = require('../util/schema/user');
let userActivityModel = require('../util/schema/userActivities');
let salesmanModel = require('../util/schema/salesman');
//let provinces = require('../../../src/util/provinces');
let provinceModel = require('../util/schema/provinces');
module.exports = function (app) {
  //体检用户输入个人信息之前输入业务员工号
  //params 业务员工号 : userName
  app.get('/wechat/examination/examination',async function (req,res,next) {
      let userName = req.query.userName;
      let salesman = await loginModel.findOne({userName:userName},{_id:1,realName:1,tel:1},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              return res.status(200).send(data);
          }
      });

      if(salesman !=null) {

          let result2 = await salesmanModel.findOne({_id: salesman._id}, {_id: 1, organization_id: 1, tel: 1},
              function (err) {
                  if (err) {
                      let data = {};
                      data.result = "01";
                      data.name = "操作失败";
                      return res.status(200).send(data);

                  }
              });
          if (result2 == null) {
              let data = {};
              data.result = "03";
              data.name = "业务员注册信息有误，请联系华晟人员解决";
              return res.status(200).send(data);

          } else {
              //console.log("organizationid:", result2.organization_id)
              let result3 = await organizationModel.findOne({_id: result2.organization_id}, {
                      _id: 1,
                      name: 1,
                      checked: 1
                  },
                  function (err) {
                      if (err) {
                          let data = {};
                          data.result = "01";
                          data.name = "操作失败";
                          res.status(200).send(data);
                          return;
                      }
                  });
              if (result3 == null) {
                  let data = {};
                  data.result = "03";
                  data.name = "企业注册信息有误，请联系华晟人员解决";
                  res.status(200).send(data);
                  return;
              }

              let data = {};;
              data.result="00"
              data.salesman = salesman;
              data.organization_id = result2.organization_id;
              data.companyName = result3.name;
              res.cookie("salesman",salesman);
              return res.status(200).send(data);
          }
      } else {
          let data = {};
          data.result = "02";
          data.name = "业务员不存在，请核实";
          res.status(200).send(data);
          return;

      }


  });


  //提供体检用户录入个人信息时的活动选择
 app.get('/wechat/examination/getActivities',async function (req,res,next) {
      let _id = req.cookies.salesman._id;
      let salesman = await salesmanModel.findOne({_id:_id},{organization_id:1},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              return res.status(200).send(data);
          }
      });
      //console.log("salesman",salesman)
      let organization_id = salesman.organization_id;
     let company = await organizationModel.findOne({_id:organization_id},
         {name:1},function (err) {
             if(err){
                 let data = {};
                 data.result = "01";
                 data.name = "操作失败";
                 return res.status(200).send(data);
             }
         });

      let date = new Date();
      let begin = new Date(date.getFullYear(),date.getMonth(),date.getDate());
      let end = new Date(date.getFullYear(),date.getMonth(),date.getDate()+1);
      let activities = await activityModel.find({organization_id:organization_id,activity_time:{$gte:begin,$lt:end}},
          {address:1,activity_time:1,feedback_state:1},function (err) {
              if(err){
                  let data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
              }
      });
      let data = [];
      for(let activity of activities){
        let ac = {};
        ac.address = activity.address;
        ac.activity_time = changeSingleDate(activity.activity_time);
        ac.activity_id= activity._id;
        data.push(ac);
        //console.log("data",ac)
      }
      let result={};
       result.data=data;
       result.company=company;
      return res.status(200).send(result);
 });
  //提供体检用户选择体检套餐--支持有效期
  //params 活动id:_id
  app.get('/wechat/examination/getProjects',async function (req,res,next) {
      let _id = req.query._id;
      let activity = await activityModel.findOne({_id:_id},{projects:1,organization_id:1},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              return res.status(200).send(data);
          }
      });
      let time= new Date();
      let projects = await organizationModel.findOne({_id:activity.organization_id},{projects:1},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              return res.status(200).send(data);
          }
      });

      //   console.log("projects",projects)

      let pro=[];
      let proDetail=[];
      let i,j=-1;

      for(i=0;i<projects.projects.length;i++) {

          if((projects.projects[i].beginTime<=time )&&(projects.projects[i].endTime>=time) )
          {
              if (pro.indexOf(projects.projects[i].category) == -1) {
                  pro.push(projects.projects[i].category);
                  j=j+1;
                  proDetail[j]=new Array();

              }

              proDetail[j].push(projects.projects[i].name);

          }



      }
      let data={};
      data.category=pro;
      data.projects=proDetail;

      return res.status(200).send(data);
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
      let params = req.body;
      let user = await userModel.findOne({IDNo:params.IDNo},{_id:1},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              return res.status(200).send(data);
          }
      });
      let userId;
      if(user){
          userId = user._id;
          let userActivity0 = await userActivityModel.findOne({activity_id:params.activity_id,userId:userId},{_id:1},function (err) {
              if(err){
                  let data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
              }
          });

          if(userActivity0 !=null) {
              let data = {};
              data.result = "06";
              data.name = "用户本场活动已经录入，不要重复提交";
              return res.status(200).send(data);

          }



      }else{
          let userEntity = new userModel({
              name:params.name,
              sex:params.sex,
              birthday:new Date(params.IDNo.substr(6,4)+'/'+params.IDNo.substr(10,2)+'/'+params.IDNo.substr(12,2)),
              tel:params.tel,
              create_time:new Date(),
              IDNo:params.IDNo
          });
          let result = await userEntity.save(function (err) {
              if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
              }
          });
          userId = result._id;
      }
      //console.log("userid",userId);
      //console.log("activity_id",params.activity_id);




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

      let salesman = {};
      salesman.id = req.cookies.salesman._id;
      salesman.name = req.cookies.salesman.realName;
      salesman.tel = req.cookies.salesman.tel;


      let userActivityEntity = new userActivityModel({
          userId:userId,
          name:params.name,
          IDNo:params.IDNo,
          barcode:'',
          activity_id:params.activity_id,
          test_number:activity.registration_number,
          organization_id:activity.organization_id,
          checked:false,
          doubleChecked:false,
          nurse: {},
          create_time:new Date(),
          sample_time:new Date("2000-01-01"),
          salesman:salesman,
          projects:params.projects,
          category:params.category,
          sampled:false
      });
      await userActivityEntity.save(function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              return res.status(200).send(data);
          }
          else{
              let data = {};
              data.test_number=activity.registration_number;
              return res.status(200).send(data);
          }
      });

  });
  //改变时间格式
    function changeSingleDate(date)
    {
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
