<template>
    <div class="scroller-component" data-role="component"
         @touchmove.stop.prevent= "move"
         @touchend.stop.prevent = "end"
         @touchstart.stop.prevent="start">
        <div class="scroller-mask"  ></div>
        <div class="scroller-indicator" ></div>
        <div class="scroller-content" :style="styleObject"  >

            <div class="scroller-item" ref="item" v-for = "(i,index) in all" :value="i" >{{i}}</div>
        </div>
    </div>
</template>

<script>
var pos,moveLast,moveNow,cur_year,cur_day,days=30,isR0,cur_month;
    export default{
        data: function(){
            return{
                styleObject:{
                    transform:'translate(0,0)',
                },
                startY:'0',
                endY:'0',
                moveY:'0',
                Y:'0',
                isMoving:false,  //是否正移动
                timeOut:null,
                d:0,//初始位置
                curD:'' ,//当前位置的日期
                cNum:'', //数量
                t:[],  //所有数字的数组
                sT:0, //开始时间
                eT:0, //结束时间
                tDiff:0,
                max:102,
                min:'',
                isR:false,  //是否是闰年
                dayLength:15,
                year0:'',
                month0:'',
                day0:'',
                somedata:''
            }
        },
        props:{
            dType:{
                type:String
            },
            startTime:{
                type:Number
            },
            cur:{

            },
            endTime:{
                type:Number
            }
        },
       mounted: function(){
        // console.log("datescroll-curbefore:"+this.cur)
        // console.log("datescroll-typebefore:"+this.dType)
         this.moveTo(this.cur)
       //  console.log("datescroll-cur:"+this.cur)
       },

        methods: {
            end:function (e) {

                let vm = this,
                    mT = 0.3;

                vm.eT = e.timeStamp;
                vm.tDiff = vm.eT - vm.sT;

               /*
               * 在短时间移动比较大的距离的时候会滑动距离变大
               * */
                if((vm.tDiff<250)&&Math.abs(vm.moveY)>80){

                    vm.moveY  = vm.moveY*3;
                    mT = 0.8;
                };

                vm.Y = parseInt(vm.moveY) + parseInt(vm.Y);
                /*
                 * 每个li的高度是34，-17 是为了改变每个li位置的区间
                 * 让数字在中间的时候光标会选择这个数字
                 * */
                vm.Y-=17;
                vm.d = Math.ceil(vm.Y/34);
                if(vm.d>=3){
                    vm.d = 3;
                }else if(vm.d<=parseInt(4-vm.cNum)){
                    vm.d = parseInt(4-vm.cNum)
                }
                vm.Y = vm.d *34;
                vm.styleObject.transform  = "translate(0,"+vm.Y+"px)";
                vm.styleObject.transition  = "all "+mT+"s linear";

                vm.isMoving = true;
                vm.timeOut = setTimeout(function () {
                    vm.isMoving = false
                },mT);
                let v =  this.$refs.item[vm.Y/(-34)+3].innerHTML.match(/\d+/g)[0];
             // console.log("xym0"+v)
                if(this.dType==='year') {
                  this.year0=v;
                  cur_year=v;

                }
                else if(this.dType==='month'){
                  this.month0=v;
                  cur_month=v;

                }
                else if(this.dType==='day'){
                    this.day0=v;
                    cur_day=v;
                }
                this.$emit('setDate',this.dType,v)
              //  console.log("this.$emit('setDate',this.dType,v)",v)
              //console.log("xym"+this.$refs.item[vm.Y/(-34)+3].innerHTML)
              this.$refs.item[vm.Y/(-34)+3].style.color="#388fff"
              this.$refs.item[vm.Y/(-34)+3].style.fontSize="20px"
              pos=vm.Y/(-34)+3

            },
            start:function (e) {

                let vm = this;
                if(vm.isMoving){
                    return false
                }
                vm.startY = e.changedTouches[0].clientY;
                vm.sT = e.timeStamp
              this.$refs.item[vm.Y/(-34)+3].style.color="#555555"
              this.$refs.item[vm.Y/(-34)+3].style.fontSize="16px"

            },
            move:function (e) {

                let vm = this;
                let aY = 0;
                vm.min = (4-vm.cNum)*34;
                vm.moveY = e.changedTouches[0].clientY -  vm.startY ;
                aY = parseInt(vm.moveY) + parseInt(vm.Y);

                if(aY>vm.max+1){
                    aY = vm.max;
                }

                if(aY<0&&aY<=vm.min){
                    aY = vm.min
                }
            /*  this.$refs.item[Math.ceil(aY/(-34))+3].style.color="#388fff";
              this.$refs.item[Math.ceil(aY/(-34))+3].style.fontSize="20px";
              this.$refs.item[Math.ceil(aY/(-34))+2].style.color="#388fff";
              this.$refs.item[Math.ceil(aY/(-34))+2].style.fontSize="20px"; */
                vm.styleObject.transition  = "all 0s";
                vm.styleObject.transform  = "translate(0,"+aY+"px)";

            },
            moveTo(cur){
               // console.log("moveTo:cur",cur)
                let vm = this;
                if(this.dType==='year'){
                    cur_year=cur;
                  //  console.log("moveto year",cur_year)
                    if(this.all.join().indexOf(cur+'年')===-1){
                       return false
                   }

                    cur = cur- this.startTime +1;

                }
                if(this.dType==='month'){
                    cur_month=cur;
                  //  console.log("moveto month",cur_month)
                    if(this.all.join().indexOf(cur+'月')===-1){
                        return false
                    }

                }
                if(this.dType==='day'){
                    cur_day=cur;
                  //  console.log("moveto day",cur_day)
                    this.$emit('setDate',this.dType,cur_day)
//                    let s = 1;
//                    let e = vm.dayLength;
//                    e=days;
//                    console.log("daylengthdya:",days)
//                    vm.t = [];
//                    vm.cNum = e - s + 1;
//                    for (; s <= e; s++) {
//                        vm.t.push(s + '日');
//                    }
//                    if(this.all.join().indexOf(cur+'日')===-1){
//                       // vm.getday();
//                     //   console.log("indexOf(cur+'日')")
//                        return false
//                    }

                }

                vm.getday();
              //  console.log(" vm.getday()")
                vm.Y = -((cur-4) *34);
             //  console.log("datascroll:cur:"+cur);
            //  console.log("datascroll:thistype:"+this.dType);
                console.log("all :"+this.all);
              this.$refs.item[vm.Y/(-34)+3].style.color="#388fff"
              this.$refs.item[vm.Y/(-34)+3].style.fontSize="1rem"
                vm.styleObject.transform  = "translate(0,"+vm.Y+"px)";

                vm.isMoving = true;
                vm.timeOut = setTimeout(function () {
                    vm.isMoving = false
                },0.3)
            },
            getday:function(){
              //  console.log("all getday")
                let vm = this,s =  vm.startTime,e = vm.endTime;
                if(this.dType =="year"&&vm.t.length==0){
                    vm.cNum = e -s+1;
                    for( ;s<=e;s++){
                        vm.t.push(s+'年');
                    }
              //      console.log("year all ")
                }else if(this.dType =="month"&&vm.t.length==0){
                    s = 1;e = 12;
                    vm.cNum = e -s+1;

                    for( ;s<=e;s++){
                        vm.t.push(s+'月');
                    }
                 //   console.log("month all ")
                }else if(this.dType =="day") {
                    s = 1;
                    e = vm.dayLength;
                    e=days;
               //     console.log("daylengthdya:",days)
                    vm.t = [];
                    vm.cNum = e - s + 1;
                    for (; s <= e; s++) {
                        vm.t.push(s + '日');
                    }
                //    console.log("day all ")
                }

                if(vm.t[Math.abs(vm.d-3 )]!=undefined){
//                    vm.curD = vm.t[Math.abs(vm.d-3 )].match(/\d+/)[0];
//                    if(vm.dType=="year") {
//                        cur_year=vm.curD;
//                    }
//                    else if(vm.dType=="month"){
//                        cur_month=vm.curD;
//                    }
//                    else if(vm.dType=="day"){
//                        cur_day=vm.curD;
//                    }
//                    console.log("curD ",vm.curD,vm.dType)
                }else{
//                    vm.curD = 1;
////                    if(vm.dType=="year") {
////                        cur_year=vm.curD;
////                    }
////                    else if(vm.dType=="month"){
////                        cur_month=vm.curD;
////                    }
////                    else if(vm.dType=="day"){
////                        cur_day=vm.curD;
////                    }
//                    console.log("curD",vm.curD,vm.dType)
                }

//                   vm.$store.dispatch('calendarDateStatus',{type:vm.dType,d:vm.curD});
                return vm.t
            }
        },
        computed:{
            all: {

                get:function(){
                  //  console.log("all get")
                    let vm = this,s =  vm.startTime,e = vm.endTime;
                    if(this.dType =="year"&&vm.t.length==0){
                        vm.cNum = e -s+1;
                        for( ;s<=e;s++){
                            vm.t.push(s+'年');
                        }
                    //    console.log("year all ")
                    }else if(this.dType =="month"&&vm.t.length==0){
                        s = 1;e = 12;
                        vm.cNum = e -s+1;

                        for( ;s<=e;s++){
                            vm.t.push(s+'月');
                        }
                    //    console.log("month all ")
                    }else if(this.dType =="day") {
                      s = 1;
                      e = vm.dayLength;
                      e=days;
                      this.day0=cur_day;
                  //    console.log("daylengthdya:",days)
                      vm.t = [];
                      vm.cNum = e - s + 1;
                      for (; s <= e; s++) {
                        vm.t.push(s + '日');
                      }
                    //    console.log("day all ")
                    }

//                    if(vm.t[Math.abs(vm.d-3 )]!=undefined){
//                        vm.curD = vm.t[Math.abs(vm.d-3 )].match(/\d+/)[0];
////                        if(vm.dType=="year") {
////                            cur_year=vm.curD;
////                        }
////                        else if(vm.dType=="month"){
////                            cur_month=vm.curD;
////                        }
////                        else if(vm.dType=="day"){
////                            cur_day=vm.curD;
////                        }
//                        console.log("curD ",vm.curD,vm.dType)
//                    }else{
//                        vm.curD = 1;
////                        if(vm.dType=="year") {
////                            cur_year=vm.curD;
////                        }
////                        else if(vm.dType=="month"){
////                            cur_month=vm.curD;
////                        }
////                        else if(vm.dType=="day"){
////                            cur_day=vm.curD;
////                        }
//                        console.log("curD else",vm.curD,vm.dType)
//                    }

//                   vm.$store.dispatch('calendarDateStatus',{type:vm.dType,d:vm.curD});
                    return vm.t
                },


            },
            year:function () {
                let vm = this;
//                return 2001
            },
            month:function () {
//                return this.$store.getters.getMonth
            },
            day:function () {
//                return this.$store.getters.getDay
            }
        },
        watch:{
//            year0:function () {
//              console.log("yearwatch0")
//                let vm = this;
//                vm.isR = vm.year0%4==0?true:false;
//                isR0=vm.isR;
//                console.log("vm.type",vm.year0)
//                console.log("isR",vm.isR)
//          //      if(vm.dType =="day"&&this.month==2){
//                console.log("emit")
//                vm.$emit('child-say',vm.somedata);
//                console.log("this.month0",cur_month)
//                console.log("vm.curD",vm.curD==29)
//                let day000=vm.day0;
//                vm.day0=32;
//                vm.day0=day000;
//                if(cur_month==2){
//                    if(vm.isR){
//                        vm.dayLength  = 29;
//                        days=29;
//                        vm.somedata=days;
//                        console.log("yearwatch:",vm.dayLength)
//                      //  if(cur_day==28)
//                        vm.$emit('child-say',vm.somedata);
//                    }else if(cur_day==29){
//
//                        days=28;
//                        console.log("yearwatch:",vm.dayLength)
//                        vm.somedata=days;
//                        vm.$emit('child-say',vm.somedata);
//
//                    }
//                    console.log("emit")
//                    vm.somedata=days;
//                    vm.$emit('child-say',vm.somedata);
//                    console.log("emit")
//
//
//                }
//                else {
//                    console.log("hello hello")
//                    let c1 = [1,3,5,7,8,10,12].join().indexOf(cur_month);
//                    if(c1>=0){
//                        days=31;
//                        vm.somedata=days;
//                        console.log("monthwatch:",days)
//                     //   if(cur_day==30)
//                            vm.$emit('child-say',vm.somedata);
//
//                    }else {
//                        days = 30;
//                        vm.somedata=days;
//                    //    if(cur_day==31)
//                            vm.$emit('child-say',vm.somedata);
//                    }
//                }
//
//            },
//            month0:function () {
//                console.log("monthwatch")
//                console.log("vm.type",this.dType)
//                let vm = this;
//               // if(vm.dType ==='day'){
//                    let c2 = this.month0 ==2;
//                    let c1 = [1,3,5,7,8,10,12].join().indexOf(this.month0);
//                    console.log("c2",c2)
//                   cur_month=this.month0;
//
//                   if(c2){
//                        this.dayLength = isR0?29:28;
//                        console.log("vm.is",isR0)
//                       days=isR0?29:28;
//                       vm.somedata=days;
//                       console.log("monthwatch:",vm.dayLength)
//                       if(cur_day>29) {
//                           vm.$emit('child-say', vm.somedata);
//                           vm.cur=32;
//                       }
//                       else {
//                               vm.somedata=cur_day;
//                               vm.$emit('child-say',vm.somedata);
//                             vm.cur=32;
//                           }
//
//                    }else  if(c1>=0){
//                        this.dayLength = 31;
//                       days=31;
//                       vm.somedata=days;
//                       if(cur_day==30) {
//                           vm.$emit('child-say',vm.somedata);
//                           vm.cur=32;
//                       }
//
//                       else {
//                           vm.somedata=cur_day;
//                           vm.$emit('child-say',vm.somedata);
//                       }
//                       console.log("monthwatch:",days)
//
//                    }else{
//                        this.dayLength = 30;
//                       days=30;
//                       vm.somedata=days;
//                       console.log("monthwatch:",days)
//                       if(cur_day==31){
//                           vm.$emit('child-say',vm.somedata);
//                       }
//                       else {
//                           vm.somedata=cur_day;
//                           vm.$emit('child-say',vm.somedata);
//                       }
//                    }
//
//               // }
//            },
            year0:function () {
                console.log("yearwatch0")
                let vm = this;
                vm.isR = vm.year0%4==0?true:false;
                isR0=vm.isR;
                // console.log("vm.type",vm.year0)
                // console.log("isR",vm.isR)
                //      if(vm.dType =="day"&&this.month==2){
                //  console.log("emit")
                //    vm.$emit('child-say',vm.somedata);
                //    console.log("this.month0",cur_month)
                //   console.log("vm.curD",vm.curD==29)

                if(cur_month==2) {
                    if(vm.isR) days=29;
                    else days=28;
                }
                if(cur_month==2){
                    if(vm.isR && cur_day>29 ) {
                        vm.somedata=29;
                        cur_day=29;
                        vm.$emit('child-say',vm.somedata);

                    }else if( !vm.isR && cur_day>28){
                        vm.somedata=28;
                        cur_day=28;
                        vm.$emit('child-say',vm.somedata);
                    }
                    else {
                        vm.somedata=cur_day;
                        vm.$emit('child-say',vm.somedata);

                    }
                }
//                else {
//                    console.log("hello hello")
//                    let c1 = [1,3,5,7,8,10,12].join().indexOf(cur_month);
//                    if(c1>=0){
//                        days=31;
//                        vm.somedata=days;
//                        console.log("monthwatch:",days)
//                     //   if(cur_day==30)
//                            vm.$emit('child-say',vm.somedata);
//
//                    }else {
//                        days = 30;
//                        vm.somedata=days;
//                    //    if(cur_day==31)
//                            vm.$emit('child-say',vm.somedata);
//                    }
//                }

            },
            month0:function () {
                console.log("monthwatch cur_day",cur_day)
                console.log("vm.type",this.dType)
                let vm = this;
                // if(vm.dType ==='day'){
                let c2 = this.month0 ==2;
                let c1 = [1,3,5,7,8,10,12].join().indexOf(this.month0);
                console.log("c2",c2)
                cur_month=this.month0;
                if(c2){
                    this.dayLength = isR0?29:28;
                    console.log("vm.is",isR0)
                    days=isR0?29:28;
                    if(isR0 && cur_day>29)
                    {
                        vm.somedata=29;
                        cur_day=29;
                        vm.$emit('child-say',vm.somedata);
                    }
                    else if(!isR0 && cur_day>28)
                    {
                        vm.somedata=28;
                        cur_day=28;
                        vm.$emit('child-say',vm.somedata);
                    }
                    else {
                        vm.somedata=cur_day;
                        vm.$emit('child-say',vm.somedata);
                    }

                }else  if(c1>=0){
                    this.dayLength = 31;
                    days=31;
                    vm.somedata=cur_day;
                    vm.$emit('child-say',vm.somedata);
                    console.log("monthwatch:",days)

                }else{
                    this.dayLength = 30;
                    days=30;
                    vm.somedata=days;
                    console.log("monthwatch:",days)
                    if(cur_day==31){
                        vm.somedata=30;
                        cur_day=30;
                        vm.$emit('child-say',vm.somedata);
                    }
                    else {
                        vm.somedata=cur_day;
                        vm.$emit('child-say',vm.somedata);
                    }
                }

                // }
            },
            day0:function () {
                console.log("daywatch cur_day",cur_day)
                console.log("vm.type",this.dType)
                let vm = this;
                // if(vm.dType ==='day'){
                let c2 = cur_month ==2;
                let c1 = [1,3,5,7,8,10,12].join().indexOf(cur_month);
                console.log("c2",c2)
                cur_day=this.day0;
                if(c2){
                    this.dayLength = isR0?29:28;
                    console.log("vm.is",isR0)
                    days=isR0?29:28;
                }else  if(c1>=0){
                    this.dayLength = 31;
                    days=31;

                }else{
                    this.dayLength = 30;
                    days=30;

                }

                // }
            },
                cur:function () {
                this.moveTo(this.cur)
                console.log("cur"+this.cur)
            }

        }

    }
</script>
