<template>
  <div class="hMian">
    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <div class="addBlank"></div>
    <div class="titleFontStyle">填写常规问卷</div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle">02、消化系统疾病类 <span>(是否患有下列疾病或曾有过下列症状，可多选)</span></div>
      <ul class="choiceItem clearfix">
        <li class="fl clearfix" v-for="(spt,idx) in symptom1">
          <em ref="digestiveSystem"  @click="choooseSymptom1($event,spt)" :class="digestiveSystem.indexOf(spt)>=0?'fl changeBg':'fl'"></em>
          <span class="fl">{{spt}}</span>
        </li>
        <li class="fl clearfix">
          <em ref="noSymptom1" class="fl" @click="noSymptom1($event)"></em>
          <span class="fl">无</span>
        </li>
      </ul>

    </div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle">03、呼吸系统疾病类 <span>(是否患有下列疾病或曾有过下列症状，可多选)</span></div>
      <ul class="choiceItem clearfix">
        <li class="fl clearfix"  v-for="(spt,idx) in symptom2">
          <em ref="respiratorySystem" @click="choooseSymptom2($event,spt)" :class="respiratorySystem.indexOf(spt)>=0?'fl changeBg':'fl'"></em>
          <span class="fl">{{spt}}</span>
       </li>
        <li class="fl clearfix">
          <em ref="noSymptom2" class="fl" @click="noSymptom2($event)"></em>
          <span class="fl">无</span>
        </li>
      </ul>
    </div>
    <div class="healthNextBtn2" @click="next">下一步</div>
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
          symptom1: ["消化性胃溃疡","胃炎","胃下垂","食管炎","食管贲门失弛缓症","肝炎","肝硬化","胰腺炎","胆囊炎","便秘","胆石症","长期腹泻"],
          symptom2:["支气管炎","肺炎","肺结核","哮喘","慢性阻塞性肺疾病","肺心病","长期咳嗽","吐痰","咳血","胸痛","呼吸困难"],
         digestiveSystem:[],
          respiratorySystem:[]
      }
    },
    mounted:function(){
        let UrlSearch = new api.UrlSearch();
        this.userId = UrlSearch.userId;
        this.init();
        window.scrollTo(0, 0);
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
                vm.digestiveSystem = data.record.digestiveSystem;
                vm.respiratorySystem = data.record.respiratorySystem;
            })
        },
        choooseSymptom1(event,spt){
            var vm = this;

            if(event.srcElement.className.indexOf("changeBg")>0){
                var index = vm.digestiveSystem.indexOf(spt);
                vm.digestiveSystem.splice(index,1)
                event.srcElement.className = "fl"
            }else{
                vm.digestiveSystem.push(spt);
                event.srcElement.className = "fl changeBg"
                this.$refs.noSymptom1.className = 'fl';
            }
            console.log(vm.digestiveSystem)
        },
        choooseSymptom2(event,spt){
            var vm = this;

            if(event.srcElement.className.indexOf("changeBg")>0){
                var index = vm.respiratorySystem.indexOf(spt);
                vm.respiratorySystem.splice(index,1)
                event.srcElement.className = "fl"
            }else{
                vm.respiratorySystem.push(spt);
                event.srcElement.className = "fl changeBg"
                this.$refs.noSymptom2.className = 'fl';
            }
            console.log(vm.respiratorySystem)
        },
        noSymptom1(event){
            if(event.srcElement.className.indexOf("changeBg")>0){
                event.srcElement.className = "fl"
            }else{
                event.srcElement.className = "fl changeBg"
                let doms = this.$refs.digestiveSystem
                for(let dom of doms){
                    dom.className = 'fl';
                }
                this.digestiveSystem = [];
            }
        },
        noSymptom2(event){
            if(event.srcElement.className.indexOf("changeBg")>0){
                event.srcElement.className = "fl"
            }else{
                event.srcElement.className = "fl changeBg"
                let doms = this.$refs.respiratorySystem
                for(let dom of doms){
                    dom.className = 'fl';
                }
                this.respiratorySystem = [];
            }
        },
        next(){
            var vm = this;
            axios.post('/wechat/healthRecord/step5', {
                params: {
                    digestiveSystem: vm.digestiveSystem,
                    respiratorySystem: vm.respiratorySystem,
                    userId: vm.userId
                }
            }).then(function (response) {
                if (response.data.result == "00") {
                    window.location.href = "#/mediaclHistory3?userId=" + vm.userId;
                }
            })
        }
    }
  }
</script>
<style>
  .titleFontStyle{
    height:1.65rem;
    line-height: 1.65rem;
    padding-left:0.75rem;
    font-size:0.55rem;
    color:#338fff;
  }
  .personalMedicalChoice2{
    width:100%;
    background: #fff;
    margin-bottom:0.8rem;
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
  .healthNextBtn2{
    width:16.65rem;
    height:2.25rem;
    text-align: center;
    line-height: 2.25rem;
    margin:1rem auto ;
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
    margin-right:0.5rem;
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
