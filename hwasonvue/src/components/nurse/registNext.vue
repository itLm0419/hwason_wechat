<template>
  <div>
    <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>
    <section class="mian">
      <div class="personalMes msgSmall">
        <span class="msgFont">个人信息</span>
        <span class="warnFont">审核过不能修改，请填写真实姓名</span>
      </div>
      <ul class="msgContent">
        <li class="remTopBorder">
          <img src="/static/img/nurse/mustIcon.png" alt="" class="mustIcon fl">
          <div class="titl  fl">真实姓名</div>
          <input type="text" class="fr" name="name" placeholder="请输入身份证真实姓名" v-model="realName">
        </li>
        <li>
          <img src="/static/img/nurse/mustIcon.png" alt="" class="mustIcon fl">
          <div class="fl titl">身份证号</div>
          <input type="text" class="fr" name="id" placeholder="请输入真实身份证号" v-model="IDNo" v-on:blur="checkId()">
        </li>
        <li>
          <img src="/static/img/nurse/mustIcon.png" alt="" class="mustIcon fl">
          <div class="fl titl">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</div>
          <!--<label for="man"><input type="radio" id="man" name="sex">男</label>
          <label for="woman"><input type="radio" id="woman" name="sex">女</label>-->
          <div class="sexInpBox fl">
            <div class="clearfix fl"><input type="radio" name="sex" id="man" class="fl" v-model="picked_sex" value="男"><label for="man" class="fl">男</label></div>
            <div class="clearfix fl"><input type="radio" name="sex" id="woman" class="fl" v-model="picked_sex" value="女"><label for="woman" class="fl">女</label></div>
          </div>
        </li>
        <li class="zoomBox">
          <img src="/static/img/nurse/mustIcon.png" alt="" class="mustIcon fl">
          <div class="fl titl">所在地区</div>
          <!--<input type="text" name="zoom" class="fl zoom">-->
         <!-- <input id="demo1" type="text" class="fl zoom" name="zoom" value=""
                 placeholder="江苏省/南京市/江宁区" v-model="region" >-->
          <div class="fl zoom" @click="setDate2">{{region}}</div>
          <a href="javascript:;" class="fr zoomBtn" name="zoom"> > </a>
        </li>
      </ul>
      <div class="personalMes msgSmall">
        <span class="msgFont">银行信息</span>
        <span class="warnFont">请务必填写正确的信息，首选中国农业银行</span>
      </div>
      <form action="">
        <ul class="msgContent">
          <li class="remTopBorder">
            <div class="titl fl">持卡人</div>
            <input type="text" class="fr" name="person" placeholder="请绑定本人的银行卡" v-model="cardholder">
          </li>
          <li>
            <div class="fl titl">所属银行</div>
            <input type="text" class="fr" name="cardBelong" v-model="owned_bank">
          </li>
          <li>
            <div class="fl titl">银行卡号</div>
            <input type="text" class="fr" name="cardNum" v-model="card_number">
          </li>
          <li>
            <div class="fl titl">开户行</div>
            <input type="text" class="fr" name="id" placeholder="请格式填写具体的支行的名称" v-model="open_bank">
          </li>
        </ul>
        <div class="bankNote removeBg">
          <div class="clearfix">
            <div class="warnFotmat fl">提示内容</div>
            <div class="showWarn fr">南京市 - 江宁开发区支行</div>
          </div>
        </div>
        <div class="personalMes msgSmall">
          <span class="msgFont">推荐信息</span>
        </div>
        <ul class="msgContent">
          <li class="remTopBorder">
            <div class="titl fl">推荐人</div>
            <input type="text" class="fr" name="" placeholder="被推荐人姓名" v-model="referee_name" >
          </li>
          <li>
            <div class="fl titl">电话</div>
            <input type="text" class="fr" name="" placeholder="被推荐人手机" v-model="referee_tel">
          </li>
        </ul>
        <!--<a href="javascript:;" class="nurseSubmit">提交</a>-->
        <input type="button" class=" nurseSubmit" value="提交"  @click="NurseSubmit">
      </form>

      <div class="choiceSex">
        <div class="radioSex">
          <div class="detailFont">性别修改</div>
          <div class="sexBox">
            <input type="radio" id="male" name="sex" style="margin-right:2rem;">
            <label for="male">男</label>
          </div>
          <div class="sexBox">
            <input type="radio" id="female" name="sex"  checked style="margin-right:2rem;">
            <label for="female">女</label>
          </div>
        </div>
       </div>

      <div class="cityContent">
        <div class="content-block">
          <input id="value1" type="hidden" value="20,234,504">
        </div>
      </div>
    </section>
    <alertTiming ref="alertTiming1" :content="alertContent">  </alertTiming>

    <transition name="fade">
      <div v-show="show">
        <com-calendar
                :onOk="onOk"
                :onCancel="onCancel"
                v-on:hide="hide"
        >

          <!--:month="month"-->
          <!--:year="year"-->
          <!--:day="day"-->

        </com-calendar>
        <div  class='mark'></div>
        <p></p>
      </div>
    </transition>


  </div>
