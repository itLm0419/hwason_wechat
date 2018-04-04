<template>
  <div>
    <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>
    <section class="main">
      <form action="" name="phoneForm">
        <div class="retrievalBox">
          <div class="clearfix">
            <em class="fl"><img src="/static/img/wechatLogin/photo.png" alt=""></em>
            <input type="text" id="phone" class="fl getcode" name="pnone" placeholder="请输入手机号">
            <a href="javascript:;" class="getCode fr">获取验证码</a>
          </div>
          <div class="clearfix  ">
            <em class="fl"><img src="/static/img/wechatLogin/photo.png" alt=""></em>
            <input type="text" id="passwordPhone" class="fl" name="passwordPhone" placeholder="请输入短信验证码">
          </div>
          <div class="clearfix ">
            <em class="fl"><img src="/static/img/wechatLogin/megs.png" alt=""></em>
            <input type="text"  class="fl" name="" placeholder="设置密码">
          </div>
          <div class="clearfix">
            <em class="fl"><img src="/static/img/wechatLogin/megs.png" alt=""></em>
            <input type="text" class="fl" name="" placeholder="再次输入密码">
          </div>
          <ul class="clearfix">
            <li class="fl tap">密码格式不正确！</li>
            <li class="fr format">6-12位数字,字母,下划线</li>
          </ul>
        </div>

        <div class="btnBox">
          <div class="login"><input type="submit" name="phoneLogin" value="登录"></div>
        </div>
      </form>
    </section>
  </div>
</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import Vue from 'vue'
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"护士注册"
      }
    },
    mounted:function(){

    },
    created:function(){
    },
    components:{
      headerpart
    }
  }
</script>
<style>
  .retrievalBox{
    width:15.5rem;
    margin:0 auto;
  }
  .retrievalBox div{
    border-bottom:1px solid #dadada;
  }
  .retrievalBox input{
    color: #d8d8d8;
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
</style>


















