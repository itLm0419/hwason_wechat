webpackJsonp([30],{144:function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},145:function(t,e){var n=Math.ceil,a=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?a:n)(t)}},146:function(t,e,n){var a=n(148),i=n(144);t.exports=function(t){return a(i(t))}},147:function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},148:function(t,e,n){var a=n(151);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==a(t)?t.split(""):Object(t)}},150:function(t,e,n){var a=n(153)("keys"),i=n(154);t.exports=function(t){return a[t]||(a[t]=i(t))}},151:function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},152:function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},153:function(t,e,n){var a=n(5),i=a["__core-js_shared__"]||(a["__core-js_shared__"]={});t.exports=function(t){return i[t]||(i[t]={})}},154:function(t,e){var n=0,a=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+a).toString(36))}},155:function(t,e,n){n(158);var a=n(22)(n(156),n(159),null,null);t.exports=a.exports},156:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},props:["imgaddr","title","edit"],methods:{goback:function(){this.$router.go(-1)},onMyClicking:function(){this.$emit("onMyClicking"),console.log("onmy Clicking")}}}},157:function(t,e,n){e=t.exports=n(70)(!0),e.push([t.i,"input::-webkit-input-placeholder{text-align:right}header{position:fixed;width:100%;left:0;top:0;z-index:200}header,header ul{height:2.2rem;background:#338fff}header ul li{height:100%;width:33.3%}header .loginFont{text-align:center}header .mianTitle{color:#fff;font-size:.8rem;line-height:2.2rem;width:100%;text-align:center}header .home a{display:block;height:2.2rem;width:1.7rem}header .home .backBtn{height:2.2rem;width:1.7rem;margin:0 0 0 1rem}header .home img{height:1.2rem;width:1.4rem;margin:.5rem 0 0}header .pre img{height:1.2rem;width:1.4rem;margin:.5rem 0 0 1.1rem}header .loginFont{color:#fff;font-size:.75rem;line-height:2.2rem}header .reg span{display:block;height:100%;width:100%;text-indent:4rem;font-size:.7rem;line-height:2.2rem;color:#fff}.companyName{color:#338fff;height:1.65rem;font-size:.7rem;line-height:1.65rem;text-indent:.75rem;background:#ecebeb}.companyName .mention{color:#cd3939;background:#ecebeb;padding-left:.45rem}","",{version:3,sources:["F:/SVN/wechat/hwasonvue/src/components/company/wechat/headerpart.vue"],names:[],mappings:"AACA,iCACE,gBAAkB,CACnB,AACD,OACE,eAAe,AACf,WAAW,AACX,OAAO,AACP,MAAM,AACN,WAAa,CACd,AACD,iBACE,cAAe,AACf,kBAAmB,CACpB,AACD,aACE,YAAa,AACb,WAAY,CACb,AACD,kBACE,iBAAmB,CAEpB,AACD,kBACE,WAAW,AACX,gBAAkB,AAClB,mBAAoB,AACpB,WAAW,AACX,iBAAmB,CACpB,AACD,eACE,cAAe,AACf,cAAe,AACf,YAAc,CACf,AACD,sBACE,cAAe,AACf,aAAc,AACd,iBAAkB,CACnB,AACD,iBACE,cAAc,AACd,aAAa,AACb,gBAAoB,CACrB,AACD,gBAGE,cAAc,AACd,aAAa,AACb,uBAAyB,CAC1B,AACD,kBACE,WAAW,AACX,iBAAmB,AACnB,kBAAoB,CACrB,AACD,iBACE,cAAe,AACf,YAAa,AACb,WAAY,AACZ,iBAAkB,AAClB,gBAAiB,AACjB,mBAAoB,AACpB,UAAW,CACZ,AACD,aACE,cAAc,AACd,eAAe,AACf,gBAAiB,AACjB,oBAAqB,AACrB,mBAAoB,AACpB,kBAAoB,CACrB,AACD,sBACE,cAAc,AACd,mBAAoB,AACpB,mBAAqB,CACtB",file:"headerpart.vue",sourcesContent:["\ninput::-webkit-input-placeholder{\n  text-align: right;\n}\nheader{\n  position:fixed;\n  width:100%;\n  left:0;\n  top:0;\n  z-index: 200;\n}\nheader,header ul{\n  height: 2.2rem;\n  background:#338fff;\n}\nheader ul li{\n  height: 100%;\n  width:33.3%;\n}\nheader .loginFont{\n  text-align: center;\n  line-height: 2.2rem;\n}\nheader .mianTitle{\n  color:#fff;\n  font-size: 0.8rem;\n  line-height: 2.2rem;\n  width:100%;\n  text-align: center;\n}\nheader .home a{\n  display: block;\n  height: 2.2rem;\n  width: 1.7rem;\n}\nheader .home .backBtn{\n  height: 2.2rem;\n  width: 1.7rem;\n  margin:0 0 0 1rem;\n}\nheader .home img{\n  height:1.2rem;\n  width:1.4rem;\n  margin:0.5rem 0 0 0;\n}\nheader .pre img{\n  /*height:1rem;\n  width:0.6rem;*/\n  height:1.2rem;\n  width:1.4rem;\n  margin:0.5rem 0 0 1.1rem;\n}\nheader .loginFont{\n  color:#fff;\n  font-size: 0.75rem;\n  line-height: 2.2rem;\n}\nheader .reg span{\n  display: block;\n  height: 100%;\n  width: 100%;\n  text-indent: 4rem;\n  font-size:0.7rem;\n  line-height: 2.2rem;\n  color:#fff;\n}\n.companyName{\n  color:#338fff;\n  height:1.65rem;\n  font-size:0.7rem;\n  line-height: 1.65rem;\n  text-indent:0.75rem;\n  background:#ecebeb ;\n}\n.companyName .mention{\n  color:#cd3939;\n  background: #ecebeb;\n  padding-left:0.45rem;\n}\n\n"],sourceRoot:""}])},158:function(t,e,n){var a=n(157);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(71)("eb008df4",a,!0)},159:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",[n("ul",{staticClass:"clearfix"},[n("li",{staticClass:"fl home"},[n("div",{staticClass:"backBtn",on:{click:t.goback}},[n("img",{attrs:{src:t.imgaddr,alt:"加载失败"}})])]),t._v(" "),n("li",{staticClass:"fl loginFont"},[t._v(t._s(t.title))]),t._v(" "),n("li",{staticClass:"fr reg"},[n("span",{on:{click:t.onMyClicking}},[t._v(t._s(t.edit))])])])])},staticRenderFns:[]}},160:function(t,e,n){var a=n(144);t.exports=function(t){return Object(a(t))}},161:function(t,e,n){var a=n(164),i=n(152);t.exports=Object.keys||function(t){return a(t,i)}},162:function(t,e,n){var a=n(145),i=Math.min;t.exports=function(t){return t>0?i(a(t),9007199254740991):0}},163:function(t,e,n){var a=n(146),i=n(162),o=n(165);t.exports=function(t){return function(e,n,r){var s,c=a(e),l=i(c.length),A=o(r,l);if(t&&n!=n){for(;l>A;)if((s=c[A++])!=s)return!0}else for(;l>A;A++)if((t||A in c)&&c[A]===n)return t||A||0;return!t&&-1}}},164:function(t,e,n){var a=n(147),i=n(146),o=n(163)(!1),r=n(150)("IE_PROTO");t.exports=function(t,e){var n,s=i(t),c=0,l=[];for(n in s)n!=r&&a(s,n)&&l.push(n);for(;e.length>c;)a(s,n=e[c++])&&(~o(l,n)||l.push(n));return l}},165:function(t,e,n){var a=n(145),i=Math.max,o=Math.min;t.exports=function(t,e){return t=a(t),t<0?i(t+e,0):o(t,e)}},166:function(t,e,n){"use strict";e.__esModule=!0;var a=n(168),i=function(t){return t&&t.__esModule?t:{default:t}}(a);e.default=i.default||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t}},168:function(t,e,n){t.exports={default:n(169),__esModule:!0}},169:function(t,e,n){n(173),t.exports=n(6).Object.assign},170:function(t,e,n){"use strict";var a=n(161),i=n(171),o=n(172),r=n(160),s=n(148),c=Object.assign;t.exports=!c||n(8)(function(){var t={},e={},n=Symbol(),a="abcdefghijklmnopqrst";return t[n]=7,a.split("").forEach(function(t){e[t]=t}),7!=c({},t)[n]||Object.keys(c({},e)).join("")!=a})?function(t,e){for(var n=r(t),c=arguments.length,l=1,A=i.f,h=o.f;c>l;)for(var f,d=s(arguments[l++]),m=A?a(d).concat(A(d)):a(d),C=m.length,u=0;C>u;)h.call(d,f=m[u++])&&(n[f]=d[f]);return n}:c},171:function(t,e){e.f=Object.getOwnPropertySymbols},172:function(t,e){e.f={}.propertyIsEnumerable},173:function(t,e,n){var a=n(23);a(a.S+a.F,"Object",{assign:n(170)})},206:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(166),i=function(t){return t&&t.__esModule?t:{default:t}}(a),o=n(25);e.default={data:function(){return{Selected1:!0,Selected2:!1,Selected3:!1,Selected4:!1,Selected5:!1}},computed:(0,i.default)({},(0,o.mapState)(["footerInfo"])),mounted:function(){console.log("footerInfo",this.footerInfo),null==this.footerInfo||(this.Selected1=this.footerInfo.Selected1,this.Selected2=this.footerInfo.Selected2,this.Selected3=this.footerInfo.Selected3,this.Selected4=this.footerInfo.Selected4,this.Selected5=this.footerInfo.Selected5)},methods:(0,i.default)({},(0,o.mapMutations)(["RECORD_FOOTERINFO"]),{ShowSelected1:function(){this.Selected1=!0,this.Selected2=!1,this.Selected3=!1,this.Selected4=!1,this.Selected5=!1;var t={};t.Selected1=!0,t.Selected2=!1,t.Selected3=!1,t.Selected4=!1,t.Selected5=!1,this.RECORD_FOOTERINFO(t),this.$router.push("/company/activityinfo"),console.log("footerInfo2",this.footerInfo)},ShowSelected2:function(){this.Selected2=!0,this.Selected1=!1,this.Selected3=!1,this.Selected4=!1,this.Selected5=!1;var t={};t.Selected2=!0,t.Selected1=!1,t.Selected3=!1,t.Selected4=!1,t.Selected5=!1,this.RECORD_FOOTERINFO(t),this.$router.push("/company/activity"),console.log("footerInfo2",this.footerInfo)},ShowSelected3:function(){this.Selected3=!0,this.Selected1=!1,this.Selected2=!1,this.Selected4=!1,this.Selected5=!1;var t={};t.Selected3=!0,t.Selected1=!1,t.Selected2=!1,t.Selected4=!1,t.Selected5=!1,this.RECORD_FOOTERINFO(t),this.$router.push("/company/samplepkg"),console.log("footerInfo2",this.footerInfo)},ShowSelected4:function(){this.Selected4=!0,this.Selected2=!1,this.Selected3=!1,this.Selected1=!1,this.Selected5=!1;var t={};t.Selected4=!0,t.Selected1=!1,t.Selected2=!1,t.Selected3=!1,t.Selected5=!1,this.RECORD_FOOTERINFO(t),this.$router.push("/company/samplelist"),console.log("footerInfo2",this.footerInfo)},ShowSelected5:function(){this.Selected5=!0,this.Selected2=!1,this.Selected3=!1,this.Selected1=!1,this.Selected4=!1;var t={};t.Selected5=!0,t.Selected1=!1,t.Selected2=!1,t.Selected3=!1,t.Selected4=!1,this.RECORD_FOOTERINFO(t),this.$router.push("/company/healthRecords"),console.log("footerInfo2",this.footerInfo)},goback:function(){this.$router.go(-1)}})}},207:function(t,e,n){e=t.exports=n(70)(!0),e.push([t.i,"footer{position:fixed;width:100%;left:0;bottom:0}footer nav{display:-webkit-box}footer nav a{-webkit-box-flex:1;height:2.45rem;display:block;background:#393b40;text-align:center;color:#fff;font-size:1rem}footer nav a .sortNmae{color:#fff}footer nav a.active{background:#338fff;color:#fff}footer nav a img{height:1.1rem;width:1.1rem;margin:.25rem 0 0}","",{version:3,sources:["F:/SVN/wechat/hwasonvue/src/components/company/wechat/footerpart.vue"],names:[],mappings:"AACA,OACE,eAAe,AACf,WAAW,AAEX,OAAQ,AACR,QAAS,CACV,AACD,WACE,mBAAoB,CACrB,AACD,aACE,mBAAmB,AACnB,eAAgB,AAChB,cAAe,AACf,mBAAoB,AACpB,kBAAmB,AACnB,WAAW,AACX,cAAe,CAChB,AACD,uBACE,UAAW,CACZ,AACD,oBACE,mBAAoB,AACpB,UAAW,CACZ,AACD,iBACE,cAAe,AACf,aAAc,AACd,iBAAmB,CACpB",file:"footerpart.vue",sourcesContent:["\nfooter{\n  position:fixed;\n  width:100%;\n  /*height:100%;*/\n  left: 0;\n  bottom:0;\n}\nfooter nav{\n  display:-webkit-box;\n}\nfooter nav a{\n  -webkit-box-flex:1;\n  height: 2.45rem;\n  display: block;\n  background: #393b40;\n  text-align: center;\n  color:#fff;\n  font-size:1rem;\n}\nfooter nav a .sortNmae{\n  color:#fff;\n}\nfooter nav a.active{\n  background: #338fff;\n  color:#fff;\n}\nfooter nav a img{\n  height: 1.1rem;\n  width: 1.1rem;\n  margin:0.25rem 0 0;\n}\n\n"],sourceRoot:""}])},208:function(t,e,n){var a=n(207);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(71)("72d67b45",a,!0)},209:function(t,e,n){n(208);var a=n(22)(n(206),n(210),null,null);t.exports=a.exports},210:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",[n("nav",{staticClass:"clearfix"},[n("a",{class:{active:t.Selected1},attrs:{href:"javascript:;"},on:{click:t.ShowSelected1}},[n("img",{attrs:{src:"/static/img/company/wechat/msg.png",alt:""}}),t._v(" "),n("div",{staticClass:"sortNmae"},[t._v("今日活动")])]),t._v(" "),n("a",{class:{active:t.Selected2},attrs:{href:"javascript:;"},on:{click:t.ShowSelected2}},[n("img",{attrs:{src:"/static/img/company/wechat/activity.png",alt:""}}),t._v(" "),n("div",{staticClass:"sortNmae"},[t._v("活动行事历 ")])]),t._v(" "),n("a",{class:{active:t.Selected3},attrs:{href:"javascript:;"},on:{click:t.ShowSelected3}},[n("img",{attrs:{src:"/static/img/company/wechat/package.png",alt:""}}),t._v(" "),n("div",{staticClass:"sortNmae"},[t._v("检测包")])]),t._v(" "),n("a",{class:{active:t.Selected4},attrs:{href:"javascript:;"},on:{click:t.ShowSelected4}},[n("img",{attrs:{src:"/static/img/company/wechat/demo.png",alt:""}}),t._v(" "),n("div",{staticClass:"sortNmae"},[t._v("样本跟踪")])]),t._v(" "),n("a",{class:{active:t.Selected5},attrs:{href:"javascript:;"},on:{click:t.ShowSelected5}},[n("img",{attrs:{src:"/static/img/company/wechat/healthRec.png",alt:""}}),t._v(" "),n("div",{staticClass:"sortNmae"},[t._v("健康档案")])])])])},staticRenderFns:[]}},429:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(155),o=a(i),r=n(209),s=a(r),c=n(7),l=a(c);e.default={data:function(){return{popupVisible:!1,addOn1:"fl on",addOn2:"fl",showDepartment:!0,StatisticsDept:[{other_number:0,today_number:0,total_number:0,department:""}],StatisticsSales:[{today_number:0,total_number:0,name:"",department:""}]}},filters:{changImg:function(t){switch(t){case 0:return"../../../../../static/img/company/wechat/healthRecords/top1.png";case 1:return"../../../../../static/img/company/wechat/healthRecords/top2.png"}},changClass:function(t){switch(t){case 0:return"top1";case 1:return"top2"}}},mounted:function(){console.log("mounted"),this.GetStatisticsbyDepartment(),this.GetStatisticsbySalesman()},computed:{totalOtherNum:function(){for(var t=0,e=0;e<this.StatisticsDept.length;e++)t+=this.StatisticsDept[e].other_number;return t},totalTodayNum:function(){for(var t=0,e=0;e<this.StatisticsDept.length;e++)t+=this.StatisticsDept[e].today_number;return t},totalTotalNum:function(){for(var t=0,e=0;e<this.StatisticsDept.length;e++)t+=this.StatisticsDept[e].total_number;return t},totalTodayNumSales:function(){for(var t=0,e=0;e<this.StatisticsSales.length;e++)t+=this.StatisticsSales[e].today_number;return t},totalTotalNumSales:function(){for(var t=0,e=0;e<this.StatisticsSales.length;e++)t+=this.StatisticsSales[e].total_number;return t}},methods:{titTabs1:function(){this.addOn1="fl on",this.addOn2="fl",this.showDepartment=!0},titTabs2:function(){this.addOn1="fl",this.addOn2="fl on",this.showDepartment=!1,this.GetStatisticsbySalesman()},GetStatisticsbyDepartment:function(){var t=this;l.default.get("/wechat/company/HRecordByDepartment").then(function(e){console.log("response："),t.StatisticsDept.splice(0,t.StatisticsDept.length);for(var n=0;n<e.data.length;n++)t.StatisticsDept.push(e.data[n]);console.log(t.StatisticsDept)}).catch(function(t){console.log("error response："),console.log(t)})},GetStatisticsbySalesman:function(){var t=this;l.default.get("/wechat/company/HRecordBySalesman").then(function(e){console.log("response："),t.StatisticsSales.splice(0,t.StatisticsSales.length);for(var n=0;n<e.data.length;n++)t.StatisticsSales.push(e.data[n]);console.log(t.StatisticsSales)}).catch(function(t){console.log("error response："),console.log(t)})}},components:{headerpart:o.default,footerpart:s.default}}},494:function(t,e,n){e=t.exports=n(70)(!0),e.push([t.i,".addBlank{width:100%;height:2.2rem}.comHealthRecHBanner img{width:18.75rem;height:8.55rem;margin-bottom:.6rem}.hNav{padding-top:.5rem}.hNav .titTabs{width:10.5rem;height:1.3rem;margin-left:1.1rem}.hNav .titTabs div{box-sizing:border-box;width:50%;height:100%;text-align:center;line-height:1.2rem;color:#338fff;background:#fff;border:1px solid #338fff}.hNav .titTabs div.on{background:#338fff;color:#fff}.hNav{background:#fff}.linkHDateDetail{width:4.55rem;height:1.3rem;background:#ec3f3f;text-align:center;color:#fff;margin-right:.6rem;line-height:1.3rem}.showTitleRow{margin:.95rem .95rem 0;padding-bottom:.4rem;border-bottom:1px solid #aaa}.showTitleRow li{width:25%;text-align:center;color:#3d3d3d}.rangeBox{padding:0 .5rem;height:13rem;overflow-y:scroll}.rangeBox .rangeData li{margin:.45rem 0}.rangeBox .rangeData .depart{width:6rem}.historyNum{width:4rem}.todayNum{width:4.5rem}.rangeBox img.top1{width:1.05rem;height:.8rem;margin:0 0 0 .2rem}.rangeBox img.top2{width:.65rem;height:.65rem;margin:0 .1rem 0 .4rem}.markNum{color:#ec3f3f}.rangeNum{padding:0 .3rem 0 .5rem}.totalDataNum{width:100%;height:1.4rem;background:#fff;position:absolute;left:0;bottom:2.65rem}.totalDataNum li{width:25%;text-indent:1.6rem;line-height:1.4rem}","",{version:3,sources:["F:/SVN/wechat/hwasonvue/src/components/company/wechat/comHealthRecords/healthRecords.vue"],names:[],mappings:"AACA,UACI,WAAW,AACX,aAAe,CAClB,AACD,yBACI,eAAe,AACf,eAAgB,AAChB,mBAAqB,CACxB,AACD,MACI,iBAAmB,CACtB,AACD,eACI,cAAc,AACd,cAAc,AACd,kBAAmB,CACtB,AACD,mBACI,sBAAuB,AACvB,UAAU,AACV,YAAY,AACZ,kBAAmB,AACnB,mBAAoB,AACpB,cAAc,AACd,gBAAiB,AACjB,wBAAyB,CAC5B,AACD,sBACI,mBAAoB,AACpB,UAAW,CACd,AACD,MACI,eAAiB,CACpB,AACD,iBACI,cAAe,AACf,cAAe,AACf,mBAAoB,AACpB,kBAAmB,AACnB,WAAW,AACX,mBAAoB,AACpB,kBAAoB,CACvB,AACD,cACI,uBAAyB,AACzB,qBAAsB,AACtB,4BAA6B,CAChC,AACD,iBACI,UAAU,AACV,kBAAmB,AACnB,aAAc,CACjB,AACD,UACI,gBAAiB,AACjB,aAAa,AACb,iBAAmB,CACtB,AACD,wBACI,eAAiB,CAEpB,AACD,6BACI,UAAW,CACd,AACD,YACI,UAAW,CAEd,AACD,UACI,YAAa,CAEhB,AACD,mBACI,cAAe,AACf,aAAe,AACf,kBAAoB,CACvB,AACD,mBACI,aAAe,AACf,cAAgB,AAChB,sBAAyB,CAC5B,AACD,SACI,aAAc,CACjB,AACD,UACI,uBAA0B,CAC7B,AACD,cACI,WAAW,AACX,cAAe,AACf,gBAAiB,AACjB,kBAAmB,AACnB,OAAO,AACP,cAAe,CAClB,AACD,iBACI,UAAW,AACX,mBAAoB,AACpB,kBAAoB,CACvB",file:"healthRecords.vue",sourcesContent:["\n.addBlank{\n    width:100%;\n    height: 2.2rem;\n}\n.comHealthRecHBanner img{\n    width:18.75rem;\n    height: 8.55rem;\n    margin-bottom:0.6rem;\n}\n.hNav{\n    padding-top:0.5rem;\n}\n.hNav .titTabs{\n    width:10.5rem;\n    height:1.3rem;\n    margin-left:1.1rem;\n}\n.hNav .titTabs div{\n    box-sizing: border-box;\n    width:50%;\n    height:100%;\n    text-align: center;\n    line-height: 1.2rem;\n    color:#338fff;\n    background: #fff;\n    border:1px solid #338fff;\n}\n.hNav .titTabs div.on{\n    background: #338fff;\n    color:#fff;\n}\n.hNav{\n    background: #fff;\n}\n.linkHDateDetail{\n    width: 4.55rem;\n    height: 1.3rem;\n    background: #ec3f3f;\n    text-align: center;\n    color:#fff;\n    margin-right:0.6rem;\n    line-height: 1.3rem;\n}\n.showTitleRow{\n    margin:0.95rem 0.95rem 0;\n    padding-bottom:0.4rem;\n    border-bottom:1px solid #aaa;\n}\n.showTitleRow li{\n    width:25%;\n    text-align: center;\n    color:#3d3d3d;\n}\n.rangeBox{\n    padding:0 0.5rem;\n    height:13rem;\n    overflow-y: scroll;\n}\n.rangeBox .rangeData li{\n    margin:0.45rem 0;\n    /*text-align: center;*/\n}\n.rangeBox .rangeData .depart{\n    width:6rem;\n}\n.historyNum{\n    width:4rem;\n    /*text-align: center;*/\n}\n.todayNum{\n    width:4.5rem;\n    /*text-align: center;*/\n}\n.rangeBox  img.top1{\n    width: 1.05rem;\n    height: 0.8rem;\n    margin:0 0 0 0.2rem;\n}\n.rangeBox  img.top2{\n    width: 0.65rem;\n    height: 0.65rem;\n    margin:0 0.1rem 0 0.4rem;\n}\n.markNum{\n    color:#ec3f3f;\n}\n.rangeNum{\n    padding:0 0.3rem 0 0.5rem;\n}\n.totalDataNum{\n    width:100%;\n    height: 1.4rem;\n    background: #fff;\n    position: absolute;\n    left:0;\n    bottom:2.65rem;\n}\n.totalDataNum li{\n    width: 25%;\n    text-indent: 1.6rem;\n    line-height: 1.4rem;\n}\n\n"],sourceRoot:""}])},567:function(t,e,n){var a=n(494);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(71)("466820f1",a,!0)},649:function(t,e,n){t.exports=n.p+"static/img/comHealthRecHBanner.663e4c6.png"},670:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"wrap"},[t._m(0),t._v(" "),n("section",[n("div",{staticClass:"addBlank"}),t._v(" "),t._m(1),t._v(" "),n("div",{staticClass:"hNav"},[n("div",{staticClass:"clearfix"},[n("div",{staticClass:"titTabs clearfix fl"},[n("div",{class:t.addOn1,on:{click:t.titTabs1}},[t._v("按部门统计")]),t._v(" "),n("div",{class:t.addOn2,on:{click:t.titTabs2}},[t._v("按业务员统计")])]),t._v(" "),n("a",{staticClass:"fr linkHDateDetail",attrs:{href:"#/company/healthRecSearch"}},[t._v("查看数据详情")])]),t._v(" "),t.showDepartment?n("ul",{staticClass:"showTitleRow clearfix"},[n("li",{staticClass:"fl"},[t._v("部门")]),t._v(" "),n("li",{staticClass:"fl"},[t._v("历史档案数")]),t._v(" "),n("li",{staticClass:"fl"},[t._v("今日新增数")]),t._v(" "),n("li",{staticClass:"fl"},[t._v("档案总数")])]):n("ul",{staticClass:"showTitleRow clearfix"},[n("li",{staticClass:"fl"},[t._v("业务员")]),t._v(" "),n("li",{staticClass:"fl"},[t._v("所属部门")]),t._v(" "),n("li",{staticClass:"fl"},[t._v("今日新增数")]),t._v(" "),n("li",{staticClass:"fl"},[t._v("档案总数")])]),t._v(" "),n("div",{staticClass:"rangeBox"},[t._l(t.StatisticsDept,function(e,a){return t.showDepartment?n("ul",{staticClass:"rangeData"},[n("li",{staticClass:"clearfix"},[a<2?n("div",{staticClass:"fl depart"},[n("img",{class:t._f("changClass")(a),attrs:{src:t._f("changImg")(a),alt:""}}),t._v(" "),n("span",[t._v(t._s(e.department||"无"))])]):n("div",{staticClass:"fl depart"},[n("span",{staticClass:"rangeNum"},[t._v(t._s(a+1))]),t._v(" "),n("span",[t._v(t._s(e.department||"无"))])]),t._v(" "),n("div",{staticClass:"fl historyNum"},[t._v(t._s(e.other_number))]),t._v(" "),n("div",{staticClass:"fl todayNum"},[n("span",{staticClass:"markNum"},[t._v(t._s(e.today_number))])]),t._v(" "),n("div",{staticClass:"fl"},[t._v(t._s(e.total_number))])])]):t._e()}),t._v(" "),t._l(t.StatisticsSales,function(e,a){return t.showDepartment?t._e():n("ul",{staticClass:"rangeData"},[n("li",{staticClass:"clearfix"},[a<2?n("div",{staticClass:"fl depart"},[n("img",{class:t._f("changClass")(a),attrs:{src:t._f("changImg")(a),alt:""}}),t._v(" "),n("span",[t._v(t._s(e.name))])]):n("div",{staticClass:"fl depart"},[n("span",{staticClass:"rangeNum"},[t._v(t._s(a+1))]),t._v(" "),n("span",[t._v(t._s(e.name))])]),t._v(" "),n("div",{staticClass:"fl historyNum"},[t._v(t._s(e.department||"无"))]),t._v(" "),n("div",{staticClass:"fl todayNum"},[n("span",{staticClass:"markNum"},[t._v(t._s(e.today_number))])]),t._v(" "),n("div",{staticClass:"fl"},[t._v(t._s(e.total_number))])])])})],2)]),t._v(" "),t.showDepartment?n("div",{staticClass:"totalDataNum"},[n("div",{staticClass:"addTopLine"}),t._v(" "),n("ul",{staticClass:"clearfix "},[n("li",{staticClass:"fl totalRow"},[t._v("总计")]),t._v(" "),n("li",{staticClass:"fl "},[t._v(t._s(t.totalOtherNum))]),t._v(" "),n("li",{staticClass:"fl markNum todayNum"},[t._v(t._s(t.totalTodayNum))]),t._v(" "),n("li",{staticClass:"fl"},[t._v(t._s(t.totalTotalNum))])])]):n("div",{staticClass:"totalDataNum"},[n("div",{staticClass:"addTopLine"}),t._v(" "),n("ul",{staticClass:"clearfix "},[n("li",{staticClass:"fl totalRow"},[t._v("总计")]),t._v(" "),n("li",{staticClass:"fl"},[t._v("--")]),t._v(" "),n("li",{staticClass:"fl markNum"},[t._v(t._s(t.totalTodayNumSales))]),t._v(" "),n("li",{staticClass:"fl"},[t._v(t._s(t.totalTotalNumSales))])])])]),t._v(" "),n("footerpart")],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",[n("div",{staticClass:"mianTitle"},[t._v("健康档案")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"comHealthRecHBanner"},[a("img",{attrs:{src:n(649),alt:""}})])}]}},87:function(t,e,n){n(567);var a=n(22)(n(429),n(670),null,null);t.exports=a.exports}});
//# sourceMappingURL=30.367891678dc420482ce9.js.map