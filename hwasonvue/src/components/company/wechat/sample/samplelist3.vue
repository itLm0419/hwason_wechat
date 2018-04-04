<template>
  <!--标题开始-->
  <section class="wrap">
    <header>
      <div class="mianTitle">活动汇总表</div>
    </header>
    <!--标题结束-->
    <section class="content">
      <div class="clearfix">
        <div class="companyNameSample fl">中国人寿扬州分公司</div>
        <div class="clearfix fr searchContentBox">
          <input type="text" class="fl" hidden>
          <a href="javascript:;" >
            <img src="../../../../../static/img/company/wechat/activityinfo/search.png" alt="" class="fl userIcon">
          </a>
        </div>
      </div>
      <div id="bg" class="statusSample">
        <ul class="showPartCustomer">
          <li class="clearfix">
            <a href="javascript:;" class="fl">
              <div class="clearfix">
                   <span class="fl">
                     <img src="../../../../../static/img/company/wechat/activitysheet/dateIcon.png" alt="" class="userIcon">
                   </span>
                <div class="fl">
                  <div class="customerPartMsg">
                    <span>2017/06/20 10:00</span>
                    <span>报告人数:20人</span>
                  </div>
                  <div class="customerMsgId">
                    <span>项目 : CCVD</span>
                    <span>样本状态 : 运输中</span>
                  </div>
                  <div class="customerPartMsg"><span>南京市江宁区百家湖估计会议中心 </span></div>
                </div>
              </div>
            </a>
            <div class="fr">
              <a href="javascript:;" class="isChecked">未核对</a>
              <a href="javascript:;" class="toDetail">详情</a>
            </div>
          </li>
          <li class="clearfix">
            <a href="javascript:;" class="fl">
              <div class="clearfix">
                   <span class="fl">
                     <img src="../../../../../static/img/company/wechat/activitysheet/dateIcon.png" alt="" class="userIcon">
                   </span>
                <div class="fl">
                  <div class="customerPartMsg">
                    <span>2017/06/20 10:00</span>
                    <span>报告人数:20人</span>
                  </div>
                  <div class="customerMsgId">
                    <span>项目 : CCVD</span>
                    <span>样本状态 : 运输中</span>
                  </div>
                  <div class="customerPartMsg"><span>南京市江宁区百家湖估计会议中心 </span></div>
                </div>
              </div>
            </a>
            <div class="fr">
              <a href="javascript:;" class="isChecked">未核对</a>
              <a href="javascript:;" class="toDetail">详情</a>
            </div>
          </li>
          <li class="clearfix">
            <a href="javascript:;" class="fl">
              <div class="clearfix">
                   <span class="fl">
                     <img src="../../../../../static/img/company/wechat/activitysheet/dateIcon.png" alt="" class="userIcon">
                   </span>
                <div class="fl">
                  <div class="customerPartMsg">
                    <span>2017/06/20 10:00</span>
                    <span>报告人数:20人</span>
                  </div>
                  <div class="customerMsgId">
                    <span>项目 : CCVD</span>
                    <span>样本状态 : 运输中</span>
                  </div>
                  <div class="customerPartMsg"><span>南京市江宁区百家湖估计会议中心 </span></div>
                </div>
              </div>
            </a>
            <div class="fr">
              <a href="javascript:;" class="isChecked2">已核对</a>
              <a href="javascript:;" class="toDetail">详情</a>
            </div>
          </li>
          <li class="clearfix">
            <a href="javascript:;" class="fl">
              <div class="clearfix">
                   <span class="fl">
                     <img src="../../../../../static/img/company/wechat/activitysheet/dateIcon.png" alt="" class="userIcon">
                   </span>
                <div class="fl">
                  <div class="customerPartMsg">
                    <span>2017/06/20 10:00</span>
                    <span>报告人数:20人</span>
                  </div>
                  <div class="customerMsgId">
                    <span>项目 : CCVD</span>
                    <span>样本状态 : 运输中</span>
                  </div>
                  <div class="customerPartMsg"><span>南京市江宁区百家湖估计会议中心 </span></div>
                </div>
              </div>
            </a>
            <div class="fr">
              <a href="javascript:;" class="isChecked2">已核对</a>
              <a href="javascript:;" class="toDetail">详情</a>
            </div>
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

      }
    },
    mounted:function(){

    },
    components: {
      headerpart,
      footerpart
    },
    methods: {
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
  .statusSample{
    height:25rem;
    overflow-y: scroll;
  }
  .companyNameSample{
    margin-top:0.5rem;
    color:#338fff;
  }
  .isChecked{
    color:#ed3a36;
    /*line-height: 3rem;*/
  }
  .isChecked2{
    color:#48ab00;
    /*line-height: 3rem;*/
  }
  .isChecked img{
    width:1rem;
    height:1rem;
  }
  .toDetail{
    background: #338fff;
    text-align: center;
    line-height: 1rem;
    border-radius: 0.2rem;
    margin-top:0.8rem;
    color: #fff;
    display: block;
    height: 1rem;
    width:2rem;
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
    /*margin-top:0.2rem;*/
    width:0.9rem;
    height:0.9rem;
  }
  .showPartCustomer{
    padding:0 0.75rem 0 0 ;
  }
  .showPartCustomer li{
    width:100%;
    height: 100%;
    color:#333;
    padding-top:0.5rem;
    border-bottom:1px solid #dcdcdc;
    box-shadow: 0.1rem 0.1rem 2rem #ccc ;
  }
  .customerPartMsg span{
    margin:0.5rem 0.5rem;
  }
  .customerMsgId{
    padding:0.3rem 0 0.3rem 0.5rem;
  }
  .customerMsgId span{
    padding-right:1rem;
  }
  .showMoreMsg{
    padding-top:0.5rem;
    text-align: center;
    display: block;
  }
  .showMoreMsg img{
    display: block;
    width:1rem;
    height:1rem;
    margin:0 auto;
  }
</style>
