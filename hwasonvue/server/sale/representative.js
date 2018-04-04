/**
 * Created by win7 on 2017/6/7.
 */
import organizationModel from'../util/schema/organizations';
import provinceModel from '../util/schema/provinces';
import industryModel from '../util/schema/industry';
import projectModel from '../util/schema/projects';
import hwasonModel from '../util/schema/hwason';
import loginModel from '../util/schema/login';
import activityModel from '../util/schema/activities';
import salesmanModel from '../util/schema/salesman';
import orgCategoryModel from '../util/schema/orgCategory';
import cityModel from '../util/schema/cities';
import countryModel from '../util/schema/counties';
import userActivityModel from '../util/schema/userActivities';
import userModel from '../util/schema/user';
import util from '../util2';
module.exports = function (app) {
  //新企业申请第一步
  //params  机构id:_id(有责修改,无则新增)
  //        所属省 : province
  //        所属市:city
  //        所属区(县):country
  //        行业 :industry    格式为:{industry_code:String,industry_name:String}
  //        机构类别编码 :orgCategory_code
  //        机构名称 : name
  //        具体地址 :address
  //        负责人姓名 :director_name
  //        负责人电话 :director_tel
  //        cookie里userId;
  app.post('/salesman/addOrg',async function (req,res,next) {
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
    let code = getcode(province.code,city.code,country.code,
      params.industry.industry_code,params.orgCategory_code,organization);
    let selesman_id = req.cookies.userId;
    let result = await hwasonModel.findOne({_id:selesman_id},{_id:1,realName:1,area:1});
    let contactsalesman = {};
    contactsalesman.salesman_id = result._id;
    contactsalesman.salesman_name = result.realName;
    let organization_id;
    if(params._id){
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
          contactsalesman:contactsalesman,
          region:region,
          address:params.address,
          director_name: params.director_name,
          director_tel: params.director_tel,
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
      organization_id = params._id;
    }else{
      let ognzt = await organizationModel.find({},{manager_id:1},function (err) {
          if(err){
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            res.status(200).send(data);
          }
      }).sort({create_time:-1}).limit(1);
      let userName;
      if(ognzt.length == 0){
        userName = "hs100001";
      }else{
        let lg = await loginModel.findOne({_id:ognzt[0].manager_id},{userName:1},function (err) {
          if(err){
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            res.status(200).send(data);
          }
        });
        userName = "hs"+((parseInt(lg.userName.substr(-6)))+1).toString()
      }
      let loginEntity = new loginModel({
        userName:userName,
        password:"888888",
        role:2,
      });
      let login = await loginEntity.save(function (err) {
          if(err){
              let data = {};
              data.result = "01";
              data.name = "操作失败";
              res.status(200).send(data);
          };
      });
      let organizationEntity = new organizationModel({
        name:params.name,
        code:code,
        manager_id:login._id,
        area:result.area,
        industry: params.industry,
        create_time:new Date(),
        contactsalesman:contactsalesman,
        region:region,
        address:params.address,
        director_name: params.director_name,
        director_tel: params.director_tel,
        notice_status:0, //告知书状态
        checked:false
      });
      let org = await organizationEntity.save(function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
      organization_id = org._id;
      await orgCategoryModel.update({industry_id:industry._id,code:params.orgCategory_code},
        {$addToSet:{organization_id:organization_id}},function (err) {
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
    data.organization_id = organization_id;
    res.status(200).send(data);
  });
  //新企业申请第二步
  // params 机构id : _id
  //        报告接收人姓名: receiver_name
  //        报告接收人电话: receiver_tel
  //        财务对接人:financial_name
  //        财务对接人电话:financial_tel
  app.post('/salesman/modifyOrg2',async function (req,res,next) {
    let params = req.body.params;
    await organizationModel.update({_id:params._id},
      {
        $set:
          {
            receiver_name:params.receiver_name,
            receiver_tel:params.receiver_tel,
            financial_name:params.financial_name,
            financial_tel:params.financial_tel
          }
      },function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }else{
          let data = {};
          data.result = "02";
          data.name = "操作成功";
          return res.status(200).send(data);
        }
    })
  });
  // 新企业申请第三步
  // params 机构id : _id
  //        体检项目(数组):projects  格式为[{category:String,name:String,price:Number,discount:Number}]
  app.post('/salesman/modifyOrg3',async function (req,res,next) {
    let params = req.body.params;
    await organizationModel.update({_id:params._id},
      {
        $set:
          {
            projects:params.projects
          }
      },function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }else{
          let data = {};
          data.result = "02";
          data.name = "操作成功";
          return res.status(200).send(data);
        }
      })
  });
  //新企业申请第三步页面初始化 查询合作项目
  //params 机构id:_id
  app.get('/salesman/queryStep3',async function (req,res,next) {
      let _id = req.query._id;
      let organization = await organizationModel.findOne({_id:_id},{projects:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
      let data = {};
      data.projects = organization.projects;
      let category = [];
      for(let project of organization.projects){
          if(category.indexOf(project.category)==-1){
              category.push(project.category);
          }
      }
      data.category = category;
      res.status(200).send(data);
  });
  //查询新企业申请填写信息 用于点击上/下一步到新企业申请第二部
  // params 机构id : _id
  app.get('/salesman/queryStep2',async function (req,res,next) {
    let _id = req.query._id;
    let data = await organizationModel.findOne({_id:_id},
      {
        receiver_name: 1,
        receiver_tel:1,
        financial_name:1,
        financial_tel:1
      },
      function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
    res.status(200).send(data);
  });
  //查询新企业申请填写信息，用于点击上一步到第一步
  // params 机构id : _id
  app.get('/salesman/queryStep1',async function (req,res,next) {
      let _id = req.query._id;
      let organization = await organizationModel.findOne({_id:_id},
          {
              region:1,
              name:1,
              industry:1,
              address:1,
              director_name:1,
              director_tel:1,
          }
      );
      let orgCategory = await orgCategoryModel.findOne({organization_id:organization._id},{_id:0,name:1,code:1},function (err) {
          if(err){
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            return res.status(200).send(data);
          }
      });
      let data = {};
      data.region = organization.region;
      data.name = organization.name;
      data.industry_code = organization.industry.industry_code;
      data.industry_name = organization.industry.industry_name;
      data.address = organization.address;
      data.director_name = organization.director_name;
      data.director_tel = organization.director_tel;
      data.orgCategory_name = orgCategory.name;
      data.orgCategory_code = orgCategory.code;
      res.status(200).send(data);
  });
  //查询已合作的机构(分页查询)
  //params    页码(默认第一页)：pageNo
  //          每页显示条数(默认10条): pageSize
  //          机构名称:name (有责模糊查询,无则查询所有)
  app.get('/salesman/queryOrg',async function (req,res,next) {
    let pageNo = req.query.pageNo||1;
    let pageSize = req.query.pageSize||10;
    let salesman_id = req.cookies.userId;
    let name = req.query.name||"";
    let query = {
      "contactsalesman.salesman_id":salesman_id,
      name: { '$regex': name },
    };
    let data = await util.queryOrg(pageNo,pageSize,query,res);
    return res.status(200).send(data);
  });
  //查询行事历(分页查询,参数可无)
  // params 页码:pageNo  (默认第一页)
  //        每页显示条数:pageSize  (默认10条)
  //        企业名称:name      (模糊查询)
  //        开始时间:begin
  //        结束时间:end
  app.get('/salesman/showActivities',async function (req,res,next) {
    let salesman_id = req.cookies.userId;
    let name = req.query.name||"";
    let pageNo = req.query.pageNo||1;
    let pageSize = req.query.pageSize||10;
    let begin = req.query.begin;
    let end = req.query.end;
    let organizations = await organizationModel.find({"contactsalesman.salesman_id":salesman_id,name:{$regex:name}},{
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
  //生成机构业务员账号
  //params 机构业务员(数组):salesmen 格式为[{realName:String,userName:String}]
  //       机构id:organization_id
  app.post('/salesman/addOrgSalesmen',async function (req,res,next) {
      let salesmen = req.body.params.salesmen;
      let organization_id = req.body.params.organization_id;
      let exist = [];
      let success = [];
      for(let salesman of salesmen){
          let login = await loginModel.findOne({userName:salesman.userName},function (err) {
              if(err){
                  let data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
              }
          });
          if(!login){
              let loginEntity = new loginModel({
                  userName:salesman.userName,
                  password:"123456",
                  role:1,
                  realName:salesman.realName
              });
              let result = await loginEntity.save(function (err) {
                  if(err){
                      let data = {};
                      data.result = "01";
                      data.name = "操作失败";
                      return res.status(200).send(data);
                  }
              });
              let salesmanEntity = new salesmanModel({
                  _id: result._id,
                  organization_id: organization_id,
                  realName: result.realName,
              });
              await salesmanEntity.save(function (err) {
                  if(err){
                      let data = {};
                      data.result = "01";
                      data.name = "操作失败";
                      return res.status(200).send(data);
                  }
              });
            success.push(salesman);
          }else{
            exist.push(salesman);
          }
      }
      let data = {};
      data.result = "00";
      data.exist = exist;
      data.success = success;
      data.name = "操作成功";
      res.status(200).send(data);
  });
  //获取业务员所负责的机构
  app.get('/salesman/showOrgs',async function (req,res,next) {
      let userId = req.cookies.userId;
      let data = await organizationModel.find({"contactsalesman.salesman_id":userId},{name:1},function (err) {
          if(err){
            let data = {};
            data.result = "01";
            data.name = "操作失败";
            return res.status(200).send(data);
          }
      });
      res.status(200).send(data);
  });
  //查询报告批次(分页查询,参数可无)
  // params 页码:pageNo  (默认第一页)
  //        每页显示条数:pageSize  (默认10条)
  //        企业名称:name      (模糊查询)
  //        开始时间:begin
  //        结束时间:end
  app.get('/salesman/showReports',async function (req,res,next) {
    let salesman_id = req.cookies.userId;
    let name = req.query.name||"";
    let pageNo = req.query.pageNo||1;
    let pageSize = req.query.pageSize||10;
    let begin = req.query.begin;
    let end = req.query.end;
    let organizations = await organizationModel.find(
      {"contactsalesman.salesman_id":salesman_id,name:{$regex:name}},
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
    let aa = await util.queryReports(pageNo,pageSize,query,res);
    return res.status(200).send(aa);
  });
  // 改变时间格式
  function changeSingleDate(date) {
    let month;
    if((date.getMonth() + 1).toString().length == 1){
        month="0"+(date.getMonth() + 1).toString();
    }else{
      month=(date.getMonth() + 1).toString();
    }

    return (date.getYear() + 1900) + "/" + month + "/" + date.getDate()+" "+date.getHours()+":"+date.getMinutes();
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
