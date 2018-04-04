<template>
    <section class="wrap">
        <!--<headerpart :imgaddr="imgaddr0"> </headerpart>-->
        <header>
            <div class="mianTitle">健康档案</div>
        </header>
        <!--标题结束-->
        <section class=" ">
            <div class="addBlank"></div>
            <div class="comHealthRecHBanner">
                <img src="../../../../../static/img/company/wechat/healthRecords/comHealthRecHBanner.png" alt="">
            </div>
            <div class="hNav">
                <div class="clearfix">
                    <!--切换按钮-->
                    <div class="titTabs clearfix fl" >
                        <div :class="addOn1" @click="titTabs1">按部门统计</div>
                        <div :class="addOn2" @click="titTabs2">按业务员统计</div>
                    </div>
                    <a href="#/company/healthRecLists" class="fr linkHDateDetail">查看数据详情</a>
                </div>
                <ul class="showTitleRow clearfix" v-if="showDepartment">
                    <li class="fl">部门</li>
                    <li class="fl">已有档案数</li>
                    <li class="fl">今日新增数</li>
                    <li class="fl">档案总数</li>
                </ul>
                <ul class="showTitleRow clearfix" v-else>
                    <li class="fl">业务员</li>
                    <li class="fl">所属部门</li>
                    <li class="fl">今日新增数</li>
                    <li class="fl">档案总数</li>
                </ul>
                <div class="clearfix rangeBox" >
                    <div v-for="(statisticsDept,index) in StatisticsDept">
                    <!--<ul class="fl rangeNum" v-if="showDepartment" >-->
                        <!--<li v-if="index==0"><img src="../../../../../static/img/company/wechat/healthRecords/top1.png" alt="" class="top1"></li>-->
                        <!--<li v-if="index==1"><img src="../../../../../static/img/company/wechat/healthRecords/top2.png" alt="" class="top2"></li>-->
                        <!--<li v-if="index>=2">{{index}}</li>-->
                    <!--</ul>-->
                    <ul class="fl rangeData" v-if="showDepartment" >
                        <li class="clearfix">
                            <div class="fl">{{statisticsDept.department}}</div>
                            <div class="fl">{{statisticsDept.other_number}}</div>
                            <div class="fl addMargin"><span class="markNum">{{statisticsDept.today_number}}</span></div>
                            <div class="fl addMargin2">{{statisticsDept.total_number}}</div>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
            <div class="totalDataNum">
                <div class="addTopLine"></div>
                <ul class="clearfix ">
                    <li class="fl totalRow">总计</li>
                    <li class="fl">272{{}}</li>
                    <li class="fl markNum">160{{}}</li>
                    <li class="fl">432{{}}</li>
                </ul>
            </div>

            <!--<div class="clearfix rangeBox" v-else v-for="(statisticsSales,index) in StatisticsSales" >-->
                <!--<ul class="fl rangeNum">-->
                    <!--<li><img src="../../../../../static/img/company/wechat/healthRecords/top1.png" alt="" class="top1"></li>-->
                    <!--<li><img src="../../../../../static/img/company/wechat/healthRecords/top2.png" alt="" class="top2"></li>-->
                    <!--<li>3</li>-->
                    <!--<li>4</li>-->
                <!--</ul>-->
                <!--<ul class="fl rangeData">-->
                    <!--<li class="clearfix">-->
                        <!--<div class="fl">{{statisticsSales.department}}</div>-->
                        <!--<div class="fl">{{statisticsSales.other_number}}</div>-->
                        <!--<div class="fl addMargin"><span class="markNum">{{statisticsSales.today_number}}</span></div>-->
                        <!--<div class="fl addMargin2">{{statisticsSales.total_number}}</div>-->
                    <!--</li>-->


                <!--</ul>-->
            <!--</div>-->
            </div>
            <div class="totalDataNum">
                <div class="addTopLine"></div>
                <ul class="clearfix ">
                    <li class="fl totalRow">总计</li>
                    <li class="fl">{{totalOtherNum}}</li>
                    <li class="fl markNum">{{totalTodayNum}}</li>
                    <li class="fl">{{totalTotalNum}}</li>
                </ul>
            </div>
        </section>
        <!--标题结束-->
        <footerpart></footerpart>
    </section>
</template>

