<template>
  <section class="wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>
    <section>
      <div class="addBlank"></div>
      <div class="companyName">{{companyName}}</div>
      <form >
        <ul class="addCustomer">
          <li class="clearfix" >
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">体检套餐</span>
            <input type="text" name="medicalPkg" class="fr" v-model="projects" @focus="SelectPkg" placeholder="请选择套餐">
          </li>
          <li class="clearfix">
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">活动</span>
            <input type="text" name="detectionTime" class="fr" v-model="picked" @focus="SelectActivity">
          </li>
          <li class="clearfix">
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">姓名</span>
            <input type="text" name="name" class="fr" v-model="name" placeholder="请输入姓名">
          </li>
          <li class="clearfix">
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">性别</span>
            <!--<input type="text" name="salesmanTel" class="fr" v-model="sex">-->
            <input  name="sex" id="man" class="fr" placeholder="点击选择性别" v-model="picked_sex" readonly @click="popupVisible=true">
          </li>
          <li class="clearfix">
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">身份证号</span>
            <input type="text" name="id" class="fr" v-model="IDNo" v-on:blur="checkId()" placeholder="请输入身份证号">
          </li>
          <li class="clearfix removeBorder">
            <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
            <span class="checkName fl">联系电话</span>
            <input type="text" name="tel" class="fr" v-model="tel" v-on:blur="checkPhone()" placeholder="请输入体检人电话">
          </li>
        </ul>
        <div class="customersubmit" v-on:click="SaveUserInfo">提交</div>
      </form>
      <div v-show="isShow" class="sales_choiceActivityBg">
        <div class="sales_choiceActivity">
          <ul>
            <li class="clearfix" v-for="(Activity,index) in Activities">
              <input type="radio" name="activity" class="fl"  v-model="picked" @click="chooseAc" v-on:change="Selected(index)" v-on:focus="Selected2 "  v-bind:value="Activity.activity_time+' '+Activity.address">
              <span class="fl">{{Activity.activity_time+Activity.address}}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!--标题结束-->
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
    <alertTiming ref="alertTiming1" :content="alertContent">  </alertTiming>
    <alertconfirm ref="alertconfirm1" :content="alertContent" :content2="alertContent2"  :content3="alertContent3"  :content4="alertContent4" v-on:onAlertConfirming="Confirmed">  </alertconfirm>
  </section>
