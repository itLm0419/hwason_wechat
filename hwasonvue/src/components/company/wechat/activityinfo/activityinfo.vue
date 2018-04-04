<template>
  <section class="wrap">
    <header>
      <div class="mianTitle" v-model="companyName">{{companyName}}</div>
    </header>
    <section>
      <!--轮播图开始-->
      <div class="addBlank"></div>
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
             <!-- <div class="opac"></div>
              <div class="opc_con">HC检测</div>-->
            </a>
          </li>
          <li class="bgContent">
            <a href="javascript:;" @click="ClickAdv3">
              <img src="/static/img/company/wechat/activityinfo/banner_3.png" alt="" style="width: 18.75rem;height: 8.35rem;">
              <!--<div class="opac"></div>
              <div class="opc_con">HCG检测</div>-->
            </a>
          </li>
          <li class="bgContent">
            <a href="javascript:;" @click="ClickAdv4">
              <img src="/static/img/company/wechat/activityinfo/banner_4.png" alt="" style="width: 18.75rem;height: 8.35rem;">
              <!--<div class="opac"></div>
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
        </ul>
        <ol>
          <li class="active"></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
      </section>
      <!--告知书-->
      <div class="clearfix"> <!--noteBox添加此类可以增加白色的背景-->
        <div class="title clearfix fl">
          <div class="titblock fl"></div>
          <div class="fl con">今日活动情况</div>
        </div>
        <div class="fr" @click="ShowNote">
          <div class="fr books">
            <img src="/static/img/company/wechat/activityinfo/noteIcon.png" alt="">
            <em :class="bookDot"></em>
          </div>
          <div class="noteBook fr">客户告知书</div>
        </div>
      </div>
      <div class="msgBox">
        <div class="activitymsg">
          <!--默认活动的显示-->
          <div class="clearfix" >
            <ul class="activityDetail fl"  >
              <li v-if="activity.activity_time !=''">
                 <div class="fl">{{activity.activity_time}}</div>
                 <div class="fr">{{activity.projects}}</div>
              </li>
              <li v-else>暂无活动</li>
              <li>{{activity.address}}</li>
            </ul>
            <div class="fr" v-if="activity.activity_time !=''">
              <a href="javascript:;" class="activitymodify" @click="activityModify">修改</a>
            </div>
          </div>
        </div>
        <!--无活动的显示-->
        <!-- <div class="msg">
             暂无信息！
         </div>-->
        <!--有活动的显示-->
        <div class="activityMsg">
          <table class="activityTable2">
            <tr>
              <th>项目</th>
              <th>已登记人数</th>
              <th>采样数</th>
              <th>未采样数</th>
            </tr>
            <tr v-for="activityReport in TodayActivitiesReport">
              <td style="color:#3f3f3f;">{{activityReport.projects}}</td>
              <td>{{activityReport.total_number}}</td>
              <td>{{activityReport.sampled_number}}</td>
              <td>{{activityReport.nosample_number}}</td>
            </tr>
            <tr>
              <td class="tdFir">合计</td>
              <td class="total">{{totalregnum}}</td>
              <td class="total">{{totalsampnum}}</td>
              <td class="total">{{totalregnum-totalsampnum}}</td>
            </tr>
          </table>

        </div>
        <!--按钮-->

        <!--告知书内容-->
        <div v-show="isShow">
          <!--蒙版-->
          <div class="mengban"></div>
          <!--提示的内容-->
          <div class="contentBooks">
            <div class="titleNote">客户告知书</div>
            <div class="conNote">
              <p> 尊敬的客户：</p>
              <p class="textIndent">您好，感谢您对我们的信任，为更好的开展检测
                         活动，特拟定此告知书，希望更好的为您服务。</p>
              <p>一、我们提供的产品及服务</p>
              <p> 1、我们免费提供检测需要的检测包和配套耗材，为避
                         免浪费，检测包数量控制在实际检测数量的105%，超
                         出部分按照10元/个收取费用。</p>
              <p> 2、采血类采样每30人配备一个护士，基因类采样每50
                         人配备一个护士，不足30人的结算期内按照每人6元收
                         取护士费。</p>
              <p>3、检测产品内勤培训和产说会现场分别免费提供一次
                         讲解；如需另外邀请讲师 按照每场800元支付差旅费，
                         如若单场检测人员超过200人，可免费提供讲师。</p>
              <p>4、我司可以安排专人免费进行报告解读一次；单场大
                         于200人，可以免费安排集中报告解读。</p>
              <p> 5、驻点人员安排单月累计召开20场以上且累计样本数
                         不少于1000例的可以安排人员进行对接。</p>
              <p> 二、客户需要配合注意的事项：</p>
              <p>1、批量申请单登记：由保险公司安排专员登记检测人
                         员信息并写明具体的检测项目，不同项目分多张单子填
                         写。注意字体工整，避免因字迹潦草增加不必要的核对
                         时间，延误出报日期。</p>
              <p>2、保险公司需安排专员进行样本统计核对并正确填写样本统计表。</p>
              <p>3、我们将在收到样本后3日内将电子档发给保险公司，保险公司需对电子表格进行核对，确保信息准确无误。</p>
              <p>4、活动安排提前三个工作日通知相关人员，检测包申请需要提前五个工作日申请。</p>
              <p>三、报告发放及回款要求</p>
              <p>1、各类检测出报告日期如下：</p>
              <p>a:血样类：10个工作日</p>
              <p>b:TP53：15个工作日</p>
              <p>c:易感基因：21个工作日</p>
              <p>2、回款要求</p>
              <p>a:检测类产品在收到报告后30日内回款到指定账户，若三十日内未能回款的需要和我司核对无误后签订应收账款确认函。</p>
              <p>b:实物类产品在收到检测耗材30日内回款到指定账户，若三十日内未能回款的需要和我司核对无误后签订应收账款确认函。</p>
              <p class="noteEndMsg">再次感谢您的信任与配合！</p>
            </div>
            <div class="clearfix choose">
              <a href="javascript:;" class="cancel fr" @click="onCancel">取消</a>
              <a href="javascript:;" class="read fr" @click="readNote">已阅</a>
            </div>
          </div>
        </div>
        <!--告知书内容结束-->
      </div>
      <div class="clearfix" >
        <a href="javascript:;" class="actFeedBack fr" @click="onFeedBack" v-if="false">
          <img src="../../../../../static/img/company/wechat/activityinfo/feedBack.png" alt="" class="fl">
          <span class="fl">问题反馈</span>
        </a>
      </div>
      <div class="actBtnsBox clearfix">
        <a href="javascript:;" class="checked"  v-if="activity.feedback_state==1">活动已结束</a>
        <a href="javascript:;" class="check"  v-else  @click="onConfirm">活动结束</a>
        <a href="javascript:;" class="detail" @click="GotoDetailList">详情</a>
      </div>
    </section>
    <footerpart> </footerpart>
    <mt-popup v-model="popupVisible"><!--v-show="isActivityShow"-->
        <ul class="sales_choiceActivity">
          <li class="clearfix" v-for="(activity,index) in TodayActivities">
            <!--<input type="radio" name="activity" class="fl"  v-model="picked" v-on:change="Selected(index)" v-on:click="Selected0(index)" v-on:focus="Selected2 "  v-bind:value="index">-->
            <input type="radio" name="activity" class="fl"  v-model="picked"  v-on:click="Selected0(index)" v-on:focus="Selected2"  v-bind:value="index">
            <div class="fl">
              <div>{{activity.activity_time}}</div>
              <div>{{activity.address}}</div>
            </div>
          </li>
        </ul>
    </mt-popup>
    <alertTiming ref="alertTiming1" :content="alertContent">  </alertTiming>
  </section>
