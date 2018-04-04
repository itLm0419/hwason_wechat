import {
  RECORD_ACTIVITIES_ID,
  RECORD_USERACTIVITIES_ID,
  RECORD_ACTIVITYINFO,
  RECORD_USER_ID,
  RECORD_SALESMANINFO,
  RECORD_COMPANYINFO,
  RECORD_NURSEINFO,
  RECORD_USERINFO,
  RECORD_USERINFO2,
  RECORD_PROJECTINFO,
  RECORD_PROJECTINFO2,
  RECORD_FOOTERINFO
	} from './mutation-types.js'

export default {
  [RECORD_ACTIVITYINFO](state, info) {
    state.activityInfo = info;
  },
    [RECORD_ACTIVITIES_ID](state, id) {
        state.activity_id = id;
    },
    [RECORD_USERACTIVITIES_ID](state, id) {
        state.userActivities_id = id;
    },
  [RECORD_USER_ID](state, id) {
    state.user_id = id;
  },
  // 记录用户信息
  [RECORD_SALESMANINFO](state, info) {
    state.loginUserInfo = info;
    state.login = true;
    let validity = 30;
    let now = new Date();
    now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
    document.cookie = "USERID=" + info.user_id + ";expires=" + now.toGMTString();
    document.cookie = "SID=huRyTRd9QLij7NkbpHJoj3PQrx1eRiO6bAiw" + ";expires=" + now.toGMTString();
  },
//用户样品检验时护士核验信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
  },
  //用户样品检验时护士核验信息
  [RECORD_USERINFO2](state, info) {
    state.userInfo2 = info;
  },

 //护士注册时记录用户登录名
  [RECORD_NURSEINFO](state, info)
    {
      state.nurseTel = info;
    },

    //记录公司信息
  [RECORD_COMPANYINFO](state, info)
{
  state.companyInfo = info;
},
  [RECORD_PROJECTINFO](state, info)
  {
    state.projectInfo = info;
  },
    [RECORD_PROJECTINFO2](state, info)
  {
    state.projectInfo2 = info;
  },

    [RECORD_FOOTERINFO](state, info) {
        state.footerInfo = info;
    },
}
