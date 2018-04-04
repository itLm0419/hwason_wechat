<template>
  <section class="wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <section>
      <div class="addBlank"></div>
      <div class="companyNameCustomer">{{companyName}} <span class="mentionMsg">实验室接收前客户信息可做修改</span></div>
      <div class="activeContent">
        <!--没有活动显示暂无-->
        <div class="allActive list" v-if="NoActivity">
          <div class="clearfix activityTime">
            <span class="fl"> {{new Date()}}</span>
          </div>
          <div class="clearfix packageSort">
            <a href="javascript:;">
              <div class="fl">
                <ul class="leftIcons">
                  <li class="topLine"></li>
                  <li class="leftIcons"><img src="/static/img/company/wechat/activitysheet/itemIcon.png" alt=""></li>
                  <li class="bottomLine"></li>
                </ul>
              </div>
              <div class="fl" >
                <ul class="rightNoContent" >
                  暂无！
                </ul>
              </div>
            </a>
          </div>
        </div>
        <!--所有活动的显示-->
        <div class="allActive list" v-for="(Activity,index) in Activities">
          <div class="clearfix activityTime">
            <span class="fl"> {{Activity.activity_time}}</span>
            <div class="fr state">{{Activity.sample_status}}</div>
          </div>
          <div class="clearfix packageSort">
            <a href="javascript:;" v-on:click="stateCustomerDetail(index)">
              <div class="fl">
                <ul class="leftIcons">
                  <li class="topLine"></li>
                  <li class="leftIcons"><img src="/static/img/company/wechat/activitysheet/itemIcon.png" alt=""></li>
                  <li class="bottomLine"></li>
                </ul>
              </div>
              <div class="fl" >
                <ul class="rightContent" >
                  <li class="itemDetail">
                    <span class="itemName">{{Activity.projects}}检测</span>
                    <span class="peopleNum">参与人数{{Activity.num}}人</span>
                  </li>
                  <li class="itemAddress">{{Activity.address}}</li>
                </ul>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
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
        title0:"采样客户信息管理",
        companyName:'',
        msg:'',
        Activities:[],
        NoActivity:false

      }
    },
      computed: {
          ...mapState([
              'companyInfo'

          ])
      },
    mounted:function(){
      this.companyName=this.companyInfo.companyName;
      this.GetActivities()
    },
    created:function(){
//          GetTodayActivity();
    },
    components:{
      headerpart,
    },
    methods:{
      ...mapMutations([
        'RECORD_ACTIVITIES_ID'

      ]),
      stateCustomerDetail(index){

        this.RECORD_ACTIVITIES_ID(this.Activities[index].activity_id)
        this.$router.push('/salesman/stateCustomerDetail?feedback_state='+this.Activities[index].feedback_state)
      },
      GetActivities(){
        var vm=this;

        axios.get('/wechat/salesman/customerMsg')
          .then(function (response) {

            console.log("response："+response)
            vm.Activities = [];
            for (let i = 0; i < response.data.length; i++) {

              vm.Activities.push(response.data[i]);
              console.log(vm.Activities);
            }
            if(response.data.length==0) vm.NoActivity=true;
//
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
  .addBlank{
    height:2.2rem;
  }

  .activeContent{
    background: #ecebeb;
  }
  .companyNameCustomer{
    color:#338fff;
    height:1.65rem;
    font-size:0.7rem;
    line-height: 1.65rem;
    text-indent:0.75rem;
    background: #ecebeb;
  }
  .mentionMsg{
    padding-left:0.55rem;
    color:#cd3939;
  }
  .activityTime{
    height:1.1rem;
    line-height: 1.1rem;
    color:#999;
    text-align: left;
    font-size:0.55rem;
    margin-left:0.75rem;
  }
  .activityTime .state{
    padding-right:0.8rem;
    color:#00ac2d;
  }
  .activityTime .singed{
    color:#00ac30;
  }
  .itemDetail span{
    color:#3f3f3f;
    font-size:0.6rem;
    font-weight:bold;
  }
  .rightNoContent{
    padding:0.6rem 0.3rem;
    color:#999
  }
  .itemAddress ,.activeNote{
    color:#999;
    font-size:0.6rem;
    line-height: 1.1rem;
    margin-top: 0.1rem;
  }
  /*一个活动的显示*/
  .packageSort {
    background: #fff;
    height:3.7rem;
    padding-left:0.75rem;
  }
  .packageSort a{
    width:100%;
    height:3.7rem;
    display: block;
  }
  .packageSort .leftIcons img{
    height: 0.85rem;
    width: 0.85rem;
  }
  .packageSort .leftIcons .topLine{
    height:0.5rem;
    width:0.05rem;
    background: #dcdcdc;
    margin-left:0.41rem
  }
  .packageSort .leftIcons .bottomLine{
    height:2.2rem;
    width: 0.05rem;
    background: #dcdcdc;
    margin-left:0.41rem
  }
  .packageSort .rightContent{
    margin:0.67rem 0 0 0.1rem;
  }
</style>
