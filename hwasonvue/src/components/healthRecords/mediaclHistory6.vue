<template>
  <div class="hMian">
    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <div class="addBlank"></div>
    <div class="titleFontStyle">填写常规问卷</div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle2">03、在过去一段时间里，睡眠时间如何:</div>
      <div class="perMedicalBox clearfix">
        <label for="level3_1" class="clearfix fl">
          <input type="radio" name="sort2" id="level3_1" v-model="sleep" value="小于6小时" class="fl">
          <span class="fl">小于6小时</span>
        </label>
        <label for="level3_2" class="clearfix fl">
          <input type="radio" name="sort2" id="level3_2" v-model="sleep" value="6~8小时" class="fl">
          <span class="fl">6~8小时</span>
        </label>
        <label for="level3_3" class="clearfix fl">
          <input type="radio" name="sort2" id="level3_3" v-model="sleep" value="9~10小时" class="fl">
          <span class="fl">9~10小时</span>
        </label>
        <label for="level3_4" class="clearfix fl">
          <input type="radio" name="sort2" id="level3_4" v-model="sleep" value="10小时以上" class="fl">
          <span class="fl">10小时以上</span>
        </label>
      </div>

    </div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle2">04、经常熬夜吗?</div>
      <div class="perMedicalBox clearfix">
        <label for="level4_1" class="clearfix fl">
          <input type="radio" name="sort3" id="level4_1" v-model="stayUpLate" value="经常" class="fl">
          <span class="fl">经常</span>
        </label>
        <label for="level4_2" class="clearfix fl">
          <input type="radio" name="sort3" id="level4_2" v-model="stayUpLate" value="偶尔" class="fl">
          <span class="fl">偶尔</span>
        </label>
        <label for="level4_3" class="clearfix fl">
          <input type="radio" name="sort3" id="level4_3" v-model="stayUpLate" value="很少" class="fl">
          <span class="fl">很少</span>
        </label>
        <label for="level4_4" class="clearfix fl">
          <input type="radio" name="sort3" id="level4_4" v-model="stayUpLate" value="无" class="fl">
          <span class="fl">无</span>
        </label>
      </div>

    </div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle2">05、同一年前相比，您的体重是：</div>
      <div class="perMedicalBox clearfix">
        <label for="level5_1" class="clearfix fl">
          <input type="radio" name="sort4" id="level5_1" v-model="weightChange" value="增加" class="fl">
          <span class="fl">增加</span>
        </label>
        <label for="level5_2" class="clearfix fl">
          <input type="radio" name="sort4" id="level5_2" v-model="weightChange" value="基本不变" class="fl">
          <span class="fl">基本不变</span>
        </label>
        <label for="level5_3" class="clearfix fl">
          <input type="radio" name="sort4" id="level5_3" v-model="weightChange" value="下降" class="fl">
          <span class="fl">下降</span>
        </label>
        <label for="level5_4" class="clearfix fl">
          <input type="radio" name="sort4" id="level5_4" v-model="weightChange" value="不清楚" class="fl">
          <span class="fl">不清楚</span>
        </label>
      </div>

    </div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle2">06、在近以内，您曾试图减过体重吗？</div>
      <div class="perMedicalBox clearfix">
        <label for="level6_1" class="clearfix fl">
          <input type="radio" name="sort5" id="level6_1" v-model="reduceWeight" value="是" class="fl">
          <span class="fl">是</span>
        </label>
        <label for="level6_2" class="clearfix fl">
          <input type="radio" name="sort5" id="level6_2" v-model="reduceWeight" value="否" class="fl">
          <span class="fl">否</span>
        </label>
      </div>
    </div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle2">07、您的吸烟情况是？</div>
      <div class="perMedicalBox clearfix">
        <label for="level7_1" class="clearfix fl">
          <input type="radio" name="sort6" id="level7_1" v-model="smokeYear" value="无" class="fl">
          <span class="fl">无</span>
        </label>
        <label for="level7_2" class="clearfix fl">
          <input type="radio" name="sort6" id="level7_2" v-model="smokeYear" value="1~3年" class="fl">
          <span class="fl">1~3年</span>
        </label>
        <label for="level7_3" class="clearfix fl">
          <input type="radio" name="sort6" id="level7_3" v-model="smokeYear" value="3~10年" class="fl">
          <span class="fl">3~10年</span>
        </label>
        <label for="level7_4" class="clearfix fl">
          <input type="radio" name="sort6" id="level7_4" v-model="smokeYear" value="10年以上" class="fl">
          <span class="fl">10年以上</span>
        </label>
      </div>

    </div>
    <div class="personalMedicalChoice2">
      <div class="medicalTitle2">08、您每天的吸烟数量？</div>
      <div class="perMedicalBox clearfix">
        <label for="level8_1" class="clearfix fl">
          <input type="radio" name="sort7" id="level8_1" v-model="smokeOneDay" value="无" class="fl">
          <span class="fl">无</span>
        </label>
        <label for="level8_2" class="clearfix fl">
          <input type="radio" name="sort7" id="level8_2" v-model="smokeOneDay" value="1~3支"  class="fl">
          <span class="fl">1~3支</span>
        </label>
        <label for="level8_3" class="clearfix fl">
          <input type="radio" name="sort7" id="level8_3" v-model="smokeOneDay" value="3~10支"  class="fl">
          <span class="fl">3~10支</span>
        </label>
        <label for="level8_4" class="clearfix fl">
          <input type="radio" name="sort7" id="level8_4" v-model="smokeOneDay" value="10~20支"  class="fl">
          <span class="fl">10~20支</span>
        </label>
        <label for="level8_5" class="clearfix fl">
          <input type="radio" name="sort7" id="level8_5" v-model="smokeOneDay" value="20~30支"  class="fl">
          <span class="fl">20~30支</span>
        </label> <label for="level8_6" class="clearfix fl">
          <input type="radio" name="sort" id="level8_6" v-model="smokeOneDay" value="30支以上"  class="fl">
          <span class="fl">30支以上</span>
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
        sleep: "",
        stayUpLate: "",
        weightChange: "",
        reduceWeight: "",
        smokeYear: "",
        smokeOneDay: "",
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
                vm.sleep = data.record.sleep;
                vm.stayUpLate = data.record.stayUpLate;
                vm.weightChange = data.record.weightChange;
                vm.reduceWeight = data.record.reduceWeight;
                vm.smokeYear = data.record.smokeYear;
                vm.smokeOneDay = data.record.smokeOneDay;

            })
        },
        next(){
            var vm = this;
            if(!vm.sleep||!vm.stayUpLate||!vm.weightChange||!vm.reduceWeight||!vm.smokeYear||!vm.smokeOneDay){
                this.$messagebox({
                    title:"提示",
                    message:"请填写完整信息"
                })
                return false;
            }

                axios.post('/wechat/healthRecord/step9', {
                params: {
                    sleep: vm.sleep,
                    stayUpLate: vm.stayUpLate,
                    weightChange: vm.weightChange,
                    reduceWeight: vm.reduceWeight,
                    smokeYear: vm.smokeYear,
                    smokeOneDay: vm.smokeOneDay,
                    userId: vm.userId
                }
            }).then(function (response) {
                if (response.data.result == "00") {
                    window.location.href = "#/mediaclHistory7?userId=" + vm.userId;
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
</style>
