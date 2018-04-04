<template>
  <section class="wrap">
    <headerpart :imgaddr="imgaddr0"  :title="title0">  </headerpart>
  <section class="content"  >
    <div class="toQuestion">欢迎反馈活动中的各项问题，以方便我们改进</div>
    <div class="questionBox">
      <textarea name="question" id="question" placeholder="请简明扼要输入问题"></textarea>
    </div>
    <div class="clearfix tel">
      <div class="fr telNum">联系我们025-678-8888</div>
      <img src="/static/img/company/wechat/activityinfo/phone.png" alt="" class="fr">
    </div>
    <!--<input type="submit" class="submit">-->
    <div class="submit">提交</div>
  </section>
    <footerpart></footerpart>
  </section>
</template>
<script>
  import headerpart from "../headerpart"
  import footerpart from "../footerpart"

  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0: "问题反馈"


      }
    },
    mounted: function () {

    },
    components: {
      headerpart,
      footerpart

    },
    methods: {}
  }
</script>
<style>
  .content{
    margin-top:2.22rem;
  }
  .toQuestion{
    color:#3f3f3f;
    font-size:0.7rem;
    margin:0.8rem 0 0.5rem 1.25rem;
  }
  .questionBox{
    width:17.25rem;
    height:15rem;
    margin:0 auto;
  }
  .questionBox #question{
    outline: none;
    resize:none;
    width:17.25rem;
    height:15rem;
    border-color:#dadada;
    text-indent: 0.5rem;
    line-height: 1.2rem;
  }
  .tel{
    margin:0.75rem 0.95rem 2rem 0.25rem;
  }
  .tel .telNum{
    color:#338fff;
    font-size:0.6rem;
  }
  .tel img{
    width: 0.85rem;
    height:0.85rem;
  }
  .submit{
    width:16.6rem;
    height:2.25rem;
    margin: 0 auto;
    font-size:1rem;
    border-radius: 0.125rem;
    border:none;
    display: block;
    text-align: center;
    line-height: 2.25rem;
    color:#fff;
    background: #338fff;
  }

</style>
