webpackJsonp([55],{133:function(e,t,i){i(616);var a=i(22)(i(477),i(714),null,null);e.exports=a.exports},155:function(e,t,i){i(158);var a=i(22)(i(156),i(159),null,null);e.exports=a.exports},156:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{}},props:["imgaddr","title","edit"],methods:{goback:function(){this.$router.go(-1)},onMyClicking:function(){this.$emit("onMyClicking"),console.log("onmy Clicking")}}}},157:function(e,t,i){t=e.exports=i(70)(!0),t.push([e.i,"input::-webkit-input-placeholder{text-align:right}header{position:fixed;width:100%;left:0;top:0;z-index:200}header,header ul{height:2.2rem;background:#338fff}header ul li{height:100%;width:33.3%}header .loginFont{text-align:center}header .mianTitle{color:#fff;font-size:.8rem;line-height:2.2rem;width:100%;text-align:center}header .home a{display:block;height:2.2rem;width:1.7rem}header .home .backBtn{height:2.2rem;width:1.7rem;margin:0 0 0 1rem}header .home img{height:1.2rem;width:1.4rem;margin:.5rem 0 0}header .pre img{height:1.2rem;width:1.4rem;margin:.5rem 0 0 1.1rem}header .loginFont{color:#fff;font-size:.75rem;line-height:2.2rem}header .reg span{display:block;height:100%;width:100%;text-indent:4rem;font-size:.7rem;line-height:2.2rem;color:#fff}.companyName{color:#338fff;height:1.65rem;font-size:.7rem;line-height:1.65rem;text-indent:.75rem;background:#ecebeb}.companyName .mention{color:#cd3939;background:#ecebeb;padding-left:.45rem}","",{version:3,sources:["F:/snv3/wechat/hwasonvue/src/components/company/wechat/headerpart.vue"],names:[],mappings:"AACA,iCACE,gBAAkB,CACnB,AACD,OACE,eAAe,AACf,WAAW,AACX,OAAO,AACP,MAAM,AACN,WAAa,CACd,AACD,iBACE,cAAe,AACf,kBAAmB,CACpB,AACD,aACE,YAAa,AACb,WAAY,CACb,AACD,kBACE,iBAAmB,CAEpB,AACD,kBACE,WAAW,AACX,gBAAkB,AAClB,mBAAoB,AACpB,WAAW,AACX,iBAAmB,CACpB,AACD,eACE,cAAe,AACf,cAAe,AACf,YAAc,CACf,AACD,sBACE,cAAe,AACf,aAAc,AACd,iBAAkB,CACnB,AACD,iBACE,cAAc,AACd,aAAa,AACb,gBAAoB,CACrB,AACD,gBAGE,cAAc,AACd,aAAa,AACb,uBAAyB,CAC1B,AACD,kBACE,WAAW,AACX,iBAAmB,AACnB,kBAAoB,CACrB,AACD,iBACE,cAAe,AACf,YAAa,AACb,WAAY,AACZ,iBAAkB,AAClB,gBAAiB,AACjB,mBAAoB,AACpB,UAAW,CACZ,AACD,aACE,cAAc,AACd,eAAe,AACf,gBAAiB,AACjB,oBAAqB,AACrB,mBAAoB,AACpB,kBAAoB,CACrB,AACD,sBACE,cAAc,AACd,mBAAoB,AACpB,mBAAqB,CACtB",file:"headerpart.vue",sourcesContent:["\ninput::-webkit-input-placeholder{\n  text-align: right;\n}\nheader{\n  position:fixed;\n  width:100%;\n  left:0;\n  top:0;\n  z-index: 200;\n}\nheader,header ul{\n  height: 2.2rem;\n  background:#338fff;\n}\nheader ul li{\n  height: 100%;\n  width:33.3%;\n}\nheader .loginFont{\n  text-align: center;\n  line-height: 2.2rem;\n}\nheader .mianTitle{\n  color:#fff;\n  font-size: 0.8rem;\n  line-height: 2.2rem;\n  width:100%;\n  text-align: center;\n}\nheader .home a{\n  display: block;\n  height: 2.2rem;\n  width: 1.7rem;\n}\nheader .home .backBtn{\n  height: 2.2rem;\n  width: 1.7rem;\n  margin:0 0 0 1rem;\n}\nheader .home img{\n  height:1.2rem;\n  width:1.4rem;\n  margin:0.5rem 0 0 0;\n}\nheader .pre img{\n  /*height:1rem;\n  width:0.6rem;*/\n  height:1.2rem;\n  width:1.4rem;\n  margin:0.5rem 0 0 1.1rem;\n}\nheader .loginFont{\n  color:#fff;\n  font-size: 0.75rem;\n  line-height: 2.2rem;\n}\nheader .reg span{\n  display: block;\n  height: 100%;\n  width: 100%;\n  text-indent: 4rem;\n  font-size:0.7rem;\n  line-height: 2.2rem;\n  color:#fff;\n}\n.companyName{\n  color:#338fff;\n  height:1.65rem;\n  font-size:0.7rem;\n  line-height: 1.65rem;\n  text-indent:0.75rem;\n  background:#ecebeb ;\n}\n.companyName .mention{\n  color:#cd3939;\n  background: #ecebeb;\n  padding-left:0.45rem;\n}\n\n"],sourceRoot:""}])},158:function(e,t,i){var a=i(157);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);i(71)("eb008df4",a,!0)},159:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("header",[i("ul",{staticClass:"clearfix"},[i("li",{staticClass:"fl home"},[i("div",{staticClass:"backBtn",on:{click:e.goback}},[i("img",{attrs:{src:e.imgaddr,alt:"加载失败"}})])]),e._v(" "),i("li",{staticClass:"fl loginFont"},[e._v(e._s(e.title))]),e._v(" "),i("li",{staticClass:"fr reg"},[i("span",{on:{click:e.onMyClicking}},[e._v(e._s(e.edit))])])])])},staticRenderFns:[]}},196:function(e,t,i){"use strict";e.exports={UrlSearch:function(){var e,t,i=location.href,a=i.indexOf("?");i=i.substr(a+1);for(var r=i.split("&"),n=0;n<r.length;n++)(a=r[n].indexOf("="))>0&&(e=r[n].substring(0,a),t=r[n].substr(a+1),this[e]=t)},setCookie:function(e,t){var i=new Date;i.setTime(i.getTime()+2592e6),document.cookie=e+"="+escape(t)+";expires="+i.toGMTString()},getCookie:function(e){var t,i=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(i))?unescape(t[2]):null},dateFormat:function(e,t){var i=e.getFullYear(),a=e.getMonth()+1;a=a<10?"0"+a:a;var r=e.getDate();r=r<10?"0"+r:r;var n=e.getHours();n=n<10?"0"+n:n;var s=e.getMinutes();return s=s<10?"0"+s:s,1==t?i+"-"+a+"-"+r+" "+n+":"+s:2==t?i+"-"+a+"-"+r:i+"年"+a+"月"+r},getProjectsNum:function(e){if("PD-A"==e)return 2;if("PD-B"==e||"PD-C"==e)return 5;if("PD-D"==e)return 14;var t=0,i=0;if("string"==typeof e)for(var a=0;a<e.length;a++)if(e.charAt(a)>="0"&&e.charAt(a)<="9"){if(t=a,e.charAt(a+1)>="0"&&e.charAt(a+1)<="9"){i=a+1;break}i=0;break}return 0==i?parseInt(e.charAt(t)):parseInt(e.substring(t,i+1))},getDate:function(e){var t=parseInt(e.substr(0,4)),i=parseInt(e.substr(5,2))-1,a=parseInt(e.substr(-2));return new Date(t,i,a)},getDate2:function(e){var t=parseInt(e.substr(0,4)),i=parseInt(e.substr(5,2))-1,a=parseInt(e.substr(-2))+1;return new Date(t,i,a)}}},477:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=i(155),n=a(r),s=i(1),o=(a(s),i(7)),c=a(o),d=(i(25),i(196)),A=a(d);t.default={data:function(){return{record:{},createTime:"",imgaddr0:"/static/img/return.png",title0:"健康档案详情",isHasNoteContent:!0,tab1:!0,tab2:!1,tab3:!1,tab4:!1,tab5:!1,active:"active",addBorderss:"addBorders",addBorderss2:"addBorders",addClass_:"",addClass2_:"",personalDataLists:{idNo:"IY762X89023",time:"2017/08/30",name:"李朝晖",age:"30",id_:"32016519615*******5",phone:"13020203948",address:"江苏省/南京市/江宁区",addressDetail:"静淮街18号902室",height:"178",weight:"74",relationShip:[{relation:"配偶",relName:"陈欣",relId:"32016523562******9"},{relation:"配偶",relName:"陈欣",relId:"32016523562******9"}]},personalMedicalMsgs:{sickSort:[{sort:"心血管",name:["高血压症","心悸","胸闷不适","头晕"]}],examination:"否",liveCiry:"城市",healthState:"一般",fatigueDegree:"稍微疲劳",sleepTime:"6~8",isStayUp:"很少",weightState:"基本不变",isSmoke:"无",smokeNum:"无",dringTime:"1~3",dringMum:"二两以内",exerciseTimes:"每周1~2",exerciseTime:"20~40",note:"",relativeHasMedical:["高血压","糖尿病","肥胖","乳腺癌"]}}},methods:{tabBtn1:function(){this.tab1=!0,this.tab2=!1,this.tab3=!1,this.tab4=!1,this.tab5=!1,this.active="active",this.addClass_="",this.addClass2_="",this.addBorderss="addBorders",this.addBorderss2="addBorders"},tabBtn2:function(){this.tab1=!1,this.tab2=!0,this.tab3=!1,this.tab4=!1,this.tab5=!1,this.active="",this.addClass_="active",this.addClass2_="",this.addBorderss="addBorders",this.addBorderss2="addBorders"},tabBtn3:function(){this.tab1=!1,this.tab2=!1,this.tab3=!0,this.tab4=!1,this.tab5=!1,this.active="addBotBorder",this.addClass_="",this.addClass2_="",this.addBorderss="active",this.addBorderss2="addBorders"},tabBtn4:function(){this.tab1=!1,this.tab2=!1,this.tab3=!1,this.tab4=!0,this.tab5=!1,this.active="addBotBorder",this.addClass_="",this.addClass2_="active",this.addBorderss="addBorders",this.addBorderss2="addBorders"},tabBtn5:function(){this.tab1=!1,this.tab2=!1,this.tab3=!1,this.tab4=!1,this.tab5=!0,this.active="addBotBorder",this.addClass_="",this.addClass2_="",this.addBorderss="addBorders",this.addBorderss2="active"},init:function(){var e=this;console.log(e.userId),c.default.get("/wechat/healthRecord/queryInfo",{params:{userId:e.userId}}).then(function(t){console.log(t),e.record=t.data.record,e.createTime=t.data.cteateTime})}},mounted:function(){},created:function(){var e=new A.default.UrlSearch;this.userId=e.userId,this.init()},components:{headerpart:n.default}}},545:function(e,t,i){t=e.exports=i(70)(!0),t.push([e.i,".addBlank{width:100%;height:2.22rem}.leftTabs{width:5.35rem;overflow:hidden}.leftTabs li{width:100%;height:3rem;padding:0 .1rem}.leftTabs li a{box-sizing:border-box;display:block;width:5rem;height:100%;color:#3b3b3b;background:#fff;font-size:.75rem;text-align:center;line-height:3rem}.leftTabs li a.addBorders{border-top:1px solid #dcdcdc}.leftTabs li a.addBorders,.leftTabs li a.addBotBorder{border-bottom:1px solid #dcdcdc}.leftTabs li a.active{color:#338fff;background:#ebebeb}.tabContnet{margin-left:.25rem}.addBlank2{height:12.2rem;width:5.05rem;background:#fff;margin-left:1px}.tabContnet img{width:12.9rem;height:5.1rem;margin-bottom:.4rem}.tab1Contnet,.tab2Contnet,.tab4Contnet{height:27.2rem;overflow-y:scroll}.rightHealthRecContent{width:100%;background:#fff}.rightHealthRecContent li{padding:.45rem 0;margin-left:.7rem}.sickListBox{width:12.9rem}.sickListBox li{background:#fff;margin-top:.1rem;padding:.375rem 0 0 .65rem}.sickListBox li h4{color:#3b3b3b;padding-bottom:.5rem}.sickListBox li span{margin-right:1.05rem;line-height:1.6rem;color:#cd3f3f}.rightHealthRecContent3{background:#fff}.rightHealthRecContent3 li{color:#cd3f3f}.rightHealthRecContent3 li,.rightHealthRecContent3Title,.rightHealthRecContent5Title{padding:.5rem 0 .5rem .7rem}.tab5Contnet{width:12.9rem}.rightHealthRecContent5{width:12.9rem;height:10.8rem;background:#fff}.addNote{padding:.5rem 0 0 .7rem}.noNote{color:#7a7a7a}.noteContent{width:100%;line-height:1rem}","",{version:3,sources:["F:/snv3/wechat/hwasonvue/src/components/salesman/healthRecDetail.vue"],names:[],mappings:"AACA,UACI,WAAW,AACX,cAAgB,CACnB,AACD,UACI,cAAc,AACd,eAAiB,CACpB,AACD,aACI,WAAW,AACX,YAAY,AACZ,eAAiB,CACpB,AACD,eACI,sBAAuB,AACvB,cAAe,AACf,WAAW,AACX,YAAY,AACZ,cAAc,AACd,gBAAiB,AACjB,iBAAkB,AAClB,kBAAmB,AACnB,gBAAkB,CACrB,AACD,0BACI,4BAA6B,CAEhC,AACD,sDAFI,+BAAgC,CAInC,AACD,sBACI,cAAc,AACd,kBAAoB,CACvB,AACD,YACI,kBAAoB,CACvB,AACD,WACI,eAAgB,AAChB,cAAc,AACd,gBAAiB,AACjB,eAAgB,CACnB,AACD,gBACI,cAAe,AACf,cAAe,AACf,mBAAqB,CACxB,AACD,uCACI,eAAgB,AAChB,iBAAmB,CACtB,AACD,uBACI,WAAW,AACX,eAAiB,CACpB,AACD,0BACI,iBAAkB,AAClB,iBAAmB,CACtB,AACD,aACI,aAAe,CAClB,AACD,gBACI,gBAAiB,AACjB,iBAAkB,AAClB,0BAA6B,CAChC,AACD,mBACI,cAAc,AACd,oBAAsB,CACzB,AACD,qBACI,qBAAqB,AACrB,mBAAoB,AACpB,aAAc,CACjB,AACD,wBACI,eAAiB,CACpB,AACD,2BACI,aAAc,CAEjB,AACD,qFAFI,2BAA+B,CAIlC,AACD,aACI,aAAc,CACjB,AACD,wBACI,cAAc,AACd,eAAe,AACf,eAAiB,CACpB,AACD,SACI,uBAA0B,CAC7B,AACD,QACI,aAAc,CACjB,AACD,aACI,WAAW,AACX,gBAAkB,CACrB",file:"healthRecDetail.vue",sourcesContent:["\n.addBlank{\n    width:100%;\n    height: 2.22rem;\n}\n.leftTabs{\n    width:5.35rem;\n    overflow: hidden;\n}\n.leftTabs li{\n    width:100%;\n    height:3rem;\n    padding:0 0.1rem;\n}\n.leftTabs li a{\n    box-sizing: border-box;\n    display: block;\n    width:5rem;\n    height:100%;\n    color:#3b3b3b;\n    background: #fff;\n    font-size:0.75rem;\n    text-align: center;\n    line-height: 3rem;\n}\n.leftTabs li a.addBorders{\n    border-top:1px solid #dcdcdc;\n    border-bottom:1px solid #dcdcdc;\n}\n.leftTabs li a.addBotBorder{\n    border-bottom:1px solid #dcdcdc;\n}\n.leftTabs li a.active{\n    color:#338fff;\n    background: #ebebeb;\n}\n.tabContnet{\n    margin-left:0.25rem;\n}\n.addBlank2{\n    height: 12.2rem;\n    width:5.05rem;\n    background: #fff;\n    margin-left:1px;\n}\n.tabContnet img{\n    width: 12.9rem;\n    height: 5.1rem;\n    margin-bottom:0.4rem;\n}\n.tab1Contnet,.tab2Contnet,.tab4Contnet{\n    height: 27.2rem;\n    overflow-y: scroll;\n}\n.rightHealthRecContent{\n    width:100%;\n    background: #fff;\n}\n.rightHealthRecContent li{\n    padding:0.45rem 0;\n    margin-left:0.7rem;\n}\n.sickListBox{\n    width: 12.9rem;\n}\n.sickListBox li{\n    background: #fff;\n    margin-top:0.1rem;\n    padding:0.375rem 0 0 0.65rem;\n}\n.sickListBox li h4{\n    color:#3b3b3b;\n    padding-bottom:0.5rem;\n}\n.sickListBox li span{\n    margin-right:1.05rem;\n    line-height: 1.6rem;\n    color:#cd3f3f;\n}\n.rightHealthRecContent3{\n    background: #fff;\n}\n.rightHealthRecContent3 li{\n    color:#cd3f3f;\n    padding:0.5rem 0 0.5rem 0.7rem;\n}\n.rightHealthRecContent3Title,.rightHealthRecContent5Title{\n      padding:0.5rem 0 0.5rem 0.7rem;\n}\n.tab5Contnet{\n    width:12.9rem;\n}\n.rightHealthRecContent5{\n    width:12.9rem;\n    height:10.8rem;\n    background: #fff;\n}\n.addNote{\n    padding:0.5rem 0 0 0.7rem;\n}\n.noNote{\n    color:#7a7a7a;\n}\n.noteContent{\n    width:100%;\n    line-height: 1rem;\n}\n"],sourceRoot:""}])},616:function(e,t,i){var a=i(545);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);i(71)("2f2dea46",a,!0)},645:function(e,t,i){e.exports=i.p+"static/img/hTab_01.1f9b59c.png"},646:function(e,t,i){e.exports=i.p+"static/img/hTab_02.481affd.png"},647:function(e,t,i){e.exports=i.p+"static/img/hTab_03.9f7e6c8.png"},648:function(e,t,i){e.exports=i.p+"static/img/hTab_04.4061f94.png"},649:function(e,t,i){e.exports=i.p+"static/img/hTab_05.9dc006b.png"},714:function(e,t,i){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"wrap"},[a("headerpart",{attrs:{imgaddr:e.imgaddr0,title:e.title0}}),e._v(" "),a("div",{staticClass:"addBlank"}),e._v(" "),a("section",{staticClass:"clearfix"},[a("div",{staticClass:"leftTabs fl"},[a("ul",[a("li",[a("a",{class:e.active,attrs:{href:"javascript:;"},on:{click:e.tabBtn1}},[e._v("基本信息")])]),e._v(" "),a("li",[a("a",{class:e.addClass_,attrs:{href:"javascript:;"},on:{click:e.tabBtn2}},[e._v("个人疾病史")])]),e._v(" "),a("li",[a("a",{class:e.addBorderss,attrs:{href:"javascript:;"},on:{click:e.tabBtn3}},[e._v("家族史")])]),e._v(" "),a("li",[a("a",{class:e.addClass2_,attrs:{href:"javascript:;"},on:{click:e.tabBtn4}},[e._v("个人健康状况")])]),e._v(" "),a("li",[a("a",{class:e.addBorderss2,attrs:{href:"javascript:;"},on:{click:e.tabBtn5}},[e._v("其他健康说明")])])]),e._v(" "),a("div",{staticClass:"addBlank2"})]),e._v(" "),a("div",{staticClass:"fl tabContnet"},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.tab1,expression:"tab1"}],staticClass:"tab1Contnet"},[a("img",{attrs:{src:i(645),alt:""}}),e._v(" "),a("ul",{staticClass:"rightHealthRecContent"},[a("li",[e._v("健康卡号:"+e._s(e.record.cardNo))]),e._v(" "),a("li",[e._v("建档日期:"+e._s(e.createTime))]),e._v(" "),a("li",[e._v("姓名:"+e._s(e.record.name))]),e._v(" "),a("li",[e._v("年龄:"+e._s(e.record.age)+"岁")]),e._v(" "),a("li",[e._v("身份证:"+e._s(e.record.IDNo))]),e._v(" "),a("li",[e._v("电话:"+e._s(e.record.tel))]),e._v(" "),a("li",[e._v("居住地:"+e._s(e.record.region))]),e._v(" "),a("li",[e._v("详细地址:"+e._s(e.record.address))]),e._v(" "),e._l(e.record.relatives,function(t,i){return a("div",[a("li",[e._v("关系人"+e._s(i+1)+":"+e._s(t.relationship))]),e._v(" "),a("li",[e._v("姓名:"+e._s(t.name))]),e._v(" "),a("li",[e._v("身份证号:"+e._s(t.IDNo))])])})],2)]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.tab2,expression:"tab2"}],staticClass:"tab2Contnet"},[a("img",{attrs:{src:i(646),alt:""}}),e._v(" "),a("ul",{staticClass:"rightHealthRecContent"},[a("li",[e._v("身高:"+e._s(e.record.height)+"cm")]),e._v(" "),a("li",[e._v("体重:"+e._s(e.record.weight)+"kg")]),e._v(" "),a("li",[e._v("定期健康体检的习惯:"+e._s(e.record.regularTest))]),e._v(" "),a("li",[e._v("近五年居住的区域:"+e._s(e.record.recentResidence))])]),e._v(" "),a("ul",{staticClass:"sickListBox"},[a("li",[a("h4",[e._v("01、心脑血管疾病类")]),e._v(" "),e.record.cardioCerebrovascular&&e.record.cardioCerebrovascular.length?e._e():a("div",{staticClass:"sickLists clearfix"},[a("span",{staticClass:"fl"},[e._v("无")])]),e._v(" "),e._l(e.record.cardioCerebrovascular,function(t){return a("div",{staticClass:"sickLists clearfix"},[a("span",{staticClass:"fl"},[e._v(e._s(t))])])})],2),e._v(" "),a("li",[a("h4",[e._v("02、消化系统疾病类")]),e._v(" "),e.record.digestiveSystem&&e.record.digestiveSystem.length?e._e():a("div",{staticClass:"sickLists clearfix"},[a("span",{staticClass:"fl"},[e._v("无")])]),e._v(" "),e._l(e.record.digestiveSystem,function(t){return a("div",{staticClass:"sickLists clearfix"},[a("span",{staticClass:"fl"},[e._v(e._s(t))])])})],2),e._v(" "),a("li",[a("h4",[e._v("03、呼吸系统疾病类")]),e._v(" "),e.record.respiratorySystem&&e.record.respiratorySystem.length?e._e():a("div",{staticClass:"sickLists clearfix"},[a("span",{staticClass:"fl"},[e._v("无")])]),e._v(" "),e._l(e.record.respiratorySystem,function(t){return a("div",{staticClass:"sickLists clearfix"},[a("span",{staticClass:"fl"},[e._v(e._s(t))])])})],2),e._v(" "),a("li",[a("h4",[e._v("04、内分泌系统疾病类")]),e._v(" "),e.record.endocrine&&e.record.endocrine.length?e._e():a("div",{staticClass:"sickLists clearfix"},[a("span",{staticClass:"fl"},[e._v("无")])]),e._v(" "),e._l(e.record.endocrine,function(t){return a("div",{staticClass:"sickLists clearfix"},[a("span",{staticClass:"fl"},[e._v(e._s(t))])])})],2),e._v(" "),a("li",[a("h4",[e._v("05、妇科疾病类")]),e._v(" "),e.record.gynaecopathia&&e.record.gynaecopathia.length?e._e():a("div",{staticClass:"sickLists clearfix"},[a("span",{staticClass:"fl"},[e._v("无")])]),e._v(" "),e._l(e.record.gynaecopathia,function(t){return a("div",{staticClass:"sickLists clearfix"},[a("span",{staticClass:"fl"},[e._v(e._s(t))])])})],2),e._v(" "),a("li",[a("h4",[e._v("06、肿瘤疾病类")]),e._v(" "),e.record.tumour&&e.record.tumour.length?e._e():a("div",{staticClass:"sickLists clearfix"},[a("span",{staticClass:"fl"},[e._v("无")])]),e._v(" "),e._l(e.record.tumour,function(t){return a("div",{staticClass:"sickLists clearfix"},[a("span",{staticClass:"fl"},[e._v(e._s(t))])])})],2),e._v(" "),a("li",[a("h4",[e._v("07、其他疾病")]),e._v(" "),e.record.otherDiseases?a("div",{staticClass:"sickLists clearfix"},[a("span",{staticClass:"fl"},[e._v(e._s(e.record.otherDiseases))])]):a("div",{staticClass:"sickLists clearfix"},[a("span",{staticClass:"fl"},[e._v("无")])])])])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.tab3,expression:"tab3"}],staticClass:"tab3Contnet"},[a("img",{attrs:{src:i(647),alt:""}}),e._v(" "),a("div",{staticClass:"rightHealthRecContent3"},[a("div",{staticClass:"rightHealthRecContent3Title"},[e._v("父母、兄弟姐妹、子女患有下列疾病：")]),e._v(" "),e._l(e.record.familyDiseases,function(t){return a("ul",[a("li",[e._v(e._s(t))])])}),e._v(" "),e.record.familyDiseases&&e.record.familyDiseases.length?e._e():a("ul",[a("li",[e._v("无")])])],2)]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.tab4,expression:"tab4"}],staticClass:"tab4Contnet"},[a("img",{attrs:{src:i(648),alt:""}}),e._v(" "),a("ul",{staticClass:"rightHealthRecContent"},[a("li",[e._v("健康状况:"+e._s(e.record.health))]),e._v(" "),a("li",[e._v("过去一段时间疲劳程度:"+e._s(e.record.fatigue))]),e._v(" "),a("li",[e._v("一段时间睡眠时间:"+e._s(e.record.sleep))]),e._v(" "),a("li",[e._v("熬夜情况:"+e._s(e.record.stayUpLate))]),e._v(" "),a("li",[e._v("同一年前相比体重情况:"+e._s(e.record.weightChange))]),e._v(" "),a("li",[e._v("近期是否试图减过体重:"+e._s(e.record.reduceWeight))]),e._v(" "),a("li",[e._v("吸烟情况:"+e._s(e.record.smokeYear))]),e._v(" "),a("li",[e._v("每天的吸烟数量:"+e._s(e.record.smokeOneDay))]),e._v(" "),a("li",[e._v("饮酒年限:"+e._s(e.record.drinkYear))]),e._v(" "),a("li",[e._v("每天饮酒量:"+e._s(e.record.drinkOneDay))]),e._v(" "),a("li",[e._v("经常进行锻炼:"+e._s(e.record.exerciseFrequency))]),e._v(" "),a("li",[e._v("平均每次锻炼时间多少分钟:"+e._s(e.record.exerciseTimeOnce))])])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.tab5,expression:"tab5"}],staticClass:"tab5Contnet"},[a("img",{attrs:{src:i(649),alt:""}}),e._v(" "),a("div",{staticClass:"rightHealthRecContent5"},[a("div",{staticClass:"rightHealthRecContent5Title"},[e._v("个人其他健康情况说明：")]),e._v(" "),a("div",{staticClass:"addNote"},[e.record.other?a("div",{staticClass:"noteContent"},[e._v("\n                           "+e._s(e.record.other)+"\n                        ")]):a("div",{staticClass:"noNote"},[e._v("未做任何声明！")])])])])])])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=55.5930e8d70d4769def808.js.map