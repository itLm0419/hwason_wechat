webpackJsonp([33],{120:function(e,t,n){n(619);var r=n(22)(n(462),n(728),null,null);e.exports=r.exports},144:function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},145:function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:n)(e)}},146:function(e,t,n){var r=n(148),i=n(144);e.exports=function(e){return r(i(e))}},147:function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},148:function(e,t,n){var r=n(151);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},150:function(e,t,n){var r=n(153)("keys"),i=n(154);e.exports=function(e){return r[e]||(r[e]=i(e))}},151:function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},152:function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},153:function(e,t,n){var r=n(5),i=r["__core-js_shared__"]||(r["__core-js_shared__"]={});e.exports=function(e){return i[e]||(i[e]={})}},154:function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+r).toString(36))}},155:function(e,t,n){n(158);var r=n(22)(n(156),n(159),null,null);e.exports=r.exports},156:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{}},props:["imgaddr","title","edit"],methods:{goback:function(){this.$router.go(-1)},onMyClicking:function(){this.$emit("onMyClicking"),console.log("onmy Clicking")}}}},157:function(e,t,n){t=e.exports=n(70)(!0),t.push([e.i,"input::-webkit-input-placeholder{text-align:right}header{position:fixed;width:100%;left:0;top:0;z-index:200}header,header ul{height:2.2rem;background:#338fff}header ul li{height:100%;width:33.3%}header .loginFont{text-align:center}header .mianTitle{color:#fff;font-size:.8rem;line-height:2.2rem;width:100%;text-align:center}header .home a{display:block;height:2.2rem;width:1.7rem}header .home .backBtn{height:2.2rem;width:1.7rem;margin:0 0 0 1rem}header .home img{height:1.2rem;width:1.4rem;margin:.5rem 0 0}header .pre img{height:1.2rem;width:1.4rem;margin:.5rem 0 0 1.1rem}header .loginFont{color:#fff;font-size:.75rem;line-height:2.2rem}header .reg span{display:block;height:100%;width:100%;text-indent:4rem;font-size:.7rem;line-height:2.2rem;color:#fff}.companyName{color:#338fff;height:1.65rem;font-size:.7rem;line-height:1.65rem;text-indent:.75rem;background:#ecebeb}.companyName .mention{color:#cd3939;background:#ecebeb;padding-left:.45rem}","",{version:3,sources:["F:/SVN/wechat/hwasonvue/src/components/company/wechat/headerpart.vue"],names:[],mappings:"AACA,iCACE,gBAAkB,CACnB,AACD,OACE,eAAe,AACf,WAAW,AACX,OAAO,AACP,MAAM,AACN,WAAa,CACd,AACD,iBACE,cAAe,AACf,kBAAmB,CACpB,AACD,aACE,YAAa,AACb,WAAY,CACb,AACD,kBACE,iBAAmB,CAEpB,AACD,kBACE,WAAW,AACX,gBAAkB,AAClB,mBAAoB,AACpB,WAAW,AACX,iBAAmB,CACpB,AACD,eACE,cAAe,AACf,cAAe,AACf,YAAc,CACf,AACD,sBACE,cAAe,AACf,aAAc,AACd,iBAAkB,CACnB,AACD,iBACE,cAAc,AACd,aAAa,AACb,gBAAoB,CACrB,AACD,gBAGE,cAAc,AACd,aAAa,AACb,uBAAyB,CAC1B,AACD,kBACE,WAAW,AACX,iBAAmB,AACnB,kBAAoB,CACrB,AACD,iBACE,cAAe,AACf,YAAa,AACb,WAAY,AACZ,iBAAkB,AAClB,gBAAiB,AACjB,mBAAoB,AACpB,UAAW,CACZ,AACD,aACE,cAAc,AACd,eAAe,AACf,gBAAiB,AACjB,oBAAqB,AACrB,mBAAoB,AACpB,kBAAoB,CACrB,AACD,sBACE,cAAc,AACd,mBAAoB,AACpB,mBAAqB,CACtB",file:"headerpart.vue",sourcesContent:["\ninput::-webkit-input-placeholder{\n  text-align: right;\n}\nheader{\n  position:fixed;\n  width:100%;\n  left:0;\n  top:0;\n  z-index: 200;\n}\nheader,header ul{\n  height: 2.2rem;\n  background:#338fff;\n}\nheader ul li{\n  height: 100%;\n  width:33.3%;\n}\nheader .loginFont{\n  text-align: center;\n  line-height: 2.2rem;\n}\nheader .mianTitle{\n  color:#fff;\n  font-size: 0.8rem;\n  line-height: 2.2rem;\n  width:100%;\n  text-align: center;\n}\nheader .home a{\n  display: block;\n  height: 2.2rem;\n  width: 1.7rem;\n}\nheader .home .backBtn{\n  height: 2.2rem;\n  width: 1.7rem;\n  margin:0 0 0 1rem;\n}\nheader .home img{\n  height:1.2rem;\n  width:1.4rem;\n  margin:0.5rem 0 0 0;\n}\nheader .pre img{\n  /*height:1rem;\n  width:0.6rem;*/\n  height:1.2rem;\n  width:1.4rem;\n  margin:0.5rem 0 0 1.1rem;\n}\nheader .loginFont{\n  color:#fff;\n  font-size: 0.75rem;\n  line-height: 2.2rem;\n}\nheader .reg span{\n  display: block;\n  height: 100%;\n  width: 100%;\n  text-indent: 4rem;\n  font-size:0.7rem;\n  line-height: 2.2rem;\n  color:#fff;\n}\n.companyName{\n  color:#338fff;\n  height:1.65rem;\n  font-size:0.7rem;\n  line-height: 1.65rem;\n  text-indent:0.75rem;\n  background:#ecebeb ;\n}\n.companyName .mention{\n  color:#cd3939;\n  background: #ecebeb;\n  padding-left:0.45rem;\n}\n\n"],sourceRoot:""}])},158:function(e,t,n){var r=n(157);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(71)("eb008df4",r,!0)},159:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",[n("ul",{staticClass:"clearfix"},[n("li",{staticClass:"fl home"},[n("div",{staticClass:"backBtn",on:{click:e.goback}},[n("img",{attrs:{src:e.imgaddr,alt:"加载失败"}})])]),e._v(" "),n("li",{staticClass:"fl loginFont"},[e._v(e._s(e.title))]),e._v(" "),n("li",{staticClass:"fr reg"},[n("span",{on:{click:e.onMyClicking}},[e._v(e._s(e.edit))])])])])},staticRenderFns:[]}},160:function(e,t,n){var r=n(144);e.exports=function(e){return Object(r(e))}},161:function(e,t,n){var r=n(164),i=n(152);e.exports=Object.keys||function(e){return r(e,i)}},162:function(e,t,n){var r=n(145),i=Math.min;e.exports=function(e){return e>0?i(r(e),9007199254740991):0}},163:function(e,t,n){var r=n(146),i=n(162),o=n(165);e.exports=function(e){return function(t,n,c){var a,s=r(t),A=i(s.length),l=o(c,A);if(e&&n!=n){for(;A>l;)if((a=s[l++])!=a)return!0}else for(;A>l;l++)if((e||l in s)&&s[l]===n)return e||l||0;return!e&&-1}}},164:function(e,t,n){var r=n(147),i=n(146),o=n(163)(!1),c=n(150)("IE_PROTO");e.exports=function(e,t){var n,a=i(e),s=0,A=[];for(n in a)n!=c&&r(a,n)&&A.push(n);for(;t.length>s;)r(a,n=t[s++])&&(~o(A,n)||A.push(n));return A}},165:function(e,t,n){var r=n(145),i=Math.max,o=Math.min;e.exports=function(e,t){return e=r(e),e<0?i(e+t,0):o(e,t)}},166:function(e,t,n){"use strict";t.__esModule=!0;var r=n(168),i=function(e){return e&&e.__esModule?e:{default:e}}(r);t.default=i.default||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}},168:function(e,t,n){e.exports={default:n(169),__esModule:!0}},169:function(e,t,n){n(173),e.exports=n(6).Object.assign},170:function(e,t,n){"use strict";var r=n(161),i=n(171),o=n(172),c=n(160),a=n(148),s=Object.assign;e.exports=!s||n(8)(function(){var e={},t={},n=Symbol(),r="abcdefghijklmnopqrst";return e[n]=7,r.split("").forEach(function(e){t[e]=e}),7!=s({},e)[n]||Object.keys(s({},t)).join("")!=r})?function(e,t){for(var n=c(e),s=arguments.length,A=1,l=i.f,f=o.f;s>A;)for(var d,u=a(arguments[A++]),h=l?r(u).concat(l(u)):r(u),m=h.length,p=0;m>p;)f.call(u,d=h[p++])&&(n[d]=u[d]);return n}:s},171:function(e,t){t.f=Object.getOwnPropertySymbols},172:function(e,t){t.f={}.propertyIsEnumerable},173:function(e,t,n){var r=n(23);r(r.S+r.F,"Object",{assign:n(170)})},197:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(166),i=function(e){return e&&e.__esModule?e:{default:e}}(r),o=n(25);t.default={data:function(){return{Selected1:!0,Selected2:!1,Selected3:!1,Selected4:!1}},computed:(0,i.default)({},(0,o.mapState)(["footerInfo"])),mounted:function(){console.log("footerInfo",this.footerInfo),null==this.footerInfo||(this.Selected1=this.footerInfo.Selected1,this.Selected2=this.footerInfo.Selected2,this.Selected3=this.footerInfo.Selected3,this.Selected4=this.footerInfo.Selected4)},methods:(0,i.default)({},(0,o.mapMutations)(["RECORD_FOOTERINFO"]),{ShowSelected1:function(){this.Selected1=!0,this.Selected2=!1,this.Selected3=!1,this.Selected4=!1;var e={};e.Selected1=!0,e.Selected2=!1,e.Selected3=!1,e.Selected4=!1,this.RECORD_FOOTERINFO(e),this.$router.push("/nurse/sampling")},ShowSelected2:function(){this.Selected2=!0,this.Selected1=!1,this.Selected3=!1,this.Selected4=!1;var e={};e.Selected2=!0,e.Selected1=!1,e.Selected3=!1,e.Selected4=!1,this.RECORD_FOOTERINFO(e),this.$router.push("/nurse/recordeinfo")},ShowSelected3:function(){this.Selected3=!0,this.Selected1=!1,this.Selected2=!1,this.Selected4=!1;var e={};e.Selected3=!0,e.Selected1=!1,e.Selected2=!1,e.Selected4=!1,this.RECORD_FOOTERINFO(e),this.$router.push("/nurse/instruction")},ShowSelected4:function(){this.Selected4=!0,this.Selected2=!1,this.Selected3=!1,this.Selected1=!1;var e={};e.Selected4=!0,e.Selected1=!1,e.Selected2=!1,e.Selected3=!1,this.RECORD_FOOTERINFO(e),this.$router.push("/nurse/mycenter")},goback:function(){this.$router.go(-1)}})}},198:function(e,t,n){t=e.exports=n(70)(!0),t.push([e.i,"footer{width:100%;position:fixed;left:0;bottom:0}footer .nav{display:-webkit-box}footer .nav a{-webkit-box-flex:1;height:2.45rem;display:block;background:#393b40;text-align:center}footer .nav a.active{background:#338fff}footer .nav a img{height:1.1rem;width:1.1rem;margin:.25rem 0 0}footer .nav a .sortNmae{color:#fff}","",{version:3,sources:["F:/SVN/wechat/hwasonvue/src/components/nurse/footerpart.vue"],names:[],mappings:"AACA,OACE,WAAW,AACX,eAAe,AACf,OAAO,AACP,QAAS,CACV,AACD,YACE,mBAAoB,CACrB,AACD,cACE,mBAAmB,AACnB,eAAgB,AAChB,cAAe,AACf,mBAAoB,AACpB,iBAAmB,CACpB,AACD,qBACE,kBAAoB,CACrB,AACD,kBACE,cAAe,AACf,aAAc,AACd,iBAAmB,CACpB,AACD,wBACE,UAAW,CACZ",file:"footerpart.vue",sourcesContent:["\nfooter{\n  width:100%;\n  position:fixed;\n  left:0;\n  bottom:0;\n}\nfooter .nav{\n  display:-webkit-box;\n}\nfooter .nav a{\n  -webkit-box-flex:1;\n  height: 2.45rem;\n  display: block;\n  background: #393b40;\n  text-align: center;\n}\nfooter .nav a.active{\n  background: #338fff;\n}\nfooter .nav a img{\n  height: 1.1rem;\n  width: 1.1rem;\n  margin:0.25rem 0 0;\n}\nfooter .nav a .sortNmae{\n  color:#fff;\n}\n"],sourceRoot:""}])},199:function(e,t,n){var r=n(198);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(71)("5ce60cdd",r,!0)},204:function(e,t,n){n(199);var r=n(22)(n(197),n(205),null,null);e.exports=r.exports},205:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",[n("div",{staticClass:"nav clearfix"},[n("a",{class:{active:e.Selected1},attrs:{href:"javascript:;",to:"/nurse/sampling"},on:{click:e.ShowSelected1}},[n("img",{attrs:{src:"/static/img/nurse/sampling.png",alt:""}}),e._v(" "),n("div",{staticClass:"sortNmae"},[e._v("采样")])]),e._v(" "),n("a",{class:{active:e.Selected2},attrs:{href:"javascript:;",to:"/nurse/recordeinfo"},on:{click:e.ShowSelected2}},[n("img",{attrs:{src:"/static/img/nurse/recordedinfo.png",alt:""}}),e._v(" "),n("div",{staticClass:"sortNmae"},[e._v("已采样 ")])]),e._v(" "),n("a",{class:{active:e.Selected3},attrs:{href:"javascript:;",to:"/nurse/instruction"},on:{click:e.ShowSelected3}},[n("img",{attrs:{src:"/static/img/nurse/instructions.png",alt:""}}),e._v(" "),n("div",{staticClass:"sortNmae"},[e._v("操作指南")])]),e._v(" "),n("a",{class:{active:e.Selected4},attrs:{href:"javascript:;",to:"/nurse/mycenter"},on:{click:e.ShowSelected4}},[n("img",{attrs:{src:"/static/img/nurse/personcenter.png",alt:""}}),e._v(" "),n("div",{staticClass:"sortNmae"},[e._v("个人中心")])])])])},staticRenderFns:[]}},462:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(155),o=r(i),c=n(204),a=r(c),s=n(1);r(s);t.default={data:function(){return{imgaddr0:"/static/img/return.png",title0:"采血标准流程"}},mounted:function(){},created:function(){},components:{headerpart:o.default,footerpart:a.default}}},546:function(e,t,n){t=e.exports=n(70)(!0),t.push([e.i,".wrap #content{background:#fff;padding:0 .8rem}.progressTitle{margin:1.2rem 0 .2rem}.progressTitleFir{margin-top:.75rem}.progressTitle .dot{background:#338fff;height:.4rem;width:.4rem;margin:.2rem .25rem 0 0;border-radius:50%}.progressTitle .title{color:#338fff;font-size:.65rem}.samplingContent p{color:#3f3f3f;font-size:.65rem;line-height:1.1rem}","",{version:3,sources:["F:/SVN/wechat/hwasonvue/src/components/nurse/instructions/samplingProgress.vue"],names:[],mappings:"AACA,eACE,gBAAiB,AACjB,eAAiB,CAClB,AACD,eACE,qBAAyB,CAC1B,AACD,kBACE,iBAAmB,CACpB,AACD,oBACE,mBAAoB,AACpB,aAAe,AACf,YAAc,AACd,wBAA0B,AAC1B,iBAAkB,CACnB,AACD,sBACE,cAAe,AACf,gBAAkB,CACnB,AACD,mBACE,cAAc,AACd,iBAAkB,AAClB,kBAAoB,CACrB",file:"samplingProgress.vue",sourcesContent:["\n.wrap #content{\n  background: #fff;\n  padding:0 0.8rem;\n}\n.progressTitle{\n  margin:1.2rem 0 0.2rem 0;\n}\n.progressTitleFir{\n  margin-top:0.75rem;\n}\n.progressTitle .dot{\n  background: #338fff;\n  height: 0.4rem;\n  width: 0.4rem;\n  margin:0.2rem 0.25rem 0 0;\n  border-radius:50%;\n}\n.progressTitle .title{\n  color: #338fff;\n  font-size:0.65rem;\n}\n.samplingContent p{\n  color:#3f3f3f;\n  font-size:0.65rem;\n  line-height: 1.1rem;\n}\n\n"],sourceRoot:""}])},619:function(e,t,n){var r=n(546);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(71)("94c07db6",r,!0)},728:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"wrap"},[n("headerpart",{attrs:{imgaddr:e.imgaddr0,title:e.title0}}),e._v(" "),e._m(0)],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"content",attrs:{id:"content"}},[n("div",{staticClass:"clearfix progressTitle progressTitleFir"},[n("div",{staticClass:"fl dot"}),e._v(" "),n("p",{staticClass:"fl title"},[e._v("采血标准流程")])]),e._v(" "),n("div",{staticClass:"samplingContent"},[n("p",[e._v("1. 请按照规定时间到达采血现场，负责静脉采血工作。")]),e._v(" "),n("p",[e._v("2. 将所有医疗用品按照标准整齐摆放在采血桌面上。")]),e._v(" "),n("p",[e._v("3. 熟练相关检验项目，熟练掌握采血程序以及采血器的使用。")]),e._v(" "),n("p",[e._v("4. 请在采血前请穿好隔离衣，戴好护士帽，挂牌上岗，规范服务。")]),e._v(" "),n("p",[e._v("5. 工作期间请使用服务文明用语，态度和蔼，服务细心周到")]),e._v(" "),n("p",[e._v("6. 认真核对客户信息，有疑问时请与相关工作人员联系, 确保\n              标本准确无误。")]),e._v(" "),n("p",[e._v("7. 客户信息与试管的序号及条码准确核对后再进行静脉穿刺。")]),e._v(" "),n("p",[e._v("8. 采血前，选择最佳部位进行皮肤消毒处理。")]),e._v(" "),n("p",[e._v("9. 三查：采血前查、采血中查、采血后查。")]),e._v(" "),n("p",[e._v("10.七对：对姓名、性别、年龄、采血管、序号、条码、检测\n              项目。")]),e._v(" "),n("p",[e._v("11.请严格执行无菌操作，做到技术精湛，操作要轻，一针见\n              血。")]),e._v(" "),n("p",[e._v("12.抽血完毕，将一次性采血针放入锐器盒内。叮嘱客户用消\n              毒棉签按压穿刺处5分钟并向客户说明采血后的注意事项及\n              体检报告发放方式。")])])])}]}}});
//# sourceMappingURL=33.7a55e7f13a222067ef0f.js.map