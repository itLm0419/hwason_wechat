<template>
    <div class="scroller-component" data-role="component"
         @touchmove.stop.prevent= "move"
         @touchend.stop.prevent = "end"
         @touchstart.stop.prevent="start">
        <div class="scroller-mask2" ></div>
        <div class="scroller-indicator" ></div>
        <div class="scroller-content" :style="styleObject"  >

            <div class="scroller-item1" ref="item" v-for = "(i,index) in all" :value="i" >{{i}}</div>
        </div>
    </div>
</template>

<script>
// import provinces from '../../../util/provinces.js'
 import axios from 'axios'
var pos,moveLast,moveNow,cur_year,cur_day,days=30,isR0,cur_month,month_item=-1,day_item=-1;
let provinces0=["北京市", "天津市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "上海市",
    "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区",
    "海南省", "重庆市", "四川省", "贵州省", "云南省"];
let provinces0_code=["11", "12", "13", "14", "15", "21", "22", "23", "31", "32", "33", "34", "35", "36", "37",
    "41", "42", "43", "44", "45", "46", "50", "51", "52", "53"];
let cities0=[{"code": "320100", "sheng": "32", "di": "01", "xian": "00", "name": "南京市", "level": 2},
    {code: "320200", sheng: "32", di: "02", xian: "00", name: "无锡市","level": 2},
    {code: "320300", sheng: "32", di: "03", xian: "00", name: "徐州市", "level": 2},
    {code: "320400", sheng: "32", di: "04", xian: "00", name: "常州市", "level": 2},
    {code: "320500", sheng: "32", di: "05", xian: "00", name: "苏州市", "level": 2},
    {code: "320600", sheng: "32", di: "06", xian: "00", name: "南通市", "level": 2},
    {code: "320700", sheng: "32", di: "07", xian: "00", name: "连云港市", "level": 2},
    {code: "320800", sheng: "32", di: "08", xian: "00", name: "淮安市", "level": 2},
    {code: "320900", sheng: "32", di: "09", xian: "00", name: "盐城市", "level": 2},
    {code: "321000", sheng: "32", di: "10", xian: "00", name: "扬州市", "level": 2},
    {code: "321100", sheng: "32", di: "11", xian: "00", name: "镇江市", "level": 2},
    {code: "321200", sheng: "32", di: "12", xian: "00", name: "泰州市", "level": 2},
    {code: "321300", sheng: "32", di: "13", xian: "00", name: "宿迁市", "level": 2}];
let blocks0=[{code: "320102", sheng: "32", di: "01", xian: "02", name: "玄武区", "level": 3},
    {code: "320104", sheng: "32", di: "01", xian: "04", name: "秦淮区","level": 3},
    {code: "320105", sheng: "32", di: "01", xian: "05", name: "建邺区", "level": 3},
    {code: "320106", sheng: "32", di: "01", xian: "06", name: "鼓楼区", "level": 3},
    {code: "320111", sheng: "32", di: "01", xian: "11", name: "浦口区", "level": 3},
    {code: "320113", sheng: "32", di: "01", xian: "13", name: "栖霞区", "level": 3},
    {code: "320114", sheng: "32", di: "01", xian: "14", name: "雨花台区", "level": 3},
    {code: "320115", sheng: "32", di: "01", xian: "15", name: "江宁区", "level": 3},
    {code: "320116", sheng: "32", di: "01", xian: "16", name: "六合区", "level": 3},
    {code: "320117", sheng: "32", di: "01", xian: "17", name: "溧水区", "level": 3},
    {code: "320118", sheng: "32", di: "01", xian: "18", name: "高淳区", "level": 3}];

let provinces=null;
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

