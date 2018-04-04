<template>
    <section class="wrap">
        <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>
        <!--标题结束-->
        <section>
            <div class="addBlank"></div>
            <div class="searchHrecords">
                <div class="clearfix">
                    <div class="fl searchRecInp">
                        <input type="text" placeholder="输入卡号/姓名/身份证号" v-model="info">
                    </div>
                    <img  @click="onSearchbyInfo" src="../../../../../static/img/salesman/searchHRecords.png" alt="" class="fl searchRecBtn">
                    <div class="fr searchFont" @click="onSearchbyInfo">搜索</div>
                </div>
            </div>
            <form id="formid" action="/wechat/company/HRecordUpload2" method="post" class="clearfloat">
            <div class="chooseSearchCon">
                <div class="chooseTitle">建档时间</div>
                <ul>
                    <li class="clearfix" @click="setDate2('start')">
                        <div class="fl">开始时间</div>
                        <div class="fr">{{startDate}} > </div>
                    </li>
                   <li class="clearfix addR" @click="setDate2('end')">
                        <div class="fl">截止时间</div>
                        <div class="fr">{{endDate}}  ></div>
                    </li>
                </ul>
                <div class="chooseTitle" >部门</div>
                <ul>
                    <li class="clearfix" @click="SelectDepartment2" >
                        <div class="fl">选择部门</div>
                        <div class="fr"> {{department}} ></div>
                    </li>
                </ul>

            </div>
            <a href="javascript:;" class="healthNextBtn" @click="onSearchbyDept">查询</a>

                <!--<img src="../../../static/img/sales/upload.png" alt="" class="fl">-->
             <!--<input type="submit" name="_id" v-model="activityId" class="fl"/>-->
                <!--<span>导出</span>-->
            </form>
            <mt-popup v-model="popupVisible" closeOnClickModal>
                <div class="addEmailBox">
                    <div class="mentionETitle">请输入邮箱</div>
                    <input type="email" v-model="eMail">
                    <div class="emailBtns clearfix">
                        <div class="eMailConfirm fl" @click="onSendMail">确定</div>
                        <div class="eMailCancel fl" @click="onCancelMail">取消</div>
                    </div>
                </div>
            </mt-popup>
        </section>
        <!--标题结束-->
        <transition name="picker">
            <div v-show="show">
                <SinglePicker
                        :onOk="onOk"
                        :onCancel="onCancel"
                        v-on:hide="hide"
                >

                    <!--:month="month"-->
                    <!--:year="year"-->
                    <!--:day="day"-->

                </SinglePicker>
                <div  class='mark'></div>
                <p></p>
            </div>
        </transition>

        <transition name="fade">
            <div v-show="dateshow">
                <com-calendar
                        :startYear="startYear"
                        :endYear="endYear"
                        :month="month"
                        :year="year"
                        :day="day"
                        :onOk="onDateOk"
                        :onCancel="onDateCancel"
                        v-on:hide="Datehide"
                ></com-calendar>
                <div  class='mark'></div>
                <p></p>
            </div>
        </transition>
        <footerpart></footerpart>
        <alertTiming ref="alertTiming1" :content="alertContent">  </alertTiming>
    </section>
</template>

