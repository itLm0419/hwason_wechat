<template>
  <section class="wrap" >
    <header>
      <div class="mianTitle" v-model="companyName">{{companyName}}</div>
    </header>
    <section>
      <div class="addBlank"></div>
      <!--轮播图开始-->
      <section id="banner">
        <ul class="clearfix">
          <li class="bgContent">
            <a href="javascript:;" @click="ClickAdv4" >
              <img src="/static/img/company/wechat/activityinfo/banner_4.png" alt="" style="width: 18.75rem;height: 8.35rem;">
              <!-- <div class="opac">&lt;!&ndash;透明层&ndash;&gt;</div>
               <div class="opc_con">PD肺部疾病专项检测</div>-->
            </a>
          </li>
          <li class="bgContent">
            <a href="javascript:;" @click="ClickAdv1">
              <img src="/static/img/company/wechat/activityinfo/banner_1.png" alt="" style="width: 18.75rem;height: 8.35rem;">
              <!--<div class="opac"></div>
              <div class="opc_con">E晟卡</div>-->
            </a>
          </li>
          <li class="bgContent">
            <a href="javascript:;" @click="ClickAdv2">
              <img src="/static/img/company/wechat/activityinfo/banner_2.png" alt="" style="width: 18.75rem;height: 8.35rem;">
              <!--  <div class="opac"></div>
                <div class="opc_con">HC检测</div>-->
            </a>
          </li>
          <li class="bgContent">
            <a href="javascript:;" @click="ClickAdv3">
              <img src="/static/img/company/wechat/activityinfo/banner_3.png" alt="" style="width: 18.75rem;height: 8.35rem;">
              <!--  <div class="opac"></div>
                <div class="opc_con">HCG检测</div>-->
            </a>
          </li>
          <li class="bgContent">
            <a href="javascript:;" @click="ClickAdv4">
              <img src="/static/img/company/wechat/activityinfo/banner_4.png" alt="" style="width: 18.75rem;height: 8.35rem;">
              <!-- <div class="opac"></div>
               <div class="opc_con">PD肺部疾病专项检测</div>-->
            </a>
          </li>
          <li class="bgContent">
            <a href="javascript:;" @click="ClickAdv1">
              <img src="/static/img/company/wechat/activityinfo/banner_1.png" alt="" style="width: 18.75rem;height: 8.35rem;">
              <div class="opac"></div>
              <div class="opc_con">E晟卡</div>
            </a>
          </li>
        </ul>
        <ol>
          <li class="active"></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
      </section>
      <!--轮播图结束-->

      <!--选择入口-->
      <!--<div class="enterBox">
        <router-link class="activityBtn" to="/salesman/siteActivity">体检信息登记与修改</router-link>
        &lt;!&ndash;<router-link class="customerBtn" to="/customerMsg">客户信息管理</router-link>&ndash;&gt;
        <router-link class="activityBtn" to="/salesman/customerMsg">客户信息与样本跟踪</router-link>
      </div>-->

      <div class="salesmanEnter">
          <ul class="clearfix">
            <li class="fl rowLine"></li>
            <li class="fl blockDetail">检测专区</li>
            <li class="fl rowLine"></li>
          </ul>
          <ul class="clearfix">
              <li class="fl">
                <router-link tag="div" to="/salesman/siteActivity">
                <img src="../../../static/img/salesman/enter_01.png" alt="">
                <h6>体检信息登记</h6>
                </router-link>
              </li>
            <li class="fl colLine"></li>
            <li class="fl">
              <router-link tag="div" to="/salesman/customerMsg">
              <img src="../../../static/img/salesman/enter_02.png" alt="">
              <h6>客户信息管理</h6>
              </router-link>
            </li>
          </ul>
          <ul class="clearfix">
            <li class="fl rowLine2"></li>
            <li class="fl blockDetail">健康档案专区</li>
            <li class="fl rowLine2"></li>
          </ul>
          <ul class="clearfix">
            <li class="fl">
              <router-link tag="div" to="/salesman/salesmanBindLogin">
               <img src="../../../static/img/salesman/enter_03.png" alt="">
               <h6>新档案</h6>
              </router-link>
            </li>
            <li class="fl colLine"></li>
            <li class="fl">
              <router-link tag="div" to="/salesman/healthRec">
              <img src="../../../static/img/salesman/enter_04.png" alt="">
              <h6>健康档案管理</h6>
              </router-link>
            </li>
          </ul>
      </div>
    </section>
  </section>