//                selectedProvince: provinces[0],
//                selectedCity: 0,
//                selectedBlock: 0,
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
           if(provinces==null) {

               this.GetProinces();

           }
        // console.log("datescroll-curbefore:"+this.cur)
       //  console.log("datescroll-typebefore:"+this.dType)
         this.moveTo(this.cur)
       //  console.log("datescroll-cur:"+this.cur)
       },

        methods: {
            GetProinces(){

                axios.get('/wechat/nurse/getProvinces')
                    .then(function (response) {
                        console.log("response：",)
                        if(response.data !=null) {
                            provinces=response.data;
                            console.log("provinces：",response.data)
                        }

                    })
                    .catch(function (response) {
                        console.log("error response：")
                        console.log(response);
                    })

            },
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
                    month_item=vm.Y/(-34)+3;

                }
                else if(this.dType==='day'){
                    this.day0=v;
                    cur_day=v;
                    this.$emit('setDate',this.dType,vm.t[cur_day])
                    day_item=vm.Y/(-34)+3;
                }
             //   this.$emit('setDate',this.dType,v)
              //  console.log("this.$emit('setDate',this.dType,v)",v)
              //console.log("xym"+this.$refs.item[vm.Y/(-34)+3].innerHTML)
             // console.log("method end pos",vm.Y/(-34)+3)
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
             //   console.log("method start pos",vm.Y/(-34)+3)
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
               // console.log("moveTo:cur,type:",cur,this.dType)
            //    console.log("start cities",cities0)
            //    console.log("start block",blocks0)
                let vm = this;

                if(!(/^[-+]?[0-9]+$/.test(cur)))
                {
                    cur=1;
                    if(this.dType=='year')
                    {
                        cur=10;

                    }
                  //  console.log("非数字，cur=1")
                }



                if(this.dType==='year'){
                    cur_year=cur;
                  //  console.log("moveto year",cur_year)
//                    if(this.all.join().indexOf(cur+'年')===-1){
//                       return false
//                   }

                 //   cur = cur- this.startTime +1;

                }
                if(this.dType==='month'){

                    cur_month=cur;
//                    console.log("moveto month",cur_month)
//                    if(this.all.join().indexOf(cur+'月')===-1){
//                        return false
//                    }
                    if(month_item!=-1){
                    //    console.log("method month_item",month_item)
                        if(vm.t.length>month_item)
                        {
                            this.$refs.item[month_item].style.color="#000"
                            this.$refs.item[month_item].style.fontSize="0.6rem"
                        }

                    }


                }
                if(this.dType==='day'){

                    cur_day= cur;
                  //  console.log("moveto day",cur_day)
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
                    if(day_item!=-1) {
                      //  console.log("method day_item",day_item)
                        if(vm.t.length>month_item)
                        {
                            this.$refs.item[day_item].style.color = "#000"
                            this.$refs.item[day_item].style.fontSize = "0.6rem"
                        }

                    }

                }

                vm.getday();
               // console.log(" vm.getday()")
                vm.Y = -((cur-4) *34);
             //  console.log("datascroll:cur:"+cur);
            //  console.log("datascroll:thistype:"+this.dType);
               // console.log("all :"+this.all);
             //   console.log("method moveTo(cur) pos",vm.Y/(-34)+3)
              this.$refs.item[vm.Y/(-34)+3].style.color="#3881ff"
              this.$refs.item[vm.Y/(-34)+3].style.fontSize="0.9rem"
                vm.styleObject.transform  = "translate(0,"+vm.Y+"px)";

                vm.isMoving = true;
                vm.timeOut = setTimeout(function () {
                    vm.isMoving = false
                },0.3)
            },
            getday:function(){
              //  console.log("all getday",cities0)
             //   console.log("all getday method")
                let item;
                let vm = this;
//                    if(this.dType =="year"&&vm.t.length==0){
//                if(this.dType =="year") {
//                    //  console.log("provinces ", vm.provinces)
//                    vm.t.splice(0,vm.t.length)
//                    vm.t2.splice(0,vm.t2.length)
//                    for(item in vm.provinces)
//                    {
//                        //  console.log("item",item)
//                        if(vm.provinces[item].level === 1)
//                        {
//                            vm.t.push(vm.provinces[item].name);
//                            vm.t2.push(vm.provinces[item].sheng);
//                         //   console.log("item.name",item.name)
//                        }
//
//
//                    }
//
//                    vm.cNum =vm.t.length;
////                        for( ;s<=e;s++){
////                            vm.t.push(s+'年');
////                        }
//                  //  console.log("year all ", vm.t)
//                }else
                     if(this.dType =="month"){


//                    if(cities0 ==null) {
////                        let beijing = vm.provinces.slice(0, 19)
//                        let jiangsu=vm.provinces.filter(item=>{
//                            if(item.sheng===32) {
//                                return true;
//                            }
//                        });
//                       // console.log("jiangsu",jiangsu)
//                        cities0 = jiangsu.filter(item => {
//                            if (item.level === 2) {
//                                return true
//                            }
//                        });
//
//                    }

                    vm.cNum = cities0.length;
                //    console.log("all getday2",cities0)
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
                //    console.log("month all ",vm.t)
                }else if(this.dType =="day") {
                  //  console.log("day start ",blocks0)

//                    if(blocks0==null) {
////                        let beijing = vm.provinces.slice(0, 19)
//                        let jiangsu=vm.provinces.filter(item=>{
//                            if(item.sheng===32) {
//                                return true;
//                            }
//                        });
//                        blocks0 = jiangsu.filter(item => {
//                            if (item.level === 3) {
//                                return true
//                            }
//                        })
//
//                    }

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
            //        console.log("day all ",vm.t)
                };

//                   vm.$store.dispatch('calendarDateStatus',{type:vm.dType,d:vm.curD});
                return vm.t
            }
        },
        computed:{
            all: {

                get:function(){
                    let item;
                //    console.log("all get computed")
                    let vm = this;
//                    if(this.dType =="year"&&vm.t.length==0){
                    if(this.dType =="year"&&vm.t.length==0) {
                    //  console.log("provinces ", vm.provinces)
                        vm.t.splice(0,vm.t.length)
                        vm.t2.splice(0,vm.t2.length)
//                      for(item in vm.provinces)
//                      {
//                        //  console.log("item",item)
//                          if(vm.provinces[item].level === 1)
//                          {
//                              vm.t.push(vm.provinces[item].name);
//                              vm.t2.push(vm.provinces[item].sheng);
//                       //       console.log("item.name",item.name)
//                          }
//
//
//                      }
                        vm.t=provinces0;
                        vm.t2=provinces0_code;

                    vm.cNum =vm.t.length;
//                        for( ;s<=e;s++){
//                            vm.t.push(s+'年');
//                        }
                     //   console.log("year all ", vm.t)
                        //设初始省份为江苏省，发送值给父组件
                      this.$emit('setDate',this.dType,vm.t[9])
                    }else if(this.dType =="month"&&vm.t.length==0){

//                        if(cities0 ==null) {
////                            let beijing = vm.provinces.slice(0, 19)
//                            let jiangsu=vm.provinces.filter(item=>{
//                                if(item.sheng==='32') {
//                                    return true;
//                                }
//                            });
//                       //     console.log("jiangsu",jiangsu)
//                            cities0 = jiangsu.filter(item => {
//                                if (item.level === 2) {
//                                    return true
//                                }
//                            });
//
//                        }

                       vm.cNum = cities0.length;
                       for(let c in cities0)
                       {
                           vm.t.push(cities0[c].name)
                           vm.t2.push(cities0[c].di);
                       }

//                        for( ;s<=e;s++){
//                            vm.t.push(s+'月');
//                        }
                     //   console.log("month all ",vm.t)
                        this.$emit('setDate',this.dType,vm.t[0])
                    }else if(this.dType =="day"&&vm.t.length==0) {
//                        if(blocks0==null) {
////                            let beijing = vm.provinces.slice(0, 19)
//                            let jiangsu=vm.provinces.filter(item=>{
//                                if(item.sheng==='32') {
//                                    return true;
//                                }
//                            });
//                            blocks0 = jiangsu.filter(item => {
//                                if (item.level === 3 &&item.di==='01'&& item.name !== '市辖区') {
//                                    return true
//                                }
//                            })
//
//                        }

                      vm.cNum = blocks0.length;
                        for(let c in blocks0)
                        {
                            vm.t.push(blocks0[c].name)
                            vm.t2.push(blocks0[c].xian);
                        }

//                      for (; s <= e; s++) {
//                        vm.t.push(s + '日');
//                      }
                    //    console.log("day all ",vm.t)
                        this.$emit('setDate',this.dType,vm.t[0])
                    };

//                   vm.$store.dispatch('calendarDateStatus',{type:vm.dType,d:vm.curD});
                    return vm.t
                },


            }

        },
        watch:{
            year0:function () {
                let vm=this;
              //  console.log("yearwatch0")

                // 港澳台数据只有一级,特殊处理
                if (vm.t2[cur_year] === '71' || vm.t2[cur_year] === '81' ||vm.t2[cur_year] === '82') {
                    vm.cities = [cur_year]
                    vm.blocks = [cur_year]
                } else {
                    console.log("provinces year0 ", provinces)
                   cities0 =provinces.filter(item => {
                            if (item.level === 2 && item.sheng && vm.t2[cur_year] === item.sheng) {
                        return true
                    }
                  //  console.log("item",item)
                })
                   // console.log("cities0 ",cities0 )
                    vm.somedata.datasheng=vm.t[cur_year]
                    vm.somedata.datadi=cities0[0].name
                    vm.somedata.type='year'
                  vm.$emit('child-say',vm.somedata);

                 blocks0 = provinces.filter(item => {
                        if (item.level === 3 && item.sheng && item.sheng == cities0[0].sheng && item.di === cities0[0].di && item.name !== '市辖区') {
                            return true
                        }
                    })

                 //   console.log("blocks ",blocks0 )
                    vm.somedata.datadi=cities0[0].name
                    vm.somedata.dataxian=blocks0[0].name
                    vm.somedata.type='day'
                    vm.$emit('child-say',vm.somedata);
                    cur_month=0;
                    cur_day=0;

                }
            },
            month0:function () {
             //   console.log("monthwatch cur_day",cur_day)
              //  console.log("vm.type",vm.dType)
                let vm = this;


                // 选择了一个市,要选择区了 di是城市的代表,sheng
                if (cities0[cur_month].sheng === '71' || cities0[cur_month].sheng === '81' || cities0[cur_month].sheng === '82') {
                    this.blocks = cities0[cur_month]
                  //  this.cities = cities0[cur_month]
                } else {
                    blocks0 = provinces.filter(item => {
                            if (item.level === 3 && item.sheng && item.sheng == cities0[cur_month].sheng && item.di === cities0[cur_month].di && item.name !== '市辖区') {
                        return true
                    }
                })
                  //  console.log("blocks ",blocks0 )
                    vm.somedata.datadi=vm.t[cur_month]
                    vm.somedata.dataxian=blocks0[0].name
                    vm.somedata.type='day'
                    vm.$emit('child-say',vm.somedata);
                    cur_day=0;
                }
                // }
            },
           cur:function () {
            //   console.log("cur start:"+this.cur)
           //    console.log("cur start type:",this.dType)
               if(this.dType=='month')
                 this.moveTo(cur_month+1)
               else if(this.dType=='day')
                 this.moveTo(cur_day+1)
               else
                   this.moveTo(this.cur)
             //   console.log("cur"+this.cur)
            }

        }

    }
</script>
