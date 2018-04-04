/**
 * Created by win7 on 2017/6/13.
 * 销售经理业务
 */
var express = require('express');
var crypto = require('crypto');
let fs = require('fs');
var xlsx = require('node-xlsx');
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
  //添加行业
  // app.post('/test/addIndustry',async function (req,res,next) {
  //     console.log(1)
  //     for(let industry of industies){
  //         if(industry.level==1){
  //           console.log(2);
  //             let result = await industryModel.findOne({name:industry.name});
  //             console.log(result);
  //             if(!result){
  //               console.log(3);
  //                 let entity = new industryModel({
  //                     name:industry.name,
  //                     code:industry.code
  //                 });
  //                 await entity.save();
  //             }
  //         }else if(industry.level==2){
  //           console.log(4);
  //             let ids = await industryModel.findOne({name:industry.industry});
  //             let result = await orgCategoryModel.findOne({name:industry.name});
  //             console.log(result);
  //             if(!result){
  //               console.log(5);
  //                 let entity = new orgCategoryModel({
  //                   industry_id:ids._id,
  //                   name:industry.name,
  //                   code:industry.code
  //                 });
  //                 await await entity.save();
  //             }
  //         }
  //     }
  //     let data = {};
  //     data.result = "02";
  //     data.name = "操作成功";
  //     res.status(200).send(data);
  // });
  // //添加省市县
  // app.post('/test/addcity',async function (req,res,next) {
  //     for(let city of cities){
  //         if(city.level==1){
  //             let result = await provinceModel.findOne({name:city.name});
  //             if(!result){
  //                 let provinceEntity = new provinceModel({
  //                     name:city.name,
  //                     code:city.code
  //                 });
  //                 await provinceEntity.save();
  //             }
  //         }else if(city.level==2){
  //             let province = await provinceModel.findOne({name:city.sheng});
  //             let result = await cityModel.findOne({province_id:province._id,name:city.name});
  //             if(!result){
  //                 let entity = new cityModel({
  //                     province_id:province._id,
  //                     name:city.name,
  //                     code:city.code
  //                 });
  //                 await entity.save();
  //             }
  //          }else if(city.level==3){
  //             let province = await provinceModel.findOne({name:city.sheng});
  //             let result = await cityModel.findOne({province_id:province._id,name:city.shi});
  //             let county =await countyModel.findOne({city_id:result._id,name:city.name})
  //             if(!county){
  //               let entity = new countyModel({
  //                 city_id:result._id,
  //                 name:city.name,
  //                 code:city.code
  //               });
  //               await entity.save();
  //             }
  //         }
  //     }
  //     let data = {};
  //     data.result = "02";
  //     data.name = "操作成功";
  //     res.status(200).send(data);
  // });
  //查询未审批的机构
    app.get('/sale/manager/showUnCheckedOrg',async function (req,res,next) {
        let organizations = await organizationModel.find({checked:false},{name:1,create_time:1,region:1},function (err) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                res.status(200).send(data);
            }
        });
        let data = [];
        for(let organization of organizations){
            let org = {};
            org.name = organization.name;
            org.apply_time = changeSingleDate(organization.create_time);
            org.region = organization.region;
            data.push(org);
        }
        res.status(200).send(data);
    });
    //查询单个未审批机构详情
    //params 机构id : _id
    app.get('/sale/manager/unCheckedOrgDetail',async function (req,res,next) {
        let _id = req.query._id;
        let organization = await organizationModel.findOne({_id:_id},{
            name:1,
            region:1,
            address:1,
            director_name: 1,
            director_tel: 1,
            receiver_name: 1,
            receiver_tel:1,
            financial_name:1,
            financial_tel:1,
            contactsalesman:1,
            projects:1
        },function (err) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                res.status(200).send(data);
            }
        });
        let data = {};
        data.name = organization.name;
        data.region = organization.region;
        data.address = organization.address;
        data.director_name = organization.director_name;
        data.director_tel = organization.director_tel;
        data.receiver_name = organization.receiver_name;
        data.receiver_tel = organization.receiver_tel;
        data.financial_name = organization.financial_name;
        data.financial_tel = organization.financial_tel;
        data.salesman_name = organization.contactsalesman.salesman_name;
        let project_category = [];
        let projects = [];
        for(let project of organization.projects){
            if(project_category.indexOf(project.category)==-1){
                project_category.push(project.category)
            }
            let pro = {};
            pro.name = project.name;
            pro.price = project.price;
            projects.push(pro);
        }
        data.project_category = project_category;
        data.projects = projects;
        res.status(200).send(data)
    });
    //通过审核
    // params 机构id : _id
    app.post('/sale/manager/checkedOrg',async function (req,res,next) {
        let _id = req.body.params._id;
        await organizationModel.update({_id:_id},{$set:{checked:true}},function (err) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                res.status(200).send(data);
            }
        });
        let data = {};
        data.result = "00";
        data.name = "操作成功";
        res.status(200).send(data);
    });
    //查看已合作的机构(分页查询)
    // params 机构名称:name (没有则查询全部)
    //        页码(默认第一页):pageNo
    //        每页显示多少条(默认每页10条):pageSize
    app.get('/sale/manager/showOrg',async function (req,res,next) {
        let pageNo = req.query.pageNo||1;
        let pageSize = req.query.pageSize||10;
        let name = req.query.name||"";
        let query = {
          checked:true,
          name:{
            $regex:name
          }
        };
        console.log(query);
        let data = await util.queryOrg(pageNo,pageSize,query,res);
        console.log(data);
        res.status(200).send(data);
    });
  //查询行事历(分页查询,参数可无)
  // params 页码:pageNo  (默认第一页)
  //        每页显示条数:pageSize  (默认10条)
  //        企业名称:name      (模糊查询)
  //        开始时间:begin
  //        结束时间:end
  app.get('/salesman/showActivities',async function (req,res,next) {
    let name = req.query.name||"";
    let pageNo = req.query.pageNo||1;
    let pageSize = req.query.pageSize||10;
    let begin = req.query.begin;
    let end = req.query.end;
    let organizations = await organizationModel.find({name:{$regex:name}},{
      _id:1,name:1},function (err) {
      if(err){
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        return res.status(200).send(data);
      }
    });
    let arr = [];
    for(let organization of organizations){
      arr.push(organization._id);
    }
    let orgIds = {};
    orgIds.$in = arr;
    let query = {};
    query.organization_id = orgIds;
    let dateParam = {};
    if(begin){
      dateParam.$gte = begin;
    }
    if(end){
      dateParam.lte = end;
    }
    if(dateParam.hasOwnProperty()){
      query.activity_time = dateParam;
    }
    let data = await util.queryActivities(pageNo,pageSize,query,res);

    return res.status(200).send(data);
  });
  //查询机构详情(用于修改页面初始化)
  // 机构id : _id
  app.get('/sale/manager/OrgDetail',async function (req,res,next) {
      let _id = req.query._id;
      let org = await organizationModel.findOne({_id:_id},{
          name:1,
          region:1,
          address:1,
          contactsalesman:1,
          director_name: 1,
          director_tel: 1,
          receiver_name: 1,
          receiver_tel:1,
          financial_name:1,
          financial_tel:1,
          projects:1,
          industry:1
      },function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              res.status(200).send(data);
          }
      });
    let orgCategory = await orgCategoryModel.findOne({organization_id:_id},{_id:0,name:1,code:1},function (err) {
      if(err){
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        return res.status(200).send(data);
      }
    });
      let data = {};
      data.name = org.name;
      data.region = org.region;
      data.address = org.address;
      data.director_name = org.director_name;
      data.director_tel = org.director_tel;
      data.receiver_name = org.receiver_name;
      data.receiver_tel = org.receiver_tel;
      data.financial_name = org.financial_name;
      data.financial_tel = org.financial_tel;
      data.salesman = org.contactsalesman.salesman_name;
      data.industry_name = org.industry.industry_name;
      data.industry_code = org.industry.industry_code;
      data.orgCategory_name  = orgCategory.name;
      data.orgCategory_code = orgCategory.code;
      let project_category = [];
      for(let project of org.projects){
          if(project_category.indexOf(project.category)==-1){
              project_category.push(project.category)
          }
      }
      data.project_category = project_category;
      res.status(200).send(data);
  });
  //获取所有销售代表
  app.get('/sale/manager/showSalesman',async function (req,res,next) {
      let data = await loginModel.find({role:6},{_id:1,realName:1},function (err) {
          if(err){
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            res.status(200).send(data);
          }
      });
      res.status(200).send(data);
  });
    //修改企业信息
    // params 机构id:_id
    //        机构名:name
    //        所属省:province
    //        所属市:city
    //        所属区(县):country
    //        行业 :industry    格式为:{industry_code:String,industry_name:String}
    //        机构类别编码 :orgCategory_code
    //        具体地址:address
    //        负责人:director_name
    //        负责人电话:director_tel
    //        报告接收人:receiver_name
    //        报告接收人电话:receiver_tel
    //        财务对接人:financial_name
    //        财务对接人电话:financial_tel
    //        合作项目(数组):projects 格式为[{category:String,name:String,price:Number,discount:Number}]
    //        销售代表:contactsalesman 格式为{salesman_id:String,salesman_name:String}
  app.post('/sale/manager/modifyOrg',async function (req,res,next) {
      let params = req.body.params;
      let province = await provinceModel.findOne({name:params.province},{code:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
      let city = await cityModel.findOne({name:params.city,province_id:province._id},{code:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
      let country = await countryModel.findOne({name:params.country,city_id:city._id},{code:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
      let industry = await industryModel.findOne({name:params.industry.industry_name,code:params.industry.industry_code},
        {_id:1},function (err) {
          if(err){
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            return res.status(200).send(data);
          }
        });
      let region = params.province+params.city+params.country;
      let procode = "^"+province.code+city.code+country.code+params.industry.industry_code+params.orgCategory_code;
      let organization = await organizationModel.find({code:{'$regex':procode}},{code:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
      console.log(procode);
      let code = getcode(province.code,city.code,country.code,
        params.industry.industry_code,params.orgCategory_code,organization);
      console.log(code);
      let result = await hwasonModel.findOne({_id:params.contactsalesman.salesman_id},{_id:1,realName:1,area:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
      console.log(params.contactsalesman.salesman_id,result);
      let org = await organizationModel.findOne({_id:params._id},{code:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
      let flag = false;
      if(code.substr(0,5)==org.code.substr(0,5)){
        code =org.code;
        flag = true;
      }
      await organizationModel.update({_id:params._id},{$set:{
        name:params.name,
        code:code,
        area:result.area,
        industry: params.industry,
        contactsalesman:params.contactsalesman,
        region:region,
        address:params.address,
        director_name: params.director_name,
        director_tel: params.director_tel,
        receiver_name: params.receiver_name,
        receiver_tel:params.receiver_tel,
        financial_name:params.financial_name,
        financial_tel:params.financial_tel,
        projects:params.projects
      }},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
      if(flag == false){
        await orgCategoryModel.update({organization_id:params._id},
          {$pull:{organization_id:params._id}},function (err) {
            if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              return res.status(200).send(data);
            }
          });
        await orgCategoryModel.update({industry_id:industry._id,code:params.orgCategory_code},
          {$addToSet:{organization_id:params._id}},function (err) {
            if(err){
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
      res.status(200).send(data);
    });
  //查询报告批次(分页查询,参数可无)
  // params 页码:pageNo  (默认第一页)
  //        每页显示条数:pageSize  (默认10条)
  //        企业名称:name      (模糊查询)
  //        开始时间:begin
  //        结束时间:end
  app.get('/sale/manager/showReports',async function (req,res,next) {
    let name = req.query.name||"";
    let pageNo = req.query.pageNo||1;
    let pageSize = req.query.pageSize||10;
    let begin = req.query.begin;
    let end = req.query.end;
    let organizations = await organizationModel.find(
      {name:{$regex:name}},
      {_id:1,name:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
    let arr = [];
    for(let organization of organizations){
      arr.push(organization._id);
    }
    let orgIds = {};
    orgIds.$in = arr;
    let query = {};
    query.organization_id = orgIds;
    let dateParam = {};
    if(begin){
      dateParam.$gte = begin;
    }
    if(end){
      dateParam.lte = end;
    }
    if(dateParam.hasOwnProperty()){
      query.activity_time = dateParam;
    }
    let sample_status = {};
    sample_status.$nin = 0;
    query.sample_status = sample_status;
    let data = await util.queryReports(pageNo,pageSize,query,res);
    return res.status(200).send(data);
  });




    //改变时间格式
  function changeSingleDate(date) {
    return (date.getYear() + 1900) + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }
  // 拼接机构编码
  function getcode(province_code,city_code,country_code,industry_code,orgCategory_code,organization) {
    if(organization.length==0){
      return province_code+city_code+country_code+industry_code+orgCategory_code+"0";
    }else{
      let arr = [];
      for(let org of organization){
        let tail = org.code.substr(-1);
        let num = parseInt(tail);
        let flag = isNaN(num);
        if(flag){
          arr.push(tail.charCodeAt())
        }else{
          arr.push(num)
        }
      }
      let numMax = Math.max.apply(null,arr)+1;
      if(numMax==10){
        numMax=65;
      }
      if(numMax<10){
        return province_code+city_code+country_code+industry_code+orgCategory_code+numMax.toString();
      }else{
        return province_code+city_code+country_code+industry_code+orgCategory_code+String.fromCharCode(numMax);
      }
    }
  }
};


