<template>
  <div class="hMian">
    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <div class="addBlank"></div>
    <div class="titleFontStyle">填写常规问卷</div>
    <ul class="personalMedical">
      <li class="clearfix reduceHeight">
        <span class="checkName fl">二、个人疾病史</span>
      </li>
      <li class="clearfix" >
        <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
        <span class="checkName fl">身高</span>
        <em class="fr">cm</em>
        <input type="text" v-model="height" class="fr" placeholder="请输入您的身高">
      </li>
      <li class="clearfix">
        <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
        <span class="checkName fl">体重</span>
        <em class="fr">kg</em>
        <input type="text" v-model="weight" class="fr" placeholder="请输入您的体重"/>
      </li>
      <li class="clearfix">
        <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
        <span class="checkName fl">定期健康体检习惯</span>
        <div id="examBox" class="fl">
          <div class="clearfix fl"><input type="radio" name="regularTest"  class="fl" v-model="regularTest" value="是"><label  class="fl">是</label></div>
          <div class="clearfix fl"><input type="radio" name="regularTest"  class="fl" v-model="regularTest" value="否"><label  class="fl">否</label></div>
        </div>
      </li>
      <li class="clearfix removeBorder">
        <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
        <span class="checkName fl">近五年居住的区域</span>
        <div id="sexInpBox" class="fl">
          <div class="clearfix fl"><input type="radio" name="recentResidence" class="fl" v-model="recentResidence" value="城镇"><label  class="fl">城镇</label></div>
          <div class="clearfix fl"><input type="radio" name="recentResidence"  class="fl" v-model="recentResidence" value="农村"><label  class="fl">农村</label></div>
        </div>
      </li>
    </ul>
    <div class="personalMedicalChoice">
      <div class="medicalTitle">01、心脑血管疾病类 <span>(是否患有下列疾病或曾有过下列症状，可多选)</span></div>
      <ul class="choiceItem clearfix">
        <li class="fl clearfix" v-for="(spt,index) in symptom">
          <em  ref="symptom"  @click="choooseSymptom($event,spt)" :class="cardioCerebrovascular.indexOf(spt)>=0?'fl changeBg':'fl'"></em>
          <span class="fl">{{spt}}</span>
        </li>
        <li class="fl clearfix">
        <em ref="noSymptom" class="fl" @click="noSymptom($event)" ></em>
        <span class="fl">无</span>
      </li>
      </ul>
    </div>
    <div class="healthNextBtn2" @click="next">下一步</div>
    <!--<mt-popup-->
            <!--v-model="popupVisible"-->
            <!--position="bottom">-->
    <!--</mt-popup>-->
  </div>
</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import Vue from 'vue'
  import axios from 'axios'
  import api from '../../util/api';
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"健康档案问卷",
        popupVisible:true,
        symptom:["高血压症","高血脂症","中风","心悸","冠心病","气短","水肿","头晕","夜间阵发性呼吸困难","胸闷不适","发绀","胸骨后的压迫性或紧缩性疼痛","嗳气","咳嗽咯血","恶心","呕吐"],
        cardioCerebrovascular:[],
          height:"",
          weight:"",
          regularTest:"",
          recentResidence:""
      }
    },
    mounted:function(){
        let UrlSearch = new api.UrlSearch();
        this.userId = UrlSearch.userId;
        this.init();
    },
    created:function(){

    },
    components:{
     headerpart
    },
    methods:{
        init(){
            var vm = this;
            axios.get("/wechat/healthRecord/queryInfo",
                {params:{
                    userId:vm.userId
                }}).then(function (response) {
                console.log(response)
                let data = response.data;
                vm.height = data.record.height;
                vm.weight = data.record.weight;
                vm.regularTest = data.record.regularTest;
                vm.recentResidence = data.record.recentResidence;
                vm.cardioCerebrovascular = data.record.cardioCerebrovascular;
            })
        },
        choooseSymptom(event,spt){
            var vm = this;

            if(event.srcElement.className.indexOf("changeBg")>0){
                var index = vm.cardioCerebrovascular.indexOf(spt);
                vm.cardioCerebrovascular.splice(index,1)
                event.srcElement.className = "fl"
            }else{
                vm.cardioCerebrovascular.push(spt);
                event.srcElement.className = "fl changeBg"
                this.$refs.noSymptom.className = 'fl';
            }
            console.log(vm.cardioCerebrovascular)
        },
        noSymptom(){
            if(event.srcElement.className.indexOf("changeBg")>0){
                event.srcElement.className = "fl"
            }else{
                event.srcElement.className = "fl changeBg"
                let doms = this.$refs.symptom
                for(let dom of doms){
                    dom.className = 'fl';
                }
                this.cardioCerebrovascular = [];
            }
        },
        next(){
            var vm = this;
            if(!vm.height||!vm.weight||!vm.regularTest||!vm.recentResidence){
                vm.$messagebox({
                    title:"提示",
                    message:"请填写完整信息"
                })
                return false;
            }
            if(isNaN(vm.height)){
                vm.$messagebox({
                    title:"提示",
                    message:"身高请填数字"
                })
                return false;
            }
            if(isNaN(vm.weight)){
                vm.$messagebox({
                    title:"提示",
                    message:"体重请填数字"
                })
                return false;
            }

            axios.post('/wechat/healthRecord/step4',{params:{
                height:vm.height,
                weight:vm.weight,
                regularTest:vm.regularTest,
                recentResidence:vm.recentResidence,
                cardioCerebrovascular:vm.cardioCerebrovascular,
                userId:vm.userId
            }}).then(function (response) {
                if(response.data.result == "00"){
                    window.location.href = "#/mediaclHistory2?userId="+vm.userId;
                }
            })
        }
    }
  }
