<template>
  <section class="wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <section class="scrollCheckinfo">
      <div class="noContent"></div>
      <div class="companyName">{{companyName}}</div>
      <div @click="ModifyuserInfo" class="modifyCustomerInfoBtn">{{edit0}}</div>
      <form action="" method="post">
        <ul class="checkInfo">
          <li class="clearfix" >
            <img v-if="isModify" src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">项目</span>
            <input type="text" name="checkItem" class="fr" v-model="projects" v-bind:readonly="!isModify" @click="SelectPkg">
          </li>
          <li class="clearfix" >
            <!--<img v-if="isModify" src="/static/img/nurse/mustIcon.png" class="fl" alt="">-->
            <span class="checkName fl">业务员</span>
            <input type="text" name="checkSalesman" color="#338fff" class="fr" v-model="salesman.name" readonly="true">
          </li>
          <li class="clearfix" >
            <img v-if="isModify" src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">姓名</span>
            <input type="text" name="checkName" class="fr" v-model="userName" v-bind:readonly="!isModify">
          </li>
          <li class="clearfix" >
            <img v-if="isModify" src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">性别</span>
            <!--<input type="text" name="checkSex" class="fr" v-model="sex" v-bind:readonly="!isModify">-->
             <input  name="sex" id="man" class="fr"  v-model="picked_sex" readonly @click="showSex">

          </li>
          <li class="clearfix" >
            <img v-if="isModify" src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">身份证号</span>
            <input type="text" name="checkId" class="fr" v-model="IDNo" v-bind:readonly="!isModify">
          </li>
          <li class="clearfix removeBorder">
            <img v-if="isModify" src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">联系电话</span>
            <input type="text" name="checkTel" class="fr" v-model="tel" v-bind:readonly="!isModify">
          </li>
        </ul>
        <div class="notecodeMsg">以上客户个人信息审核后，请获取检测条形码后提交</div>
        <div class="scan clearfix" v-on:click="ScanBarCode">
          <img src="../../../../static/img/nurse/sampling/scan.png" alt="" class="fl">
          <span class="fr scanFont">扫一扫</span>
        </div>
        <div class="enterCode" >
          <span>输入条码</span>
          <input type="text" v-model="barcode" placeholder="在此输入条码">
        </div>
        <div class="codeBox ">样本条形码为: <span class="barCode">{{barcode}}</span></div>
        <div class="checkinfobtn" @click="onSubmit" >提交</div>
      </form>
    </section>
    <alertTiming ref="alertTiming1" :content="alertContent">  </alertTiming>
    <mt-popup v-model="popupVisible" class="sexInfoBox">
        <div class="sexInfo clearfix">
          <label for="level1" class="clearfix fl">
            <input type="radio" name="sort3" id="level1" @click="popupVisible=false" v-model="picked_sex" value="男" class="fl">
            <span class="fl">男</span>
          </label>
          <label for="level2" class="clearfix fl">
            <input type="radio" name="sort3" id="level2" @click="popupVisible=false" v-model="picked_sex" value="女" class="fl">
            <span class="fl">女</span>
          </label>
        </div>
    </mt-popup>
    <!--<remote_js src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></remote_js>-->
    <!--<popRadio :isShow="isShow" :picked="picked" :items=""v-on:onSelected="Selected" v-on:onSelected2="Select2"></popRadio>-->
  </section>