</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import alertconfirm from '../alertconfirm';
  import alertTiming from '../alertTiming';
  import Vue from 'vue'
  import axios from 'axios'
  import {mapState,mapMutations} from 'vuex'
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"添加客户",
        companyName:'',
        alertContent:'',
        alertContent2:'',
        alertContent3:'',
        alertContent4:'',
        isShow:false,
        Activities:[{
          activity_id:'',
          activity_time:'',
          address:'',
          feedback_state:0
        }],
        projects:[],
        category:'',
        activity_time:'',
        address:'',
        name:'',
        sex:'',
        IDNo:'',
        tel:'',
        picked:'',
        i:0,
        test_number:0,
        isSelected:false,
        picked_sex:'',
        isIDNook:false,
        isTelok:false,
        isSubmit:false,
        popupVisible:false

      }
    },
    mounted: function(){
      this.companyName=this.companyInfo.companyName;
      if(this.userInfo!=null) {
        if (this.userInfo.isPkgSelect) {
        this.projects=this.projectInfo.projects;
        this.projects2=this.projectInfo2;
        this.category=this.projectInfo.category;
        this.picked=this.userInfo.data.picked;
        this.name=this.userInfo.data.name;
        this.picked_sex=this.userInfo.data.picked_sex;
        this.IDNo=this.userInfo.data.IDNo;
        this.tel=this.userInfo.data.tel;
        this.Activities=this.userInfo.data.Activities;
        this.i=this.userInfo.data.i;
        this.isIDNook=this.userInfo.data.isIDNook;
      }
      else {
              this.GetActivities();
          }
      } else {
          this.GetActivities();
      }
      for(let i in this.projects){
          if(!this.projects[i]){
              this.projects.splice(i,1)
          }
      }
    },

    created:function(){
//
    },
    components:{
      headerpart,
      alertconfirm,
      alertTiming
    },
    computed: {
      ...mapState([
        'activity_id',
        'user_id',
        'companyInfo',
        'projectInfo',
        'projectInfo2',
        'userInfo'
      ]),
      },
    methods:{
      ...mapMutations([
        'RECORD_USERINFO'

      ]),
        chooseAc(){
          if(this.Activities.length==1){
              this.isShow = false;
          }
        },
        ValidatePhone(){
            if( !(/^1[0-9]{10}$/.test(this.phone))){
                this.msg="手机号码格式不对!";
                this.isPhoneok=false;
            }
            else {this.isPhoneok=true;}
        },
        checkId(){
            if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(this.IDNo)){
                this.msg='身份证号码格式有误！'
                this.alertContent=this.msg;
                this.$refs.alertTiming1.Show();
                this.isIDNook=false;
            }
            else {
                this.isIDNook=true;
            }
        },
        checkPhone(){
            if(!/^1[3|4|5|8][0-9]\d{8}$/.test(this.tel)){
                this.msg='手机号码格式有误！';
                this.alertContent=this.msg;
                this.$refs.alertTiming1.Show();
                this.isTelok=false;
            }
            else {
                this.isTelok=true;
            }
        },

        Confirmed(){
            this.$router.go(-1)
        },
      Selected(index){

          this.i=index
          this.isShow=false
          this.isSelected=false;

      },
      Selected2(){
      this.picked=this.picked+' '
      },
      SelectActivity(){
        this.GetActivities();
        this.isSelected=true;
      },
      SelectPkg(){
       let userInfo={};
       let data={};
       data.picked=this.picked;
       data.name=   this.name;
       data.picked_sex=   this.picked_sex;
       data.IDNo=  this.IDNo;
       data.tel=   this.tel;
       data.isIDNook= this.isIDNook;
       data.Activities= this.Activities;
       data.i=this.i;
       userInfo.data=data;
       userInfo.isPkgSelect=true;
       this.RECORD_USERINFO(userInfo);
       this.$router.push('/salesman/medicalPackage');
      },

      GetActivities(){
        var vm=this;

        axios.get('/wechat/salesman/getTodayActivity')
          .then(function (response) {
            var i = 0;

            vm.Activities.splice(0, vm.Activities.length)

              if(response.data.length==0)
              {
                  vm.alertContent="当天没有活动，请先安排活动";
                  vm.$refs.alertTiming1.Show();
              }
            else if (response.data.length>0 && response.data.result != "01") {

              for (var i = 0; i < response.data.length; i++) {

                vm.Activities.push(response.data[i]);

              }
              if(vm.picked=='') {
                vm.picked = vm.Activities[0].activity_time + ' ' + vm.Activities[0].address;
                vm.i = 0;
              }
              if(vm.isSelected) vm.isShow=true

            }
          })
          .catch(function (response) {
            console.log("error response：")
            console.log(response);
          });
      },
        SaveUserInfo()
        {
            let vm=this;
            let k=this.i;
            let j;

            if(vm.Activities[k].feedback_state==1)
            {
                vm.alertContent="本场活动已经结束，不可以再采样,请核实活动场次是否正确";
                vm.$refs.alertTiming1.Show();

            }

          for(j=0;j<this.projects.length;j++) {
                if(this.projects[j]=="") this.projects.splice(j,1)
          }
          if(this.picked==''||this.picked_sex==''||this.projects.length==0|| this.name.length<2||this.isIDNook==false) {
              this.alertContent="添加用户不成功,请核实信息填写完整！";
              this.$refs.alertTiming1.Show();
              return;

          }
            if(vm.isSubmit==true) {
                vm.alertContent="提交不要重复数据，请耐心等待处理";
                vm.$refs.alertTiming1.Show();
                return;

            }
            let projects = [];
            for(let pro of this.projects){
                let arr = pro.split("+");
                for(let ar of arr){
                    if(projects.indexOf(ar)<0){
                        projects.push(ar)
                    }
                }
            }
           vm.isSubmit=true;
            for(let pro of this.projects2){
                if(pro.content.indexOf("呼吸道疾病检测系列")>=0&&pro.content.indexOf("肺部疾病检测系列")>=0){
                    pro.num = pro.num-2;
                }
            }
         axios.post('/wechat/salesman/addCustomer', {
          IDNo:this.IDNo,
          name:this.name,
          sex:this.picked_sex,
          tel:this.tel,
          birthday:this.IDNo.slice(6,14),
          activity_id:this.Activities[k].activity_id,
          projects:projects,
          projects2:this.projects2,
           category:this.category
          })
            .then(function (response) {
                vm.isSubmit=false;

             // console.log(response);
              if(response.data.result=='01'||response.data.result=='02'||response.data.result=='06')
              {
                  vm.alertContent=response.data.name;
                  vm.$refs.alertTiming1.Show();
                  return;
              }
              vm.test_number=response.data.test_number;
              vm.alertContent="用户添加成功。"
              vm.alertContent2="您的序号是 ";
              vm.alertContent3=vm.test_number.toString();
              vm.alertContent4="请记住序号用于抽血时需要";
              vm.$refs.alertconfirm1.Show();


            })
            .catch(function (response) {
                vm.isSubmit=false;
              console.log(response);
            });
        }

    }
  }
</script>
<style>
  .addBlank{
    height:2.2rem;
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
  #wrap{
    background: #ebebeb;
  }
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
  .addCustomer{
    width:100%;
    background:#fff ;
  }
  .addCustomer li{
    width:17.25rem;
    height:2.475rem;
    margin-left:0.75rem;
    border-bottom:1px solid #dcdcdc;
  }
   li.removeBorder{
       border:0;
   }
  .addCustomer li span{
    color:#333;
    line-height: 2.475rem;
    font-size:0.7rem;
  }
  .addCustomer li input{
    width:71%;
    height:100%;
    border:0;
  }
  .addCustomer li img{
    height: 0.45rem;
    width: 0.45rem;
    margin: 1rem 0.2rem 0 0
  }
  .customersubmit{
    width:16.65rem;
    height:2.25rem;
    line-height: 2.25rem;
    text-align: center;
    margin:3.3rem auto 0;
    background: #338fff;
    color:#fff;
    font-size:1rem;
  }
  .addCustomer .sexInpBox{
    margin:0.8rem 0 0 4rem;
  }
  .sexInpBox div{
    margin-right:3rem;
  }
  .addCustomer .sexInpBox label{
      margin-left:0.7rem;
  }
  .addCustomer .sexInpBox input{
    width:0.8rem;
    height:0.8rem;
  }
</style>
