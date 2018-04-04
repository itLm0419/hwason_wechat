<template>
  <!--标题开始-->
  <section class="wrap">
   <!-- <header>
      <div class="mianTitle">样本数据核对</div>
    </header>-->
    <headerpart :imgaddr="imgaddr0"  :title="title0">  </headerpart>
    <!--标题结束-->
    <section class="contentSpmple"  >
      <div class="clearfix">
        <div class="companyNameSample fl">{{companyName}}</div>
        <div class="clearfix fr searchContentBox">
          <input type="text" class="fl" hidden>
          <a href="javascript:;" >
            <img src="../../../../../static/img/company/wechat/activityinfo/search.png" alt="" class="fl searchCustomerMsg">
          </a>
        </div>
      </div>
      <div id="bg">
        <ul class="showPartCustomer">
          <li class="clearfix" v-for="(user,index) in users">
               <!--<a href="javascript:;" class="fl">-->
                 <div class="clearfix">
                   <span class="fl">
                     <!--展开详情显示的图标 close -->
                     <img src="../../../../../static/img/examination/open.png" alt="" class="showMoreBtn">
                      <!--<span class="moreMsg">更多...</span>-->
                   </span>
                   <div class="fl" @click="ShowMore(index)">
                     <div class="customerPartMsg">
                       <span>{{user.name}}</span>
                       <span>项目：{{user.projects}}</span>
                       <span>业务员：{{user.salesman.name}}</span>
                     </div>
                     <div class="customerMsgId"><span>{{user.sex}}  {{user.age}}</span>身份证号：{{user.IDNo}}</div>
                      <!--更多客户信息的展示-->
                     <div class="showDetailMsg" v-show="isShow[index]" v-model="tmp">
                       <span>条码：{{user.barcode}}</span>
                       <!--<span>接收人：{{user}}</span>-->
                       <div>
                         <span>业务员电话：{{user.salesman.tel}}</span>
                       </div>
                     </div>
                   </div>
                  <!-- <a href="javscript:;" class="isChecked fr" @click="CheckConfirm1">
                     &lt;!&ndash;确定审核的图标： passIcon&ndash;&gt;
                     <img src="../../../../../static/img/wechatLogin/grayPassIcon.png" alt="" @click="CheckConfirm1" >
                   </a>-->
                   <em class="isChecked fr" >
                     <!--确定审核的图标： passIcon-->
                     <img src="../../../../../static/img/wechatLogin/grayPassIcon.png" alt="" @click="CheckConfirm1" >
                   </em>
                 </div>
               <!--</a>-->
           </li>
          <li class="noSamplingMsg"> 暂无数据！</li>
          <!--<li class="clearfix" v-for="(user,index) in users">-->
               <!--&lt;!&ndash;<a href="javascript:;" class="fl">&ndash;&gt;-->
                 <!--<div class="clearfix">-->
                   <!--<span class="fl">-->
                     <!--&lt;!&ndash;展开详情显示的图标 close &ndash;&gt;-->
                     <!--<img src="../../../../../static/img/examination/open.png" alt="" class="showMoreBtn">-->
                      <!--&lt;!&ndash;<span class="moreMsg">更多...</span>&ndash;&gt;-->
                   <!--</span>-->
                   <!--<div class="fl" @click="ShowMore(index)">-->
                     <!--<div class="customerPartMsg">-->
                       <!--<span>{{user.name}}</span>-->
                       <!--<span>项目：{{user.projects}}</span>-->
                       <!--<span>业务员：{{user.salesman.name}}</span>-->
                     <!--</div>-->
                     <!--<div class="customerMsgId"><span>{{user.sex}}  {{user.age}}</span>身份证号：{{user.IDNo}}</div>-->
                      <!--&lt;!&ndash;更多客户信息的展示&ndash;&gt;-->
                     <!--<div class="showDetailMsg" v-show="isShow[index]" v-model="tmp">-->
                       <!--<span>条码：{{user.barcode}}</span>-->
                       <!--&lt;!&ndash;<span>接收人：{{user}}</span>&ndash;&gt;-->
                       <!--<div>-->
                         <!--<span>业务员电话：{{user.salesman.tel}}</span>-->
                       <!--</div>-->
                     <!--</div>-->
                   <!--</div>-->
                  <!--&lt;!&ndash; <a href="javscript:;" class="isChecked fr" @click="CheckConfirm1">-->
                     <!--&lt;!&ndash;确定审核的图标： passIcon&ndash;&gt;-->
                     <!--<img src="../../../../../static/img/wechatLogin/grayPassIcon.png" alt="" @click="CheckConfirm1" >-->
                   <!--</a>&ndash;&gt;-->
                   <!--<em class="isChecked fr" @click="CheckConfirm1">-->
                     <!--&lt;!&ndash;确定审核的图标： passIcon&ndash;&gt;-->
                     <!--<img src="../../../../../static/img/wechatLogin/grayPassIcon.png" alt="" @click="CheckConfirm1(index)" >-->
                   <!--</em>-->
                 <!--</div>-->
               <!--&lt;!&ndash;</a>&ndash;&gt;-->
           <!--</li>-->

        </ul>
        <div class="checkeBtns clearfix">
          <a href="javascript:;" class="fl" @click="Confirm">确认</a>
          <a href="javascript:;" class="fl" @click="FeedBack">问题反馈</a>
          <a href="javascript:;" class="fl" @click="Cancel">取消</a>
        </div>
      </div>
    </section>
    <!--标题结束-->
    <!--<footerpart></footerpart>-->
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
            companyName:'',
            imgaddr0: "/static/img/return.png",
            title0: "样本数据核对",
            users: [{
                  barcode: '',
                  name: '',
                  sex: '',
                  age: '',
                  projects: '',
                  IDNo: '',
                  salesman: {id: '', name: '', tel: ''},
                  id: '',
                  userId: ''
              }],
              items: [],
              isShow:[],
              tmp:'',


          }
      },
      mounted: function () {
          this.GetSampleCheckData();
          this.companyName=this.companyInfo.companyName;

      },
      computed: {
          ...mapState([
              'activity_id',
              'companyInfo'
          ])
      },
      components: {
          headerpart,
          footerpart
      },
      methods: {
          ...mapMutations([
              'RECORD_ACTIVITIES_ID'
          ]),
          ShowMore(index){
              this.tmp='';
              if(this.isShow[index] ==undefined )
                  this.isShow[index]=false;

              this.isShow[index]=!this.isShow[index];
              this.tmp=' ';
          },
          Cancel(){
           this.$router.go(-1)
          },
          FeedBack(){
              this.$router.push('/company/feedback')
          },
          CheckConfirm1(){

             this.items.push(users[index].userId);

          },
          Confirm(){
              let vm = this;

              this.items.splice(0,this.items.length)
              for(let i=0;i<this.users.length;i++)
              {this.items.push(this.users[i].userId);}


              axios.post('/wechat/sample/confirm', {
                  activity_id:this.activity_id, //来自上个页面
                  users: this.items
              }).then(function (response) {
                  console.log("response：")
                  console.log(response.data)

                  if (response.data != null && response.data.result == "00") {
                      vm.GetSampleCheckData();
                  }
              })
                  .catch(function (response) {
                      console.log("error response：")
                      console.log(response);
                  })
          },
          GetSampleCheckData(){
              let vm = this;
              console.log("activity_id",this.activity_id) //来自muex数据
              axios.get('/wechat/sample/samplecheck',{params:{
                  activity_id:this.activity_id
               }})
                  .then(function (response) {
                      console.log("response：")
                      console.log(response.data)
                      vm.users.splice(0, vm.users.length)
                      if (response.data != null) {
                          for (let i = 0; i < response.data.length; i++) {

                              vm.users.push(response.data[i]);
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
  .content{
    margin-top:2.22rem;
  }
input::placeholder{
text-align: left;
}
#bg{
background:#fff;
}
.contentSpmple{
  /*padding:0 0.8rem;*/
  height:30rem;
  overflow-y: scroll;
}
.companyNameSample{
  margin:0.5rem 0 0 1rem;
  color:#338fff;
}
.isChecked{
    color:#ed3a36;
  }
.isChecked img{
  margin:0.5rem 0.5rem 0 0;
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
  .showMoreBtn{
    display: block;
    width:0.7rem;
    height:0.7rem;
    padding:0.5rem 0 0 0.2rem ;
  }
  /*.moreMsg{
    color:#338fff;
  }*/
.checkeBtns{
  position: absolute;
  left:50%;
  margin-left:-7.85rem;
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
.showDetailMsg{
  margin-left:0.5rem;
  border-bottom:2px solid #fff;
}
  .showDetailMsg span{
    padding:0.5rem;
    line-height: 1.3rem;
  }
.showPartCustomer{
  margin-top:0.5rem;
}
.showPartCustomer li{
  margin:0 0.5rem;
}
  li.noSamplingMsg{
    background: #fff;
    padding:1rem 0 1rem 1rem ;
    font-size:0.7rem;

  }
</style>
