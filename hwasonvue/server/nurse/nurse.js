
/**
 * Created by win7 on 2017/5/25.
 */
'use strict'
let path=require('path');
let fs=require('fs');
let join=path.join;
let multer  = require('multer')

let provinces =require('../util/provinces')
let nurseModel = require('../util/schema/nurse');
let projectsModel = require('../util/schema/projects');
let userModel = require('../util/schema/user');
let userActivityModel = require('../util/schema/userActivities');
let activityModel = require('../util/schema/activities');
let loginModel = require('../util/schema/login');
let organizationModel = require('../util/schema/organizations');
let dirDelivery='/home/hwason/delivery/'
let dirDelivery0='/home/hwason/delivery'
let dirPhoto='/home/hwason/photo_id/'
let dirPhoto0='/home/hwason/photo_id'
let dirWorkPhoto='/home/hwason/photo_work/'
let dirWorkPhoto0='/home/hwason/photo_work'
let mineType = require('mime-types');
// let dirDelivery="e:/delivery/"
// let dirDelivery0="e:/delivery"
// let dirPhoto="e:/photo_id/"
// let dirPhoto0="e:/photo_id"
// let dirWorkPhoto="e:/photo_work/"
// let dirWorkPhoto0="e:/photo_work"

module.exports = function (app) {

    //获取地区数据
    app.get('/wechat/nurse/getProvinces', async function (req, res, next) {
        return res.status(200).send(provinces);
    });

    app.get('/wechat/nurse/getPhoto', async function (req, res, next) {

        let filename= req.query.userName;

        let filePath=dirPhoto+filename+'.jpg';
        console.log("filepath",filePath)
        var mime = require('mime');
        var mimeType = mime.lookup(filePath); //==> image/gif
        console.log("mimeType",mimeType)
        res.setHeader('Content-Type', mimeType);
       // res.setHeader('Content-Type', 'image/jpeg');
       // res.setEncoding('binary');
       // res.sendfile(filePath)
        res.download(filePath);
    });

    app.get('/wechat/nurse/getWorkPhoto', async function (req, res, next) {

        let filename= req.query.userName;

        let filePath=dirWorkPhoto+filename+'.jpg';
        var mime = require('mime');
        var mimeType = mime.lookup(filePath); //==> image/gif
        res.setHeader('Content-Type', mimeType);
        // res.setHeader('Content-Type', 'image/jpeg');
        // res.setEncoding('binary');
        // res.sendfile(filePath)
        res.download(filePath);
    });
    app.get('/wechat/nurse/getDeliveryNo',async function (req,res,next) {
        let _id = req.query._id;
        let orgName = req.query.companyName;
        let activity = await activityModel.findOne({_id:_id},{delivery_id:1,delivery_file_path:1});
        let address = activity.delivery_file_path+orgName+".jpg";
        let datas = {};
        datas.delivery_id = activity.delivery_id;
        let flag = fs.existsSync(address);
        if(flag){
            let filePath = path.resolve(address);
            let data = fs.readFileSync(filePath);
            data = new Buffer(data).toString('base64');
            let base64 = 'data:' + mineType.lookup(filePath) + ';base64,' + data;
            datas.base64 = base64;
        }
        console.log(activity)
        console.log(datas)
        res.status(200).send(datas);
    });
    app.get('/wechat/nurse/getDeliveryPhoto', async function (req, res, next) {

        let filename= req.query.companyName;
        let activity_id=req.query.activity_id;
        console.log("filename",filename)
        console.log("activity_id",activity_id)
        let activity = await activityModel.findOne({_id:activity_id},
            {delivery_id:1,delivery_file_path:1},function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }
            });
        if(activity !=null)
        {
            let filePath=activity.delivery_file_path+filename+'.jpg';
            console.log("filepath",filePath)
            var mime = require('mime');
            var mimeType = mime.lookup(filePath); //==> image/gif
            console.log("mimeType",mimeType)
            res.setHeader('Content-Type', mimeType);
            // res.setHeader('Content-Type', 'image/jpeg');
            // res.setEncoding('binary');
            // res.sendfile(filePath)
            res.download(filePath);
        }
        else {
            res.status(200).send('');
        }
    });


