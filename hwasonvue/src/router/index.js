
import Vue from 'vue'
import Router from 'vue-router'


//activityinfo
// import activityinfo from '../components/company/wechat/activityinfo/activityinfo.vue'
const activityinfo = r => require.ensure([], () => r(require('../components/company/wechat/activityinfo/activityinfo.vue')), 'activityinfo')

const activitydetaillist = r => require.ensure([], () => r(require('../components/company/wechat/activityinfo/activitydetaillist.vue')), 'activitydetaillist')

//activitysheet
// import activity from '../components/company/wechat/activitysheet/activity.vue'
const activity = r => require.ensure([], () => r(require('../components/company/wechat/activitysheet/activity.vue')), 'activity')

// import addactivity from '../components/company/wechat/activitysheet/addactivity.vue'
const addactivity = r => require.ensure([], () => r(require('../components/company/wechat/activitysheet/addactivity.vue')), 'addactivity')

// import Calendar from '../util/datepicker.js';
// const Calendar = r => require.ensure([], () => r(require('../util/datepicker.js')), 'Calendar')

// import modifyactivity from '../components/company/wechat/activitysheet/modifyactivity.vue'
const modifyactivity = r => require.ensure([], () => r(require('../components/company/wechat/activitysheet/modifyactivity.vue')), 'modifyactivity')

//samplepkg
// import apply from '../components/company/wechat/samplepkg/apply.vue'
const apply = r => require.ensure([], () => r(require('../components/company/wechat/samplepkg/apply.vue')), 'apply')

// import confirm from '../components/company/wechat/samplepkg/confirm.vue'
const confirm = r => require.ensure([], () => r(require('../components/company/wechat/samplepkg/confirm.vue')), 'confirm')

// import deliverydetaillist from '../components/company/wechat/samplepkg/deliverydetaillist.vue'
const deliverydetaillist = r => require.ensure([], () => r(require('../components/company/wechat/samplepkg/deliverydetaillist.vue')), 'deliverydetaillist')

// import samplepkg from '../components/company/wechat/samplepkg/samplepkg.vue'
const samplepkg = r => require.ensure([], () => r(require('../components/company/wechat/samplepkg/samplepkg.vue')), 'samplepkg')

const healthRecords = r => require.ensure([], () => r(require('../components/company/wechat/comHealthRecords/healthRecords.vue')), 'healthRecords')
const healthRecSearch = r => require.ensure([], () => r(require('../components/company/wechat/comHealthRecords/healthRecSearch.vue')), 'healthRecSearch');
const healthRecLists= r => require.ensure([], () => r(require('../components/company/wechat/comHealthRecords/healthRecLists.vue')), 'healthRecLists');
const loadmore5= r => require.ensure([], () => r(require('../components/company/wechat/comHealthRecords/loadmore5.vue')), 'loadmore5');



// import region from '../components/common/region/region.vue'
const region = r => require.ensure([], () => r(require('../components/common/region/region.vue')), 'region')



//sample
// import feedback from '../components/company/wechat/sample/feedback.vue'
const feedback = r => require.ensure([], () => r(require('../components/company/wechat/sample/feedback.vue')), 'feedback')

// import sampledetaillist from '../components/company/wechat/sample/sampledetaillist.vue'
const sampledetaillist = r => require.ensure([], () => r(require('../components/company/wechat/sample/sampledetaillist.vue')), 'sampledetaillist')

// import samplelist from ''
const samplelist = r => require.ensure([], () => r(require('../components/company/wechat/sample/samplelist.vue')), 'samplelist')

// import samplelist from ''
const samplecheck = r => require.ensure([], () => r(require('../components/company/wechat/sample/samplecheck.vue')), 'samplecheck')

// import qrcode from '../components/company/wechat/sample/qrcode.vue'
const qrcode = r => require.ensure([], () => r(require('../components/company/wechat/sample/qrcode.vue')), 'qrcode')









// import activitydetail from '../components/company/wechat/activitysheet/activitydetail.vue'
const activitydetail = r => require.ensure([], () => r(require('../components/company/wechat/activitysheet/activitydetail.vue')), 'activitydetail')