<script>
    import headerpart from "../headerpart"
    import footerpart from "../footerpart"
    import axios from 'axios'

    export default {
        data(){
            return {
                addOn1:"fl on",
                addOn2:"fl",
                showDepartment:true,
                StatisticsDept:[
                    {other_number:0,
                    today_number:0,
                    total_number:0,
                    department:''}

                ],
                StatisticsSales:[
                    {other_number:0,
                        today_number:0,
                        total_number:0,
                        salesmanName:''}
        ]
            }
        },
        mounted:function(){
            console.log("mounted")
            this.GetStatisticsbyDepartment()

        },
        computed:{
//            ...mapState([
//                'companyInfo',
//
//            ]),

            totalOtherNum: function(){
                let total=0;
                for(var i=0;i<this.StatisticsDept.length;i++)
                    total=total+this.StatisticsDept[i].other_number;
                return total;
            },
            totalTodayNum: function(){
                let total=0;
                for(var i=0;i<this.StatisticsDept.length;i++)
                    total=total+this.StatisticsDept[i].today_number;
                return total;
            },
            totalTotalNum: function(){
                let total=0;
                for(var i=0;i<this.StatisticsDept.length;i++)
                    total=total+this.StatisticsDept[i].total_number;
                return total;
            },
        },
        methods: {

            titTabs1(){
                this.addOn1="fl on";
                this.addOn2="fl";
                this.showDepartment=true;
            },
            titTabs2(){
                this.addOn1="fl";
                this.addOn2="fl on";
                this.showDepartment=false;
            },

            GetStatisticsbyDepartment(){
                var vm=this;

                axios.get('/wechat/company/HRecordByDepartment')
                    .then(function (response) {
                        console.log("response：")

                        vm.StatisticsDept.splice(0, vm.StatisticsDept.length)
                        for ( var i = 0; i < response.data.length; i++) {
                            vm.StatisticsDept.push(response.data[i]);

                        }
                        console.log( vm.StatisticsDept)
                    })
                    .catch(function (response) {
                        console.log("error response：")
                        console.log(response);
                    })
            },
            GetStatisticsbySalesman(){
                var vm=this;

                axios.get('/wechat/company/HRecordBySalesman')
                    .then(function (response) {
                        console.log("response：")

                        vm.StatisticsSales.splice(0, vm.StatisticsSales.length)
                        for ( var i = 0; i < response.data.length; i++) {
                            vm.StatisticsSales.push(response.data[i]);

                        }
                        console.log( vm.StatisticsSales)
                    })
                    .catch(function (response) {
                        console.log("error response：")
                        console.log(response);
                    })
            },
        },
        components:{
            headerpart,
            footerpart
        }
    }
</script>
<style>
    .addBlank{
        width:100%;
        height: 2.22rem;
    }
    .comHealthRecHBanner img{
        width:18.75rem;
        height: 8.55rem;
        margin-bottom:0.6rem;
    }
    .hNav .titTabs{
        width:10.5rem;
        height:1.1rem;
        margin-left:1.1rem;
    }
    .hNav .titTabs div{
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width:50%;
        height:100%;
        text-align: center;
        line-height: 1rem;
        color:#338fff;
        background: #fff;
        border:1px solid #338fff;
    }
    .hNav .titTabs div.on{
        background: #338fff;
        color:#fff;
    }
    .hNav{
        background: #fff;
    }
    .linkHDateDetail{
        width: 4.55rem;
        height: 1.1rem;
        background: #ec3f3f;
        text-align: center;
        color:#fff;
        margin-right:0.6rem;
        line-height: 1.1rem;
    }
    .showTitleRow{
        margin:0.95rem 0.95rem 0;
        padding-bottom:0.4rem;
        border-bottom:1px solid #aaa;
    }
    .showTitleRow li{
        padding:0 0.9rem;
        color:#3d3d3d;
    }
    .rangeBox{
        padding:0 0.5rem;
        height:13rem;
        overflow-y: scroll;
    }
    .rangeBox .rangeNum{
        margin-right:0.15rem;
    }
    .rangeBox .rangeNum li{
        text-align: center;
        margin:0.4rem 0;
    }
    .rangeBox .rangeData li{
        margin:0.45rem 0;
    }
    .rangeBox .rangeData li div{
        margin-right:3rem;
    }
    .rangeBox .rangeData li div.addMargin{
        margin-right:0;
        margin-left:1rem;
    }
    .rangeBox .rangeData li div.addMargin2{
        margin-right:0;
        margin-left:3.8rem;
    }
    .rangeBox .rangeNum img.top1{
         width: 1.05rem;
         height: 0.8rem;
     }
    .rangeBox .rangeNum img.top2{
        width: 0.65rem;
        height: 0.65rem;
    }
    .markNum{
        color:#ec3f3f;
    }
    .totalDataNum{
        /*padding:*/
        width:100%;
        height: 1.4rem;
        background: #fff;
        position: absolute;
        left:0;
        bottom:2.65rem;
    }
    .totalDataNum li.totalRow{
        text-indent: 1.7rem;
    }
    .totalDataNum li{
        width: 25%;
        height: 100%;
        text-indent: 1.15rem;
        line-height: 1.4rem;
    }
    .addTopLine{
        background: #aaa;
        width: 85%;
        height: 1px;
        margin:0 auto;
    }
</style>
