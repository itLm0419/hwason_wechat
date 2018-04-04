<template>
  <section class="wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>
    <section class="">
      <div class="content2"></div>
      <div class="companyName2">{{companyName}}</div>
      <form >
        <div class="activitymsg">
          <!--默认活动的显示-->
          <div class="clearfix" >
            <ul class="activityDetail fl" >
              <li>当前活动：</li>
              <li>{{activity.activity_time}}</li>
              <li>{{activity.address}}</li>
            </ul>
            <div class="fr">
              <!--<a href="javascript:;" class="activitymodify" v-on:click="activityModify">修改</a>-->
              <span class="activitymodify" v-on:click="activityModify">
                <img src="../../../static/img/company/wechat/activitysheet/retire.png" alt="">
              </span>
            </div>
          </div>
        </div>

        <ul class="examinationNext">
          <!--<li class="clearfix" >-->
            <!--<img src="/static/img/nurse/mustIcon.png" class="fl" alt="">-->
            <!--<span class="checkName fl">活动</span>-->
            <!--<input type="text" name="activity" class="fr">-->
            <!--&lt;!&ndash;<select name="" id="" class="fr activitySelect" v-on:focus="activitySelect" v-model="activity" >&ndash;&gt;-->
              <!--&lt;!&ndash;<option v-for="activity in activities" value="">{{activity.address}}/{{activity.activity_time}}</option>&ndash;&gt;-->
            <!--&lt;!&ndash;</select>&ndash;&gt;-->


          <li class="clearfix" >
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">体检套餐</span>
            <input type="text" name="medicalPackage" v-on:click="medicalPkgSelect" v-model="projects" class="fr">
          </li>
          <li class="clearfix ">
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">姓名</span>
            <input type="text" name="name" class="fr" placeholder="请输入真实姓名" v-model="userName"/>
          </li>
          <li class="clearfix">
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">性别</span>
            <!--<input type="text" name="sex" class="fr" placeholder="请输入男或女" v-model="sex"/>-->
            <div class="sexInpBox fl">
              <div class="clearfix fl"><input type="radio" name="sex" id="man" class="fl" v-model="picked_sex" value="男"><label for="man" class="fl">男</label></div>
              <div class="clearfix fl"><input type="radio" name="sex" id="woman" class="fl" v-model="picked_sex" value="女"><label for="woman" class="fl">女</label></div>
            </div>
          </li>
          <li class="clearfix">
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">身份证号</span>
            <input type="text" name="id" class="fr" placeholder="请输入真实身份证号" v-model="IDNo" v-on:focus="removeMsg" v-on:blur="checkId"/>
          </li>
          <li class="clearfix removeBorder">
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">联系电话</span>
            <input type="text" name="tel" class="fr" placeholder="请输入电话号码" v-model="tel" v-on:focus="removeMsg" v-on:blur="checkPhone"/>
          </li>
          <li class="alertFillAllMsg removeBorder" v-model="alertFillAllMsg">{{alertFillAllMsg}}</li>
        </ul>
        <!--<input type="submit" value="完成" v-on:click="examinationNextOnSubmit" class="examBtn">
        <input type="submit" value="完成" >-->
        <a href="javascript:;" v-on:click="examinationNextOnSubmit" class="examBtn">完成</a>
      </form>

    </section>
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
    <alertTiming ref="alertTiming1" :content="alertContent">  </alertTiming>
    <alertconfirm ref="alertconfirm1" :content="alertContent" :content2="alertContent2"  :content3="alertContent3"  :content4="alertContent4" v-on:onAlertConfirming="Confirmed">  </alertconfirm>

  </section>