// import NotFound from '../components/common/404'
const NotFound = r => require.ensure([], () => r(require('../components/common/404')), 'NotFound')

//护士注册
// import regist from '../components/nurse/regist.vue'
const regist = r => require.ensure([], () => r(require('../components/nurse/regist.vue')), 'regist')
 //护士登陆后页面
// import registNext from '../components/nurse/registNext.vue'
const registNext = r => require.ensure([], () => r(require('../components/nurse/registNext.vue')), 'registNext')


// import instruction from '../components/nurse/instructions/instructions.vue'
const instruction = r => require.ensure([], () => r(require('../components/nurse/instructions/instructions.vue')), 'instruction')

// import nurseProgress from '../components/nurse/instructions/nurseProgress.vue'
const nurseProgress = r => require.ensure([], () => r(require('../components/nurse/instructions/nurseProgress.vue')), 'nurseProgress')

// import samplingProgress from '../components/nurse/instructions/samplingProgress.vue'
const samplingProgress = r => require.ensure([], () => r(require('../components/nurse/instructions/samplingProgress.vue')), 'samplingProgress')

// import attention from '../components/nurse/instructions/attention.vue'
const attention = r => require.ensure([], () => r(require('../components/nurse/instructions/attention.vue')), 'attention')

// import preparation from '../components/nurse/instructions/preparation.vue'
const preparation = r => require.ensure([], () => r(require('../components/nurse/instructions/preparation.vue')), 'preparation')

// import live from '../components/nurse/instructions/live.vue'
const live = r => require.ensure([], () => r(require('../components/nurse/instructions/live.vue')), 'live')

// import collection from '../components/nurse/instructions/collection.vue'
const collection = r => require.ensure([], () => r(require('../components/nurse/instructions/collection.vue')), 'collection')

// import centrifugal from '../components/nurse/instructions/centrifugal.vue'
const centrifugal = r => require.ensure([], () => r(require('../components/nurse/instructions/centrifugal.vue')), 'centrifugal')

// import packing from '../components/nurse/instructions/packing.vue'
const packing = r => require.ensure([], () => r(require('../components/nurse/instructions/packing.vue')), 'packing')

// import mycenter from '../components/nurse/mycenter/mycenter.vue'
const mycenter = r => require.ensure([], () => r(require('../components/nurse/mycenter/mycenter.vue')), 'mycenter')

// import recordeinfo from '../components/nurse/recordeinfo/recordeinfo.vue'
const recordeinfo = r => require.ensure([], () => r(require('../components/nurse/recordeinfo/recordeinfo.vue')), 'recordeinfo')
const scansubmit = r => require.ensure([], () => r(require('../components/nurse/recordeinfo/scansubmit.vue')), 'scansubmit')

// import sampling from '../components/nurse/sampling/sampling.vue'
const sampling = r => require.ensure([], () => r(require('../components/nurse/sampling/sampling.vue')), 'sampling')

// import checkinfo from '../components/nurse/sampling/checkinfo.vue'
const checkinfo = r => require.ensure([], () => r(require('../components/nurse/sampling/checkinfo.vue')), 'checkinfo')

// import modify from '../components/nurse/sampling/modify.vue'
const modify = r => require.ensure([], () => r(require('../components/nurse/sampling/modify.vue')), 'modify')


//客户体检页面
// import examination from '../components/examination/examination.vue'
const examination = r => require.ensure([], () => r(require('../components/examination/examination.vue')), 'examination')

// import examinationNext from '../components/examination/examinationNext.vue'
const examinationNext = r => require.ensure([], () => r(require('../components/examination/examinationNext.vue')), 'examinationNext')

// import medicalPackage from '../components/examination/medicalPackage.vue'
const medicalPackage = r => require.ensure([], () => r(require('../components/examination/medicalPackage.vue')), 'medicalPackage')

// import index from '../components/salesman/index.vue'
const index = r => require.ensure([], () => r(require('../components/salesman/index.vue')), 'index')

