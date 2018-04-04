<template>
  <!--标题开始-->
  <section class="wrap">
    <header >
      <div class="mianTitle">活动汇总表</div>
      <div class="exportAc" @click = "exportAcDetail"> 导出</div>
    </header>
    <!--标题结束-->
    <section class="contentSamplist">
      <div class="addBlank"></div>
      <div class="clearfix">
        <div class="companyName fl">{{companyName}}</div>
        <div class="fr choiceAllBtn" @click="choiceAllBtn">{{choose}}</div>
      </div>
      <div id="bg" class="statusSample">
        <ul class="showPartCustomer">
          <li class="clearfix" v-for="(activity,index) in Activities" >
            <em></em>
            <a href="javascript:;" class="fl" @click=" SampleDetailList(index)">
              <div class="clearfix">
                  <!-- <span class="fl">
                     <img src="../../../../../static/img/company/wechat/activitysheet/dateIcon.png" alt="" class="userIcon">
                   </span>-->
                <div class="checkboxImg fl"> <em ref="allCheckBox" v-on:click.stop="choiceItems($event,activity.activity_id)"></em></div>

                <div class="fl">
                  <div class="customerPartMsg">
                    <span>{{activity.activity_time}}</span>
                    <span>报告人数:{{activity.sampling_number}}人</span>
                  </div>
                  <div class="customerMsgId">
                    <span class="showItems">项目 : {{activity.projects}}</span>
                    <span>状态：{{activity.sample_status}}</span>
                  </div>
                  <div class="customerPartMsg"><span>{{activity.address}}</span></div>
                </div>

                <div v-if="activity.feedback_state=='已核对'" class="fr isActCheckedBtn">已核对</div>
                <div v-else class="fr isActCheckedBtn2" @click.stop="comfirmActivity($event,activity.activity_id)">活动结束</div>
              </div>
            </a>
            <div class="fr">
            </div>
          </li>
        </ul>
      </div>
    </section>
    <!--标题结束-->
    <footerpart></footerpart>

    <mt-popup v-model="popupVisible" closeOnClickModal>
      <div class="addEmailBox">
        <div class="mentionETitle">请输入邮箱</div>
        <input type="email" v-model="eMail">
        <div class="emailBtns clearfix">
          <div class="eMailConfirm fl" @click="onSendMail">确定</div>
          <div class="eMailCancel fl" @click="onCancelMail">取消</div>
        </div>
      </div>
    </mt-popup>
  </section>
</template>

