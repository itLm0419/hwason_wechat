webpackJsonp([34],{119:function(e,t,n){n(601);var r=n(22)(n(461),n(705),null,null);e.exports=r.exports},144:function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},145:function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:n)(e)}},146:function(e,t,n){var r=n(148),i=n(144);e.exports=function(e){return r(i(e))}},147:function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},148:function(e,t,n){var r=n(151);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},150:function(e,t,n){var r=n(153)("keys"),i=n(154);e.exports=function(e){return r[e]||(r[e]=i(e))}},151:function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},152:function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},153:function(e,t,n){var r=n(5),i=r["__core-js_shared__"]||(r["__core-js_shared__"]={});e.exports=function(e){return i[e]||(i[e]={})}},154:function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+r).toString(36))}},155:function(e,t,n){n(158);var r=n(22)(n(156),n(159),null,null);e.exports=r.exports},156:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{}},props:["imgaddr","title","edit"],methods:{goback:function(){this.$router.go(-1)},onMyClicking:function(){this.$emit("onMyClicking"),console.log("onmy Clicking")}}}},157:function(e,t,n){t=e.exports=n(70)(!0),t.push([e.i,"input::-webkit-input-placeholder{text-align:right}header{position:fixed;width:100%;left:0;top:0;z-index:200}header,header ul{height:2.2rem;background:#338fff}header ul li{height:100%;width:33.3%}header .loginFont{text-align:center}header .mianTitle{color:#fff;font-size:.8rem;line-height:2.2rem;width:100%;text-align:center}header .home a{display:block;height:2.2rem;width:1.7rem}header .home .backBtn{height:2.2rem;width:1.7rem;margin:0 0 0 1rem}header .home img{height:1.2rem;width:1.4rem;margin:.5rem 0 0}header .pre img{height:1.2rem;width:1.4rem;margin:.5rem 0 0 1.1rem}header .loginFont{color:#fff;font-size:.75rem;line-height:2.2rem}header .reg span{display:block;height:100%;width:100%;text-indent:4rem;font-size:.7rem;line-height:2.2rem;color:#fff}.companyName{color:#338fff;height:1.65rem;font-size:.7rem;line-height:1.65rem;text-indent:.75rem;background:#ecebeb}.companyName .mention{color:#cd3939;background:#ecebeb;padding-left:.45rem}","",{version:3,sources:["F:/SVN/wechat/hwasonvue/src/components/company/wechat/headerpart.vue"],names:[],mappings:"AACA,iCACE,gBAAkB,CACnB,AACD,OACE,eAAe,AACf,WAAW,AACX,OAAO,AACP,MAAM,AACN,WAAa,CACd,AACD,iBACE,cAAe,AACf,kBAAmB,CACpB,AACD,aACE,YAAa,AACb,WAAY,CACb,AACD,kBACE,iBAAmB,CAEpB,AACD,kBACE,WAAW,AACX,gBAAkB,AAClB,mBAAoB,AACpB,WAAW,AACX,iBAAmB,CACpB,AACD,eACE,cAAe,AACf,cAAe,AACf,YAAc,CACf,AACD,sBACE,cAAe,AACf,aAAc,AACd,iBAAkB,CACnB,AACD,iBACE,cAAc,AACd,aAAa,AACb,gBAAoB,CACrB,AACD,gBAGE,cAAc,AACd,aAAa,AACb,uBAAyB,CAC1B,AACD,kBACE,WAAW,AACX,iBAAmB,AACnB,kBAAoB,CACrB,AACD,iBACE,cAAe,AACf,YAAa,AACb,WAAY,AACZ,iBAAkB,AAClB,gBAAiB,AACjB,mBAAoB,AACpB,UAAW,CACZ,AACD,aACE,cAAc,AACd,eAAe,AACf,gBAAiB,AACjB,oBAAqB,AACrB,mBAAoB,AACpB,kBAAoB,CACrB,AACD,sBACE,cAAc,AACd,mBAAoB,AACpB,mBAAqB,CACtB",file:"headerpart.vue",sourcesContent:["\ninput::-webkit-input-placeholder{\n  text-align: right;\n}\nheader{\n  position:fixed;\n  width:100%;\n  left:0;\n  top:0;\n  z-index: 200;\n}\nheader,header ul{\n  height: 2.2rem;\n  background:#338fff;\n}\nheader ul li{\n  height: 100%;\n  width:33.3%;\n}\nheader .loginFont{\n  text-align: center;\n  line-height: 2.2rem;\n}\nheader .mianTitle{\n  color:#fff;\n  font-size: 0.8rem;\n  line-height: 2.2rem;\n  width:100%;\n  text-align: center;\n}\nheader .home a{\n  display: block;\n  height: 2.2rem;\n  width: 1.7rem;\n}\nheader .home .backBtn{\n  height: 2.2rem;\n  width: 1.7rem;\n  margin:0 0 0 1rem;\n}\nheader .home img{\n  height:1.2rem;\n  width:1.4rem;\n  margin:0.5rem 0 0 0;\n}\nheader .pre img{\n  /*height:1rem;\n  width:0.6rem;*/\n  height:1.2rem;\n  width:1.4rem;\n  margin:0.5rem 0 0 1.1rem;\n}\nheader .loginFont{\n  color:#fff;\n  font-size: 0.75rem;\n  line-height: 2.2rem;\n}\nheader .reg span{\n  display: block;\n  height: 100%;\n  width: 100%;\n  text-indent: 4rem;\n  font-size:0.7rem;\n  line-height: 2.2rem;\n  color:#fff;\n}\n.companyName{\n  color:#338fff;\n  height:1.65rem;\n  font-size:0.7rem;\n  line-height: 1.65rem;\n  text-indent:0.75rem;\n  background:#ecebeb ;\n}\n.companyName .mention{\n  color:#cd3939;\n  background: #ecebeb;\n  padding-left:0.45rem;\n}\n\n"],sourceRoot:""}])},158:function(e,t,n){var r=n(157);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(71)("eb008df4",r,!0)},159:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",[n("ul",{staticClass:"clearfix"},[n("li",{staticClass:"fl home"},[n("div",{staticClass:"backBtn",on:{click:e.goback}},[n("img",{attrs:{src:e.imgaddr,alt:"加载失败"}})])]),e._v(" "),n("li",{staticClass:"fl loginFont"},[e._v(e._s(e.title))]),e._v(" "),n("li",{staticClass:"fr reg"},[n("span",{on:{click:e.onMyClicking}},[e._v(e._s(e.edit))])])])])},staticRenderFns:[]}},160:function(e,t,n){var r=n(144);e.exports=function(e){return Object(r(e))}},161:function(e,t,n){var r=n(164),i=n(152);e.exports=Object.keys||function(e){return r(e,i)}},162:function(e,t,n){var r=n(145),i=Math.min;e.exports=function(e){return e>0?i(r(e),9007199254740991):0}},163:function(e,t,n){var r=n(146),i=n(162),o=n(165);e.exports=function(e){return function(t,n,s){var A,a=r(t),c=i(a.length),l=o(s,c);if(e&&n!=n){for(;c>l;)if((A=a[l++])!=A)return!0}else for(;c>l;l++)if((e||l in a)&&a[l]===n)return e||l||0;return!e&&-1}}},164:function(e,t,n){var r=n(147),i=n(146),o=n(163)(!1),s=n(150)("IE_PROTO");e.exports=function(e,t){var n,A=i(e),a=0,c=[];for(n in A)n!=s&&r(A,n)&&c.push(n);for(;t.length>a;)r(A,n=t[a++])&&(~o(c,n)||c.push(n));return c}},165:function(e,t,n){var r=n(145),i=Math.max,o=Math.min;e.exports=function(e,t){return e=r(e),e<0?i(e+t,0):o(e,t)}},166:function(e,t,n){"use strict";t.__esModule=!0;var r=n(168),i=function(e){return e&&e.__esModule?e:{default:e}}(r);t.default=i.default||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}},168:function(e,t,n){e.exports={default:n(169),__esModule:!0}},169:function(e,t,n){n(173),e.exports=n(6).Object.assign},170:function(e,t,n){"use strict";var r=n(161),i=n(171),o=n(172),s=n(160),A=n(148),a=Object.assign;e.exports=!a||n(8)(function(){var e={},t={},n=Symbol(),r="abcdefghijklmnopqrst";return e[n]=7,r.split("").forEach(function(e){t[e]=e}),7!=a({},e)[n]||Object.keys(a({},t)).join("")!=r})?function(e,t){for(var n=s(e),a=arguments.length,c=1,l=i.f,f=o.f;a>c;)for(var m,d=A(arguments[c++]),h=l?r(d).concat(l(d)):r(d),u=h.length,C=0;u>C;)f.call(d,m=h[C++])&&(n[m]=d[m]);return n}:a},171:function(e,t){t.f=Object.getOwnPropertySymbols},172:function(e,t){t.f={}.propertyIsEnumerable},173:function(e,t,n){var r=n(23);r(r.S+r.F,"Object",{assign:n(170)})},197:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(166),i=function(e){return e&&e.__esModule?e:{default:e}}(r),o=n(25);t.default={data:function(){return{Selected1:!0,Selected2:!1,Selected3:!1,Selected4:!1}},computed:(0,i.default)({},(0,o.mapState)(["footerInfo"])),mounted:function(){console.log("footerInfo",this.footerInfo),null==this.footerInfo||(this.Selected1=this.footerInfo.Selected1,this.Selected2=this.footerInfo.Selected2,this.Selected3=this.footerInfo.Selected3,this.Selected4=this.footerInfo.Selected4)},methods:(0,i.default)({},(0,o.mapMutations)(["RECORD_FOOTERINFO"]),{ShowSelected1:function(){this.Selected1=!0,this.Selected2=!1,this.Selected3=!1,this.Selected4=!1;var e={};e.Selected1=!0,e.Selected2=!1,e.Selected3=!1,e.Selected4=!1,this.RECORD_FOOTERINFO(e),this.$router.push("/nurse/sampling")},ShowSelected2:function(){this.Selected2=!0,this.Selected1=!1,this.Selected3=!1,this.Selected4=!1;var e={};e.Selected2=!0,e.Selected1=!1,e.Selected3=!1,e.Selected4=!1,this.RECORD_FOOTERINFO(e),this.$router.push("/nurse/recordeinfo")},ShowSelected3:function(){this.Selected3=!0,this.Selected1=!1,this.Selected2=!1,this.Selected4=!1;var e={};e.Selected3=!0,e.Selected1=!1,e.Selected2=!1,e.Selected4=!1,this.RECORD_FOOTERINFO(e),this.$router.push("/nurse/instruction")},ShowSelected4:function(){this.Selected4=!0,this.Selected2=!1,this.Selected3=!1,this.Selected1=!1;var e={};e.Selected4=!0,e.Selected1=!1,e.Selected2=!1,e.Selected3=!1,this.RECORD_FOOTERINFO(e),this.$router.push("/nurse/mycenter")},goback:function(){this.$router.go(-1)}})}},198:function(e,t,n){t=e.exports=n(70)(!0),t.push([e.i,"footer{width:100%;position:fixed;left:0;bottom:0}footer .nav{display:-webkit-box}footer .nav a{-webkit-box-flex:1;height:2.45rem;display:block;background:#393b40;text-align:center}footer .nav a.active{background:#338fff}footer .nav a img{height:1.1rem;width:1.1rem;margin:.25rem 0 0}footer .nav a .sortNmae{color:#fff}","",{version:3,sources:["F:/SVN/wechat/hwasonvue/src/components/nurse/footerpart.vue"],names:[],mappings:"AACA,OACE,WAAW,AACX,eAAe,AACf,OAAO,AACP,QAAS,CACV,AACD,YACE,mBAAoB,CACrB,AACD,cACE,mBAAmB,AACnB,eAAgB,AAChB,cAAe,AACf,mBAAoB,AACpB,iBAAmB,CACpB,AACD,qBACE,kBAAoB,CACrB,AACD,kBACE,cAAe,AACf,aAAc,AACd,iBAAmB,CACpB,AACD,wBACE,UAAW,CACZ",file:"footerpart.vue",sourcesContent:["\nfooter{\n  width:100%;\n  position:fixed;\n  left:0;\n  bottom:0;\n}\nfooter .nav{\n  display:-webkit-box;\n}\nfooter .nav a{\n  -webkit-box-flex:1;\n  height: 2.45rem;\n  display: block;\n  background: #393b40;\n  text-align: center;\n}\nfooter .nav a.active{\n  background: #338fff;\n}\nfooter .nav a img{\n  height: 1.1rem;\n  width: 1.1rem;\n  margin:0.25rem 0 0;\n}\nfooter .nav a .sortNmae{\n  color:#fff;\n}\n"],sourceRoot:""}])},199:function(e,t,n){var r=n(198);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(71)("5ce60cdd",r,!0)},204:function(e,t,n){n(199);var r=n(22)(n(197),n(205),null,null);e.exports=r.exports},205:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",[n("div",{staticClass:"nav clearfix"},[n("a",{class:{active:e.Selected1},attrs:{href:"javascript:;",to:"/nurse/sampling"},on:{click:e.ShowSelected1}},[n("img",{attrs:{src:"/static/img/nurse/sampling.png",alt:""}}),e._v(" "),n("div",{staticClass:"sortNmae"},[e._v("采样")])]),e._v(" "),n("a",{class:{active:e.Selected2},attrs:{href:"javascript:;",to:"/nurse/recordeinfo"},on:{click:e.ShowSelected2}},[n("img",{attrs:{src:"/static/img/nurse/recordedinfo.png",alt:""}}),e._v(" "),n("div",{staticClass:"sortNmae"},[e._v("已采样 ")])]),e._v(" "),n("a",{class:{active:e.Selected3},attrs:{href:"javascript:;",to:"/nurse/instruction"},on:{click:e.ShowSelected3}},[n("img",{attrs:{src:"/static/img/nurse/instructions.png",alt:""}}),e._v(" "),n("div",{staticClass:"sortNmae"},[e._v("操作指南")])]),e._v(" "),n("a",{class:{active:e.Selected4},attrs:{href:"javascript:;",to:"/nurse/mycenter"},on:{click:e.ShowSelected4}},[n("img",{attrs:{src:"/static/img/nurse/personcenter.png",alt:""}}),e._v(" "),n("div",{staticClass:"sortNmae"},[e._v("个人中心")])])])])},staticRenderFns:[]}},461:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(155),o=r(i),s=n(204),A=r(s),a=n(1);r(a);t.default={data:function(){return{imgaddr0:"/static/img/return.png",title0:"准备步骤"}},mounted:function(){},created:function(){},components:{headerpart:o.default,footerpart:A.default}}},528:function(e,t,n){t=e.exports=n(70)(!0),t.push([e.i,".wrap #content{background:#fff;padding:0 .8rem}.scrollBg{height:28.7rem;overflow-y:scroll}.progressTitle{margin:1.2rem 0 .2rem}.progressTitleFir{margin-top:.75rem}.progressTitle .dot{background:#338fff;height:.4rem;width:.4rem;margin:.2rem .25rem 0 0;border-radius:50%}.progressTitle .title{color:#338fff;font-size:.65rem;margin:0}.samplingContent p{color:#3f3f3f;font-size:.65rem;line-height:1.1rem}.samplingContent p.remark{margin-left:.75rem}.samplingContent p.remarksub{margin-left:2.2rem}.samplingContent .altIcon img{width:17.15rem;height:10.25rem;margin:.2rem 0}.suggestionbright{margin-top:1rem;color:#cd3939;font-size:.6rem}.progressIcons img{height:4.925rem;width:17.15rem}.progressIcons img.firstRow{margin:.375rem 0 1.125rem}","",{version:3,sources:["F:/SVN/wechat/hwasonvue/src/components/nurse/instructions/preparation.vue"],names:[],mappings:"AACA,eACE,gBAAiB,AACjB,eAAiB,CAClB,AACD,UACE,eAAe,AACf,iBAAmB,CACpB,AACD,eACE,qBAAyB,CAC1B,AACD,kBACE,iBAAmB,CACpB,AACD,oBACE,mBAAoB,AACpB,aAAe,AACf,YAAc,AACd,wBAA0B,AAC1B,iBAAkB,CACnB,AACD,sBACE,cAAe,AACf,iBAAkB,AAClB,QAAS,CACV,AACD,mBACE,cAAc,AACd,iBAAkB,AAClB,kBAAoB,CACrB,AACD,0BACE,kBAAoB,CACrB,AACD,6BACE,kBAAmB,CACpB,AACD,8BACE,eAAgB,AAChB,gBAAgB,AAChB,cAAgB,CACjB,AACD,kBACE,gBAAgB,AAChB,cAAc,AACd,eAAiB,CAClB,AACD,mBACE,gBAAiB,AACjB,cAAe,CAChB,AACD,4BACE,yBAA2B,CAC5B",file:"preparation.vue",sourcesContent:["\n.wrap #content{\n  background: #fff;\n  padding:0 0.8rem;\n}\n.scrollBg{\n  height:28.7rem;\n  overflow-y: scroll;\n}\n.progressTitle{\n  margin:1.2rem 0 0.2rem 0;\n}\n.progressTitleFir{\n  margin-top:0.75rem;\n}\n.progressTitle .dot{\n  background: #338fff;\n  height: 0.4rem;\n  width: 0.4rem;\n  margin:0.2rem 0.25rem 0 0;\n  border-radius:50%;\n}\n.progressTitle .title{\n  color: #338fff;\n  font-size:0.65rem;\n  margin:0;\n}\n.samplingContent p{\n  color:#3f3f3f;\n  font-size:0.65rem;\n  line-height: 1.1rem;\n}\n.samplingContent p.remark{\n  margin-left:0.75rem;\n}\n.samplingContent p.remarksub{\n  margin-left:2.2rem;\n}\n.samplingContent .altIcon img{\n  width: 17.15rem;\n  height:10.25rem;\n  margin:0.2rem 0;\n}\n.suggestionbright{\n  margin-top:1rem;\n  color:#cd3939;\n  font-size:0.6rem;\n}\n.progressIcons img{\n  height: 4.925rem;\n  width:17.15rem;\n}\n.progressIcons img.firstRow{\n  margin:0.375rem 0 1.125rem;\n}\n"],sourceRoot:""}])},601:function(e,t,n){var r=n(528);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(71)("67df3828",r,!0)},705:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"wrap"},[n("headerpart",{attrs:{imgaddr:e.imgaddr0,title:e.title0}}),e._v(" "),e._m(0)],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"scrollBg content",attrs:{id:"content"}},[n("div",{staticClass:"clearfix progressTitle progressTitleFir"},[n("div",{staticClass:"fl dot"}),e._v(" "),n("p",{staticClass:"fl title"},[e._v("准备步骤")])]),e._v(" "),n("div",{staticClass:"samplingContent"},[n("p",[e._v("1. 清点收到的耗材是否跟托运清单一致。")]),e._v(" "),n("p",[e._v("2. 消毒液和冰袋是否已经泡好冷冻")]),e._v(" "),n("p",{staticClass:"remark"},[e._v("（冰袋已经提供,但需机构提前冷冻备用）")]),e._v(" "),n("p",[e._v("3. 每位护士和登记人员都需要一标准桌,参考下图。")]),e._v(" "),n("div",{staticClass:"altIcon"},[n("img",{attrs:{src:"/static/img/nurse/instructions/preparation_01.png",alt:""}})]),e._v(" "),n("p",[e._v("4. 客户信息登记人员1-3名,要求字迹清晰易认,有责任心细致。")]),e._v(" "),n("p",[e._v("5. 登记人员协助标本离心工作。")]),e._v(" "),n("p",[e._v("6. 选择好采血区域后进行采血区域消毒处理。")]),e._v(" "),n("p",[e._v("7. 标本采集结束后")]),e._v(" "),n("p",{staticClass:"remark"},[e._v("要求 ① 登记人员要制作电子版客户信息登记表Excel表格,\n              发送到指定邮箱。")]),e._v(" "),n("p",{staticClass:"remarksub"},[e._v("②协助标本包装,电话预约第三方物流上门取件。")]),e._v(" "),n("div",{staticClass:"suggestionbright"},[e._v("（建议每一步骤制定专门的负责人，防止标本遗失。防止信息错误。谨慎小心。）")]),e._v(" "),n("div",{staticClass:"progressIcons"},[n("img",{staticClass:"firstRow",attrs:{src:"/static/img/nurse/instructions/preparation_02.png",alt:""}}),e._v(" "),n("img",{attrs:{src:"/static/img/nurse/instructions/preparation_03.png",alt:""}})])])])}]}}});
//# sourceMappingURL=34.0539300c2fd07166f9fb.js.map