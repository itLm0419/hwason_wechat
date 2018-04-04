<template>
    <section class="wrap">
        <header>
            <div class="mianTitle">健康档案</div>
        </header>
        <!--标题结束-->
        <section>
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
                    <a href="#/company/healthRecSearch" class="fr linkHDateDetail">查看数据详情</a>
                </div>
                <ul class="showTitleRow clearfix" v-if="showDepartment">
                    <li class="fl">部门</li>
                    <li class="fl">历史档案数</li>
                    <li class="fl">今日新增数</li>
                    <li class="fl">档案总数</li>
                </ul>
                <ul class="showTitleRow clearfix" v-else>
                    <li class="fl">业务员</li>
                    <li class="fl">所属部门</li>
                    <li class="fl">今日新增数</li>
                    <li class="fl">档案总数</li>
                </ul>
                <div class="rangeBox">
                    <ul class="rangeData" v-if="showDepartment" v-for="(statisticsDept,index) in StatisticsDept">
                        <li class="clearfix">
                            <div class="fl depart" v-if="index<2">
                                <img :src="index|changImg" alt="" :class="index|changClass">
                                <span>{{statisticsDept.department||"无"}}</span>
                             </div>
                            <div class="fl depart" v-else><span class="rangeNum">{{index+1}}</span> <span>{{statisticsDept.department||"无"}}</span></div>
                            <div class="fl historyNum">{{statisticsDept.other_number}}</div>
                            <div class="fl todayNum"><span class="markNum">{{statisticsDept.today_number}}</span></div>
                            <div class="fl">{{statisticsDept.total_number}}</div>
                        </li>
                    </ul>
                    <ul class="rangeData" v-if="!showDepartment" v-for="(statisticsSales,index) in StatisticsSales">
                        <li class="clearfix">
                            <div class="fl depart" v-if="index<2">
                                <img :src="index|changImg" alt="" :class="index|changClass">
                                <span>{{statisticsSales.name}}</span>
                            </div>
                            <div class="fl depart" v-else><span class="rangeNum">{{index+1}}</span> <span>{{statisticsSales.name}}</span></div>
                            <div class="fl historyNum">{{statisticsSales.department||"无"}}</div>
                            <div class="fl todayNum"><span class="markNum">{{statisticsSales.today_number}}</span></div>
                            <div class="fl">{{statisticsSales.total_number}}</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="totalDataNum" v-if="showDepartment">
                <div class="addTopLine"></div>
                <ul class="clearfix ">
                    <li class="fl totalRow">总计</li>
                    <li class="fl ">{{totalOtherNum}}</li>
                    <li class="fl markNum todayNum">{{totalTodayNum}}</li>
                    <li class="fl">{{totalTotalNum}}</li>
                </ul>
            </div>
            <div class="totalDataNum" v-else>
                <div class="addTopLine"></div>
                <ul class="clearfix ">
                    <li class="fl totalRow">总计</li>
                    <li class="fl">--</li>
                    <li class="fl markNum">{{totalTodayNumSales}}</li>
                    <li class="fl">{{totalTotalNumSales}}</li>
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
                popupVisible:false,
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
                    {   today_number:0,
                        total_number:0,
                        name:'',
                        department:''}
                ]
            }
        },
        filters:{
            changImg(value){
                switch (value){
                    case 0:
                        return '../../../../../static/img/company/wechat/healthRecords/top1.png'
                    case 1:
                        return '../../../../../static/img/company/wechat/healthRecords/top2.png'
                }
            },
            changClass(value){
                switch (value){
                    case 0:
                    return "top1"
                    case 1:
                    return "top2"
                }
            }
        },
        mounted:function(){
            console.log("mounted")
            this.GetStatisticsbyDepartment()
            this.GetStatisticsbySalesman()
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
            totalTodayNumSales: function(){
                let total=0;
                for(var i=0;i<this.StatisticsSales.length;i++)
                    total=total+this.StatisticsSales[i].today_number;
                return total;
            },
            totalTotalNumSales: function(){
                let total=0;
                for(var i=0;i<this.StatisticsSales.length;i++)
                    total=total+this.StatisticsSales[i].total_number;
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
                this.GetStatisticsbySalesman()
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
        height: 2.2rem;
    }
    .comHealthRecHBanner img{
        width:18.75rem;
        height: 8.55rem;
        margin-bottom:0.6rem;
    }
    .hNav{
        padding-top:0.5rem;
    }
    .hNav .titTabs{
        width:10.5rem;
        height:1.3rem;
        margin-left:1.1rem;
    }
    .hNav .titTabs div{
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width:50%;
        height:100%;
        text-align: center;
        line-height: 1.2rem;
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
        height: 1.3rem;
        background: #ec3f3f;
        text-align: center;
        color:#fff;
        margin-right:0.6rem;
        line-height: 1.3rem;
    }
    .showTitleRow{
        margin:0.95rem 0.95rem 0;
        padding-bottom:0.4rem;
        border-bottom:1px solid #aaa;
    }
    .showTitleRow li{
        width:25%;
        text-align: center;
        color:#3d3d3d;
    }
    .rangeBox{
        padding:0 0.5rem;
        height:13rem;
        overflow-y: scroll;
    }
    .rangeBox .rangeData li{
        margin:0.45rem 0;
        /*text-align: center;*/
    }
    .rangeBox .rangeData .depart{
        width:6rem;
    }
    .historyNum{
        width:4rem;
        /*text-align: center;*/
    }
    .todayNum{
        width:4.5rem;
        /*text-align: center;*/
    }
    .rangeBox  img.top1{
        width: 1.05rem;
        height: 0.8rem;
        margin:0 0 0 0.2rem;
    }
    .rangeBox  img.top2{
        width: 0.65rem;
        height: 0.65rem;
        margin:0 0.1rem 0 0.4rem;
    }
    .markNum{
        color:#ec3f3f;
    }
    .rangeNum{
        padding:0 0.3rem 0 0.5rem;
    }
    .totalDataNum{
        width:100%;
        height: 1.4rem;
        background: #fff;
        position: absolute;
        left:0;
        bottom:2.65rem;
    }
    .totalDataNum li{
        width: 25%;
        text-indent: 1.6rem;
        line-height: 1.4rem;
    }

</style>