<script>
  import headerpart from "../headerpart"
  import footerpart from "../footerpart"
  import axios from 'axios'
  import {mapState,mapMutations} from 'vuex'
  export default {
    data(){
      return {
          eMail:"",
          popupVisible:false,
          choose:"全选",
          flag:true,
          companyName:'',
          activity_id:[],
          Activities:[{
              sampling_number: 0,
              address: '',
              activity_id: '',
              projects: '',
              sample_status:'',
              feedback_state:'',
              activity_time: '',
              receiver: null,
          }]

      }
    },
    mounted:function(){
        this.GetSampleListData();
        this.companyName=this.companyInfo.companyName;
    },
    components: {
      headerpart,
      footerpart
    },
    computed:{
       ...mapState([
       'companyInfo',
       ]),
      },
      methods: {
          ...mapMutations([
              'RECORD_ACTIVITIES_ID'
          ]),
          exportAcDetail(){
              if(!this.activity_id.length){
                  this.$messagebox({
                      title:"提示",
                      message:"请至少选择一场活动"
                  })
                  return
              }
              this.popupVisible = true;
          },
          onSendMail(){
              if(!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.eMail)){
                  this.$messagebox({
                      title:"提示",
                      message:"邮箱格式不正确"
                  })
                  return false;
              }
              var vm = this;
              axios.get("/wechat/company/exportAcDetail",{params:{
                  email:vm.eMail,
                  activityId:vm.activity_id
              }}).then(function (response) {
                  if(response.data.result = "00"){
                      vm.popupVisible = false;
                      vm.$messagebox({
                          title:"提示",
                          message:"发送成功"
                      })
                  }
              })
          },
          onCancelMail(){
              this.popupVisible = false
          },
          choiceAllBtn(){
              var allCheckBox = this.$refs.allCheckBox;
              if(this.flag){
                  for(let i=0;i<allCheckBox.length;i++){
                      allCheckBox[i].className = 'changeBg'
                  }
                  this.flag = !this.flag;
                  this.choose = "取消全选";
                  this.activity_id = [];
                  for(let ac of this.Activities){
                      this.activity_id.push(ac.activity_id);
                  }
              }
              else{
                  for(let j=0;j<allCheckBox.length;j++){
                      allCheckBox[j].className = ''
                  }
                  this.flag = !this.flag;
                  this.choose = "全选";
                  this.activity_id = [];
              }
          },
          choiceItems(event,id){
                if(event.target.className == 'changeBg'){
                    event.target.className = '';
                    this.activity_id.splice(this.activity_id.indexOf(id),1)
                }else{
                    event.target.className = 'changeBg';
                    this.activity_id.push(id)
                }
                console.log(this.activity_id)
          },
          comfirmActivity(event,id){
              var vm = this;

              axios.post('/wechat/sample/comfirmActivity',{params:{_id:id}})
                  .then(function (response) {
                      if(response.data.result=='00'){
                          vm.$messagebox({
                              title:"提示",
                              message:"操作成功"
                          });
                          event.srcElement.className = "fr isActCheckedBtn";
                          event.srcElement.innerHTML = "已核对";
                      }

                  })
          },
          GotoSampleCheck(index){
              this.RECORD_ACTIVITIES_ID(this.Activities[index].activity_id)
              this.$router.push('/company/samplecheck')
          },
          SampleDetailList(index){
              this.RECORD_ACTIVITIES_ID(this.Activities[index].activity_id)
              this.$router.push('/company/sampledetaillist')

          },
          GetSampleListData(){
              let vm=this;
              axios.get('/wechat/sample/samplelist')
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

  .checkboxImg em{
    display: inline-block;
    width:1rem;
    height: 1rem;
    margin:1rem 0 0 0.5rem;
    background: url('../../../../../static/img/healthRecords/check1.png') no-repeat;
    background-size:cover ;
  }
  .checkboxImg em.changeBg{
    background: url('../../../../../static/img/healthRecords/check2.png') no-repeat;
    background-size:cover ;
  }
  .choiceAllBtn{
    color:#338fff;
    font-size:0.7rem;
    line-height: 2em;
    padding-right:1rem;
  }
  .chooseAc{
    background-color: #CDF7FF;
  }
  input::placeholder{
    text-align: left;
  }
  #bg{
    background:#fff;
  }
  .statusSample{
    height:25rem;
    overflow-y: auto;
  }
  .exportAc{
    position: fixed;
    right: 10px;
    top:5px;
    color: #ffffff;
    padding: 10px;
    font-size:0.7rem;
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
    margin:0.5rem 0 0 0.5rem;
    width:0.9rem;
    height:0.9rem;
  }
  .customerPartMsg span{
    padding:1rem 0.5rem;
  }
  .customerMsgId{
    padding:0.3rem 0 0.3rem 0.5rem;
  }
  .customerMsgId span{
    padding-right:1rem;
  }
  .customerMsgId .showItems{
    display: inline-block;
    /*width: 5rem;*/
  }
  .showMoreMsg img{
    display: block;
    width:1rem;
    height:1rem;
    margin:0 auto;
  }
  .showPartCustomer li{
   /* width:100%;
    height: 100%;*/
    color:#333;
    padding:0.5rem 0 0.3rem;
    border-bottom:1px solid #dcdcdc;
    /*box-shadow: 0rem 0.1rem 0.5rem #ccc ;*/
  }
  .showPartCustomer li a{
    width: 100%;
  }
  .isActCheckedBtn{
    height: 1.2rem;
    line-height: 1.2rem;
    width: 3rem;
    /*padding:0 0.3rem;*/
    text-align: center;
    background: #cccccc;
    color:#fff;
    margin:1rem 0.5rem 0 0;
  }
  .isActCheckedBtn2{
    height: 1.2rem;
    line-height: 1.2rem;
    width: 3rem;
    /*padding:0 0.3rem;*/
    text-align: center;
    background: #338fff;
    color:#fff;
    margin:1rem 0.2rem 0 0;
  }
  .addEmailBox{
    width:13rem;
    padding:1rem;
  }
  .addEmailBox .mentionETitle{
    font-size:0.7rem;
    margin-bottom:0.5rem;
  }
  .addEmailBox input{
    width: 90%;
    height: 1.5rem;
  }
  .emailBtns{
    width:63%;
    margin:1rem auto 0;
  }
  .emailBtns div{
    width: 2.5rem;
    height: 1.5rem;
    text-align: center;
    font-size:0.65rem;
    line-height: 1.5rem;
  }
  .eMailConfirm{
    color:#fff;
    background: #338fff;
    margin-right:3rem;
  }
  .eMailCancel{
    border:1px solid #338fff;
    color:#338fff;
    background: #fff;
  }
</style>
