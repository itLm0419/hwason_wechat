<template>
  <div class="wechat_bg wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>
    <section class="main">
      <div class="addBlank"></div>
      <form action="" name="phoneForm">
        <div class="retrievalBox">
          <div class="clearfix">
            <em class="fl"><img src="/static/img/wechatLogin/user.png" alt=""></em>
            <input type="text" id="passwordPhone" class="fl" name="passwordPhone" placeholder="用户名" v-model="userName">
          </div>
          <div class="clearfix ">
            <em class="fl"><img src="/static/img/wechatLogin/megs.png" alt=""></em>
            <input type="password"  class="fl" name="" placeholder="原始密码"  v-model="pwd0" v-on:blur="ValidatePasswd0" v-on:focus="ValidatePasswd2">
          </div>
          <div class="clearfix">
            <em class="fl"><img src="/static/img/wechatLogin/megs.png" alt="" ></em>
            <input type="password" class="fl" name="" placeholder="更新密码" v-model="pwd" v-on:blur="ValidatePasswd" v-on:focus="ValidatePasswd2">
          </div>
          <div class="clearfix">
            <em class="fl"><img src="/static/img/wechatLogin/megs.png" alt=""  ></em>
            <input type="password" class="fl" name="" placeholder="确定更新密码" v-model="pwd2" v-on:blur="compare" v-on:focus="ValidatePasswd2" >
          </div>
          <ul class="clearfix">
            <li class="fl tap">{{msg}}</li>
            <li class="fr Format">6-12位数字,字母,下划线</li>
          </ul>
        </div>
      </form>
      <div class="btnBox">
        <a href="javascript:;" class="modifyPwd" @click="onSubmit">确定修改</a>
      </div>
    </section>

    <alertTiming ref="alertTiming1" :content="alertContent">  </alertTiming>
  </div>
</template>
<script>
import headerpart from '../company/wechat/headerpart';
import Vue from 'vue'
import axios from 'axios'
import alertTiming from '../alertTiming';
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"修改密码",
          pwd0:'',
          pwd:'',
          pwd2:'',
          msg:'',
          userName:'',
          alertContent:'',
          isUser:false,
          isPasswd:false
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
        compare(){
              if(this.pwd!=this.pwd2){
                //  this.msg="两次密码不一致！";
                  this.alertContent="两次密码不一致！";
                  this.$refs.alertTiming1.Show();
                  this.isPasswd=false;
              }
              else {
                  this.isPasswd=true;
              }
          },
          ValidatePasswd0(){
              if( /^(\w){6,12}$/.test(this.pwd0))
              {
                  this.msg="";
                  let vm = this;
                  axios.get('/wechat/login/originalpasswd', {params: {userName: this.userName, password: this.pwd0}})
                      .then(function (response) {
                          console.log("response：")
                          console.log(response.data)
                          if(response.data.result !='00') {
                             // vm.msg=response.data.name;
                              vm.alertContent=response.data.name;
                              vm.$refs.alertTiming1.Show();
                              vm.isUser=false;

                          }else
                          {
                              vm.isUser=true;
                          }


                      })
                      .catch(function (response) {
                          console.log("error response：")
                          console.log(response);
                      })
              }else{
                  //this.msg="密码格式不正确！"
                  this.alertContent="密码格式不正确！";
                  this.$refs.alertTiming1.Show();
              }

          },
        ValidatePasswd(){
            if( /^(\w){6,12}$/.test(this.pwd))
            {
                this.msg="";
            }else{
               // this.msg="密码格式不正确！"
                this.alertContent="密码格式不正确！";
                this.$refs.alertTiming1.Show();
            }
        },
          ValidatePasswd2(){
              this.msg="";

          },

          onSubmit(){
              let vm=this;
              if(!vm.isUser)
              {
                  vm.alertContent="用户名或原始密码不正确";
                  vm.$refs.alertTiming1.Show();
                  return;
              }
              if(!vm.isPasswd)
              {
                  vm.alertContent="两次输入密码不一致";
                  vm.$refs.alertTiming1.Show();
                  return;
              }

             axios.post('/wechat/login/changepasswd',
                  {userName: this.userName,
                      password:this.pwd2}
              )
                  .then(function (response) {

                      if(response.data.result =='00') {
                          vm.alertContent="密码修改成功";
                          vm.$refs.alertTiming1.Show();
                          setTimeout(function(){
                              vm.$router.push('/login');
                          },1000);

                      }
                      else {
                          vm.alertContent=response.data.name;
                          vm.$refs.alertTiming1.Show();
                      }


                  })
                  .catch(function (response) {
                      console.log(response);
                  });
          }
      },

  }
</script>
<style>
  .retrievalBox{
    width:15.5rem;
    margin:0 auto;
    padding-bottom:0.5rem;
  }
  .retrievalBox div{
    border-bottom:1px solid #dadada;
  }
  .retrievalBox input{
    color: #000;
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
.Format{
  color:#338fff;
}
  .btnBox .modifyPwd{
    margin:0 auto;
    width:16.6rem;
    height:2.25rem;
    text-align: center;
    line-height: 2.25rem;
    font-size:1rem;
    border-radius: 0.125rem;
    display: block;
    color:#fff;
    margin-top:1rem;
    background: #338fff;
  }
</style>


















