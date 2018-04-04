<template>
  <div class="wechat_bg wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>
    <section class="main mainPosition mainLogin">
      <form  name="phoneForm">
        <div class="retrievalBox">
          <div class="clearfix addTopBorder">
            <em class="fl"><img src="/static/img/wechatLogin/photo.png" alt=""></em>
            <input type="text" id="phone" class="fl getcode" name="pnone" placeholder="请输入手机号" v-model="phone" v-on:blur="ValidatePhone" v-on:focus="ValidatePasswd2">
            <a href="javascript:;" class="getCode fr" @click="GetCode">{{code_label}}</a>
          </div>
          <div class="clearfix  ">
            <em class="fl"><img src="/static/img/wechatLogin/photo.png" alt=""></em>
            <input type="text" id="passwordPhone" class="fl" name="passwordPhone" placeholder="请输入短信验证码" v-model="code">
          </div>
          <div class="clearfix ">
            <em class="fl"><img src="/static/img/wechatLogin/megs.png" alt=""></em>
            <input type="password"  class="fl" name="" placeholder="设置密码" v-model="pwd" v-on:blur="ValidatePasswd" v-on:focus="ValidatePasswd2">
          </div>
          <div class="clearfix">
            <em class="fl"><img src="/static/img/wechatLogin/megs.png" alt=""></em>
            <input type="password" class="fl" name="" placeholder="再次输入密码" v-model="pwd2" v-on:blur="compare" v-on:focus="ValidatePasswd2">
          </div>
          <ul class="clearfix">
            <li class="fl tap">{{msg}}</li>
            <li class="fr format">6-12位数字,字母,下划线</li>
          </ul>
        </div>

        <div class="btnBox">
          <div class="loginBtnBox"><input type="button" name="phoneLogin" value="注册" class="login" v-on:click="onSubmit"></div>
        </div>
      </form>
    </section>
    <alertTiming ref="alertTiming1" :content="alertContent">  </alertTiming>
  </div>
</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import Vue from 'vue'
  import axios from 'axios'
  import {mapState,mapMutations} from 'vuex'
  import alertTiming from '../alertTiming';

  let AliyunSmsUtil =require('../../util/AliyunSmsUtil.js')
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"护士注册",
        pwd:'',
        pwd2:'',
        msg:'',
        phone:'',
       code_label:'获取验证码',
       alertContent:'',
       isPwdok:false,
       isPhoneok:false,
       code:'',
       code2:'1606'


      }
    },
    mounted:function(){

    },
    created:function(){
    },
    components:{
      headerpart,
      alertTiming
    },
    methods:{
      ...mapMutations([
        'RECORD_NURSEINFO'
      ]),
        GetCode(){
            let vm=this;

            if(vm.code_label=="重新获取验证码" ||vm.code_label=="获取验证码")
            {
                let data = {};
                data.phone =vm.phone;
                data.TemplateCode = "SMS_75990306";
                let value=Math.ceil((Math.random() * 10000));
                if(value<1000) {value=value+1000;}
                vm.code2 = value.toString()
                let product = "e晟宝"
                data.TemplateParam = "{\"code\":\"" + vm.code2 + "\",\"product\":\"" + product + "\"}";
                console.log("data:",data);
                AliyunSmsUtil.send(data);
                let i=60;
                let sh=setInterval(function(){
                       vm.code_label='剩余'+i+'秒';
                       i=i-1;
                       if(i==0) { vm.code_label="重新获取验证码";
                          // vm.code2='1606'
                         clearInterval(sh);}
                        },1000);
            }

//
//            let promise = new Promise(function(resolve, reject){
//                setTimeout(function(){
//                    console.log("time1")
//                    resolve();
//                },1000);
//           });
//
//            promise.then(function(value){
//                setTimeout(function(){
//                    console.log("timeout2",value);
//
//                }, 1000);
//            }).catch(function(error){
//                console.error(error);
//            }).then(function(value){
//                setTimeout(function(){
//                    console.log("timeout3");
//                    //resolve();
//                }, 1000);
//            }).catch(function(error){
//                console.error(error);
//            });
//
//
//            let promise = new Promise(function(resolve, reject)
//            { if (/* 异步操作成功 */)
//               { resolve(value); }
//               else { reject(error); } });
//            promise.then(function(value)
//                { // success }, function(value) { // failure });
//
//




        },


  compare(){
        if(this.pwd!=this.pwd2){
          this.msg="两次密码不一致！";
            this.isPwdok=false;
        }
      },
      ValidatePasswd(){
        if( /^(\w){6,12}$/.test(this.pwd))
        {
          this.msg="";
          this.isPwdok=true;
        }else{
          this.msg="密码格式不正确！"
           this.isPwdok=false;
        }

      },
      ValidatePasswd2(){
        this.msg=""
      },
      ValidatePhone(){
        if( !(/^1[0-9]{10}$/.test(this.phone))){
          this.msg="手机号码格式不对!";
            this.isPhoneok=false;
        }
        else {this.isPhoneok=true;}
      },
      onSubmit(){
        let vm=this;
        if(this.isPwdok==false || this.isPhoneok==false) {
            vm.alertContent =this.msg ;
            vm.$refs.alertTiming1.Show();
            return;
        }
        if(this.code!=this.code2) {
            vm.alertContent = "验证码不正确！";
            vm.$refs.alertTiming1.Show();
            return;
        }

      axios.post('/wechat/nurse/regist', {
      userName:this.phone,
      passwd:this.pwd,
      tel:this.phone
    })
      .then(function (response) {
        console.log(response);
        if(response.data.result=='00')
        {
            vm.RECORD_NURSEINFO(vm.phone);
            vm.$router.push('/nurse/registNext');
         }
        else if(response.data.result=='10')

          vm.alertContent = "用户已存在";
          vm.$refs.alertTiming1.Show();
      })
      .catch(function (response) {
        console.log(response);
      });
  }
    }
  }
</script>
<style>
  .main input::placeholder{
    text-align: left;
    color:#ccc;
  }
  .main{
    background: #fff;
  }
  .retrievalBox{
    width:15.5rem;
    margin:0 auto;
  }
  .retrievalBox div{
    border-bottom:1px solid #dadada;
  }
  .retrievalBox input{
    /*color: #d8d8d8;*/
    font-size:0.7rem;
    width:90%;
    height:2.25rem;
    border:0;
    text-indent:0.5rem;
    color:#000;
  }
  .retrievalBox input.getcode{
    width:50%;
  }
  .retrievalBox em{
    width:1rem;
    height:1rem;
    margin-top:0.3rem;
    line-height:2.25rem;
  }
  .retrievalBox em img{
    width:1rem;
    height:1rem;
  }
  .tap{
    color:#e90001;
    font-size:0.45rem;
  }
  .format{
    color:#338fff;
    margin-top:0.25rem;
  }
  .getCode{
    margin-top:0.5rem;
    height:1.5rem;
    text-align: center;
    line-height: 1.5rem;
    width:5rem;
    border-radius:0.125rem;
    border-color:#1b7ff1;
    background: #338fff;
    color:#fff;
  }
  .loginBtnBox{
    width:16.6rem;
    height:2.25rem;
    margin: 0 auto;
  }
  .login{
    width:16.6rem;
    height:2.25rem;
    display: block;
    font-size:1rem;
    border-radius: 0.125rem;
    border:0;
    color:#fff;
    margin-top:2.5rem;
    text-align: center;
    background: #338fff;
  }
</style>


















