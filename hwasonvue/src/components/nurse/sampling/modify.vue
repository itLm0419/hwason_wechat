<template>
  <section class="wrap">
    <!--<header>
      <ul class="clearfix">
        <li class="fl pre">
          <a href="/wechat/nurse/sampling/checkinfo">
            <img src="/static/img/nurse/return.png" alt="">
          </a>
        </li>
        <li class="fl loginFont">修改客户信息</li>
      </ul>
    </header>-->
    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>

    <section class="scrollModify">
      <div class="companyName">{{companyName}}</div>
      <form action="" method="post">
        <ul class="checkInfo">
          <li class="clearfix" >
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">姓名</span>
            <input type="text" name="checkName" class="fr" v-model="userName">
          </li>
          <li class="clearfix" >
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">性别</span>
            <input type="text" name="checkSex" class="fr" v-model="sex">
          </li>
          <li class="clearfix" >
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">身份证号</span>
            <input type="text" name="checkId" class="fr" v-model="IDNo">
          </li>
          <li class="clearfix removeBorder">
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">联系电话</span>
            <input type="text" name="checkTel" class="fr" v-model="tel">
          </li>
        </ul>
        <input type="button" value="完成" class="complete" v-on="onSubmit">
      </form>
    </section>
    <footerpart></footerpart>
  </section>
</template>
<script>
  import headerpart from '../../company/wechat/headerpart';
  import footerpart from '../footerpart';
  import Vue from 'vue'
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        companyName:'',
        title0:"修改客户信息",
        userName:userInfo.name,
        sex:userInfo.sex,
        IDNo:userInfo.IDNo,
        tel:userInfo.tel
      }
    },
    mounted:function(){
        this.companyName=this.companyInfo.companyName;
    },
    created:function(){
//          GetTodayActivity();
    },
    computed: {
      ...mapState([
        'userInfo',
        'companyInfo'
      ])
    },
    components:{
      headerpart,
      footerpart
    },
    methods:{
      ...mapMutations([
        'RECORD_USERINFO'
      ]),
      onSubmit(){

        let userInfo={
          name:this.userName,
          sex: this.sex,
          IDNo:this.IDNo,
          tel: this.tel
        }
        this.RECORD_USERINFO(userInfo);
        this.$router.push('/nurse/checkinfo')
      }
    }
  }
</script>
<style>
  .scrollModify{
    height:28.7rem;
    overflow-y: scroll;
  }
  .checkInfo{
    width:100%;
    height: 15rem;
    background: #fff;
  }
  .checkInfo li{
    width:17.25rem;
    height:2.475rem;
    margin-left:0.75rem;
    border-bottom:1px solid #dcdcdc;
  }
  .checkInfo li.removeBorder{
    border:0;
  }
  .checkInfo li span{
    color:#333;
    line-height: 2.475rem;
    font-size:0.7rem;
  }
  .checkInfo li input{
    width:78%;
    height:100%;
    border:0;
  }
  .checkInfo li img{
    height: 0.45rem;
    width: 0.45rem;
    margin: 1rem 0.2rem 0 0
  }
  .scan,.checkInfo .scan a{
    width:100%;
    height:2.5rem;
    background: #fff;
  }
  .scan a{
    display: block;
    color:#333;
    font-size:0.7rem;
    line-height: 2.5rem;
    text-indent: 0.73rem;
  }
  .noteMsg{
    width: 17.25rem;
    height:2.5rem;
    color:#cd3939;
    /*line-height: 2.5rem;*/
    text-indent: 0.65rem;
  }

  .complete{
    border:0;
    background: #338fff;
    color:#fff;
    font-size:0.7rem;
    position:absolute;
    top:0.6rem;
    right:1.2rem;
  }
  .btn{
    width:16.65rem;
    height:2.25rem;
    display: block;
    color: #ffffff;
    font-size:1rem;
    border:0;
    margin:4rem auto 0;
    background: #d9d9d9;
  }
  .brightBtn{
    background: -webkit-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: -o-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: -ms-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: linear-gradient(top, #318ffe 0%,#1d69f0 100%)
  }

</style>
