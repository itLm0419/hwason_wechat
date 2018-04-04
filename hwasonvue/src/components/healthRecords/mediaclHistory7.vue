<template>
  <div class="hMian">
    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <div class="addBlank"></div>
    <div class="titleFontStyle">填写常规问卷</div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle2">09、您的饮酒年限？</div>
      <div class="perMedicalBox clearfix">
        <label for="level9_1" class="clearfix fl">
          <input type="radio" name="sort8" id="level9_1" v-model="drinkYear" value="无" class="fl">
          <span class="fl">无</span>
        </label>
        <label for="level9_2" class="clearfix fl">
          <input type="radio" name="sort8" id="level9_2" v-model="drinkYear" value="1~3年" class="fl">
          <span class="fl">1~3年</span>
        </label>
        <label for="level9_3" class="clearfix fl">
          <input type="radio" name="sort8" id="level9_3" v-model="drinkYear" value="3~10年" class="fl">
          <span class="fl">3~10年</span>
        </label>
        <label for="level9_4" class="clearfix fl">
          <input type="radio" name="sort8" id="level9_4" v-model="drinkYear" value="10年以上" class="fl">
          <span class="fl">10年以上</span>
        </label>
      </div>
    </div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle2">10、您每天饮酒量是?</div>
      <div class="perMedicalBox clearfix">
        <label for="level10_1" class="clearfix fl">
          <input type="radio" name="sort9" id="level10_1" v-model="drinkOneDay" value="无" class="fl">
          <span class="fl">无</span>
        </label>
        <label for="level10_2" class="clearfix fl">
          <input type="radio" name="sort9" id="level10_2"v-model="drinkOneDay" value="2两以内" class="fl">
          <span class="fl">2两以内</span>
        </label>
        <label for="level10_3" class="clearfix fl">
          <input type="radio" name="sort9" id="level10_3" v-model="drinkOneDay" value="2~5两" class="fl">
          <span class="fl">2~5两</span>
        </label>
        <label for="level10_4" class="clearfix fl">
          <input type="radio" name="sort9" id="level10_4" v-model="drinkOneDay" value="5~10两" class="fl">
          <span class="fl">5~10两</span>
        </label>
        <label for="level10_3" class="clearfix fl">
          <input type="radio" name="sort9" id="level10_5" v-model="drinkOneDay" value="1~2斤" class="fl">
          <span class="fl">1~2斤</span>
        </label>
        <label for="level10_4" class="clearfix fl">
          <input type="radio" name="sort9" id="level10_6" v-model="drinkOneDay" value="2斤以上" class="fl">
          <span class="fl">2斤以上</span>
        </label>
      </div>

    </div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle2">11、您经常进行锻炼吗？</div>
      <div class="perMedicalBox clearfix">
        <label for="level11_1" class="clearfix fl">
          <input type="radio" name="sort10" id="level11_1" v-model="exerciseFrequency" value="几乎没有" class="fl">
          <span class="fl">几乎没有</span>
        </label>
        <label for="level11_2" class="clearfix fl">
          <input type="radio" name="sort10" id="level11_2" v-model="exerciseFrequency" value="每周1~2次" class="fl">
          <span class="fl">每周1~2次</span>
        </label>
        <label for="level11_3" class="clearfix fl">
          <input type="radio" name="sort10" id="level11_3" v-model="exerciseFrequency" value="每周3~4次" class="fl">
          <span class="fl">每周3~4次</span>
        </label>
        <label for="level11_4" class="clearfix fl">
          <input type="radio" name="sort10" id="level11_4" v-model="exerciseFrequency" value="每周5次以上" class="fl">
          <span class="fl">每周5次以上</span>
        </label>
      </div>

    </div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle2">12、平均每次锻炼时间多少分钟？</div>
      <div class="perMedicalBox clearfix">
        <label for="level12_1" class="clearfix fl">
          <input type="radio" name="sort11" id="level12_1" v-model="exerciseTimeOnce" value="小于20" class="fl">
          <span class="fl">小于20</span>
        </label>
        <label for="level12_2" class="clearfix fl">
          <input type="radio" name="sort11" id="level12_2" v-model="exerciseTimeOnce" value="20~40" class="fl">
          <span class="fl">20~40</span>
        </label>
        <label for="level12_3" class="clearfix fl">
          <input type="radio" name="sort11" id="level12_3" v-model="exerciseTimeOnce" value="40~60" class="fl">
          <span class="fl">40~60</span>
        </label>
       <!-- <label for="level12_4" class="clearfix fl">
          <input type="radio" name="sort11" id="level12_4" v-model="exerciseTimeOnce" value="60以上" class="fl">
          <span class="fl">60以上</span>
        </label>-->
      </div>
    </div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle2">五、个人其它健康情况说明 <span>（其它事宜备注）</span></div>
      <textarea name="" id="" v-model="other" cols="" rows="" placeholder="在此输入文字"></textarea>
    </div>
    <div class="healthNextBtn2" @click="next">提交</div>
    <!--蒙版的显示-->
    <div v-show="false">
      <div class="mengban"></div>

      <!--是否提交的显示-->
      <div class="loginMention" v-show="false">
        <ul class="clearfix">
          <li class="alertMeg fl">信息提示</li>
          <li class="fr"><img src="/static/img/company/wechat/activitysheet/alertIcon.png" alt=""></li>
        </ul>
        <div class="showHmsg">是否确定提交此份健康问卷？</div>
        <div class="clearfix hBtnsBox">
          <a href="javascript:;" class="cancel fr" >取消</a>
          <a href="javascript:;" class="delete fr" >确定</a>
        </div>
      </div>
      <!--提示激活的显示-->
      <div class="loginMention" v-show="false">
        <ul class="clearfix">
          <li class="alertMeg fl">信息提示</li>
          <li class="fr"><img src="/static/img/company/wechat/activitysheet/alertIcon.png" alt=""></li>
        </ul>
        <div class="showHmsg2">恭喜您的E晟卡激活成功！</div>
        <div class="showHmsg3">您的E晟卡有效期为2017/08/21~2018/08/20</div>
        <div class="hConfirm" >确定</div>
      </div>
    </div>
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
        drinkYear:"",
        drinkOneDay:"",
        exerciseFrequency:"",
        exerciseTimeOnce:"",
        other:"",
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
                console.log(response);
                let data = response.data;
                vm.drinkYear = data.record.drinkYear;
                vm.drinkOneDay = data.record.drinkOneDay;
                vm.exerciseFrequency = data.record.exerciseFrequency;
                vm.exerciseTimeOnce = data.record.exerciseTimeOnce;
                vm.other = data.record.other;
                vm.beginTime = data.beginTime;
                vm.endTime = data.endTime;
            })
        },
        next(){
            var vm = this;
            if(!vm.drinkYear||!vm.drinkOneDay||!vm.exerciseFrequency||!vm.exerciseTimeOnce){
                this.$messagebox({
                    title:"提示",
                    message:"请填写完整信息"
                })
                return false;
            }
            axios.post('/wechat/healthRecord/step10', {
                params: {
                    drinkYear:vm.drinkYear,
                    drinkOneDay:vm.drinkOneDay,
                    exerciseFrequency:vm.exerciseFrequency,
                    exerciseTimeOnce:vm.exerciseTimeOnce,
                    other:vm.other,
                    userId: vm.userId
                }
            }).then(function (response) {
                  if(response.data.result == "00"){
                      vm.$messagebox.alert(
                          "有效期为:"+vm.beginTime+"-"+vm.endTime,
                          "开通成功"
                      ).then(function () {
                          if(response.data.role=='02'){
                              window.location.href = "#/salesman/index";
                          }else{
                              WeixinJSBridge.invoke('closeWindow',{},function(res){

                                  //alert(res.err_msg);

                              });
                          }
                      })
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
  .medicalTitle2{
    padding:0.3rem 0.9rem ;
    color:#333;
    font-size:0.7rem;
    line-height: 1.5rem;
    border-bottom:1px solid #ddd;
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
  .personalMedicalChoice2 textarea{
    outline: none;
    resize: none;
    width:90%;
    border:0;
    display: block;
    margin:0 auto;
    height:6.9rem;
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
  .personalMedicalChoice2 textarea{
    outline: none;
    resize: none;
    width:90%;
    border:0;
    display: block;
    margin:0.6rem auto 0;
    height:6.9rem;
  }
  /*蒙版*/
  .mengban{
    position: fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index: 999;
    background: rgba(0,0,0,0.3);
  }

  .loginMention{
    position: absolute;
    left:50%;
    top:50%;
    margin-left:-8rem;
    margin-top:-5rem;
    padding:0.75rem 0.5rem 0.5rem 0.95rem;
    width: 14.925rem;
    height:8.125rem;
    background: #fff;
    z-index: 999;
  }
  .loginMention img{
    width: 0.8rem;
    height: 0.8rem;
  }
  .loginMention .alertMeg{
    color:#999;
    font-size:0.6rem;
  }

  .hBtnsBox{
    /*margin-top:2rem;*/
  }
  .hBtnsBox a{
    width:3.3rem;
    height:1.55rem;
    font-size:0.7rem;
    text-align: center;
    border-radius: 0.125rem;
    line-height: 1.55rem;
    border:0;
  }
  .hBtnsBox a.delete{
    margin-right:0.9rem;
    color:#fff;
    background: #338fff;
  }
  .hBtnsBox a.cancel{
    background: #fff;
    color:#338fff;
    border:0.075rem solid #338fff;
  }
  .hConfirm{
    width:3.3rem;
    height:1.55rem;
    font-size:0.7rem;
    text-align: center;
    border-radius: 0.125rem;
    line-height: 1.55rem;
    margin: 1rem auto 0;
    color:#fff;
    background: #338fff;
  }
  .showHmsg{
    text-align: center;
    line-height: 5rem;
  }
 .showHmsg2{
      text-align: center;
      font-size:0.9rem;
      color:#323232;
      padding:1.5rem 0 0.8rem;
  }
 .showHmsg3{
      text-align: center;
      font-size:0.7rem;
      color:#323232;
  }

</style>
