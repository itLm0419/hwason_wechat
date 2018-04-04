<template>
  <!--标题开始-->
  <section class="wrap">
     <headerpart :imgaddr="imgaddr0" :title="titel0"></headerpart>
    <!--标题结束-->
    <section class="contentSpmple">
      <div class="addBlank"></div>
      <div class="clearfix">
        <div class="companyNameSample fl">{{companyName}}</div>
      </div>
      <!--切换按钮-->
      <div class="titRegister clearfix" >
        <div :class="addOn1" @click="titRegister1">已采样</div>
        <div :class="addOn2" @click="titRegister2">未采样</div>
      </div>
      <div id="bg" class="regUserMsgLists">
        <v-loadmore :bottom-method="loadBottom"  :auto-fill ="autoFill" ref="loadmore" >
          <ul class="actCustomerLists">
            <li class="clearfix itemListAddLine" v-for="(user,index) in users">
              <!--<a href="javascript:;" class="fl">-->
              <div class="clearfix">
                <span class="fl">
                     <!--展开详情显示的图标 close -->
                     <img src="../../../../../static/img/examination/close.png" alt="" class="showMoreBtn">
                   </span>
                <div class="fl" @click="ShowMore(index)">
                  <div class="customerPartMsg">
                    <span>{{user.name}}</span>
                    <span>{{user.sex}} {{user.age}}</span>
                    <span>项目：{{user.projects}}</span>
                  </div>
                  <div class="customerMsgId2"><span class="IDNo">身份证号：{{user.IDNo}}</span> <span>业务员：{{user.salesman.name}}</span></div>
                  <!--更多客户信息的展示-->
                  <div class="" v-show="isShow[index]" v-model="tmp">
                    <div class="customerMsgId2">
                      <div class="code">条码：{{user.barcode}}</div>
                      <div>业务员电话：{{user.salesman.tel}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <!--</a>-->
              <!--</a>-->
            </li>
            <li v-if="showMsg&&isSelect==1" class="noSamplingMsg"> 暂无数据！</li>
            <li v-if="showMsg2&&isSelect==2" class="noSamplingMsg"> 暂无数据！</li>
          </ul>
        </v-loadmore>

       <!-- <div class="checkeBtns2 clearfix">
          <a href="javascript:;" class="fr" @click="GotoPrePage">上一页</a>
          <a href="javascript:;" class="fr" @click="GotoNextPage">下一页</a>
        </div>-->
      </div>
    </section>
    <!--标题结束-->
    <!--<footerpart></footerpart>-->
  </section>
</template>

<script>
  import {Loadmore} from 'mint-ui';
  import headerpart from "../headerpart"
  import footerpart from "../footerpart"
  import {mapState,mapMutations} from 'vuex'
  import axios from 'axios'

  export default {
    data(){
      return {
         autoFill:false,
         companyName:'',
         imgaddr0: "/static/img/return.png",
          titel0:"详情",
          addOn1:"fl on",
          addOn2:"fl",
          users: [],
          Page:1,
          MaxPage:10,
          isShow:[],
          tmp:'',
          showMsg:false,
          showMsg2:false,
          isSelect:0,
          isSampled:true
        }

    },
    mounted:function(){
        this.GetDetailListData("sampled");
        this.companyName=this.companyInfo.companyName;
    },
    components: {
      headerpart,
      footerpart,
      'v-loadmore':Loadmore
    },
     computed: {
      ...mapState([
       'activity_id',
       'companyInfo',
      ])
      },
    methods: {
      ...mapMutations([
        'RECORD_ACTIVITIES_ID'
      ]),
        loadBottom (){
            this.Page=this.Page+1;
            var vm = this;
            //if(this.Page >this.MaxPage) this.Page=this.MaxPage;
            if(this.isSampled==true){
                this.GetDetailListData("sampled");
            }else{
                this.GetDetailListData("sampling");
            }
        },
        titRegister1(){
            this.addOn1="fl on";
            this.addOn2="fl";
            this.GetDetailListData("sampled");
            this.isSampled=true;
            this.isSelect=1;
        },
        titRegister2(){
            this.addOn1="fl";
            this.addOn2="fl on";
            this.GetDetailListData("sampling");
            this.isSampled=false;
            this.isSelect=2;
        },
        ShowMore(index){
            this.tmp='';
          if(this.isShow[index] ==undefined )
              this.isShow[index]=false;

          this.isShow[index]=!this.isShow[index];
          this.tmp=' ';


        },
      GotoPrePage(){
        this.Page=this.Page-1;
        if(this.Page <1) this.Page=1;

          if(this.isSampled==true)
              this.GetDetailListData("sampled");
          else
              this.GetDetailListData("sampling");

        },
      GotoNextPage(){
            this.Page=this.Page+1;
            if(this.Page >this.MaxPage) this.Page=this.MaxPage;
          if(this.isSampled==true)
              this.GetDetailListData("sampled");
          else
              this.GetDetailListData("sampling");
        },

      SampleDetailList(index){
        this.$router.push('/sample/sampledetaillist')
        this.RECORD_ACTIVITIES_ID(this.samples.dbResult[index]._id)

      },
      GetDetailListData(sample){
        let vm=this;
        console.log("activity_id",this.activity_id)
        let addr;
        if(sample=="sampled")
            addr='/wechat/sample/sampledetaillist';
        else
            addr='/wechat/sample/sampledetaillist2';
          axios.get(addr,{params:{
            page: this.Page,
            activity_id:this.activity_id,
            isSample:true
        }})
          .then(function (response) {
            console.log("response：");
            console.log(response.data);
            // vm.samples.splice(0, vm.samples.length)
            if (response.data != null) {

                // vm.samples.push(response.data);
                if(response.data.users.length==0)
                {
                    if(sample=="sampled")
                    {
                        vm.showMsg=true;
                    }
                    else {
                        vm.showMsg2=true;
                    }


                }

                //vm.users.splice(0, vm.users.length)
                if (response.data != null) {
                    for (let i = 0; i < response.data.users.length; i++) {

                        vm.users.push(response.data.users[i]);
                    }
                    vm.$refs.loadmore.onBottomLoaded();
                }
                vm.MaxPage = response.data.maxpage;
            } else {
                vm.users.splice(0, vm.users.length);
                console.log("sdasd  null")
            }


          })
          .catch(function (response) {
            console.log("error response：");
            console.log(response);
          })
      }
    }
  }
</script>
<style>
  .regUserMsgLists{
    height:29rem;
    overflow-y: scroll;
  }
  .contentSpmple{
    /*padding:0 0.8rem;*/
    /*height:30rem;*/
    overflow-y: auto;
  }
  .companyNameSample{
    margin:0.5rem 0 0 1rem;
    color:#338fff;
    font-size:0.7rem;
    line-height: 0.75rem;
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
    margin:0.5rem 0.5rem 0.3rem 0;
    height:1rem;
    width:1rem;
  }
  .searchContentBox input{
    margin:0.5rem;
    border:1px solid #ccc;
  }
  .checkeBtns2{
    position: absolute;
    right: 1rem;
    bottom:1rem;
    margin-top:0.5rem;
  }
  .checkeBtns2 a{
    padding:0.3rem 0.5rem;
    margin-left:0.5rem;
    background: #338fff;
    color:#fff;
    border-radius: 0.1rem;
    font-size:0.65rem;
  }
  .actCustomerLists{
    margin-top:0.5rem;
  }
  .itemListAddLine{
    background: #fff;
    padding:0.5rem 0;
    border-bottom:1px solid #ccc;
  }
  .itemListAddLine img{
    width:1rem;
    height: 1rem;
    /*margin:0.8rem 0 0 0.5rem;*/
  }
  li.noSamplingMsg{
    background: #fff;
    padding:1rem 0 1rem 1rem ;
    font-size:0.7rem;
  }
  .titRegister{
    width:16rem;
    height:1.5rem;
    margin:0.5rem  auto;
  }
  .titRegister div{
    width:49%;
    height:100%;
    text-align: center;
    line-height: 1.5rem;
    color:#338fff;
    background: #fff;
    /*border:1px solid #338fff;*/
  }

  .titRegister div.on{
    background: #338fff;
    color:#fff
  }

  .searchContent{
    height: 1rem;
  }
/*.itemListAddLine .customerMsgId{
    padding-right:-1rem;
  }*/
  .customerMsgId2{
    margin:0.5rem 0 0 0.5rem;
  }
  .IDNo{
    padding-right:1rem;
  }
  .customerMsgId2 .code{
    margin-bottom:0.5rem;
  }
</style>
