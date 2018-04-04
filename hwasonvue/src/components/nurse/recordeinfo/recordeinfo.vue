<template>
  <section class="wrap">
    <header>
      <div class="mianTitle">已采样信息</div>
      <!--扫码按钮-->
      <a href="javascript:;" class="scanCode" @click="GotoDelivery">快递</a>
    </header>
    <!--<headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>-->
    <section class="scrollmycenter">
      <div class="noContent"></div>
      <div class="companyName">{{companyName}}</div>
      <!--切换按钮-->
      <div class="titRegister clearfix" >
        <div :class="addOn1" v-on:click="titRegister1">已采样</div>
        <div :class="addOn2" v-on:click="titRegister2">未采样</div>
      </div>
      <div class="customerInfo">
        <div class="customerTitle"></div>
        <ul class="clearfix customerItem">
          <li>检测序号</li>
          <li>条形码</li>
          <li>姓名</li>
          <li>性别</li>
          <li>业务员</li>
        </ul>
    <!--    <div class="userInfo">
          <table>
            <tr v-for="user in userActivities">
              <td>{{user.test_number}}</td>
              <td>{{user.barcode}}</td>
              <td>{{user.userName}}</td>
              <td>{{user.sex}}</td>
              <td>{{user.salesman_name}}</td>
            </tr>
          </table>
        </div>-->
        <div class="userInfo">
          <ul>
            <li v-for="user in userActivities" class="clearfix">
              <div class="fl">{{user.test_number}}</div>
              <div  class="fl">{{user.barcode}}</div>
              <div  class="fl">{{user.userName}}</div>
              <div  class="fl">{{user.sex}}</div>
              <div  class="fl">{{user.salesman_name}}</div>
            </li>
          </ul>
        </div>

        <div class="activityMsg">
          <table class="activityTable activityTable2">
            <tr>
              <th>项目</th>
              <th>已登记人数</th>
              <th>采样数</th>
              <th>未采样数</th>
            </tr>
            <tr v-for="activityReport in TodayActivitiesReport">
              <td class="tdFir3">{{activityReport.projects}}</td>
              <td>{{activityReport.total_number}}</td>
              <td>{{activityReport.sampled_number}}</td>
              <td>{{activityReport.nosample_number}}</td>
            </tr>
            <tr>
              <td class="tdFir2">合计</td>
              <td class="total">{{totalregnum}}</td>
              <td class="total">{{totalsampnum}}</td>
              <td class="total">{{totalregnum-totalsampnum}}</td>
            </tr>
          </table>

        </div>

        <!--<div class="statistics">-->
          <!--<div class="clearfix">-->
           <!--<div class="fl recordeInfoFirLine"> 本场样本总数：<span class="sampleNum">{{{{totalregnum}}}}</span></div>-->
           <!--<div class="fl">-->
             <!--已采用人数： <span class="checkedNum sampleNum">{{totalsampnum}}</span>-->
             <!--未采样人数：<span class="unchecked sampleNum">{{totalregnum-totalsampnum}}</span></div>-->
          <!--</div>-->
          <!--<div>-->
            <!--<div v-for="item in summary.data" class="clearfix">-->
              <!--<div  class="fl recordeInfoFirLine">{{activityReport.projects}}检测为：<span class="sampleNum">{{activityReport.total_number}}</span></div>-->
              <!--<div  class="fl">已采样数：<span class="sampleNum">{{activityReport.sampled_number}} </span></div>-->

            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </section>
    <!--标题结束-->
    <footerpart></footerpart>
  </section>
</template>

