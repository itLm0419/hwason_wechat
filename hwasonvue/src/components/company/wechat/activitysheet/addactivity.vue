<template>
  <div>
  <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>
  <section class="main">
    <div class="addBlank"></div>
    <div class="comTitle clearfix">
      <div class="company fl">{{companyName}}</div>
      <div class=" company tips fr">签约套餐，不可改。</div>
    </div>
   <!-- <validator na.upOrDownListme="validation"> -->
     <form >
      <div class="contentBox">
        <ul class="modContent">
          <li class="clearfix">
            <div>体检套餐</div>
             <input type="text" placeholder="选择检测项目" name="item" style="" v-model="projects" readonly="true">
          </li>
          <li class="clearfix" v-on:click="setDate2">
            <div>活动时间</div>
            <div  class="actTime fr"  >{{date}}</div>
            <!--<input type="text" name="datetime" placeholder="请选择时间"  v-model="date" >-->
          </li>
          <li class="clearfix">
            <div>活动地点</div>
            <input type="text" name="address" placeholder="请输入详细地址" v-model="address">
          </li>
          <li class="clearfix">
            <div>预计人数</div>
            <input type="text" name="peopleNum" v-model="estimated_number" placeholder="请输入数字" v-on:blur="ValidateNumeric" v-on:focus="ValidateNumeric2" >
          </li>
          <li class="clearfix">
            <div>安排护士数</div>
            <input type="text" name="peopleNum"  v-model="nurse_number" placeholder="请输入数字" v-on:blur="ValidateNumeric" v-on:focus="ValidateNumeric2" >
          </li>
          <li class="noteBox removeBorder">
            <div>备注</div>
          </li>
          <li class="removeBorder">
            <textarea name="note" id="note" class="note"  v-model:value="remark"></textarea>
          </li>
           <div><p  v-if="msg !=''" class="format" >{{msg}}</p>
           </div>
        </ul>
      </div>
    </form>
  <!--  </validator> -->
  </section>
    <div class="btnBox">
      <input type="button" name="submit" class="login" value="提交" v-on:click="saveActivity">
    </div>
    <alertTiming ref="alertTiming1" :content="alertContent">  </alertTiming>

    <transition name="fade">
      <div v-show="show">
        <com-calendar
                :startYear="startYear"
                :endYear="endYear"
                :month="month"
                :year="year"
                :day="day"
                :hour="hour"
                :min="min"
                :onOk="onOk"
                :onCancel="onCancel"
                v-on:hide="hide"
        ></com-calendar>
        <div  class='mark'></div>
        <p></p>
      </div>
    </transition>

  </div>
