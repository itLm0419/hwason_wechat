
<template>
  <div class="wechat_bg wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0" :edit="edit0"></headerpart>
    <!--注册开始-->
    <section class="main mainLogin mainPosition">
      <div class="addBlank"></div>
      <!--<form >-->
        <div :class="tmpClass" :style="styleObject" >
          <div class="clearfix user addTopBorder">
            <em class="fl"><img src="/static/img/wechatLogin/user.png" alt=""></em>
            <input type="text" id="user" class="fl" name="userName" placeholder="帐户名" v-model="accountName">
          </div>
          <div class="clearfix password">
            <em class="fl"><img src="/static/img/wechatLogin/megs.png" alt=""></em>
            <input type="password" id="password" class="fl passw" name="password" placeholder="密码" v-model="passwd" v-on:blur="ValidatePasswd" v-on:focus="ValidatePasswd2">
            <em class="fl"><img src="/static/img/wechatLogin/passIcon.png" v-show="isShowPassIcon" alt=""></em>
          </div>
          <ul class="clearfix">
            <li class="fl tap">{{msg}}</li>
            <li class="fr loginMention">6-12位数字、字母、下划线</li>
          </ul>
          <div class="remPassBox clearfix">
            <a href="javascript:;" class="remBtn fl" v-on:click="SavePasswd">
              <img v-bind:src="choicePic" alt="" >
            </a>
            <span class="remFont fl" >记住密码</span>
          </div>
        </div>

        <div class="btnBox">
          <div class="loginIndex">
            <a href="javascript:;" v-on:click="onSubmit">登录</a>
          </div>
          <div class="clearfix">
            <span class="phoneBtn fr"  v-on:click="ForgotPasswd">忘记密码？</span>
            <span class="phoneBtn fr"  v-on:click="ChangePasswd">修改密码？</span>
          </div>
        </div>

      <section class="nurseLogin">
        <ul class="clearfix">
          <li class="fr nurse">
            <em @click="GotoNurse">
              <img src="/static/img/wechatLogin/nurse.png" class="nurseIcon" alt="护士logo" >
              <span class="nurseFont">护士注册</span>
            </em>
          </li>
        </ul>
      </section>
    </section>
    <!--注册结束-->
    <alertTiming ref="alertTiming1" :content="alertContent">  </alertTiming>
  </div>
</template>
<script>
  import alertTiming from '../alertTiming';
  import headerpart from '../company/wechat/headerpart';
  import Vue from 'vue'
  import axios from 'axios'
  import util from '../../util/util.js'
  import {mapState,mapMutations} from 'vuex'
 // import AliyunSMSUtil from '../../util/AliyunSmsUtil.js'
 // let AliyunSmsUtil = require('../../util/AliyunSmsUtil.js')
  export default {
    data(){
        return {
            imgaddr0: "/static/img/home.png",
            title0:"登  录",
            edit0:"",
            isShowPassIcon:false,
            accountName:'',
            passwd:'',
            isSave: false,
            choicePic:"/static/img/wechatLogin/noChoiceIcon.png",
            msg:'',
            alertContent:'',
            tmpClass:'regBox',
            tmpClass1:'regBox1',
            styleObject:{
                transform:'translate(0,0)',
            },
        }
    },
    mounted:function(){
        let accountName=this.getCookie("accountName");
        if(accountName !=null) this.accountName=accountName;
        console.log('accountName',accountName)
        let pwd= this.getCookie("pwd");
        if(pwd !=null)  this.passwd=pwd;
        this.SavePasswd();
    },
    created:function(){


    },
    components:{
      headerpart,
      alertTiming
    },
    methods:{
      ...mapMutations('RECORD_NURSEINFO', 'RECORD_COMPANYINFO'),
      getCookie(name){
          var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
          if(arr=document.cookie.match(reg))
              return unescape(arr[2]);
          else
              return null;
     },
      GotoNurse(){
        this.$router.push('/nurse/regist')

      },
      ForgotPasswd(){
       this.$router.push('/wechat/retrievalPwd')
      },
      ChangePasswd(){
            this.$router.push('/wechat/modifyPwd')
        },
      SavePasswd(){
          this.isSave = !this.isSave;
          console.log(this.isSave);
          if(this.isSave==false) {
            this.choicePic = "/static/img/wechatLogin/noChoiceIcon.png"
          }
          else {
            this.choicePic = "/static/img/wechatLogin/choiceIcon.png"
          }

      },
      ValidatePasswd(){
        if( /^(\w){6,12}$/.test(this.passwd)){
            this.msg="";
            this.isShowPassIcon=true;
        }else{
            this.msg="密码格式不正确！"
        }
        let Y=100,mT=1;
//        console.log("width",document.documentElement.clientWidth)
//          this.styleObject.transform  = "translate(-"+document.documentElement.clientWidth+"px,0)";
//          this.styleObject.transition  = "all "+mT+"s linear";
      },
      ValidatePasswd2(){
         this.msg=""
         },
      onSubmit(){
        var vm=this;
         axios.post('/wechat/login', {
            userName: this.accountName,
            password: this.passwd
         })
            .then(function (response) {
                if(response.data.hasOwnProperty("role"))
                {
                    if(vm.isSave){
                        let validity = 30;
                        let now = new Date();
                        now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
                        document.cookie = "pwd=" + vm.passwd + ";expires=" + now.toGMTString();
                        document.cookie = "accountName=" + vm.accountName + ";expires=" + now.toGMTString();

                    }
                    if(vm.passwd =='888888' || vm.passwd=='123456') {
                        if(response.data.role=="01" ||response.data.role=="02")
                        {
                            let companyInfo={};
                            companyInfo.companyName=response.data.companyName;
                            companyInfo.organization_id=response.data.organization_id;
                            companyInfo.userName=vm.accountName;
                            companyInfo.role=response.data.role;

                            vm.RECORD_COMPANYINFO(companyInfo)

                            vm.$router.push('/wechat/modifyPwd_login');
                            return;

                        }

                    }

                }

              if(response.data.result !=null &&response.data.result !='10' ) {
                vm.alertContent=response.data.name;
                vm.$refs.alertTiming1.Show();
              }
              else if(response.data.role=="01")
              {

                 let companyInfo={};
                 companyInfo.companyName=response.data.companyName;
                 companyInfo.organization_id=response.data.organization_id;

                 vm.RECORD_COMPANYINFO(companyInfo)
                vm.$router.push('/company/activityinfo')

              }
              else if(response.data.role=="02")
              {
                let companyInfo={};
                companyInfo.companyName=response.data.companyName;
                companyInfo.organization_id=response.data.organization_id;
                console.log(companyInfo,7777777777)
                vm.RECORD_COMPANYINFO(companyInfo)
                vm.$router.push('/salesman/index')
              }
              else if(response.data.role=="31")
              {
                  if(response.data.result &&response.data.result=='10' )
                  {
                      vm.RECORD_NURSEINFO(response.data.tel);
                      vm.$router.push('/nurse/registNext')
                  }
                  else if(response.data.result &&response.data.result=='11')
                  {
                      vm.alertContent=response.data.name;
                      vm.$refs.alertTiming1.Show();
                  }

                  else
                //this.RECORD_NURSEINFO(vm.phone);
                vm.$router.push('/nurse/sampling')
              }

            })
            .catch(function (response) {
              console.log(response);
            });
        }


    }
  }
