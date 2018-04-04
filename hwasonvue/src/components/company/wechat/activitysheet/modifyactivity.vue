<template>
  <div>
  <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>
  <section class="main content">
    <div class="comTitle">
      <div class="companyName">{{companyName}}</div>
    </div>
    <form>
      <ul class="modContent">
        <li class="clearfix">
          <div class="fl">体检套餐</div>
          <input type="text" placeholder="" class="fr" name="item"  v-model="projects" readonly="true">
        </li>
        <li class="clearfix" v-on:click="setDate2">
          <div>活动时间</div>
          <div class="actTime fr">{{date}}</div>
        </li>
        <li class="clearfix">
          <div>活动地点</div>
          <input type="text" name="address" placeholder="请输入详细地址" v-model="address">
        </li>
        <li class="clearfix">
          <div>预计人数</div>
          <input type="text" name="peopleNum" v-model="estimated_number"  v-on:blur="ValidateNumeric" v-on:focus="ValidateNumeric2">
        </li>
        <li class="clearfix">
          <div>安排护士数</div>
          <input type="text" name="peopleNum" v-model="nurse_number"  v-on:blur="ValidateNumeric" v-on:focus="ValidateNumeric2">
        </li>
        <li class="noteBox removeBorder">
          <p>备注</p>
        </li>
        <li class="removeBorder">
          <textarea name="note" id="note" class="note" value="note" v-model="remark"></textarea>
        </li>
      </ul>
    </form>
  </section>
    <div class="btnBox">
      <div>
        <a href="javascript:;" class="login" @click="onSubmit">修改完成</a>
      </div>
      <div>
        <a href="javascript:;" class="reset" v-on:click="onCancelModify">取消修改</a>
      </div>
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
  import axios from 'axios'
  import calendarComponent from '../../../common/datepicker/calendar.vue'
  import m from  '../../../../../static/css/style.scss'
  import s from  '../../../../../static/css/calendar.scss'

  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
          title0:"修改活动",
        companyName:'',
         activity_time:'',
         projects:'',
         address:'',
         estimated_number:0,
         nurse_number:0,
         remark:'',
         date:'',
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
          alertContent:''
      }
    },
    mounted:function(){
      this.companyName=this.companyInfo.companyName;
      this.date=this.activityInfo.activity_time;
      this.projects=this.activityInfo.projects;
      this.address=this.activityInfo.address;
      this.estimated_number=this.activityInfo.estimated_number;
      this.remark=this.activityInfo.remark;
      this.nurse_number=this.activityInfo.nurses.length;
    },
    components:{
      headerpart,
     comCalendar:calendarComponent,
     alertTiming

    },
      computed:{
          ...mapState([
              'companyInfo',
              'activityInfo',
          ]),
      },
    methods: {
        onCancelModify(){
//            console.log("cancel")
            this.$router.go(-1);
        },
        hide(){
            this.show =false
        },
        setDate(){
            let vm = this;
            this.show=true;
            vm.onOk =function(date){
//                console.log(date)
                vm.date= date.year+'-'+date.month+'-'+date.day+' '+date.hour+':'+date.min;
//                console.log('确定')
            };
            vm.onCancel =function(){
//                console.log('取消')
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
                vm.date= date.year+'-'+date.month+'-'+date.day+' '+date.hour+':'+date.min;
//                console.log(date)

            }
            vm.onCancel=function(){

            }
            if(vm.date=='') {
                this.year=(new Date).getFullYear()
                this.month=((new Date).getMonth()+1)
                this.day=(new Date).getDate()
                this.hour=(new Date).getHours(),
                this.min=0
            }
            else {
                this.year= (new Date(vm.date)).getFullYear()
                this.month=(new Date(vm.date)).getMonth()+1
                this.day=(new Date(vm.date)).getDate()
                this.hour=(new Date(vm.date)).getHours()
                this.min=(new Date(vm.date)).getMinutes()

            }

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
        },
        ValidateNumeric(){
            if((/^[-+]?[0-9]+$/.test(this.estimated_number)))
            {this.msg=''}
            else
                this.msg="请输入数字，谢谢"

        },
        ValidateNumeric2(){

            this.msg=""

        },
        onSubmit(){
            let vm=this;
            axios.post('/wechat/activitysheet/activity/modifyactivity', {
                activity_id:this.activityInfo.activity_id,
                activity_time: this.date,
                projects: this.projects,
                address: this.address,
                estimated_number:this.estimated_number,
                nurse_number:this.nurse_number,
                remark:this.remark
            })
                .then(function (response) {
//                    console.log(response);
                    if(response.data.result=="00")
                    {
                        vm.alertContent="保存成功";
                        vm.$refs.alertTiming1.Show();
                        setTimeout(function(){vm.$router.go(-1);},2000)

                    }
                    else {
                        vm.alertContent=response.data.name;
                        vm.$refs.alertTiming1.Show();
                    }
                })
                .catch(function (response) {
//                    console.log(response);
                });
        }

    }

  }
</script>
<style>
  .content{
    margin-top:2.22rem;
  }
  input::-webkit-input-placeholder{
    text-align: right;
  }
  .comTitle{
    background: #ebebeb;
  }
  .companyName{
    font-size:0.7rem;
    color:#338fff;
    height:1.65rem;
    line-height: 1.65rem;
  }
  .modContent{
    width:17.25rem;
    margin: auto;
  }
  .modContent li{
    height:2.8rem;
    width:17.25rem;
    line-height: 2.8rem;
    border-bottom:1px solid #dcdcdc;
  }
  .modContent div{
    color:#3f3f3f;
    font-size:0.7rem;
    line-height: 2.8rem;
    float:left;
  }
  .modContent input{
    float: right;
    border: none;
    height:2.8rem;
    width:69%;
    margin-left:1rem;
    color:#999;
    font-size:0.7rem;
    padding-right:0.1rem;
  }
 .modContent .actTime{
    float:right;
    margin-right:0.5rem;
    color:#999;
  }
  .note{
    width:17.25rem;
    color:#999;
    outline: none;
    border:0;
    resize : none;
  }
  .modContent li.removeBorder{
    border:0;
  }
  .noteBox p{
    color:#3f3f3f;
    font-size:0.7rem;
  }
  .btnBox{
    width:16.6rem;
    margin: 0 auto;
  }
  .btnBox a{
    display: block;
    width:16.6rem;
    height:2.25rem;
    font-size:1rem;
    border-radius: 0.125rem;
    text-align: center;
    line-height: 2.25rem;
  }
  .btnBox input{
    width:16.6rem;
    height:2.25rem;
    font-size:1rem;
    border-radius: 0.125rem;
    border:0;
  }
  .btnBox input.login,.btnBox a.login{
    color:#fff;
    margin-top:1.5rem;
    background: #338fff;
  }
  .btnBox input.reset,.btnBox a.reset{
    background: #fff;
    margin:0.75rem 0 0.5rem;
    color:#338fff;
    border:0.075rem solid #338fff;
  }
</style>
