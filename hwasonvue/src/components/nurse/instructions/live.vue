<template>
  <section class="wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <!--标题结束-->
    <section id="content" class="scrollBg content">
      <div class="clearfix progressTitle progressTitleFir">
        <div class="fl dot"></div>
        <p class="fl title">现场步骤</p>
      </div>
      <div class="samplingContent">
        <p>1. 现场采血台使用的耗材拜访如下：</p>
        <div class="altIcon">
          <img src="/static/img/nurse/instructions/live_01.png" alt="">
          <div class="clearfix">
            <div class="fr redFont">采血护士必须在客户指定时间提前20分钟到达现场进行耗材摆放</div>
          </div>
        </div>
        <p>2. 现场登记台使用的耗材摆放如下：</p>
        <div class="altIcon">
          <img src="/static/img/nurse/instructions/live_02.png" alt="">
          <div class="clearfix">
            <div class="fr redFont">登记者须严格按照培训登记，试管条码竖贴，字迹工整清晰</div>
          </div>
        </div>
        <p>3. 现场样本清单如下：</p>
        <div class="altIcon">
          <img src="/static/img/nurse/instructions/live_03.png" alt="">
          <div class="clearfix">
            <div class="fr redFont">表格用于现场样本统计核对，保险公司填写护士请点数量后签字确认和样本一起寄到实验室。</div>
          </div>
        </div>
        <p>4. 现场清理事项：</p>
        <div class="altIconLast clearfix">
          <img src="/static/img/nurse/instructions/live_04.png" alt="" class="fl">
          <div class="fr redFont">表格用于现场样本统计核对，保险公司填写护士请点数量后签字确认和样本一起寄到实验室。</div>
        </div>

      </div>
    </section>
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
        title0:"现场步骤"
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
  }
  .samplingContent p{
    color:#3f3f3f;
    font-size:0.65rem;
    line-height: 1.1rem;
  }
  .samplingContent .altIcon img{
    width: 17.15rem;
    height:10.25rem;
    margin:0.2rem 0;
  }
  .samplingContent .altIcon .redFont,.altIconLast .redFont{
    color:#cd3939;
    font-size:0.6rem;
    margin-bottom: 0.9rem;
  }
  .progressIcons img{
    height: 4.925rem;
    width:17.15rem;
  }
  .altIconLast img{
    height: 5.75rem;
    width: 5.75rem;
  }
  .altIconLast div{
    width:65%;
    margin-top:3.3rem;
  }
</style>
