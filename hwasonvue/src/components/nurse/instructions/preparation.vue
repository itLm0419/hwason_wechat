<template>
  <section class="wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <section id="content" class="scrollBg content">
      <div class="clearfix progressTitle progressTitleFir">
        <div class="fl dot"></div>
        <p class="fl title">准备步骤</p>
      </div>
      <div class="samplingContent">
        <p>1. 清点收到的耗材是否跟托运清单一致。</p>
        <p>2. 消毒液和冰袋是否已经泡好冷冻</p>
        <p class="remark">（冰袋已经提供,但需机构提前冷冻备用）</p>
        <p>3. 每位护士和登记人员都需要一标准桌,参考下图。</p>
        <div class="altIcon">
          <img src="/static/img/nurse/instructions/preparation_01.png" alt="">
        </div>
        <p>4. 客户信息登记人员1-3名,要求字迹清晰易认,有责任心细致。</p>
        <p>5. 登记人员协助标本离心工作。</p>
        <p>6. 选择好采血区域后进行采血区域消毒处理。</p>
        <p>7. 标本采集结束后</p>
        <p class="remark">要求 ① 登记人员要制作电子版客户信息登记表Excel表格,
                发送到指定邮箱。</p>
        <p class="remarksub">②协助标本包装,电话预约第三方物流上门取件。</p>
        <div class="suggestionbright">（建议每一步骤制定专门的负责人，防止标本遗失。防止信息错误。谨慎小心。）</div>
        <div class="progressIcons">
          <img src="/static/img/nurse/instructions/preparation_02.png" alt="" class="firstRow">
          <img src="/static/img/nurse/instructions/preparation_03.png" alt="">
        </div>

      </div>
    </section>
    <!--标题结束-->
  </section>
</template>
<script>
  import headerpart from '../../company/wechat/headerpart';
  import footerpart from '../footerpart';
  import Vue from 'vue'
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"准备步骤"
      }
    },
    mounted:function(){
    },
    created:function(){
//          GetTodayActivity();
    },
    components:{
      headerpart,
      footerpart
    }
  }
</script>
<style>
  .wrap #content{
    background: #fff;
    padding:0 0.8rem;
  }
  .scrollBg{
    height:28.7rem;
    overflow-y: scroll;
  }
  .progressTitle{
    margin:1.2rem 0 0.2rem 0;
  }
  .progressTitleFir{
    margin-top:0.75rem;
  }
  .progressTitle .dot{
    background: #338fff;
    height: 0.4rem;
    width: 0.4rem;
    margin:0.2rem 0.25rem 0 0;
    border-radius:50%;
  }
  .progressTitle .title{
    color: #338fff;
    font-size:0.65rem;
    margin:0;
  }
  .samplingContent p{
    color:#3f3f3f;
    font-size:0.65rem;
    line-height: 1.1rem;
  }
  .samplingContent p.remark{
    margin-left:0.75rem;
  }
  .samplingContent p.remarksub{
    margin-left:2.2rem;
  }
  .samplingContent .altIcon img{
    width: 17.15rem;
    height:10.25rem;
    margin:0.2rem 0;
  }
  .suggestionbright{
    margin-top:1rem;
    color:#cd3939;
    font-size:0.6rem;
  }
  .progressIcons img{
    height: 4.925rem;
    width:17.15rem;
  }
  .progressIcons img.firstRow{
    margin:0.375rem 0 1.125rem;
  }
</style>
