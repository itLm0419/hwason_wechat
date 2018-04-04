<template>
  <div class="hMian">
    <headerpart :imgaddr="imgaddr0" :title="title0" :userId = "userId" :role="role"></headerpart>
    <div class="addBlank"></div>
    <div class="titleFontStyle">填写常规问卷</div>
    <ul class="healthBindId">
      <li class="clearfix reduceHeight">
        <span class="checkName fl">一、基本信息</span>
      </li>
      <li class="clearfix" >
        <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
        <span class="checkName fl">性别</span>
        <!--<input type="text" @click=chooseSex readonly class="fr" placeholder="请选择您的性别">-->
        <input  name="sex" id="man" class="fr" placeholder="点击选择性别" v-model="sex" readonly @click="showSex=true">

      </li>
      <li class="clearfix">
        <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
        <span class="checkName fl">电话</span>
        <input type="text" v-model="tel" class="fr" placeholder="请输入正确号码"/>
      </li>
      <li class="clearfix">
        <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
        <span class="checkName fl">居住地</span>
        <input type="text" v-model="region" readonly @click="popupVisible=true" placeholder="请选择省/市/县区  〉" class="fr"/>
      </li>
      <li class="detailAddrMsg clearfix removeBorder">
        <div class="clearfix">
          <img src="/static/img/nurse/mustIcon.png" class="fl" alt="">
          <span class="checkName fl" >详细地址</span>
        </div>
        <div>
          <textarea name="" id="" cols="" rows="" v-model="address" placeholder="请输入街道、楼牌号"></textarea>
        </div>
      </li>
    </ul>
    <div class="healthNextBtn" @click = "next">下一步</div>
    <mt-popup v-model="popupVisible" position="bottom" closeOnClickModal  style="width: 101%">
      <div ref="toolbar" class="clearfix regionTitleBox"><div class="cancel-region fl" @click="cancelRegion">取消</div><div class="save-region fr" @click="saveRegion">保存</div></div>
      <mt-picker :slots="addressSlots"  name="速度防守方" class="picker" @change="onValuesChange" :visible-item-count="5"></mt-picker>
    </mt-popup>
    <mt-popup v-model="showSex" class="sexInfoBox">
      <div class="sexInfo clearfix">
        <label for="level1" class="clearfix fl">
          <input type="radio" name="sort3" id="level1" @click="showSex=false" v-model="sex" value="男" class="fl">
          <span class="fl">男</span>
        </label>
        <label for="level2" class="clearfix fl">
          <input type="radio" name="sort3" id="level2" @click="showSex=false" v-model="sex" value="女" class="fl">
          <span class="fl">女</span>
        </label>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import Vue from 'vue'
  import axios from 'axios'
  import api from '../../util/api';
  import s from '../../util/address4';
  export default {
    data(){
      return {
        popupVisible:false,
        imgaddr0: "/static/img/return.png",
        title0:"健康档案问卷",
        sex:"",
        region:"",
        address:"",
        tel:"",
        role:'',
        userId:"",
        showSex:false,
        regionArr:[],
        addressSlots: [
            {
                flex: 1,
                values: [],
                className: 'slot1',
                textAlign: 'center'
            }, {
                divider: true,
                content: '-',
                className: 'slot2'
            }, {
                flex: 1,
                values: [],
                className: 'slot3',
                textAlign: 'center'
            }
            , {
                divider: true,
                content: '-',
                className: 'slot4'
            }, {
                flex: 1,
                values: [],
                className: 'slot5',
                textAlign: 'center'
            }
        ],
      }
    },
    mounted:async function(){
      let UrlSearch = new api.UrlSearch();
      this.userId = UrlSearch.userId;
      this.role = UrlSearch.role;
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
                vm.sex = data.record.sex;
                vm.region = data.record.region;
                vm.address = data.record.address;
                vm.tel = data.record.tel;


                let region = vm.region;
                let arr = [];
                console.log(region)
                if(region){
                    arr = region.split("/");
                }else{
                    arr = ['北京市','市辖区','东城区']
                }
                console.log(s)
                let shengArr = Object.keys(s);
                let shengIndex = shengArr.indexOf(arr[0]);
                let shiArr = Object.keys(s[arr[0]]);
                let shiIndex = shiArr.indexOf(arr[1]);
                let xianArr = s[arr[0]][arr[1]];
                let xianIndex = xianArr.indexOf(arr[2]);
                console.log(shengIndex);
                vm.addressSlots[0].values = shengArr;
                vm.addressSlots[2].values = shiArr;
                vm.addressSlots[4].values = xianArr;
                vm.addressSlots[0].defaultIndex = shengIndex;
                vm.addressSlots[2].defaultIndex = shiIndex;
                vm.addressSlots[4].defaultIndex = xianIndex;
                vm.regionArr = arr;
            })
            //let dom = '<div class="clearfix regionTitleBox"><div class="cancel-region fl">取消</div><div class="save-region fr" @click="saveRegion">保存</div></div>'
