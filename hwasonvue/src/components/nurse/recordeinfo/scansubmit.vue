
<template>
    <section class="wrap">
       <!-- <header>
            <div class="mianTitle">快递信息</div>
        </header>-->
        <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>
        <section class="scrollmycenter content">
            <div class="companyName">{{companyName}}</div>
            <div class="mention">请获取快递运单号</div>
            <div class="scan clearfix" v-on:click="ScanBarCode">
                <img src="../../../../static/img/nurse/sampling/scan.png" alt="" class="fl">
                <span class="fl">扫一扫</span>
            </div>
            <div class="scan clearfix" >
                <span class="fl">手动输入条码</span>
                <input type="text" class="fl" v-model="barcode":readonly="flag">
            <div class="ourieNumber clearfix" >
                <span class="fl">输入快递单号</span>
                <input type="text" class="fl" v-model="barcode" placeholder="在此手动输入快递单号">
            </div>
            <div class="codeBox">快递单号为: <span class="barCode">{{barcode}}</span></div>

             <div class="mention">请上传快单照片</div>
            <form id="uploadForm" enctype="multipart/form-data">
                <div class="upload">
                    <a href="javascript:;" class="clearfix personal_upload">
                        <label for="expressCode" class="personal_phopto fl">
                            <input type="file" ref="inputer" id="expressCode"  name="photo" accept="image/jpeg,image/jpg,image/png" capture="camera"  @change="getFile($event)">
                            <img class="img-responsive" :src="dataUrl" />
                        </label>
                    <div class="fl askUpload">{{photo_hint}} ></div>
                    </a>
                    <div class="submitImg2 fr" v-show="isShow" @click="submitForm($event)">上传</div>
                </div>
            </form>
            <div class="checkinfobtn" @click="onSubmit">提交</div>
                <!--<input type="button" value="" >-->
            </div>
        </section>
        <!--标题结束-->
        <alertTiming ref="alertTiming1" :content="alertContent">  </alertTiming>
    </section>
