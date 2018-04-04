<template>
  <section class="wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0" :edit="edit0"> </headerpart>
    <section class="modifycustomer">
      <div class="addBlank"></div>
      <div class="companyName">中国人寿扬州分公司</div>
      <form action="" method="post">
        <ul class="modifyCustomer">
          <li class="clearfix" >
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">体检套餐</span>
            <input type="text" name="medicalPkg" class="fr" v-model="projects">
          </li>
          <li class="clearfix" >
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">检测时间</span>
            <input type="text" name="detectionTime" class="fr" v-model="activity_time">
          </li>
          <li class="clearfix">
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">活动地点</span>
            <input type="text" name="address" class="fr" v-model="address">
          </li>
          <li class="clearfix">
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">姓名</span>
            <input type="text" name="name" class="fr" v-model="name">
          </li>
          <li class="clearfix">
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">性别</span>
            <input type="text" name="salesmanTel" class="fr" v-model="sex">
          </li>
          <li class="clearfix">
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">身份证号</span>
            <input type="text" name="id" class="fr" v-model="IDNo">
          </li>
          <li class="clearfix">
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">联系电话</span>
            <input type="text" name="tel" class="fr"v-model="tel">
          </li>
          <li class="clearfix">
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">业务员工号</span>
            <input type="text" name="salesman" class="fr"v-model="salesman_number">
          </li>
          <li class="clearfix">
            <span class="checkName fl">业务员姓名</span>
            <input type="text" name="id" class="fr" v-model="salesman_name">
          </li>
          <li class="clearfix removeBorder">
            <span class="checkName fl">业务员联系电话</span>
            <input type="text" name="salesmanTel" class="fr"v-model="salesman_name_tel">
          </li>
        </ul>
        <div class="modifyOrChecked">
          <a href="/wechat/salesman/siteActitvity" class="modifyMsgBtn" @click="onSubmit">确定修改</a>
          <a href="/wechat/salesman/customerDetail" class="checkedMsgBtn" @click="Goback">取消修改</a>
        </div>
      </form>
    </section>
    <!--标题结束-->
  </section>
</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import Vue from 'vue'
  import {mapState,mapMutations} from 'vuex'
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"修改信息详情",
        edit0:"完成",
//        projects: this.userInfo.data.projects,
//        activity_time: this.userInfo.data.activity_time,
//        address: this.userInfo.data.address,
//        name: this.userInfo.data.name,
//        sex: this.userInfo.data.sex,
//        tel: this.userInfo.data.tel,
//        IDNo: this.userInfo.data.IDNo,
//        salesman_name: this.userInfo.data.salesman_name,
//        salesman_number: this.userInfo.data.salesman_number,
//        salesman_name_tel: this.userInfo.data.salesman_name_tel
        projects: '',
        activity_time: '',
        address: '',
        name: '',
        sex: '',
        tel: '',
        IDNo: '',
        salesman_name: '',
        salesman_number: '',
        salesman_name_tel: ''
      }
    },
    mounted:function(){
      console.log("userInfo")
        console.log(this.userInfo)
       this.projects=this.userInfo.data.projects,
        this.activity_time= this.userInfo.data.activity_time,
        this.address= this.userInfo.data.address,
        this.name= this.userInfo.data.name,
        this.sex= this.userInfo.data.sex,
        this.tel=this.userInfo.data.tel,
        this.IDNo=this.userInfo.data.IDNo,
        this.salesman_name= this.userInfo.data.salesman_name,
        this.salesman_number= this.userInfo.data.salesman_number,
        this.salesman_name_tel= this.userInfo.data.salesman_name_tel
    },
    created:function(){
//          GetTodayActivity();
    },
    computed: {
      ...mapState([
        'userInfo',
        'activity_id',
        'user_id'
      ])
    },
    components:{
      headerpart,
    },
    methods:{
        Goback(){
          this.$router.go(-1)
        },
      onSubmit(){
        let isChange_salesman=false;
        let isChange_project=false;
       if(this.salesman_name!=userInfo.data.salesman_name)
       { isChange_salesman=true}
        if(this.projects!=userInfo.data.projects)
        { isChange_project=true}

        axios.post('/wechat/salesman/modifyCustomer', {
          user_id:this.user_id,
          isChange_salesman:true,
          isChange_project:true,
          name: this.name,
          sex:this.sex,
          tel:this.tel,
          IDNo:this.IDNo,
          projects:this.projects,
          salesman_name:this.salesman_name
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (response) {
            console.log(response);
          });

      }
    }
  }
</script>
<style>
  .addBlank{
    height:2.2rem;
  }

  .modifycustomer{
    height: 31.15rem;
    overflow-y: scroll;
  }
  .modifyCustomer{
    width:100%;
    background:#fff ;
  }
  .modifyCustomer li{
    width:17.25rem;
    height:2.475rem;
    margin-left:0.75rem;
    border-bottom:1px solid #dcdcdc;
  }
  .modifyCustomer li.removeBorder{
    border:0;
  }
  .modifyCustomer li span{
    color:#333;
    line-height: 2.475rem;
    font-size:0.7rem;
  }
  .modifyCustomer li input{
    width:70%;
    height:100%;
    border:0;
  }
  .modifyCustomer li img{
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
    background: -webkit-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: -o-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: -ms-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: linear-gradient(top, #318ffe 0%,#1d69f0 100%)
  }
  .modifyOrChecked .checkedMsgBtn{
    color:#338fff;
    border:0.05rem solid #338fff;
    background: #fff;
  }
</style>
