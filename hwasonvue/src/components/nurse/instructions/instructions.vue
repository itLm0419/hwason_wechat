<template>
  <!--标题开始-->
  <section class="wrap">
    <header>
      <div class="mianTitle">操作指南</div>
    </header>
    <section class="instruction">
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
      <!--标准化规范-->
      <div class="operationFont">标准化规范</div>
      <ul class="operaction">
        <li class="fl">
          <router-link to="/nurse/nurseProgress">
            <img src="/static/img/nurse/instructions/nurseoperaction.png" alt="">
            <div class="nurseOperaction">护士标准流程</div>
          </router-link>
        </li>
        <li class="fl">
          <router-link to="/nurse/samplingProgress">
            <img src="/static/img/nurse/instructions/bloodoperaction.png" alt="">
            <div class="nurseOperaction">采血标准流程</div>
          </router-link>
        </li>
      </ul>
      <!--现场准备篇-->
      <div class="operationFont">现场准备篇</div>
      <ul class="clearfix sitePreparation">
        <li class="fl">
          <router-link to="/nurse/attention">
            <img src="/static/img/nurse/instructions/note.png" alt="">
            <div class="nurseOperaction">注意事项</div>
          </router-link>
        </li>
        <li class="fl">
          <router-link to="/nurse/preparation">
            <img src="/static/img/nurse/instructions/preparation.png" alt="">
            <div class="nurseOperaction">准备步骤</div>
          </router-link>
        </li>
        <li class="fl">
          <router-link to="/nurse/live">
            <img src="/static/img/nurse/instructions/livestep.png" alt="">
            <div class="nurseOperaction">现场步骤</div>
          </router-link>
        </li>
        <li class="fl">
          <router-link to="/nurse/collection">
            <img src="/static/img/nurse/instructions/collection.png" alt="">
            <div class="nurseOperaction">样本采集</div>
          </router-link>
        </li>
        <li class="fl">
          <router-link to="/nurse/centrifugal">
            <img src="/static/img/nurse/instructions/centrifugal.png" alt="">
            <div class="nurseOperaction">样本离心</div>
          </router-link>
        </li>
        <li class="fl">
          <router-link to="/nurse/packing">
            <img src="/static/img/nurse/instructions/packing.png" alt="">
            <div class="nurseOperaction">表本包装</div>
          </router-link>
        </li>
      </ul>
    </section>
      <footerpart></footerpart>
  </section>
</template>
  <script>
      import headerpart from '../../company/wechat/headerpart';
      import footerpart from '../footerpart';
      import Vue from 'vue'
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
            imgaddr0: "/static/img/home.png",
            title0:"操作指南"
          }
        },
        mounted:function(){
          eventprocess2()
        },
        created:function(){
//          GetTodayActivity();
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
          headerpart,
          footerpart
        }

      }
  </script>
  <style>
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
      height:1rem;
      width: 100%;
      background: #000;
      opacity: 0.4;
      filter:alpha(opacity:40);
      position: absolute;
      left:0;
      bottom:0;
    }
    .opc_con{
      width:100%;
      position: absolute;
      left:0;
      bottom:0;
      color:#fdfeff;
      font-size:0.75rem;
      line-height:1rem;
      text-align: left;
      text-indent:0.8rem;
    }*/
    #banner ol{
      position:absolute;
      left:50%;
      bottom:0;
      width:4rem;
      margin-left:-2rem;
    }
    #banner ol li{
      float:left;
      width:0.375rem;
      height:0.375rem;
      margin:0 0.275rem;
      background:#ccc;
      border-radius:50%;
      text-indent:-99999rem;
    }
    #banner ol li.active{
      background:#338fff;
    }
    .operationFont{
      height:1.5rem;
      color:#338fff;
      margin-left:1.25rem;
      font-size:0.7rem;
      line-height: 1.5rem;
    }
    /*.scrollmycenter{
      height:26.7rem;
      overflow-y: auto;
    }*/
    .instruction{
      margin-top:2.22rem;
    }
    .operaction{
      background: #fff;
      height:4.3rem;
    }
    .operaction li{
      width:50%;
      height:100%;
      text-align: center;
    }
    .operaction li a{
      width:50%;
      display: block;
      margin: 0.65rem auto 0;
    }
    .operaction li a img,.sitePreparation li a img{
      height: 2.2rem;
      width:2.2rem;
    }
    .sitePreparation{
      background: #fff;
      height: 8.75rem;
      margin-bottom:2.45rem;
    }
    .sitePreparation li{
      width:33.33%;
      height:50%;
      text-align: center;
    }
    .sitePreparation li a{
      display: block;
      margin: 0.65rem auto 0;
    }
  </style>