//            let dom = vm.$refs.toolbar;
//            let toolbar =  document.getElementsByClassName('picker-toolbar');
//            toolbar[0].append(dom);
        },
        async onValuesChange(picker, values){

//            for(var va of values){
//                if(!va){
//                    return false;
//                }
//            }
            if(s[values[0]]){
                let shiArr = Object.keys(s[values[0]]);
                picker.setSlotValues(1,shiArr);
                if(s[values[0]][values[1]]){
                    let xianArr = s[values[0]][values[1]];
                    picker.setSlotValues(2,xianArr);
                }
            }
            this.regionArr = values;

        },
        saveRegion(){
            let region = "";
            for(let rga of this.regionArr){
                if(rga){
                    region+=rga+"/";
                }
            }
            this.region = region.substr(0,region.length-1);
            this.popupVisible = false;
        },
        cancelRegion(){
            this.popupVisible = false;
        },
      next(){
//            axios.get('/wechat/healthRecord/step999').then(function (response) {
//                console.log(response);
//            });
          var vm = this;
          if(!this.sex||!this.region||!this.address||!this.tel){
            this.$messagebox({
              title:"提示",
              message:"请填写完整信息"
            })
            return false;
          }
        if(!(/^1\d{10}$/.test(this.tel))){
          this.$messagebox({
            title:"提示",
            message:"电话号码不正确"
          })
          return false;
        }
        axios.post('/wechat/healthRecord/step2',
          {params:{
            sex:vm.sex,
            region:vm.region,
            address:vm.address,
            tel:vm.tel,
            userId:vm.userId

          }}).then(function (response) {
          if(response.data.result=="00"){
            window.location.href = "#/relationships?userId="+vm.userId;
          }
        })
      }
    }
  }
</script>
<style>
  .sexInfoBox{
    overflow: hidden;
    border-radius: 0.4rem;
  }
  .sexInfo{
    padding:1rem 0.5rem 1rem 1.2rem ;
  }
  .sexInfo label{
    margin-right:1rem;
  }
  .sexInfo label span{
    padding-left:0.5rem;
  }
  .chooseSex{
    height: 300px;
    width: 300px;
    position: fixed;
    top:100px;
    left: 40px;
    height: 104px;
    background-color:#f4dad5
  }
  .mint-cell{
    background-color:#f4dad5
  }
  .addBlank{
    height: 2.22rem;
  }
  .titleFontStyle{
    height:1.65rem;
    line-height: 1.65rem;
    padding-left:0.75rem;
    font-size:0.55rem;
    color:#338fff;
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
  .healthBindId li.detailAddrMsg{
    height:4.475rem;
  }
  .healthBindId li.detailAddrMsg textarea{
    border:0;
    width:100%;
    height:100%;
    resize: none;
    outline: none;
  }
  #sexInpBox{
    margin:0.8rem 0 0 4rem;
  }
  #sexInpBox div{
    margin-right:3rem;
  }
  #sexInpBox label{
    margin-left:0.7rem;
  }
   #sexInpBox input{
    width:0.8rem;
    height:0.8rem;
  }
  .healthBindId li.reduceHeight{
    height:1.8rem;
  }
  .healthBindId li.removeBorder{
    border:0;
  }
  .healthBindId li span{
    color:#333;
    line-height: 2.475rem;
    font-size:0.7rem;
  }
  .healthBindId li.reduceHeight span{
    line-height:1.8rem;
  }
  .healthBindId li input{
    width:77%;
    height:100%;
    border:0;
  }
  .healthBindId li input.reduceWeight{
    width:63%;
  }
  .healthBindId li.reduceHeight{
    height:1.8rem;
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
    margin:2.6rem auto 0;
    color:#fff;
    font-size:1rem;
    background: #338fff;
  }
  .arrowBtn{
    font-size: 0.8rem;
    color:#666;
    line-height: 2.475rem;
  }
  .regionTitleBox{
    border-bottom:1px solid #d0d0d0;
  }
  .regionTitleBox div{
    padding:0.5rem 2rem;
    line-height: 1rem;
  }
</style>
