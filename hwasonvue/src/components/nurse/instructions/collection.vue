<template>
  <section class="wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <section id="content" class="scrollBg">
      <div class="samplingBox">
        <div class="clearfix progressTitle progressTitleFir">
          <div class="fl dot"></div>
          <p class="fl title">样本采集</p>
        </div>
        <div class="samplingContent">
          <p>1. 请客户从登记台移步至采血台做好采血准备</p>
          <p>2. 护士核对采血管信息后</p>
        </div>
      </div>
      <ul class="steps">
        <li class="clearfix">
          <div class="imgContainer fl">
            <img src="/static/img/nurse/instructions/collection/collection_01.png" alt="">
          </div>
          <div class="line fl "></div>
          <div class="fl">
            <div class="vLine"></div>
            <div class="dot"></div>
            <div class="vLine"></div>
          </div>
          <div class="fl describe">束扎压脉带</div>
        </li>
        <li class="clearfix">
          <div class="imgContainer fl">
            <img src="/static/img/nurse/instructions/collection/collection_02.png" alt="">
          </div>
          <div class="line fl "></div>
          <div class="fl">
            <div class="vLine"></div>
            <div class="dot"></div>
            <div class="vLine"></div>
          </div>
          <div class="fl describe">酒精棉消毒</div>
        </li>
        <li class="clearfix">
          <div class="imgContainer fl">
            <img src="/static/img/nurse/instructions/collection/collection_03.png" alt="">
          </div>
          <div class="line fl "></div>
          <div class="fl">
            <div class="vLine"></div>
            <div class="dot"></div>
            <div class="vLine"></div>
          </div>
          <div class="fl describe">一次性采血针进针刺入血管</div>
        </li>
        <li class="clearfix">
          <div class="imgContainer fl">
            <img src="/static/img/nurse/instructions/collection/collection_04.png" alt="">
          </div>
          <div class="line fl "></div>
          <div class="fl">
            <div class="vLine"></div>
            <div class="dot"></div>
            <div class="vLine"></div>
          </div>
          <div class="fl describe">看到采血针针管回血,另一端插入采血管,解开压脉带</div>
        </li>
        <li class="clearfix">
          <div class="imgContainer fl">
            <img src="/static/img/nurse/instructions/collection/collection_05.png" alt="">
          </div>
          <div class="line fl "></div>
          <div class="fl">
            <div class="vLine"></div>
            <div class="dot"></div>
            <div class="vLine"></div>
          </div>
          <div class="fl describe">是血液沿采血液换换流入采血管,待到容器的4/5位置拔针即可</div>
        </li>
        <li class="clearfix">
          <div class="imgContainer fl">
            <img src="/static/img/nurse/instructions/collection/collection_06.png" alt="">
          </div>
          <div class="line fl "></div>
          <div class="fl">
            <div class="vLine"></div>
            <div class="dot"></div>
            <div class="vLine"></div>
          </div>
          <div class="fl describe">将采血针拔下，放入锐气盒采血结束</div>
        </li>
      </ul>
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
        title0:"样本采集"
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
    background: #ecebeb;
  }
  .scrollBg{
    height:28.7rem;
    overflow-y: auto;
  }
  .samplingBox{
    /*padding:0.75rem 0.8rem 0;*/
    height:3.25rem;
    background: #fff;
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

  .steps .imgContainer{
    width:4.85rem;
    height:4.4rem;
    border-radius: 0.5rem;
    overflow: hidden;
    margin:0.8rem 0;
  }
  .steps .imgContainer img{
    width:4.85rem;
    height:4.4rem;
  }
  .steps .line{
    width: 0.9rem;
    height: 0.05rem;
    background: #cacaca;
    margin-top:2.9rem;
  }
  .steps .vLine{
    width: 0.05rem;
    height:2.6rem;
    background: #cacaca;
    margin-left:0.4rem;
  }
  .steps .dot{
    height:0.8rem;
    width: 0.8rem;
    background: #338fff;
    border-radius: 50%;
  }
  .steps .describe{
    width:9.55rem;
    height: 2.45rem;
    color:#3f3f3f;
    font-size:0.65rem;
    line-height: 1rem;
    padding:0.6rem 0 0 1rem;
    background-image: url("/static/img/nurse/instructions/collection/bg.png");
    background-repeat: no-repeat;
    background-size:100%;
    margin-top:1.4rem;
  }
</style>
