<template>
  <section class="wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <section class="scrollBg">
      <div class="clearfix progressTitle progressTitleFir">
        <div class="fl dot"></div>
        <p class="fl title">负责组织采血师工作流程</p>
      </div>
      <div class="progressContent">
        <p> 1.根据<span class="redFont">提前预约</span>好的时间及地点，安排兼职采血师。</p>
        <p> 2.检测需安排一至两名工作人员协助采血师进行<span class="redFont">客户登记、发放采血管</span>等工作。</p>
      </div>
      <div class="clearfix progressTitle">
        <div class="fl dot"></div>
        <p class="fl title">外聘采血师护士的标准化要求</p>
      </div>
      <div class="progressContent">
        <p>1.提交采血师的<span class="redFont">资格证书</span>及<span class="redFont">身份证明</span>。</p>
        <p>2.护士的<span class="redFont">发型</span>：戴护士燕帽时，如果是长发，要盘起或戴网 罩。</p>
        <p>3.采血时必须要<span class="redFont">戴口罩</span>和<span class="redFont">隔离手套</span>。</p>
        <p>4.采血师宜化<span class="redFont">淡妆</span>，妆色要健康，不可妖艳。</p>
        <p>5.护士的<span class="redFont">着装</span>，隔离衣要清洁、平整。裙子的长度，不要超出护士裙服。</p>
        <p>6.护士的<span class="redFont">语言交流礼仪</span>，遵循礼貌，规范。</p>
      </div>
      <div class="clearfix progressTitle">
        <div class="fl dot"></div>
        <p class="fl title">检测服务流程话术</p>
      </div>
      <div class="progressContent">
        <p>1.您好，请坐！我是为您服务的采血师,我叫**。很高兴能为 </p>
        <p>2.您好，我现在核对一下您的基本信息，请问您是XX先生/女士吗？</p>
        <p>3.XX先生/女士，您好！请您露出某某部位，将您的手自然 放松就可以了。</p>
        <p>4.XX先生/女士，您好！我现在将会为您进行消毒。请问您
                对酒精过敏吗？如果您对酒精过敏，我会用生理盐水为您
                消毒，我现在为您消毒，可能会有点凉。</p>
        <p>5.XX先生/女士您好，静脉穿刺已经结束了，请您自行按压穿刺处5分钟。</p>
        <p>6.谢谢您的配合，请到休息区静坐10分钟，如您有疑问咨询。</p>
        <p>7.您好，您的检测报告将在10个工作日内发放到您的代理人手中，请耐心等候。</p>
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
        title0:"护士标准流程"
      }
    },
    mounted:function(){
    },
    created:function(){
//
    },
    components:{
      headerpart,
      footerpart
    }
  }
</script>
<style>
  .scrollBg{
    background: #fff;
    padding:0 0.8rem;
    /*height:25.7rem;*/
    height:100%;
    overflow-y: auto;
    margin-top:2.22rem;
  }
  .progressTitle{
    margin:0.5rem 0 0.2rem 0;
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
  .progressContent p{
    color:#3f3f3f;
    font-size:0.65rem;
  }
  .progressContent .redFont{
    color:#cd3939;
  }
</style>

