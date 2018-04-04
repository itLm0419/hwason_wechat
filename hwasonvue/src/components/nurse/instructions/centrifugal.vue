<template>
  <section class="wrap">

    <headerpart :imgaddr="imgaddr0" :title="title0"></headerpart>
    <section id="" class="scrollBg">
      <div class="samplingbox">
        <div class="clearfix progressTitle progressTitleFir">
          <div class="fl dot"></div>
          <p class="fl title">样本离心</p>
        </div>
        <div class="samplingContent">
          <p>离心机的配件：离心机主机,机盖,套管,电源线等。</p>
          <div class="centrifugalTitle">
            <span>时间5-7分钟</span>
            <img src="/static/img/nurse/instructions/centrifugal/centrifugal.jpg" alt="">
            <span>转速调至做大4000转</span>
          </div>
        </div>
      </div>
      <ul class="steps">
        <li class="clearfix">
          <div class="imgContainer fl">
            <img src="/static/img/nurse/instructions/centrifugal/centrifugal_01.jpg" alt="">
          </div>
          <div class="line fl "></div>
          <div class="fl">
            <div class="vLine"></div>
            <div class="dot"></div>
            <div class="vLine"></div>
          </div>
          <div class="fl describe">接通离心机电源</div>
        </li>
        <li class="clearfix">
          <div class="imgContainer fl">
            <img src="/static/img/nurse/instructions/centrifugal/centrifugal_02.jpg" alt="">
          </div>
          <div class="line fl "></div>
          <div class="fl">
            <div class="vLine"></div>
            <div class="dot"></div>
            <div class="vLine"></div>
          </div>
          <div class="fl describe">打开离心机透明盖</div>
        </li>
        <li class="clearfix">
          <div class="imgContainer fl">
            <img src="/static/img/nurse/instructions/centrifugal/centrifugal_03.jpg" alt="">
          </div>
          <div class="line fl "></div>
          <div class="fl">
            <div class="vLine"></div>
            <div class="dot"></div>
            <div class="vLine"></div>
          </div>
          <div class="fl describe">一定要平衡放入采血管</div>
        </li>
        <li class="clearfix">
          <div class="imgContainer fl">
            <img src="/static/img/nurse/instructions/centrifugal/centrifugal_04.jpg" alt="">
          </div>
          <div class="line fl "></div>
          <div class="fl">
            <div class="vLine"></div>
            <div class="dot"></div>
            <div class="vLine"></div>
          </div>
          <div class="fl describe">轻轻盖上盖子</div>
        </li>
        <li class="clearfix">
          <div class="imgContainer fl">
            <img src="/static/img/nurse/instructions/centrifugal/centrifugal_05.jpg" alt="">
          </div>
          <div class="line fl "></div>
          <div class="fl">
            <div class="vLine"></div>
            <div class="dot"></div>
            <div class="vLine"></div>
          </div>
          <div class="fl describe">调整到4000转速,运转5-7分钟</div>
        </li>
        <li class="clearfix">
          <div class="imgContainer fl">
            <img src="/static/img/nurse/instructions/centrifugal/centrifugal_06.jpg" alt="">
          </div>
          <div class="line fl "></div>
          <div class="fl">
            <div class="vLine"></div>
            <div class="dot"></div>
            <div class="vLine"></div>
          </div>
          <div class="fl describe">打开离心机中央的绿色开关</div>
        </li>
      </ul>
      <div class="centrifugalAttention">
        <div class="attentionTitle">注意事项：</div>
        <div class="samplingContent">
          <p>1.采血管放入时，<span>必须平衡离心</span>。例如：针对6个孔的离心机
                    在就剩下2个采血管未离心的情况下，可以把已经离心好的
                    4个采血管放入其他空置的位置帮助平衡。</p>
          <p>2.采血管离心时间为5-7分钟，一定要倒置几次确认一下是否<span>完全血清分离成功</span>。</p>
        </div>
        <div class="brightFont">
          <p>血液标本通过离心后，请确认血清是否已成功分离，一般会出现以下情况：</p>
          <img src="/static/img/nurse/instructions/centrifugal/centrifugal_07.jpg" alt="">
        </div>
        <div class="attentionTitle">注意事项：</div>
        <div class="samplingContent">
          <p>1.采集前应叮嘱客户清淡饮食，不要吃太过油腻的食品，避
                    免出现脂血现象。</p>
          <p>2.产生溶血多半是由于客户血管较细，血液不易流出导致。</p>
          <p>3.出现脂血，溶血现象可将标本先寄送实验室，若较严重无
                    法进行检测的，会告知采集单位通知客户重新采集。</p>
          <p>4.采血时，一定要保证采血管微微倾斜，让血液沿血管壁缓
                    缓流入。</p>
          <p>5.如果发现采血不进血，请更换新管，同时及时更换相同条
                    形码和编写序号。因为采血管是真空负压管，一旦刺入进
                    入空气，就不能再使用了。</p>
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
        title0:"样本离心"
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
  .wrap #content{
    background: #fff;
  }
  .scrollBg{
    height:28.7rem;
    overflow-y: scroll;
  }
  .samplingbox{
    /*padding:0.75rem 0.8rem 0;*/
    /*height:5.9rem;*/
    background: #fff;
  }
  .progressTitle .dot{
    background: #338fff;
    height: 0.4rem;
    width: 0.4rem;
    margin:0.2rem 0.25rem 0 0;
    border-radius:50%;
  }
  .progressTitle .title,.centrifugalAttention .attentionTitle {
    color: #338fff;
    font-size:0.65rem;
  }
  .samplingContent p, .centrifugalAttention p{
    color:#3f3f3f;
    font-size:0.65rem;
    line-height: 1.1rem;
  }
 .steps{
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
    font-size:0.65rem;
    line-height: 1rem;
    padding:0.6rem 0 0 1rem;
    background-image: url("/static/img/nurse/instructions/collection/bg.png");
    background-repeat: no-repeat;
    background-size:100%;
    margin-top:1.4rem;
  }
  .centrifugalTitle{
  padding:0.3rem 0;
  }
  .centrifugalTitle img{
    height:3.15rem;
    width:7.35rem;
  }
  .centrifugalAttention{
    padding:0 0.8rem;
  }
  .centrifugalAttention span{
    color:#cd3939;
    font-size:0.65rem;
  }
  .centrifugalAttention .brightFont{
    margin:1rem 0 0.75rem;
  }
  .centrifugalAttention .brightFont p{
    color:#338fff;
  }
  .centrifugalAttention .brightFont img{
    width:17rem;
    height:9.25rem;
  }
</style>
