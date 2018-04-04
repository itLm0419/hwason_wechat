<template>
  <section class="wrap">
    <!--<headerpart :imgaddr="imgaddr0"> </headerpart>-->
    <header>
      <div class="mianTitle">检测包使用及申请</div>
    </header>
    <!--标题结束-->
    <section>
      <div class="clearfix">
        <div class="companyName fl">{{companyName}}</div>
      </div>
      <div class="btnBox">
        <router-link to="/company/apply" class="apply">
         申请
        </router-link>

        <router-link to="/comapny/deliverydetaillist" class="apply">
         发放明细
        </router-link>

      </div>

    </section>
    <!--标题结束-->
    <footerpart></footerpart>
  </section>
</template>

<script>
  import headerpart from "../headerpart"
  import footerpart from "../footerpart"

  export default {
    data(){
      return {
//        imgaddr0: "/static/img/home.png"
      }
    },
    mounted:function(){

    },
    components:{
      headerpart,
      footerpart
    }
  }
</script>
<style>
  .samplePkgBg{
    background: #fff;
    margin-top:0.5rem;
    /*padding:0.2rem 0;*/
  }
  .samplePkgBg .Table{
    margin-bottom:0.5rem;
  }
  .companyName{
    color:#338fff;
    height:1.65rem;
    font-size:0.7rem;
    line-height: 1.65rem;
    /*margin-left:0.75rem;*/
  }
  /*下载按钮*/
  .dLoadBtn{
    margin:0.5rem 0.8rem 0 0;
  }
  .dLoadBtn img{
    height: 0.8rem;
    width:0.8rem;
    margin-left:0.7rem;
  }
  .dLoadBtn .dLoadFont{
    color:#338fff;
    font-size:0.5rem;
    line-height: 0.5rem;
  }
  /*表单*/
  .table,.Table{
    width:17.3rem;
    background: #fff;
    margin:0.2rem auto 0.55rem;
    border-color: #b0b0b0;
  }
  .table tr, .Table tr{
    height: 2.05rem;
  }
  .table td,.Table td{
    width:3.25rem;
    text-align: center;
    font-size:0.7rem;
  }
  .table .firCol,.Table .firCol{
    width:4.25rem;
  }
  .table .formName,.Table .formName{
    font-size:0.75rem;
    font-weight:bold;
  }
  .table .tr_title td,.Table .tr_title td{
    font-weight:bold;
    font-size:0.7rem;
  }
  .Table .applyNum{
    border:0;
    font-size:0.7rem;
    width:100%;
    height:100%;
    color:#338fff;
    text-align: center;
  }
  /*按钮*/
  .btnBox a,.btnBox .login,.btnBox .submit{
    width:16.6rem;
    height:2.25rem;
    margin: 0 auto;
    font-size:1rem;
    border-radius: 0.125rem;
    display: block;
    text-align: center;
    line-height: 2.25rem;
    margin-top:0.9rem;
  }
  .btnBox{
    width: 16.6rem;
    margin:0 auto;
  }
  .btnBox .apply{
    color:#fff;
    background: #338fff;
    margin:2rem 0;
  }
  .btnBox a.detailed{
    border:0.05rem solid #338fff;
    color:#338fff;
    margin-top:2rem;
  }
  .btnBox .submit,.btnBox .login{
    margin-top:1.5rem;
    border:0;
    color:#fff;
    background: #338fff;
  }
  .btnBox .submit{
    margin-top:15rem;
  }
  /*申请表*/
  .application{
    width:16.6rem;
    margin:2.2rem auto 0 ;
    text-align: right;
  }
  .application a{
    color:#338fff;
    font-size:0.55rem;
  }
</style>
