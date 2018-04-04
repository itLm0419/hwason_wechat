<template>
    <section class="wrap">
        <headerpart :imgaddr="imgaddr0" :title="title0" :edit="edit0" v-on:onMyClicking="exportRecord"> </headerpart>
        <section class="" >
            <div class="addBlank"></div>
            <div id="scroll0" class="recordsLists" :style="{'-webkit-overflow-scrolling': scrollMode}" ref="scroll000">
               <v-loadmore :bottom-method="loadBottom"  :auto-fill ="autoFill" ref="loadmore" >
                   <ul>
                    <li v-for="(data,index) in healthRecData" v-on:click="toDetail(data.userId)">
                        <div class="clearfix">
                            <span class="hName fl">{{data.name}}</span>
                            <span class="hSex fl">{{data.sex}}</span>
                            <span class="hAge fl">{{data.age}}</span>
                            <span class="hCode fl">{{data.cardNo}}</span>
                            <div v-if="data.complete" class="hIsSubmit fr" >已提交</div>
                            <div v-else class="hIsNotSubmit fr" >未提交</div>
                        </div>
                       <div class="clearfix">
                           <div class="hUser fl">业务员：{{data.salesman.realName}}</div>
                           <div class="hWorker fl">工号：{{data.salesman.userName}}</div>
                           <!--<div class="hIsSubmit fr" v-if="user.complete=='已完成'">{{data.complete}}</div>-->
                           <!--<div class="hIsNotSubmit fr" v-else>{{data.complete}}</div>-->
                       </div>
                    </li>
                </ul>
               </v-loadmore> 
          </div>
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

    </section>
</template>
<script>
    import headerpart from '../headerpart';
    import Vue from 'vue'
    import axios from 'axios'
    import {Loadmore} from 'mint-ui';
    import api from '../../../../util/api'
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return {
                eMail:"",
                popupVisible:false,
                autoFill:false,
                imgaddr0: "/static/img/return.png",
                title0:"健康档案详情",
                edit0:"导出",
                allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了  
                scrollMode:"auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动  
                totalNum:0,
                numOfPage:8,
                totalPages:0,
                pageNumber:0,
                startDate:'',
                endDate:'',
                department:'',
                info:'',
                params:{},
                path:'',
                pageNo:1,
                pageSize:20,
                healthRecData:[]

            }
        },

        methods:{
            exportRecord(){
                this.popupVisible = true
            },
            onSendMail(){
                if(!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.eMail)){
                    this.$messagebox({
                        title:"提示",
                        message:"邮箱格式不正确"
                    })
                    return false;
                }
                let begin,end;
                if(this.startDate){
                    begin = api.getDate(this.startDate)
                }
                if(this.endDate){
                    end = api.getDate2(this.endDate)
                }
                var vm = this;
                axios.get("/wechat/company/sendEmailRecords",{params:{
                    email:this.eMail,
                    CNI:this.CNI,
                    beginTime:begin,
                    endTime:end,
                    department:this.department,
                }}).then(function (response) {
                    console.log(response.data);
                    if(response.data.result = "00"){
                        vm.popupVisible = false;
                        vm.$messagebox({
                            title:"提示",
                            message:"发送成功"
                        })
                    }
                })
            },
            onCancelMail(){
                this.popupVisible = false
            },
            toDetail(id){
                this.$router.push('/salesman/healthRecDetail?userId='+id)
            },
            loadBottom(){
                var vm =this;
                let begin,end;
                if(this.startDate){
                    begin = api.getDate(this.startDate)
                }
                if(this.endDate){
                    end = api.getDate2(this.endDate)
                }

                vm.healthRecData = [...vm.healthRecData,...vm.healthRecData]
                vm.$refs.loadmore.onBottomLoaded();
//                axios.get("/wechat/company/showRecordsOrg",{params:{
//                    pageNo:this.pageNo,
//                    pageSize:this.pageSize,
//                    CNI:this.CNI,
//                    beginTime:begin,
//                    endTime:end,
//                    department:this.department,
//                }}).then(function (response) {
//                    if(response.data.records.length){
//                        vm.pageNo+=1;
//                        vm.count = response.data.count;
//                    }
//                    vm.healthRecData = [...vm.healthRecData,...response.data.records]
//                    vm.$refs.loadmore.onBottomLoaded();
//                })
            },
            init(){
                var vm =this
                let begin,end;
                if(this.startDate){
                    begin = api.getDate(this.startDate)
                }
                if(this.endDate){
                    end = api.getDate2(this.endDate)
                }
                console.log(this.CNI,2222);
               axios.get("/wechat/company/showRecordsOrg",{params:{
                   pageNo:this.pageNo,
                   pageSize:this.pageSize,
                   CNI:this.CNI,
                   beginTime:begin,
                   endTime:end,
                   department:this.department,
               }}).then(function (response) {
                   console.log(response.data)
                   vm.healthRecData = response.data.records
                   vm.pageNo+=1;
                   vm.count = response.data.count;
               })
            },
        },
        created:function(){
            let UrlSearch = new api.UrlSearch()
            this.CNI = decodeURI(UrlSearch.info);
            this.startDate = UrlSearch.startDate;
            this.endDate = UrlSearch.endDate;
            this.department = decodeURI(UrlSearch.department);
            console.log(this.department)
            this.init()
        },

        components:{
            headerpart,
           'v-loadmore':Loadmore  // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题  
            // 推荐应用组件时用a-b形式起名  
        }
    }
</script>
<style>
    .addBlank{
        width:100%;
        height: 2.2rem;
    }
    .recordsLists{
        background: #fff;
        overflow-y: scroll;
        height: 29rem;
    }
    .recordsLists ul{
        padding:0 1.65rem 0 1.4rem;
    }
    .recordsLists ul li{
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
        width:2rem;
        font-size:0.7rem;
        color:#3b3b3b;
    }
    .hCode{
        font-size:0.7rem;
        /*margin-left:0.2rem;*/
    }
    .hAge{
        width:2rem;
        font-size:0.7rem;
        color:#3c3c3c;
    }
    .hUser{
        width: 6rem;
        margin-top:0.7rem;
        font-size:0.7rem;
        color:#3b3b3b;
    }
    .hWorker{
        margin-top:0.7rem;
        font-size:0.7rem;
        color:#3b3b3b;
    }
    .hIsSubmit{
        /*margin-top:0.7rem;*/
        font-size:0.7rem;
        color:#529400;
        /*padding:0.1rem 0 0 0.4rem;*/
    }
    .hIsNotSubmit{
        /*margin-top:0.7rem;*/
        font-size:0.7rem;
        color:#ed3f3f;
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
        border-radius: 0.2rem;
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
