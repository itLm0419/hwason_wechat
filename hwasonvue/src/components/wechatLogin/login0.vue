<template class="">
  <div class="wechat_bg wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0" :edit="edit0"></headerpart>
    <!--注册开始-->
    <section class="main mainLogin mainPosition">
      <!--<form >-->
        <div class="regBox">
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
            <li class="fr loginMention">6-12位数字、字母、下划线test7</li>
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
            <!--<input type="button" name="login"  value="登录" >-->
            <a href="javascript:;" v-on:click="onSubmit">登录</a>
          </div>
          <div class="clearfix">
            <span class="phoneBtn fr"  v-on:click="ForgotPasswd">忘记密码？</span>
            <!--<a href="/wechat/retrievalPwd" class="phoneBtn fr" >忘记密码？</a>-->
          </div>
        </div>
      <!--</form>-->
      <section class="nurseLogin">
        <ul class="clearfix">
          <li class="fr nurse">
            <em @click="GotoNurse">
              <img src="/static/img/wechatLogin/nurse.png" class="nurseIcon" alt="护士logo" >
              <div class="nurseFont">护士注册</div>
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
 // let AliyunSmsUtil =require('../../util/AliyunSmsUtil.js')




  export default {
    data(){
      return {
        imgaddr0: "/static/img/home.png",
        title0:"登录",
        edit0:"注册",
         isShowPassIcon:false,
         accountName:'',
         passwd:'',
         isSave: false,
         choicePic:"/static/img/wechatLogin/noChoiceIcon.png",
         msg:'',
        alertContent:''
      }

    },
    mounted:function(){

        let accountName=this.getCookie("accountName")
        if(accountName !=null) this.accountName=accountName;
        let pwd= this.getCookie("pwd");
        if(pwd !=null)  this.passwd=pwd;
        this.SavePasswd();

//        if(accountName !=null && pwd !=null) {
//            this.onSubmit();
//
//        }




    },
    created:function(){


    },
    components:{
      headerpart,
      alertTiming
    },
    methods:{
      ...mapMutations([
        'RECORD_NURSEINFO',
        'RECORD_COMPANYINFO',
      ]),
        getCookie(name)
  {
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
      SavePasswd(){
          this.isSave = !this.isSave;
          console.log(this.isSave)
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
      },
      ValidatePasswd2(){
         this.msg=""
         },
      onSubmit(){
        var vm=this;
         axios.post('/all/login', {
            userName: this.accountName,
            password: this.passwd
          })
            .then(function (response) {
              console.log(response);


                if(response.data.hasOwnProperty("role"))
                {
                    if(vm.isSave){
                        console.log("save")
                        let validity = 30;
                        let now = new Date();
                        now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
                        document.cookie = "pwd=" + vm.passwd + ";expires=" + now.toGMTString();
                        document.cookie = "accountName=" + vm.accountName + ";expires=" + now.toGMTString();

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
                 console.log("companyInfo",companyInfo)
                vm.RECORD_COMPANYINFO(companyInfo)
                vm.$router.push('/salesman/index')
//
              }
              else if(response.data.role=="31")
              {
                  if(response.data.result &&response.data.result=='10' )
                  {
                      vm.RECORD_NURSEINFO(response.data.tel);
                      vm.$router.push('/nurse/registNext')
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
  .content{
    margin-top:2.22rem;
  }

  .wechat_bg{
    height:31.3rem;
    background: #fff;
  }
  .main input::placeholder{
   text-align: left;
 }
  .mainPosition{
    margin-top:4rem;
  }
 .main{
   background: #fff;
 }
  .main .regBox{
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
  }

</style>
