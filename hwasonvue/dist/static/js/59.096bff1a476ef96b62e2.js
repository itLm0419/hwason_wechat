webpackJsonp([59],{108:function(e,t,a){a(572);var s=a(22)(a(450),a(675),null,null);e.exports=s.exports},155:function(e,t,a){a(158);var s=a(22)(a(156),a(159),null,null);e.exports=s.exports},156:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{}},props:["imgaddr","title","edit"],methods:{goback:function(){this.$router.go(-1)},onMyClicking:function(){this.$emit("onMyClicking"),console.log("onmy Clicking")}}}},157:function(e,t,a){t=e.exports=a(70)(!0),t.push([e.i,"input::-webkit-input-placeholder{text-align:right}header{position:fixed;width:100%;left:0;top:0;z-index:200}header,header ul{height:2.2rem;background:#338fff}header ul li{height:100%;width:33.3%}header .loginFont{text-align:center}header .mianTitle{color:#fff;font-size:.8rem;line-height:2.2rem;width:100%;text-align:center}header .home a{display:block;height:2.2rem;width:1.7rem}header .home .backBtn{height:2.2rem;width:1.7rem;margin:0 0 0 1rem}header .home img{height:1.2rem;width:1.4rem;margin:.5rem 0 0}header .pre img{height:1.2rem;width:1.4rem;margin:.5rem 0 0 1.1rem}header .loginFont{color:#fff;font-size:.75rem;line-height:2.2rem}header .reg span{display:block;height:100%;width:100%;text-indent:4rem;font-size:.7rem;line-height:2.2rem;color:#fff}.companyName{color:#338fff;height:1.65rem;font-size:.7rem;line-height:1.65rem;text-indent:.75rem;background:#ecebeb}.companyName .mention{color:#cd3939;background:#ecebeb;padding-left:.45rem}","",{version:3,sources:["F:/SVN/wechat/hwasonvue/src/components/company/wechat/headerpart.vue"],names:[],mappings:"AACA,iCACE,gBAAkB,CACnB,AACD,OACE,eAAe,AACf,WAAW,AACX,OAAO,AACP,MAAM,AACN,WAAa,CACd,AACD,iBACE,cAAe,AACf,kBAAmB,CACpB,AACD,aACE,YAAa,AACb,WAAY,CACb,AACD,kBACE,iBAAmB,CAEpB,AACD,kBACE,WAAW,AACX,gBAAkB,AAClB,mBAAoB,AACpB,WAAW,AACX,iBAAmB,CACpB,AACD,eACE,cAAe,AACf,cAAe,AACf,YAAc,CACf,AACD,sBACE,cAAe,AACf,aAAc,AACd,iBAAkB,CACnB,AACD,iBACE,cAAc,AACd,aAAa,AACb,gBAAoB,CACrB,AACD,gBAGE,cAAc,AACd,aAAa,AACb,uBAAyB,CAC1B,AACD,kBACE,WAAW,AACX,iBAAmB,AACnB,kBAAoB,CACrB,AACD,iBACE,cAAe,AACf,YAAa,AACb,WAAY,AACZ,iBAAkB,AAClB,gBAAiB,AACjB,mBAAoB,AACpB,UAAW,CACZ,AACD,aACE,cAAc,AACd,eAAe,AACf,gBAAiB,AACjB,oBAAqB,AACrB,mBAAoB,AACpB,kBAAoB,CACrB,AACD,sBACE,cAAc,AACd,mBAAoB,AACpB,mBAAqB,CACtB",file:"headerpart.vue",sourcesContent:["\ninput::-webkit-input-placeholder{\n  text-align: right;\n}\nheader{\n  position:fixed;\n  width:100%;\n  left:0;\n  top:0;\n  z-index: 200;\n}\nheader,header ul{\n  height: 2.2rem;\n  background:#338fff;\n}\nheader ul li{\n  height: 100%;\n  width:33.3%;\n}\nheader .loginFont{\n  text-align: center;\n  line-height: 2.2rem;\n}\nheader .mianTitle{\n  color:#fff;\n  font-size: 0.8rem;\n  line-height: 2.2rem;\n  width:100%;\n  text-align: center;\n}\nheader .home a{\n  display: block;\n  height: 2.2rem;\n  width: 1.7rem;\n}\nheader .home .backBtn{\n  height: 2.2rem;\n  width: 1.7rem;\n  margin:0 0 0 1rem;\n}\nheader .home img{\n  height:1.2rem;\n  width:1.4rem;\n  margin:0.5rem 0 0 0;\n}\nheader .pre img{\n  /*height:1rem;\n  width:0.6rem;*/\n  height:1.2rem;\n  width:1.4rem;\n  margin:0.5rem 0 0 1.1rem;\n}\nheader .loginFont{\n  color:#fff;\n  font-size: 0.75rem;\n  line-height: 2.2rem;\n}\nheader .reg span{\n  display: block;\n  height: 100%;\n  width: 100%;\n  text-indent: 4rem;\n  font-size:0.7rem;\n  line-height: 2.2rem;\n  color:#fff;\n}\n.companyName{\n  color:#338fff;\n  height:1.65rem;\n  font-size:0.7rem;\n  line-height: 1.65rem;\n  text-indent:0.75rem;\n  background:#ecebeb ;\n}\n.companyName .mention{\n  color:#cd3939;\n  background: #ecebeb;\n  padding-left:0.45rem;\n}\n\n"],sourceRoot:""}])},158:function(e,t,a){var s=a(157);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a(71)("eb008df4",s,!0)},159:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("header",[a("ul",{staticClass:"clearfix"},[a("li",{staticClass:"fl home"},[a("div",{staticClass:"backBtn",on:{click:e.goback}},[a("img",{attrs:{src:e.imgaddr,alt:"加载失败"}})])]),e._v(" "),a("li",{staticClass:"fl loginFont"},[e._v(e._s(e.title))]),e._v(" "),a("li",{staticClass:"fr reg"},[a("span",{on:{click:e.onMyClicking}},[e._v(e._s(e.edit))])])])])},staticRenderFns:[]}},195:function(e,t,a){"use strict";e.exports={UrlSearch:function(){var e,t,a=location.href,s=a.indexOf("?");a=a.substr(s+1);for(var i=a.split("&"),n=0;n<i.length;n++)(s=i[n].indexOf("="))>0&&(e=i[n].substring(0,s),t=i[n].substr(s+1),this[e]=t)},setCookie:function(e,t){var a=new Date;a.setTime(a.getTime()+2592e6),document.cookie=e+"="+escape(t)+";expires="+a.toGMTString()},getCookie:function(e){var t,a=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(a))?unescape(t[2]):null},dateFormat:function(e,t){var a=e.getFullYear(),s=e.getMonth()+1;s=s<10?"0"+s:s;var i=e.getDate();i=i<10?"0"+i:i;var n=e.getHours();n=n<10?"0"+n:n;var l=e.getMinutes();return l=l<10?"0"+l:l,1==t?a+"-"+s+"-"+i+" "+n+":"+l:2==t?a+"-"+s+"-"+i:a+"年"+s+"月"+i},getProjectsNum:function(e){if("PD-A"==e)return 2;if("PD-B"==e||"PD-C"==e)return 5;if("PD-D"==e)return 14;var t=0,a=0;if("string"==typeof e)for(var s=0;s<e.length;s++)if(e.charAt(s)>="0"&&e.charAt(s)<="9"){if(t=s,e.charAt(s+1)>="0"&&e.charAt(s+1)<="9"){a=s+1;break}a=0;break}return 0==a?parseInt(e.charAt(t)):parseInt(e.substring(t,a+1))},getDate:function(e){var t=parseInt(e.substr(0,4)),a=parseInt(e.substr(5,2))-1,s=parseInt(e.substr(-2));return new Date(t,a,s)},getDate2:function(e){var t=parseInt(e.substr(0,4)),a=parseInt(e.substr(5,2))-1,s=parseInt(e.substr(-2))+1;return new Date(t,a,s)}}},450:function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(155),n=s(i),l=a(1),r=(s(l),a(7)),o=s(r),c=a(195),d=s(c);t.default={data:function(){return{imgaddr0:"/static/img/return.png",title0:"健康档案问卷",sleep:"",stayUpLate:"",weightChange:"",reduceWeight:"",smokeYear:"",smokeOneDay:""}},mounted:function(){var e=new d.default.UrlSearch;this.userId=e.userId,this.init(),window.scrollTo(0,0)},created:function(){},components:{headerpart:n.default},methods:{init:function(){var e=this;o.default.get("/wechat/healthRecord/queryInfo",{params:{userId:e.userId}}).then(function(t){console.log(t);var a=t.data;e.sleep=a.record.sleep,e.stayUpLate=a.record.stayUpLate,e.weightChange=a.record.weightChange,e.reduceWeight=a.record.reduceWeight,e.smokeYear=a.record.smokeYear,e.smokeOneDay=a.record.smokeOneDay})},next:function(){var e=this;if(!(e.sleep&&e.stayUpLate&&e.weightChange&&e.reduceWeight&&e.smokeYear&&e.smokeOneDay))return this.$messagebox({title:"提示",message:"请填写完整信息"}),!1;o.default.post("/wechat/healthRecord/step9",{params:{sleep:e.sleep,stayUpLate:e.stayUpLate,weightChange:e.weightChange,reduceWeight:e.reduceWeight,smokeYear:e.smokeYear,smokeOneDay:e.smokeOneDay,userId:e.userId}}).then(function(t){"00"==t.data.result&&(window.location.href="#/mediaclHistory7?userId="+e.userId)})}}}},499:function(e,t,a){t=e.exports=a(70)(!0),t.push([e.i,".titleFontStyle{height:1.65rem;line-height:1.65rem;padding-left:.75rem;font-size:.55rem;color:#338fff}.personalMedicalChoice2{width:100%;background:#fff;margin-bottom:.8rem}.medicalTitle2{padding:.3rem .9rem;color:#333;font-size:.7rem;line-height:1.5rem;border-bottom:1px solid #ddd}.medicalTitle2 span,.medicalTitle span{color:#ed3f3f;font-size:.7rem}.healthNextBtn2{width:16.65rem;height:2.25rem;text-align:center;line-height:2.25rem;margin:1rem auto;color:#fff;font-size:1rem;background:#338fff}.personalMedicalChoice2 textarea{outline:none;resize:none;width:90%;border:0;display:block;margin:0 auto;height:6.9rem}.perMedicalBox{padding:0 .9rem}.perMedicalBox label{margin:1rem 1.5rem .5rem 0}.perMedicalBox span{font-size:.7rem}.perMedicalBox input{width:1rem;height:1rem;margin-right:.5rem}","",{version:3,sources:["F:/SVN/wechat/hwasonvue/src/components/healthRecords/mediaclHistory6.vue"],names:[],mappings:"AACA,gBACE,eAAe,AACf,oBAAqB,AACrB,oBAAqB,AACrB,iBAAkB,AAClB,aAAc,CACf,AACD,wBACE,WAAW,AACX,gBAAiB,AACjB,mBAAqB,CACtB,AACD,eACE,oBAAuB,AACvB,WAAW,AACX,gBAAiB,AACjB,mBAAoB,AACpB,4BAA6B,CAC9B,AACD,uCACE,cAAc,AACd,eAAiB,CAClB,AACD,gBACE,eAAe,AACf,eAAe,AACf,kBAAmB,AACnB,oBAAqB,AACrB,iBAAiB,AACjB,WAAW,AACX,eAAe,AACf,kBAAoB,CACrB,AACD,iCACE,aAAc,AACd,YAAa,AACb,UAAU,AACV,SAAS,AACT,cAAe,AACf,cAAc,AACd,aAAc,CACf,AACD,eACE,eAAmB,CACpB,AACD,qBACE,0BAA4B,CAC7B,AACD,oBACE,eAAiB,CAClB,AACD,qBACE,WAAW,AACX,YAAa,AACb,kBAAoB,CACrB",file:"mediaclHistory6.vue",sourcesContent:["\n.titleFontStyle{\n  height:1.65rem;\n  line-height: 1.65rem;\n  padding-left:0.75rem;\n  font-size:0.55rem;\n  color:#338fff;\n}\n.personalMedicalChoice2{\n  width:100%;\n  background: #fff;\n  margin-bottom:0.8rem;\n}\n.medicalTitle2{\n  padding:0.3rem 0.9rem ;\n  color:#333;\n  font-size:0.7rem;\n  line-height: 1.5rem;\n  border-bottom:1px solid #ddd;\n}\n.medicalTitle span,.medicalTitle2 span{\n  color:#ed3f3f;\n  font-size:0.7rem;\n}\n.healthNextBtn2{\n  width:16.65rem;\n  height:2.25rem;\n  text-align: center;\n  line-height: 2.25rem;\n  margin:1rem auto;\n  color:#fff;\n  font-size:1rem;\n  background: #338fff;\n}\n.personalMedicalChoice2 textarea{\n  outline: none;\n  resize: none;\n  width:90%;\n  border:0;\n  display: block;\n  margin:0 auto;\n  height:6.9rem;\n}\n.perMedicalBox{\n  padding:0 0.9rem 0;\n}\n.perMedicalBox label{\n  margin:1rem 1.5rem 0.5rem 0;\n}\n.perMedicalBox span{\n  font-size:0.7rem;\n}\n.perMedicalBox input{\n  width:1rem;\n  height: 1rem;\n  margin-right:0.5rem;\n}\n"],sourceRoot:""}])},572:function(e,t,a){var s=a(499);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a(71)("55193646",s,!0)},675:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"hMian"},[a("headerpart",{attrs:{imgaddr:e.imgaddr0,title:e.title0}}),e._v(" "),a("div",{staticClass:"addBlank"}),e._v(" "),a("div",{staticClass:"titleFontStyle"},[e._v("填写常规问卷")]),e._v(" "),a("div",{staticClass:"personalMedicalChoice2"},[a("div",{staticClass:"medicalTitle2"},[e._v("03、在过去一段时间里，睡眠时间如何:")]),e._v(" "),a("div",{staticClass:"perMedicalBox clearfix"},[a("label",{staticClass:"clearfix fl",attrs:{for:"level3_1"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.sleep,expression:"sleep"}],staticClass:"fl",attrs:{type:"radio",name:"sort2",id:"level3_1",value:"小于6小时"},domProps:{checked:e._q(e.sleep,"小于6小时")},on:{__c:function(t){e.sleep="小于6小时"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("小于6小时")])]),e._v(" "),a("label",{staticClass:"clearfix fl",attrs:{for:"level3_2"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.sleep,expression:"sleep"}],staticClass:"fl",attrs:{type:"radio",name:"sort2",id:"level3_2",value:"6~8小时"},domProps:{checked:e._q(e.sleep,"6~8小时")},on:{__c:function(t){e.sleep="6~8小时"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("6~8小时")])]),e._v(" "),a("label",{staticClass:"clearfix fl",attrs:{for:"level3_3"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.sleep,expression:"sleep"}],staticClass:"fl",attrs:{type:"radio",name:"sort2",id:"level3_3",value:"9~10小时"},domProps:{checked:e._q(e.sleep,"9~10小时")},on:{__c:function(t){e.sleep="9~10小时"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("9~10小时")])]),e._v(" "),a("label",{staticClass:"clearfix fl",attrs:{for:"level3_4"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.sleep,expression:"sleep"}],staticClass:"fl",attrs:{type:"radio",name:"sort2",id:"level3_4",value:"10小时以上"},domProps:{checked:e._q(e.sleep,"10小时以上")},on:{__c:function(t){e.sleep="10小时以上"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("10小时以上")])])])]),e._v(" "),a("div",{staticClass:"personalMedicalChoice2"},[a("div",{staticClass:"medicalTitle2"},[e._v("04、经常熬夜吗?")]),e._v(" "),a("div",{staticClass:"perMedicalBox clearfix"},[a("label",{staticClass:"clearfix fl",attrs:{for:"level4_1"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.stayUpLate,expression:"stayUpLate"}],staticClass:"fl",attrs:{type:"radio",name:"sort3",id:"level4_1",value:"经常"},domProps:{checked:e._q(e.stayUpLate,"经常")},on:{__c:function(t){e.stayUpLate="经常"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("经常")])]),e._v(" "),a("label",{staticClass:"clearfix fl",attrs:{for:"level4_2"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.stayUpLate,expression:"stayUpLate"}],staticClass:"fl",attrs:{type:"radio",name:"sort3",id:"level4_2",value:"偶尔"},domProps:{checked:e._q(e.stayUpLate,"偶尔")},on:{__c:function(t){e.stayUpLate="偶尔"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("偶尔")])]),e._v(" "),a("label",{staticClass:"clearfix fl",attrs:{for:"level4_3"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.stayUpLate,expression:"stayUpLate"}],staticClass:"fl",attrs:{type:"radio",name:"sort3",id:"level4_3",value:"很少"},domProps:{checked:e._q(e.stayUpLate,"很少")},on:{__c:function(t){e.stayUpLate="很少"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("很少")])]),e._v(" "),a("label",{staticClass:"clearfix fl",attrs:{for:"level4_4"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.stayUpLate,expression:"stayUpLate"}],staticClass:"fl",attrs:{type:"radio",name:"sort3",id:"level4_4",value:"无"},domProps:{checked:e._q(e.stayUpLate,"无")},on:{__c:function(t){e.stayUpLate="无"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("无")])])])]),e._v(" "),a("div",{staticClass:"personalMedicalChoice2"},[a("div",{staticClass:"medicalTitle2"},[e._v("05、同一年前相比，您的体重是：")]),e._v(" "),a("div",{staticClass:"perMedicalBox clearfix"},[a("label",{staticClass:"clearfix fl",attrs:{for:"level5_1"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.weightChange,expression:"weightChange"}],staticClass:"fl",attrs:{type:"radio",name:"sort4",id:"level5_1",value:"增加"},domProps:{checked:e._q(e.weightChange,"增加")},on:{__c:function(t){e.weightChange="增加"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("增加")])]),e._v(" "),a("label",{staticClass:"clearfix fl",attrs:{for:"level5_2"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.weightChange,expression:"weightChange"}],staticClass:"fl",attrs:{type:"radio",name:"sort4",id:"level5_2",value:"基本不变"},domProps:{checked:e._q(e.weightChange,"基本不变")},on:{__c:function(t){e.weightChange="基本不变"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("基本不变")])]),e._v(" "),a("label",{staticClass:"clearfix fl",attrs:{for:"level5_3"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.weightChange,expression:"weightChange"}],staticClass:"fl",attrs:{type:"radio",name:"sort4",id:"level5_3",value:"下降"},domProps:{checked:e._q(e.weightChange,"下降")},on:{__c:function(t){e.weightChange="下降"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("下降")])]),e._v(" "),a("label",{staticClass:"clearfix fl",attrs:{for:"level5_4"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.weightChange,expression:"weightChange"}],staticClass:"fl",attrs:{type:"radio",name:"sort4",id:"level5_4",value:"不清楚"},domProps:{checked:e._q(e.weightChange,"不清楚")},on:{__c:function(t){e.weightChange="不清楚"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("不清楚")])])])]),e._v(" "),a("div",{staticClass:"personalMedicalChoice2"},[a("div",{staticClass:"medicalTitle2"},[e._v("06、在近以内，您曾试图减过体重吗？")]),e._v(" "),a("div",{staticClass:"perMedicalBox clearfix"},[a("label",{staticClass:"clearfix fl",attrs:{for:"level6_1"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.reduceWeight,expression:"reduceWeight"}],staticClass:"fl",attrs:{type:"radio",name:"sort5",id:"level6_1",value:"是"},domProps:{checked:e._q(e.reduceWeight,"是")},on:{__c:function(t){e.reduceWeight="是"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("是")])]),e._v(" "),a("label",{staticClass:"clearfix fl",attrs:{for:"level6_2"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.reduceWeight,expression:"reduceWeight"}],staticClass:"fl",attrs:{type:"radio",name:"sort5",id:"level6_2",value:"否"},domProps:{checked:e._q(e.reduceWeight,"否")},on:{__c:function(t){e.reduceWeight="否"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("否")])])])]),e._v(" "),a("div",{staticClass:"personalMedicalChoice2"},[a("div",{staticClass:"medicalTitle2"},[e._v("07、您的吸烟情况是？")]),e._v(" "),a("div",{staticClass:"perMedicalBox clearfix"},[a("label",{staticClass:"clearfix fl",attrs:{for:"level7_1"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.smokeYear,expression:"smokeYear"}],staticClass:"fl",attrs:{type:"radio",name:"sort6",id:"level7_1",value:"无"},domProps:{checked:e._q(e.smokeYear,"无")},on:{__c:function(t){e.smokeYear="无"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("无")])]),e._v(" "),a("label",{staticClass:"clearfix fl",attrs:{for:"level7_2"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.smokeYear,expression:"smokeYear"}],staticClass:"fl",attrs:{type:"radio",name:"sort6",id:"level7_2",value:"1~3年"},domProps:{checked:e._q(e.smokeYear,"1~3年")},on:{__c:function(t){e.smokeYear="1~3年"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("1~3年")])]),e._v(" "),a("label",{staticClass:"clearfix fl",attrs:{for:"level7_3"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.smokeYear,expression:"smokeYear"}],staticClass:"fl",attrs:{type:"radio",name:"sort6",id:"level7_3",value:"3~10年"},domProps:{checked:e._q(e.smokeYear,"3~10年")},on:{__c:function(t){e.smokeYear="3~10年"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("3~10年")])]),e._v(" "),a("label",{staticClass:"clearfix fl",attrs:{for:"level7_4"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.smokeYear,expression:"smokeYear"}],staticClass:"fl",attrs:{type:"radio",name:"sort6",id:"level7_4",value:"10年以上"},domProps:{checked:e._q(e.smokeYear,"10年以上")},on:{__c:function(t){e.smokeYear="10年以上"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("10年以上")])])])]),e._v(" "),a("div",{staticClass:"personalMedicalChoice2"},[a("div",{staticClass:"medicalTitle2"},[e._v("08、您每天的吸烟数量？")]),e._v(" "),a("div",{staticClass:"perMedicalBox clearfix"},[a("label",{staticClass:"clearfix fl",attrs:{for:"level8_1"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.smokeOneDay,expression:"smokeOneDay"}],staticClass:"fl",attrs:{type:"radio",name:"sort7",id:"level8_1",value:"无"},domProps:{checked:e._q(e.smokeOneDay,"无")},on:{__c:function(t){e.smokeOneDay="无"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("无")])]),e._v(" "),a("label",{staticClass:"clearfix fl",attrs:{for:"level8_2"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.smokeOneDay,expression:"smokeOneDay"}],staticClass:"fl",attrs:{type:"radio",name:"sort7",id:"level8_2",value:"1~3支"},domProps:{checked:e._q(e.smokeOneDay,"1~3支")},on:{__c:function(t){e.smokeOneDay="1~3支"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("1~3支")])]),e._v(" "),a("label",{staticClass:"clearfix fl",attrs:{for:"level8_3"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.smokeOneDay,expression:"smokeOneDay"}],staticClass:"fl",attrs:{type:"radio",name:"sort7",id:"level8_3",value:"3~10支"},domProps:{checked:e._q(e.smokeOneDay,"3~10支")},on:{__c:function(t){e.smokeOneDay="3~10支"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("3~10支")])]),e._v(" "),a("label",{staticClass:"clearfix fl",attrs:{for:"level8_4"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.smokeOneDay,expression:"smokeOneDay"}],staticClass:"fl",attrs:{type:"radio",name:"sort7",id:"level8_4",value:"10~20支"},domProps:{checked:e._q(e.smokeOneDay,"10~20支")},on:{__c:function(t){e.smokeOneDay="10~20支"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("10~20支")])]),e._v(" "),a("label",{staticClass:"clearfix fl",attrs:{for:"level8_5"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.smokeOneDay,expression:"smokeOneDay"}],staticClass:"fl",attrs:{type:"radio",name:"sort7",id:"level8_5",value:"20~30支"},domProps:{checked:e._q(e.smokeOneDay,"20~30支")},on:{__c:function(t){e.smokeOneDay="20~30支"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("20~30支")])]),e._v(" "),a("label",{staticClass:"clearfix fl",attrs:{for:"level8_6"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.smokeOneDay,expression:"smokeOneDay"}],staticClass:"fl",attrs:{type:"radio",name:"sort",id:"level8_6",value:"30支以上"},domProps:{checked:e._q(e.smokeOneDay,"30支以上")},on:{__c:function(t){e.smokeOneDay="30支以上"}}}),e._v(" "),a("span",{staticClass:"fl"},[e._v("30支以上")])])])]),e._v(" "),a("div",{staticClass:"healthNextBtn2",on:{click:e.next}},[e._v("下一步")])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=59.096bff1a476ef96b62e2.js.map