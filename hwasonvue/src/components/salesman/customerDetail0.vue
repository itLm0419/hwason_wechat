<template>
  <section class="wrap" >
    <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>

    <section  v-show="!show"  class="customerDetail"  >
      <div class="companyName">中国人寿扬州分公司 </div>
      <form action="" method="post">
        <ul class="addCustomer">
          <li class="clearfix" >
            <img v-if="isModify" src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">体检套餐</span>
            <input type="text" name="medicalPkg" class="fr" v-bind:readonly="isModify2" v-model="projects" v-on:focus="SelectPkg">
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
            <input type="text" name="salesmanTel" class="fr" v-bind:readonly="isModify2" v-model="sex">
          </li>
          <li class="clearfix">
            <img v-if="isModify" src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">身份证号</span>
            <input type="text" name="id" class="fr" v-bind:readonly="isModify2" v-model="IDNo">
          </li>
          <li class="clearfix">
            <img v-if="isModify" src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">联系电话</span>
            <input type="text" name="tel" class="fr" v-bind:readonly="isModify2" v-model="tel">
          </li>
          <li class="clearfix">
            <span class="checkName fl">业务员工号</span>
            <input type="text" name="salesman" class="fr" readonly="true" v-model="salesman_number">
          </li>
          <li class="clearfix">
            <img v-if="isModify" src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">业务员姓名</span>
            <input type="text" name="id" class="fr"  v-bind:readonly="isModify2" v-model="salesman_name">
          </li>
          <li class="clearfix removeBorder">
            <span class="checkName fl">业务员联系电话</span>
            <input type="text" name="salesmanTel" class="fr" readonly="true" v-model="salesman_name_tel">
          </li>
        </ul>
        <div class="modifyOrChecked" v-if="!isModify">
          <a href="javascript:;" class="modifyMsgBtn" @click="GotoModify">信息修改</a>
          <a href="javascript:;" class="checkedMsgBtn" @click="GotoBack">信息核对无误</a>
        </div>
        <div class="modifyOrChecked" v-if="isModify">
          <a href="javascript:;" class="modifyMsgBtn" @click="GotoConfirm">确认修改</a>
          <a href="javascript:;" class="checkedMsgBtn" @click="GotoBack">取消修改</a>
        </div>
      </form>
    </section>
    <!--标题结束-->
    <medicalPackage :isOn="show" v-on:child-say="pkgSelect"> </medicalPackage>
  </section>

</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import {mapState,mapMutations} from 'vuex'
  import Vue from 'vue'
  import axios from 'axios'
  import medicalPackage from './medicalPackage'



  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0: "客户信息填详情",
        isModify: false,
        isModify2: true,
        isSelected:false,
        projects: '',
        activity_time: '',
        address: '',
        name: '',
        sex: '',
        tel: '',
        IDNo: '',
        salesman_name: '',
        salesman_number: '',
        salesman_name_tel: '',
        show:false
      }
    },
    mounted: function () {
      this.GetcustomerDetail();
    },
    created: function () {
//          GetTodayActivity();
    },
    computed: {
      ...mapState([
        'activity_id',
        'user_id',
        'projectInfo'
      ])
    },
    components: {
      headerpart,
      medicalPackage
    },
    methods: {
      pkgSelect(somedata){
          console.log("are you ok")
          this.show=false;
      },
      ...mapMutations([
        'RECORD_USERINFO'

      ]),
      SelectPkg(){
//        this.$router.push('/salesman/medicalPackage');
//        isSelected=true;
       // new pro().$mount('#Detail');
        this.show=true;
      },

      GotoModify(){
        this.isModify = true;
        this.isModify2 = false;
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
      GotoConfirm(){
        let isChange_salesman = false;
        let isChange_project = false;
        if (this.salesman_name != userInfo.data.salesman_name) {
          isChange_salesman = true
        }
        if (this.projects != userInfo.data.projects) {
          isChange_project = true
        }

        axios.post('/wechat/salesman/modifyCustomer', {
          user_id: this.user_id,
          isChange_salesman: true,
          isChange_project: true,
          name: this.name,
          sex: this.sex,
          tel: this.tel,
          IDNo: this.IDNo,
          projects: this.projects,
          salesman_name: this.salesman_name
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (response) {
            console.log(response);
          });

      },
      GotoBack(){
        this.$router.go(-1)
      },

      GetcustomerDetail(){
        let vm = this;
        console.log("this.activity_id")
        console.log(this.activity_id)
        axios.get('/wechat/salesman/customerDetail', {params: {activity_id: this.activity_id, user_id: this.user_id}})
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
              vm.salesman_name = response.data.salesman_name;
              vm.salesman_number = response.data.salesman_number;
              vm.salesman_name_tel = response.data.salesman_name_tel
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
    background: -webkit-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: -o-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: -ms-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: linear-gradient(top, #318ffe 0%,#1d69f0 100%)
  }
  .modifyOrChecked .checkedMsgBtn{
    color:#338fff;
    border:0.05rem solid #338fff;
    background: #fff;
    margin-bottom:0.5rem;
  }
</style>
