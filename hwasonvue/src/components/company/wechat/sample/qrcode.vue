<template>
  <section class="wrap">
    <header>
      <div class="mianTitle">二维码下载</div>
    </header>
    <!--标题结束-->

    <section class="content">
      二维码下载
    </section>
    <!--标题结束-->
    <footer>
      <nav class="clearfix">
        <a href="/wechat/company/consultation/consultation">
          <img src="/images/wechat/company/msg.png" alt="">
          <div class="sortNmae">活动咨讯</div>
        </a>
        <a href="/wechat/company/activity/main">
          <img src="/images/wechat/company/activity.png" alt="">
          <div class="sortNmae">活动行事 </div>
        </a>
        <a href="/wechat/company/package/package">
          <img src="/images/wechat/company/package.png" alt="">
          <div class="sortNmae">检测包</div>
        </a>
        <a href="/wechat/company/demo/demo">
          <img src="/images/wechat/company/demo.png" alt="">
          <div class="sortNmae">样本跟踪</div>
        </a>
        <a href="/wechat/company/code/code" class="active">
          <img src="/images/wechat/company/dload.png" alt="">
          <div class="sortNmae">二维码下载</div>
        </a>
      </nav>
    </footer>
  </section>
</template>
<script>
  import headerpart from "../headerpart"
  import footerpart from "../footerpart"
  export default {
    components:{
      headerpart,
      footerpart
    }
  }
</script>
<style>

</style>