// import siteActivity from '../components/salesman/siteActivity.vue'
const siteActivity = r => require.ensure([], () => r(require('../components/salesman/siteActivity.vue')), 'siteActivity')

// import customerMsg from '../components/salesman/customerMsg.vue'
const customerMsg = r => require.ensure([], () => r(require('../components/salesman/customerMsg.vue')), 'customerMsg')

// import stateCustomerDetail from '../components/salesman/stateCustomerDetail.vue'
const stateCustomerDetail = r => require.ensure([], () => r(require('../components/salesman/stateCustomerDetail.vue')), 'stateCustomerDetail')

// import custormerDetail from '../components/salesman/custormerDetail.vue'
const customerDetail = r => require.ensure([], () => r(require('../components/salesman/customerDetail.vue')), 'customerDetail')

// import modifyCustomer from '../components/salesman/modifyCustomer.vue'
const modifyCustomer = r => require.ensure([], () => r(require('../components/salesman/modifyCustomer.vue')), 'modifyCustomer')

// import medicalPackage from '../components/examination/medicalPackage.vue'
const medicalPackage_salesman = r => require.ensure([], () => r(require('../components/salesman/medicalPackage.vue')), 'medicalPackage')

// import searchCustomer from '../components/salesman/searchCustomer.vue'
const searchCustomer = r => require.ensure([], () => r(require('../components/salesman/searchCustomer.vue')), 'searchCustomer')

// import addCustormer from '../components/salesman/addCustormer.vue'
const  addCustomer = r => require.ensure([], () => r(require('../components/salesman/addCustomer.vue')), 'addCustomer')

const  salesmanBindLogin = r => require.ensure([], () => r(require('../components/salesman/salesmanBindLogin.vue')), 'salesmanBindLogin')
const  healthRec = r => require.ensure([], () => r(require('../components/salesman/healthRec.vue')), 'healthRec')
const  healthRecDetail = r => require.ensure([], () => r(require('../components/salesman/healthRecDetail.vue')), 'healthRecDetail')


//登录主页面
// import login from '../components/wechatLogin/login.vue'
const login = r => require.ensure([], () => r(require('../components/wechatLogin/login.vue')), 'login')

// import retrievalPwd from '../components/wechatLogin/retrievalPwd.vue'
const retrievalPwd = r => require.ensure([], () => r(require('../components/wechatLogin/retrievalPwd.vue')), 'retrievalPwd')
const modifyPwd_login = r => require.ensure([], () => r(require('../components/wechatLogin/modifyPwd_login.vue')), 'modifyPwd_login')
const modifyPwd = r => require.ensure([], () => r(require('../components/wechatLogin/modifyPwd.vue')), 'modifyPwd')

const jssdk = r => require.ensure([], () => r(require('../components/jssdk.vue')), 'jssdk')

// 广告
const ad1 = r => require.ensure([], () => r(require('../components/Advertise/fhr.vue')), 'ad1')
const ad2 = r => require.ensure([], () => r(require('../components/Advertise/hc.vue')), 'ad2')
const ad3 = r => require.ensure([], () => r(require('../components/Advertise/hcg.vue')), 'ad3')
const ad4 = r => require.ensure([], () => r(require('../components/Advertise/pd.vue')), 'ad4')


// 健康档案
const bindLogin = r => require.ensure([], () => r(require('../components/healthRecords/bindLogin.vue')), 'bindLogin')
const baseMsg = r => require.ensure([], () => r(require('../components/healthRecords/baseMsg.vue')), 'baseMsg')
const relationships = r => require.ensure([], () => r(require('../components/healthRecords/relationships.vue')), 'relationships')
const mediaclHistory = r => require.ensure([], () => r(require('../components/healthRecords/mediaclHistory.vue')), 'mediaclHistory')
const mediaclHistory2 = r => require.ensure([], () => r(require('../components/healthRecords/mediaclHistory2.vue')), 'mediaclHistory2')
const mediaclHistory3 = r => require.ensure([], () => r(require('../components/healthRecords/mediaclHistory3.vue')), 'mediaclHistory3')
const mediaclHistory4 = r => require.ensure([], () => r(require('../components/healthRecords/mediaclHistory4.vue')), 'mediaclHistory4')
const mediaclHistory5 = r => require.ensure([], () => r(require('../components/healthRecords/mediaclHistory5.vue')), 'mediaclHistory5')
const mediaclHistory6 = r => require.ensure([], () => r(require('../components/healthRecords/mediaclHistory6.vue')), 'mediaclHistory6')
const mediaclHistory7 = r => require.ensure([], () => r(require('../components/healthRecords/mediaclHistory7.vue')), 'mediaclHistory7')


