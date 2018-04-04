<template>
  <div class="hMian">
    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <div class="addBlank"></div>
    <div class="titleFontStyle">填写常规问卷</div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle">三、家族史 <span>(您的父母、兄弟姐妹、子女是否患有下列疾病，可多选)</span></div>
      <ul class="choiceItem clearfix">
        <li class="fl clearfix" v-for="(spt,idx) in symptom">
          <em ref="familyDiseases" @click="choooseSymptom($event,spt)"  :class="familyDiseases.indexOf(spt)>=0?'fl changeBg':'fl'"></em>
          <span class="fl">{{spt}}</span>
        </li>
        <li class="fl clearfix">
          <em ref="otherFamilyDiseases" class="fl" @click="noSymptom($event,'showOtherTumour')"></em>
          <span class="fl">其他</span>
        </li>
        <li class="fl clearfix">
          <em ref="noSymptom" class="fl" @click="noSymptom($event)"></em>
          <span class="fl">无</span>
        </li>
      </ul>
      <div class="showText" v-show="showOtherFamilyDiseases">
        <textarea name="" id="showText" cols="" v-model="otherFamilyDiseases" rows="" placeholder="在此输入文字"></textarea>
      </div>
    </div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle2">四、个人健康状况 <span>(单选)</span></div>
      <div class="medicalSubTitle">01、总体来讲，您的健康状况是 </div>
     <div class="perMedicalBox clearfix">
       <label for="level1_1" class="clearfix fl">
         <input type="radio" name="sort" id="level1_1" v-model="health" value="非常好" class="fl">
         <span class="fl">非常好</span>
       </label>
       <label for="level1_2" class="clearfix fl">
         <input type="radio" name="sort" id="level1_2" v-model="health" value="好"  class="fl">
         <span class="fl">好</span>
       </label>
       <label for="level1_3" class="clearfix fl">
         <input type="radio" name="sort" id="level1_3" v-model="health" value="一般"  class="fl">
         <span class="fl">一般</span>
       </label>
       <label for="level1_4" class="clearfix fl">
         <input type="radio" name="sort" id="level1_4" v-model="health" value="差"  class="fl">
         <span class="fl">差</span>
       </label>
     </div>
    </div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle2">02、您过去一段时间感到疲劳的程度</div>
      <div class="perMedicalBox clearfix">
        <label for="level2_1" class="clearfix fl">
          <input type="radio" name="sort1" id="level2_1" v-model="fatigue" value="无疲劳" class="fl">
          <span class="fl">无疲劳</span>
        </label>
        <label for="level2_2" class="clearfix fl">
          <input type="radio" name="sort1" id="level2_2" v-model="fatigue" value="稍微疲劳" class="fl">
          <span class="fl">稍微疲劳</span>
        </label>
        <label for="level2_3" class="clearfix fl">
          <input type="radio" name="sort1" id="level2_3" v-model="fatigue" value="很疲劳" class="fl">
          <span class="fl">很疲劳</span>
        </label>
        <label for="level2_4" class="clearfix fl">
          <input type="radio" name="sort1" id="level2_4" v-model="fatigue" value="非常疲劳" class="fl">
          <span class="fl">非常疲劳</span>
        </label>
      </div>

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
        symptom:["高血压","糖尿病","冠心病","高脂血症","肥胖","中风","肺癌","肠癌","乳腺癌","肝癌","胃癌"],
        familyDiseases:[],
        otherFamilyDiseases:"",
        health:"",
        fatigue:"",
        showOtherFamilyDiseases:false
      }
    },
    mounted:function(){
        window.scrollTo(0, 0);
    },
    created:function(){
        let UrlSearch = new api.UrlSearch();
        this.userId = UrlSearch.userId;
        this.init();
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
                  let data = response.data;
                  console.log(data);
                  vm.familyDiseases = data.record.familyDiseases;
                  vm.health = data.record.health;
                  vm.fatigue = data.record.fatigue;
                  for(let fd of vm.familyDiseases){
                      if(vm.symptom.indexOf(fd)<0){
                          vm.otherFamilyDiseases = fd
                          let index = vm.familyDiseases.indexOf(fd)
                          vm.familyDiseases.splice(index,1)
                      }
                  }
                  console.log(vm.familyDiseases)
              })
          },
          choooseSymptom(event,spt){
              var vm = this;
              if(event.srcElement.className.indexOf("changeBg")>0){
                  var index = vm.familyDiseases.indexOf(spt);
                  vm.familyDiseases.splice(index,1)
                  event.srcElement.className = "fl"
              }else{
                  vm.familyDiseases.push(spt);
                  event.srcElement.className = "fl changeBg"
                  this.$refs.noSymptom.className = 'fl';
              }
              console.log(vm.familyDiseases)
          },
          noSymptom(event,showOtherTumour){
              var vm = this;
              if(event.srcElement.className.indexOf("changeBg")>0){
                  event.srcElement.className = "fl"
                  if(showOtherTumour){
                      vm.showOtherFamilyDiseases = false;
                      vm.otherFamilyDiseases = ""
                  }
              }else{
                  event.srcElement.className = "fl changeBg"
                  if(showOtherTumour){
                      this.$refs.noSymptom.className = 'fl';
                      vm.showOtherFamilyDiseases = true;
                  }else{
                      let doms = this.$refs.familyDiseases
                      for(let dom of doms){
                          dom.className = 'fl';
                      }
                      vm.familyDiseases = [];
                      vm.showOtherFamilyDiseases =false;
                      vm.otherFamilyDiseases = ""
                      this.$refs.otherFamilyDiseases.className = 'fl';
                  }
              }
          },
          next(){
              var vm = this;
              if(!vm.health||!vm.fatigue){
                  this.$messagebox({
                      title:"提示",
                      message:"请填写完整信息"
                  })
                  return false;
              }
              if(vm.otherFamilyDiseases){
                  vm.familyDiseases.push(vm.otherFamilyDiseases);
              }
              axios.post('/wechat/healthRecord/step8', {
                  params: {
                      familyDiseases: vm.familyDiseases,
                      health: vm.health,
                      fatigue: vm.fatigue,
                      userId: vm.userId
                  }
              }).then(function (response) {
                  if (response.data.result == "00") {
                      window.location.href = "#/mediaclHistory6?userId=" + vm.userId;
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
  .medicalTitle2{
    padding:0.3rem 0.9rem ;
    color:#333;
    font-size:0.7rem;
    line-height: 1.5rem;
    border-bottom:1px solid #ddd;
  }
  .medicalSubTitle{
    padding:0.5rem 0.9rem 0.7rem;
    color:#333;
    font-size:0.7rem;
    line-height: 1rem;
  }
  .medicalTitle span,.medicalTitle2 span{
    color:#ed3f3f;
    font-size:0.7rem;
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
  .personalMedicalChoice2 textarea{
    outline: none;
    resize: none;
    width:90%;
    border:0;
    display: block;
    margin:0 auto;
    height:6.9rem;
  }
  .showText{
    width:95%;
    margin:0 auto;
    border-top:1px solid #ddd;
    padding-top:0.5rem;
  }
  #showText{
    outline: none;
    resize: none;
    width:90%;
    border:0;
    display: block;
    margin:0 auto;
    height:4rem;
  }
  .perMedicalBox{
    padding:0 0.9rem 0;
  }
  .perMedicalBox label{
    margin:1rem 1.5rem 0.5rem 0;
  }
  .perMedicalBox span{
    font-size:0.7rem;
  }
  .perMedicalBox input{
    width:1rem;
    height: 1rem;
    margin-right:0.5rem;
  }
</style>
