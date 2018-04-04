<template>
  <section class="wrap" id="Detail" >
    <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>
    <section  v-show="!show"  class="customerDetail">
      <div class="addBlank"></div>
      <div class="companyName">{{companyName}} </div>
      <form action="" method="post">
        <ul class="addCustomer">
          <li class="clearfix" >
            <img v-if="isModify" src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">体检套餐</span>
            <!--<input type="text" name="medicalPkg" class="fr" v-bind:readonly="isModify2" v-model="projects" v-on:focus="SelectPkg" v-on:change="ProjectChange">-->
            <input type="text" name="medicalPkg" class="fr" readonly v-model="projects" v-on:focus="SelectPkg" v-on:change="ProjectChange">
          </li>
          <li class="clearfix" >
            <span class="checkName fl">检测时间</span>
            <input type="text" name="detectionTime"  readonly="true" class="fr" v-model="activity_time">
          </li>
          <li class="clearfix">
            <span class="checkName fl">活动地点</span>
            <input type="text" name="address" class="fr" readonly="true" v-model="address">
          </li>
          <li class="clearfix">
            <img v-if="isModify" src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">姓名</span>
            <input type="text" name="name" class="fr" v-bind:readonly="isModify2" v-model="name">
          </li>
          <li class="clearfix">
            <img v-if="isModify" src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">性别</span>
            <div class="sexInpBox fl">
              <div class="clearfix fl"><input type="radio" name="sex" id="man" class="fl"  v-bind:disabled="isDisabled" v-model="sex" value="男"><label for="man" class="fl">男</label></div>
              <div class="clearfix fl"><input type="radio" name="sex" id="woman" class="fl" v-bind:disabled="isDisabled"  v-model="sex" value="女"><label for="woman" class="fl">女</label></div>
            </div>
            <!--<input type="text" name="salesmanTel" class="fr" v-bind:readonly="isModify2" v-model="sex">-->
          </li>
          <li class="clearfix">
            <img v-if="isModify" src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">身份证号</span>
            <input type="text" name="id" class="fr" v-bind:readonly="isModify2" v-model="IDNo" v-on:blur="checkId()">
          </li>
          <li class="clearfix">
            <img v-if="isModify" src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">联系电话</span>
            <input type="text" name="tel" class="fr" v-bind:readonly="isModify2" v-model="tel" v-on:blur="checkPhone()">
          </li>
          <li class="clearfix">
            <span class="checkName fl">业务员工号</span>
            <input type="text" name="salesman" class="fr" readonly="true" v-model="salesman_number">
          </li>
          <li class="clearfix">
            <!--<img v-if="isModify" src="/static/img/nurse/mustIcon.png" class="fl" alt="">-->
            <span class="checkName fl">业务员姓名</span>
            <input type="text" name="id" class="fr"  readonly="true" v-model="salesman_name" v-on:change="SalesmanNameChange">
          </li>
          <li class="clearfix removeBorder">
            <span class="checkName fl">业务员联系电话</span>
            <input type="text" name="salesmanTel" class="fr" readonly="true" v-model="salesman_name_tel">
          </li>
        </ul>
        <div class="modifyOrChecked" v-if="!isModify">
          <a href="javascript:;" class="modifyMsgBtn" @click="GotoModify">信息修改</a>
          <a href="javascript:;" class="checkedMsgBtn" @click="GotoConfirm2">信息核对无误</a>
        </div>
        <div class="modifyOrChecked" v-if="isModify">
          <a href="javascript:;" class="modifyMsgBtn" @click="GotoConfirm">确认修改</a>
          <a href="javascript:;" class="checkedMsgBtn" @click="GotoBack">取消修改</a>
        </div>
      </form>
      <alertTiming ref="alertTiming1" :content="alertContent">  </alertTiming>
    </section>
    <!--标题结束-->
  </section>