</template>
<script>
    import headerpart from '../../company/wechat/headerpart';
    import footerpart from '../footerpart';
    import Vue from 'vue'
    import {mapState,mapMutations} from 'vuex'
    import axios from 'axios'
    import alertTiming from '../../alertTiming';
    export default {
        data(){
            return {
                imgaddr0: "/static/img/return.png",
                title0:"快递信息",
                delivery_id:'',
                file:null,
                barcode:'',
                companyName:'',
                activity_id:'596f12951c2c2419145640ce',
                photo_hint:'请上传清晰快递单照片',
                dataUrl:'',
                isShow:false,
                myBlob:null,
                isUpload:false,
                alertContent:'',
                deliveryNo:"",
                flag:false

            }
        },
        mounted:function(){
            var vm = this;
            this.dataUrl="/wechat/nurse/getDeliveryPhoto?companyName="+this.companyInfo.companyName+"&activity_id="+this.activityInfo.activity_id;
            this.GetData();
            axios.get('/wechat/nurse/getDeliveryNo',{params:{_id:vm.activityInfo.activity_id,companyName:vm.companyInfo.companyName}})
                .then(function (response) {
                    console.log(response.data,11111111);
                    vm.deliveryNo = response.data.delivery_id;
                    if(vm.deliveryNo){
                        vm.barcode = vm.deliveryNo;
                        vm.flag = true;
                        vm.dataUrl = response.data.base64;
                        document.getElementById("expressCode").setAttribute("disabled","disabled")
                    }
                })

        },

        components:{
            headerpart,
            footerpart,
            alertTiming
        },
        computed:{
            ...mapState([
                'activityInfo',
                'companyInfo',
            ])
        },
        methods:{
            onSubmit(){
                let vm=this;
                if(!this.isUpload)  {
                    vm.alertContent = " 请先上传文件！";
                    vm.$refs.alertTiming1.Show();
                    return;
                }
                if(this.barcode == '')  {
                    vm.alertContent = " 请先扫描或录入快递单号！";
                    vm.$refs.alertTiming1.Show();
                    return;
                }
                axios.post('/wechat/nurse/recordeinfo/deliverInfo', {activity_id:this.activityInfo.activity_id,
                    delivery_id:this.barcode,activity_time:this.activityInfo.activity_time}
                )
                    .then(function (response) {
                        console.log(response);
                        if(response.data.result && response.data.result=="00"){
                            vm.alertContent = "  快递信息保存成功！";
                            vm.$refs.alertTiming1.Show();
                            setTimeout(function () {
                                window.history.go(-1);
                            },1200)

                        }
                        else {
                            vm.alertContent = response.data.name;
                            vm.$refs.alertTiming1.Show();
                        }

                    })
                    .catch(function (response) {
                        vm.alertContent = response;
                        vm.$refs.alertTiming1.Show();
                    });
            },
            //不用了
            imgPreview (file) {
                let self = this;
                // 看支持不支持FileReader
                if (!file || !window.FileReader) return;

                if (/^image/.test(file.type)) {
                    // 创建一个reader
                    var reader = new FileReader();
                    // 将图片将转成 base64 格式
                    reader.readAsDataURL(file);
                    // 读取成功后的回调
                    reader.onloadend = function () {
                        self.dataUrl = this.result;
                    }
                }
            },
            photoHandle(file){
                let vm=this;
                var img = file;

                // var image = vm.$refs.imgTag;
                var image= new Image();
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                image.onload = function () {
                    // console.log("image onload")
                    let w = image.naturalWidth,
                        h = image.naturalHeight;
                    let toSize = 1000;
                    // console.log("w=",w,"h=",h)
                    if(w<toSize ||h<toSize)
                        toSize =Math.max(w,h);

                    canvas.width = toSize;
                    canvas.height = toSize;

                    let w2 = toSize, h2 = toSize;
                    if (w > h) {
                        h2 = h / w * toSize;
                    } else {
                        w2 = w / h * toSize;
                    }

                    ctx.drawImage(image, 0, 0, w, h, 0, 0, w2, h2);
                    // ctx.drawImage(image,0,0,100,100,0,0,200,200);

                    vm.base64 = canvas.toDataURL('image/jpeg', 0.9 );
                    vm.myBlob=vm.dataURLtoBlob(vm.base64)

                }

                // 判断是否图片
                if (!img) {
                    return;
                }
                // 判断图片格式
                if (!(img.type.indexOf('image') == 0 && img.type && /\.(?:jpg|JPG|PNG|GIF|png|gif)$/.test(img.name))) {
                    alert('图片只能是jpg,gif,png');
                    return;
                }
                let reader = new FileReader();
                reader.readAsDataURL(img);

                reader.onload = function (e) { // reader onload start
                    //     console.log("reader.onload")
                    image.src=reader.result;

                     vm.dataUrl = reader.result;


                } // reader onload end

            },

            dataURLtoBlob(dataurl) {
                var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {type:mime});
            },


            getFile(event) {
                this.file = event.target.files[0];
                console.log(this.file);
                this.photoHandle(this.file);
                //  this.imgPreview(this.file);
                this.photo_hint="请点击上传"
                this.isShow=true;

            },

            submitForm(event){
                   let vm=this;
                    event.preventDefault();
                    let formData = new FormData();
                   // formData.append(' delivery_id', this.delivery_id);
//                  formData.append('activity_id', this.activityInfo.activity_id);
                 //   formData.append('activity_id', this.activity_id);
                  //  formData.append('file', this.file);

                //formData.append('companyName',vm.companyInfo.companyName);
                formData.append('activity_time',vm.activityInfo.activity_time);
                formData.append('file',vm.myBlob,vm.companyInfo.companyName+".jpg");

                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
               //  console.log(formData)
                axios.post('/wechat/nurse/recordeinfo/uploadDelivery', formData,config
                )
                    .then(function (response) {
                        console.log(response);
                        if(response.data=="ok")
                        {
                            vm.alertContent = " 文件上传成功！";
                            vm.$refs.alertTiming1.Show();
                            vm.isUpload=true;
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                        vm.alertContent = " 文件上传失败！";
                        vm.$refs.alertTiming1.Show();
                    });

            },
            ScanBarCode(){
                console.log('jinlaile');
                let vm=this;
                wx.scanQRCode({
                    needResult: 1,
                    desc: 'scanQRCode desc',
                    success: function (res) {
                        console.log('success')
                        vm.barcode=res.resultStr.split(',')[1]
                    }
                });
            },

    GetData(){
        let vm=this;
        let targetUrl=location.href.split("#")[0];
        console.log("get data:")
        axios({
            method:'get',
            url:'http://www.hwason.cn:8081/api/jssdk?url='+targetUrl,
            data:{
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(function(response){

            vm.init(response.data);


        }) .catch(function (response) {
            console.log("error response：")
            console.log(response);
        })
    },

    init(data){

        wx.config({
            debug: false,
            appId: data.appid,
            timestamp: data.timestamp,
            nonceStr: data.noncestr,
            signature: data.signature,
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'playVoice',
                'onVoicePlayEnd',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
            ]
        });

        wx.error(function (res) {
            alert(res.errMsg);
        });

    }
        }
    }
</script>
<style>
    .ourieNumber{
        height: 2.4rem;
        background: #fff;
        position:relative;
        margin-bottom:0.2rem;
    }
    .ourieNumber span{
        line-height: 2.4rem;
        position: absolute;
        font-size:0.7rem;
        top: 0;
        left:0.8rem;
    }
    .ourieNumber input{
        width: 65%;
        height: 100%;
        border:0;
        position:absolute;
        right:1rem;
        top:0;
    }
    .img-responsive {
        display: inline-block;
        height: 100%;
        max-width: 100%;
    }
    .scrollmycenter{
        height:26.7rem;
        overflow-y: auto;
    }
    #expressCode{
        display: none;
    }
    .personal_upload {
        height:4.15rem;
        display: block;
        background: #fff;
        border-top:1px solid #dcdcdc;
    }
    .personal_phopto{
        height:3.2rem;
        width:3.15rem;
        border-radius: 0.4rem;
        border:1px solid #dcdcdc;
        background: #f8f8f8;
        margin:0.45rem 1rem 0 1.05rem;
    }
    .personal_upload {
        line-height: 4.15rem;
        color:#999;
        height:4.15rem;
        display: block;
        background: #fff;
        border-top:1px solid #dcdcdc;
    }
 /*   .customerInfo{
        width:100%;
        height:13.5rem;
        background: #fff;
    }
    .customerInfo .customerTitle{
        text-align: center;
        font-size:0.7rem;
        padding:0.5rem 0 0.6rem;
    }
    .customerInfo .customerItem li{
        width:20%;
        float: left;
        text-align: center;
    }
    .userInfo{
        height: 8.5rem;
        overflow-y: auto;
    }*/
    .userInfo table{
        height:14rem;
        width:100%;
    }
    .userInfo table td{
        width:20%;
        text-align: center;
    }
    .statistics{
        color:#666;
        margin-left:1rem;
    }
    .statistics div{
        line-height: 1rem;
    }
    .statistics .sampleNum{
        color:#338fff;
    }
    .mention{
        padding-top:0.5rem;
        height:1.2rem;
        margin-left:0.75rem;
        color:#cd3939;
    }
    .upload{
        background: #fff;
        height:6rem;
        margin-bottom:1rem;
        position: relative;
    }
    .upload .expressBtn{
        font-size:0.7rem;
        display: block;
        height:2rem;
        line-height: 2rem;
        text-indent: 1rem;
    }
    .uploadBtn{
        width:16.65rem;
        height:2.25rem;
        display: block;
        color: #fff;
        text-align: center;
        line-height: 2.25rem;
        font-size:1rem;
        border:0;
        margin:0 auto 3.45rem;
        background: #d9d9d9;
    }
    .uploadImg{
        border-top:1px solid #dcdcdc;
        height:4.15rem;
        margin-left:0.8rem;
    }
    .uploadImg a{
        height: 3.2rem;
        width:3.2rem;
        margin-top:0.35rem;
        background: #f8f8f8;
        border:1px solid #dcdcdc;
        border-radius: 0.15rem;
    }
    .uploadImg .promptInfo{
        color:#999;
        font-size:0.7rem;
        line-height: 4.15rem;
        margin-left:7.5rem;
    }
    .scan{
        width:100%;
        height:2.5rem;
        background: #fff;
        border-top:1px solid #ecebeb;
        border-bottom:1px solid #ecebeb;
    }
    .scan img{
        height:1rem;
        width:1rem;
        margin:0.8rem 1rem;
    }
    .scan span{
        line-height: 2.5rem;
        color:#338fff;
        padding-left:0.5rem;
    }
    .scan input{
        width:50%;
        height:100%;
        margin-left:1rem;
        border:0;
        /*border:1px solid #dcdcdc;*/
    }
    .codeBox{
        color:#338fff;
        clear: both;
        padding:1rem 0 0 0.4rem;
        font-size:0.8rem;
    }
    .checkinfobtn{
        width:16.65rem;
        height:2.25rem;
        line-height: 2.25rem;
        color: #ffffff;
        font-size:1rem;
        margin:1.5rem auto 0;
        text-align: center;
        background: #338fff;
    }
    .submitImg2{
        position: absolute;
        right:1rem;
        top:2rem;
        padding:0.2rem 0.5rem;
        background: #338fff;
        color:#fff;
        margin:0 1rem;
        line-height: 1rem;
    }
</style>

