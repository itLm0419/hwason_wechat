<template>
  <section class="wrap">
    <header>
      <div class="mianTitle">现场采样</div>
    </header>
    <!--<headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>-->
    <section class="scrollmycenter">
      <div class="noContent"></div>
      <div class="clearfix">
        <div class="fl companyName">{{activity.companyName}}</div>
        <a href="javascript:;" class="fr noMsg">
          <img src="/static/img/nurse/sampling/noMsg.png"  alt="">
        </a>
      </div>
      <div class="activitymsg">
        <!--默认活动的显示-->
        <div class="clearfix" >
          <ul class="activityDetail fl" >
            <li v-if="activity.projects !=''">{{activity.projects}}检测</li>
            <li v-else>{{activity.projects}}</li>
            <li v-if="activity.activity_time==''">今天没有安排活动</li>
            <li v-else>{{activity.activity_time}}</li>
            <li>{{activity.address}}</li>
          </ul>
          <div class="fr">
            <span class="activitymodify" v-if="activity.activity_time !=''" v-on:click="activityModify">
              <!--修改-->
              <img src="../../../../static/img/company/wechat/activitysheet/retire.png" alt="">
            </span>
          </div>
        </div>
      </div>
      <div class="addNurse clearfix">
        <a href="javascript:;" class="clearfix fr">
          <span class="fr">信息提示</span>
          <img src="/static/img/nurse/sampling/nurseAdd.png" class="fr" alt="">
        </a>
      </div>
      <form action="" method="post">
        <ul class="searchChoice">
          <li class="clearfix">
            <span class="fl">检测序号</span>
            <input type="text" class="fr" placeholder="请输入要查询检测序号" v-model="test_code" v-on:change="GetUser">
          </li>
          <li class="clearfix">
            <span class="fl">姓名</span>
            <input type="text" class="fr" placeholder="请输入要查询姓名" v-model="name" v-on:blur="QuerybyName">
          </li>
          <li class="clearfix removeBottomBorder">
            <span class="fl">身份证号</span>
            <input type="text" class="fr" placeholder="请输入要查询身份证" v-model="IDNo">
          </li>

        </ul>
        <a href="javascript:;" class="samplingBtn" @click="GetUser" >确定</a>
        <!--<a href="javascript:;" class="samplingBtn resetBtn" @click="Reset">重置</a>-->
        <!--<input type="button" value="确定" class="samplingBtn" @click="GetUser">-->
        <!--<input type="button" value="重置" class="samplingBtn resetBtn" @click="Reset">-->
      </form>
      <!--添加护士-->
      <div v-if="ifShow" class="addNurseBox">
        <div class="mengban"></div>
        <div class="addNurseNote">
          <ul class="clearfix">
            <li class="alertMeg fl">添加护士</li>
            <li class="fr">
              <img src="/static/img/company/wechat/activitysheet/alertIcon.png" alt="">
            </li>
          </ul>
          <div class="addPhone">请您输入要添加的护士手机号：</div>
          <div class="addNursePhone">
            <input type="text">
          </div>
          <div class="clearfix addNurseBtn">
            <a href="javascript:;" class="cancel fr">取消</a>
            <a href="javascript:;" class="add fr">添加</a>
          </div>
        </div>
      </div>
      <!--邀请护士信息-->
      <div v-else class="receiveMsg">
        <div class="mengban"></div>
        <div class="addNurseNote">
          <ul class="clearfix">
            <li class="alertMeg fl">添加护士 </li>
            <li class="fr">
              <img src="/static/img/company/wechat/activitysheet/alertIcon.png" alt="">
            </li>
          </ul>
          <div class="addPhone">您好，<span class="inviter">XX</span>护士邀请您参加与<span class="activityItem"></span>体检活动</div>
          <div class="addNursePhone">
            <input type="text">
          </div>
          <div class="clearfix invitationBtn">
            <a href="javascript:;" class="cancel fr">取消</a>
            <a href="javascript:;" class="confirm fr">确定</a>
          </div>
        </div>
      </div>

      <div v-show="isShow" class="sales_choiceActivityBg">
        <div class="sales_choiceActivity">
          <ul>
            <li class="clearfix" v-for="(Activity,index) in Activities">
              <input type="radio" name="activity" class="fl"  v-model="picked" v-on:click="Selected(index)" v-on:focus="Selected2 "  v-bind:value="index">
              <span class="fl">{{Activity.activity_time+Activity.address}}</span>
            </li>

          </ul>
        </div>
      </div>
      <div v-if="isShow_user"class="sales_choiceActivityBg">
        <div class="sales_choiceActivity">
          <ul>
            <li class="clearfix" v-for="(user,index2) in users">
              <input type="radio" name="user" class="fl"  v-model="picked_user" v-on:click="Selected_user(index2)" v-on:focus="Selected2_user "  v-bind:value="index2">
              <span class="fl">{{user.name+": "+user.IDNo}}</span>
            </li>

          </ul>
        </div>
      </div>
    </section>
    <!--标题结束-->
    <footerpart></footerpart>

    <alertTiming ref="alertTiming1" :content="alertContent">  </alertTiming>
  </section>
