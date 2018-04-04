<template>
  <section class="wrap">

    <!--<headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>-->
    <header>
      <div class="mianTitle">体检登记</div>
    </header>

    <section class="">
      <!--轮播图开始-->
      <div class="content2"></div>
      <section id="banner">
        <ul class="clearfix">
          <li class="bgContent">
            <a href="http://www.hwason.cn/weixin/9.html">
              <img src="/static/img/company/wechat/activityinfo/banner_4.png" alt="" style="width: 18.75rem;height: 8.35rem;">
              <div class="opac"><!--透明层--></div>
              <div class="opc_con">CCVD心脑血管检测</div>
            </a>
          </li>
          <li class="bgContent">
            <a href="http://www.hwason.cn/weixin/3.html">
              <img src="/static/img/company/wechat/activityinfo/banner_1.png" alt="" style="width: 18.75rem;height: 8.35rem;">
              <div class="opac"></div>
              <div class="opc_con">儿童天赋基因检测</div>
            </a>
          </li>
          <li class="bgContent">
            <a href="http://www.hwason.cn/weixin/5.html">
              <img src="/static/img/company/wechat/activityinfo/banner_2.png" alt="" style="width: 18.75rem;height: 8.35rem;">
              <div class="opac"></div>
              <div class="opc_con">TP53抑癌基因检测</div>
            </a>
          </li>
          <li class="bgContent">
            <a href="http://www.hwason.cn/weixin/8.html">
              <img src="/static/img/company/wechat/activityinfo/banner_3.png" alt="" style="width: 18.75rem;height: 8.35rem;">
              <div class="opac"></div>
              <div class="opc_con">PD腹部疾病专项检测</div>
            </a>
          </li>
          <li class="bgContent">
            <a href="http://www.hwason.cn/weixin/9.html">
              <img src="/static/img/company/wechat/activityinfo/banner_4.png" alt="" style="width: 18.75rem;height: 8.35rem;">
              <div class="opac"></div>
              <div class="opc_con">CCVD心脑血管检测</div>
            </a>
          </li>
          <li class="bgContent">
            <a href="http://www.hwason.cn/weixin/3.html">
              <img src="/static/img/company/wechat/activityinfo/banner_1.png" alt="" style="width: 18.75rem;height: 8.35rem;">
              <div class="opac"></div>
              <div class="opc_con">儿童天赋基因检测</div>
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

      <!--客户输入信息-->

      <form action="" method="post">
        <ul class="examination">
          <li class="clearfix" >
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">业务员工号</span>
            <input type="text" name="salesmanId" class="fr" placeholder="请输写正确信息" v-model="salesmanId" v-on:blur="getSalesmanMsg" v-on:focus="removeAlertMsg">
          </li>
          <div class="examinationRightFont" v-model="alertMsg">{{alertMsg}}</div>
          <li class="clearfix" >
            <span class="checkName fl">业务员姓名</span>
            <input type="text" name="salesmanName"  v-model="salesmanName" class="fr">
          </li>
          <li class="clearfix removeBorder">
            <span class="checkName fl">业务员电话</span>
            <input type="text" name="checkTel" v-model="salesmanTel" class="fr"/>
          </li>
        </ul>
        <!--<input type="submit" value="下一步" v-bind:class="examNextBtn" v-on:click="examinationOnSubmit">-->
        <a href="javascript:;" v-bind:class="examNextBtn" v-on:click="examinationOnSubmit">下一步</a>
      </form>
      <div>

      </div>
    </section>
    <alertTiming ref="alertTiming1" :content="alertContent">  </alertTiming>
  </section>
</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import Vue from 'vue';
  import axios from 'axios';
  import {mapState,mapMutations} from 'vuex'
  import alertTiming from '../alertTiming';
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
//        imgaddr0: "/static/img/return.png",
//        title0:"体检登记",
        examNextBtn:'examNextBtn',
        alertMsg:'',
        salesmanId:'',
        salesmanName:'',
        salesmanTel:'',
        companyName:'',
        organization_id:'',
        alertContent:''
      }
    },

   methods:{
       ...mapMutations([
           'RECORD_COMPANYINFO'

       ]),
     getSalesmanMsg(){
         let vm=this;
         if(this.salesmanId==''){
            this.alertMsg='业务员工号不正确，请重新输入！';
         }else{
             axios.get( '/wechat/examination/examination',{
               params: {
                 userName: vm.salesmanId
                 /* realName:this.salesmanName,
                  tel:this.salesmanTel*/
               }
         })
         .then(function (response) {
             console.log("res",response.data)
             if(response.data.result =="00") {
                console.log("hello")
                 vm.salesmanName=response.data.salesman.realName;
                 vm.salesmanTel=response.data.salesman.tel;
                 vm.companyName=response.data.companyName;
                 vm.organization_id=response.data.organization_id;
                 vm.examNextBtn='examNextBtn2';


             }
             else {
                 vm.alertContent=response.data.name;
                 vm.$refs.alertTiming1.Show();
             }

         })
         .catch(function (response) {
           console.log(response);
         });
         };
     },
     removeAlertMsg(){
       this.alertMsg='';
     },

     examinationOnSubmit(){
//         跳转页面
       if(this.examNextBtn=='examNextBtn2'){
           let companyInfo={};
           companyInfo.companyName=this.companyName;
           companyInfo.organization_id=this.organization_id;
           console.log("companyInfo",companyInfo)
           this.RECORD_COMPANYINFO(companyInfo)
          window.location.href="#/examinationNext";
         }else{
         this.alertMsg='业务员工号不正确，请重新输入！';
       }
     }
    },
   mounted:function(){

      eventprocess2();

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
  .content2{
    width:100%;
    height:2.15rem;
  }
/*  .wrapBg{
    background: #ebebeb;
    height:33.35rem;
  }*/
  .bgContent{
    position: relative;
    height:8.35rem;
  }
  .opac{
    height:2rem;
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
    line-height:2rem;
    text-align: left;
    text-indent:0.8rem;
  }
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
  .examinationRightFont{
    color:#e83838;
    text-align: right;
    padding:0 0.5rem;
  }
  .examination{
    width:100%;
    background:#fff ;
    margin-top:0.5rem;
  }
  .examination li{
    width:17.25rem;
    height:2.475rem;
    margin-left:0.75rem;
    border-bottom:1px solid #dcdcdc;
  }
  /* .examination li.removeBorder{
       border:0;
   }*/
  .examination li span{
    color:#333;
    line-height: 2.475rem;
    font-size:0.7rem;
  }
  .examination li input{
    width:72%;
    height:100%;
    border:0;
  }
  .examination li img{
    height: 0.45rem;
    width: 0.45rem;
    margin: 1rem 0.2rem 0 0
  }
  .examNextBtn{
    width:16.65rem;
    height:2.25rem;
    display: block;
    border:0;
    line-height: 2.25rem;
    margin:2.6rem auto 0;
    background: #d9d9d9;
    color:#fff;
    text-align: center;
    font-size:1rem;
  }
  .examNextBtn2{
    text-align: center;
    line-height: 2.25rem;
    width:16.65rem;
    height:2.25rem;
    display: block;
    border:0;
    margin:2.6rem auto 0;
    /*background: #d9d9d9;*/
    color:#fff;
    font-size:1rem;
    background: #338fff;
  }
</style>
