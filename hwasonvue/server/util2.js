import organizationModel from'./util/schema/organizations';
import activityModel from './util/schema/activities';
import userActivityModel from './util/schema/userActivities';
import userModel from './util/schema/user';
function changeSingleDate(date) {
  let month;
  if((date.getMonth() + 1).toString().length == 1){
    month="0"+(date.getMonth() + 1).toString();
  }else{
    month=(date.getMonth() + 1).toString();
  }
  return (date.getYear() + 1900) + "/" + month + "/" + date.getDate()+" "+date.getHours()+":"+date.getMinutes();
}
module.exports = {
  queryOrg:async function (pageNo,pageSize,query,res) {
    let organizations = await organizationModel.find(query,
      {code:1,name:1,create_time:1,"projects.category":1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      }).skip((pageNo-1)*pageSize).limit(pageSize);
    let data = [];
    for(let organization of organizations){
      let org = {};
      org._id = organization._id;
      org.name = organization.name;
      org.code = organization.code;
      org.create_time = changeSingleDate(organization.create_time);
      let project_category = [];
      for(let project of organization.projects){
        if(project_category.indexOf(project.category)==-1){
          project_category.push(project.category)
        }
      }
      org.project_category = project_category;
      data.push(org);
    }

    return data;
  },
  queryActivities:async function(pageNo,pageSize,query,res){
    let result = await activityModel.find(query,
      {_id:1,activity_time:1,projects:1,address:1,estimated_number:1,organization_id:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      }).sort({activity_time:-1}).skip((pageNo-1)*pageSize).limit(pageSize);
    let data = [];
    for(let activities of result){
      let activity = {};
      let organization = await organizationModel.findOne({_id:activities.organization_id},{name:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
      activity.organization_name = organization.name;
      activity._id = activities._id;
      activity.activity_time = changeSingleDate(activities.activity_time);
      activity.projects = activities.projects;
      activity.address = activities.address;
      activity.estimated_number = activities.estimated_number;
      data.push(activity);
    }
    return data;
  },
  queryReports:async function(pageNo,pageSize,query,res){
    let result = await activityModel.find(query,
      {
        _id:1,
        activity_time:1,
        projects:1,
        address:1,
        sample_status:1,
        receiver:1,
        feedback_state:1,
        laboratory_checked:1,
        sampling_number:1,
        organization_id:1
      },function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      }).sort({activity_time:-1}).skip((pageNo-1)*pageSize).limit(pageSize);
    let data = [];
    for(let activities of result){
      let activity = {};
      let organization = await organizationModel.findOne({_id:activities.organization_id},{name:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        }
      });
      activity.organization_name = organization.name;
      activity._id = activities._id;
      activity.activity_time = changeSingleDate(activities.activity_time);
      activity.projects = activities.projects;
      activity.address = activities.address;
      activity.sampling_number = activities.sampling_number;
      activity.feedback_state = activities.feedback_state;
      activity.receiver = activities.receiver;
      activity.feedback_state = activities.feedback_state;
      activity.laboratory_checked = activities.activity;
      data.push(activity);
    }
    return data;
  },
  queryReportDetail:async function(_id,pageNo,pageSize,res){
    let activity = await activityModel.findOne({_id:_id},
      {
        activity_time:1,
        projects:1,
        address:1,
        organization_id:1
      },function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          res.status(200).send(data);
        }
      });
    let organization = await organizationModel.findOne({_id:activity.organization_id},{name:1},function (err) {
      if(err){
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        res.status(200).send(data);
      }
    });
    let data = {};
    data.organization_name = organization.name;
    data.activity_time = changeSingleDate(activity.activity_time);
    data.projects = activity.projects;
    data.address = activity.address;
    let userActivities = await userActivityModel.find({activity_id:activity._id,sampled:true},{
      userId:1,
      barcode:1,
      projects:1,
      salesman:1,
    },function (err) {
      if(err){
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        res.status(200).send(data);
      }
    }).skip((pageNo-1)*pageSize).limit(pageSize);
    let users = [];
    for(let userActivity of userActivities){
      let user = {};
      user.barcode = userActivity.barcode;
      user.projects = userActivity.projects;
      user.salesman_name = userActivity.salesman.salesman_name;
      user.laboratory_code = userActivity.laboratory_code;
      let login = await loginModel.findOne({_id:userActivity.salesman.salesman_id},{tel:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          res.status(200).send(data);
        }
      });
      user.salesman_tel = login.tel;
      let result = await userModel.findOne({_id:userActivity.userId},{name:1,sex:1,IDNo:1},function (err) {
        if(err){
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          res.status(200).send(data);
        }
      });
      user.name = result.name;
      user.sex = result.sex;
      user.IDNo = result.IDNo;
      users.push(user);
    }
    data.users = users;
  },
  dateFormat:changeSingleDate
};