</template>
<script>
  import headerpart from '../../company/wechat/headerpart';
  import footerpart from '../footerpart';
  import axios from 'axios'
  import {mapState,mapMutations} from 'vuex'
  import alertTiming from '../../alertTiming';

  import Vue from 'vue'
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"现场采样",
        ifShow: false,
        isShow: false,
        isShow_user: false,
        test_code:'',
        IDNo:'',
        name:'',
        picked:'',
        picked_user:'',
        activity:{
            projects:'',
            activity_time:'',
            address:'',
            activity_id:'',
            companyName:'',
            organization_id:'',
            feedback_state:0
        },
        Activities:[{
          activity_id:'',
          activity_time:'',
          address:'',
          projects:'',
          companyName:'',
          organization_id:'',
          feedback_state:0
        }],
         users:[{
            name:'',
            userId:'',
            IDNo:''
         }],
          user:{
              name:'',
              userId:'',
              IDNo:''
          },
        alertContent:'',
          i:0,
          j:0

      }
    },
      computed: {
          ...mapState([
              'activityInfo'
          ]),
      },
    mounted:function(){
        if(this.activityInfo ==null) {
//            let validity = 30;
//            let now = new Date();
//            now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
//            document.cookie = "userId=" + "5943a6ec9d84099d2dce033a" + ";expires=" + now.toGMTString();
            //this.GetActivity();
            this.GetAllDayActivities();
        }
        else {
            this.activity=this.activityInfo;
        }
    },
    created:function(){

    },
    components:{
      headerpart,
      footerpart,
      alertTiming
    },
  methods:{
      ...mapMutations([
          'RECORD_USERINFO',
          'RECORD_ACTIVITYINFO',
          'RECORD_COMPANYINFO',

      ]),

      QuerybyName(){
          var vm=this;

          axios.get('/wechat/nurse/getUserbyName',{ params:{name: this.name,activity_id:this.activity.activity_id} })
              .then(function (response) {
//        this.TodayActivities=JSON.parse(response.data);
                  console.log("response：")
                //  console.log(response.data)

                  var i = 0;

                  vm.users.splice(0, vm.Activities.length)
                  if (response.data != null && response.data.result != "02") {

                      for (var i = 0; i < response.data.length; i++) {

                          vm.users.push(response.data[i]);

                      }
                      vm.isShow_user=true;
                  }
                  else {
                      vm.alertContent=response.data.name;
                      vm.$refs.alertTiming1.Show();
                  }
              })
              .catch(function (response) {
                  console.log("error response：")
                  console.log(response);
              });

      },


    Selected(index){
      let vm=this;
      this.i=index
       let k=index

        console.log("this.Activities[%d]",k,this.Activities[k])
        console.log("this.Activities[k].projects",this.Activities[k].projects)
       this.activity.projects=this.Activities[k].projects;

       this.activity.activity_time=this.Activities[k].activity_time
       this.activity.address=this.Activities[k].address
       this.activity.activity_id=this.Activities[k].activity_id
       this.activity.companyName=this.Activities[k].companyName
        this.activity.organization_id=this.Activities[k].organization_id;
       this.activity.feedback_state=this.Activities[k].feedback_state;

        let activityInfo=this.activity;
        this.RECORD_ACTIVITYINFO( activityInfo)
        let companyInfo={};
        companyInfo.companyName=this.activity.companyName;
        companyInfo.organization_id= this.activity.organization_id;
       this.RECORD_COMPANYINFO(companyInfo)
       setTimeout(function(){
           vm.isShow=false;
           if(vm.activity.feedback_state==1)
           {
               vm.alertContent="本场活动已经结束，不可以再采样";
               vm.$refs.alertTiming1.Show();

           }
       },100)


    },
      Selected2(){
          this.picked=this.picked+' '
      },
      Selected_user(index2){
          let vm=this;
          this.i=index2
          let k=index2
          this.user.name=this.users[k].name;
          this.user.IDNo=this.users[k].IDNo;
          this.user.userId=this.users[k].userId;
          setTimeout(function(){
              vm.isShow_user=false;
              vm.GetUser();
          },100);




      },
      Selected2_user(){
          this.picked_user=this.picked_user+' '
      },



    async activityModify(){

     this.GetAllDayActivities();
      console.log("activities",this.Activities)
      this.isShow=true;

    },

     Reset(){
      this.test_code=''
      this.IDNo=''
      this.name=''
    },

    GetAllDayActivities(){
      var vm=this;

      axios.get('/wechat/nurse/getAllDayActivities')
        .then(function (response) {
//        this.TodayActivities=JSON.parse(response.data);
          console.log("response：")
          console.log(response.data)

          var i = 0;

          vm.Activities.splice(0, vm.Activities.length)
          if (response.data != null && response.data.result != "01") {

            for (var i = 0; i < response.data.length; i++) {

              vm.Activities.push(response.data[i]);

            }
            console.log("startid:",vm.Activities[0].activity_id)
            if(vm.picked=='') {
              vm.picked = vm.Activities[0].activity_time + ' ' + vm.Activities[0].address;
              vm.i = 0;
            }
              vm.activity=response.data[0];
           // console.log("vm.activity",vm.activity)
            if(vm.activity.feedback_state==1)
            {
                vm.alertContent="本场活动已经结束，不可以再采样";
                vm.$refs.alertTiming1.Show();

            }


              let activityInfo=vm.activity;
             //  console.log("activityinfo",activityInfo)
             vm.RECORD_ACTIVITYINFO(activityInfo);

              let companyInfo={};
              companyInfo.companyName=vm.activity.companyName;
              companyInfo.organization_id= vm.activity.organization_id;
              vm.RECORD_COMPANYINFO(companyInfo);


          }
        })
        .catch(function (response) {
          console.log("error response：")
          console.log(response);
        });
    },

      //该函数暂时不用
    GetActivity(){
      var vm=this;
      axios.get('/wechat/nurse/getActivities')
        .then(function (response) {

          console.log("response：")
          console.log(response.data)
          vm.activity=response.data;
          console.log(vm.activity)
//          let userInfo={
//            activity_id:response.data._id
//          }
//          this.RECORD_USERINFO(userInfo);

          vm.RECORD_ACTIVITIES_ID(response.data._id)
          this.$router.push('/nurse/checkinfo')
          //            console.log("this.TodayActivities22")
//            console.log(vm.TodayActivities[0])
          //return response.data;

        })
        .catch(function (response) {
          console.log("error response：")
          console.log(response);
        })
    },
    GetUser(){
      let vm=this;

        if(vm.activity.feedback_state==1)
        {
            vm.alertContent="本场活动已经结束，不可以再采样";
            vm.$refs.alertTiming1.Show();
            return;

        }
     // console.log(this.test_code,this.IDNo,this.name)
     axios.get('/wechat/nurse/getUser',{ params:{test_code: this.test_code,IDNo:this.IDNo,userId:this.user.userId,activity_id:this.activity.activity_id} })
        .then(function (response) {
//        this.TodayActivities=JSON.parse(response.data);
          console.log("response：")
          console.log(response.data)
        if(response.data.result=="01" ||response.data.result=="02" || response.data.result=="03")
        {
            console.log("res",response.data.name),
            vm.alertContent=response.data.name;
            vm.$refs.alertTiming1.Show();

        }
        else {

         let userInfo={
              userName:response.data.user.name,
              sex:  response.data.user.sex,
              IDNo:  response.data.user.IDNo,
              tel:  response.data.user.tel,
             projects: response.data.userActivity.projects,
             salesman: response.data.userActivity.salesman,
             userId: response.data.userActivity.userId,
           activity_id: response.data.userActivity.activity_id,
            companyName:vm.activity.companyName,
             organization_id:vm.activity.organization_id
          }
          vm.RECORD_USERINFO(userInfo);

          console.log("userInfo:",userInfo)
          vm.$router.push('/nurse/checkinfo')
   //            console.log("this.TodayActivities22")
//            console.log(vm.TodayActivities[0])
          //return response.data;
        }

        })
        .catch(function (response) {
          console.log("error response：")
          console.log(response);
        })
    },

  }
  }