</script>px
<style>
  #sexInpBox{
    margin:0.8rem 0 0 0.375rem;
  }
  #sexInpBox div{
    margin-right:2.4rem;
  }
  #sexInpBox label{
    margin-left:0.7rem;
  }
  #sexInpBox input{
    width:0.8rem;
    height:0.8rem;
  }
  #examBox{
    margin:0.8rem 0 0 0.375rem
  }
  #examBox div{
    margin-right:3rem;
  }
  #examBox label{
    margin-left:0.7rem;
  }
  #examBox input{
    width:0.8rem;
    height:0.8rem;
  }
  .addBlank{
    width: 100%;
    height: 2.2rem;
  }
  .titleFontStyle{
    height:1.65rem;
    line-height: 1.65rem;
    padding-left:0.75rem;
    font-size:0.55rem;
    color:#338fff;
  }
  .personalMedicalChoice{
    margin-top:0.75rem;
    width:100%;
    background: #fff;
  }
  .medicalTitle{
    padding:0 0.9rem 0.5rem;
    color:#333;
    font-size:0.7rem;
    line-height: 1.5rem;
    border-bottom:1px solid #ddd;
    margin-bottom:1rem;
  }
  .medicalTitle span{
    color:#ed3f3f;
    font-size:0.7rem;
  }
  .personalMedical{
    width:100%;
    background:#fff ;
  }
  .personalMedical li{
    width:17.25rem;
    height:2.475rem;
    margin-left:0.75rem;
    border-bottom:1px solid #dcdcdc;
  }
  .personalMedical li.detailAddrMsg textarea{
    border:0;
    width:100%;
    height:100%;
    resize: none;
    outline: none;
  }
  .personalMedical li.reduceHeight{
    height:1.8rem;
  }
  .personalMedical li.removeBorder{
    border:0;
  }
  .personalMedical li span{
    color:#333;
    line-height: 2.475rem;
    font-size:0.7rem;
  }
  .personalMedical li.reduceHeight span{
    line-height:1.8rem;
  }
  .personalMedical li input{
    width:25%;
    height:100%;
    border:0;
  }
  .personalMedical li em{
    line-height: 2.475rem;
    padding-left:0.3rem;
    color:#666;
  }
  .personalMedical li.reduceHeight{
    height:1.8rem;
  }
  .personalMedical li img{
    height: 0.45rem;
    width: 0.45rem;
    margin: 1rem 0.2rem 0 0
  }
  .healthNextBtn2{
    width:16.65rem;
    height:2.25rem;
    text-align: center;
    line-height: 2.25rem;
    margin:1rem auto;
    color:#fff;
    font-size:1rem;
    background: #338fff;
  }
  .choiceItem{
    padding-left:0.875rem;
  }
  .choiceItem li{
    margin:0 0.875rem 1.25rem 0;
  }
  .choiceItem li em{
    width:1rem;
    height: 1rem;
    margin-right:0.375rem;
    background: url('../../../static/img/healthRecords/check1.png') no-repeat;
    background-size:cover ;
  }
  .choiceItem li em.changeBg{
    background: url('../../../static/img/healthRecords/check2.png') no-repeat;
    background-size:cover ;
  }
  .choiceItem li span{
    font-size:0.7rem;
  }
</style>
