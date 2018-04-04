import organizationModel from'../util/schema/organizations';
import activityModel from '../util/schema/activities';
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
      console.log(organization);
      let org = {};
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
      data.push(activity);
    }
    return data;
  },
  dateFormat:changeSingleDate
};