<script>
  import headerpart from '../../company/wechat/headerpart';
  import footerpart from '../footerpart';
  import Vue from 'vue'
  import {mapState,mapMutations} from 'vuex'
  import axios from 'axios'

  let images = {
      localId: [],
      serverId: []
  };

  export default {
    data(){
      return {
//        imgaddr0: "/static/img/return.png",
//        title0:"已录信息",
          addOn1:"fl on",
          addOn2:"fl",
          companyName:'',
          delivery_id:'',
          delivery_file_path:'',
          userActivities: [{
          test_number: 0,
          barcode: '',
          userName: '',
          sex: '',
          salesman_name: ''
        }],

        barcode:'',
        TodayActivitiesReport:
            [{
                category:"",
                total_number:0,
                sampled_number:0,
                nosample_number:0
            }]

      }},
    mounted:function(){
        this.companyName=this.companyInfo.companyName;
        this.getUserActivity();
    },
    created:function(){

    },
    components:{
      headerpart,
      footerpart
    },
    computed:{
      ...mapState([
        'activityInfo',
        'companyInfo',
      ]),

        totalregnum: function(){
            var total=0;
            for(var i=0;i<this.TodayActivitiesReport.length;i++)
                total=total+this.TodayActivitiesReport[i].total_number;
            return total;
        },
        totalsampnum: function(){
            var total=0;
            for(var i=0;i<this.TodayActivitiesReport.length;i++)
                total=total+this.TodayActivitiesReport[i].sampled_number;
            return total;
        },


    },
    methods:{
        GotoDelivery(){
            this.$router.push('/nurse/scansubmit');
        },
        titRegister1(){
            this.addOn1="fl on";
            this.addOn2="fl";
            this.getUserActivity2("sampled");
        },
        titRegister2(){
            this.addOn1="fl";
            this.addOn2="fl on";
            this.getUserActivity2("sampling");
        },

        async GetTodayActivityReport(){
            var vm=this;

            axios.get('/wechat/activityinfo/todayActivityReport',{ params:{activity_id:this.activity.activity_id} })
                .then(function (response) {
                    console.log("response：")

                    vm.TodayActivitiesReport.splice(0, vm.TodayActivitiesReport.length)
                    for ( var i = 0; i < response.data.length; i++) {
                        vm.TodayActivitiesReport.push(response.data[i]);

                    }
                    console.log( vm.TodayActivitiesReport)
                })
                .catch(function (response) {
                    console.log("error response：")
                    console.log(response);
                })
        },
        getUserActivity2(sample) {
            var vm=this;
            console.log("recor_activity_id",this.activityInfo.activity_id)
            let addr;
            if(sample=="sampled")
                      addr='/wechat/nurse/recordeinfo/recordeinfo2';
            else      addr='/wechat/nurse/recordeinfo/recordeinfo3';
            axios.get(addr,
                { params:{activity_id: this.activityInfo.activity_id} })
                .then(function (response) {
                    console.log("response：")
                    console.log(response.data)
                    // console.log(this.TodayActivities)
                    vm.userActivities.splice(0, vm.userActivities.length)

                    for(let i=0;i<response.data.length;i++)
                    { vm.userActivities.push(response.data[i])}
                })
                .catch(function (response) {
                    console.log("error response：")
                    console.log(response);
                })
        },
      getUserActivity() {
         var vm=this;
         console.log("recor_activity_id",this.activityInfo.activity_id)

          axios.get('/wechat/nurse/recordeinfo/recordeinfo',
            { params:{activity_id: this.activityInfo.activity_id} })
            .then(function (response) {
              console.log("response：")
              console.log(response.data)
              // console.log(this.TodayActivities)
             vm.userActivities.splice(0, vm.userActivities.length)

            for(let i=0;i<response.data.users.length;i++)
              { vm.userActivities.push(response.data.users[i])}

            vm.TodayActivitiesReport.splice(0, vm.TodayActivitiesReport.length)
                for ( let i = 0; i < response.data.data.length; i++) {
                    vm.TodayActivitiesReport.push(response.data.data[i]);

                }



            })
            .catch(function (response) {
              console.log("error response：")
              console.log(response);
            })
        },

      onSubmit(){

        axios.post('/wechat/nurse//recordeinfo/deliverInfo', {
          activity_id: this.userInfo.activity_id,
          delivery_id: this.delivery_id,
          delivery_file_path: this.delivery_file_path
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (response) {
            console.log(response);
          });

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

     ChooseImage() {
      wx.chooseImage({
          success: function (res) {
              images.localId = res.localIds;
              alert('已选择 ' + res.localIds.length + ' 张图片');
          }
      });
  },



        GetData(){
            let vm=this;
            let targetUrl=location.href.split("#")[0];
            console.log("get data:")
            axios({
                method:'get',
                url:'http://www.hwason.cn/api/jssdk?url='+targetUrl,
                data:{
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }).then(function(response){

                vm.init(response.data);


            }) .catch(function (response) {
                console.log("error response：")
                console.log(response);
            })
        },

        init(data){

      wx.config({
          debug: true,
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
    }
  }
</script>
<style>

  .scrollmycenter{
    height:26.7rem;
    overflow-y: auto;
  }
  .noContent{
    width:100%;
    height:2.22rem;
  }
  #expressCode{
    display: none;
  }
  .personal_upload {
    height:4.15rem;
    display: block;
    background: #fff;
    border-top:1px solid #dcdcdc;
  }
  .personal_phopto{
    height:3.2rem;
    width:3.15rem;
    border-radius: 0.4rem;
    border:1px solid #dcdcdc;
    background: #f8f8f8;
    margin:0.45rem 1rem 0 1.05rem;
  }
  .personal_upload {
    line-height: 4.15rem;
    color:#999;
    height:4.15rem;
    display: block;
    background: #fff;
    border-top:1px solid #dcdcdc;
  }
  .customerInfo{
    width:100%;
    height:23.5rem;
    background: #fff;
  }
  .customerInfo .customerTitle{
    text-align: center;
    font-size:0.7rem;
    padding:0.5rem 0 0.6rem;
  }
  .customerInfo .customerItem li{
    width:20%;
    float: left;
    text-align: center;
    font-weight: bold;
  }
  .userInfo{
    height: 14rem;
    overflow-y: auto;
  }
  .userInfo ul{
    /*height:14rem;*/
    width:100%;
    padding-top:0.5rem;

  }
  .userInfo ul li{
    width:100%;
    text-align: center;
    padding:0.2rem 0;
    border-bottom:1px solid #ccc;
  }
  .userInfo ul li div{
    width:20%;
    height:1rem;
    float:left;
  }
  .statistics{
    color:#666;
    margin-left:1rem;
  }
  .statistics .recordeInfoFirLine{
    width:40%;
  }
  .statistics div{
    line-height: 1rem;
  }
  .statistics span{
    font-size:0.7rem;
    padding-right:1rem;
  }
  .statistics .sampleNum{
    color:#338fff;
  }
  .mention{
    padding-top:0.5rem;
    height:1.2rem;
    margin-left:0.75rem;
    color:#cd3939;
  }
  .upload{
    background: #fff;
    height:6rem;
    margin-bottom:1rem;
  }
  .upload .expressBtn{
    font-size:0.7rem;
    display: block;
    height:2rem;
    line-height: 2rem;
    text-indent: 1rem;
  }
  .uploadBtn{
    width:16.65rem;
    height:2.25rem;
    display: block;
    color: #fff;
    text-align: center;
    line-height: 2.25rem;
    font-size:1rem;
    border:0;
    margin:0 auto 3.45rem;
    background: #d9d9d9;
  }
  .uploadImg{
    border-top:1px solid #dcdcdc;
    height:4.15rem;
    margin-left:0.8rem;
  }
  .uploadImg a{
    height: 3.2rem;
    width:3.2rem;
    margin-top:0.35rem;
    background: #f8f8f8;
    border:1px solid #dcdcdc;
    border-radius: 0.15rem;
  }
  .uploadImg .promptInfo{
    color:#999;
    font-size:0.7rem;
    line-height: 4.15rem;
    margin-left:7.5rem;
  }
  .scanCode{
    width:3.2rem;
    height:2.2rem;
    position:absolute;
    right:0rem;
    top:0rem;
    line-height: 2.2rem;
    color:#fff;
    text-align: center;
    font-size:0.65rem;
  }
  .activityMsg{
    height:6rem;
    overflow-y: auto;
  }
  .activityTable{
    width:17.45rem;
    margin:0 auto 0.4rem;
    /*padding-bottom:2rem;*/
  }
  .activityTable2{
    margin:0 0 0.4rem 0;
  }
  .activityTable td{
    text-align: center;
  }
  td{
    color:#9a9a9a;
  }
  td.tdFir3{
    color:#3f3f3f;
  }
  td.tdFir2{
    color:#3f3f3f;
    font-weight: bold;
  }
  td.total{
    color: #338fff;
    /*font-weight: bold;*/
  }
  .titRegister{
    width:16rem;
    height:1.5rem;
    margin:0 auto 0.5rem;
  }
  .titRegister div{
    width:49%;
    height:100%;
    text-align: center;
    line-height: 1.5rem;
    color:#338fff;
    background: #fff;
    /*border:1px solid #338fff;*/
  }

  .titRegister div.on{
    background: #338fff;
    color:#fff
  }
</style>