</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import Vue from 'vue'
  import axios from 'axios'
  import {mapState,mapMutations} from 'vuex'

  import alertTiming from '../alertTiming';
  import calendarComponent from '../common/region/calendar.vue'
  import m from  '../../../static/css/style.scss'
  import s from  '../../../static/css/calendar.scss'

  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        isShow:false,
        title0:"信息填写",
        realName:'',
        IDNo:'',
        sex:'',
        region:'',
        cardholder:'',
        owned_bank:'',
        card_number:'',
        open_bank:'',
        cityInfo: '',
        files:'',
        picked_sex:'',
        referee_name:'',
        referee_tel:'',
        alertContent:'',
        isIDNook:false,

        show:false,
       onOk:function () {},
       onCancel:function (){},
      }
    },
    mounted:function(){
        this.getNurseInfo();
    },
    created:function(){
    },
    computed:{
      ...mapState([
        'nurseTel'
      ]),

    },
    components:{
      headerpart,
      comCalendar:calendarComponent,
      alertTiming
    },
    methods:{

        hide(){
            this.show =false
        },
        setDate(){
            let vm = this;
            this.show=true;
            vm.onOk =function(date){
                console.log(date)
//                vm.date= date.year+'-'+date.month+'-'+date.day+' '+date.hour+':'+date.min;
//                 console.log('确定')
            };
            vm.onCancel =function(){
                console.log('取消')
            };

//        this.$calendar.show({
//          onOk(date){
//            console.log(date)
//            vm.date= date.year+'-'+date.month+'-'+date.day+' '+date.hour+':'+date.min;
//            console.log('确定')
//          },
//          onCancel(){
//            console.log('取消')
//          }
//        })
        },
        setDate2(){
            let vm = this;
            let a= (new Date()).getMonth()+1
            this.show=true;
            vm.onOk=function(date){
                vm.region= date.year+'/'+date.month+'/'+date.day;
                //console.log(date)
                console.log('确定123')
            }
            vm.onCancel=function(){
                console.log('取消')

            }

        },


        SelectRegion(){
            this.isShow=true;
        },
        checkId(){
            if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(this.IDNo)){
                this.msg='身份证号码格式有误！'
                this.alertContent=this.msg;
                this.$refs.alertTiming1.Show();
                this.isIDNook=false;
            }
            else {
                this.isIDNook=true;
            }
        },

        getNurseInfo(){
            let vm=this;
            axios.get('/wechat/nurse/myCenter')
                .then(function (response) {
                      console.log("response：")
                       console.log(response.data)
                    if(response.data !=null) {

                        vm.realName=response.data.realName;
                        vm.IDNo=response.data.IDNo;
                        vm.picked_sex=response.data.sex;
                        vm.region=response.data.region;
                        vm.cardholder=response.data.cardholder;
                        vm.owned_bank=response.data.owned_bank;
                        vm.card_number=response.data.card_number;
                        vm.open_bank=response.data.open_bank;

                    }



                })
                .catch(function (response) {
                    // console.log("error response：")
                    //  console.log(response);
                })
        },

      NurseSubmit(){
          let vm=this;
          console.log(this);
        if(!this.realName||this.realName.length<2) {
                vm.alertContent = "名字必须输入";
                vm.$refs.alertTiming1.Show();
                return
            }

          if(this.isIDNook==false) {
              vm.alertContent = "请正确输入身份证号码";
              vm.$refs.alertTiming1.Show();
              return
          }
          console.log(this.region);
         if(!this.region) {
              vm.alertContent = "地区必须选择，输入到区县一级";
              vm.$refs.alertTiming1.Show();
              return
          }
          if(!this.picked_sex) {
              vm.alertContent = "请选择性别";
              vm.$refs.alertTiming1.Show();
              return
          }


        axios.post('/wechat/nurse/registNext', {
          tel: this.nurseTel,
          //tel:'13900000003',
          realName:this.realName,
          IDNo:this.IDNo,
          sex:this.picked_sex,
          address:'',
          region:this.region,
          cardholder:this.cardholder,
          owned_bank:this.owned_bank,
          card_number:this.card_number,
          open_bank:this.open_bank,
          certificate_No:'',
          unit_name:'',
          certificate_file:'',
          photo_file:'',
          post:'',
          referee_name:this.referee_name,
          referee_tel:this.referee_tel
        })
          .then(function (response) {
            if(response.data.result=="00")
            {
              vm.alertContent = "操作成功";
              vm.$refs.alertTiming1.Show();
              setTimeout(function(){vm.$router.push('/login');},2000)
            }
            else {
                vm.alertContent = "操作失败，重新提交";
                vm.$refs.alertTiming1.Show();
            }
          })
          .catch(function (response) {
              vm.alertContent = "操作失败，重新提交";
              vm.$refs.alertTiming1.Show();
          });
      }
    }
  }
