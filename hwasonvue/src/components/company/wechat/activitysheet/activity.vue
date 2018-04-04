<template>
  <section class="wrap addPositionParent">
    <!--<headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>-->
  <header class="addHeader">
    <div class="mianTitle">活动行事历</div>
  </header>
    <section>
    <!-- 添加背景容器-->
    <div class="addBlank"></div>
    <div class="bg" >
      <!--<router-link to="/packing">aaa</router-link>-->
      <div id="calendar0">
      <div class="companyNameActivity" >{{companyName}}</div>
      <ul class="dataTitle">
        <li class="fixTitle">
          <img src="/static/img/company/wechat/activitysheet/activeIcon.png" class="activeIcon" alt="">
        </li>
        <li class="fixTitle midTitle">
          <ul class="clearfix yearAndMonth">
            <li class="fl">
              <a href="javascript:;" class="pre">
                <img src="/static/img/company/wechat/activitysheet/next_left.png" alt="" v-on:click="PreMonth">
              </a>
            </li>
            <li class="fl showTime">
              <div class="yMonth">
                <span class="year" >{{year}}</span>年<span class="month0" >{{month}}月</span>
              </div>
            </li>
            <li class="fl">
              <a href="javascript:;" class="next">
                <img src="/static/img/company/wechat/activitysheet/next_right.png" alt="" v-on:click="NextMonth">
              </a>
            </li>
          </ul>
        </li>
        <li class="fixTitle today">今</li>
      </ul>
      <div class="actBg">
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
            <em v-bind:class="{'on':((day0==date)&&($index> WeekofDay-1)&&($index<=Nextmonthday)),'notthismonth': ($index< WeekofDay)||($index>Nextmonthday)}">
              {{day0}}
              <span v-bind:class="{'span': (DayofActivity.indexOf(day0) !=-1)&&($index> WeekofDay-1)&&($index<Nextmonthday+1)}"> </span>
            </em>
          </li>
        </ul>
      </div>
      </div>
      <div class="upOrDownList" id="list0" v-on:touchstart="scrollup($event)" v-on:touchmove="scrollup($event)"  v-on:touchend="scrollup($event)" v-bind:style="{top:posY+'px',height:Height0+'px'}" >
        <div class="clearfix actBox" id="listdetail" >
          <div class="fl actDetail">活动详情</div>
          <em class="addBtn fr">
              <img src="/static/img/company/wechat/activitysheet/addIcon.png" alt="" class="addDemo" v-on:click="AddActivity"></em>
          <!--<em class="addAct fr">
            <span>添加活动</span>
          </em>-->
        </div>
      <!--  <div class="clearfix activeDetail" v-bind:style="{height:heightdetail+'px' }"> -->
        <div class="clearfix activeDetail">
          <div class="fl itemsBox"  v-bind:style="{height:heightitem+'px' }" >
           <div v-show="noData" class="noActivityMsg">暂无活动 !</div>
            <div class="items clearfix" v-for="(Activity,index) in Activities ">
              <div class="fl">
                <ul class="clearfix">
                  <li class="fl"><img src="/static/img/company/wechat/activitysheet/itemIcon.png" alt="">{{Activity.projects}}</li>
                  <li class="fr peopleNum"><img src="/static/img/company/wechat/activitysheet/peopleIcon.png" class="addressIcon" alt="">{{Activity.estimated_number}}</li>
                </ul>
                <ul class="clearfix">
                  <li class="fl"><img src="/static/img/company/wechat/activitysheet/dateIcon.png" alt="">{{Activity.activity_time}}</li>
                  <li class="fr nurseNum"><img src="/static/img/company/wechat/activitysheet/nurseIcon.png" class="addressIcon" alt=""><span v-if="Activity.nurses !=null&&Activity.nurses !=''" class="isHasNurse">已分配</span><span v-else>未分配</span></li>
                </ul>
                <ul>
                  <!--<li><img src="/static/img/company/wechat/activitysheet/dateIcon.png" alt="">{{Activity.activity_time}}</li>-->
                  <li><img src="/static/img/company/wechat/activitysheet/address.png" alt="">{{Activity.address}}</li>
                  <li><img src="/static/img/company/wechat/activitysheet/demoIcon.png" alt="">{{Activity.remark}}</li>
                </ul>
              </div>
              <div class="fr iconsBtn">
                <em class="retireBtn"> <img src="/static/img/company/wechat/activitysheet/retire.png" alt="" @click="ModifyActivity(index)"></em>
                <div class="line"></div>
                <img src="/static/img/company/wechat/activitysheet/delete.png" alt="" class="deleteIcon" @click="DeleteActivity(index)">
              </div>
            </div>

          </div>
        </div>
      </div>
      <div v-show="isShowAlertMsg">
        <div class="mengban"></div>
        <div class="deleteNote">
          <ul class="clearfix">
            <li class="alertMeg fl">信息提示</li>
            <li class="fr"><img src="/static/img/company/wechat/activitysheet/alertIcon.png" alt=""></li>
          </ul>
          <div class="deleteItem">
            <p>是否删除</p>
            <p>{{msg_del}}活动</p>
          </div>
          <div class="clearfix deleteBtn">
            <a href="javascript:;" class="cancel fr" @click="cancelActivity">取消</a>
            <a href="javascript:;" class="delete fr" @click="DeleteActivity2">删除</a>
          </div>
        </div>
      </div>
    </div>
  </section>
    <footerpart></footerpart>
    <alertTiming ref="alertTiming1" :content="alertContent">  </alertTiming>
   </section>