// 省市区
// import region from '../components/common/region/region.vue'
// import cityselect from '../components/common/region/cityselect.vue'




Vue.use(Router)

console.log("myRouter")
//Vue.use(Calendar);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      // component:healthRecSearch
        component:login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/wechat/retrievalPwd',
      name: 'retrievalPwd',
      component: retrievalPwd
    },
    {
          path: '/wechat/modifyPwd_login',
          name: 'modifyPwd_login',
          component: modifyPwd_login
    },
    {
          path: '/wechat/modifyPwd',
          name: 'modifyPwd',
          component: modifyPwd
    },

  //业务员页面入口
    {
      path: '/salesman/index',
      name: 'index',
      component: index
    },
    {
      path: '/salesman/siteActivity',
      name: 'siteActivity',
      component: siteActivity
    },
    {
      path: '/salesman/customerMsg',
      name: 'customerMsg',
      component: customerMsg
    },
    {
      path: '/salesman/stateCustomerDetail',
      name: 'stateCustomerDetail',
      component: stateCustomerDetail
    },
    {
      path: '/salesman/customerDetail',
      name: 'customerDetail',
      component: customerDetail
    },
    {
      path: '/salesman/modifyCustomer',
      name: 'modifyCustomer',
      component: modifyCustomer
    },
    {
      path: '/searchCustomer',
      name: 'searchCustomer',
      component: searchCustomer
    },
    {
      path: '/salesman/addCustomer',
      name: 'addCustomer',
      component: addCustomer
    },
    {
          path: '/salesman/salesmanBindLogin',
          name: 'salesmanBindLogin',
          component: salesmanBindLogin
    },
    {
          path: '/salesman/healthRec',
          name: 'healthRec',
          component: healthRec
    },
    {
          path: '/salesman/healthRecDetail',
          name: 'healthRecDetail',
          component: healthRecDetail
    },

//体检页面入口
    /*{
      path: '/',
      name: 'examination',
      component: examination
    },*/
    {
          path: '/examination',
          name: 'examination',
          component: examination
    },
    {
      path: '/examinationNext',
      name: 'examinationNext',
      component: examinationNext
    },
    {
      path: '/medicalPackage',
      name: 'medicalPackage',
      component: medicalPackage
    },
    {
      path: '/salesman/medicalPackage',
      name: 'medicalPackage',
      component: medicalPackage_salesman
    },

    // 护士页面
    {
      path: '/nurse/regist',
      name: 'nurseregis',
      component: regist
    },
    {
      path: '/nurse/registNext',
      name: 'nurseregist',
      component: registNext
    },

     {
     //操作指南入口
     path: '/nurse/instruction',
     name: 'instruction',
     component: instruction
     },
      {
          path: '/nurse/nurseProgress',
          name: 'nurseProgress',
          component: nurseProgress
      },
      {
          path: '/nurse/samplingProgress',
          name: 'samplingProgress',
          component: samplingProgress
      },
      {
      path: '/nurse/attention',
      name: 'attention',
      component: attention
    },
    {
      path: '/nurse/preparation',
      name: 'preparation',
      component: preparation
    },
     {
      path: '/nurse/live',
      name: 'live',
      component: live
    },
      {
      path: '/nurse/collection',
      name: 'collection',
      component: collection
    },
       {
      path: '/nurse/centrifugal',
      name: 'centrifugal',
      component: centrifugal
    },
        {
      path: '/nurse/packing',
      name: 'packing',
      component: packing
    },
    //个人中心
    {
      path: '/nurse/mycenter',
      name: 'mycenter',
      component: mycenter
    },
    //采样
  {
      path: '/nurse/sampling',
      name: 'sampling',
      component: sampling
    },
    {
      path: '/nurse/checkinfo',
      name: 'checkinfo',
      component: checkinfo
    },
    {
      path: '/nurse/modify',
      name: 'modify',
      component: modify
    },
    //已录信息
    {
      path: '/nurse/recordeinfo',
      name: 'recordeinfo',
      component: recordeinfo
    },
      {
          path: '/nurse/scansubmit',
          name: 'scansubmit',
          component: scansubmit
      },