//护士注册
  app.post('/wechat/nurse/regist', async function (req, res, next) {
    let params = req.body;
    //console.log(params.passwd,params.tel)
    let nurse = await loginModel.findOne({tel:params.tel},
             {tel:1},function (err) {
              if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
              }
            })
    //console.log("nurse")
    //console.log(nurse)
    if (nurse !=null ) {  let data = {};
      data.result = "10";
      data.name = "用户已存在";
      return res.status(200).send(data);
    }

    let loginEntity = new loginModel({
      userName:params.tel,
      password:params.passwd,
      role:'31',//01:机构，02：机构业务员，
                  // 11：华晟销售总监，12：华晟销售经理，13，华晟区域销售经理，13：销售代表
                  //21：华晟物流经理，
                  //31：护士
                  //80：超级管理员，81：总经理
      tel:params.tel,
     // realName:params.realName,
      realName:'',
      department:''
    });
    await loginEntity.save(function (err) {
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
  //获取省市县及编号
  app.get('/wechat/nurse/getRegion',async function (req,res,next) {
      console.log("region tets")

  });
//护士提交信息,我的中心请求也是用这个
  app.post('/wechat/nurse/registnext',async function (req, res, next) {
    let params = req.body;

    //console.log(params)
    //查询login 获得登陆护士的id（用于nurse 表id）
    let nurselogin = await loginModel.findOne({tel:params.tel},
      {_id:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      })

 ///查询护士表是否已经有这个信息
    let nurse = await nurseModel.findOne({_id:nurselogin._id},
      {_id:1,checked:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      })
    //console.log("nurse")
    //console.log(nurse)
    if (nurse !=null ) {
        if(nurse.checked!=1)
        {
            let data = {};
            data.result = "10";
            data.name = "用户已存在";
            return res.status(200).send(data);
        }
        else {
            await nurseModel.update({_id:nurselogin._id},{$set:{realName: params.realName,IDNo: params.IDNo,
                    sex: params.sex,tel:params.tel,address: params.address,region: params.region,
                    cardholder: params.cardholder,owned_bank: params.owned_bank,card_number: params.card_number,
                    open_bank: params.open_bank,certificate_No:params.certificate_No,unit_name:params.unit_name,
                    certificate_file:params.certificate_file,photo_file:params.photo_file,post:params.post,checked:0,
                    create_time:new Date(),
                    referee_name:params.referee_name,
                    referee_tel:params.referee_tel
                }},
                function (err) {
                    if(err){
                        let data = {};
                        data.result = "01";
                        data.name = "操作失败";
                        return res.status(200).send(data);
                    }
                    else {
                        let data = {};
                        data.result = "00";
                        data.name = "操作成功";
                        return res.status(200).send(data);

                    }
                });

        }

    }
    //存储护士表信息
    let nurseEntity = new nurseModel({
      _id: nurselogin._id,
      realName: params.realName,
      IDNo: params.IDNo,  //身份证号码
      sex: params.sex,
      tel:params.tel,
      address: params.address,
      region: params.region,
      cardholder: params.cardholder,   //持卡人
      owned_bank: params.owned_bank,   //所属银行
      card_number: params.card_number, //银行卡号
      open_bank: params.open_bank,      //开户行
      certificate_No:params.certificate_No,
      unit_name:params.unit_name,
      certificate_file:params.certificate_file,
      photo_file:params.photo_file,
      post:params.post,
      checked:0,
      create_time:new Date(),
      referee_name:params.referee_name,
      referee_tel:params.referee_tel







    });
    await nurseEntity.save(function (err) {
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
//
  app.post('/wechat/nurse/myCenter_Save',async function (req, res, next) {
    let params = req.body;
    let userId = req.cookies.userId;
    //console.log(params)

      await nurseModel.update({_id:userId},{$set:{realName: params.realName,IDNo: params.IDNo,
          sex: params.sex,tel:params.tel,address: params.address,region: params.region,
          cardholder: params.cardholder,owned_bank: params.owned_bank,card_number: params.card_number,
          open_bank: params.open_bank,certificate_No:params.certificate_No,unit_name:params.unit_name,
          certificate_file:params.certificate_file,photo_file:params.photo_file,post:params.post
          }},
          function (err) {
              if(err){
                  let data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
              }
              else {
                  let data = {};
                  data.result = "00";
                  data.name = "操作成功";
                  return res.status(200).send(data);

              }
          });


    //      //存储护士表信息
    // let nurseEntity = new nurseModel({
    //   _id: userId,
    //   realName: params.realName,
    //   IDNo: params.IDNo,  //身份证号码
    //   sex: params.sex,
    //   tel:params.tel,
    //   address: params.address,
    //   region: params.region,
    //   cardholder: params.cardholder,   //持卡人
    //   owned_bank: params.owned_bank,   //所属银行
    //   card_number: params.card_number, //银行卡号
    //   open_bank: params.open_bank,      //开户行
    //   certificate_No:params.certificate_No,
    //   unit_name:params.unit_name,
    //   certificate_file:params.certificate_file,
    //   photo_file:params.photo_file,
    //   post:params.post
    // });
    // await nurseEntity.save(function (err) {
    //   if (err) {
    //     let data = {};
    //     data.result = "01";
    //     data.name = "操作失败";
    //     res.status(200).send(data);
    //   } else {
    //     let data = {};
    //     data.result = "00";
    //     data.name = "操作成功";
    //     res.status(200).send(data);
    //   }
    //
    // });
  });

  //护士我的中心显示基本信息
  app.get('/wechat/nurse/myCenter',async function (req, res, next) {
    let userId = req.cookies.userId;
    //console.log(userId)
      ///查询护士表是否已经有这个信息
    let nurse = await nurseModel.findOne({_id:userId},
      function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      })
    //console.log("nurse")
    //console.log(nurse)
    return res.status(200).send(nurse);
    });

  //根据护士id查询护士将要负责的活动
  app.get('/wechat/nurse/getActivities',async function (req,res,next) {
    let userId = req.cookies.userId;

    //console.log("userid",userId);
    let activity = await getActivities(userId,res);
    //console.log(activity);
    res.status(200).send(activity);
  });
  //根据护士id查询护士将要负责的活动
  app.get('/wechat/nurse/getAllDayActivities',async function (req,res,next) {
    let userId = req.cookies.userId;

    //console.log(userId);
    let activities = await getAllDayActivities(userId,res);
    //console.log("activities",activities);
    res.status(200).send(activities);
  });

  //护士邀请其他护士共同参与某场活动的采样
  //param  tel:被邀请护士的手机号
  //       activity_id:活动id
  // app.post('/wechat/nurse/addActivityNurse',async function (req,res,next) {
  //   let tel = req.body.params.tel;
  //   let activity_id = req.body.params.activity_id;
  //   let login = await loginModel.findOne({tel:tel},{_id:1,realName},function (err) {
  //     if(err){
  //       let data = {};
  //       data.result = "01";
  //       data.name = "操作失败";
  //       res.status(200).send(data);
  //     }
  //   });
  //   let nurse = {};
  //   nurse.nurse_id = login._id.toString();
  //   nurse.name = login.realName;
  //   activityModel.update({_id:activity_id},{$push:{nurses:nurse}},function(err){
  //     if(err){
  //       let data = {};
  //       data.result = "01";
  //       data.name = "操作失败";
  //       res.status(200).send(data);
  //     }else{
  //       let data = {};
  //       data.result = "02";
  //       data.name = "操作成功";
  //       res.status(200).send(data);
  //     }
  //   })
  // });
  //查询体检用户
  //param  test_number:检测序号
  //       IDNo:身份证号
  //       activity_id:活动id

  // app.get('/wechat/nurse/getUser', async function (req, res, next) {
  //   let test_number = req.query.test_code;
  //   let IDNo = req.query.IDNo;
  //   let name=req.query.name;
  //   let activity_id = req.query.activity_id;
  //   console.log(test_number,IDNo,activity_id);
  //   if(test_number!=null&&test_number!=""){
  //     let userActivity = await userActivityModel.findOne({test_number:test_number,activity_id:activity_id},
  //         {projects:1,salesman:1,userId:1,activity_id:1,checked:1},function (err) {
  //           if (err) {
  //             let data = {};
  //             data.result = "01";
  //             data.name = "操作失败";
  //             res.status(200).send(data);
  //           }
  //         })
  //
  //     if(userActivity == null){
  //       let data = {};
  //       data.result = "02";
  //       data.name = "用户不存在，请核实序号是否正确";
  //       res.status(200).send(data);
  //     }
  //     if(userActivity.checked == false){
  //       let data = {};
  //       data.result = "03";
  //       data.name = "用户还未通过审核";
  //       res.status(200).send(data);
  //     }
  //     let userId = userActivity.userId;
  //     let user = await userModel.findOne({_id:userId},
  //         {name:1,sex:1, tel:1, IDNo:1}, function (err) {
  //           if (err) {
  //             let data = {};
  //             data.result = "01";
  //             data.name = "操作失败";
  //             res.status(200).send(data);
  //           }
  //         })
  //     let data = {};
  //     data.userActivity = userActivity;
  //     data.user = user;
  //     res.status(200).send(data);
  //     return;
  //   }
  //   if(IDNo!=null&&IDNo!=""){
  //     console.log(IDNo);
  //     let user = await userModel.findOne({IDNo:IDNo},{name:1,sex:1, tel:1, IDNo:1},function (err) {
  //       if(err){
  //         let data = {};
  //         data.result = "01";
  //         data.name = "操作失败";
  //         res.status(200).send(data);
  //       }
  //     })
  //     console.log(user);
  //     let userId = user._id;
  //     console.log(userId,activity_id)
  //     let userActivity = await userActivityModel.findOne({userId:userId,activity_id:activity_id},
  //       {projects:1,salesman:1,userId:1,activity_id:1，checked:1},function (err) {
  //         if(err){
  //           let data = {};
  //           data.result = "01";
  //           data.name = "操作失败";
  //           res.status(200).send(data);
  //         }
  //       })
  //     console.log(userActivity);
  //     if(userActivity == null){
  //       let data = {};
  //       data.result = "02";
  //       data.name = "用户不存在,请核实身份证号是否正确";
  //       res.status(200).send(data);
  //     }
  //     if(userActivity.checked == false){
  //       let data = {};
  //       data.result = "03";
  //       data.name = "用户还未通过审核";
  //       res.status(200).send(data);
  //     }
  //     let data = {};
  //     data.user = user;
  //     data.userActivity = userActivity;
  //     res.status(200).send(data);
  //   }
  // });
//sampling 中获取用户信息
  app.get('/wechat/nurse/getUser', async function (req, res, next) {
    let test_number = req.query.test_code;
    let IDNo = req.query.IDNo;
    let userId = req.query.userId;
    let activity_id = req.query.activity_id;
      console.log("userId1",userId)
    if (test_number != null && test_number != "") {
          let userActivity = await
        userActivityModel.findOne({test_number: test_number, activity_id: activity_id},
          {projects: 1, salesman: 1, userId: 1, activity_id: 1,sampled:1,checked:1}, function (err) {
            if (err) {
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              return res.status(200).send(data);
            }
          });
      if (userActivity == null) {
        let data = {};
        data.result = "02";
        data.name = "用户不存在";
        return res.status(200).send(data);
      }
      else {
        if(userActivity.checked==false)
        { let data = {};
          data.result = "03";
          data.name = "用户还未通过审核，请联系业务员审核";
          return res.status(200).send(data);
        }
       if(userActivity.sampled==true) {
         let data = {};
         data.result = "02";
         data.name = "用户已采样完成";
         return res.status(200).send(data);
       }
      }
      let userId = userActivity.userId;
      let user = await
        userModel.findOne({_id: userId},
          {name: 1, sex: 1, tel: 1, IDNo: 1}, function (err) {
            if (err) {
              let data = {};
              data.result = "01";
              data.name = "操作失败";
            return  res.status(200).send(data);
            }
          })
      let data = {};
      data.userActivity = userActivity;
      data.user = user;
      return res.status(200).send(data);
    }


    else   if (IDNo != null && IDNo != "") {

          let userActivity = await
              userActivityModel.findOne({IDNo: IDNo, activity_id: activity_id},
                  {projects: 1, salesman: 1, userId: 1, activity_id: 1,sampled:1,checked:1}, function (err) {
                      if (err) {
                          let data = {};
                          data.result = "01";
                          data.name = "操作失败";
                          return res.status(200).send(data);
                      }
                  });
          if (userActivity == null) {
              let data = {};
              data.result = "02";
              data.name = "用户不存在";
              return res.status(200).send(data);
          }
          else {
              if(userActivity.checked==false)
              { let data = {};
                  data.result = "03";
                  data.name = "用户还未通过审核，请联系业务员审核";
                  return res.status(200).send(data);
              }
              if(userActivity.sampled==true) {
                  let data = {};
                  data.result = "02";
                  data.name = "用户已采样完成";
                  return res.status(200).send(data);
              }
          }
          let userId = userActivity.userId;
          let user = await
              userModel.findOne({_id: userId},
                  {name: 1, sex: 1, tel: 1, IDNo: 1}, function (err) {
                      if (err) {
                          let data = {};
                          data.result = "01";
                          data.name = "操作失败";
                          return  res.status(200).send(data);
                      }
                  })
          let data = {};
          data.userActivity = userActivity;
          data.user = user;
          return res.status(200).send(data);
      }
    else   if (userId != null && userId != "") {

        let userActivity = await
            userActivityModel.findOne({userId: req.query.userId, activity_id: activity_id},
                {projects: 1, salesman: 1, userId: 1, activity_id: 1,sampled:1,checked:1}, function (err) {
                    if (err) {
                        let data = {};
                        data.result = "01";
                        data.name = "操作失败";
                        return res.status(200).send(data);
                    }
                });
        console.log("userActivity1",userActivity)
        if (userActivity== null) {
            let data = {};
            data.result = "02";
            data.name = "用户不存在";
            return res.status(200).send(data);
        }
        else  {
            if(userActivity.checked==false)
            { let data = {};
                data.result = "03";
                data.name = "用户还未通过审核,请联系业务员审核";
                return res.status(200).send(data);
            }
            if(userActivity.sampled==true) {
                let data = {};
                data.result = "02";
                data.name = "用户已采样完成";
                return res.status(200).send(data);
            }
        }
        let userId = userActivity.userId;
        let user = await
            userModel.findOne({_id: userId},
                {name: 1, sex: 1, tel: 1, IDNo: 1}, function (err) {
                    if (err) {
                        let data = {};
                        data.result = "01";
                        data.name = "操作失败";
                        return  res.status(200).send(data);
                    }
                })
        let data = {};
        data.userActivity = userActivity;
        data.user = user;
        return res.status(200).send(data);
    }




  });


    //sampling 中根据名字获取用户列表
    app.get('/wechat/nurse/getUserbyName', async function (req, res, next) {
            let name = req.query.name;
            let activity_id = req.query.activity_id;

            if (name != null && name != "") {
                let userActivity = await
                    userActivityModel.find({name: {$regex: name}, activity_id: activity_id},
                        { name: 1, IDNo: 1, userId: 1}, function (err) {
                            if (err) {
                                let data = {};
                                data.result = "01";
                                data.name = "操作失败";
                                return res.status(200).send(data);
                            }
                        });
                if (userActivity.length == 0) {
                    let data = {};
                    data.result = "02";
                    data.name = "用户不存在";
                    return res.status(200).send(data);
                }
                else {

                    return res.status(200).send(userActivity);
                }
            }
        }
    );


  // 护士采样采样后确认
  // param   体检人id :_id
  //         活动id   :activity_id
  //         条形码 :barcode
  //         cookie里护士id:userId
  app.post('/wechat/nurse/sampling/sampling', async function (req, res, next) {
    let nurseId = req.cookies.userId;
    let userId = req.body.userId;
    let activity_id = req.body.activity_id;
    let barcode = req.body.barcode;
    let isUserChg= req.body.isUserChg;
    let isProjectChg=req.body.isProjectChg;
    let userInfo=req.body.userInfo;
    //let isSalesmanChg=req.body.isSalesmanChg;

    if(isUserChg==true) {
      await userModel.update({_id:userId},{$set:{name:userInfo.userName,sex:userInfo.sex,tel:userInfo.tel,IDNo:userInfo.IDNo}},async function (err) {
        if (err) {
          let data = {};
          data.result = "01";
          data.name = "操作失败";
         return  res.status(200).send(data);
        }
      });
    }

    let nurse = await nurseModel.findOne({_id:nurseId},{_id:1,realName:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
         return  res.status(200).send(data);
        }
    });
    let nurse0={}
    nurse0.id =nurse._id;
    nurse0.name=nurse.realName;

      let count = await userActivityModel.findOne({barcode:barcode},{_id:1},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              return res.status(200).send(data);
          }
      });

      if(count !=null)
      {
          let data = {};
          data.result = "05";
          data.name = "该条码已经使用，条码不能重复，请重新录入条码";
          return res.status(200).send(data);

      }
      let oneUserActivity = await userActivityModel.findOne({userId:userId,activity_id:activity_id})
      let oneActivity = await activityModel.findOne({_id:activity_id},{advise:1});
      let projects = [];
      let adviseProjects = [];
      for(let pro of oneUserActivity.projects){
          if(pro!="心血管评估6项"&&pro.indexOf("HC")<0&&projects.indexOf(pro)<0){
              let project = await projectsModel.findOne({'projects.name':pro})
              projects.push(project.category);
              adviseProjects.push(pro)
          }
      }
      for(let hc of oneUserActivity.projects2){
          projects = [...projects,...hc.content];
          adviseProjects = [...adviseProjects,...hc.content]
      }
      for(let ps of projects){
          let flag = true;
          for(let ad of oneActivity.advise){
              if(ps == ad.project){
                  flag = false;
              }
          }
          if(flag){
              let advise = {project:ps,advise_status:1};
              await activityModel.update({_id:activity_id},{$push:{advise:advise}})
          }
      }
      let adviseBy = []
      for(let ap of adviseProjects){
          let obj = {};
          obj.project = ap;
          obj.status = 10;
          adviseBy.push(obj);
      }
    await userActivityModel.update({userId:userId,activity_id:activity_id}, {$set: {adviseBy:adviseBy,projects:userInfo.projects,barcode:barcode,nurse:nurse0,sampled: true}},async function (err) {
      if (err) {
          let data = {};
          data.result = "01";
          data.name = "操作失败";
         return res.status(200).send(data);
      } else {
        activityModel.update({_id: activity_id}, {$inc: {sampling_number: 1}}, function (error) {
          if (error) {
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
      }
    });
  });
  app.post('/wechat/nurse/sampling/sampling2', async function (req, res, next) {
    let nurseId = req.cookies.userId;
    let userId = req.body.userId;
    let activity_id = req.body.activity_id;
    let barcode = req.body.barcode;

    let nurse = await nurseModel.findOne({_id:nurseId},{_id:1,realName:1},function (err) {
      if(err){
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        return res.status(200).send(data);
      }
    });
    let nurse0={}
       nurse0.id =nurse._id;
       nurse0.name=nurse.realName;

      let count = await userActivityModel.findOne({barcode:barcode},{_id:1},function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              return res.status(200).send(data);
          }
      });

      if(count !=null)
      {
          let data = {};
          data.result = "05";
          data.name = "该条码已经使用，条码不能重复，请重新录入条码";
          return res.status(200).send(data);

      }
      let oneUserActivity = await userActivityModel.findOne({userId:userId,activity_id:activity_id})
      let oneActivity = await activityModel.findOne({_id:activity_id},{advise:1});
      let projects = [];
      let adviseProjects = [];
      for(let pro of oneUserActivity.projects){
          if(pro!="心血管评估6项"&&pro.indexOf("HC")<0&&projects.indexOf(pro)<0){
              let project = await projectsModel.findOne({'projects.name':pro})
              projects.push(project.category);
              adviseProjects.push(pro)
          }
      }
      for(let hc of oneUserActivity.projects2){
          projects = [...projects,...hc.content];
          adviseProjects = [...adviseProjects,...hc.content]
      }
      for(let ps of projects){
          let flag = true;
          for(let ad of oneActivity.advise){
              if(ps == ad.project){
                  flag = false;
              }
          }
          if(flag){
              let advise = {project:ps,advise_status:1};
              await activityModel.update({_id:activity_id},{$push:{advise:advise}})
          }
      }
      let adviseBy = [];
      for(let ap of adviseProjects){
          let obj = {};
          obj.project = ap;
          obj.status = 10;
          adviseBy.push(obj);
      }
    await userActivityModel.update({userId:userId,activity_id:activity_id}, {$set: {adviseBy:adviseBy,barcode:barcode,nurse:nurse0,sampled:true}},async function (err) {
      if (err) {
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        return res.status(200).send(data);
      } else {
        activityModel.update({_id: activity_id}, {$inc: {sampling_number: 1}}, function (error) {
          if (error) {
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
      }
    });
  });
  // 客户信息修改
  // param  用户id :_id
  //        姓名:name
  //        性别:sex
  //        身份证号 :IDNo
  //        电话号码 :tel
  app.post('/wechat/nurse/sampling/modify', async function (req, res, next) {
    let param = req.body;
    await userModel.update(
      {
        _id: param._id
      },
      {
        $set: {
          name: param.name,
          sex: param.sex,
          IDNo: param.IDNo,
          tel: param.tel
        }
      }, function (err) {
        if (err) {
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data)
        } else {
          let data = {};
          data.result = "02";
          data.name = "操作成功";
          return res.status(200).send(data);
        }
      });
  });
    // 护士已录信息
    //pramas  活动id :activity_id
    app.get('/wechat/nurse/recordeinfo/recordeinfo2', async function (req, res, next) {
        let activity_id = req.query.activity_id;
        let userActivity = await userActivityModel.find({activity_id:activity_id,sampled:true},{test_number:1,salesman:1,barcode:1,userId:1},function (err) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        })
        let users = [];
        //console.log("userActivity1:",userActivity)
        for(let i=0;i<userActivity.length;i++){
            let data = {};
            data.test_number = userActivity[i].test_number;
            data.salesman_name = userActivity[i].salesman.name;
            data.barcode = userActivity[i].barcode;
            let userId = userActivity[i].userId;
            let user = await userModel.findOne({_id:userId},{name:1,sex:1},function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return  res.status(200).send(data);
                }
            })
            data.userName = user.name;
            data.sex = user.sex;
            users.push(data)
        }


        return res.status(200).send(users);
    });

    // 护士未录信息
    //pramas  活动id :activity_id
    app.get('/wechat/nurse/recordeinfo/recordeinfo3', async function (req, res, next) {
        let activity_id = req.query.activity_id;
        let userActivity = await userActivityModel.find({activity_id:activity_id,sampled:false},{test_number:1,salesman:1,barcode:1,userId:1},function (err) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        })
        let users = [];
        //console.log("userActivity1:",userActivity)
        for(let i=0;i<userActivity.length;i++){
            let data = {};
            data.test_number = userActivity[i].test_number;
            data.salesman_name = userActivity[i].salesman.name;
            data.barcode = userActivity[i].barcode;
            let userId = userActivity[i].userId;
            let user = await userModel.findOne({_id:userId},{name:1,sex:1},function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return  res.status(200).send(data);
                }
            })
            data.userName = user.name;
            data.sex = user.sex;
            users.push(data)
        }


        return res.status(200).send(users);
    });
    // 护士已录信息+统计
    //pramas  活动id :activity_id
    app.get('/wechat/nurse/recordeinfo/recordeinfo', async function (req, res, next) {
      let activity_id = req.query.activity_id;
      let userActivity = await userActivityModel.find({activity_id:activity_id,sampled:true},{test_number:1,salesman:1,barcode:1,userId:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      })
      let users = [];
      //console.log("userActivity1:",userActivity)
      for(let i=0;i<userActivity.length;i++){
        let data = {};
        data.test_number = userActivity[i].test_number;
        data.salesman_name = userActivity[i].salesman.name;
        data.barcode = userActivity[i].barcode;
        let userId = userActivity[i].userId;
        let user = await userModel.findOne({_id:userId},{name:1,sex:1},function (err) {
          if(err){
            let data = {};
            data.result = "01";
            data.name = "操作失败";
           return  res.status(200).send(data);
          }
        })
        data.userName = user.name;
        data.sex = user.sex;
        users.push(data)
      }



        let count_total =await userActivityModel.aggregate(
            [
                {$match : {activity_id:activity_id}},
                {$group:  { _id: {'projects':'$projects'}, count: { $sum: 1 }}}
            ]);
        console.log("count_total",count_total)
        let count_sampled =await userActivityModel.aggregate(
            [
                {$match : {activity_id:activity_id,sampled:true}},
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

     let dataall = {};
      dataall.users = users;
      dataall.data = data;
       return res.status(200).send(dataall);
    });
  // 护士已录信息
  //pramas  活动id :activity_id
  // app.get('/wechat/nurse/recordeinfo/recordeinfo', async function (req, res, next) {
  //   let activity_id = req.query.activity_id;
  //   let userActivity = await userActivityModel.find({activity_id:activity_id,sampled:true},{test_number:1,salesman:1,barcode:1,userId:1},function (err) {
  //     if(err){
  //       let data = {};
  //       data.result = "01";
  //       data.name = "操作失败";
  //       return res.status(200).send(data);
  //     }
  //   })
  //   let users = [];
  //   //console.log("userActivity1:",userActivity)
  //   for(let i=0;i<userActivity.length;i++){
  //     let data = {};
  //     data.test_number = userActivity[i].test_number;
  //     data.salesman_name = userActivity[i].salesman.name;
  //     data.barcode = userActivity[i].barcode;
  //     let userId = userActivity[i].userId;
  //     let user = await userModel.findOne({_id:userId},{name:1,sex:1},function (err) {
  //       if(err){
  //         let data = {};
  //         data.result = "01";
  //         data.name = "操作失败";
  //        return  res.status(200).send(data);
  //       }
  //     })
  //     data.userName = user.name;
  //     data.sex = user.sex;
  //     users.push(data)
  //   }
  //
  //     //console.log("users:",users)
  //   let activity0 = await activityModel.findOne({_id:activity_id},{registration_number:1,sampling_number:1,projects:1},function (err) {
  //     if(err){
  //       let data = {};
  //       data.result = "01";
  //       data.name = "操作失败";
  //       return res.status(200).send(data);
  //     }
  //   })
  //     let summary={};
  //     summary.registration_number=activity0.registration_number;
  //     summary.sampling_number=activity0.sampling_number;
  //
  //
  //
  //
  //     let count_total =await userActivityModel.aggregate(
  //         [
  //             {$match : {activity_id:activity_id}},
  //             {$group:  { _id: {'category':'$category'}, count: { $sum: 1 }}}
  //         ]);
  //     //console.log(count_total)
  //     let count_sampled =await userActivityModel.aggregate(
  //         [
  //             {$match : {activity_id:activity_id,sampled:true}},
  //             {$group:  { _id: {'category':'$category'}, count: { $sum: 1 }}}
  //         ]);
  //     //console.log(count_sampled)
  //     //console.log("idd",count_total[0]._id)
  //     //console.log("category",count_total[0]._id.category)
  //
  //     let data=new Array();
  //     let i,j;
  //     for(i=0;i<count_total.length;i++) {
  //
  //         let activity = {};
  //         activity.category = count_total[i]._id.category;
  //         activity.total_number = count_total[i].count;
  //
  //         for (j = 0; j < count_sampled.length; j++) {
  //             if (count_sampled[j]._id.category == activity.category) {
  //                 activity.sampled_number = count_sampled[j].count;
  //                 break;
  //             }
  //
  //         }
  //         if (j == count_sampled.length)
  //             activity.sampled_number = 0;
  //         activity.nosample_number = activity.total_number - activity.sampled_number;
  //         data.push(activity)
  //     }
  //  summary.data=data;
  //     //console.log("summary:",summary)
  //
  //   let dataall = {};
  //   dataall.users = users;
  //   dataall.summary = summary;
  //    return res.status(200).send(dataall);
  // });

    let storage3 = multer.diskStorage({

        //设置上传后文件路径
        destination: function (req, file, cb) {
            // cb(null, '/home/hwason/photo_work')
            console.log("dirWork0",dirWorkPhoto0)
            cb(null, dirWorkPhoto)
        },
        //给上传文件重命名，获取添加后缀名
        filename: function (req, file, cb) {
            var fileFormat = (file.originalname).split(".");
           cb(null, file.originalname );
          //  console.log("file.originalname",file.originalname)
          //    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    });

    let upload3 = multer({ storage: storage3
    })

    app.post('/wechat/nurse/uploadworkphoto',upload3.single('file'),function(req, res,next) {

        console.log("uploadworkphoto");
        console.log(req.file);

        res.status(200).send("ok");
        //
        // var filesUploaded = 0;
        //
        // if ( Object.keys(req.files).length === 0 ) {
        //     console.log('no files uploaded');
        // } else {
        //     console.log(req.files)
        //
        //     // var files = req.files.file1;
        //     // if (!util.isArray(req.files.file1)) {
        //     //     files = [ req.files.file1 ];
        //     // }
        //
        //     filesUploaded = files.length;
        // }
        //
        // res.json({ message: 'Finished! Uploaded ' + filesUploaded + ' files.  Route is /files1' });
    });


    let storage2 = multer.diskStorage({

        //设置上传后文件路径
        destination: function (req, file, cb) {
            cb(null, dirPhoto0)

            console.log("photo0",dirPhoto0)
            // cb(null, '/home/hwason/photo_id')
        },
        //给上传文件重命名，获取添加后缀名
        filename: function (req, file, cb) {
            var fileFormat = (file.originalname).split(".");
            console.log(file.originalname)
           cb(null, file.originalname);
           //  cb(null, file.fieldname + '-' + Date.now() + ".jpg" );
         }
    });

    let upload2 = multer({ storage: storage2 })

    app.post('/wechat/nurse/uploadphoto',upload2.single('personal_photo'),function(req, res,next) {

        console.log("uploadphoto");

        console.log(req.file);

        res.status(200).send("ok");
        //
        // var filesUploaded = 0;
        //
        // if ( Object.keys(req.files).length === 0 ) {
        //     console.log('no files uploaded');
        // } else {
        //     console.log(req.files)
        //
        //     // var files = req.files.file1;
        //     // if (!util.isArray(req.files.file1)) {
        //     //     files = [ req.files.file1 ];
        //     // }
        //
        //     filesUploaded = files.length;
        // }
        //
        // res.json({ message: 'Finished! Uploaded ' + filesUploaded + ' files.  Route is /files1' });
    });




   let storage = multer.diskStorage({

        //设置上传后文件路径
        destination: function (req, file, cb) {
            // cb(null, dirDelivery')
            cb(null, dirDelivery0)
        },
        //给上传文件重命名，获取添加后缀名
        filename: function (req, file, cb) {
            var fileFormat = (file.originalname).split(".");
            // cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
            cb(null, file.originalname );
        }
    });

    let upload = multer({ storage: storage
    })

    app.post('/wechat/nurse/recordeinfo/uploadDelivery',upload.single('file'),function(req, res,next) {

            let activity_time=req.body.activity_time;
           // let companyName=req.body.companyName;
            console.log(req.file)
            let dirName=new Date(activity_time).getFullYear()+'-'+(new Date(activity_time).getMonth()+1)+'-'+new Date(activity_time).getDate()+'/';
        fs.exists(dirDelivery+dirName, function (exists) {
            if(exists) {
                console.log("目录已存在");
                fs.rename(dirDelivery+req.file.filename, dirDelivery + dirName+req.file.filename, function (err) {
                    if (err) {
                        throw err;
                    }
                    console.log('done!');
                })
            }
                else {
                    fs.mkdir(dirDelivery+dirName,function(err){
                        if(err){
                            throw err;
                        }
                        fs.rename(dirDelivery+req.file.filename,dirDelivery+dirName+req.file.filename, function(err){
                            if(err){
                                throw err;
                            }
                            console.log('done!');
                        })
                    });
                }
            })
                  //console.log(req.file);
           res.status(200).send("ok");
            //

    });


    // 快递单信息更新
    // param  用户id :_id
    //        姓名:name
    //        性别:sex
    //        身份证号 :IDNo
    //        电话号码 :tel
    app.post('/wechat/nurse/recordeinfo/deliverInfo', async function (req, res, next) {
        let params = req.body;
        let activity_time=params.activity_time;
        let dirName=new Date(activity_time).getFullYear()+'-'+(new Date(activity_time).getMonth()+1)+'-'+new Date(activity_time).getDate()+'/';
        console.log("dirName",dirName)
        console.log("filepath",dirDelivery+dirName)
        await activityModel.update(
            {
                _id: params.activity_id
            },
            {
                $set: {
                    delivery_id: params.delivery_id,
                    delivery_file_path: dirDelivery+dirName,
                    sample_status:1
                }
            }, function (err) {
                if (err) {
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data)
                } else {
                    let data = {};
                    data.result = "00";
                    data.name = "操作成功";
                    return res.status(200).send(data);
                }
            });
    });



//护士快递信息保存
//   app.post('/wechat/nurse/recordeinfo/deliverInfo', async function (req, res, next) {
//
//     let dir="e:\ ";
//     console.log(req);
//     let img=req.files.photo.image;
//     let name=req.body.photo.name||img.name;
//     let path=join(dir,img.name);
//
//
//
//
//
//
//     await fs.rename(img.path,path,function(err){
//         if(err) return next(err);
//
//         activityModel.update(
//             {
//                 _id: param.activity_id
//             },
//             {
//                 $set: {
//                     delivery_id: param.delivery_id,
//                     delivery_file_path: path,
//                 }
//             }, function (err) {
//                 if (err) {
//                     let data = {};
//                     data.result = "01";
//                     data.name = "操作失败";
//                     res.status(200).send(data)
//                 } else {
//                     let data = {};
//                     data.result = "00";
//                     data.name = "操作成功";
//                     res.status(200).send(data);
//                 }
//             });
//         });
//
//     });
//
// // 护士操作指南
//   app.get('/wechat/nurse/instructions/instructions', function (req, res, next) {
//     res.render('wechat/nurse/instructions/instructions');
//   });
// // 护士标准流程
//   app.get('/wechat/nurse/instructions/nurseProcess', function (req, res, next) {
//     res.render('wechat/nurse/instructions/nurseProcess');
//   });
// // 采血标准流程
//   app.get('/wechat/nurse/instructions/samplingProcess', function (req, res, next) {
//     res.render('wechat/nurse/instructions/samplingProcess');
//   });
// // 注意事项
//   app.get('/wechat/nurse/instructions/attention', function (req, res, next) {
//     res.render('wechat/nurse/instructions/attention');
//   });
// // 准备步骤
//   app.get('/wechat/nurse/instructions/preparation', function (req, res, next) {
//     res.render('wechat/nurse/instructions/preparation');
//   });
// // 现场步骤
//   app.get('/wechat/nurse/instructions/live', function (req, res, next) {
//     res.render('wechat/nurse/instructions/live');
//   });
// // 样本采集
//   app.get('/wechat/nurse/instructions/collection', function (req, res, next) {
//     res.render('wechat/nurse/instructions/collection');
//   });
// // 样本离心
//   app.get('/wechat/nurse/instructions/centrifugal', function (req, res, next) {
//     res.render('wechat/nurse/instructions/centrifugal');
//   });
// // 样本包装
//   app.get('/wechat/nurse/instructions/packing', function (req, res, next) {
//     res.render('wechat/nurse/instructions/packing');
//   });
// // 护士个人中心
//   app.get('/wechat/nurse/personcenter/personcenter', function (req, res, next) {
//     res.render('wechat/nurse/personcenter/personcenter');
//   });
//通过护士id查她将要负责的活动
  async function getActivities(userId,res) {
    let date = new Date();
    let begin = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    //console.log("begin",begin)
    let activity = await activityModel.findOne({"nurses.id":userId,"activity_time":{$gte:begin}},
      {activity_time:1,address:1,projects:1,organization_id:1},function (err) {

        if (err) {
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          res.status(200).send(data);
        }
      }).sort({activity_time:1});
    //console.log("activity",activity)

    let company=await organizationModel. findOne({"_id":activity.organization_id},{name:1},function(err){
      if (err) {
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        return res.status(200).send(data);
      }
    })

    let data={};
      for(let i=0;i<activity.projects.length;i++) {
        if(i==0) {data.projects = activity.projects[i];}
        else {
        data.projects = data.projects+'+'+activity.projects[i]; }
      }
      data.activity_time=changeSingleDate(activity.activity_time);
      data.address=activity.address;
      data.activity_id=activity._id;
      data.companyName=company.name;

    return data;
  }

  //通过护士id查她当天要负责的活动
  async function getAllDayActivities(userId,res) {
    let date = new Date();
    let begin = new Date(date.getFullYear(), date.getMonth(), date.getDate());

   // console.log("begin:"+begin);
   // let end = new Date(date.getFullYear(), date.getMonth() ,date.getDate()+1);

    let activities = await activityModel.find({"nurses.id":userId,"activity_time":{$gte:begin}},
      {projects:1,activity_time:1,address:1,organization_id:1,feedback_state:1},function (err) {
        if (err) {
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      }).limit(7).sort({activity_time:1});
    //console.log("activities:",activities)
    let data=[]
    for(let i=0;i<activities.length;i++)
    {
      let company=await organizationModel. findOne({"_id":activities[i].organization_id},{name:1},function(err){
        if (err) {
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      })
      let activity={};
      activity.companyName=company.name;
      activity.organization_id=activities[i].organization_id;
      activity.activity_time=changeSingleDate(activities[i].activity_time);
      activity.address=activities[i].address;
      activity.activity_id=activities[i]._id;
      activity.feedback_state=activities[i].feedback_state;
      for (let j = 0; j < activities[i].projects.length; j++) {
        if (j == 0) {
          activity.projects = activities[i].projects[j];
        }
        else {
          activity.projects = activity.projects + '+' + activities[i].projects[j];
        }
      }

      data.push(activity)
    }
   console.log("data",data)
    return data;

  }


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
