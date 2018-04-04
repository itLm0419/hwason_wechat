<template>
  <section class="wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>

    <section>
      <div class="addBlank"></div>
      <div class="companyName">中国人寿扬州分公司</div>
      <form action="" method="post">
        <ul class="searchCustomer">
          <li class="clearfix" >
            <span class="checkName fl">体检套餐</span>
            <input type="text" name="medicalPkg" class="fr">
          </li>
          <li class="clearfix">
            <span class="checkName fl">开始时间</span>
            <input type="text" name="name" class="fr"/>
          </li>
          <li class="clearfix">
            <span class="checkName fl">结束时间</span>
            <input type="text" name="salesmanTel" class="fr"/>
          </li>
          <li class="clearfix removeBorder">
            <span class="checkName fl">客户姓名</span>
            <input type="text" name="id" class="fr" placeholder="请输入要查询客户姓名"/>
          </li>
        </ul>
      </form>
      <div class="searchSetBtn">
        <a href="javascript:;" class="subBtn">确定</a>
        <a href="javascript:;" class="canBtn">取消</a>
      </div>
    </section>
    <!--标题结束-->
  </section>
</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import Vue from 'vue'
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"搜索设置"
      }
    },
    mounted:function(){
    },
    created:function(){
//          GetTodayActivity();
    },
    components:{
      headerpart,
    }
  }
</script>
<style>
  .addBlank{
    height:2.2rem;
  }

  .searchCustomer{
    width:100%;
    background:#fff ;
  }
  .searchCustomer li{
    width:17.25rem;
    height:2.475rem;
    margin-left:0.75rem;
    border-bottom:1px solid #dcdcdc;
  }
  .searchCustomer li.removeBorder{
    border:0;
  }
  .searchCustomer li span{
    color:#333;
    line-height: 2.475rem;
    font-size:0.7rem;
  }
  .searchCustomer li input{
    width:71%;
    height:100%;
    border:0;
  }
  .searchCustomer li img{
    height: 0.45rem;
    width: 0.45rem;
    margin: 1rem 0.2rem 0 0
  }
  .searchSetBtn a{
    width:16.65rem;
    height:2.25rem;
    display: block;
    margin:0 auto;
    background: #d9d9d9;
    text-align: center;
    line-height: 2.25rem;
    font-size:1rem;
  }
  .searchSetBtn .subBtn{
    color:#fff;
    margin: 8.35rem auto 0.9rem;
    background: #338fff;
    background: -webkit-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: -o-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: -ms-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: linear-gradient(top, #318ffe 0%,#1d69f0 100%)
  }
  .searchSetBtn .canBtn{
    color:#338fff;
    border:0.05rem solid #338fff;
    background: #fff;
  }
</style>