</script>
<style>
  .wrap{
    height:100%;
    display:-webkit-box;
    -webkit-box-orient:vertical;
  }
  .addBlank{
    height:2.2rem;
  }
  .wechat_bg{
    height:31.3rem;
    background: #fff;
  }
  .main input::placeholder{
   text-align: left;
 }
  .mainPosition{
    margin-top:2rem;
  }
 .main{
   background: #fff;
 }
  .main .regBox{
    width:15.5rem;
    margin: 0 auto;
  }
  .main .regBox1{
    position:absolute;
    left:400px;
    width:15.5rem;
    margin: 0 auto;
  }
  .main .regBox em{
    height: 1rem;
    width:1rem;
    margin-top:0.3rem;
    line-height: 2.25rem;
  }
  .main .regBox em img{
    width:1rem;
    height: 1rem;
  }
  .main .regBox input{
    /*color:#d8d8d8;*/
    font-size:0.7rem;
    border:none;
    height:98%;
    margin-left:0.5rem;
    width:80%;
    color:#000;
  }
 ::-webkit-input-placeholder{
    color:#d8d8d8;
  }

  .main .regBox .user,.main .regBox .password{
    height:2.25rem;
    border-bottom :1px solid #dadada;
  }
  .addTopBorder{
    border-top:1px solid #dadada;
  }
  .main  ul .tap{
    /*display: none;*/
    color:#e90001;
    font-size:0.45rem;
    margin-top: 0.275rem;
  }
  .main .regBox input.passw{
    width:82%;
  }
  .loginMention{
    color:#338fff;
    padding-top:0.15rem;
  }
  .remPassBox{
    margin-top:0.5rem;
  }
  .remPassBox .remBtn{
    height:0.7rem;
    width:0.7rem;
    border:none;
    margin-top:0.1rem;
  }
  .remPassBox .remBtn img{
    height:0.7rem;
    width:0.7rem;
    display: block;
  }
  .remPassBox .remFont{
    margin-left:0.3rem;
    color:#338fff;
  }
  .main .btnBox{
    width:16.6rem;
    margin:1.05rem auto 0;
  }
  .btnBox .loginIndex a{
    width:16.6rem;
    height:2.25rem;
    margin: 0 auto;
    font-size:1rem;
    border-radius: 0.125rem;
    display: block;
    text-align: center;
    line-height: 2.25rem;
    color:#fff;
    background: #338fff;

  }
  .btnBox .phoneBtn{
    width:15rem;
    margin:0.8rem 0.3rem 0 0 ;
    font-size:0.45rem;
    text-align: right;
    color:#328fff;
  }
  .nurseLogin {
    width:14.775rem;
    margin:8rem auto 0;
  }
  .nurseLogin em img{
    margin-left:1rem;
    height: 1.3rem;
    width: 0.95rem;
  }
  .nurseLogin .nurseFont{
    font-size:0.75rem;
    color:#338fff;
    display: block;
  }
  .rotation{
    transform:translateX(-100%);
  }
</style>
