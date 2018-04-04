<template>
  <section class="wrap">

    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <section class="content scrollBg">
      <div class="clearfix progressTitle progressTitleFir">
        <div class="fl dot"></div>
        <p class="fl title">注意事项</p>
      </div>
      <div class="samplingContent">
        <p>1. 采血区域布局合理，采光效果好，环境整洁，配备舒适座 椅。</p>
        <p>2. 采血台上医疗物品摆放续定点，定位，放置整齐，严格区
                分清洁区，污染区。</p>
        <p>3. 采血区域放置明显采血标识以及相关指示牌，能够做到合
                理分流，秩序井然，无明显拥堵现象。</p>
        <p>4.  排队顺序根据进采血场所的出入方向对应安排。</p>
        <p>5.  会场活动时间尽量在上午进行，要求受检者前一天和早上
                清淡饮食或者空腹。</p>
        <p>6. 认购审批时，发放号牌，受检者按顺序进入检测区。</p>
        <p>7. 静脉采血区是客户相对集中的地方，采血的过程也是可能
                造成感染机会较大的环节之一。为了保障医务人员和每位
                客户的健康，减少交叉感染，要求相关工作人员严格执行
                有关规定。</p>
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
        title0:"注意事项"
      }
    },
    mounted:function(){
    },
    created:function(){
    },
    components:{
      headerpart,
      footerpart
    }
  }
</script>
<style>
  .wrap .content{
    background: #fff;
    padding:0 0.8rem;
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

</style>