//机构页面
    {
      path: '/company/activity',
      name: 'activity',
      component: activity
    },
    {
      path: '/company/activitydetail',
      name: 'activitydetail',
      component: activitydetail
    },
    {
      path: '/company/addactivity',
      name: 'addactivity',
      component: addactivity
    },

    {
      path: '/company/modifyactivity',
      name: 'modifyactivity',
      component: modifyactivity
    },
    {
      path: '/company/activityinfo',
      name: 'activityinfo',
      component: activityinfo
    },
      {
          path: '/company/activitydetaillist',
          name: 'aactivitydetaillist',
          component: activitydetaillist
      },
    {
      path: '/company/feedback',
      name: 'feedback',
      component: feedback
    },
    {
      path: '/company/samplelist',
      name: 'samplelist',
      component: samplelist
    },
    {
      path: '/company/sampledetaillist',
      name: 'sampledetaillist',
      component: sampledetaillist
    },
      {
          path: '/company/samplecheck',
          name: 'samplecheck',
          component: samplecheck
      },
    {
      path: '/company/confirm',
      name: 'confirm',
      component: confirm
    },
    {
      path: '/company/deliverydetaillist',
      name: 'deliverydetaillist',
      component: deliverydetaillist
    },
    {
      path: '/company/samplepkg',
      name: 'samplepkg',
      component: samplepkg
    },
      {
          path: '/company/healthRecords',
          name: 'healthRecords',
          component: healthRecords
      },
      {
          path: '/company/healthRecSearch',
          name: 'healthRecSearch',
          component: healthRecSearch
      },
      {
          path: '/company/healthRecLists',
          name: 'healthRecLists',
          component: healthRecLists
      },

      {
      path: '/Advertise/ad1',
      name: 'ad1',
      component: ad1
    },
      {
          path: '/Advertise/ad2',
          name: 'ad2',
          component: ad2
      },
      {
          path: '/Advertise/ad3',
          name: 'ad3',
          component: ad3
      },
      {
          path: '/Advertise/ad4',
          name: 'ad4',
          component: ad4
      },

      // 用户健康档案管理
      {
          path: '/bindLogin',
          name: 'bindLogin',
          component: bindLogin
      },
      {
          path: '/relationships',
          name: 'relationships',
          component: relationships
      },
      {
          path: '/baseMsg',
          name: 'baseMsg',
          component: baseMsg
      },
      {
          path: '/mediaclHistory',
          name: 'mediaclHistory',
          component: mediaclHistory
      },
      {
          path: '/mediaclHistory2',
          name: 'mediaclHistory2',
          component: mediaclHistory2
      },
      {
          path: '/mediaclHistory3',
          name: 'mediaclHistory3',
          component: mediaclHistory3
      },
      {
          path: '/mediaclHistory4',
          name: 'mediaclHistory4',
          component: mediaclHistory4
      },
      {
          path: '/mediaclHistory5',
          name: 'mediaclHistory5',
          component: mediaclHistory5
      },
      {
          path: '/mediaclHistory6',
          name: 'mediaclHistory6',
          component: mediaclHistory6
      },
      {
          path: '/mediaclHistory7',
          name: 'mediaclHistory7',
          component: mediaclHistory7
      },
    {
      path : '*',
      component : NotFound
    },
  ]
})
