<template>
  <div class="hMian">
    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <div class="addBlank"></div>
    <div class="titleFontStyle">填写常规问卷</div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle">04、内分泌统疾病类 <span>(是否患有下列疾病或曾有过下列症状，可多选)</span></div>
      <ul class="choiceItem clearfix">
        <li class="fl clearfix" v-for="(spt,idx) in symptom1">
          <em ref="endocrine" @click="choooseSymptom1($event,spt)" :class="endocrine.indexOf(spt)>=0?'fl changeBg':'fl'"></em>
          <span class="fl">{{spt}}</span>
        </li>
        <li class="fl clearfix">
          <em ref="noSymptom1" class="fl" @click="noSymptom1($event)"></em>
          <span class="fl">无</span>
        </li>
      </ul>

    </div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle">05、妇科疾病类 <span>(是否患有下列疾病或曾有过下列症状，可多选，女性必填)</span></div>
      <ul class="choiceItem clearfix">
        <li class="fl clearfix"  v-for="(spt,idx) in symptom2">
          <em ref="gynaecopathia" @click="choooseSymptom2($event,spt)" :class="gynaecopathia.indexOf(spt)>=0?'fl changeBg':'fl'"></em>
          <span class="fl">{{spt}}</span>
       </li>
        <li class="fl clearfix">
          <em ref="noSymptom2" class="fl" @click="noSymptom2($event,'gynaecopathia')"></em>
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
          symptom1: ["垂体瘤","甲状腺功能亢进（甲亢）","甲状腺功能减退（甲减）","甲状腺结节","甲状腺炎","低血糖症","糖尿病","多囊卵巢综合征","骨质疏松症","类风湿性关节炎","痛风"],
          symptom2:["乳腺炎","乳漏症","子宫肌瘤","子宫内膜异位症","卵巢囊肿","月经不调","阴道异常出血"],
          endocrine:[],
          gynaecopathia:[],
          sex:"",
          noGynaecopathia:false
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
                let data = response.data;
                vm.endocrine = data.record.endocrine;
                vm.gynaecopathia = data.record.gynaecopathia;
                vm.sex = data.record.sex;
            })
        },
        choooseSymptom1(event,spt){
            var vm = this;

            if(event.srcElement.className.indexOf("changeBg")>0){
                var index = vm.endocrine.indexOf(spt);
                vm.endocrine.splice(index,1)
                event.srcElement.className = "fl"
            }else{
                vm.endocrine.push(spt);
                event.srcElement.className = "fl changeBg"
                this.$refs.noSymptom1.className = 'fl';
            }
            console.log(vm.endocrine)
        },
        choooseSymptom2(event,spt){
            var vm = this;

            if(event.srcElement.className.indexOf("changeBg")>0){
                var index = vm.gynaecopathia.indexOf(spt);
                vm.gynaecopathia.splice(index,1)
                event.srcElement.className = "fl"
            }else{
                vm.gynaecopathia.push(spt);
                event.srcElement.className = "fl changeBg"
                this.$refs.noSymptom2.className = 'fl';
            }
            console.log(vm.gynaecopathia)
        },
        noSymptom1(event,gynaecopathia){
            var vm = this;
            if(event.srcElement.className.indexOf("changeBg")>0){
                if(gynaecopathia){
                    vm.noGynaecopathia = false
                }
                event.srcElement.className = "fl"
            }else{
                event.srcElement.className = "fl changeBg"
                let doms = this.$refs.endocrine
                for(let dom of doms){
                    dom.className = 'fl';
                }
                this.endocrine = [];
                if(gynaecopathia){
                    vm.noGynaecopathia = true
                }
            }
        },
        noSymptom2(event,gynaecopathia){
            var vm = this;
            if(event.srcElement.className.indexOf("changeBg")>0){
                if(gynaecopathia){
                    vm.noGynaecopathia = false
                }
                event.srcElement.className = "fl"
            }else{
                event.srcElement.className = "fl changeBg"
                let doms = this.$refs.gynaecopathia
                for(let dom of doms){
                    dom.className = 'fl';
                }
                this.gynaecopathia = [];
                if(gynaecopathia){
                    vm.noGynaecopathia = true
                }
            }
        },
        next(){
            var vm = this;
            if(vm.sex=="女"&&!vm.noGynaecopathia&&!vm.gynaecopathia.length){
                vm.$messagebox({
                    title:"提示",
                    message:"妇科疾病，女性必填"
                })
                return false;
            }
            axios.post('/wechat/healthRecord/step6', {
                params: {
                    endocrine: vm.endocrine,
                    gynaecopathia: vm.gynaecopathia,
                    userId: vm.userId
                }
            }).then(function (response) {
                if (response.data.result == "00") {
                    window.location.href = "#/mediaclHistory4?userId=" + vm.userId;
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