</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import {mapState,mapMutations} from 'vuex'
  import Vue from 'vue'
  import axios from 'axios'
  import medicalPackage from './medicalPackage'
  import alertTiming from '../alertTiming';
  import api from '../../util/api';
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0: "客户信息详情",
        companyName:'',
        isModify: false,
        isModify2: true,
        isDisabled:true,
        isSelected:false,
        projects: '',
        activity_time: '',
        address: '',
        name: '',
        sex: '男',
        tel: '',
        IDNo: '',
        salesman_name: '',
        salesman_number: '',
        salesman_name_tel: '',
        show:false,
        alertContent:'',
        userId:'',
        isChange_salesman:false,
        isChange_project:false,
        msg:'',
        isIDNook:false,
        isTelok:false,
        feedback_state:1
      }
    },
    mounted: function () {
        console.log("projectInfo:",this.projectInfo)
       // console.log("this.userInfo.isPkgSelect:",this.userInfo.isPkgSelect)
        if(this.projectInfo==null ||!this.userInfo.isPkgSelect)
        {
            this.companyName=this.companyInfo.companyName;
            console.log("companyName:",this.companyName)

        }
        else {
            this.projects=this.projectInfo.projects;
            console.log("projects:",this.projects)
        }
        if(this.userInfo!=null)
        {
            console.log("this.userInfo !=null",this.userInfo)
            this.name=this.userInfo.name;
            this.sex=this.userInfo.sex;
            this.IDNo=this.userInfo.IDNo;
            this.tel=this.userInfo.tel;
            this.userId=this.userInfo.userId;
            this.companyName=this.userInfo.companyName;
            this.address=this.userInfo.address;
            this.activity_time=this.userInfo.activity_time;
            this.salesman_name=this.userInfo.salesman_name;
            this.salesman_number=this.userInfo.salesman_number;
            this.salesman_name_tel=this.userInfo.salesman_name_tel;
            this.userActivities_id=this.userInfo.userActivities_id;
            this.isModify2 = this.userInfo.isModify2;
            this.isDisabled = this.userInfo.isDisabled;
            this.isModify = this.userInfo.isModify;

        }
        else {
            console.log("GetcustomerDetail")
            this.GetcustomerDetail();
        }


    },
    created: function () {
//          GetTodayActivity();
        let urlSearch = new api.UrlSearch();
        this.feedback_state = urlSearch.feedback_state;

    },
    computed: {
      ...mapState([
        'userActivities_id',
        'user_id',
        'projectInfo',
        'companyInfo',
         'userInfo'
      ])
    },
    components: {
      headerpart,
      alertTiming

    },
    methods: {

      ...mapMutations([
        'RECORD_USERINFO',
        'RECORD_PROJECTINFO'

      ]),
      ValidatePhone(){
            if( !(/^1[0-9]{10}$/.test(this.phone))){
                this.msg="手机号码格式不对!";
                this.isPhoneok=false;
            }
            else {this.isPhoneok=true;}
        },
        checkId(){
            if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(this.IDNo)){
                this.msg='身份证号码格式有误！'
                this.alertContent=this.msg;
                this.$refs.alertTiming1.Show();
                this.isIDNook=false;
            }
            else {
                this.isIDNook=true;
            }
        },
        checkPhone(){
            if(!/^1[3|4|5|8][0-9]\d{8}$/.test(this.tel)){
                this.msg='手机号码格式有误！';
                this.alertContent=this.msg;
                this.$refs.alertTiming1.Show();
                this.isTelok=true;
            }
            else {
                this.isTelok=false;
            }
        },


      ProjectChange(){
          this.isChange_project=true;
          console.log("change")
        },
        SalesmanNameChange(){
         this.isChange_salesman=true;
        },
      SelectPkg(){
          if(this.feedback_state==1){
              return
          }
          if(this.isModify)  {

              let userInfo={};

              userInfo.name=this.name;
              userInfo.sex=this.sex;
              userInfo.IDNo=this.IDNo;
              userInfo.tel=this.tel;
             // userInfo.projects=this.projects;
              userInfo.address=this.address;
              userInfo.activity_time=this.activity_time;
              userInfo.salesman_name=this.salesman_name;
              userInfo.salesman_number=this.salesman_number;
              userInfo.salesman_name_tel=this.salesman_name_tel;
              userInfo.userActivities_id=this.userActivities_id;
              userInfo.companyName=this.companyName;
              userInfo.userId=this.userId;
              userInfo.isPkgSelect=true;
              userInfo.isModify=true;
              userInfo.isModify2 = false;
              userInfo.isDisabled = false;

              this.RECORD_USERINFO(userInfo)
              console.log("this,userInfo",userInfo)
              this.$router.push('/salesman/medicalPackage');


          }


      },
      GotoModify(){
        this.isModify = true;
        this.isModify2 = false;
        this.isDisabled = false;
      },