</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import Vue from 'vue';
  import axios from 'axios';
  import {mapState,mapMutations} from 'vuex'
  import alertconfirm from '../alertconfirm';
  import alertTiming from '../alertTiming';
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"体检登记",
        companyName:'',
        organization_id:'',
        alertFillAllMsg:'',
        sex:'',
        activities:{},
        medicalPkg:'',
        userName:'',
        IDNo:'',
        tel:'',
       picked:'',
       projects:'',
       category:'',
      isShow:false,
       activity:{
          projects:'',
          activity_time:'',
          address:'',
          activity_id:'',
          feedback_sate:0
          },
       Activities:[{
          activity_id:'',
          activity_time:'',
          address:'',
          projects:'',
         feedback_state:0
          }],
         alertContent:'',
         alertContent2:'',
         alertContent3:'',
         alertContent4:'',
         picked_sex:'男',
         isIDNook:false,
         isPhoneok:false,
         isModify:false,
         isSubmit:false
      }
    },
    computed: {
          ...mapState([
              'userInfo',
              'projectInfo',
              'companyInfo'
          ])
      },
    methods:{
        ...mapMutations([
            'RECORD_USERINFO'


        ]),
        Confirmed(){
            this.$router.go(-1)
        },
        activityModify(){

            this.isModify=true;
            this.GetActivities()
            console.log("activities",this.Activities)


        },
        Selected(index){
             let vm=this;
            this.i=index
            let k=index
            this.activity.projects=this.Activities[k].projects;
            this.activity.activity_time=this.Activities[k].activity_time
            this.activity.address=this.Activities[k].address
            this.activity.activity_id=this.Activities[k].activity_id
            setTimeout(function(){vm.isShow=false;},100);

        },
        Selected2(){
            this.picked=this.picked+' '
        },
      medicalPkgSelect(){
      //  window.location.href="#/medicalPackage?getNum=";
          let userInfo={};

          userInfo.userName=this.userName;
          userInfo.picked_sex=this.picked_sex;
          userInfo.IDNo=this.IDNo;
          userInfo.isIDNook=this.isIDNook;
          userInfo.tel=this.tel;
          userInfo.projects=this.projects;
          userInfo.category=this.category;
          userInfo.isPkgSelect=true;
          userInfo.isModfy=true;
          userInfo.activity=this.activity;
          userInfo.companyName=this.companyName;


          this.RECORD_USERINFO(userInfo)
          console.log("this,userInfo",this.userInfo)
          this.$router.push('/salesman/medicalPackage');
      },
      checkId(){
          if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(this.IDNo)){
            this.alertFillAllMsg='身份证号码格式有误！'
              this.alertContent=this.alertFillAllMsg;
              this.$refs.alertTiming1.Show();
              this.isIDNook=false;
          }
          else this.isIDNook=true;
      },
      checkPhone(){
        if(!/^1[3|4|5|8][0-9]\d{8}$/.test(this.tel)){
          this.alertFillAllMsg='手机号码格式有误！';
            this.alertContent=this.alertFillAllMsg;
            this.$refs.alertTiming1.Show();
          this.isPhoneok=false;
        }
        else this.isPhoneok=true;
      },
      removeMsg(){
        this.alertFillAllMsg='';
      },
      examinationNextOnSubmit(){
          let vm=this;
          console.log("submit",vm.isSubmit)
          if(vm.activity.feedback_state==1)
          {
              vm.alertContent="本场活动已经结束，不可以再采样,请核实活动场次是否正确";
              vm.$refs.alertTiming1.Show();

          }

        if(vm.isSubmit==true) {
            vm.alertContent="不要重复提交数据，请耐心等待处理";
            vm.$refs.alertTiming1.Show();
            return;

        }

        if(this.projects.length==0||this.activity==''||this.userName.length<2||this.isIDNook==false||vm.activity.activity_id==''){
               vm.alertContent="请填写完整信息！";
               vm.$refs.alertTiming1.Show();
               return;

        }else{
            vm.isSubmit=true;
          axios.post( '/wechat/examination/addUser',{
              projects:vm.projects,
              category:vm.category,
              activity_id:vm.activity.activity_id,
              name:vm.userName,
              sex:vm.picked_sex,
              IDNo:vm.IDNo,
              tel:vm.tel
            }
          )
            .then(function (response) {
                vm.isSubmit=false;
                if(response.data.result!='01') {
                    vm.test_number = response.data.test_number;
                    vm.alertContent = "用户添加成功。"
                    vm.alertContent2 = "您的序号是 ";
                    vm.alertContent3 = vm.test_number.toString();
                    vm.alertContent4 = "请记住序号用于抽血时需要";
                    vm.$refs.alertconfirm1.Show();
                    let validity = 1;
                    let now = new Date();
                    now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
                    document.cookie = "serialNo=" + vm.alertContent3 + ";expires=" + now.toGMTString();
                }
                else {
                    vm.alertContent=response.data.name;
                    vm.$refs.alertTiming1.Show();
                }
            })
            .catch(function (response) {
                vm.isSubmit=false;
              console.log(response);
            });
        }

      },
      GetActivities(){
//          业务员工号
        let vm=this;
        axios.get('/wechat/examination/getActivities')
          .then(function (response) {

              vm.Activities.splice(0, vm.Activities.length)

              if(response.data.hasOwnProperty("data"))
              {
                  if(response.data.data.length==0){
                      vm.alertContent="当天没有活动，请与业务员核实活动场次";
                      vm.$refs.alertTiming1.Show();
                      vm.isShow=false;
                      return;
                  } else {
                      if(vm.isModify) vm.isShow=true;
                      for (var i = 0; i < response.data.data.length; i++) {

                          vm.Activities.push(response.data.data[i]);

                      }
                      console.log("startid:",vm.Activities[0].activity_id)
                      if(vm.picked=='') {
                          vm.picked = vm.Activities[0].activity_time + ' ' + vm.Activities[0].address;
                          vm.i = 0;
                      }
                      vm.activity=vm.Activities[0];

                      if(vm.activity.feedback_state==1)
                      {
                          vm.alertContent="本场活动已经结束，不可以再采样,请核实活动场次是否正确";
                          vm.$refs.alertTiming1.Show();

                      }

                      console.log("activity:",vm.activity)
                      console.log("Activities[0]:",vm.Activities[0])
                      vm.companyName=response.data.company.name;

                  }
              }
              else {
                  vm.alertContent=response.data.name;
                  vm.$refs.alertTiming1.Show();
                  return;

              }
             })
          .catch(function (response) {
            console.log(response);
          });
      },
    },
    mounted:function(){
       if(this.projectInfo==null ||!this.userInfo.isPkgSelect)
        {
            this.companyName=this.companyInfo.companyName;
            this.organization_id=this.companyInfo.organization_id;
        }
        else {

            this.projects=this.projectInfo.projects;
            this.category=this.projectInfo.category;
            console.log("projects:",this.projects)

        }

        if(this.userInfo !=null)
        {
            this.userName=this.userInfo.userName;
            this.sex=this.userInfo.picked_sex;
            this.IDNo=this.userInfo.IDNo;
            this.isIDNook=this.userInfo.isIDNook;
            this.tel=this.userInfo.tel;
            this.userId=this.userInfo.userId;
            this.companyName=this.userInfo.companyName;
            this.activity=this.userInfo.activity;


        }
        else {
            this.GetActivities();
        }




//       console.log(this.medicalPkg==''||this.activity==''||this.name==''||this.sex==''||this.id==''||this.tel=='')
    },
    created:function(){
//          GetTodayActivity();
    },
    components:{
      headerpart,
     alertconfirm,
     alertTiming
    }
  }
