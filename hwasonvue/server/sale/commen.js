module.exports = function (app) {
  //查询机构详情
  // params  机构id : _id
  app.get('/salesman/orgDetail',async function(req,res,next){
    let _id = req.query._id;
    let org = await organizationModel.findOne({_id:_id},{
      name:1,
      region:1,
      address:1,
      code:1,
      manager_id:1,
      contactsalesman:1,
      director_name: 1,
      director_tel: 1,
      receiver_name: 1,
      receiver_tel:1,
      financial_name:1,
      financial_tel:1,
      projects:1
    },function (err) {
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
    data.code = org.code;
    data.director_name = org.director_name;
    data.director_tel = org.director_tel;
    data.receiver_name = org.receiver_name;
    data.receiver_tel = org.receiver_tel;
    data.financial_name = org.financial_name;
    data.financial_tel = org.financial_tel;
    data.salesman = org.contactsalesman.salesman_name;
    let project_category = [];
    for(let project of org.projects){
      if(project_category.indexOf(project.category)==-1){
        project_category.push(project.category)
      }
    }
    data.project_category = project_category;
    let manager_id = org.manager_id;
    let login = await loginModel.findOne({_id:manager_id},{userName:1,password:1},
      function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
    data.userName = login.userName;
    data.password = login.password;
    let date = new Date();
    let begin = new Date(date.getFullYear(),date.getMonth()-1,date.getDate());
    let end = new Date(date.getFullYear(),date.getMonth(),date.getDate());
    let result = await activityModel.find({organization_id:_id,activity_time:{$gt:begin,$lt:end}},
      {address:1,activity_time:1,sampling_number:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
    let activities = [];
    for(let ac of result){
      let activity = {};
      activity.address = ac.address;
      activity.activity_time = changeSingleDate(ac.activity_time);
      activity.sampling_number = ac.sampling_number;
      activities.push(activity);
    }
    data.activities = activities;
    return res.status(200).send(data);
  });
  //根据机构id查询机构业务员
  //params    页码(默认第一页)：pageNo
  //          每页显示条数(默认10条): pageSize
  //          机构业id : organization_id
  app.get('/salesman/getOrgSalesman',async function (req,res,next) {
    let organization_id = req.query.organization_id;
    let pageNo = req.query.pageNo||1;
    let pageSize = req.query.pageSize||10;
    let salesmen = await salesmanModel.find({organization_id:organization_id},
      {_id:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
    let arr = [];
    for(let salesman of salesmen) {
      arr.push(salesman._id);
    }
    let data = await loginModel.find({_id:{$in:arr}},{
      userName:1,
      password:1,
      tel:1,
      realName:1
    }).skip((pageNo-1)*pageSize).limit(pageSize);
    return res.status(200).send(data);
  });
  //获取行业及编码
  app.get('/salesman/getIndustry',async function (req,res,next) {
    let industry = await industryModel.find({},{_id:1,name:1,code:1},function (err) {
      if(err){
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        return res.status(200).send(data);
      }
    });
    return res.status(200).send(industry);
  });
  //通过行业id查询机构类别
  //params 行业id : industry_id
  app.get('/salesman/showOrgClass',async function (req,res,next) {
    let industry_id = req.query.industry_id;
    let result = await orgCategoryModel.find({industry_id:industry_id},{_id:1,code:1,name:1},function (err) {
      if(err){
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        return res.status(200).send(data);
      }
    });
    return res.status(200).send(result);
  });
  //根据项目类别查看已添加的具体项目
  // params 机构id:_id
  //        类别名称: category
  app.get('/salesman/showProjects',async function (req,res,next) {
    let _id = req.query._id;
    let category = req.query.category;
    let organization = await organizationModel.findOne({_id:_id},{projects:1},function (err) {
      if(err){
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        return res.status(200).send(data);
      }
    });
    let data = [];
    for(let project of organization.projects){
      if(category==project.category){
        let pro = {};
        pro.project = project.name;
        pro.price = project.price;
        data.push(pro);
      }
    }
    res.status(200).send(data);
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
};
