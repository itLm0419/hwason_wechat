webpackJsonp([63],{111:function(t,s,a){var e=a(22)(a(453),a(719),null,null);t.exports=e.exports},453:function(t,s,a){"use strict";function e(t){return t&&t.__esModule?t:{default:t}}function n(t){console.log("appid",t.appid),console.log("timestamp",t.timestamp),console.log("noncestr",t.noncestr),console.log("signture",t.signature),wx.config({debug:!0,appId:t.appid,timestamp:t.timestamp,nonceStr:t.noncestr,signature:t.signature,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone","hideMenuItems","showMenuItems","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","translateVoice","startRecord","stopRecord","onVoiceRecordEnd","playVoice","onVoicePlayEnd","pauseVoice","stopVoice","uploadVoice","downloadVoice","chooseImage","previewImage","uploadImage","downloadImage","getNetworkType","openLocation","getLocation","hideOptionMenu","showOptionMenu","closeWindow","scanQRCode","chooseWXPay","openProductSpecificView","addCard","chooseCard","openCard"]}),wx.ready(function(){document.querySelector("#checkJsApi").onclick=function(){wx.checkJsApi({jsApiList:["getNetworkType","previewImage"],success:function(t){alert((0,o.default)(t))}})}}),document.querySelector("#scanQRCode1").onclick=function(){alert("abc"),wx.scanQRCode({needResult:1,desc:"scanQRCode desc",success:function(t){alert((0,o.default)(t))}})},wx.error(function(t){alert(t.errMsg)})}Object.defineProperty(s,"__esModule",{value:!0});var i=a(491),o=e(i),c=a(1),_=(e(c),a(7)),r=e(_);s.default={data:function(){return{}},computed:{},mounted:function(){console.log("mounted"),this.GetData()},created:function(){},components:{},methods:{ScanCode:function(){alert("555"),wx.scanQRCode({needResult:1,desc:"scanQRCode desc",success:function(t){alert((0,o.default)(t))}})},GetData:function(){var t=location.href.split("#")[0];console.log("get data:"),(0,r.default)({method:"get",url:"http://www.hwason.cn/api/jssdk?url="+t,data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(t){n(t.data)}).catch(function(t){console.log("error response："),console.log(t)})}}}},491:function(t,s,a){t.exports={default:a(642),__esModule:!0}},642:function(t,s,a){var e=a(6),n=e.JSON||(e.JSON={stringify:JSON.stringify});t.exports=function(t){return n.stringify.apply(n,arguments)}},719:function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("body",{attrs:{ontouchstart:""}},[a("div",{staticClass:"wxapi_container"},[t._m(0),t._v(" "),a("div",{staticClass:"lbox_close wxapi_form"},[a("h3",{attrs:{id:"menu-basic"}},[t._v("基础接口")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("判断当前客户端是否支持指定JS接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"checkJsApi"}},[t._v("checkJsApi")]),t._v(" "),a("h3",{attrs:{id:"menu-share"}},[t._v("分享接口")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("获取“分享到朋友圈”按钮点击状态及自定义分享内容接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"onMenuShareTimeline"}},[t._v("onMenuShareTimeline")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("获取“分享给朋友”按钮点击状态及自定义分享内容接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"onMenuShareAppMessage"}},[t._v("onMenuShareAppMessage")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("获取“分享到QQ”按钮点击状态及自定义分享内容接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"onMenuShareQQ"}},[t._v("onMenuShareQQ")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"onMenuShareWeibo"}},[t._v("onMenuShareWeibo")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("获取“分享到QZone”按钮点击状态及自定义分享内容接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"onMenuShareQZone"}},[t._v("onMenuShareQZone")]),t._v(" "),a("h3",{attrs:{id:"menu-image"}},[t._v("图像接口")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("拍照或从手机相册中选图接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"chooseImage"}},[t._v("chooseImage")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("预览图片接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"previewImage"}},[t._v("previewImage")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("上传图片接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"uploadImage"}},[t._v("uploadImage")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("下载图片接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"downloadImage"}},[t._v("downloadImage")]),t._v(" "),a("h3",{attrs:{id:"menu-voice"}},[t._v("音频接口")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("开始录音接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"startRecord"}},[t._v("startRecord")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("停止录音接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"stopRecord"}},[t._v("stopRecord")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("播放语音接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"playVoice"}},[t._v("playVoice")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("暂停播放接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"pauseVoice"}},[t._v("pauseVoice")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("停止播放接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"stopVoice"}},[t._v("stopVoice")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("上传语音接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"uploadVoice"}},[t._v("uploadVoice")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("下载语音接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"downloadVoice"}},[t._v("downloadVoice")]),t._v(" "),a("h3",{attrs:{id:"menu-smart"}},[t._v("智能接口")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("识别音频并返回识别结果接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"translateVoice"}},[t._v("translateVoice")]),t._v(" "),a("h3",{attrs:{id:"menu-device"}},[t._v("设备信息接口")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("获取网络状态接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"getNetworkType"}},[t._v("getNetworkType")]),t._v(" "),a("h3",{attrs:{id:"menu-location"}},[t._v("地理位置接口")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("使用微信内置地图查看位置接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"openLocation"}},[t._v("openLocation")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("获取地理位置接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"getLocation"}},[t._v("getLocation")]),t._v(" "),a("h3",{attrs:{id:"menu-webview"}},[t._v("界面操作接口")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("隐藏右上角菜单接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"hideOptionMenu"}},[t._v("hideOptionMenu")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("显示右上角菜单接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"showOptionMenu"}},[t._v("showOptionMenu")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("关闭当前网页窗口接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"closeWindow"}},[t._v("closeWindow")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("批量隐藏功能按钮接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"hideMenuItems"}},[t._v("hideMenuItems")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("批量显示功能按钮接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"showMenuItems"}},[t._v("showMenuItems")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("隐藏所有非基础按钮接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"hideAllNonBaseMenuItem"}},[t._v("hideAllNonBaseMenuItem")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("显示所有功能按钮接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"showAllNonBaseMenuItem"}},[t._v("showAllNonBaseMenuItem")]),t._v(" "),a("h3",{attrs:{id:"menu-scan"}},[t._v("微信扫一扫")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("调起微信扫一扫接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"scanQRCode0"}},[t._v("scanQRCode(微信处理结果)")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"scanQRCode1"},on:{click:t.ScanCode}},[t._v("scanQRCode(直接返回结果)")]),t._v(" "),a("h3",{attrs:{id:"menu-shopping"}},[t._v("微信小店接口")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("跳转微信商品页接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"openProductSpecificView"}},[t._v("openProductSpecificView")]),t._v(" "),a("h3",{attrs:{id:"menu-card"}},[t._v("微信卡券接口")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("批量添加卡券接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"addCard"}},[t._v("addCard")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("调起适用于门店的卡券列表并获取用户选择列表")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"chooseCard"}},[t._v("chooseCard")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("查看微信卡包中的卡券接口")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"openCard"}},[t._v("openCard")]),t._v(" "),a("h3",{attrs:{id:"menu-pay"}},[t._v("微信支付接口")]),t._v(" "),a("span",{staticClass:"desc"},[t._v("发起一个微信支付请求")]),t._v(" "),a("button",{staticClass:"btn btn_primary",attrs:{id:"chooseWXPay"}},[t._v("chooseWXPay")])])])])},staticRenderFns:[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"wxapi_index_container"},[a("ul",{staticClass:"label_box lbox_close wxapi_index_list"},[a("li",{staticClass:"label_item wxapi_index_item"},[a("a",{staticClass:"label_inner",attrs:{href:"#menu-basic"}},[t._v("基础接口")])]),t._v(" "),a("li",{staticClass:"label_item wxapi_index_item"},[a("a",{staticClass:"label_inner",attrs:{href:"#menu-share"}},[t._v("分享接口")])]),t._v(" "),a("li",{staticClass:"label_item wxapi_index_item"},[a("a",{staticClass:"label_inner",attrs:{href:"#menu-image"}},[t._v("图像接口")])]),t._v(" "),a("li",{staticClass:"label_item wxapi_index_item"},[a("a",{staticClass:"label_inner",attrs:{href:"#menu-voice"}},[t._v("音频接口")])]),t._v(" "),a("li",{staticClass:"label_item wxapi_index_item"},[a("a",{staticClass:"label_inner",attrs:{href:"#menu-smart"}},[t._v("智能接口")])]),t._v(" "),a("li",{staticClass:"label_item wxapi_index_item"},[a("a",{staticClass:"label_inner",attrs:{href:"#menu-device"}},[t._v("设备信息接口")])]),t._v(" "),a("li",{staticClass:"label_item wxapi_index_item"},[a("a",{staticClass:"label_inner",attrs:{href:"#menu-location"}},[t._v("地理位置接口")])]),t._v(" "),a("li",{staticClass:"label_item wxapi_index_item"},[a("a",{staticClass:"label_inner",attrs:{href:"#menu-webview"}},[t._v("界面操作接口")])]),t._v(" "),a("li",{staticClass:"label_item wxapi_index_item"},[a("a",{staticClass:"label_inner",attrs:{href:"#menu-scan"}},[t._v("微信扫一扫接口")])]),t._v(" "),a("li",{staticClass:"label_item wxapi_index_item"},[a("a",{staticClass:"label_inner",attrs:{href:"#menu-shopping"}},[t._v("微信小店接口")])]),t._v(" "),a("li",{staticClass:"label_item wxapi_index_item"},[a("a",{staticClass:"label_inner",attrs:{href:"#menu-card"}},[t._v("微信卡券接口")])]),t._v(" "),a("li",{staticClass:"label_item wxapi_index_item"},[a("a",{staticClass:"label_inner",attrs:{href:"#menu-pay"}},[t._v("微信支付接口")])])])])}]}}});
//# sourceMappingURL=63.bbd918c9ef03f13da109.js.map