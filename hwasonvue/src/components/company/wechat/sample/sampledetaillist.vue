<template>
  <!--标题开始-->
  <section class="wrap">
     <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <!--标题结束-->
    <section class="contentSpmple">
      <div class="addBlank"></div>
      <div class="clearfix">
        <div class="companyNameSample fl">{{companyName}}</div>
       <!-- <div class="clearfix fr searchContentBox">
          <input type="text" class="fl" hidden>
          <a href="javascript:;" >
            <img src="../../../../../static/img/company/wechat/activityinfo/search.png" alt="" class="fl searchCustomerMsg">
          </a>
        </div>-->
      </div>
      <div class="titRegister clearfix" >
        <div :class="addOn1" @click="titRegister1">已登记</div>
        <div :class="addOn2" @click="titRegister2">未登记</div>
      </div>
      <div id="bg"  class="regUserMsgLists">
        <v-loadmore :bottom-method="loadBottom"  :auto-fill ="autoFill" ref="loadmore" >
              <ul class="">
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
                          <span>项目：{{user.projects}}</span>
                          <span style="padding-left:2rem;">业务员：{{user.salesman.name}}</span>
                        </div>
                        <div class="customerMsgId">
                          <span>{{user.sex}}</span>
                          <span style="padding:0 1.5rem 0 0.5rem;">{{user.age}}</span>
                          <span>身份证号：{{user.IDNo}}</span>
                        </div>
                        <!--更多客户信息的展示-->
                        <div class="showDetailMsg" v-show="isShow[index]" v-model="tmp">
                          <span>条码：{{user.barcode}}</span>
                          <div>
                              <span>业务员电话：{{user.salesman.tel}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  <!--</a>-->
                </li>
                <li v-if="!users.length" class="noSamplingMsg"> 暂无数据！</li>
              </ul>
         </v-loadmore>
        <!--<div class="checkeBtns2 clearfix">-->
          <!--<a href="javascript:;" class="fr" @click="GotoPrePage">上一页</a>-->
          <!--<a href="javascript:;" class="fr" @click="GotoNextPage">下一页</a>-->
        <!--</div>-->
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
          title0:"登记详情",
          addOn1:"fl on",
          addOn2:"fl",
          users: [],
          Page:1,
          MaxPage:10,
          isShow:[],
          tmp:'',
          showMsg:false,
          isSampled:true,
          allLoaded:false
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
        titRegister1(){
            this.users = [];
            this.Page = 1
            this.addOn1="fl on";
            this.addOn2="fl";
            this.GetDetailListData("sampled");
            this.isSampled=true;
        },
        titRegister2(){
            this.users = [];
            this.Page = 1
            this.addOn1="fl";
            this.addOn2="fl on";
            this.GetDetailListData("sampling");
            this.isSampled=true;
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

      SampleDetailList(index){
        this.$router.push('/sample/sampledetaillist')
        this.RECORD_ACTIVITIES_ID(this.samples.dbResult[index]._id)

      },
      GetDetailListData(sample){
        let vm=this;
        let addr;
          if(sample=="sampled")
              addr='/wechat/sample/sampledetaillist';
          else
              addr='/wechat/sample/sampledetaillist2';
        axios.get(addr,{params:{
            page: this.Page,
            activity_id:this.activity_id,
            isSample:false  //显示采样用户
        }})
          .then(function (response) {
            console.log("response：")
            console.log(response.data)
            // vm.samples.splice(0, vm.samples.length)
            if (response.data != null) {
                // vm.samples.push(response.data);
                if(response.data.users.length==0)
                {
                    vm.showMsg=true;
                }

                //vm.users.splice(0, vm.users.length)
                if (response.data != null) {
                    for (let i = 0; i < response.data.users.length; i++) {

                        vm.users.push(response.data.users[i]);
                    }
                    vm.isSampled = true
                    vm.$refs.loadmore.onBottomLoaded();
                }
                //vm.MaxPage = response.data.maxpage;
            } else {
                console.log(" null")
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
  .showDetailMsg{
    padding-left:0.5rem;
  }
  .showDetailMsg div{
    margin-top:0.3rem;
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
    padding:0 0.5rem 0.2rem 0;
    height:1rem;
    width:1rem;
  }
  .searchContentBox input{
    margin:0.5rem;
    border:1px solid #ccc;
  }
  .showMoreBtn{
    display: block;
    width:1rem;
    height:1rem;
    padding:0.5rem 0 0 0 ;
  }
  .moreMsg{
    color:#338fff;
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
  .itemListAddLine{
    padding:0.5rem 0;
    border-bottom:1px solid #ccc;
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
</style>