//        let data={}
//          data.projects=this.projects;
//          data.activity_time=this.activity_time;
//          data.address=this.address;
//          data.name=this.name;
//          data.sex=this.sex;
//          data.tel=this.tel;
//          data.IDNo=this.IDNo;
//          data.salesman_name=this.salesman_name;
//          data.salesman_number=this.salesman_number;
//          data.salesman_name_tel=this.salesman_name_tel;
//         let userInfo={};
//             userInfo.data=data;
//        this.RECORD_USERINFO(userInfo)
//        console.log(userInfo)
//        this.$router.push('/salesman/modifyCustomer')
//
//      },
        GotoConfirm2(){
          let vm=this;
            axios.post('/wechat/salesman/modifyCustomer2', {
                user_id: this.user_id,
                userActivities_id: this.userActivities_id
            })
                .then(function (response) {
                    //console.log(response);
                    vm.alertContent=response.data.name;
                    vm.$refs.alertTiming1.Show();
                    setTimeout(function(){vm.$router.go(-1);},2000)

                })
                .catch(function (response) {
                    vm.alertContent=response;
                    vm.$refs.alertTiming1.Show();
                });
        },

      GotoConfirm(){
            let vm=this;
     if(this.name==''||this.isTelok==false||this.isIDNook==false||this.projects==''){
         vm.alertContent="请填写完整数据，再提交";
         vm.$refs.alertTiming1.Show();


     }

       axios.post('/wechat/salesman/modifyCustomer', {
          user_id: vm.user_id,
          userActivities_id: vm.userActivities_id,
          isChange_salesman: false,
          isChange_project: true,
          name: vm.name,
          sex: vm.sex,
          tel: vm.tel,
          IDNo: vm.IDNo,
          projects: vm.projects,
          salesman_name: vm.salesman_name
        })
          .then(function (response) {
              vm.alertContent=response.data.name;
              vm.$refs.alertTiming1.Show();

              if(response.data.result=='00')
              {
                  let projectInfo=null;
                  let userInfo=null;
                  vm.RECORD_USERINFO(userInfo)
                  vm.RECORD_PROJECTINFO(projectInfo)
                  vm.alertContent=response.data.name;
                  vm.$refs.alertTiming1.Show();
                 setTimeout(function(){vm.$router.go(-1);},2000)

              }
            console.log(response);
          })
          .catch(function (response) {
            console.log(response);
          });

      },
      GotoBack(){

        let projectInfo=null;
        let userInfo=null;
        this.RECORD_USERINFO(userInfo)
        this.RECORD_PROJECTINFO(projectInfo)
        console.log("project",projectInfo)
        this.$router.go(-1)
      },

      GetcustomerDetail(){
        let vm = this;
        axios.get('/wechat/salesman/customerDetail', {params: {userActivities_id: this.userActivities_id, user_id: this.user_id}})
          .then(function (response) {
            console.log("response：")
            console.log(response.data)

            if (response.data != null) {
              vm.projects = response.data.projects;
              vm.activity_time = response.data.activity_time;
              vm.address = response.data.address;
              vm.name = response.data.name;
              vm.sex = response.data.sex;
              vm.tel = response.data.tel;
              vm.IDNo = response.data.IDNo;
              vm.userId=response.data.userId;
              vm.salesman_name = response.data.salesman_name;
              vm.salesman_number = response.data.salesman_number;
              vm.salesman_name_tel = response.data.salesman_name_tel

//                vm.userInfo.projects=vm.projects
//                vm.userInfo.activity_time=vm.activity_time
//                vm.userInfo.address=vm.address
//
//                vm.userInfo.name=vm.name
//                vm.userInfo.sex=vm.sex
//                vm.userInfo.tel=vm.tel
//                vm.userInfo.IDNo=vm.IDNo
//
//               vm.userInfo.salesman_name=vm.salesman_name
//                vm.userInfo.salesman_number=vm.salesman_number
//                vm.userInfo.salesman_name_tel=vm.salesman_name_tel
//                console.log(vm.userInfo)

            }
            //            console.log("this.TodayActivities22")
//            console.log(vm.TodayActivities[0])
            //return response.data;

          })
          .catch(function (response) {
            console.log("error response：")
            console.log(response);
          })
      }
    }
  }

</script>
<style>
  .addBlank{
    height:2.2rem;
  }

  .customerDetail{
    height: 31.15rem;
    overflow-y: scroll;
  }

  .addCustomer{
    width:100%;
    background:#fff ;
  }
  .addCustomer li{
    width:17.25rem;
    height:2.475rem;
    margin-left:0.75rem;
    border-bottom:1px solid #dcdcdc;
  }
  .addCustomer li.removeBorder{
    border:0;
  }

  .addCustomer li span{
    color:#333;
    line-height: 2.475rem;
    font-size:0.7rem;
  }
  .addCustomer li input{
    width:71%;
    height:100%;
    border:0;
  }
  .addCustomer li img{
    height: 0.45rem;
    width: 0.45rem;
    margin: 1rem 0.2rem 0 0
  }
  .addCustomer .sexInpBox{
    margin:0.8rem 0 0 4rem;
  }
  .sexInpBox div{
    margin-right:3rem;
  }
  .addCustomer .sexInpBox label{
    margin-left:0.7rem;
  }
  .addCustomer .sexInpBox input{
    width:0.8rem;
    height:0.8rem;
  }

  .modifyOrChecked a{
    width:16.65rem;
    height:2.25rem;
    display: block;
    margin:0 auto;
    background: #d9d9d9;
    text-align: center;
    line-height: 2.25rem;
    color:#fff;
    font-size:1rem;
  }
  .modifyOrChecked .modifyMsgBtn{
    margin:1.25rem auto 0.9rem;
    background: #338fff;
  }
  .modifyOrChecked .checkedMsgBtn{
    color:#338fff;
    border:0.05rem solid #338fff;
    background: #fff;
    margin-bottom:1rem;
  }
</style>
