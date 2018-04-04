<template>
  <div class="wechat_bg wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>
    <section class="main">
      <div class="addBlank"></div>
      <form >
        <div class="retrievalBox">
          <div class="clearfix">
            <em class="fl"><img src="/static/img/wechatLogin/photo.png" alt=""></em>
            <input type="text" id="phone" class="fl getcode" name="pnone" placeholder="请输入登记手机号" v-model="phone" v-on:blur="ValidatePhone" v-on:focus="ValidatePasswd2">
            <a href="javascript:;" class="getCode fr" @click="GetCode">{{code_label}}</a>
          </div>
          <div class="clearfix">
            <em class="fl"><img src="/static/img/wechatLogin/photo.png" alt=""></em>
            <input type="text" id="passwordPhone" class="fl" name="passwordPhone" placeholder="请输入短信验证码" v-model="code2">
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
         <!--<input type="button" name="phoneLogin" value="修改密码"  class="login" v-on:click="onSubmit">-->
          <a href="javascript:;" class="login" v-on:click="onSubmit">修改密码</a>
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
import alertTiming from '../alertTiming';
let AliyunSmsUtil =require('../../util/AliyunSmsUtil.js')
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"忘记密码",
        pwd:'',
        pwd2:'',
        msg:'',
        phone:'',
        code_label:'获取验证码',
        code:'1606',
        code2:'',
        alertContent:'',
        isPasswd:false

      }
    },
    methods:{
      GetCode(){
          let vm=this;

         axios.get('/wechat/login/forgetpasswd', { params:{tel: this.phone}}
          )
              .then(function (response) {
                  if(response.data.result =='00') {
                      let data = {};
                      data.phone =vm.phone;
                      data.TemplateCode = "SMS_75990306";
                      let value=Math.ceil((Math.random() * 10000));
                      if(value<1000) {value=value+1000;}
                      vm.code = value.toString()
                      let product = "e晟宝"
                      data.TemplateParam = "{\"code\":\"" + vm.code + "\",\"product\":\"" + product + "\"}";
                      AliyunSmsUtil.send(data);

                      let i=60;
                      let sh=setInterval(function(){
                          vm.code_label='剩余'+i+'秒';
                          i=i-1;
                          if(i==0) { vm.code_label="重新获取验证码";
                              vm.code='1606'
                              clearInterval(sh);}
                      },1000);
                  }
                  else {
                      this.msg="手机号码没有注册"
                  }
              })
              .catch(function (response) {
                  console.log(response);
              });

        },
      compare(){
        if(this.pwd!=this.pwd2){
            //this.msg="两次密码不一致！";
            this.alertContent="两次密码不一致！";
            this.$refs.alertTiming1.Show();
            this.isPasswd=false;
        }
        else {
            this.isPasswd=true;
        }
      },
      ValidatePasswd(){

        if( /^(\w){6,12}$/.test(this.pwd))
        {
          this.msg="";

        }else{
          this.msg="密码格式不正确！"
        }

      },
      ValidatePasswd2(){
        this.msg="";

      },
      ValidatePhone(){

          if( !(/^1[0-9]{10}$/.test(this.phone))){
              this.msg="手机号码格式不对!"
          }
      },
      onSubmit(){
          let vm=this;
          if(this.code !=this.code2){
              vm.alertContent="验证码不正确";
              vm.$refs.alertTiming1.Show();
              return;
          }

          if(!vm.isPasswd){4
              vm.alertContent="两次密码不一致";
              vm.$refs.alertTiming1.Show();
              return;
          }

          axios.post('/wechat/login/changepasswd2',
              {tel: this.phone,
               password:this.pwd}
          )
              .then(function (response) {

                  if(response.data.result =='00') {
                      vm.alertContent="新密码设定成功";
                      vm.$refs.alertTiming1.Show();

                  }
                  else{
                      vm.alertContent=response.data.name;
                      vm.$refs.alertTiming1.Show();
                  }


              })
              .catch(function (response) {
                  console.log(response);
              });
      }
    },
    mounted:function(){

    },
    created:function(){
    },
    components:{
      headerpart,
      alertTiming
    }
  }
</script>
<style>
  .wechat_bg{
    /*height:33.3rem;*/
    background: #fff;
  }
  .retrievalBox{
    width:15.5rem;
    margin:0 auto;
  }
  .retrievalBox div{
    border-bottom:1px solid #dadada;
  }
  ::-webkit-input-placeholder{
    color:#d8d8d8;
  }
  .retrievalBox input{
    color:#000;
    font-size:0.7rem;
    width:90%;
    height:2.25rem;
    border:0;
    text-indent:0.5rem;
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
  .login{
    display: block;
    height:2.15rem;
    width:17.25rem;
    margin:1rem  auto 0;
    font-size:0.8rem;
    border-radius:0.125rem;
    background: #338fff;
    color:#fff;
    text-align: center;
    line-height: 2.15rem;
  }
</style>



