</script>
<style>
  .personalMes{
    height:2.65rem;
    background: #ebebeb;
  }
  .msgSmall{
    height:2rem;
  }
  .personalMes .msgFont{
    color:#999;
    font-size:0.7rem;
    padding-left:1.125rem;
    line-height: 2rem;
  }
  .personalMes .warnFont{
    color:#cd3939;
    font-size:0.55rem;
    padding-left:0.4rem;
    line-height: 2rem;
  }
  .msgContent{
    background: #fff;
  }
  .msgContent li{
    border-top:1px solid #dcdcdc;
    height:2.8rem;
    margin-left:0.75rem;
  }
  .msgContent li.remTopBorder{
    border:0;
  }
  .msgContent li .titl{
    line-height: 2.8rem;
    color:#333;
    font-size:0.7rem;
  }
  .msgContent li .mustIcon{
    height:0.45rem;
    width:0.45rem;
    margin:1.23rem 0.2rem 0 0;
  }
  .msgContent li input{
    height:2.8rem;
    width:13rem;
    color:#333;
    font-size:0.7rem;
    border:0;
    padding-right:0.3rem;
  }
  .msgContent li .inp{
    width:8rem;
  }
  .msgContent li .sexBtn,.msgContent li .zoomBtn{
    color:#999;
    line-height: 2.8rem;
    font-size:0.7rem;
    margin-right:1.125rem;
  }
  .msgContent .addBotBorder{
    border-bottom:1px solid #dcdcdc;
  }
  .nurseSubmit{
    width:16.6rem;
    height:2rem;
    text-align: center;
    margin:0.6rem auto 0;
    line-height: 2rem;
    color: #ffffff;
    font-size:0.875rem;
    display:block;
    border:0;
    border-radius:0.125rem;
    background: #338fff;
  }
  .regBtn{
    margin-top:2.75rem;
    border:0;
  }
  .bindPhoneTit{
    height:2.8rem;
    background: #ebebeb;
    border-top:1px solid #d1d1d1;
  }
  .bankNote{
    height:2rem;
    line-height: 1.5rem;
    background: #ebebeb;
    border-top:1px solid #d1d1d1;
  }
  .removeBg{
    background:#fff;
  }
  .bindPhoneTit .showWarn,.bankNote .showWarn{
    color:#338fff;
    font-size:0.45rem;
    margin:0.175rem 0.8rem 0 0;
  }
  .bindPhoneTit .warnFotmat,.bankNote .warnFotmat{
    color:#cd3939;
    font-size:0.45rem;
    margin:0.175rem 0 0 0.5rem;
  }
  .bindPhoneTit .bindPhone{
    color:#999;
    font-size:0.7rem;
    margin:0.2rem 0 0 1.25rem;
  }
  .main .regBox input.phoneCode{
    width:60%;
  }
  .getCode{
    width:4.7rem;
    height:1.55rem;
    color:#fff;
    font-size:0.7rem;
    text-align: center;
    margin:0.4rem 0;
    line-height:1.55rem;
    border-radius: 0.1rem;
    background: #338fff;
  }
  .choiceSex{
    display: none;
    width:100%;
    height:32rem;
    background:rgba(0,0,0,0.3);
    position:absolute;;
    top:0rem;
    left:0rem;
  }
  .radioSex{
    height:4.6rem;
    width:9.5rem;
    background: #fff;
    display: none;
    position:absolute;
    top:12rem;
    left:5rem;
    z-index: 999;
  }
  .msgContent li .sex{
    width:10.45rem;
  }
  .msgContent li .zoom{
    width:12rem;
    height: 100%;
    margin-left:0.5rem;
    text-align: center;
    line-height: 2.5rem;
    font-size:0.7rem;
  }
  .detailFont{
    color:#999;
    font-size:0.6rem;
    margin:0.5rem 0 0 0.95rem;
  }
  .sexBox{
    margin:0.5rem 0 0 1.05rem;
  }
  .cityChoice{
    border:0;
    height:1rem;
    color:#3f3f3f;
    font-size:0.6rem;
  }
  .register{
    margin-top:2.85rem;
  }
  .sexInpBox{
    margin:0.8rem 0 0 4rem;
  }
  .sexInpBox div{
    margin-right:3rem;
  }
  .sexInpBox label{
    margin-left:0.7rem;
  }
  .msgContent li .sexInpBox input{
    width:0.8rem;
    height:0.8rem;
  }
</style>
