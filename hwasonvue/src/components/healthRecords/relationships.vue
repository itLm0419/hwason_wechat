<template>
  <div class="hMian">
    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <div class="addBlank"></div>
    <div class="titleFontStyle">填写常规问卷</div>
    <div class="addRelationsBox">
      <ul class="healthBindId addMarginBottom" v-for="(re,idx) in relative">
        <li class="clearfix" >
          <span class="checkName fl">关系人</span>
          <input type="text" v-model="re.relationship" class="fr" @click="showRelations(idx)" readonly placeholder="请填写所属关系">
        </li>
        <li class="clearfix" >
          <span class="checkName fl">姓名</span>
          <input type="text" v-model="re.name" class="fr" placeholder="请输写相关人姓名">
        </li>
        <li class="clearfix removeBorder">
          <span class="checkName fl">身份证号</span>
          <input type="text" v-model="re.IDNo" class="fr" placeholder="请输入所属人证号"/>
        </li>
        <div class="removeBtn" @click="relative.splice(idx,1)"><img height="18px" width="18px" src="../../../static/img/healthRecords/remove.jpg"></div>
      </ul>
    </div>
    <div class="positionBtns">
      <div class="addRelationsBtn" @click = addRelative>+ 添加关系人</div>
      <div class="healthNextBtn" @click="next">下一步</div>
    </div>
    <mt-popup v-model="popupVisible">
      <div class="relatives">
        <div class="perMedicalBox clearfix">
          <label for="level4_1" class="clearfix fl">
            <input type="radio" name="sort3" id="level4_1" @click="chooseRelation" v-model="relation" value="父亲" class="fl">
            <span class="fl">父亲</span>
          </label>
          <label for="level4_2" class="clearfix fl">
            <input type="radio" name="sort3" id="level4_2" @click="chooseRelation" v-model="relation" value="母亲" class="fl">
            <span class="fl">母亲</span>
          </label>
          <label for="level4_3" class="clearfix fl">
            <input type="radio" name="sort3" id="level4_3" @click="chooseRelation" v-model="relation" value="配偶" class="fl">
            <span class="fl">配偶</span>
          </label>
          <label for="level4_4" class="clearfix fl">
            <input type="radio" name="sort3" id="level4_4" @click="chooseRelation" v-model="relation"  value="子女" class="fl">
            <span class="fl">子女</span>
          </label>
        </div>
      </div>
    </mt-popup>
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
          popupVisible:true,
          imgaddr0: "/static/img/return.png",
          title0:"关系人",
          relative:[{relationship:"",name:"",IDNo:""}],
          IDNo:"",
          relation:"",
          index:0
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
                if(data.record.relatives.length>0){
                    vm.relative = data.record.relatives;
                }
            })
        },
        showRelations(index){
          this.popupVisible = true;
          this.index = index;
        },
        chooseRelation(){
            var vm = this;
            setTimeout(function () {
                vm.relative[vm.index].relationship = vm.relation;
                vm.popupVisible=false;
            },1)
        },
        addRelative(){
            if(this.relative.length>=5){
                vm.$messagebox({
                    title:"提示",
                    message:"最多可添加5位关系人"
                })
                return false
            }
            this.relative.push({relationship:"",name:"",IDNo:""})
        },
        next(){
          var vm = this;
        for(let re of vm.relative){
            if(!re.relationship||!re.name||!re.IDNo){
              vm.$messagebox({
                title:"提示",
                message:"请填写完整信息"
              })
              return false;
            }
            if(!/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(re.IDNo)&&!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(re.IDNo)){
            vm.$messagebox({
              title:"提示",
              message:re.name+"的身份证号码不正确"
            })
            return false;
          }
        }
        console.log(vm.relative);
        axios.post('/wechat/healthRecord/step3',{params:{userId:vm.userId,relatives:vm.relative}})
          .then(function (response) {
              if(response.data.result == "00"){
                window.location.href = "#/mediaclHistory?userId="+vm.userId;
              }
          })
      }
    }
  }
</script>
<style>
  .relatives{
    width: 12rem;
    padding:1rem;
  }
  .relatives input{
    height: 0.8rem;
    width: 0.8rem;
    margin-right:0.3rem;
  }
  .relatives label{
    width:25%;
  }
  .relatives span{
    /*padding:0 0.5rem;*/
  }
  .titleFontStyle{
    height:1.65rem;
    line-height: 1.65rem;
    padding-left:0.75rem;
    font-size:0.55rem;
    color:#338fff;
  }
  .addRelationsBox{
    width:100%;
    height: 17rem;
    overflow-y: scroll;
  }
  .healthBindId{
    width:100%;
    background:#fff ;
    position:relative;
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
.addMarginBottom{
    margin-bottom:0.5rem;
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
  }
  .positionBtns{
   /* width:100%;
    position: absolute;
    left:0;
    bottom:1.5rem;*/
  }
  .healthNextBtn{
    width:16.65rem;
    height:2.25rem;
    text-align: center;
    line-height: 2.25rem;
    margin:1.5em auto 0;
    color:#fff;
    font-size:1rem;
    background: #338fff;
  }
  .removeBtn{
    width:2.0rem;
    height:1.5rem;
    text-align: center;
    line-height: 0.5rem;
    color:#fff;
    font-size:0.2rem;
    position:absolute;
    top:-0.0rem;
    right:-0.5rem;
  }
  .addRelationsBtn{
    width:16.65rem;
    height:2.25rem;
    text-align: center;
    line-height: 2.25rem;
    margin:0 auto;
    border:1px solid #338fff;
    color:#338fff;
    font-size:1rem;
    background: #fff;
  }
  .addBlank{
    height: 2.2rem;
  }
</style>
