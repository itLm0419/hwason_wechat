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
                        <com-date-scroll ref="yearcom" @setDate="setDate"  v-on:child-say="listenToMyBoy"  :cur="year"  :startTime="startYear" :dType = "'year'" :endTime ="endYear"></com-date-scroll>
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
                sHour:'',
                sMin:'',
                curYear:'',
                curMonth:'',
                curDay:'',
                curHour:'',
                curMin:'',
                random:0
            }
        },
        props:{
            startYear:{
                type:Number
            },
            endYear:{
                type:Number
            },
            year:{
                type:Number
            },
            month:{
                type:Number
            },
            day:{
                type:Number
            },
           hour:{
            type:Number
          },
          min:{
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
                this.curDay=somedata;
                console.log("this.curDay2",this.curDay)
                this.random=Math.ceil(Math.random()*1000);
                console.log("this.random",this.random)
            },

            choiceDate:function(){
                let vm = this;
                this.$emit('hide');
                this.curYear = this.sYear
                this.curMonth = this.sMonth
                this.curDay = this.sDay
                this.curHour = this.sHour
                this.curMin = this.sMin
                this.onOk({
                    year:vm.curYear||vm.year,
                    month:vm.curMonth||vm.month,
                    day:vm.curDay||vm.day,
                    hour:vm.curHour||vm.hour,
                    min:vm.curMin||vm.min,
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
                    case 'day':this.sDay = v;this.curDay = v;break;
                    case 'hour':this.sHour = v;break;
                    case 'min':this.sMin = v;break;
                }

            }
        }
    }


</script>
