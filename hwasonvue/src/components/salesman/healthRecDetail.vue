<template>
    <section class="wrap">
        <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>
        <div class="addBlank"></div>
        <section class="clearfix">
            <div class="leftTabs fl">
                <ul>
                    <li><a href="javascript:;" :class="active" v-on:click="tabBtn1">基本信息</a></li>
                    <li><a href="javascript:;" :class="addClass_" v-on:click="tabBtn2">个人疾病史</a></li>
                    <li><a href="javascript:;" :class="addBorderss" v-on:click="tabBtn3">家族史</a></li>
                    <li><a href="javascript:;" :class="addClass2_" v-on:click="tabBtn4">个人健康状况</a></li>
                    <li><a href="javascript:;" :class="addBorderss2" v-on:click="tabBtn5">其他健康说明</a></li>
                </ul>
                <div class="addBlank2"></div>
            </div>
            <div class="fl tabContnet">
                <div class="tab1Contnet" v-show="tab1">
                    <img src="../../../static/img/salesman/hTab_01.png" alt="">
                    <ul class="rightHealthRecContent">
                       <li >健康卡号:{{record.cardNo}}</li>
                       <li>建档日期:{{createTime}}</li>
                       <li>姓名:{{record.name}}</li>
                       <li>年龄:{{record.age}}岁</li>
                       <li>身份证:{{record.IDNo}}</li>
                       <li>电话:{{record.tel}}</li>
                       <li>居住地:{{record.region}}</li>
                       <li>详细地址:{{record.address}}</li>
                        <div v-for="(relations,index) in record.relatives">
                            <li>关系人{{index+1}}:{{relations.relationship}}</li>
                            <li>姓名:{{relations.name}}</li>
                            <li>身份证号:{{relations.IDNo}}</li>
                        </div>
                    </ul>
                </div>
                <div class="tab2Contnet" v-show="tab2">
                    <img src="../../../static/img/salesman/hTab_02.png" alt="">
                    <ul class="rightHealthRecContent">
                        <li>身高:{{record.height}}cm</li>
                        <li>体重:{{record.weight}}kg</li>
                        <li>定期健康体检的习惯:{{record.regularTest}}</li>
                        <li>近五年居住的区域:{{record.recentResidence}}</li>
                    </ul>
                    <ul class="sickListBox">
                        <li >
                            <h4>01、心脑血管疾病类</h4>
                            <div class="sickLists clearfix" v-if="!record.cardioCerebrovascular||!record.cardioCerebrovascular.length">
                                <span class="fl">无</span>
                            </div>
                            <div class="sickLists clearfix" v-for="item in record.cardioCerebrovascular">
                                <span class="fl">{{item}}</span>
                            </div>
                        </li>
                        <li >
                            <h4>02、消化系统疾病类</h4>
                            <div class="sickLists clearfix" v-if="!record.digestiveSystem||!record.digestiveSystem.length">
                                <span class="fl">无</span>
                            </div>
                            <div class="sickLists clearfix" v-for="item in record.digestiveSystem">
                                <span class="fl">{{item}}</span>
                            </div>
                        </li>
                        <li >
                            <h4>03、呼吸系统疾病类</h4>
                            <div class="sickLists clearfix" v-if="!record.respiratorySystem||!record.respiratorySystem.length">
                                <span class="fl">无</span>
                            </div>
                            <div class="sickLists clearfix" v-for="item in record.respiratorySystem">
                                <span class="fl">{{item}}</span>
                            </div>
                        </li>
                        <li >
                            <h4>04、内分泌系统疾病类</h4>
                            <div class="sickLists clearfix" v-if="!record.endocrine||!record.endocrine.length">
                                <span class="fl">无</span>
                            </div>
                            <div class="sickLists clearfix" v-for="item in record.endocrine">
                                <span class="fl">{{item}}</span>
                            </div>
                        </li>
                        <li >
                            <h4>05、妇科疾病类</h4>
                            <div class="sickLists clearfix" v-if="!record.gynaecopathia||!record.gynaecopathia.length">
                                <span class="fl">无</span>
                            </div>
                            <div class="sickLists clearfix" v-for="item in record.gynaecopathia">
                                <span class="fl">{{item}}</span>
                            </div>
                        </li>
                        <li >
                            <h4>06、肿瘤疾病类</h4>
                            <div class="sickLists clearfix" v-if="!record.tumour||!record.tumour.length">
                                <span class="fl">无</span>
                            </div>
                            <div class="sickLists clearfix" v-for="item in record.tumour">
                                <span class="fl">{{item}}</span>
                            </div>
                        </li>
                        <li >
                            <h4>07、其他疾病</h4>
                            <div class="sickLists clearfix" v-if="!record.otherDiseases">
                                <span class="fl">无</span>
                            </div>
                            <div v-else class="sickLists clearfix">
                                <span class="fl">{{record.otherDiseases}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="tab3Contnet" v-show="tab3">
                    <img src="../../../static/img/salesman/hTab_03.png" alt="">
                    <div class="rightHealthRecContent3">
                        <div class="rightHealthRecContent3Title">父母、兄弟姐妹、子女患有下列疾病：</div>
                        <ul v-for="item in record.familyDiseases">
                            <li>{{item}}</li>
                        </ul>
                        <ul v-if="!record.familyDiseases||!record.familyDiseases.length">
                            <li>无</li>
                        </ul>
                    </div>

                </div>
                <div class="tab4Contnet" v-show="tab4">
                    <img src="../../../static/img/salesman/hTab_04.png" alt="">
                    <ul class="rightHealthRecContent">
                        <li>健康状况:{{record.health}}</li>
                        <li>过去一段时间疲劳程度:{{record.fatigue}}</li>
                        <li>一段时间睡眠时间:{{record.sleep}}</li>
                        <li>熬夜情况:{{record.stayUpLate}}</li>
                        <li>同一年前相比体重情况:{{record.weightChange}}</li>
                        <li>近期是否试图减过体重:{{record.reduceWeight}}</li>
                        <li>吸烟情况:{{record.smokeYear}}</li>
                        <li>每天的吸烟数量:{{record.smokeOneDay}}</li>
                        <li>饮酒年限:{{record.drinkYear}}</li>
                        <li>每天饮酒量:{{record.drinkOneDay}}</li>
                        <li>经常进行锻炼:{{record.exerciseFrequency}}</li>
                        <li>平均每次锻炼时间多少分钟:{{record.exerciseTimeOnce}}</li>
                    </ul>
                </div>
                <div class="tab5Contnet" v-show="tab5">
                    <img src="../../../static/img/salesman/hTab_05.png" alt="">
                    <div class="rightHealthRecContent5">
                        <div class="rightHealthRecContent5Title">个人其他健康情况说明：</div>
                        <div class="addNote">
                            <div class="noNote" v-if="!record.other">未做任何声明！</div>
                            <div class="noteContent" v-else>
                               {{record.other}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>
<script>
    import headerpart from '../company/wechat/headerpart';
    import Vue from 'vue'
    import axios from 'axios'
    import {mapState,mapMutations} from 'vuex'
    import api from '../../util/api'
    export default {
        data(){
            return {
                record:{},
                createTime:"",
                imgaddr0: "/static/img/return.png",
                title0:"健康档案详情",
                isHasNoteContent:true,
                tab1:true,
                tab2:false,
                tab3:false,
                tab4:false,
                tab5:false,
                active:'active',
                addBorderss:'addBorders',
                addBorderss2:'addBorders',
                addClass_:'',
                addClass2_:'',
                personalDataLists:
                    {
                        idNo:'IY762X89023',
                        time:'2017/08/30',
                        name:'李朝晖',
                        age:'30',
                        id_:'32016519615*******5',
                        phone:'13020203948',
                        address:'江苏省/南京市/江宁区',
                        addressDetail:'静淮街18号902室',
                        height:'178',
                        weight:'74',
                        relationShip:[
                            {
                            relation:'配偶',
                            relName:'陈欣',
                            relId:'32016523562******9',
                             },
                            {
                                relation:'配偶',
                                relName:'陈欣',
                                relId:'32016523562******9',
                            }
                        ],
                    },
                personalMedicalMsgs:
                    {
                        sickSort:[{
                            sort:'心血管',
                            name:[
                                '高血压症',
                                '心悸',
                                '胸闷不适',
                                '头晕'
                            ]
                        }],
                        examination:'否',
                        liveCiry:'城市',
                        healthState:'一般',
                        fatigueDegree:'稍微疲劳',
                        sleepTime:'6~8',
                        isStayUp:'很少',
                        weightState:'基本不变',
                        isSmoke:'无',
                        smokeNum:'无',
                        dringTime:'1~3',
                        dringMum:'二两以内',
                        exerciseTimes:'每周1~2',
                        exerciseTime:'20~40',
                        note:'',
                        relativeHasMedical:[
                           '高血压',
                            '糖尿病',
                            '肥胖',
                            '乳腺癌',
                        ]
                    },
            }
        },

        methods:{

            tabBtn1(){
                this.tab1=true;
                this.tab2=false;
                this.tab3=false;
                this.tab4=false;
                this.tab5=false;
                this.active='active';
                this.addClass_='';
                this.addClass2_='';
                this.addBorderss='addBorders';
                this.addBorderss2='addBorders';
            },
            tabBtn2(){
                this.tab1=false;
                this.tab2=true;
                this.tab3=false;
                this.tab4=false;
                this.tab5=false;
                this.active='';
                this.addClass_='active';
                this.addClass2_='';
                this.addBorderss='addBorders';
                this.addBorderss2='addBorders';
            },
            tabBtn3(){
                this.tab1=false;
                this.tab2=false;
                this.tab3=true;
                this.tab4=false;
                this.tab5=false;
                this.active='addBotBorder';
                this.addClass_='';
                this.addClass2_='';
                this.addBorderss='active';
                this.addBorderss2='addBorders';
            },
            tabBtn4(){
                this.tab1=false;
                this.tab2=false;
                this.tab3=false;
                this.tab4=true;
                this.tab5=false;
                this.active='addBotBorder';
                this.addClass_='';
                this.addClass2_='active';
                this.addBorderss='addBorders';
                this.addBorderss2='addBorders';
            },
            tabBtn5(){
                this.tab1=false;
                this.tab2=false;
                this.tab3=false;
                this.tab4=false;
                this.tab5=true;
                this.active='addBotBorder';
                this.addClass_='';
                this.addClass2_='';
                this.addBorderss='addBorders';
                this.addBorderss2='active';

            },
            init(){
                var vm = this;
                console.log(vm.userId);
                axios.get("/wechat/healthRecord/queryInfo",
                    {params:{
                        userId:vm.userId
                    }}).then(function (response) {
                        console.log(response)
                    vm.record = response.data.record;
                    vm.createTime = response.data.cteateTime;
                })
            },
        },
        mounted:function(){

        },
        created:function(){
            let UrlSearch = new api.UrlSearch();
            this.userId = UrlSearch.userId;
            this.init();
        },
        components:{
            headerpart,
        }
    }
</script>
<style>
    .addBlank{
        width:100%;
        height: 2.22rem;
    }
    .leftTabs{
        width:5.35rem;
        overflow: hidden;
    }
    .leftTabs li{
        width:100%;
        height:3rem;
        padding:0 0.1rem;
    }
    .leftTabs li a{
        box-sizing: border-box;
        display: block;
        width:5rem;
        height:100%;
        color:#3b3b3b;
        background: #fff;
        font-size:0.75rem;
        text-align: center;
        line-height: 3rem;

    }
    .leftTabs li a.addBorders{
        border-top:1px solid #dcdcdc;
        border-bottom:1px solid #dcdcdc;
    }
    .leftTabs li a.addBotBorder{
        border-bottom:1px solid #dcdcdc;
    }
    .leftTabs li a.active{
        color:#338fff;
        background: #ebebeb;
    }
    .tabContnet{
        margin-left:0.25rem;
    }
    .addBlank2{
        height: 12.2rem;
        width:5.05rem;
        background: #fff;
        margin-left:1px;
    }
    .tabContnet img{
        width: 12.9rem;
        height: 5.1rem;
        margin-bottom:0.4rem;
    }
    .tab1Contnet,.tab2Contnet,.tab4Contnet{
        height: 27.2rem;
        overflow-y: scroll;
    }
    .rightHealthRecContent{
        width:100%;
        background: #fff;
    }
    .rightHealthRecContent li{
        padding:0.45rem 0;
        margin-left:0.7rem;
    }
    .sickListBox{
        width: 12.9rem;
    }
    .sickListBox li{
        background: #fff;
        margin-top:0.1rem;
        padding:0.375rem 0 0 0.65rem;
    }
    .sickListBox li h4{
        color:#3b3b3b;
        padding-bottom:0.5rem;
    }
    .sickListBox li span{
        margin-right:1.05rem;
        line-height: 1.6rem;
        color:#cd3f3f;
    }
    .rightHealthRecContent3{
        background: #fff;
    }
    .rightHealthRecContent3 li{
        color:#cd3f3f;
        padding:0.5rem 0 0.5rem 0.7rem;
    }
    .rightHealthRecContent3Title,.rightHealthRecContent5Title{
          padding:0.5rem 0 0.5rem 0.7rem;
      }
    .tab5Contnet{
        width:12.9rem;
    }
    .rightHealthRecContent5{
        width:12.9rem;
        height:10.8rem;
        background: #fff;
    }
    .addNote{
        padding:0.5rem 0 0 0.7rem;
    }
    .noNote{
        color:#7a7a7a;
    }
    .noteContent{
        width:100%;
        line-height: 1rem;
    }
</style>