<script>
    import headerpart from "../headerpart"
    import footerpart from "../footerpart"
    import SinglePicker from '../../../common/SinglePicker/calendar.vue'
    import calendar from '../../../common/datepicker2/calendar.vue'
    import m from  '../../../../../static/css/style.scss'
    import s from  '../../../../../static/css/calendar.scss'
    import axios from 'axios'
    import alertTiming from '../../../alertTiming';

    export default {
        data(){
            return {
                imgaddr0:'/static/img/return.png',
                title0:'健康档案详情',
                dateshow:false,
                show:false,
                popupVisible:false,
                onOk:function () {},
                onCancel:function (){},
                onDateOk:function () {},
                onDateCancel:function (){},
                startYear:2000,
                endYear:2050,
                year:(new Date).getFullYear(),
                month:((new Date).getMonth()+1),
                day:(new Date).getDate(),

                info:'',
                startDate:'请选择开始时间',
                endDate:'请选择结束时间',
                department:'请选择部门',
                alertContent:'',
                str:'',
                eMail:''

            }
        },
        mounted:function(){

        },
        methods: {
            onCancelMail(){

            },
            onSendMail(){
                let vm=this;
                this.preProcess();
                axios.get('/wechat/company/HRecordMail',{params:{startDate:this.startDate,
                    endDate:this.endDate,department:this.department,email:this.eMail}})
                    .then(function (response) {

//                        document.getElementById("formid").submit();
//

                        console.log("response：")

                        if(response.data.length==0)
                        {

                        }

                        for ( var i = 0; i < response.data.length; i++) {
                            vm.Users.push(response.data[i]);

                        }
                        console.log( vm.Users)
                    })
                    .catch(function (response) {
                        console.log("error response：")
                        console.log(response);
                    })

            },

            onUpload(){
                   console.log("onUpload");
                   this.popupVisible=true;



            },
            onSearchbyInfo(){
                this.$router.push('/company/healthRecLists?info='+this.info)
            },
            preProcess(){

                if(this.startDate =='请选择开始时间') this.startDate='';
                if(this.endDate =='请选择结束时间') this.endDate='';
                if(this.department =='请选择部门')  this.department='';
                if((this.startDate==''&&this.endDate!='') ||(this.startDate!=''&&this.endDate=='') )
                {
                    this.alertContent='时间选择不完整，请选择';
                    this.$refs.alertTiming1.Show();
                    return;
                }
                if(this.startDate==''&&this.endDate=='' &&this.department=='')
                {
                    this.alertContent='查询条件不能为空';
                    this.$refs.alertTiming1.Show();
                    return;

                }

            },

            onSearchbyDept(){
                this.preProcess();
                console.log("department",this.department)
                this.str="?startDate="+this.startDate+"&endDate="+this.endDate+"&department="+this.department;
//                str="?startDate="+this.startDate+"&endDate="+this.endDate+"&department=一部";
                //console.log("str",str)
                this.$router.push('/company/healthRecLists'+this.str)
            },

            hide(){
                this.show = false;
            },
            Datehide(){
               this.dateshow =false
            },
            SelectDepartment(){
                let vm = this;
                this.show = true;
                vm.onOk = function (date) {
                    console.log(date)
                    vm.department=date.year
//                vm.date= date.year+'-'+date.month+'-'+date.day+' '+date.hour+':'+date.min;
//                 console.log('确定')
                };
                vm.onCancel = function () {
                    console.log('取消')
                };

//        this.$calendar.show({
//          onOk(date){
//            console.log(date)
//            vm.date= date.year+'-'+date.month+'-'+date.day+' '+date.hour+':'+date.min;
//            console.log('确定')
//          },
//          onCancel(){
//            console.log('取消')
//          }
//        })
            },
            SelectDepartment2(){
                let vm = this;

               this.show = true;
                vm.onOk = function (date) {
                    vm.department = date.year;
                    //console.log(date)
                    console.log('确定123')
                }
                vm.onCancel = function () {
                    console.log('取消')

                }

            },

            setDate(){
                let vm = this;
                this.dateshow=true;
                vm.onDateOk =function(date){
                    console.log(date)
                    vm.date= date.year+'-'+date.month+'-'+date.day;
                    // console.log('确定')
                };
                vm.onDateCancel =function(){
                    //  console.log('取消')
                };

//        this.$calendar.show({
//          onOk(date){
//            console.log(date)
//            vm.date= date.year+'-'+date.month+'-'+date.day+' '+date.hour+':'+date.min;
//            console.log('确定')
//          },
//          onCancel(){
//            console.log('取消')
//          }
//        })
            },
            setDate2(index){
                let vm = this;
                let a= (new Date()).getMonth()+1
                this.dateshow=true;
                vm.onDateOk=function(date){
                    if(index=='start')
                    vm.startDate= date.year+'-'+date.month+'-'+date.day;
                    else
                     vm.endDate= date.year+'-'+date.month+'-'+date.day;
                    console.log(date)
                    console.log('确定123')
                }
                vm.onDateCancel=function(){

                }

                if(vm.year_init !='' && vm.month_init !='')
                {
                    this.year=vm.year_init;
                    this.month=vm.month_init;
                    this.day=vm.day_init;

                }
                else {
                    this.year=(new Date).getFullYear()
                    this.month=((new Date).getMonth()+1)
                    this.day=(new Date).getDate()
                }

              //        this.$calendar.show({
//          onOk(date){
//            vm.date= date.year+'-'+date.month+'-'+date.day+' '+date.hour+':'+date.min;
//            console.log(date)
//            console.log('确定123')
//          },
//          onCancel(){
//            console.log('取消123')
//          },
//          year:(new Date).getFullYear(),
//          month:((new Date).getMonth()+1),
//          day:(new Date).getDate(),
//          hour:(new Date).getHours(),
//          min:0
//        })
            },
            GetResultbyInfo(){
                let vm=this;

//                if(this.pageNumber==this.totalPages) {
//                    this.numOfPage=this.totalNum-this.pageNumber*this.numOfPage
//                }

                axios.get('/wechat/company/HRecordQuery',{params:{
                    info: this.info
                }})
                    .then(function (response) {

                        console.log("response：")

                        for ( var i = 0; i < response.data.length; i++) {
                            vm.Users.push(response.data[i]);

                        }
                        console.log( vm.Users)
                    })
                    .catch(function (response) {
                        console.log("error response：")
                        console.log(response);
                    })
            },
        },
        components:{
            headerpart,
            footerpart,
            SinglePicker,
            alertTiming,
            'com-calendar':calendar
        }

    }
