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

 import axios from 'axios'
var pos,moveLast,moveNow,cur_year,cur_day,cur_month,month_item=-1,day_item=-1;
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
                t:[],  //部门
                t2:[],  //省，市，县（区）的编号
                sT:0, //开始时间
                eT:0, //结束时间
                tDiff:0,
                max:102,
                min:'',
                year0:'',
                somedata:{},
                provinces0:["aaa","bbb","ccc"]

//                selectedProvince: provinces[0],
//                selectedCity: 0,
//                selectedBlock: 0,
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
          console.log("mount provinces0",this.provinces0)

              this.GetDepartment();

         this.moveTo(this.cur)
         console.log("datescroll-cur department:"+this.cur)
       },

        methods: {
            GetDepartment(){
                let vm=this;
                console.log("get Department")
                axios.get('/wechat/company/HRecordDepartment')
                    .then(function (response) {
                        console.log("response：",)
                        if(response.data !=null) {
                            vm.provinces0=response.data;
                            vm.$emit('setDate',vm.dType,vm.provinces0[0])
                            console.log("vm.provinces0：",response.data)
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
                console.log("moveTo Single:cur,type:",cur,this.dType)

                let vm = this;

                if(!(/^[-+]?[0-9]+$/.test(cur)))
                {
                    cur=1;
//                    if(this.dType=='year')
//                    {
//                        cur=1;
//
//                    }
                    console.log("非数字，cur=1")
                }
               if(this.dType==='year'){
                    cur_year=cur;
                    console.log("moveto year single",cur_year)
//                    if(this.all.join().indexOf(cur+'年')===-1){
//                       return false
//                   }

                 //   cur = cur- this.startTime +1;

                }
                // console.log(" vm.getday()")
                vm.Y = -((cur-4) *34);
             //  console.log("datascroll:cur:"+cur);
            //  console.log("datascroll:thistype:"+this.dType);
               // console.log("all :"+this.all);
               console.log("vm.Y",vm.Y)
               console.log("method moveTo(cur) pos single",vm.Y/(-34)+3)
              this.$refs.item[vm.Y/(-34)+3].style.color="#3881ff"
              this.$refs.item[vm.Y/(-34)+3].style.fontSize="0.9rem"
                vm.styleObject.transform  = "translate(0,"+vm.Y+"px)";
                console.log("ok",vm.Y/(-34)+3)

                vm.isMoving = true;
                vm.timeOut = setTimeout(function () {
                    vm.isMoving = false
                },0.3)
            }

        },
        computed:{
            all: {

                get:function(){
                    let item;
                    console.log("all get computed department")
                    let vm = this;
                   //                    if(this.dType =="year"&&vm.t.length==0){
                    if(this.dType =="year") {
                        console.log("all get computed department3")
                       vm.t.splice(0,vm.t.length)
                        console.log("all get computed department5",vm.provinces0)
                       vm.t=vm.provinces0;
                       // vm.t2=provinces0_code;
                        console.log("all get computed department2",vm.t.length)
                        console.log("all get computed department4",vm.t)

                    vm.cNum =vm.t.length;
//                        for( ;s<=e;s++){
//                            vm.t.push(s+'年');
//                        }
                     //   console.log("year all ", vm.t)
                        //设初始省份为江苏省，发送值给父组件
                   //   this.$emit('setDate',this.dType,vm.t[9])
                    }
//                   vm.$store.dispatch('calendarDateStatus',{type:vm.dType,d:vm.curD});
                    return vm.t
                },


            }

        },
        watch:{
//           provinces:function(){
//               console.log("watch provinces")
//               vm.t.splice(0,vm.t.length)
//               console.log("all get computed department15",provinces)
//               vm.t=provinces;
//               // vm.t2=provinces0_code;
//               console.log("all get computed department12",vm.t.length)
//               console.log("all get computed department14",vm.t)
//               vm.cNum =vm.t.length;
//
//           },
            year0:function () {
                let vm=this;
                console.log("yearwatch0 single")

                                  // console.log("cities0 ",cities0 )
                    vm.somedata.datasheng=vm.t[cur_year]

                    vm.somedata.type='year'
                  vm.$emit('child-say',vm.somedata);


            },

           cur:function () {
               console.log("cur department start:"+this.cur)
           //    console.log("cur start type:",this.dType)
                 this.moveTo(this.cur)
             //   console.log("cur"+this.cur)
            }

        }

    }
</script>
