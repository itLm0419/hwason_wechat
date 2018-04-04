<template>
  <div class="hMian">
    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <div class="addBlank"></div>
    <div class="titleFontStyle">填写常规问卷</div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle">06、常见肿瘤疾病类 <span>(是否患有下列疾病或曾有过下列症状，可多选)</span></div>
      <ul class="choiceItem clearfix">
        <li class="fl clearfix" v-for="(spt,idx) in symptom">
          <em ref="tumour" @click="choooseSymptom($event,spt)" :class="tumour.indexOf(spt)>=0?'fl changeBgd':'fl'"></em>
          <span class="fl">{{spt}}</span>
        </li>
        <li class="fl clearfix">
          <em ref="showOtherTumour" class="fl" @click="noSymptom($event,'showOtherTumour')"></em>
          <span class="fl">其他</span>
        </li>
        <li class="fl clearfix">
          <em ref="noSymptom" class="fl" @click="noSymptom($event)"></em>
          <span class="fl">无</span>
        </li>
      </ul>
      <div class="showText" v-show="showOtherTumour">
        <textarea name="" id="showText" v-model="otherTumour" cols="" rows="" placeholder="在此输入文字"></textarea>
      </div>
    </div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle">07、其他类 <span>(若是有未提及的疾病或曾有症状，可备注)</span></div>
      <textarea name="" id="" v-model="otherDiseases"  cols="" rows="" placeholder="在此输入文字"></textarea>
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
        symptom:["肝癌","胃癌","肺癌","食管癌","甲状腺癌","结直肠癌","胰腺癌","鼻咽癌","乳腺癌","宫颈癌"],
        tumour:[],
        otherTumour:"",
        otherDiseases:"",
        showOtherTumour:false
      }
    },
    mounted:function(){
        let UrlSearch = new api.UrlSearch();
        this.userId = UrlSearch.userId;
        console.log(this.userId);
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
                let data = response.data;
                console.log(data);
                vm.tumour = data.record.tumour;
                vm.otherDiseases = data.record.otherDiseases;
                for(let tm of vm.tumour){
                    if(vm.symptom.indexOf(tm)<0){
                        vm.otherTumour = tm
                    }
                }
            })
            console.log(vm.tumour,22222);
        },
        choooseSymptom(event,spt){
            var vm = this;

            if(event.srcElement.className.indexOf("changeBgd")>0){
                var index = vm.tumour.indexOf(spt);
                vm.tumour.splice(index,1)
                event.srcElement.className = "fl"
            }else{
                vm.tumour.push(spt);
                event.srcElement.className = "fl changeBgd"
                this.$refs.noSymptom.className = 'fl';
            }
            console.log(vm.tumour)
        },
        noSymptom(event,showOtherTumour){
            var vm = this;
            if(event.srcElement.className.indexOf("changeBgd")>0){
                event.srcElement.className = "fl";
                if(showOtherTumour){
                    vm.showOtherTumour = false;
                    vm.otherTumour = ""
                }
            }else{
                event.srcElement.className = "fl changeBgd";
                if(showOtherTumour){
                    this.$refs.noSymptom.className = 'fl';
                    vm.showOtherTumour = true;
                }else{
                    let doms = this.$refs.tumour
                    for(let dom of doms){
                        dom.className = 'fl';
                    }
                    vm.tumour = [];
                    vm.showOtherTumour =false;
                    vm.otherTumour = "";
                    this.$refs.showOtherTumour.className = 'fl';
                }
            }
        },
        next(){
            var vm = this;
            if(vm.otherTumour){
                vm.tumour.push(vm.otherTumour);
            }
            axios.post('/wechat/healthRecord/step7', {
                params: {
                    tumour: vm.tumour,
                    otherDiseases: vm.otherDiseases,
                    userId: vm.userId
                }
            }).then(function (response) {
                if (response.data.result == "00") {
                    window.location.href = "#/mediaclHistory5?userId=" + vm.userId;
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
  .choiceItem li em.changeBgd{
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
</style>
