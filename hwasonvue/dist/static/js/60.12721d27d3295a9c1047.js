webpackJsonp([60],{102:function(e,t,n){n(591);var a=n(22)(n(444),n(695),null,null);e.exports=a.exports},155:function(e,t,n){n(158);var a=n(22)(n(156),n(159),null,null);e.exports=a.exports},156:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{}},props:["imgaddr","title","edit"],methods:{goback:function(){this.$router.go(-1)},onMyClicking:function(){this.$emit("onMyClicking"),console.log("onmy Clicking")}}}},157:function(e,t,n){t=e.exports=n(70)(!0),t.push([e.i,"input::-webkit-input-placeholder{text-align:right}header{position:fixed;width:100%;left:0;top:0;z-index:200}header,header ul{height:2.2rem;background:#338fff}header ul li{height:100%;width:33.3%}header .loginFont{text-align:center}header .mianTitle{color:#fff;font-size:.8rem;line-height:2.2rem;width:100%;text-align:center}header .home a{display:block;height:2.2rem;width:1.7rem}header .home .backBtn{height:2.2rem;width:1.7rem;margin:0 0 0 1rem}header .home img{height:1.2rem;width:1.4rem;margin:.5rem 0 0}header .pre img{height:1.2rem;width:1.4rem;margin:.5rem 0 0 1.1rem}header .loginFont{color:#fff;font-size:.75rem;line-height:2.2rem}header .reg span{display:block;height:100%;width:100%;text-indent:4rem;font-size:.7rem;line-height:2.2rem;color:#fff}.companyName{color:#338fff;height:1.65rem;font-size:.7rem;line-height:1.65rem;text-indent:.75rem;background:#ecebeb}.companyName .mention{color:#cd3939;background:#ecebeb;padding-left:.45rem}","",{version:3,sources:["F:/SVN/wechat/hwasonvue/src/components/company/wechat/headerpart.vue"],names:[],mappings:"AACA,iCACE,gBAAkB,CACnB,AACD,OACE,eAAe,AACf,WAAW,AACX,OAAO,AACP,MAAM,AACN,WAAa,CACd,AACD,iBACE,cAAe,AACf,kBAAmB,CACpB,AACD,aACE,YAAa,AACb,WAAY,CACb,AACD,kBACE,iBAAmB,CAEpB,AACD,kBACE,WAAW,AACX,gBAAkB,AAClB,mBAAoB,AACpB,WAAW,AACX,iBAAmB,CACpB,AACD,eACE,cAAe,AACf,cAAe,AACf,YAAc,CACf,AACD,sBACE,cAAe,AACf,aAAc,AACd,iBAAkB,CACnB,AACD,iBACE,cAAc,AACd,aAAa,AACb,gBAAoB,CACrB,AACD,gBAGE,cAAc,AACd,aAAa,AACb,uBAAyB,CAC1B,AACD,kBACE,WAAW,AACX,iBAAmB,AACnB,kBAAoB,CACrB,AACD,iBACE,cAAe,AACf,YAAa,AACb,WAAY,AACZ,iBAAkB,AAClB,gBAAiB,AACjB,mBAAoB,AACpB,UAAW,CACZ,AACD,aACE,cAAc,AACd,eAAe,AACf,gBAAiB,AACjB,oBAAqB,AACrB,mBAAoB,AACpB,kBAAoB,CACrB,AACD,sBACE,cAAc,AACd,mBAAoB,AACpB,mBAAqB,CACtB",file:"headerpart.vue",sourcesContent:["\ninput::-webkit-input-placeholder{\n  text-align: right;\n}\nheader{\n  position:fixed;\n  width:100%;\n  left:0;\n  top:0;\n  z-index: 200;\n}\nheader,header ul{\n  height: 2.2rem;\n  background:#338fff;\n}\nheader ul li{\n  height: 100%;\n  width:33.3%;\n}\nheader .loginFont{\n  text-align: center;\n  line-height: 2.2rem;\n}\nheader .mianTitle{\n  color:#fff;\n  font-size: 0.8rem;\n  line-height: 2.2rem;\n  width:100%;\n  text-align: center;\n}\nheader .home a{\n  display: block;\n  height: 2.2rem;\n  width: 1.7rem;\n}\nheader .home .backBtn{\n  height: 2.2rem;\n  width: 1.7rem;\n  margin:0 0 0 1rem;\n}\nheader .home img{\n  height:1.2rem;\n  width:1.4rem;\n  margin:0.5rem 0 0 0;\n}\nheader .pre img{\n  /*height:1rem;\n  width:0.6rem;*/\n  height:1.2rem;\n  width:1.4rem;\n  margin:0.5rem 0 0 1.1rem;\n}\nheader .loginFont{\n  color:#fff;\n  font-size: 0.75rem;\n  line-height: 2.2rem;\n}\nheader .reg span{\n  display: block;\n  height: 100%;\n  width: 100%;\n  text-indent: 4rem;\n  font-size:0.7rem;\n  line-height: 2.2rem;\n  color:#fff;\n}\n.companyName{\n  color:#338fff;\n  height:1.65rem;\n  font-size:0.7rem;\n  line-height: 1.65rem;\n  text-indent:0.75rem;\n  background:#ecebeb ;\n}\n.companyName .mention{\n  color:#cd3939;\n  background: #ecebeb;\n  padding-left:0.45rem;\n}\n\n"],sourceRoot:""}])},158:function(e,t,n){var a=n(157);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n(71)("eb008df4",a,!0)},159:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",[n("ul",{staticClass:"clearfix"},[n("li",{staticClass:"fl home"},[n("div",{staticClass:"backBtn",on:{click:e.goback}},[n("img",{attrs:{src:e.imgaddr,alt:"加载失败"}})])]),e._v(" "),n("li",{staticClass:"fl loginFont"},[e._v(e._s(e.title))]),e._v(" "),n("li",{staticClass:"fr reg"},[n("span",{on:{click:e.onMyClicking}},[e._v(e._s(e.edit))])])])])},staticRenderFns:[]}},195:function(e,t,n){"use strict";e.exports={UrlSearch:function(){var e,t,n=location.href,a=n.indexOf("?");n=n.substr(a+1);for(var r=n.split("&"),i=0;i<r.length;i++)(a=r[i].indexOf("="))>0&&(e=r[i].substring(0,a),t=r[i].substr(a+1),this[e]=t)},setCookie:function(e,t){var n=new Date;n.setTime(n.getTime()+2592e6),document.cookie=e+"="+escape(t)+";expires="+n.toGMTString()},getCookie:function(e){var t,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(n))?unescape(t[2]):null},dateFormat:function(e,t){var n=e.getFullYear(),a=e.getMonth()+1;a=a<10?"0"+a:a;var r=e.getDate();r=r<10?"0"+r:r;var i=e.getHours();i=i<10?"0"+i:i;var s=e.getMinutes();return s=s<10?"0"+s:s,1==t?n+"-"+a+"-"+r+" "+i+":"+s:2==t?n+"-"+a+"-"+r:n+"年"+a+"月"+r},getProjectsNum:function(e){if("PD-A"==e)return 2;if("PD-B"==e||"PD-C"==e)return 5;if("PD-D"==e)return 14;var t=0,n=0;if("string"==typeof e)for(var a=0;a<e.length;a++)if(e.charAt(a)>="0"&&e.charAt(a)<="9"){if(t=a,e.charAt(a+1)>="0"&&e.charAt(a+1)<="9"){n=a+1;break}n=0;break}return 0==n?parseInt(e.charAt(t)):parseInt(e.substring(t,n+1))},getDate:function(e){var t=parseInt(e.substr(0,4)),n=parseInt(e.substr(5,2))-1,a=parseInt(e.substr(-2));return new Date(t,n,a)},getDate2:function(e){var t=parseInt(e.substr(0,4)),n=parseInt(e.substr(5,2))-1,a=parseInt(e.substr(-2))+1;return new Date(t,n,a)}}},444:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(155),i=a(r),s=n(1),o=(a(s),n(7)),A=a(o),l=n(195),c=a(l);t.default={data:function(){return{imgaddr0:"/static/img/return.png",title0:"新档案",cardNo:"",password:"",name:"",IDNo:"",salesmanNo:""}},mounted:function(){var e=new c.default.UrlSearch;this.userId=e.userId,this.userId&&this.init()},created:function(){},components:{headerpart:i.default},methods:{init:function(){console.log(333);var e=this;A.default.get("/wechat/healthRecord/queryInfo",{params:{userId:e.userId}}).then(function(t){console.log(t);var n=t.data;e.cardNo=n.record.cardNo.toUpperCase(),e.password=n.record.password,e.name=n.record.name,e.IDNo=n.record.IDNo,e.salesmanNo=n.salesman.userName,e.complete=n.record.complete,c.default.setCookie("userRecordId",null)})},healthNext:function(){var e=this;A.default.get("/wechat/healthRecord/isComplete",{params:{cardNo:e.cardNo.toUpperCase()}}).then(function(t){if(t.data)return e.$messagebox({title:"提示",message:"信息已填写完整，不可更改"}),!1;e.next()})},changePos:function(e){e.srcElement.className="fr"},changePos2:function(e){e.srcElement.className="fr ipChangePos"},changePos3:function(e){e.srcElement.className="fr ipChangePos reduceWeight"},changePos4:function(e){e.srcElement.className="fr reduceWeight"},next:function(){var e=this;return e.cardNo&&e.password&&e.name&&e.IDNo&&e.salesmanNo?/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(e.IDNo)||/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(e.IDNo)?void A.default.post("/wechat/healthRecord/register",{params:{cardNo:e.cardNo.toUpperCase(),name:e.name,password:e.password,IDNo:e.IDNo,salesmanNo:e.salesmanNo}}).then(function(t){if(console.log(t),"02"==t.data.result)e.$messagebox({title:"提示",message:"卡号或密码不正确"});else if("03"==t.data.result)e.$messagebox({title:"提示",message:"健康服务专员工号不存在"});else if("00"==t.data.result)window.location.href="#/baseMsg?userId="+t.data.userId;else if("04"==t.data.result)e.$messagebox({title:"提示",message:"该卡已被其他用户使用"});else if("05"==t.data.result)return e.$messagebox({title:"提示",message:"信息已填写完整，不可更改"}),!1}):(e.$messagebox({title:"提示",message:"身份证号码不正确"}),!1):(e.$messagebox({title:"提示",message:"请填写完整信息"}),!1)}}}},518:function(e,t,n){t=e.exports=n(70)(!0),t.push([e.i,".hBannerBox img{width:100%;height:10.3rem;margin:2.2rem 0 .8rem}.healthBindId{width:100%;background:#fff}.healthBindId li{width:17.25rem;height:2.475rem;margin-left:.75rem;border-bottom:1px solid #dcdcdc}.healthBindId li.removeBorder{border:0}.healthBindId li span{color:#333;line-height:2.475rem;font-size:.7rem}.healthBindId li input{width:77%;height:100%;border:0;text-indent:.2rem;text-align:right}.healthBindId li input.reduceWeight{width:63%}.healthBindId li input.ipChangePos{text-align:left}.healthBindId li img{height:.45rem;width:.45rem;margin:1rem .2rem 0 0}.healthNextBtn{width:16.65rem;height:2.25rem;text-align:center;line-height:2.25rem;margin:1.6rem auto 0;color:#fff;font-size:1rem;background:#338fff}","",{version:3,sources:["F:/SVN/wechat/hwasonvue/src/components/healthRecords/bindLogin.vue"],names:[],mappings:"AACA,gBACE,WAAW,AACX,eAAgB,AAChB,qBAAyB,CAC1B,AACD,cACE,WAAW,AACX,eAAiB,CAClB,AACD,iBACE,eAAe,AACf,gBAAgB,AAChB,mBAAoB,AACpB,+BAAgC,CACjC,AACD,8BACK,QAAS,CACb,AACD,sBACE,WAAW,AACX,qBAAsB,AACtB,eAAiB,CAClB,AACD,uBACE,UAAU,AACV,YAAY,AACZ,SAAS,AACT,kBAAmB,AACnB,gBAAkB,CACnB,AACD,oCACE,SAAU,CACX,AACD,mCACE,eAAiB,CAClB,AACD,qBACE,cAAgB,AAChB,aAAe,AACf,qBAAuB,CACxB,AACD,eACE,eAAe,AACf,eAAe,AACf,kBAAmB,AACnB,oBAAqB,AACrB,qBAAqB,AACrB,WAAW,AACX,eAAe,AACf,kBAAoB,CACrB",file:"bindLogin.vue",sourcesContent:["\n.hBannerBox img{\n  width:100%;\n  height: 10.3rem;\n  margin:2.2rem 0 0.8rem 0;\n}\n.healthBindId{\n  width:100%;\n  background:#fff ;\n}\n.healthBindId li{\n  width:17.25rem;\n  height:2.475rem;\n  margin-left:0.75rem;\n  border-bottom:1px solid #dcdcdc;\n}\n.healthBindId li.removeBorder{\n     border:0;\n}\n.healthBindId li span{\n  color:#333;\n  line-height: 2.475rem;\n  font-size:0.7rem;\n}\n.healthBindId li input{\n  width:77%;\n  height:100%;\n  border:0;\n  text-indent:0.2rem;\n  text-align: right;\n}\n.healthBindId li input.reduceWeight{\n  width:63%;\n}\n.healthBindId li input.ipChangePos{\n  text-align: left;\n}\n.healthBindId li img{\n  height: 0.45rem;\n  width: 0.45rem;\n  margin: 1rem 0.2rem 0 0\n}\n.healthNextBtn{\n  width:16.65rem;\n  height:2.25rem;\n  text-align: center;\n  line-height: 2.25rem;\n  margin:1.6rem auto 0;\n  color:#fff;\n  font-size:1rem;\n  background: #338fff;\n}\n"],sourceRoot:""}])},591:function(e,t,n){var a=n(518);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n(71)("7a1b76ec",a,!0)},695:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hMian"},[n("headerpart",{attrs:{imgaddr:e.imgaddr0,title:e.title0}}),e._v(" "),e._m(0),e._v(" "),n("ul",{staticClass:"healthBindId"},[n("li",{staticClass:"clearfix"},[n("img",{staticClass:"fl",attrs:{src:"/static/img/nurse/mustIcon.png",alt:""}}),e._v(" "),n("span",{staticClass:"checkName fl"},[e._v("E晟卡号")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.cardNo,expression:"cardNo"}],staticClass:"fr",attrs:{type:"text",placeholder:"请输写正确卡号"},domProps:{value:e.cardNo},on:{focus:e.changePos2,blur:e.changePos,input:function(t){t.target.composing||(e.cardNo=t.target.value)}}})]),e._v(" "),n("li",{staticClass:"clearfix"},[n("img",{staticClass:"fl",attrs:{src:"/static/img/nurse/mustIcon.png",alt:""}}),e._v(" "),n("span",{staticClass:"checkName fl"},[e._v("密码")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"fr",attrs:{type:"password",placeholder:"请输写正确信息"},domProps:{value:e.password},on:{focus:e.changePos2,blur:e.changePos,input:function(t){t.target.composing||(e.password=t.target.value)}}})]),e._v(" "),n("li",{staticClass:"clearfix"},[n("img",{staticClass:"fl",attrs:{src:"/static/img/nurse/mustIcon.png",alt:""}}),e._v(" "),n("span",{staticClass:"checkName fl"},[e._v("姓名")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"fr",attrs:{type:"text",placeholder:"请输入您的真实姓名"},domProps:{value:e.name},on:{focus:e.changePos2,blur:e.changePos,input:function(t){t.target.composing||(e.name=t.target.value)}}})]),e._v(" "),n("li",{staticClass:"clearfix"},[n("img",{staticClass:"fl",attrs:{src:"/static/img/nurse/mustIcon.png",alt:""}}),e._v(" "),n("span",{staticClass:"checkName fl"},[e._v("身份证号")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.IDNo,expression:"IDNo"}],staticClass:"fr",attrs:{type:"text",placeholder:"请输入您真实证号"},domProps:{value:e.IDNo},on:{focus:e.changePos2,blur:e.changePos,input:function(t){t.target.composing||(e.IDNo=t.target.value)}}})]),e._v(" "),n("li",{staticClass:"clearfix removeBorder"},[n("img",{staticClass:"fl",attrs:{src:"/static/img/nurse/mustIcon.png",alt:""}}),e._v(" "),n("span",{staticClass:"checkName fl"},[e._v("健康服务专员工号")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.salesmanNo,expression:"salesmanNo"}],staticClass:"fr reduceWeight",attrs:{type:"text",placeholder:"请输写正确信息"},domProps:{value:e.salesmanNo},on:{focus:e.changePos3,blur:e.changePos4,input:function(t){t.target.composing||(e.salesmanNo=t.target.value)}}})])]),e._v(" "),n("div",{staticClass:"healthNextBtn",on:{click:e.healthNext}},[e._v("下一步")])],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hBannerBox"},[n("img",{attrs:{src:"/static/img/healthRecords/hbanner.png",alt:""}})])}]}}});
//# sourceMappingURL=60.12721d27d3295a9c1047.js.map