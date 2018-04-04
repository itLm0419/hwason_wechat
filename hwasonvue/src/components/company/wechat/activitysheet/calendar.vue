<template>
  <section class="wrap">
    <headerpart> </headerpart>
    <section class="content">
    <!-- 添加背景容器-->
    <div class="bg" >
      <div id="calendar0">
      <div class="companyName" >中国人寿扬州分公司</div>
      <ul class="dataTitle">
        <li class="fixTitle"><img src="/static/img/company/wechat/activitysheet/activeIcon.png" class="activeIcon" alt=""></li>
        <li class="fixTitle midTitle">
          <ul class="clearfix yearAndMonth">
            <li class="fl">
              <a href="javascript:;" class="pre">
                <img src="/static/img/company/wechat/activitysheet/next_left.png" alt="" v-on:click="PreMonth">
              </a>
            </li>
            <li class="fl showTime">
              <div class="yMonth">
                <span class="year" >{{year}}</span>年<span class="month0" >{{month}}</span>
              </div>
            </li>
            <li class="fl">
              <a href="javascript:;" class="next">
                <img src="/static/img/company/wechat/activitysheet/next_right.png" alt="" v-on:click="NextMonth">
              </a></li>
          </ul>
        </li>
        <li class="fixTitle today">今</li>
      </ul>
      <ul class="clearfix mToS">
        <li class="fl weekday">日</li>
        <li class="fl">一</li>
        <li class="fl">二</li>
        <li class="fl">三</li>
        <li class="fl">四</li>
        <li class="fl">五</li>
        <li class="fl weekday">六</li>
      </ul>
      <ul class="oneMonth clearfix">
        <li  class="fl " v-for="(day0,$index) in DayofDate" v-on:click="Showactivity($index)">
          <a href="javascript:" v-bind:class="{'on': day0==date||(day0==DayofDate[i])&&($index==i)}">
            <span v-bind:class="{'notthismonth': ($index+1< WeekofDay)||($index+1>Nextmonthday)}">{{day0}}</span>
          </a>

       </li>
      </ul>
      </div>
      <div class="upOrDownList" id="list0" v-on:touchstart="scrollup($event)" v-on:touchmove="scrollup($event)"  v-on:touchend="scrollup($event)" v-bind:style="{top:posY+'px',height:Height0+'px'}" >
        <div class="clearfix actBox" id="listdetail" >
          <div class="fl actDetail">活动情况</div>
          <a href="javascript:;" class="addBtn fr"><img src="/static/img/company/wechat/activitysheet/addIcon.png" alt="" class="addDemo"></a>
        </div>
      <!--  <div class="clearfix activeDetail" v-bind:style="{height:heightdetail+'px' }"> -->
        <div class="clearfix activeDetail">
          <div class="fl itemsBox"  v-bind:style="{height:heightitem+'px' }" v-on:click="openlistdetail($event)">
            <div class="items" >
              <ul class="clearfix">
                <li class="fl"><img src="/static/img/company/wechat/activitysheet/itemIcon.png" alt="">CCVD检测</li>
                <li class="fr peopleNum"><img src="/static/img/company/wechat/activitysheet/peopleIcon.png" class="addressIcon" alt="">预计60人</li>
              </ul>
              <ul>
                <li><img src="/static/img/company/wechat/activitysheet/dateIcon.png" alt="">2017/4/1 上午09:30-10:30</li>
                <li><img src="/static/img/company/wechat/activitysheet/address.png" alt="">南京市江宁区百家湖国际会议中心</li>
                <li><img src="/static/img/company/wechat/activitysheet/demoIcon.png" alt="">的点点滴滴多</li>
              </ul>
            </div>
            <div class="items">
              <ul class="clearfix">
                <li class="fl"><img src="/static/img/company/wechat/activitysheet/itemIcon.png" alt="">CCVD检测</li>
                <li class="fr peopleNum"><img src="/static/img/company/wechat/activitysheet/peopleIcon.png" class="addressIcon" alt="">预计60人</li>
              </ul>
              <ul>
                <li><img src="/static/img/company/wechat/activitysheet/dateIcon.png" alt="">2017/4/1 上午09:30-10:30</li>
                <li><img src="/static/img/company/wechat/activitysheet/address.png" alt="">南京市江宁区百家湖国际会议中心</li>
                <li><img src="/static/img/company/wechat/activitysheet/demoIcon.png" alt="">的点点滴滴多</li>
              </ul>
            </div>
            <div class="items">
              <ul class="clearfix">
                <li class="fl"><img src="/static/img/company/wechat/activitysheet/itemIcon.png" alt="">CCVD检测</li>
                <li class="fr peopleNum"><img src="/static/img/company/wechat/activitysheet/peopleIcon.png" class="addressIcon" alt="">预计60人</li>
              </ul>
              <ul>
                <li><img src="/static/img/company/wechat/activitysheet/dateIcon.png" alt="">2017/4/1 上午09:30-10:30</li>
                <li><img src="/static/img/company/wechat/activitysheet/address.png" alt="">南京市江宁区百家湖国际会议中心</li>
                <li><img src="/static/img/company/wechat/activitysheet/demoIcon.png" alt="">的点点滴滴多</li>
              </ul>
            </div>
            <div class="items">
              <ul class="clearfix">
                <li class="fl"><img src="/static/img/company/wechat/activitysheet/itemIcon.png" alt="">CCVD检测</li>
                <li class="fr peopleNum"><img src="/static/img/company/wechat/activitysheet/peopleIcon.png" class="addressIcon" alt="">预计60人</li>
              </ul>
              <ul>
                <li><img src="/static/img/company/wechat/activitysheet/dateIcon.png" alt="">2017/4/1 上午09:30-10:30</li>
                <li><img src="/static/img/company/wechat/activitysheet/address.png" alt="">南京市江宁区百家湖国际会议中心</li>
                <li><img src="/static/img/company/wechat/activitysheet/demoIcon.png" alt="">的点点滴滴多</li>
              </ul>
            </div>
          </div>
          <div class="fl iconsBtn">
            <div class="line"></div>
            <a href="javascript:;" class="retireBtn"> <img src="/static/img/company/wechat/activitysheet/retire.png" alt=""></a>
            <div class="line"></div>
            <img src="/static/img/company/wechat/activitysheet/delete.png" alt="" class="deleteIcon">
          </div>
        </div>
      </div>
    </div>
  </section>
    <a><router-link to="/activityinfo">创建一个任务</router-link></a>
    <router-link to="/activityinfo">创建一个任务m</router-link>
    <footerpart></footerpart>
   </section>