</script>
<style>
  .sales_choiceActivityBg{
    /*display: none;*/
    position: absolute;
    left:0;
    top:0;
    width: 18.75rem;
    height:33.35rem;
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
    /*line-height: 1.1rem;*/
  }
  .sales_choiceActivity ul li input{
    width: 1.1rem;
    height: 1.1rem;
    margin:0.525rem 0.9rem 0 0;
  }
  .activitymsg{
    height:3.8rem;
    width:100%;
    background: #fff;
    padding:0.5rem 0;
    border-bottom:1px solid #d0d0d0;
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
  /*.activitymodify{
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
  }*/
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
  .companyName2{
    color:#338fff;
    height: 1.65rem;
    font-size:0.7rem;
    line-height: 1.65rem;
    text-indent: 0.75rem;
    background: #ecebeb;
  }
  .choiceSex{
    display: none;
    width:18.75rem;
    height:33.35rem;
    background:rgba(0,0,0,0.3);
    position:absolute;;
    top:0;
    left:0;
  }
  .checkRadioadioSex{
    height:4.6rem;
    width:9.5rem;
    background: #fff;
    /*display: none;*/
    position:absolute;
    top:12rem;
    left:5rem;
    z-index: 999;
  }
  .examinationNext{
    width:100%;
    height: 18rem;
    background: #fff;
  }
  .examinationNext li{
    width:17.25rem;
    height:2.5rem;
    margin-left:0.75rem;
    border-bottom:1px solid #dcdcdc;
  }
  .examinationNext li.checkSex{
    height: 0.4rem;
  }
  .examinationNext li.removeBorder{
    border:0;
  }
  .examinationNext li span{
    color:#333;
    line-height: 2.475rem;
    font-size:0.7rem;
  }
  .examinationNext li input,li .activitySelect{
    width:78%;
    height:100%;
    border:0;
    outline: none;
  }
  .examinationNext li img{
    height: 0.45rem;
    width: 0.45rem;
    margin: 1rem 0.2rem 0 0
  }
  .examBtn{
    width:16.65rem;
    height:2.25rem;
    display: block;
    color: #ffffff;
    font-size:1rem;
    text-align: center;
    border-radius: 0.1rem;
    line-height:2.25rem;
    margin:1.5rem auto 0;
    background: #338fff;
  }
.alertFillAllMsg {
  /*padding-left:3rem;*/
  color:#cd3939;
}
   .sexInpBox{
    margin:0.8rem 0 0 4rem;
  }
  .sexInpBox div{
    margin-right:3rem;
  }
   .sexInpBox label{
    margin-left:0.7rem;
  }
  .examinationNext li .sexInpBox input{
    width:0.8rem;
    height:0.8rem;
  }
</style>
