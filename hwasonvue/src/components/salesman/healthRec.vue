<template>
    <section class="wrap">
        <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>
        <!--<div class="addBlank"></div>-->
        <section>
            <div class="addBlank"></div>
            <div class="searchHrecords">
                <div class="clearfix">
                    <div class="fl searchRecInp">
                        <input type="text" v-model="param" placeholder="输入卡号/姓名/身份证号">
                    </div>
                    <img src="../../../static/img/salesman/searchHRecords.png" alt="" @click="init" class="fl searchRecBtn">
                </div>
                <div class="RecordsSum">统计档案总数：<span>{{count}}</span></div>
            </div>
            <div class="searchHrecordsLists">
                <mt-loadmore  :bottom-method="loadBottom"  :auto-fill ="autoFill" ref="loadmore">
                    <ul>
                        <li v-for="(data,index) in healthRecData" v-on:click="toDetail(data.userId)">
                            <div class="clearfix">
                                <span class="hName fl">{{data.name}}</span>
                                <span class="hSex fl">{{data.sex}}</span>
                                <span class="hAge fl">{{data.age}}岁</span>
                                <span class="hCode fr">{{data.cardNo}}</span>
                            </div>
                            <div class="clearfix">
                                <div class="hData fl">建档日期：{{data.createTime}}</div>
                                <div v-if="data.complete" class="hIsSubmit fr" >已提交</div>
                                <div v-else class="hIsNotSubmit fr" >未提交</div>
                            </div>
                        </li>
                    </ul>
                </mt-loadmore>
            </div>
        </section>
    </section>
</template>
<script>
    import headerpart from '../company/wechat/headerpart';
    import Vue from 'vue'
    import axios from 'axios'

    import {mapState,mapMutations} from 'vuex'
    export default {
        data(){
            return {
                autoFill:false,
                param:"",
                imgaddr0: "/static/img/return.png",
                title0:"健康档案详情",
                healthRecData:[],
                pageNo:1,
                pageSize:20,
                count:0

            }
        },
        methods:{
            init(){
                var vm = this
                axios.get('/wechat/healthRecord/showRecords',{params:{param:vm.param,pageNo:1,pageSize:vm.pageSize}})
                    .then(function (response) {
                        if(response.data.records.length){
                            vm.healthRecData = response.data.records
                            vm.pageNo+=1;
                            vm.count = response.data.count;
                        }

                    })
            },
            loadBottom(){
                var vm = this
                axios.get('/wechat/healthRecord/showRecords',{params:{param:vm.param,pageNo:vm.pageNo,pageSize:vm.pageSize}})
                    .then(function (response) {
                        console.log(222)

                        if(response.data.records.length){
                            vm.pageNo+=1;
                            vm.count = response.data.count;
                        }
                        vm.healthRecData = [...vm.healthRecData,...response.data.records]
                        vm.$refs.loadmore.onBottomLoaded();
                    })
            },
            toDetail(id){
                this.$router.push('/salesman/healthRecDetail?userId='+id)
            }
        },
        mounted:function(){
            this.init();

        },
        created:function(){
        },

        components:{
            headerpart,
        }
    }
</script>
<style>
    .addBlank{
        height: 2.2rem;
        width:100%;
    }
    .searchHrecords{
        height:3.8rem;
        padding-top:0.6rem;
        background: #fff;
        position: relative;
    }
    .searchHrecords .searchRecInp{
        height: 1.8rem;
        width: 14.5rem;
        border:1px solid #e6e6e6;
        border-radius: 0.3rem;
        background: #f4f4f4;
        margin-left:1.9rem;
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
        right:1.9rem;
        width: 1.85rem;
        height: 1.85rem;
    }
    .searchHrecordsLists{
        background: #fff;
        height:22rem;
        margin-top:0.7rem;
        overflow-y: scroll;
    }
    .searchHrecordsLists ul{
        padding:0 1.65rem 0 1.4rem;
    }
    .searchHrecordsLists ul li{
        width:100%;
        height: 3rem;
        padding-top:0.5rem;
        border-bottom:1px solid #dcdcdc;
    }
    .hName{
        width:4.5rem;
        font-size:0.8rem;
        color:#3b3b3b;
    }
    .hSex{
        width:3rem;
        font-size:0.7rem;
        color:#3b3b3b;
    }
    .hAge{
        font-size:0.7rem;
        color:#3c3c3c;
    }
    .hData{
        margin-top:0.7rem;
        font-size:0.7rem;
        color:#3b3b3b;
    }
    .hIsSubmit{
        margin-top:0.7rem;
        font-size:0.7rem;
        color:#529400;
    }
    .hIsNotSubmit{
        margin-top:0.7rem;
        font-size:0.7rem;
        color:#ed3f3f;
    }
    .RecordsSum{
        font-size:0.7rem;
        padding:0.5rem 0 0 1.4rem;
    }
    .RecordsSum span{
        font-size:0.8rem;
        color:#338fff;
    }
</style>