</template>
<script>
  "use strict";
  import headerpart from "../headerpart"
  import footerpart from "../footerpart"
  import Vue from 'vue'
  import axios from 'axios'
  import {mapState,mapMutations} from 'vuex'
  import alertTiming from '../../../alertTiming';
  import MtPopup from "../../../../../node_modules/mint-ui/packages/popup/src/popup";

  let activity0 ={
      projects:'',
          activity_time:'',
          address:'',
          activity_id:'',
          feedback_state:0,

  };

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
        isShow:false,
        companyName:'',
        popupVisible:false,
        bookDot:'dot',
//        isActivityShow:false,
        TodayActivities:
          [{
              projects:'',
              activity_time:'',
              address:'',
              activity_id:'',
              feedback_state:0
          }],
          TodayActivitiesReport:
              [{
                  category:"",
                  total_number:0,
                  sampled_number:0,
                  nosample_number:0
              }],

        activity_time:[],
        feedback_state:[],
        sample_status:[],

        activity:{
            projects:'',
            activity_time:'',
            address:'',
            activity_id:'',
            feedback_state:0
        },

        date0:"2017-05-25",
        noData:false,
//        isActivityShow:false,
        picked:'',
        alertContent:''

      }
    },
    mounted:function(){
      eventprocess2();
      this.companyName=this.companyInfo.companyName;
//      console.log("companyName",this.companyInfo.companyName);
      this.initdata();
    },
    created: function(){

//        GetTodayActivity()

    },
    components:{
      MtPopup,
      headerpart,
      footerpart,
      alertTiming
    },
    computed:{
      ...mapState([
        'companyInfo',
      ]),
      totalregnum: function(){
        let total=0;
        for(var i=0;i<this.TodayActivitiesReport.length;i++)
          total=total+this.TodayActivitiesReport[i].total_number;
        return total;
      },
      totalsampnum: function(){
        let total=0;
        for(var i=0;i<this.TodayActivitiesReport.length;i++)
          total=total+this.TodayActivitiesReport[i].sampled_number;
        return total;
      },
    },

    methods: {
      ...mapMutations([
        'RECORD_ACTIVITIES_ID',

      ]),

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

        onFeedBack(){
            this.$router.push('/company/feedback')
        },

        onConfirm(){
            let vm=this;
            axios.post('wechat/activityinfo/confirm', {
                activity_id:this.activity.activity_id
            })
                .then(function (response) {
                    if(response.data.result=="00")
                    {
                        vm.alertContent=response.data.name;
                        vm.$refs.alertTiming1.Show();
                        vm.activity.feedback_state=1;
                    }else if(response.data.result == "02"){
                        vm.alertContent=response.data.name;
                        vm.$refs.alertTiming1.Show();
                    }else{
                        vm.alertContent=response.data.name;
                        vm.$refs.alertTiming1.Show();
                    }
                })
                .catch(function (response) {
                    vm.alertContent=response.data.name;
                    vm.$refs.alertTiming1.Show();
                });
        },

        async activityModify(){

         //  console.log("activities",this.Activities)
//            this.isActivityShow=true;
            this.popupVisible=true;

        },

        Selected0(index){
            let vm=this;
            this.i=index
            let k=index
            this.activity.projects=this.TodayActivities[k].projects;
            this.activity.activity_time=this.TodayActivities[k].activity_time
            this.activity.address=this.TodayActivities[k].address
            this.activity.activity_id=this.TodayActivities[k].activity_id
            this.activity.feedback_state=this.TodayActivities[k].feedback_state
            activity0.projects=this.TodayActivities[k].projects;
            activity0.activity_time=this.TodayActivities[k].activity_time
            activity0.address=this.TodayActivities[k].address
            activity0.activity_id=this.TodayActivities[k].activity_id
            activity0.feedback_state=this.TodayActivities[k].feedback_state
            this.GetTodayActivityReport();
            vm.isActivityShow=false;
          /*  setTimeout(function(){
//                vm.isActivityShow=false;
                vm.isActivityShow=false;
                },100)*/

        },
        Selected2(){
            this.picked=this.picked+' '
        },


      GotoSampleList(){
        this.$router.push('/company/samplelist')
      },
      GotoDetailList(){

        this.RECORD_ACTIVITIES_ID(this.activity.activity_id);
        this.$router.push('/company/sampledetaillist')

      },
      onCancel(){
        this.isShow=false;
      },
      ShowNote(){
        this.isShow=true;
      },
      readNote(){
        this.isShow=false;
        this.bookDot = '';
        axios.post('/wechat/activityinfo/updateNote')
          .then(function (response) {
            console.log(response);
          })
          .catch(function (response) {
            console.log(response);
          });

      },

      initdata() {
        this.GetNoteStatus();
        this.GetTodayActivity();
      },
      async GetNoteStatus(){
        var vm=this;
        var tmp;
        axios.get('/wechat/activityinfo/queryNote')
          .then(function (response) {
            console.log("response：");
            if(response.data !=null) {
              vm.isShow=false;
            }
            else {
              vm.isShow=true;
            }
          })
          .catch(function (response) {
            console.log("error response：");
            console.log(response);
          })
      },
      async GetTodayActivity(){
        var vm=this;

        axios.get('/wechat/activityinfo/todayActivity')
          .then(function (response) {
            console.log("response：");
            if(response.data.length>0) {
                vm.TodayActivities.splice(0, vm.TodayActivities.length);
                for ( var i = 0; i < response.data.length; i++) {
                    vm.TodayActivities.push(response.data[i]);
                }
                if(activity0.activity_time=='')
                {
                    vm.activity=response.data[0];
                    activity0=response.data[0];}
                else {
                    vm.activity=activity0;
                }
                vm.GetTodayActivityReport();
            }
          })
          .catch(function (response) {
            console.log("error response：")
          })
      },
      async GetTodayActivityReport(){
            var vm=this;
            axios.get('/wechat/activityinfo/todayActivityReport',{ params:{activity_id:this.activity.activity_id} })
                .then(function (response) {
                    console.log("response：");

                    vm.TodayActivitiesReport.splice(0, vm.TodayActivitiesReport.length);
                    for ( var i = 0; i < response.data.length; i++) {
                        vm.TodayActivitiesReport.push(response.data[i]);

                    }
                    console.log( vm.TodayActivitiesReport)
                })
                .catch(function (response) {
                    console.log("error response：");
                    console.log(response);
                })
        },
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
    margin:0 0 0 -2rem;
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
  .activityIcon{
    padding-left:0.5rem;
    width:1rem;
    height:1rem;
  }
  .act_items{
    padding:0.15rem 0 0 0.8rem;
  }
  .noteBook{
    color:#338fff;
    font-size:0.7rem;
    font-weight: bold;
    margin-top:0.2rem;
  }
  .msgBox{
    width:100%;
    background: #fff;
  }
  .activitymsg{
    /*height:3.8rem;*/
    width:100%;
    background: #fff;
    padding:0.2rem 0;
  }
  .activitymsg .activityDetail{
    padding-left:1.25rem;
  }
  .activitymsg .activityDetail li{
    color:#000;
    font-size:0.6rem;
    height:1rem;
    line-height:1rem; ;
  }
  .sales_choiceActivity{
    padding:1rem 0.5rem;
  }
  .sales_choiceActivity li{
    width:16rem;
    padding-bottom:0.5rem;
  }
  .sales_choiceActivity  li input{
    width: 1rem;
    height: 1rem;
    margin:0.525rem 0.9rem 0 0;
  }
  .activitymodify img{
    width:1.2rem;
    height:1.2rem;
  }
  .activitymodify{
    margin-right:0.6rem;
    width: 2rem;
    height:1.2rem;
    display: block;
    background: #338fff;
    color:#fff;
    font-size:0.6rem;
    line-height: 1.2rem;
    text-align: center;
    border-radius: 0.2rem;
  }
  .books{
    position: relative;
  }
  .books img{
    width: 0.9rem;
    height:0.75rem;
    margin:0.2rem 0.3rem 0.225rem;
  }
  .books .dot{
    height:0.3rem;
    width:0.3rem;
    position:absolute;
    right:0.2rem;
    top:-0rem;
    border-radius: 50%;
    background:#ee3837 ;
  }
  .msgBox{
    background:#fff ;
    /*width:100%;*/
    /*padding: 0 0.75rem;*/
  }
  .title{
    margin-left:1rem;
    font-weight: bold;
   /* height:1.425rem;
    width: 17.25rem;
    margin:0 auto ;
    border-bottom:1px solid #dadada;*/
  }
   .title .titblock{
    width: 0.25rem;
    height:0.925rem;
    background: #338fff;
    margin:0.25rem 0.25rem 0 0 ;
  }
   .title .con{
    color:#3f3f3f;
    font-size:0.7rem;
    line-height: 1.45rem;
  }
   .msg{
    color:#999;
    font-size:0.7rem;
    margin:0.25rem auto 0;
    /*padding: 0 0.75rem;*/
    height:2.2rem;
    width:17.45rem;
    line-height: 1.4rem;
  }
  .isChecked{
    color:#ed3a36;
    /*line-height: 3rem;*/
  }
  .isChecked2{
    color:#48ab00;
    /*line-height: 3rem;*/
  }
  .toDetail{
    background: #338fff;
    text-align: center;
    line-height: 1rem;
    border-radius: 0.2rem;
    margin-top:0.8rem;
    color: #fff;
    display: block;
    height: 1rem;
    width:2rem;
  }
  /*侧边栏*/
  /*.side{
    height:100%;
    width:11.5rem;
    background: rgba(0,0,0,0.85);
    position:absolute;
    left: 0;
    top:0;
    box-shadow: 0rem 0 0.5rem rgba(0,0,0,0.85);
  }
  .side .logoBox{
    height: 9.6rem;
    border-bottom:1px solid #3f3f3f;
  }
  .side .logoBox .myCompanyName{
    font-size:0.9rem;
    color:#fdfffe;
    text-align: center;
  }
  .side .lists li{
    height:2.175rem;
    border-top:1px solid #3f3f3f;
    border-bottom:1px solid #3f3f3f;
    margin-top:1px;
  }
  .side .lists a{
    height:100%;
    width:11.5rem;
    color:#dedede;
    font-size:0.75rem;
    display: block;
    text-indent: 2.5rem;
    line-height: 2.175rem;
  }*/
  /*侧边栏结束*/
  .activityMsg{
    height:6rem;
    overflow-y: auto;
  }
  .activityTable2{
    width:17.45rem;
    margin:0.3rem auto 0.4rem;
    /*padding-bottom:2rem;*/
  }
  .activityTable2 tr{
    line-height: 1rem;
  }
  .activityTable2 td{
    text-align: center;
  }
  td{
    color:#9a9a9a;
  }
  td.tdFir{
    font-weight:bold;
    color:#3f3f3f;
  }
  td.total{
    color: #338fff;
  }
  /*未核对*/
  .msgBox .unChecked{
    /*margin-top:1rem;*/
  }
  .formBox{
    /*width:17.15rem;*/
    height: 8rem;
    margin:0 auto;
    overflow-y:scroll;
  }
  .scrollTableBox{
    width:11rem;
    overflow-x:scroll;
  }
  .scrollTable{
    /*width:24rem;*/
  }
  .fixTable{
    border:1px solid #000;
    margin-top:0.2rem;
  }
  .fixTable th,.fixTable td{
    padding: 0.6rem 0.6rem;
    color:#7e7e7e;
    font-weight:normal;
  }
  .table{
    /*height:11rem;*/
    float: left;
    border:1px solid #000;
  }
  .table th,.table td{
    padding:0 0.2rem;
    text-align: center;
    font-weight:normal;
    color:#7e7e7e;
  }
  .table td.singed{
    color: #00ac2d;
  }
  .table td.unChecked{
    color: #cd3939;
  }

  /*蒙版*/
  .mengban{
    height:100%;
    width:100%;
    background:rgba(0,0,0,0.3);
    position:absolute;;
    top:0;
    left:0;
    /*z-index: 1;*/
  }
  .contentBooks{
    position: absolute;
    left:1.125rem;
    top:2.2rem;
    z-index: 999;
    background: #fff;
    height: 25.1rem;
    width:14.375rem;
    padding:0.75rem 1rem;
    margin:0 auto;
  }
  .titleNote{
    height:1rem;
    border-bottom:1px solid #ebebeb;
  }
  .conNote{
    overflow-y: auto;
    height:23rem;
    /*overflow: hidden;*/
  }
  .conNote p{
    font-size:0.6rem;
    color:#666;
  }
  /* .choose{
     height:2.95rem;
   }*/
  .choose a{
    width:3.3rem;
    height:1.55rem;
    font-size:0.7rem;
    text-align: center;
    border-radius: 0.125rem;
    line-height: 1.55rem;
    border:0;
  }
  .choose a.read{
    margin-right:0.9rem;
    color:#fff;
    background: #338fff;
  }
  .choose a.cancel{
    background: #fff;
    color:#338fff;
    border:0.075rem solid #338fff;
  }
  .showPartCustomerScroll{
    height: 7rem;
    overflow-y: auto;
    margin-bottom:1rem;
  }
  /* .showPartCustomer{
     padding:0 1rem 0 0 ;
   }*/
  .showPartCustomer li{
    width:100%;
    /*height: 100%;*/
    color:#333;
    border-bottom:1px solid #dcdcdc;
  }
  .customerPartMsg span{
    padding:1rem 0.5rem;
  }
  .customerMsgId{
    padding:0.6rem 0 0.5rem 1rem;
  }
  .customerMsgId span{
    padding-right:1rem;
  }
  .showMoreMsg{
    padding-top:0.2rem;
    text-align: center;
    display: block;
  }
  .showMoreMsg img{
    display: block;
    width:1rem;
    height:1rem;
    margin:0 auto;
  }
  .actFeedBack{
    margin:0.5rem 0.2rem 0.2rem 0;
  }
  .actFeedBack span{
    color:#338fff;
    font-size:0.6rem;
  }
  .actFeedBack img{
    height:0.7rem;
    width:0.7rem;
    margin:0.1rem 0.2rem;
  }
  .actBtnsBox{
    width:16.6rem;
    margin: 1rem auto 1.5rem;
  }
  .actBtnsBox a{
    width:7.5rem;
    height:2.25rem;
    font-size:1rem;
    text-align: center;
    line-height: 2.25rem;
    border-radius: 0.125rem;
    display: block;
    float: left;
    margin-left:0.5rem;
  }
  .actBtnsBox a.check{
    color:#fff;
    background: #338fff;
  }
  .actBtnsBox a.checked{
    color:#fff;
    background: #888;
  }
  .actBtnsBox a.detail{
    background: #fff;
    color:#338fff;
    border:0.075rem solid #338fff;
  }
 /* .activitymsg{
    !*height:3.8rem;*!
    width:100%;
    background: #fff;
    padding:0.2rem 0;
  }*/

  .activityTable{
    width:17.45rem;
    margin:0 auto 0.4rem;
    /*padding-bottom:2rem;*/
  }
  .activityTable
  .activityTable td{
    text-align: center;
  }
  td{
    color:#9a9a9a;
  }
  td.total{
    color: #338fff;
  }

</style>

