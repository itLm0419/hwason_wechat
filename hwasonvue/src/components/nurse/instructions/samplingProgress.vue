<template>
  <section class="wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>

    <section id="content" class="content">
      <div class="clearfix progressTitle progressTitleFir">
        <div class="fl dot"></div>
        <p class="fl title">采血标准流程</p>
      </div>
      <div class="samplingContent">
        <p>1. 请按照规定时间到达采血现场，负责静脉采血工作。</p>
        <p>2. 将所有医疗用品按照标准整齐摆放在采血桌面上。</p>
        <p>3. 熟练相关检验项目，熟练掌握采血程序以及采血器的使用。</p>
        <p>4. 请在采血前请穿好隔离衣，戴好护士帽，挂牌上岗，规范服务。</p>
        <p>5. 工作期间请使用服务文明用语，态度和蔼，服务细心周到</p>
        <p>6. 认真核对客户信息，有疑问时请与相关工作人员联系, 确保
                标本准确无误。</p>
        <p>7. 客户信息与试管的序号及条码准确核对后再进行静脉穿刺。</p>
        <p>8. 采血前，选择最佳部位进行皮肤消毒处理。</p>
        <p>9. 三查：采血前查、采血中查、采血后查。</p>
        <p>10.七对：对姓名、性别、年龄、采血管、序号、条码、检测
                项目。</p>
        <p>11.请严格执行无菌操作，做到技术精湛，操作要轻，一针见
                血。</p>
        <p>12.抽血完毕，将一次性采血针放入锐器盒内。叮嘱客户用消
                毒棉签按压穿刺处5分钟并向客户说明采血后的注意事项及
                体检报告发放方式。</p>
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
        title0:"采血标准流程"
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
  .wrap #content{
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