</script>
<style>
  .wrap{
    height:100%;
    display:-webkit-box;
    -webkit-box-orient:vertical;
  }
 .noContent{
    width:100%;
    height:2.22rem;
  }
  ::-webkit-input-placeholder{
    color: #c4c4c4;
  }
  #nurseSecelteActivites{
    width:12rem;
  }
  .nurseSecelteActivites{
    margin-left:2rem;
  }
  .scrollmycenter{
    height:26.7rem;
    overflow-y: auto;
  }
  .sales_choiceActivityBg{
    /*display: none;*/
    position: absolute;
    left:0;
    top:0;
    width: 18.75rem;
    height:31.3rem;
    background: rgba(0,0,0,0.2);
  }
  .sales_choiceActivity{
    position: absolute;
    left:50%;
    top:50%;
    margin-top:-5rem;
    margin-left:-7.5rem;
    width: 15rem;
    background: #fff;
    padding:1rem  0  1rem  1rem;
  }
  .sales_choiceActivity ul li span{
    margin-top:0.7rem;
    width:80%;
    /*line-height: 1.1rem;*/
  }
  .sales_choiceActivity ul li input{
    width: 1.1rem;
    height: 1.1rem;
    margin:0.525rem 0.9rem 0 0;
  }
  .activitymodify{
    margin-right:0.6rem;
    width: 1.2rem;
    height:1.2rem;
    display: block;
    background: #64aaff;
    color:#fff;
    font-size:0.6rem;
    line-height: 1.2rem;
    text-align: center;
    border-radius: 50%;
  }
  .activitymodify img{
    width:1.2rem;
    height:1.2rem;
  }
  .scrollSampling{
    height:28.7rem;
    overflow-y: auto;
  }
  input::-webkit-input-placeholder{
    text-align: right;
  }
  .noMsg img{
    width: 1.05rem;
    height:0.95rem;
    margin:0.5rem 1.15rem;
  }
  .activitymsg{
    height:3.8rem;
    width:100%;
    background: #fff;
    padding:0.5rem 0;
  }
  .activitymsg .activityDetail{
    padding-left:1.25rem;
  }
  .activitymsg .activityDetail li{
    color:#000;
    font-size:0.7rem;
    height:1.3rem;
    line-height:1.3rem; ;
  }
  .addNurse{
    height:1rem;
    margin-top:0.45rem;
    width:100%;

  }
  .addNurse a{
    height:50%;
  }
  .addNurse a img{
    width: 1.1rem;
    height:1.05rem;
    padding-right:0.25rem;
  }
  .addNurse a span{
    display: block;
    color: #338fff;
    padding-right:0.9rem;
  }
  .searchChoice{
    background: #fff;
    /*height:5rem;*/
    padding:0 1rem;
    margin-top:2.45rem;
  }
  .searchChoice li{
    height:2.5rem;
    border-bottom:1px solid #dddddd;
  }
  .searchChoice li.removeBottomBorder{
    border-bottom:none;
  }
  .searchChoice li span{
    height:2.5rem;
    line-height: 2.5rem;
    font-size:0.7rem;
  }
  .searchChoice li input{
    border:0;
    height:2.5rem;
    width:80%;
    font-size:0.7rem;
  }
  .samplingBtn{
    width:16.65rem;
    height:2.25rem;
    display: block;
    color: #ffffff;
    text-align: center;
    line-height: 2.25rem;
    font-size:1rem;
    margin:2rem auto 0.9rem;
    background: #338fff;
  }
  .resetBtn{
    border:0.075rem solid #338fff;
    background: #fff;
    color:#338fff;
    margin:0 auto 2.45rem;
  }

  .addNurseBox{
    display: none;
  }
  .receiveMsg{
    display: none;
  }
  /*蒙版*/
  .mengban{
    position: fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index: 999;
    background: rgba(0,0,0,0.3);
  }
  /*点击删除按钮显示的内容*/
  .addNurseNote{
    position: absolute;
    left:50%;
    top:50%;
    margin-left:-8rem;
    margin-top:-5rem;
    padding:0.75rem 0.5rem 0.5rem 0.95rem;
    width: 14.925rem;
    height:8.125rem;
    background: #fff;
    z-index: 999;
  }
  .addNurseNote .alertMeg{
    color:#999;
    font-size:0.6rem;
  }
  .addPhone{
    line-height:1rem;
    color:#343434;
    font-size:0.7rem;
    margin-top:1rem;
  }
  .addNursePhone{
    width:15.3rem;
    margin:1.4rem auto;
    border-bottom:1px solid #338fff;
  }
  .addNursePhone input{
    border:0;
  }
  .addNurseBtn a,.invitationBtn a{
    width:3.3rem;
    height:1.55rem;
    font-size:0.7rem;
    text-align: center;
    border-radius: 0.125rem;
    line-height: 1.55rem;
    border:0;
  }
  .addNurseBtn a.add,.invitationBtn a.confirm{
    margin-right:0.9rem;
    color:#fff;
    background: -webkit-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: -o-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: -ms-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background:#338fff;
  }
  .addNurseBtn a.cancel,.invitationBtn a.cancel{
    background: #fff;
    color:#338fff;
    border:0.075rem solid #338fff;
  }
  .addNurseNote img{
    height: 0.8rem;
    width: 0.8rem;
  }

</style>
