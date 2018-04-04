<template>
  <section class="wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>

    <section class="customerDetail">
      <div class="addBlank"></div>
      <div class="companyName">中国人寿扬州分公司</div>
      <form action="" method="post">
        <ul class="addCustomer">
          <li class="clearfix" >
            <span class="checkName fl">体检套餐</span>
            <input type="text" name="medicalPkg" class="fr" v-model="projects">
          </li>
          <li class="clearfix" >

            <span class="checkName fl">检测时间</span>
            <input type="text" name="detectionTime" class="fr" v-model="activity_time">
          </li>
          <li class="clearfix">
            <span class="checkName fl">活动地点</span>
            <input type="text" name="address" class="fr" v-model="address">
          </li>
          <li class="clearfix">
            <span class="checkName fl">姓名</span>
            <input type="text" name="name" class="fr" v-model="name">
          </li>
          <li class="clearfix">
            <span class="checkName fl">性别</span>
            <input type="text" name="salesmanTel" class="fr" v-model="sex">
          </li>
          <li class="clearfix">
            <span class="checkName fl">身份证号</span>
            <input type="text" name="id" class="fr" v-model="IDNo">
          </li>
          <li class="clearfix">
            <span class="checkName fl">联系电话</span>
            <input type="text" name="tel" class="fr" v-model="tel">
          </li>
          <li class="clearfix">
            <span class="checkName fl">业务员工号</span>
            <input type="text" name="salesman" class="fr" v-model="userInfo.id">
          </li>
          <li class="clearfix">
            <span class="checkName fl">业务员姓名</span>
            <input type="text" name="id" class="fr" v-model="userInfo.name">
          </li>
          <li class="clearfix removeBorder">
            <span class="checkName fl">业务员联系电话</span>
            <input type="text" name="salesmanTel" class="fr" v-model="userInfo.tel">
          </li>
        </ul>
        <div class="modifyOrChecked">
          <a href="/wechat/salesman/modifyCustomer" class="modifyMsgBtn">信息修改</a>
          <a href="/wechat/salesman/siteActitvity" class="checkedMsgBtn">信息核对无误</a>
        </div>
      </form>
    </section>
    <!--标题结束-->
  </section>
</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import {mapState,mapMutations} from 'vuex'
  import Vue from 'vue'
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"客户信息填详情",

        projects:[],
        activity_time:'',
        address:'',
        name:'',
        sex:'',
        IDNo:'',
        tel:''
      }
    },
    mounted:function(){
    },
    created:function(){
//          GetTodayActivity();
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    components:{
      headerpart,
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
