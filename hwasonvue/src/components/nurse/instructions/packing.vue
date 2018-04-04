<template>
  <section class="wrap">

    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <section id="content" class="scrollBg content">
      <div class="packingbox">
        <div class="clearfix progressTitle progressTitleFir">
          <div class="fl dot"></div>
          <p class="fl title">样本包装 <span>离心后,核对标本数量,填写《标本确认单》</span></p>
        </div>
        <div class="clearfix packingTitle">
          <img src="/static/img/nurse/instructions/packing/packing_01.jpg" alt="" class="fl">
          <div class="fl packing_boxContent">
            <div>包装箱内包括：</div>
            <ul>
              <li>1. 2个标本密封袋</li>
              <li>2. 冷冻冰袋</li>
              <li>3.《登记信息表》</li>
              <li>4.《标本确认单》</li>
              <li>5.冷藏箱</li>
              <li> 6.塑料填充物</li>
            </ul>
          </div>
        </div>
      </div>
      <ul class="steps">
        <li class="clearfix">
          <div class="imgContainer fl">
            <img src="/static/img/nurse/instructions/packing/packing_02.jpg" alt="">
          </div>
          <div class="line fl "></div>
          <div class="fl">
            <div class="vLine"></div>
            <div class="dot"></div>
            <div class="vLine"></div>
          </div>
          <div class="clearfix fl container">
            <img src="/static/img/nurse/instructions/packing/arrow.png" alt="" class="fl">
            <div class="fl  bgBiger">核对采血管与《登记信息表》的
                        标本数量，无误后按要求填写《
                        标本确认单》会场负责人签字。</div>
          </div>

        </li>
        <li class="clearfix">
          <div class="imgContainer fl">
            <img src="/static/img/nurse/instructions/packing/packing_03.jpg" alt="">
          </div>
          <div class="line fl "></div>
          <div class="fl">
            <div class="vLine"></div>
            <div class="dot"></div>
            <div class="vLine"></div>
          </div>
          <div class="fl describe">将标本竖直摆放入密封标本袋中，
                    一个标本袋子可放30只采血管。</div>
        </li>

        <li class="clearfix">
          <div class="imgContainer fl">
            <img src="/static/img/nurse/instructions/packing/packing_04.jpg" alt="">
          </div>
          <div class="line fl "></div>
          <div class="fl">
            <div class="vLine"></div>
            <div class="dot"></div>
            <div class="vLine"></div>
          </div>
          <div class="fl describe">取另一个标本袋，将《登记信息
                    表》，《标本确认单》放入密封。</div>
        </li>
        <li class="clearfix">
          <div class="imgContainer fl">
            <img src="/static/img/nurse/instructions/packing/packing_05.jpg" alt="">
          </div>
          <div class="line fl "></div>
          <div class="fl">
            <div class="vLine"></div>
            <div class="dot"></div>
            <div class="vLine"></div>
          </div>
          <div class="clearfix fl container">
            <img src="/static/img/nurse/instructions/packing/arrow.png" alt="" class="fl">
            <div class="fl  bgBiger">包装时，必须将标本的上下左右
                        固定稳妥，使标本在运输过程中
                        尽量保持采血管竖直状态，避免
                        剧烈震荡。</div>
          </div>
        </li>
        <li class="clearfix">
          <div class="imgContainer fl">
            <img src="/static/img/nurse/instructions/packing/packing_06.jpg" alt="">
          </div>
          <div class="line fl "></div>
          <div class="fl">
            <div class="vLine"></div>
            <div class="dot"></div>
            <div class="vLine"></div>
          </div>
          <div class="fl describe">放入冰箱和塑料填充物，可使用
                    当次的一次性蓝色垫巾进行填充。</div>
        </li>
        <li class="clearfix">
          <div class="imgContainer fl">
            <img src="/static/img/nurse/instructions/packing/packing_07.jpg" alt="">
          </div>
          <div class="line fl "></div>
          <div class="fl">
            <div class="vLine"></div>
            <div class="dot"></div>
            <div class="vLine"></div>
          </div>
          <div class="fl describe">在包装盒上画上箭头和注意事项，
                    尽量避免在运输过程中剧烈震荡。</div>
        </li>
      </ul>
      <div class="centrifugalAttention">
        <div class="attention">注意事项：</div>
        <div class="samplingContent">
          <p>1.标本需保持在4～8℃，箱内若无《登记信息表》和《标本
                    确认单》的标本概不接收。</p>
          <p>2.包装时，必须将标本固定稳妥，让标本在运输过程中尽量
                    保持采血管竖直状态，避免剧烈震荡。</p>
          <p>3.托运时，请在标本箱上用黑色记号笔清晰明显的标记上轻
                    拿轻放，向上等字样。</p>
          <p>4.主办方托运负责人将标本箱打包完成后，请第一时间通知
                    物流人员标本到达实验室的时间以及数量。</p>
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
        title0:"样本包装"
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
  }
  .scrollBg{
    height:28.7rem;
    overflow-y: scroll;
  }
  .packingbox{
    /*padding:0.75rem 0.8rem 0;*/
    height:6rem;
    background: #fff;
  }
  .packingbox .packingTitle{
    margin-top:0.4rem;
  }
  .progressTitle .dot{
    background: #338fff;
    height: 0.4rem;
    width: 0.4rem;
    margin:0.2rem 0.25rem 0 0;
    border-radius:50%;
  }
  .progressTitle .title,.centrifugalAttention .attention {
    color: #338fff;
    font-size:0.65rem;
  }
  .samplingContent p, .centrifugalAttention p{
    color:#3f3f3f;
    font-size:0.65rem;
    line-height: 1.1rem;
  }
  .steps{
    /*padding:0 0.8rem;*/
    background: #ecebeb;
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
    /*line-height: 1rem;*/
    padding:0.6rem 0 0 1rem;
    background-image: url("/static/img/nurse/instructions/collection/bg.png");
    background-repeat: no-repeat;
    background-size:100%;
    margin-top:1.4rem;
  }
  .steps .bgBiger{
    width:9.5rem;
    height: 4.25rem;
    background: #fff;
    padding:0.5rem 0 0 0.5rem;
    margin-top:1.2rem;
    border-radius: 0.5rem;
    color:#3f3f3f;
    line-height: 1rem;
  }
  .steps .container img{
    width: 0.5rem;
    height:0.95rem;
    display: block;
    margin-top:2.5rem;
  }
  .centrifugalAttention{
    padding:0 0.8rem;
  }
  .centrifugalAttention span{
    color:#cd3939;
    font-size:0.65rem;
  }
  .centrifugalAttention .brightFont p{
    color:#338fff;
  }
  .centrifugalAttention .brightFont img{
    width:17rem;
    height:9.25rem;
  }
  .title span{
    color:#cd3939;
  }
  .packingTitle img{
    width:6.7rem;
    height:4.45rem;
  }
  .packing_boxContent{
    width:60%;
    /*margin-left:0.25rem;*/
    /*margin:0.5rem 0 0 0.25rem;*/
  }
  .packing_boxContent li{
    float:left;
    margin-left:0.5rem;
  }
</style>
