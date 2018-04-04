<template>
  <!--标题开始-->
  <section class="wrap">
    <header>
      <div class="mianTitle">样本数据明细表</div>
    </header>
    <!--标题结束-->
    <section class="content"  >
      <div class="clearfix">
        <div class="companyNameSample fl">中国人寿扬州分公司</div>
        <div class="clearfix fr searchContentBox">
          <input type="text" class="fl" hidden>
          <a href="javascript:;" >
            <img src="../../../../../static/img/company/wechat/activityinfo/search.png" alt="" class="fl userIcon">
          </a>
        </div>
      </div>
      <div id="bg">
        <ul class="showPartCustomer">
          <li class="clearfix" v-for="(activity,index) in Activities">
            <a href="javascript:;" class="fl" @click="GotoSampleCheck(index)">
              <div class="clearfix">
                   <span class="fl">
                     <img src="../../../../../static/img/company/wechat/activitysheet/dateIcon.png" alt="" class="userIcon">
                   </span>
                <div class="fl">
                  <div class="customerPartMsg">
                    <span>{{activity.activity_time}}</span>
                    <span>报告人数:{{activity.sampling_number}}人</span>
                  </div>
                  <div class="customerMsgId">{{activity.address}}</div>
                </div>
              </div>
            </a>
            <a href="javascript:;" class="isChecked fr">
              {{activity.feedback_state}}
            </a>
          </li>
        </ul>
      </div>
    </section>
    <!--标题结束-->
    <footerpart></footerpart>
  </section>
</template>

<script>
  import headerpart from "../headerpart"
  import footerpart from "../footerpart"
  import {mapState,mapMutations} from 'vuex'
  import axios from 'axios'
  export default {
    data(){
      return {
          Activities:[{
            sampling_number: 0,
            address: '',
            activity_id: '',
            projects: '',
            sample_status:'',
            feedback_state:'',
            activity_time: '',
            receiver: null
          }]
      }
    },
    mounted:function(){

    },
    components: {
      headerpart,
      footerpart
    },
    methods: {
      ...mapMutations([
        'RECORD_ACTIVITIES_ID'
      ]),
        GotoSampleCheck(index){
            this.RECORD_ACTIVITIES_ID(this.Activities[index].activity_id)
            this.$router.push('/sample/samplecheck')
        },
      SampleDetailList(index){
        this.$router.push('/sample/sampledetaillist')
        this.RECORD_ACTIVITIES_ID(this.samples.dbResult[index]._id)
        console.log(this.samples.dbResult[index]._id)
      },
      GetSampleListData(){
        let vm=this;
        axios.get('/sample/samplelist')
          .then(function (response) {
            console.log("response：")
            console.log(response.data)

            if(response.data !=null) {
              vm.Activities.splice(0, vm.Activities.length)

              for (let i = 0; i < response.data.length; i++) {

                vm.Activities.push(response.data[i]);

              }
            }
          })
          .catch(function (response) {
            console.log("error response：")
            console.log(response);
          })
      }
    }
  }
</script>
<style>
  input::placeholder{
    text-align: left;
  }
  #bg{
    background:#fff;
  }
  .companyNameSample{
    margin-top:0.5rem;
    color:#338fff;
  }
  .isChecked{
    color:#ed3a36;
  }
  .isChecked2{
    color:#48ab00;
  }
  .isChecked img{
    width:1rem;
    height:1rem;
  }
  .searchCustomerMsg{
    margin-top:0.5rem;
    height:1rem;
    width:1rem;
  }
  .searchContentBox input{
    margin:0.5rem;
    border:1px solid #ccc;
  }
  .userIcon{
    display: block;
    width:0.9rem;
    height:0.9rem;
  }
  /*.moreMsg{
    color:#338fff;
  }*/
.checkeBtns{
  position: absolute;
  left:0;
  bottom:1rem;
  margin-top:0.5rem;
}
.checkeBtns a{
    padding:0.5rem 1.5rem;
    margin-left:0.5rem;
    background: #338fff;
    color:#fff;
    border-radius: 0.1rem;
    font-size:0.65rem;
  }

.showPartCustomer li{
  margin:0 0.5rem;
}
</style>
