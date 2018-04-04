
import Vue from 'vue'
import  VueValidator  from '../util/validation'

import Router from 'vue-router'
//import picker from 'vue-3d-picker'
 //import picker from '../components/common/picker/index'
import Hello from '@/components/Hello'
 //企业端
import activity from '../components/company/wechat/activitysheet/activity.vue'
import activitydetail from '../components/company/wechat/activitysheet/activitydetail.vue'
import addactivity from '../components/company/wechat/activitysheet/addactivity.vue'
import modifyactivity from '../components/company/wechat/activitysheet/modifyactivity.vue'

import Calendar from '../util/datepicker.js';

import feedback from '../components/company/wechat/sample/feedback.vue'
import sampledetaillist from '../components/company/wechat/sample/sampledetaillist.vue'

import samplepkg from '../components/company/wechat/samplepkg/samplepkg.vue'
import apply from '../components/company/wechat/samplepkg/apply.vue'
import confirm from '../components/company/wechat/samplepkg/confirm.vue'
import deliverydetaillist from '../components/company/wechat/samplepkg/deliverydetaillist.vue'

import activityinfo from '../components/company/wechat/activityinfo/activityinfo10.vue'


import NotFound from '../components/common/404'
//护士注册
import regist from '../components/nurse/regist.vue'
import registNext from '../components/nurse/registNext.vue'
 //护士登陆后页面
import instruction from '../components/nurse/instructions/instructions.vue'
import nurseProgress from '../components/nurse/instructions/nurseProgress.vue'
import samplingProgress from '../components/nurse/instructions/samplingProgress.vue'
import attention from '../components/nurse/instructions/attention.vue'
import preparation from '../components/nurse/instructions/preparation.vue'
import live from '../components/nurse/instructions/live.vue'
import collection from '../components/nurse/instructions/collection.vue'
import centrifugal from '../components/nurse/instructions/centrifugal.vue'
import packing from '../components/nurse/instructions/packing.vue'
import mycenter from '../components/nurse/mycenter/mycenter.vue'
import recordeinfo from '../components/nurse/recordeinfo/recordeinfo.vue'
import sampling from '../components/nurse/sampling/sampling.vue'
import checkinfo from '../components/nurse/sampling/checkinfo.vue'
import modify from '../components/nurse/sampling/modify.vue'

//客户体检页面
import examination from '../components/examination/examination.vue'
import examinationNext from '../components/examination/examinationNext.vue'
import medicalPackage from '../components/examination/medicalPackage.vue'
import index from '../components/salesman/index.vue'
import siteActivity from '../components/salesman/siteActivity.vue'
import customerMsg from '../components/salesman/customerMsg.vue'
import stateCustomerDetail from '../components/salesman/stateCustomerDetail.vue'
import custormerDetail from '../components/salesman/custormerDetail.vue'
import modifyCustomer from '../components/salesman/modifyCustomer.vue'
import searchCustomer from '../components/salesman/searchCustomer.vue'
import addCustormer from '../components/salesman/addCustormer.vue'

//登录主页面
import login from '../components/wechatLogin/login.vue'
import retrievalPwd from '../components/wechatLogin/retrievalPwd.vue'


// 省市区
import region from '../components/common/region/region.vue'
// import cityselect from '../components/common/region/cityselect.vue'

console.log("myValidator")
Vue.use(Router)

console.log("myRouter")
Vue.use(Calendar);

export default new Router({
  routes: [
    /*{
      path: '/www',
      name: 'region',
      component: region
    },*/
  //登录入口
   {
      path: '/',
      name: 'login',
      component: login
    },
    //忘记密码
    {
      path: '/retrievalPwd',
      name: 'retrievalPwd',
      component: retrievalPwd
    },
//企业登录
   /* {
      path: '/',
      name: 'deliverydetaillist',
      component: deliverydetaillist
    },*/
//护士登录
    /* {
      path: '/',
      name: 'regist',
      component: regist
    },*/
    {
      path: '/registNext',
      name: 'registNext',
      component: registNext
    },

//护士登录后页面
   {
      //操作指南入口
    /* path: '/',
      name: 'instruction',
      component: instruction*/
    },
  // 省市区入口

  //业务员页面入口
     /*  {
      path: '/',
      name: 'index',
      component: index
    },*/
    {
      path: '/siteActivity',
      name: 'siteActivity',
      component: siteActivity
    },
    {
      path: '/customerMsg',
      name: 'customerMsg',
      component: customerMsg
    },
    {
      path: '/stateCustomerDetail',
      name: 'stateCustomerDetail',
      component: stateCustomerDetail
    },
    {
      path: '/custormerDetail',
      name: 'custormerDetail',
      component: custormerDetail
    },
    {
      path: '/modifyCustomer',
      name: 'modifyCustomer',
      component: modifyCustomer
    },
    {
      path: '/searchCustomer',
      name: 'searchCustomer',
      component: searchCustomer
    },
    {
      path: '/addCustormer',
      name: 'addCustormer',
      component: addCustormer
    },
//体检页面入口
   /*{
      path: '/',
      name: 'examination',
      component: examination
    },*/
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

    // 护士页面
    {
      path: '/nurseProgress',
      name: 'nurseProgress',
      component: nurseProgress
    },
    {
      path: '/samplingProgress',
      name: 'samplingProgress',
      component: samplingProgress
    },
    {
      path: '/attention',
      name: 'attention',
      component: attention
    },
   {
      path: '/preparation',
      name: 'preparation',
      component: preparation
    },
     {
      path: '/live',
      name: 'live',
      component: live
    },
      {
      path: '/collection',
      name: 'collection',
      component: collection
    },
       {
      path: '/centrifugal',
      name: 'centrifugal',
      component: centrifugal
    },
        {
      path: '/packing',
      name: 'packing',
      component: packing
    },
    //个人中心
    {
      path: '/mycenter',
      name: 'mycenter',
      component: mycenter
    },
    //采样
  {
      path: '/sampling',
      name: 'sampling',
      component: sampling
    },
    {
      path: '/checkinfo',
      name: 'checkinfo',
      component: checkinfo
    },
    {
      path: '/modify',
      name: 'modify',
      component: modify
    },
    //已录信息
    {
      path: '/recordeinfo',
      name: 'recordeinfo',
      component: recordeinfo
    },
//业务员页面

    {
      path: '/samplepkg',
      name: 'samplepkg',
      component: samplepkg
    },
    {
      path: '/activity',
      name: 'calendar',
      component: activity
    },
    {
      path: '/activityinfo',
      name: 'activityinfo',
      component: activityinfo
    },
    {
      path: '/apply',
      name: 'apply',
      component: apply
    },
    {
      path : '*',
      component : NotFound
    }
  ]
})