</template>
<script>
  import headerpart from '../../company/wechat/headerpart';
  //import popRadio from '../../common/popRadio';
  import footerpart from '../footerpart';
  import {mapState,mapMutations} from 'vuex'
  import axios from 'axios'
  import Vue from 'vue'
  import remote_js from '../../remote-js'
  import alertTiming from '../../alertTiming';

  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"客户信息核对",
        edit0:"修改",
        isShow:false,
        picked:'',
        barcode:'',
        alertContent:'',
        popupVisible:false,
        isModify:false,
        companyName:'',
        activity_id:'',
        userId:'',
        projects:'',
        salesman:{},
        userName:'',
        sex:'',
        IDNo:'',
        tel:'',
        isSalesmanChg:false,
        isProjectChg:false,
        isUserChg:false,
        i:0,
        picked_sex:'',

      }
    },
    mounted:function(){
        //微信接口初始化，获得access token
        this.GetData();

      if(this.projectInfo==null ||!this.userInfo.isPkgSelect)
      {
        this.projects=this.userInfo.projects;

      }
      else {

        this.projects=this.projectInfo.projects;
        this.isModify=true;
        this.edit0="保存";
      }

        this.userName=this.userInfo.userName;
        this.picked_sex=this.userInfo.sex;
        this.IDNo=this.userInfo.IDNo;
        this.tel=this.userInfo.tel;
        this.salesman=this.userInfo.salesman;
        this.userId=this.userInfo.userId;
        this.companyName=this.userInfo.companyName;
        this.activity_id=this.userInfo.activity_id;
        console.log("activity_id:",this.activity_id)





    },
    created:function(){
//
    },
    computed: {
      ...mapState([
        'userInfo',
        'userInfo2',
       'projectInfo',
        'companyInfo'
      ])
    },
    components:{
      headerpart,
      footerpart,
      remote_js,
      alertTiming

    },
    methods:{
      ...mapMutations([
        'RECORD_USERINFO',
        'RECORD_USERINFO2'

      ]),
        showSex(){
          if(!this.isModify){
              return false;
          }
          this.popupVisible = true
        },
        GetData(){
           let vm=this;
            let targetUrl=location.href.split("#")[0];
            console.log("get data:")
            axios({
                method:'get',
                url:'http://www.hwason.cn:8081/api/jssdk?url='+targetUrl,
                data:{
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }).then(function(response){


                init(response.data);


            }) .catch(function (response) {
                console.log("error response：")
                console.log(response);
            })
        },


      ScanBarCode(){
         let vm=this;

        wx.scanQRCode({
          needResult: 1,
          desc: 'scanQRCode desc',
          success: function (res) {
          vm.barcode=res.resultStr.split(',')[1]

          }
        });
      },
      Selected(index){

        this.i=index
        this.isShow=false

      },
      Selected2(){
        this.picked=this.picked+' '
      },
      SelectPkg(){

        if(this.isModify)  {

          let userInfo={};

          userInfo.userName=this.userName;
          userInfo.picked_sex=this.picked_sex;
          userInfo.IDNo=this.IDNo;
          userInfo.tel=this.tel;
          userInfo.projects=this.projects;
          userInfo.salesman=this.salesman;
          userInfo.userId=this.userId;
          userInfo.companyName=this.companyName;
          userInfo.activity_id=this.activity_id
          userInfo.isPkgSelect=true;
          userInfo.isModfy=true;

          this.RECORD_USERINFO(userInfo)
          console.log("this,userInfo",this.userInfo);
          console.log("this,companyInfo",this.companyInfo);
          this.$router.push('/salesman/medicalPackage');


        }

      },

      ModifyuserInfo(){
      if(this.isModify==false) {
      this.isModify=true;
       this.edit0="保存"

        this.RECORD_USERINFO2(this.userInfo);
      }
      else {
        this.edit0="修改";
        this.isModify=false;
        this.userName=this.userInfo2.userName;
        this.picked_sex=this.userInfo2.picked_sex;
        this.IDNo=this.userInfo2.IDNo;
        this.tel=this.userInfo2.tel;
        this.salesman=this.userInfo2.salesman;
        this.userId=this.userInfo2.userId;
        this.companyName=this.userInfo2.companyName;
        this.activity_id=this.userInfo2.activity_id;
        this.projects=this.userInfo2.projects;

      }

      },
      onSubmit(){
          let vm=this;
          if(this.barcode=='') {
              vm.alertContent="条码不能为空！请重新扫描条码或录入";
              vm.$refs.alertTiming1.Show();
              return;
          }
       if(this.isModify) {
         let userInfo_submit={}
         if( this.userName !=this.userInfo2.name||
         this.picked_sex!=this.userInfo2.picked_sex ||
         this.IDNo!=this.userInfo2.IDNo||
         this.tel !=this.userInfo2.tel)
         { this.isUserChg=true;}
         userInfo_submit.userName=this.userName;
         userInfo_submit.picked_sex=this.picked_sex;
         userInfo_submit.IDNo=this.IDNo;
         userInfo_submit.tel=this.tel;
         if(this.userInfo2.projects !=this.projects)
         { this.isProjectChg =true;}
         userInfo_submit.projects=this.projects;
//         if(this.userInfo.projects !=this.projects)
//         { this.isSalesmanChg =true;}
//         userInfo_submit.salesman=this.userInfo.salesman;
         userInfo_submit.userId=this.userInfo2.userId;
         console.log("userInfo_submit:",userInfo_submit)
         axios.post('/wechat/nurse/sampling/sampling', {
           isModify:this.isModify,
           userInfo:userInfo_submit,
           isUserChg:this.isUserChg,
           isProjectChg:this.isProjectChg,
           isSalesmanChg:this.isSalesmanChg,
           userId: this.userInfo2.userId,
           barcode: this.barcode,
           activity_id: this.userInfo2.activity_id
         })
           .then(function (response) {
             console.log(response);
             if(response.data.result=="00") {
                 vm.alertContent = "保存成功，请进行下一个用户采样";
                 vm.$refs.alertTiming1.Show();
                 setTimeout(function(){ vm.$router.push('/nurse/sampling');},2000)
             }
             else {
                 vm.alertContent = response.data.name;
                 vm.$refs.alertTiming1.Show();
             }

           })
           .catch(function (response) {
            // console.log(response);
               vm.alertContent = "操作失败，重新提交";
               vm.$refs.alertTiming1.Show();
           });



       }
       else {
         console.log("activity_id,projects:",this.userInfo.activity_id,this.userInfo.projects)
        axios.post('/wechat/nurse/sampling/sampling2', {
          userId: this.userInfo.userId,
          barcode: this.barcode,
          activity_id: this.userInfo.activity_id

        })
          .then(function (response) {
            console.log(response);
            if(response.data.result=="00") {
                vm.alertContent = "保存成功，请进行下一个用户采样";
                vm.$refs.alertTiming1.Show();
                setTimeout(function(){vm.$router.push('/nurse/sampling');},1000)

            }
            else {
                vm.alertContent = response.data.name;
                vm.$refs.alertTiming1.Show();

            }
          })
          .catch(function (response) {

              vm.alertContent = "操作失败，重新提交";
              vm.$refs.alertTiming1.Show();

          });
       }

      }
    }
  }

  function init(data){

      wx.config({
          debug: false,
          appId: data.appid,
          timestamp: data.timestamp,
          nonceStr: data.noncestr,
          signature: data.signature,
          jsApiList: [
              'checkJsApi',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone',
              'hideMenuItems',
              'showMenuItems',
              'hideAllNonBaseMenuItem',
              'showAllNonBaseMenuItem',
              'translateVoice',
              'startRecord',
              'stopRecord',
              'onVoiceRecordEnd',
              'playVoice',
              'onVoicePlayEnd',
              'pauseVoice',
              'stopVoice',
              'uploadVoice',
              'downloadVoice',
              'chooseImage',
              'previewImage',
              'uploadImage',
              'downloadImage',
              'getNetworkType',
              'openLocation',
              'getLocation',
              'hideOptionMenu',
              'showOptionMenu',
              'closeWindow',
              'scanQRCode',
              'chooseWXPay',
              'openProductSpecificView',
              'addCard',
              'chooseCard',
              'openCard'
          ]
      });

  wx.error(function (res) {
          alert(res.errMsg);
      });

  }
