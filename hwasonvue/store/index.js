import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  activity_id:'', //当前活动的activities.id
  userActivities_id:'',  //userActivities 的id
  activityInfo:null, //用户行事历修改时保持活动信息等
  user_id:'', //当前用户的
  loginUserInfo: null, //用户信息
  login: true,   //是否登录
  companyName:'', //机构名称
  userInfo:null, //用户样品检验时护士核验信息id
  userInfo2:null, //用户样品检验时护士核验信息id
  nurseTel:'',    ////护士注册时记录用户登录名
  companyInfo:null, ///公司信息
  projectInfo:null, ///套餐信息
  projectInfo2:null, ///第二种体检套餐
  footerInfo:null  ///footer 选择信息
	};

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