</template>
<script>
  import calendarjs from "../../../../util/calendarjs.js"
  import headerpart from "../headerpart"
  import footerpart from "../footerpart"
  var startx,starty,startposY,originHeight,origindetailH,originitemH;

  function openlistdetail(event){
    alert("ok")

  }
  export default {
    name : 'calendar',
    data(){
      return {
        year:  "",
        month: "",
        date:"",
        DayofDate: [],
        WeekofDay:0,
        Nextmonthday: 0,
        i: -1,
        posY: 0,
        Height0:0,
        heightdetail:290,
        heightitem:260,
        Isclickday:false,
        Notthismonth:false

      }
    },
    created: function() {
      //var dataobj1= calendarjs.dateObj();
      this.year = new Date().getFullYear();
      this.month = new Date().getMonth() + 1;
      this.date  = new Date().getDate();

      var calen=calendarjs.showCalendarData(this.year,this.month);
      this.DayofDate=calen.DayofDate;
      this.WeekofDay=calen._WeekofDay;
      this.Nextmonthday=calen.Nextmonthday;

      console.log("aaaaaaaaaaaaaaaaaaaaaa");

    },
    computed:{

    },
    mounted:function(){

      originHeight=document.getElementById('calendar0').clientHeight;
      console.log("clientHeight:"+originHeight);
      this.Height0=originHeight;
      startposY=0;
      this.posY=0;
      origindetailH=this.heightdetail;
      originitemH=this.heightitem;

    },
    components:{
      headerpart,
      footerpart
    },


    methods : {


      scrollup(event){
        if(event.type =="touchstart")
        {
          event.preventDefault();
            //alert("touchstart");
          startx=event.touches[0].pageX;
          starty=event.touches[0].pageY;
          }
        else if(event.type =="touchmove") {

         console.log("X:" + (event.touches[0].pageX - startx) + "Y:" + (event.touches[0].pageY - starty));
          //  document.getElementById("listdetail").style.left=this.posX+(event.touches[0].pageX-startx);
          //  document.getElementById("listdetail").style.top=this.posY+(event.touches[0].pageY-starty);
          this.posY = startposY + (event.touches[0].pageY - starty);
          this.Height0=originHeight-(event.touches[0].pageY - starty);
          this.heightdetail=origindetailH-(event.touches[0].pageY - starty);
          this.heightitem=originitemH-(event.touches[0].pageY - starty);

          //this.posY = this.posY+20;



        }
        else if(event.type =="touchend"){
          event.preventDefault();
          if(this.posY<1) openlistdetail(event);
          origindetailH=this.heightdetail;
          originitemH=this.heightitem;
          originHeight=this.Height0;
          startposY=this.posY;
          console.log("posY:"+this.posY);
          console.log("Height0:"+this.Height0);
          console.log("heightdetai:"+this.heightdetail);
          console.log("heightitem:"+this.heightitem);
        }

        // console.log("XXX:"+(this.posX+event.touches[0].pageX-startx)+"YYYY:"+(this.posY+event.touches[0].pageY-starty));
      },
      Showactivity:function(index){
        //this.Clickday="on"        this.i=index;
       // alert(this.i);
       // alert("ok")
        this.i=index;
        this.date="";
      },
      NextMonth: function(){
        this.month = this.month + 1;
        if(this.month>12) {
            this.month=1;
            this.year=this.year+1;
        }

        var calen=calendarjs.showCalendarData(this.year,this.month);
        this.DayofDate=calen.DayofDate;
        this.WeekofDay=calen._WeekofDay;
        this.Nextmonthday=calen.Nextmonthday;

      },
      PreMonth: function(){
        this.month = this.month - 1;
        if(this.month==0) {
          this.month=12;
          this.year=this.year-1;
        }
        var calen=calendarjs.showCalendarData(this.year,this.month);
        this.DayofDate=calen.DayofDate;
        this.WeekofDay=calen._WeekofDay;
        this.Nextmonthday=calen.Nextmonthday;

      }

    }
    /*
        * 用于记录日期，显示的时候，根据dateObj中的日期的年月显示
        */

  }
