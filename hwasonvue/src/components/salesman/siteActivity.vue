<template>
  <section class="wrap" id="wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
     <section>
         <div class="addBlank"></div>
      <div class="companyName">
        {{companyName}}<span class="mentionMsg">点击客户栏进入修改</span>
      </div>
      <!--客户信息的呈现-->
      <ul class="siteActBox">
        <li class="noActMsg" v-show="isShowNoMsg">暂无用户！</li>
        <li class="clearfix" v-for="(Activity,index) in Activities">
          <a href="javascript:;" @click="GotoDetail(index,Activity.feedback_state)">
            <img src="/static/img/salesman/user.png" alt="" class="fl">
            <div class="fl ">
              <div class="usermsg clearfix">
                <span class="userName fl">{{Activity.name}}</span>
                <span class="sex fl">{{Activity.sex}}</span>
                <span class="number fl">{{Activity.test_number}}</span>
              </div>
              <div class="package">{{Activity.projects}}</div>
            </div>
            <div v-bind:class="{'fr unChecked':Activity.checked=='未核对',
            'fr checked':Activity.checked=='未采样',
            'fr sampled':Activity.checked=='已采样'}">
                {{Activity.checked}}</div>
          </a>
        </li>
      </ul>
         <div class="addCustomerBtn" v-on:click="AddCustomer">+ 客户信息登记</div>
    </section>
    <!--标题结束-->
  </section>
</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import Vue from 'vue'
  import axios from 'axios'
  import {mapState,mapMutations} from 'vuex'
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"体检用户登记",
        companyName:'',
        checkClass:'fr unChecked',
        isShowNoMsg:false,
        Activities:[{
          name: '',
          sex: '',
          projects: '',
          checked: false,
          activity_id:'',
          user_id:'',
          id:'',
          test_number:0
        }],
        Activity:{}

        }

  },
    mounted:function(){
      this.companyName=this.companyInfo.companyName;
      let userInfo=null;
      let projectInfo=null;
      this.RECORD_PROJECTINFO(projectInfo)
      this.RECORD_USERINFO(userInfo)
      this.GetAllsiteActivities()
    },
    created:function(){

    },
   computed:{
       ...mapState([
           'companyInfo'

       ])
        },
    components:{
      headerpart
    },
    methods:{
      ...mapMutations([
        'RECORD_USERACTIVITIES_ID',
        'RECORD_USER_ID',
        'RECORD_PROJECTINFO',
        'RECORD_USERINFO'

      ]),
        AddCustomer(){

         this.$router.push('/salesman/addCustomer')
        },
      GotoDetail(index,feedback_state){
      this.RECORD_USERACTIVITIES_ID(this.Activities[index].id)
      this.RECORD_USER_ID(this.Activities[index].user_id)
      this.$router.push('/salesman/customerDetail?feedback_state='+feedback_state)
      //  console.log(this.Activities[index].user_id)
      },

      GetAllsiteActivities(){
        var vm=this;
        axios.get('/wechat/salesman/siteActivity')
          .then(function (response) {
              if(response.data==''){
                  vm.isShowNoMsg=true;
                  vm.addCustomer='';
              }
//        this.TodayActivities=JSON.parse(response.data);
            console.log("response：")
            console.log(response.data)
            // console.log(this.TodayActivities)
            var i = 0;
            console.log("len:" + vm.Activities.length)
//            for ( i = 0; i < vm.Activities.length+2; i++) {
//             // vm.Activities.pop()
//              vm.Activities.splice(0,vm.Activities.length)
//            }
            vm.Activities.splice(0, vm.Activities.length)
            if (response.data != null && response.data.result != "01") {

              for (var i = 0; i < response.data.length; i++) {

                vm.Activities.push(response.data[i]);
                //  vm.Activities[i]=response.data[i];

              }

            }
          })
          .catch(function (response) {
            console.log("error response：")
            console.log(response);
          });
      },
    }
  }
</script>
<style>
  .addBlank{
        height:2.2rem;
    }

  .noActMsg{
    padding-top:1rem;
    font-size:0.8rem;
  }
  .siteActBox{
    background: #fff;
    padding-bottom:1rem;
  }
  .mentionMsg{
    padding-left:0.55rem;
    color:#cd3939;
  }
  .siteActBox{
    height:23.9rem;
    padding:0 0.75rem;
    overflow-y: scroll;
  }
  /*.siteActBox li{
      height: 2.75rem;
      padding-top:0.75rem;
      border-bottom:1px solid #dcdcdc;
  }*/
  .siteActBox li a{
    height: 2.75rem;
    padding-top:0.75rem;
    border-bottom:1px solid #dcdcdc;
    display: block;
  }
  .siteActBox li img{
    width:0.75rem;
    height:0.85rem;
  }
  .siteActBox li .usermsg{
    margin:0 0 0.5rem 0.4rem;
    /*width:3.75rem;*/
  }
 /* .siteActBox li .usermsg .sex{
    padding-left:0.5rem;
  }*/
  .siteActBox li .usermsg .number{
      padding-left:1.5rem;
      font-weight: bold;
      color:#cd3939;
      font-size:0.7rem;
  }
  .siteActBox li .package{
    margin-left:0.4rem;
  }
  .siteActBox li .unChecked{
    color:#cd3939;
  }
  .siteActBox li .checked{
    color:#237e09;
  }
  .siteActBox li .sampled{
    color:#338fff;
  }
  .addCustomerBtn{
    position:absolute;
    bottom:2rem;
    left:50%;
    margin-left:-8.325rem;
    width:16.65rem;
    height:2.25rem;
    background:#338fff;
    color:#fff;
    line-height: 2.25rem;
    text-align: center;
    font-size:1rem;
  }
  .userName{
      width:3rem;
  }
</style>