</script>
<style>
  .noContent{
    width:100%;
    height:2.22rem;
  }
  .sexInfoBox{
    overflow: hidden;
    border-radius: 0.4rem;
  }
  .sexInfo{
    padding:1rem 0.5rem 1rem 1.2rem ;
  }
  .sexInfo label{
    margin-right:1rem;
  }
  .sexInfo label span{
    padding-left:0.5rem;
  }
  .inpScanbar input{
    width:60%;
  }
  .scrollCheckinfo{
    height:32rem;
    overflow-y: auto;
  }
  .checkInfo{
    width:100%;
    height: 15.1rem;
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
  .enterCode{
    height: 2.4rem;
    background: #fff;
    position:relative;
    margin-bottom:0.2rem;
  }
  .enterCode span{
    line-height: 2.4rem;
    position: absolute;
    font-size:0.7rem;
    top: 0;
    left:0.8rem;
  }
  .enterCode input{
    width: 70%;
    height: 100%;
    border:0;
    position:absolute;
    right:1rem;
    top:0;
  }
  .modifyCustomerInfoBtn{
    width:2rem;
    height:2.2rem;
    font-size:0.7rem;
    color:#fff;
    line-height: 2.2rem;
    position: fixed;
    right:0.6rem;
    top:0;
    z-index: 400;
  }
  .scan{
    width:100%;
    height:2.5rem;
    background: #fff;
    border-top:1px solid #ecebeb;
    border-bottom:1px solid #ecebeb;
  }
  .scan .scanFont{
    padding-right:1.1rem;
    color:#999;
  }
  .scan img{
    height:1rem;
    width:1rem;
    margin:0.8rem 1rem;
  }
  .scan span{
    line-height: 2.5rem;
    color:#338fff;
    padding-left:0.5rem;
  }
  .scan input{
    width:50%;
    height:100%;
    margin-left:1rem;
    border:0;
    /*border:1px solid #dcdcdc;*/
  }
 /* .scan a{
    display: block;
    color:#333;
    background: #ecebeb;
    font-size:0.7rem;
    line-height: 2.5rem;
    text-indent: 0.73rem;
  }*/
  .notecodeMsg{
    width: 17.25rem;
    color:#cd3939;
    padding:1.5rem 0 0.5rem;
    text-indent: 0.65rem;
    clear: both;
  }
  .codeBox{
    color:#338fff;
    clear: both;
    padding:0.1rem 0 0 1rem;
    font-size:0.8rem;
  }
  .checkinfobtn{
    width:16.65rem;
    height:2.25rem;
    text-align: center;
    line-height: 2.25rem;
    color: #ffffff;
    font-size:1rem;
    margin:1rem auto 0.5rem;
    background: #338fff;
  }
  .brightBtn{
    background:#338fff;
  }

  .checkInfo .sexInpBox{
    margin:0.8rem 0 0 4rem;
  }
  .checkInfo div{
    margin-right:3rem;
  }
  .checkInfo .sexInpBox label{
    margin-left:0.7rem;
  }
  .checkInfo .sexInpBox input{
    width:0.8rem;
    height:0.8rem;
  }

</style>
