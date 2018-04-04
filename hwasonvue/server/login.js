/**
 * Created by win7 on 2017/4/13.
 */
'use strict'
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let loginModel = require('./util/schema/login');
let organizationModel = require('./util/schema/organizations');
let salesmanModel = require('./util/schema/salesman');
//let AliyunSmsUtil =require('./AliyunSmsUtil.js')
let nurseModel = require('./util/schema/nurse');

module.exports = function (app) {
    app.post('/wechat/export',async function (req,res,next) {
        console.log(req.body);
        res.download('/home/bbb.txt');
        let data = {};
        data.name = "操作成功";
        data.result = "00";
    });
  //企业登录
  app.post('/wechat/login',async function (req,res,next){
    let password = req.body.password;
    let userName = req.body.userName;
   // console.log(password)
   let result = await loginModel.findOne({'userName':userName,'password':password},
      {_id:1,role:1,tel:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          res.status(200).send(data);
          return ;
        }
      });
    if(result==null){
      result =await loginModel.findOne({tel:userName,password:password},{_id:1,role:1},
        function (err) {
          if(err){
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            res.status(200).send(data);
            return;
          }
        })
    }
    if(result ==null)
    {
      let data = {};
      data.result = "02";
      data.name = "用户名或者密码不正确";
      return res.status(200).send(data);

    }
    else if(result.role=="01") {
      let result2=await organizationModel.findOne({manager_id:result._id},{_id:1,name:1,checked:1},
        function (err) {
          if (err) {
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            res.status(200).send(data);
            return;
          }
        });
     if(result2==null) {
       let data = {};
       data.result = "03";
       data.name = "企业注册信息有误，请联系华晟人员解决";
       res.status(200).send(data);
       return;

     } else {
      // res.cookie('userId', result2._id)
       let validity = 30;
       // let now = new Date();
       // now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
       // res.cookie('userId', result2._id, { expires: now.toGMTString(), httpOnly: true });
       res.cookie('userId', result2._id, { expires: new Date(Date.now() + validity * 24 * 60 * 60 * 1000), httpOnly: true });

       let data={};

       data._id=result._id;
       data.role=result.role;
       data.companyName=result2.name;
       data.organization_id=result2._id;
       return res.status(200).send(data);
     }
    }
    else if(result.role=="02") { //业务员
        let result2=await salesmanModel.findOne({_id:result._id},{_id:1,organization_id:1,tel:1},
            function (err) {
                if (err) {
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    res.status(200).send(data);
                    return;
                }
            });
        if(result2==null) {
            let data = {};
            data.result = "03";
            data.name = "业务员注册信息有误，请联系华晟人员解决";
            res.status(200).send(data);
            return;

        } else {
            console.log("organizationid:",result2.organization_id)
            let result3=await organizationModel.findOne({_id:result2.organization_id},{_id:1,name:1,checked:1},
                function (err) {
                    if (err) {
                        let data = {};
                        data.result = "01";
                        data.name = "操作失败";
                        res.status(200).send(data);
                        return;
                    }
                });
            if(result3==null) {
                let data = {};
                data.result = "03";
                data.name = "企业注册信息有误，请联系华晟人员解决";
                res.status(200).send(data);
                return;
            }

          // res.cookie('userId', result2._id)
            let validity = 30;
            // let now = new Date();
            // now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
            // res.cookie('userId', result2._id, { expires: now.toGMTString(), httpOnly: true });
            res.cookie('userId', result2._id, { expires: new Date(Date.now() + validity * 24 * 60 * 60 * 1000), httpOnly: true });

            let data={};

            data._id=result._id;
            data.role=result.role;
            data.companyName=result3.name;
            data.organization_id=result3._id;
            return res.status(200).send(data);
        }
    }
    else if(result.role=="31") { //护士
          let result2=await nurseModel.findOne({_id:result._id},{_id:1,checked:1},
              function (err) {
                  if (err) {
                      let data = {};
                      data.result = "01";
                      data.name = "操作失败";
                      res.status(200).send(data);
                      return;
                  }
              });
          if(result2==null || result2.checked==1) {
              let data = {};
              data.result = "10";
              data.role=result.role;
              data.tel=result.tel;
              data.name = "完善信息";
              let validity = 1;
              // let now = new Date();
              // now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
              // res.cookie('userId', result2._id, { expires: now.toGMTString(), httpOnly: true });
              if(result2 !=null)
                res.cookie('userId', result2._id, { expires: new Date(Date.now() + validity * 24 * 60 * 60 * 1000), httpOnly: true });

              res.status(200).send(data);
              return;

          } else if(result2==null || result2.checked==0) {
            let data = {};
            data.result = "11";
            data.role=result.role;
            data.tel=result.tel;
            data.name = "还在审核中，请等待";
            let validity = 1;
            // let now = new Date();
            // now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
            // res.cookie('userId', result2._id, { expires: now.toGMTString(), httpOnly: true });
            if(result2 !=null)
                res.cookie('userId', result2._id, { expires: new Date(Date.now() + validity * 24 * 60 * 60 * 1000), httpOnly: true });
            res.status(200).send(data);
            return;

        }
          else {



              // res.cookie('userId', result2._id)
              let validity = 30;
              // let now = new Date();
              // now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
              // res.cookie('userId', result2._id, { expires: now.toGMTString(), httpOnly: true });
              res.cookie('userId', result2._id, { expires: new Date(Date.now() + validity * 24 * 60 * 60 * 1000), httpOnly: true });

              let data={};

              data._id=result._id;
              data.role=result.role;
              return res.status(200).send(data);
          }
      }

  });


    //忘记密码的处理，查询手机号码是否存在
    app.get('/wechat/login/forgetpasswd',async function (req, res, next) {
        let tel = req.query.tel;
        console.log("tel:",tel)
        ///查询手机号码是否存在
        let user = await loginModel.findOne({tel:tel},
            function (err) {
                if(err){login
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }
            });

        if(user !=null) {
            let data = {};
            data.result = "00";
            data.name = "操作成功";
           return res.status(200).send(data);
        }
        else {
            let data = {};
            data.result = "02";
            data.name = "用户不存在";
            return res.status(200).send(data);

        }
    });


    //忘记密码的处理，密码修改----
    app.post('/wechat/login/changepasswd2',async function (req, res, next) {
        let params = req.body;

        ///修改密码
        await loginModel.update({tel:params.tel},{$set:{password:params.password,}},async function (err) {
            if (err) {
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                res.status(200).send(data);
            }
            else {
                let data = {};
                data.result = "00";
                data.name = "操作成功";
                return res.status(200).send(data);

            }
        });
    });

    //修改密码的处理，查询原始密码是否正确
    app.get('/wechat/login/originalpasswd',async function (req, res, next) {
        let password = req.query.password;
        let userName = req.query.userName;
        ///查询用户名和原始密码是否存在
        let result = await loginModel.findOne({'userName':userName,'password':password},
            {_id:1,role:1,tel:1},function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    res.status(200).send(data);
                    return ;
                }
            });

        if(result !=null) {
            let data = {};
            data.result = "00";
            data.name = "操作成功";
            return res.status(200).send(data);
        }
        else {
            let data = {};
            data.result = "02";
            data.name = "用户名或原始密码不正确";
            return res.status(200).send(data);

        }
    });

    //修改密码的处理，密码修改----
    app.post('/wechat/login/changepasswd',async function (req, res, next) {
        let params = req.body;

        ///修改密码
        await loginModel.update({userName:params.userName},{$set:{password:params.password,}},async function (err) {
            if (err) {
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                res.status(200).send(data);
            }
            else {
                let data = {};
                data.result = "00";
                data.name = "操作成功";
                return res.status(200).send(data);

            }
        });
    });


}