</script>
<style>
    .addBlank{
        width:100%;
        height: 2.2rem;
    }
    .searchHrecords{
        height:3.15rem;
        padding-top:0.6rem;
        background: #fff;
        position: relative;
    }
    .searchHrecords .searchRecInp{
        height: 1.8rem;
        width: 13.75rem;
        border:1px solid #e6e6e6;
        border-radius: 0.3rem;
        background: #f4f4f4;
        margin-left:0.9rem;
    }

    .searchHrecords input::-webkit-input-placeholder{
        text-align: left;
        text-indent: 0.6rem;
    }
    .searchHrecords input{
        box-sizing: border-box;
        text-indent: 0.6rem;
        height: 100%;
        width: 100%;
        border-radius: 0.3rem;
        background: #f4f4f4;
        border:0;
    }
    .searchRecBtn{
        position: absolute;
        right:2.7rem;
        width: 1.85rem;
        height: 1.85rem;
    }
    .searchFont{
        color:#797979;
        font-size:0.8rem;
        padding:0.3rem 0.8rem 0 0;
    }
    .chooseSearchCon{
        width:100%;
        /*padding:0 0.75rem;*/
        background: #fff;
    }
    .chooseTitle{
        background: #eee;
        text-indent: 0.75rem;
        color:#6a6a6a;
        font-size:0.8rem;
        line-height:2.5rem;
    }
    .chooseSearchCon ul{
        margin:0 0.75rem;
    }
    .chooseSearchCon ul li{
        padding: 0.75rem 0 0.75rem 0.5rem;
        color:#6a6a6a;
    }
    .chooseSearchCon ul li.addR{
        border-top:1px solid #dcdcdc;
    }
    .chooseSearchCon ul li div{
        font-size:0.7rem;
    }
    .choiceDepartment div em{
        width:1rem;
        height: 1rem;
        margin-right:0.5rem;
        background: url('../../../../../static/img/healthRecords/check1.png') no-repeat;
        background-size:cover ;
    }
    .choiceDepartment div em.changeBg{
        background: url('../../../../../static/img/healthRecords/check2.png') no-repeat;
        background-size:cover ;
    }
    .choiceDepartment div span{
        font-size:0.7rem;
    }
    .healthNextBtn{
        width:16.65rem;
        height:2.25rem;
        display: block;
        text-align: center;
        line-height: 2.25rem;
        margin:1rem auto 0;
        color:#fff;
        font-size:1rem;
        background: #338fff;
    }
    .healthNextBtnUpload{
        width:16.65rem;
        height:2.25rem;
        display: block;
        text-align: center;
        line-height: 2.25rem;
        margin:0.6rem auto 0;
        color:#338fff;
        font-size:1rem;
        background: #fff;
        border:1px solid #338fff;
    }
    .addEmailBox{
        width:13rem;
        padding:1rem;
    }
    .addEmailBox .mentionETitle{
        font-size:0.7rem;
        margin-bottom:0.5rem;
    }
    .addEmailBox input{
        width: 90%;
        height: 1.5rem;
    }
    .emailBtns{
        width:63%;
        margin:1rem auto 0;
    }
    .emailBtns div{
        width: 2.5rem;
        height: 1.5rem;
        text-align: center;
        font-size:0.65rem;
        line-height: 1.5rem;
    }
    .eMailConfirm{
        color:#fff;
        background: #338fff;
        margin-right:3rem;
    }
    .eMailCancel{
        border:1px solid #338fff;
        color:#338fff;
        background: #fff;
    }
</style>
