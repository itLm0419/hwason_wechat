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
 import provinces from '../../../util/provinces.js'
var pos,moveLast,moveNow,cur_year,cur_day,days=30,isR0,cur_month;
 let provinces0,cities0,blocks0;
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
                t:[],  //省，市，县（区）的名字
                t2:[],  //省，市，县（区）的编号
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
                somedata:{},

                selectedProvince: provinces[0],
                selectedCity: 0,
                selectedBlock: 0,
                cities: 0,
                provinces,
                blocks: 0
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
         console.log("datescroll-curbefore:"+this.cur)
         console.log("datescroll-typebefore:"+this.dType)
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
              //  let v =  this.$refs.item[vm.Y/(-34)+3].innerHTML.match(/\d+/g)[0];
                //获取当前的位置
                let v= vm.t.indexOf(this.$refs.item[vm.Y/(-34)+3].innerHTML)
              console.log("xym0:",v)
                if(this.dType==='year') {

                  this.year0=v;
                  cur_year=v;
                    console.log("cur_year:",cur_year)
                    this.$emit('setDate',this.dType,vm.t[cur_year])

                }
                else if(this.dType==='month'){
                  this.month0=v;
                  cur_month=v;
                 console.log("cur_month:",cur_month)
                    this.$emit('setDate',this.dType,vm.t[cur_month])

                }
                else if(this.dType==='day'){
                    this.day0=v;
                    cur_day=v;
                    this.$emit('setDate',this.dType,vm.t[cur_day])
                }
             //   this.$emit('setDate',this.dType,v)
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
                console.log("moveTo:cur",cur)
                console.log("start cities",cities0)
                console.log("start block",blocks0)
                let vm = this;

                if(!(/^[-+]?[0-9]+$/.test(cur)))
                    cur=1;
                if(this.dType==='year'){
                    cur_year=cur;
                    console.log("moveto year",cur_year)
                    if(this.all.join().indexOf(cur+'年')===-1){
                       return false
                   }

                 //   cur = cur- this.startTime +1;

                }
                if(this.dType==='month'){

                    cur_month=cur;
//                    console.log("moveto month",cur_month)
//                    if(this.all.join().indexOf(cur+'月')===-1){
//                        return false
//                    }

                }
                if(this.dType==='day'){

                    cur_day= cur;
                    console.log("moveto day",cur_day)
                  //  this.$emit('setDate',this.dType,cur_day)
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
                console.log(" vm.getday()")
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
              //  console.log("all getday",cities0)
                console.log("all getday method")
                let item;
                let vm = this;
//                    if(this.dType =="year"&&vm.t.length==0){
                if(this.dType =="year") {
                    //  console.log("provinces ", vm.provinces)
                    for(item in vm.provinces)
                    {
                        //  console.log("item",item)
                        if(vm.provinces[item].level === 1)
                        {
                            vm.t.push(vm.provinces[item].name);
                            vm.t2.push(vm.provinces[item].sheng);
                            console.log("item.name",item.name)
                        }


                    }

                    vm.cNum =vm.t.length;
//                        for( ;s<=e;s++){
//                            vm.t.push(s+'年');
//                        }
                    console.log("year all ", vm.t)
                }else if(this.dType =="month"){


                    if(cities0 ==null) {
                        let beijing = vm.provinces.slice(0, 19)
                        console.log("beijing",beijing)
                        cities0 = beijing.filter(item => {
                            if (item.level === 2) {
                                return true
                            }
                        });

                    }

                    vm.cNum = cities0.length;
                    console.log("all getday2",cities0)
                    vm.t.splice(0,vm.t.length)
                    vm.t2.splice(0,vm.t2.length)
                    for(let c in cities0)
                    {
                        vm.t.push(cities0[c].name)
                        vm.t2.push(cities0[c].di);
                    }

//                        for( ;s<=e;s++){
//                            vm.t.push(s+'月');
//                        }
                    console.log("month all ",vm.t)
                }else if(this.dType =="day") {
                    console.log("day start ",blocks0)

                    if(blocks0==null) {
                        let beijing = vm.provinces.slice(0, 19)
                        blocks0 = beijing.filter(item => {
                            if (item.level === 3) {
                                return true
                            }
                        })

                    }

                    vm.cNum = blocks0.length;
                    vm.t.splice(0,vm.t.length)
                    vm.t2.splice(0,vm.t2.length)
                    for(let c in blocks0)
                    {
                        vm.t.push(blocks0[c].name)
                        vm.t2.push(blocks0[c].xian);
                    }

//                      for (; s <= e; s++) {
//                        vm.t.push(s + '日');
//                      }
                    console.log("day all ",vm.t)
                };

//                   vm.$store.dispatch('calendarDateStatus',{type:vm.dType,d:vm.curD});
                return vm.t
            }
        },
        computed:{
            all: {

                get:function(){
                    let item;
                    console.log("all get computed")
                    let vm = this;
//                    if(this.dType =="year"&&vm.t.length==0){
                    if(this.dType =="year") {
                    //  console.log("provinces ", vm.provinces)
                      for(item in vm.provinces)
                      {
                        //  console.log("item",item)
                          if(vm.provinces[item].level === 1)
                          {
                              vm.t.push(vm.provinces[item].name);
                              vm.t2.push(vm.provinces[item].sheng);
                              console.log("item.name",item.name)
                          }


                      }

                    vm.cNum =vm.t.length;
//                        for( ;s<=e;s++){
//                            vm.t.push(s+'年');
//                        }
                        console.log("year all ", vm.t)
                    }else if(this.dType =="month"&&vm.t.length==0){

                        if(cities0 ==null) {
                            let beijing = vm.provinces.slice(0, 19)
                            console.log("beijing",beijing)
                            cities0 = beijing.filter(item => {
                                if (item.level === 2) {
                                    return true
                                }
                            });

                        }

                       vm.cNum = cities0.length;
                       for(let c in cities0)
                       {
                           vm.t.push(cities0[c].name)
                           vm.t2.push(cities0[c].di);
                       }

//                        for( ;s<=e;s++){
//                            vm.t.push(s+'月');
//                        }
                        console.log("month all ",vm.t)
                    }else if(this.dType =="day"&&vm.t.length==0) {
                        if(blocks0==null) {
                            let beijing = vm.provinces.slice(0, 19)
                            blocks0 = beijing.filter(item => {
                                if (item.level === 3) {
                                    return true
                                }
                            })

                        }

                      vm.cNum = blocks0.length;
                        for(let c in blocks0)
                        {
                            vm.t.push(blocks0[c].name)
                            vm.t2.push(blocks0[c].xian);
                        }

//                      for (; s <= e; s++) {
//                        vm.t.push(s + '日');
//                      }
                        console.log("day all ",vm.t)
                    };

//                   vm.$store.dispatch('calendarDateStatus',{type:vm.dType,d:vm.curD});
                    return vm.t
                },


            }

        },
        watch:{
            year0:function () {
                let vm=this;
                console.log("yearwatch0")

                // 港澳台数据只有一级,特殊处理
                if (vm.t2[cur_year] === '71' || vm.t2[cur_year] === '81' ||vm.t2[cur_year] === '82') {
                    vm.cities = [cur_year]
                    vm.blocks = [cur_year]
                } else {
                   cities0 =vm.provinces.filter(item => {
                            if (item.level === 2 && item.sheng && vm.t2[cur_year] === item.sheng) {
                        return true
                    }
                  //  console.log("item",item)
                })
                   // console.log("cities0 ",cities0 )
                    vm.somedata.data=vm.t[cur_year]
                    vm.somedata.type='year'
                  vm.$emit('child-say',vm.somedata);

                 blocks0 = vm.provinces.filter(item => {
                        if (item.level === 3 && item.sheng && item.sheng == cities0[0].sheng && item.di === cities0[0].di && item.name !== '市辖区') {
                            return true
                        }
                    })

                    console.log("blocks ",blocks0 )
                    vm.somedata.data=cities0[0].name
                    vm.somedata.type='day'
                    vm.$emit('child-say',vm.somedata);

                }
            },
            month0:function () {
                console.log("monthwatch cur_day",cur_day)
              //  console.log("vm.type",vm.dType)
                let vm = this;


                // 选择了一个市,要选择区了 di是城市的代表,sheng
                if (cities0[cur_month].sheng === '71' || cities0[cur_month].sheng === '81' || cities0[cur_month].sheng === '82') {
                    this.blocks = cities0[cur_month]
                  //  this.cities = cities0[cur_month]
                } else {
                    blocks0 = vm.provinces.filter(item => {
                            if (item.level === 3 && item.sheng && item.sheng == cities0[cur_month].sheng && item.di === cities0[cur_month].di && item.name !== '市辖区') {
                        return true
                    }
                })
                  //  console.log("blocks ",blocks0 )
                    vm.somedata.data=vm.t[cur_month]
                    vm.somedata.type='day'
                    vm.$emit('child-say',vm.somedata);
                }
                // }
            },
           cur:function () {
               console.log("cur start"+this.cur)
                this.moveTo(this.cur)
                console.log("cur"+this.cur)
            }

        }

    }
</script>