</template>
<script>
  import headerpart from "../headerpart"
  import {mapState,mapMutations} from 'vuex'
  import alertTiming from '../../../alertTiming';

  import calendarComponent from '../../../common/datepicker/calendar.vue'
  import m from  '../../../../../static/css/style.scss'
  import s from  '../../../../../static/css/calendar.scss'
  import axios from 'axios'


 export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:'添加活动',
        companyName:'',
        organization_id:'',
        date:'请选择时间',
        projects:[],
        address:'',
        estimated_number:null,
        nurse_number:null,
        remark:'',
        telphone:'',
        comment:'',
        validation:{},
        msg:'',

          show:false,
          startYear:2000,
          endYear:2050,
          year:(new Date).getFullYear(),
          month:((new Date).getMonth()+1),
          day:(new Date).getDate(),
          hour:(new Date).getHours(),
          min:0,
          onOk:function () {},
          onCancel:function (){},
          isShow:false,
          picked:'',
          alertContent:'',
          isNumok:false,
          isTimeok:false,
          year_init:'',
          month_init:'',
          day_init:'',
          isSubmit:false
      }
    },
    mounted:function(){
      this.GetProjects();

     if(this.companyInfo !=null)
     {
         this.companyName=this.companyInfo.companyName;
        this.organization_id=this.companyInfo.organization_id;
     }
     if(this.activityInfo !=null)
     {
         this.day_init=this.activityInfo.date;
         this.year_init=this.activityInfo.year;
         this.month_init=this.activityInfo.month;
     }
    },
    components:{
      headerpart,
     comCalendar:calendarComponent,
     alertTiming
    },
     computed: {
         ...mapState([
             'companyInfo',
             'activityInfo',
             'projectInfo',

         ])
     },
    methods: {
        GetProjects(){
           let vm=this;
            axios.get('/wechat/activitysheet/activity/GetProjects',{params:{organization_id:this.companyInfo.organization_id }})
               .then(function (response) {
                   vm.projects=response.data;
                   console.log("projects",vm.projects)

                })
                .catch(function (response) {
                    console.log("error response：")
                    console.log(response);
                })
        },

        hide(){
            this.show =false
        },
      ValidateNumeric(){
        if((/^[-+]?[0-9]+$/.test(this.estimated_number)))
        {this.msg='';
         this.isNumok=true;}
        else
        {
            this.msg="请输入数字，谢谢";
            this.isNumok=false;
        }

      },
        ValidateNumeric2(){

          this.msg=""

        },
      // 保存活动
      saveActivity () {

            let vm=this;
            console.log(this.year,this.month,this.day,this.hour,this.min)
            console.log(this.date);
            console.log(new Date() instanceof Date);
            if(this.date =="请选择时间"|| this.address==''||this.isNumok==false) {
                console.log("edit")
                vm.alertContent="请填写完整再提交";
                vm.$refs.alertTiming1.Show();
                return;
            }

          if(vm.isSubmit==true) {
              vm.alertContent="提交不要重复数据，请耐心等待处理";
              vm.$refs.alertTiming1.Show();
              return;

          }
          vm.isSubmit=true;

             axios.post('/wechat/activitysheet/activity/addactivity', {
              projects:this.projects.split("+"),
              activity_time:this.date,
              address:this.address,
              remark:this.remark,
              estimated_number:this.estimated_number,
              nurse_number:this.nurse_number
          })
              .then(function (response) {
                  console.log(response);
                  vm.isSubmit=false;
                  if(response.data.result=="00")
                  {
                      vm.alertContent="保存成功";
                      vm.$refs.alertTiming1.Show();
                      setTimeout(function(){vm.$router.go(-1);},2000)
                  }
                  else {
                      vm.alertContent="保存失败";
                      vm.$refs.alertTiming1.Show();
                  }
              })
              .catch(function (response) {
                  vm.isSubmit=false;
                  console.log(response);
              });

      },

      setDate(){
        let vm = this;
          this.show=true;
           vm.onOk =function(date){
            vm.date= date.year+'-'+date.month+'-'+date.day+' '+date.hour+':'+date.min;
           // console.log('确定')
          };
          vm.onCancel =function(){
          //  console.log('取消')
          };

//        this.$calendar.show({
//          onOk(date){
//            console.log(date)
//            vm.date= date.year+'-'+date.month+'-'+date.day+' '+date.hour+':'+date.min;
//            console.log('确定')
//          },
//          onCancel(){
//            console.log('取消')
//          }
//        })
      },
      setDate2(){
        let vm = this;
        let a= (new Date()).getMonth()+1
          this.show=true;
          vm.onOk=function(date){
              if(date.min == 0){
                  date.min = "00"
              }
            vm.date= date.year+'-'+date.month+'-'+date.day+' '+date.hour+':'+date.min;
            console.log(date)
            console.log('确定123')
          }
          vm.onCancel=function(){

          }

          if(vm.year_init !='' && vm.month_init !='')
          {
              this.year=vm.year_init;
              this.month=vm.month_init;
              this.day=vm.day_init;

          }
          else {
              this.year=(new Date).getFullYear()
              this.month=((new Date).getMonth()+1)
              this.day=(new Date).getDate()
          }

          this.hour=(new Date).getHours(),
          this.min=0
//        this.$calendar.show({
//          onOk(date){
//            vm.date= date.year+'-'+date.month+'-'+date.day+' '+date.hour+':'+date.min;
//            console.log(date)
//            console.log('确定123')
//          },
//          onCancel(){
//            console.log('取消123')
//          },
//          year:(new Date).getFullYear(),
//          month:((new Date).getMonth()+1),
//          day:(new Date).getDate(),
//          hour:(new Date).getHours(),
//          min:0
//        })
      }
    }

  }

</script>
<style >
  .content{
    margin-top:2.22rem;
  }
  input::-webkit-input-placeholder{
    text-align: right;
  }
  /*公司的名称显示*/
  .comTitle{
    background: #ebebeb;
  }
  .company{
    font-size:0.55rem;
    color:#338fff;
    height:1.65rem;
    line-height: 1.65rem;
    margin-left:0.75rem;
  }
.tips{
  color:#e90001;
}
  /*添加的主体的容器*/
  .contentBox{
    background: #fff;
  }
  /*主体内容*/
  .modContent{
    width:17.25rem;
    margin: auto;
    background: #fff;
  }
  .modContent  input::-webkit-input-placeholder{
    text-align: right;
  }
  .modContent  input{
    text-align: right;
  }
  .modContent li{
    height:2.8rem;
    width:17.25rem;
    border-bottom:1px solid #dcdcdc;
  }
  .modContent div,.modContent input{
    float:left;
    color:#3f3f3f;
  }
  .modContent div{
    color:#3f3f3f;
    font-size:0.7rem;
    line-height: 2.8rem;
  }
  .modContent input{
    border: none;
    height:2.7rem;
    width:69%;
    margin-left:1rem;
    font-size:0.7rem;
  }
  .contentBox .modContent .actTime{
    float:right;
    margin-right:1.6rem;
  }
  .note{
    /*width:18.75rem;*/
    height:2.475rem;
    outline: none;
    border:0;
    resize : none;
    display: block;
    margin-left:-0.2rem;
  }
  .modContent li.removeBorder{
    border:0;
    /*width:18.75rem;*/
    background: #fff;
  }
  .noteBox{
    width:18.75rem;
    background: #fff;
  }
  .noteBox p{
    color:#3f3f3f;
    font-size:0.7rem;
  }
  /*按钮的容器*/
  .btnBox{
    width:16.6rem;
    margin: 0 auto;
  }
  .btnBox input{
    width:16.6rem;
    height:2.25rem;
    font-size:1rem;
    border-radius: 0.125rem;
    border:0;
  }
  /*登录按钮*/
  .btnBox input.login{
    color:#fff;
    margin-top:2.5rem;
    background: #338fff;
  }
  /*重置按钮*/
  .btnBox input.reset{
    background: #fff;
    margin-top:0.75rem;
    color:#338fff;
    border:0.075rem solid #338fff;
  }
  .format{
    color:#9f0000;
    margin-top:0.25rem;
  }
</style>
