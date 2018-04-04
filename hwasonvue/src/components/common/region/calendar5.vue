<template>
    <div class="com-calendar"  >
        <div class="dp-container">
            <div class="dp-header">
                <div class="dp-item dp-left" @click = "hiddenCalendar">取消</div>
                <div class="dp-item dp-right" @click = "choiceDate">确定</div>
            </div>
            <div class="dp-content">
                <!--<div class="dp-content">-->
                    <div class="dp-item" >
                        <com-date-scroll ref="yearcom" @setDate="setDate"  v-on:child-say="listenToMyBoy"  :cur="year"  :dType = "'year'" ></com-date-scroll>
                  </div>
                    <div class="dp-item" >
                        <com-date-scroll ref="monthcom" @setDate="setDate"  v-on:child-say="listenToMyBoy" :startTime="random" :cur="curMonth||month" :dType = "'month'"  ></com-date-scroll>

                    </div>
                    <div class="dp-item" >
                        <com-date-scroll ref="daycom" @setDate="setDate"   :cur="curDay||day"   :startTime="random" :dType = "'day'"  ></com-date-scroll>
                    </div>



                </div>
            <!--</div>-->
        </div>
    </div>

</template>

<style lang="scss">

</style>

<script>
   import dateScroll from './dateScroll.vue';

    export default {
        data:function () {
            return{
                sYear:'',
                sMonth:'',
                sDay:'',
                curYear:'',
                curMonth:'',
                curDay:'',
                random:0
            }
        },
        props:{
           year:{
                type:Number
            },
            month:{
                type:Number
            },
            day:{
                type:Number
            },
             onOk:{
                type:Function
            },
            onCancel:{
                type:Function
            },
        },
        components:{
            comDateScroll:dateScroll,

        },
        mounted:function() {
            console.log("calendar-year:"+this.year)

        },

        methods:{

            listenToMyBoy(somedata){
                console.log("somedata",somedata)
                console.log("this.sDay1",this.sDay)
                this.childWords = somedata;
                if(somedata.type=='year')
                {
                    this.curMonth=somedata.data;
                    this.curYear=somedata.data;
                    console.log("this.curMonth2",this.curMonth)
                }

                else
                {
                    this.curDay=somedata.data;
                    this.curMonth=somedata.data;
                    console.log("this.curDay2",this.curDay)
                }

                this.random=Math.ceil(Math.random()*1000);
                console.log("this.random",this.random)
            },

            choiceDate:function(){
                let vm = this;
                this.$emit('hide');
             //   this.curYear = this.sYear
             //   this.curMonth = this.sMonth
            //    this.curDay = this.sDay
                console.log("this.curYear",this.curYear)
                console.log("this.curMonth",this.curMonth)
                console.log("this.curDay",this.curDay)
                this.onOk({
                    year:vm.curYear||vm.year,
                    month:vm.curMonth||vm.month,
                    day:vm.curDay||vm.day,

                })
            },
            hiddenCalendar:function () {
                this.$emit('hide')
                this.onCancel();
            },
            setDate(d,v){
                switch (d){
                    case 'year':this.sYear = v;break;
                    case 'month':this.sMonth = v;break;
                    case 'day':this.sDay = v;break;
                }

            }
        }
    }


</script>