</script>





<style>
  /*中间内容的显示*/
  .wrap{
    height:100%;
    display:-webkit-box;
    -webkit-box-orient:vertical;
  }
  .wrap .content{
    -webkit-box-flex:1;
    /*overflow-y:auto;*/

  }
  .bg{
    position: relative;
    height: 100%;
    width: 100%;
    background:#f5f5f5 ;
  }
  .companyName{
    color:#338fff;
    height:1.65rem;
    font-size:0.55rem;
    line-height: 1.65rem;
    margin-left:0.75rem;
  }
  .dataTitle{
    width:100%;
    height: 2.4rem;
    background: #fefefe;
    border-top:1px solid #dfdfdd;
    border-bottom:1px solid #ededed;
  }
  li.fixTitle{
    width: 25%;
    float: left;
  }
  li.midTitle{
    width: 50%;
  }
  img.activeIcon{
    width: 1.05rem;
    height: 1.05rem;
    margin:0.6rem 0 0 1.05rem;
  }
  .today{
    color:#338fff;
    font-size:0.9rem;
    text-align: center;
    line-height: 2.4rem;
    font-weight: bold;
  }
  .yearAndMonth{
    width: 100%;
  }
  /*.yearAndMonth li{
      height: 2.4rem;
      width:20%;
  }*/
  .yearAndMonth li.showTime{
    width:68%;
  }
  .yearAndMonth li a{
    height: 2.4rem;
    line-height: 2.4rem;
    display: block;
  }

  .yearAndMonth li a img{
    margin:0.85rem 0 0 0.9rem;
    height: 0.65rem;
    width: 0.35rem;
  }
  .yMonth{
    margin-left:1.2rem;
  }
  .yMonth,.yMonth span{
    font-weight: bold;
    line-height: 2.4rem;
    font-size:0.9rem;
  }
  .mToS{
    height:1.75rem;
    background: #fefefe;
    width:16.75rem;
    margin: 0 auto;
  }
  .mToS li{
    height: 1.75rem;
    width: 1.75rem;
    text-align: center;
    line-height: 1.75rem;
    margin: 0 0.28rem;
    border-radius: 50%;
    font-weight: bold;
  }
  .oneMonth{
    background: #fefefe;
    width:16.75rem;
    margin: 0 auto;
  }
  .oneMonth li{
    float:left;
    height:1.75rem;
    width:2.3rem;
    text-align: center;
    line-height: 1.75rem;
    border-radius: 50%;
    font-weight: bold;
  }
  .oneMonth li a{
    height:1.75rem;
    width:1.75rem;
    display: block;
    margin-left:0.3rem;
    text-align: center;
    border-radius:50%;
    line-height: 1.4rem;
  }
  .weekday{
    color:#939393;
  }
  .oneMonth  li a .span{
    height: 0.3rem;
    width:0.3rem;
    border-radius: 50%;
    background: #338fff;
    margin:0 auto;
    display: block;
  }
  .on{
    background:#338fff;
    color: #fff;
  }
  .actived{
    background: #c2c2c2;
    color:#fff;
  }

  .notthismonth{
    color:#939393
  }
  .xymnone {

  }
  .actBox{
    height:1.45rem;
    border-top:1px solid #d6dad8;
  }
  .actBox .actDetail{
    font-weight:bold;
    font-size:0.55rem;
    line-height: 1.45rem;
    margin-left:0.85rem;
  }
  .addBtn{
    height: 1.25rem;
    width:1.25rem;
    margin: 0.075rem 1.15rem 0 0;
  }
  .addDemo{
    height: 1.25rem;
    width:1.25rem;
  }
  .activeDetail{
    padding-left:0.85rem;
  }
  /*可以上下拉动的活动区*/
  .upOrDownList{
    position: relative;
    /*background-color: #00ac2d;*/
  }
  .activeDetail li{
    color:#323232;
    font-size:0.55rem;
  }
  .activeDetail li.peopleNum{
    margin-right:2.8rem;
  }
  .activeDetail img{
    height: 0.85rem;
    width: 0.85rem;
    margin-right:0.4rem;
  }
  .activeDetail img.addressIcon{
    width:1.1rem;
  }
  .iconsBtn a{
    display: block;
    height: 1.25rem;
    width:1.25rem;
  }
  .iconsBtn img{
    height: 1.25rem;
    width:1.25rem;
    margin-right:1.1rem;
    display: block;
  }
  .iconsBtn .line{
    height:0.4rem;
    width:0.05rem;
    background: #338fff;
    margin-left:0.6rem;
  }
  .box{
    display: none;
  }
  /*蒙版*/
  .mengban{
    position: fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index: 999;
    background: rgba(0,0,0,0.3);
  }
  /*点击删除按钮显示的内容*/
  .deleteNote{
    position: absolute;
    left:50%;
    top:25%;
    margin-left:-8rem;
    margin-top:-5rem;
    padding:0.75rem 0.5rem 0.5rem 0.95rem;
    width: 14.925rem;
    height:8.125rem;
    background: #fff;
    z-index: 999;
  }
  .deleteNote .alertMeg{
    color:#999;
    font-size:0.6rem;
  }
  .deleteItem p{
    line-height:1rem;
    color:#343434;
    font-size:0.7rem;
  }
  .deleteBtn{
    margin-top:2.8rem;
  }
  .deleteBtn a{
    width:3.3rem;
    height:1.55rem;
    font-size:0.7rem;
    text-align: center;
    border-radius: 0.125rem;
    line-height: 1.55rem;
    border:0;
  }
  .deleteBtn a.delete{
    margin-right:0.9rem;
    color:#fff;
    background: -webkit-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: -o-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: -ms-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: linear-gradient(top, #318ffe 0%,#1d69f0 100%);
  }
  .deleteBtn a.cancel{
    background: #fff;
    color:#338fff;
    border:0.075rem solid #338fff;
  }
  /*活动详情的内容*/
  .itemsBox{
    /*overflow-y:scroll ;*/
   /* height:10rem; */
  }
  .activeDetail .items{
    height:4.5rem;
    width:14.65rem;
    background: #fff;
    padding-top:0.5rem;
    border-bottom: 1px solid #dcdcdc;
  }
  .addBorder{
    border-right:0.2rem solid #338fff;
  }
  .deleteNote img{
    height: 0.8rem;
    width: 0.8rem;
  }

  .pos0 {
  }

  .pos1{
    left:

  }


</style>
