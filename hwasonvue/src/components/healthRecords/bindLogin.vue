<template>
  <div class="hMian">
    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <div class="hBannerBox">
      <img src="/static/img/healthRecords/hbanner.png" alt="">
    </div>
    <ul class="healthBindId">
      <li class="clearfix" >
        <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
        <span class="checkName fl">E晟卡号</span>
        <input type="text" v-model="cardNo" class="fr" placeholder="请输写正确卡号" @focus="changePos2" @blur="changePos" />
      </li>
      <li class="clearfix" >
        <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
        <span class="checkName fl">密码</span>
        <input type="password" v-model="password" class="fr" placeholder="请输写正确信息" @focus="changePos2" @blur="changePos"/>
      </li>
      <li class="clearfix">
        <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
        <span class="checkName fl">姓名</span>
        <input type="text" v-model="name" class="fr" placeholder="请输入您的真实姓名" @focus="changePos2" @blur="changePos"/>
      </li>
      <li class="clearfix">
        <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
        <span class="checkName fl">身份证号</span>
        <input type="text" v-model="IDNo" class="fr" placeholder="请输入您真实证号" @focus="changePos2" @blur="changePos"/>
      </li>
      <li class="clearfix removeBorder">
        <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
        <span class="checkName fl">健康服务专员工号</span>
        <input type="text" v-model="salesmanNo" class="fr reduceWeight" @focus="changePos3" @blur="changePos4" placeholder="请输写正确信息"/>
      </li>
    </ul>
    <div class="healthNextBtn" @click="healthNext">下一步</div>
  </div>
</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import Vue from 'vue'
  import axios from 'axios'
  import api from '../../util/api'
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"新档案",
          cardNo:"",
          password:"",
          name:"",
          IDNo:"",
          salesmanNo:"",

      }
    },
    mounted:function(){
        let UrlSearch = new api.UrlSearch();
        this.userId = UrlSearch.userId;
        if(this.userId){
            this.init();
        }
    },
    created:function(){

    },
    components:{
      headerpart,
    },
    methods:{
        init(){
            console.log(333)
            var vm = this;
            axios.get("/wechat/healthRecord/queryInfo",
                {params:{
                    userId:vm.userId
                }}).then(function (response) {
                    console.log(response)
                let data = response.data;
                vm.cardNo = data.record.cardNo.toUpperCase();
                vm.password = data.record.password;
                vm.name = data.record.name;
                vm.IDNo = data.record.IDNo;
                vm.salesmanNo = data.salesman.userName;
                vm.complete = data.record.complete;
                api.setCookie("userRecordId",null)
            })
        },
        healthNext(){
            var vm = this;
            axios.get('/wechat/healthRecord/isComplete',{params:{cardNo:vm.cardNo.toUpperCase()}}).then(function (response) {
                if(!response.data){
                    vm.next();
                }else{
                    vm.$messagebox({
                        title:"提示",
                        message:"信息已填写完整，不可更改"
                    })
                    return false;
                }
            })
        },

        changePos(event){
            event.srcElement.className = 'fr'
        },

        changePos2(event){
            event.srcElement.className = 'fr ipChangePos'
        },

        changePos3(event){
            event.srcElement.className = 'fr ipChangePos reduceWeight'
        },

        changePos4(event){
            event.srcElement.className = 'fr reduceWeight'
        },

        next(){
            var vm = this;
            if(!vm.cardNo||!vm.password||!vm.name||!vm.IDNo||!vm.salesmanNo){
                vm.$messagebox({
                    title:"提示",
                    message:"请填写完整信息"
                });
                return false;
            }
            if(!/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(vm.IDNo)&&!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(vm.IDNo)){
                vm.$messagebox({
                    title:"提示",
                    message:"身份证号码不正确"
                });
                return false;
            }
            axios.post('/wechat/healthRecord/register',
                {
                    params:{
                        cardNo:vm.cardNo.toUpperCase(),
                        name:vm.name,
                        password:vm.password,
                        IDNo:vm.IDNo,
                        salesmanNo:vm.salesmanNo
                    }

                }
            ).then(function (response) {
                console.log(response);
                if(response.data.result == "02"){
                    vm.$messagebox({
                        title:"提示",
                        message:"卡号或密码不正确"
                    })
                }else if(response.data.result == "03"){
                    vm.$messagebox({
                        title:"提示",
                        message:"健康服务专员工号不存在"
                    })
                }else if(response.data.result == "00"){
                    window.location.href = "#/baseMsg?userId="+response.data.userId;
                }else if(response.data.result == "04"){
                    vm.$messagebox({
                        title:"提示",
                        message:"该卡已被其他用户使用"
                    })
                }else if(response.data.result == "05"){
                    vm.$messagebox({
                        title:"提示",
                        message:"信息已填写完整，不可更改"
                    })
                    return false;
                }
            })
        }
    }
  }
</script>
<style>

  .hBannerBox img{
    width:100%;
    height: 10.3rem;
    margin:2.2rem 0 0.8rem 0;
  }
  .healthBindId{
    width:100%;
    background:#fff ;
  }
  .healthBindId li{
    width:17.25rem;
    height:2.475rem;
    margin-left:0.75rem;
    border-bottom:1px solid #dcdcdc;
  }
   .healthBindId li.removeBorder{
       border:0;
   }
  .healthBindId li span{
    color:#333;
    line-height: 2.475rem;
    font-size:0.7rem;
  }
  .healthBindId li input{
    width:77%;
    height:100%;
    border:0;
    text-indent:0.2rem;
    text-align: right;
  }
  .healthBindId li input.reduceWeight{
    width:63%;
  }
  .healthBindId li input.ipChangePos{
    text-align: left;
  }
  .healthBindId li img{
    height: 0.45rem;
    width: 0.45rem;
    margin: 1rem 0.2rem 0 0
  }
  .healthNextBtn{
    width:16.65rem;
    height:2.25rem;
    text-align: center;
    line-height: 2.25rem;
    margin:1.6rem auto 0;
    color:#fff;
    font-size:1rem;
    background: #338fff;
  }
</style>