</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import Vue from 'vue'
  import axios from 'axios'
  import {mapState,mapMutations} from 'vuex'
  function eventprocess2() {
      var oBanner = document.querySelector('#banner');
      var oUl = oBanner.children[0];
      var aLi = oUl.children;
      var oOl = oBanner.children[1];
      var aBtn = oOl.children;

      oUl.style.width = aLi[0].offsetWidth * aLi.length / Vue.prototype.rem+ 'rem';
      var bOk = false;
      var iNow = 1;
      var x = -iNow * aLi[0].offsetWidth / Vue.prototype.rem;
      oUl.addEventListener('touchstart', function (ev) {
          if (bOk)return;
          bOk = true;
          oUl.style.WebkitTransition = 'none';
          var oTouch = ev.targetTouches[0];
          var downX = oTouch.pageX / Vue.prototype.rem;
          var disX = downX - x;

          function fnMove(ev) {
              var oTouch = ev.targetTouches[0];
              x = oTouch.pageX / Vue.prototype.rem - disX;
              oUl.style.WebkitTransform = 'translate3d(' + x + 'rem,0,0)';
          }

          function fnEnd(ev) {
              document.removeEventListener('touchmove', fnMove, false);
              document.removeEventListener('touchend', fnEnd, false);

              var oTouch = ev.changedTouches[0];
              var upX = oTouch.pageX / Vue.prototype.rem;

              if (Math.abs(upX - downX) > 100 / Vue.prototype.rem) {
                  //判断iNow要++还是--
                  if (downX > upX) {
                      iNow++;
                  } else if (downX < upX) {
                      iNow--;
                  }
              }
              x = -iNow * aLi[0].offsetWidth / Vue.prototype.rem;

              oUl.style.WebkitTransition = '.5s all ease';

              oUl.style.WebkitTransform = 'translate3d(' + x + 'rem,0,0)';
              function tranEnd() {
                  oUl.removeEventListener('transitionend', tranEnd, false);
                  if (iNow == 0) {
                      iNow = aLi.length - 2;
                      oUl.style.WebkitTransition = 'none';
                      x = -iNow * aLi[0].offsetWidth / Vue.prototype.rem;
                      oUl.style.WebkitTransform = 'translate3d(' + x + 'rem,0,0)';
                  } else if (iNow == aLi.length - 1) {
                      iNow = 1;
                      oUl.style.WebkitTransition = 'none';
                      x = -iNow * aLi[0].offsetWidth / Vue.prototype.rem;
                      oUl.style.WebkitTransform = 'translate3d(' + x + 'rem,0,0)';
                  }

                  for (var i = 0; i < aBtn.length; i++) {
                      aBtn[i].classList.remove('active');
                  }
                  aBtn[iNow - 1].classList.add('active');
                  bOk = false;
              }

              oUl.addEventListener('transitionend', tranEnd, false);
          }

          document.addEventListener('touchmove', fnMove, false);
          document.addEventListener('touchend', fnEnd, false);
          ev.preventDefault();
      }, false);
  }
  export default {
    data(){
      return {
//        imgaddr0: "/static/img/home.png",
        companyName:""
      }
    },
    mounted:function(){
      this.companyName=this.companyInfo.companyName;
      eventprocess2()

    },
    created:function(){
    },
   computed: {
          ...mapState([
              'companyInfo'
          ])
      },
    methods:{
        ClickAdv1(){
            this.$router.push('/Advertise/ad1')
        },
        ClickAdv2(){
            this.$router.push('/Advertise/ad2')
        },
        ClickAdv3(){
            this.$router.push('/Advertise/ad3')
        },
        ClickAdv4(){
            this.$router.push('/Advertise/ad4')
        },
    },
    components:{
      headerpart
    }
  }
</script>
<style>
  .addBlank{
    height: 2.2rem;
    width:100%;
  }
  #wrap{
    background: #ebebeb;
  }
  #banner{
    width:18.75rem;
    height:8.875rem;
    position:relative;
    overflow:hidden;
  }
  #banner ul{
    position:absolute;
    left:0; top:0;
    -webkit-transform: translate3d(-18.75rem,0,0);
    overflow: hidden;
  }
  #banner ul li{
    width:18.75rem;
    height:8.35rem;
    text-align:center;
    font-size:2.5rem;
    float:left;
  }
  .bgContent{
    position: relative;
    height:8.35rem;
  }
  /*.opac{
    height:2rem;
    width: 100%;
    background: #000;
    opacity: 0.4;
    filter:alpha(opacity:40);
    position: absolute;
    left:0;
    bottom:0;
  }*/
  #banner ol{
    position:absolute;
    left:50%;
    bottom: -0.1rem;
    width:4rem;
    margin-left:-2rem;
  }
  #banner ol li{
    float:left;
    width:0.375rem;
    height:0.375rem;
    margin:0 0.275rem 0.1rem;
    background:#ccc;
    border-radius:50%;
    text-indent:-99999rem;
  }
  #banner ol li.active{
    background:#338fff;
  }
  .enterBox a{
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
  .enterBox .activityBtn{
    margin:2.7rem auto 0.9rem;
    background: #338fff;
  }
  .enterBox .customerBtn{
    color:#338fff;
    border:0.05rem solid #338fff;
    background: #fff;
  }
  .salesmanEnter{
    background: #fff;
    padding:0.9rem 2.22rem 0;
    margin-top:0.2rem;
  }
  .rowLine{
    width:4.425rem;
    background: #aaa;
    height: 1px;
    margin-top:0.5rem;
  }
  .rowLine2{
    width:3.9rem;
    background: #aaa;
    height: 1px;
    margin-top:0.5rem;
  }
  .colLine{
    height:5.7rem;
    background: #aaa;
    width: 1px;
    margin:0.75rem 2.4rem 0.9rem;
  }
  .blockDetail{
    color:#3c3c3c;
    font-size:0.825rem;
    padding:0 0.75rem;
  }
  li h6{
    color:#3c3c3c;
    text-align: center;
    line-height: 0.6rem;
    margin-top:0.45rem;
  }
  .salesmanEnter img{
    width:4.2rem;
    height: 4.2rem;
    margin:1rem 0 0 0;
  }
</style>