</template>
<script>
  import calendarjs from "../../../../util/calendarjs.js"
  import {mapState,mapMutations} from 'vuex'
  import headerpart from "../headerpart"
  import footerpart from "../footerpart"
  import axios from 'axios'
//  import {mapState,mapMutations} from 'vuex'
  import alertTiming from '../../../alertTiming';

  let startx,starty,startposY,originHeight,origindetailH,originitemH,moveDist=0;

  function openlistdetail(event){
   // alert("ok")

  }
  export default {
    name : 'calendar',
    data(){
      return {
       /* imgaddr0: "/static/img/return.png",
        title0:"活动行事历",*/
//        控制删除提示框的显隐
        companyName:'',
        isShowAlertMsg:false,
        year:  "",
        month: "",
        date:"",
        hour:'',
        min:'',
        formatdate:"",
        DayofDate: [],
        DayofActivity:[],
        Activities:[{
            projects:'',
            estimated_number:0,
            activity_time:'',
            address: '',
            remark:'',
            activity_id:'',
            nurses:[]
        }],
        Activity:{},
        WeekofDay:0,
        Nextmonthday: 0,
        i: -1,
        posY: 0,
        Height0:0,
        heightdetail:200,
        heightitem:200,
        Isclickday:false,
        //Notthismonth:false,
        index_del:0,
        msg_del:'',
        noData:false,
        originY:0,
        isFirst:false,
        move:0,
        clientHeight:0,
        alertContent:'',
        isHasNurse:false


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
    },

    mounted: async function(){
      this.companyName=this.companyInfo.companyName;
      await this.GetDayofActivity()

      await this.GetAllActivityofMonth();

      originHeight=document.getElementById('calendar0').clientHeight-100;
      this.clientHeight=originHeight;
      console.log("clientHeight:"+this.clientHeight);
      this.Height0=originHeight;
      startposY=0;
      this.posY=0;
      origindetailH=this.heightdetail;
      originitemH=this.heightitem;

        if(this.activityInfo !=null) {
            this.date=this.activityInfo.date;
            console.log("date:",this.date)
        }
        console.log("date2:",this.date)
    },
    components:{
      headerpart,
      footerpart,
      alertTiming
    },
    computed:{
        ...mapState([
            'companyInfo',
            'activityInfo',
        ]),
    },

    methods : {
        ...mapMutations([
            'RECORD_ACTIVITIES_ID',
            'RECORD_ACTIVITYINFO'
        ]),
        cancelActivity(){
          this.isShowAlertMsg=false;
        },
        DeleteActivity2(){
            let vm=this;
            this.isShowAlertMsg=false;
            axios.post('/wechat/activitysheet/activity/deleteactivity', {
                activity_id: this.Activities[this.index_del].activity_id
            })
                .then(function (response) {
                 //   console.log(response);
                    vm.alertContent=response.data.name;
                    vm.$refs.alertTiming1.Show();
                    vm.GetAllActivityofMonth();
                    return;


                })
                .catch(function (response) {
                    console.log(response);
                });
        },
        AddActivity(){
            moveDist=0;
            let activityInfo={};
            activityInfo.date=this.date;
            activityInfo.year=this.year;
            activityInfo.month=this.month;
            this.RECORD_ACTIVITYINFO(activityInfo);
            this.$router.push('/company/addactivity')
        },
        ModifyActivity(index){
            moveDist=0;
            let activityInfo={};
            activityInfo.activity_time=this.Activities[index].activity_time;
            activityInfo.projects=this.Activities[index].projects;
            activityInfo.estimated_number=this.Activities[index].estimated_number;
            activityInfo.address=this.Activities[index].address;
            activityInfo.remark=this.Activities[index].remark;
            activityInfo.activity_id=this.Activities[index].activity_id;
            activityInfo.date=this.date;
            activityInfo.nurses=this.Activities[index].nurses;
            this.RECORD_ACTIVITYINFO(activityInfo)
            this.$router.push('/company/modifyactivity')
        },
        DeleteActivity(index){
            this.isShowAlertMsg=true;
            this.index_del=index;
            this.msg_del=this.Activities[index].activity_time+' '+this.Activities[index].address;

        },

        async GetAllActivityofMonth(){
        var vm=this;

        axios.get('/wechat/activitysheet/activity/GetAllActivities',{ params:{year: this.year,month:this.month-1,day:this.date} })
          .then(function (response) {
            console.log('response11111111111')
            console.log(response.data.length);
            var i =0;
            vm.Activities.splice(0,vm.Activities.length)
            if(response.data !=null)
            {
                vm.noData=false;
            for ( var i = 0; i < response.data.length; i++) {

              vm.Activities.push(response.data[i]);
            //  vm.Activities[i]=response.data[i];

            }

            if(response.data.length==0)
            {
             vm.noData=true;
            }
            }
            else {
                vm.noData=true;

            }

          })
          .catch(function (response) {
//            console.log("error response：")
//            console.log(response);
          })
      },

      async GetDayofActivity(){
        var vm=this;
        var tmp;

        axios.get('/wechat/activitysheet/activity/GetDayofActivities',{ params:{year: this.year,month:this.month-1,day:this.date} })
          .then(function (response) {
//        this.TodayActivities=JSON.parse(response.data);
            console.log("response2222222222222：")
            console.log(response.data);
            // console.log(this.TodayActivities)

           vm.DayofActivity.splice(0,vm.DayofActivity.length)

            for ( var i = 0; i < response.data.length; i++) {

              vm.DayofActivity.push(response.data[i].day);

            }

//            console.log("this.TodayActivities22")
//            console.log(vm.TodayActivities[0])
            //return response.data;

          })
          .catch(function (response) {
//            console.log("error response：")
//            console.log(response);
          })
      },


      scrollup(event){
        if(event.type =="touchstart")
        {
         // event.preventDefault();
            //alert("touchstart");
          startx=event.touches[0].pageX;
          starty=event.touches[0].pageY;
         this.originPointY=event.touches[0].pageY;
//         console.log("starty:",starty)
//         console.log("moveDist:",moveDist)
//         console.log("this.Height0:",this.clientHeight)

          }
        else if(event.type =="touchmove") {
            let isScroll=false;
            event.preventDefault();
            if((event.touches[0].pageY - this.originPointY)>0) {
//                console.log("down")
                if ((event.touches[0].pageY - this.originPointY - moveDist) < 0) {
                    isScroll = true;
//                    console.log("down:", (event.touches[0].pageY - this.originPointY - moveDist))
                }
            }

//            console.log("tmp:", (this.originPointY - event.touches[0].pageY + moveDist))
            if((event.touches[0].pageY - this.originPointY)<=0)
            {
//                console.log("up")
                if((this.originPointY-event.touches[0].pageY+moveDist)<this.clientHeight) {
                isScroll = true;
//                console.log("up:", (this.originPointY - event.touches[0].pageY + moveDist))
            }
            }

            if(isScroll){

           // console.log("X:" + (event.touches[0].pageX - startx) + "Y:" + (event.touches[0].pageY - starty));
            //  document.getElementById("listdetail").style.left=this.posX+(event.touches[0].pageX-startx);
            //  document.getElementById("listdetail").style.top=this.posY+(event.touches[0].pageY-starty);
            this.posY = startposY + (event.touches[0].pageY - starty);
            this.Height0=originHeight-(event.touches[0].pageY - starty);
            this.heightdetail=origindetailH-(event.touches[0].pageY - starty);
            this.heightitem=originitemH-(event.touches[0].pageY - starty);
            this.move=starty-event.touches[0].pageY ;
//            console.log("move:",this.move)
            if(this.Height0>=303){
            this.Height0=303
        }else if(this.heightitem<=0){
            this.heightitem=0;
        }
            //this.posY = this.posY+20;
        }

        }
        else if(event.type =="touchend"){
          //event.preventDefault();
//            console.log("this.move:",this.move)
          moveDist=moveDist+this.move;
          this.move=0;
         // if(this.posY<1) openlistdetail(event);
          origindetailH=this.heightdetail;
          originitemH=this.heightitem;
          originHeight=this.Height0;
          startposY=this.posY;
          //console.log("posY:"+this.posY);
          //console.log("Height0:"+this.Height0);
          //console.log("heightdetai:"+this.heightdetail);
          //console.log("heightitem:"+this.heightitem);
        }

        // console.log("XXX:"+(this.posX+event.touches[0].pageX-startx)+"YYYY:"+(this.posY+event.touches[0].pageY-starty));
      },
      Showactivity:async function(index){
        //this.Clickday="on"        this.i=index;
       // alert(this.i);
       // alert("ok")
        this.i=index;

        if((index> this.WeekofDay-1)&&(index<=this.Nextmonthday))
             this.date=this.DayofDate[index];
        await this.GetAllActivityofMonth();

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
        this.GetDayofActivity()
        this.GetAllActivityofMonth();

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
        this.GetDayofActivity()
        this.GetAllActivityofMonth();
      }
    }
    /*
        * 用于记录日期，显示的时候，根据dateObj中的日期的年月显示
        */

  }
</script>


<style>
  .wrap{
    height:100%;
    display:-webkit-box;
    -webkit-box-orient:vertical;
  }
  .wrap .content{
    -webkit-box-flex:1;
    overflow-y:auto;
  }
  .actBg{
    background: #fefefe;
  }
  .bg{
    position: relative;
    height: 100%;
    width: 100%;
    background:#f5f5f5 ;
  }
  .companyNameActivity{
    color:#338fff;
    height:1.65rem;
    font-size:0.7rem;
    line-height: 1.65rem;
    text-indent:0.75rem;
    background:#ecebeb ;
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
  .oneMonth li em{
    height:1.4rem;
    width:1.4rem;
    display: block;
    margin-left:0.3rem;
    text-align: center;
    border-radius:50%;
    line-height: 1.4rem;
  }
  .weekday{
    color:#939393;
  }
  .oneMonth  li em .span{
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

  .actBox{
    height:1.45rem;
    border-top:1px solid #d6dad8;
    background: #ecebeb;
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
    margin: 0.075rem 2.3rem 0 0;
  }
  .addAct{
    margin: 0.2rem 0.5rem 0 0;
    font-size:0.6rem;
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
  }
  .activeDetail li{
    color:#323232;
    font-size:0.55rem;
  }
  .activeDetail li.peopleNum{
    width:4rem;
    margin-left:2rem;
  }
  .activeDetail li.nurseNum{
    width:4rem;
    margin-left:2rem;
  }
  .activeDetail img{
    height: 0.85rem;
    width: 0.85rem;
    margin-right:0.4rem;
  }
  .activeDetail img.addressIcon{
    width:1.1rem;
  }
  .isHasNurse{
    color:#338fff;
  }
  .iconsBtn{
    margin-right:0rem;
  }
  .noActivityMsg{
    font-size:0.7rem;
    margin-top:0.5rem;
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
  .iconsBtn .line2{
    height:0.4rem;
    width:0.05rem;
    background: #ccc;
    margin-left:0.55rem;
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
    top:50%;
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
    background: #338fff;
  }
  .deleteBtn a.cancel{
    background: #fff;
    color:#338fff;
    border:0.075rem solid #338fff;
  }
  /*活动详情的内容*/
  .itemsBox{
    /*overflow-y:scroll ;*/
    overflow: hidden;
   /* height:10rem; */
  }
  .activeDetail{
    background: #fff;
  }
  .activeDetail .items{
    height:4.5rem;
    width:16.65rem;
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
</style>
