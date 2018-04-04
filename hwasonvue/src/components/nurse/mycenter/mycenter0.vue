<template>
  <section class="wrap">
    <header>
      <!--<div class="mianTitle">个人中心</div>-->
      <ul class="clearfix">
        <li class="fl"></li>
        <li class="fl loginFont">个人中心</li>
        <li class="fr"><a href="javascript:;" class="edit" v-on:click="onSubmit">{{edit0}}</a></li>
      </ul>
    </header>
    <!--标题结束-->
    <!--<headerpart :imgaddr="imgaddr0" :title="title0" :edit="edit0" v-on:onMyClicking1="onSubmit"></headerpart>-->
    <section class="scrollmycenter content">
        <form id="photo" enctype="multipart/form-data">
      <div class="personalTitle">头像信息</div>
      <div class="clearfix personal_upload">
        <!--<span class="personal_phopto fl"></span>-->
        <label for="personal_phopto" class="personal_phopto fl">
          <input type="file" id="personal_phopto"  name="personal_photo"  accept="image/jpeg,image/jpg,image/png" capture="camera" @change="getFile($event)">
            <!--<img class="img-responsive" src="/wechat/nurse/getphoto"   alt="点击上传"/>-->
            <img class="img-responsive" :src="dataUrl" />
        </label>
        <div class="fl askUpload">< {{photo_hint}}</div>
        <div class="submitImg fr" v-show="isShow" @click="submitForm($event)">上传</div>
      </div>
     </form>
      <div class="personalTitle">个人资料</div>
      <ul class="personal_data getImg">
          <li class="clearfix">
              <img src="/static/img/nurse/mustIcon.png" class="fl" alt="" v-show="isModify">
             <!--<img v-if="isModify" src="/static/img/nurse/mustIcon.png" class="fl" alt="">-->
            <div class="fl">真实姓名</div>
            <input type="text" class="fr" v-model="realName" v-bind:readonly="!isModify">
          </li>
          <li class="clearfix">
              <img src="/static/img/nurse/mustIcon.png" class="fl" alt="" v-show="isModify">
             <!--<img v-if="isModify" src="/static/img/nurse/mustIcon.png" class="fl" alt="">-->
            <div class="fl">身份证号</div>
            <input type="text" class="fr" v-model="IDNo" v-bind:readonly="!isModify">
          </li>
          <li class="clearfix">
              <img src="/static/img/nurse/mustIcon.png" class="fl" alt="" v-show="isModify">
            <div class="fl">性别</div>
            <input type="text" class="fr" v-model="sex" v-bind:readonly="!isModify">
          </li>
          <li class="clearfix">
              <img src="/static/img/nurse/mustIcon.png" class="fl" alt="" v-show="isModify">
            <div class="fl">联系电话</div>
            <input type="text" class="fr" v-model="tel" v-bind:readonly="!isModify">
          </li>
          <li class="clearfix">
              <img src="/static/img/nurse/mustIcon.png" class="fl" alt="" v-show="isModify">
            <div class="fl">所在地区</div>
            <input type="text" class="fr" v-model="region" v-bind:readonly="!isModify">
          </li>
          <li class="clearfix">
              <img src="/static/img/nurse/mustIcon.png" class="fl" alt="" v-show="isModify">
            <div class="fl">职务</div>
            <input type="text" class="fr" v-model="post" v-bind:readonly="!isModify">
          </li>
          <li class="clearfix">
              <img src="/static/img/nurse/mustIcon.png" class="fl" alt="" v-show="isModify">
            <div class="fl">单位名称</div>
            <input type="text" class="fr" v-model="unit_name" v-bind:readonly="!isModify">
          </li>
          <li class="clearfix cutBorder">
              <img src="/static/img/nurse/mustIcon.png" class="fl" alt="" v-show="isModify">
            <div class="fl">从业资格证</div>
            <input type="text" class="fr" v-model="certificate_No" v-bind:readonly="!isModify">
          </li>
        </ul>
        <form id="uploadForm" enctype="multipart/form-data">
        <div class="clearfix personal_upload">
          <label for="work_photo" class="work_photo fl">
            <input type="file" id="work_photo"  name="work_photo" @change="getFile2($event)">
              <img  ref="imgTag" class="img-responsive" :src="dataUrl2" />

          </label>
          <!--<label for="work_photo" class="work_photo fl">-->

          <!--</label>-->
          <div class="fl askUpload">< {{work_photo_hint}} ></div>
          <div class="submitImg fr" v-show="isShow2" @click="submitForm2($event)">上传</div>
        </div>
       </form>

        <div class="personalTitle">银行信息</div>
        <ul class="bank_data getImg">
          <li class="clearfix">
              <img src="/static/img/nurse/mustIcon.png" class="fl" alt="" v-show="isModify">
            <div class="fl">持卡人</div>
            <input type="text" class="fr" v-model="cardholder" v-bind:readonly="!isModify">
          </li>
          <li class="clearfix">
              <img src="/static/img/nurse/mustIcon.png" class="fl" alt="" v-show="isModify">
            <div class="fl">所属银行</div>
            <input type="text" class="fr" v-model="owned_bank" v-bind:readonly="!isModify">
          </li>
          <li class="clearfix">
              <img src="/static/img/nurse/mustIcon.png" class="fl" alt="" v-show="isModify">
            <div class="fl">银行卡号</div>
            <input type="text" class="fr" v-model="card_number" v-bind:readonly="!isModify">
          </li>
          <li class="clearfix cutBorder">
              <img src="/static/img/nurse/mustIcon.png" class="fl" alt="" v-show="isModify">
            <div class="fl">开户行</div>
            <input type="text" class="fr" v-model="open_bank" v-bind:readonly="!isModify">
          </li>
        </ul>
        </ul>
      </form>
    </section>
    <!--标题结束-->
    <footerpart></footerpart>
    <alertTiming ref="alertTiming1" :content="alertContent">  </alertTiming>
  </section>
</template>
<script>
  import headerpart from '../../company/wechat/headerpart';
  import footerpart from '../footerpart';
  import Vue from 'vue';
  import {mapState,mapMutations} from 'vuex';
  import  axios from 'axios'
  import alertTiming from '../../alertTiming';

  export default {
    data(){
      return {
       dataUrl:'',
       dataUrl2:'',
        imgaddr0: "/static/img/return.png",
        title0:"个人中心",
        edit0:'编辑',
        alertContent:'',
        isComplete:false,
        realName:'',
        IDNo:'',
        sex:'',
        tel:'',
        address:'',
        region:'',
        cardholder:'',
        owned_bank:'',
        card_number:'',
        open_bank:'',
        certificate_No:'',
        unit_name:'',
        certificate_file:'',
        photo_file:'',
        post:'',
        work_photo_hint:'请上传清晰从业资格证',
        photo_hint:'请上传清晰头像',
        isShow:false,
        isShow2:false,
        base64:'',
        myBlob:null,
        isModify:false


      }
    },
    mounted:function(){

      this.getNurseInfo()
    },
    created:function(){
    },
    computed: {
      ...mapState([
        'nurseTel'
      ])
    },
    components:{
      headerpart,
      footerpart,
     alertTiming
    },
    methods:{

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
        //不用了
        imgPreview2 (file) {
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
                    self.dataUrl2 = this.result;
                }
            }
        },

        photoHandle(file,tag){
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
                if(tag=='id')
                  vm.dataUrl = reader.result;
                else
                   vm.dataUrl2 = reader.result;

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

            this.photoHandle(this.file,'id');
          //  this.imgPreview(this.file);
            this.photo_hint="请点击上传"
            this.isShow=true;

        },
        getFile2(event) {
            this.file2 = event.target.files[0];
            console.log(this.file2,'work');
            this.photoHandle(this.file2,this.dataUrl2);
            this.work_photo_hint="请点击上传"
            this.isShow2=true;
        },

        submitForm(event){
           let vm=this;
            event.preventDefault();
            let formData = new FormData();
           // let myBlob= new Blob([vm.base64],{type:"image/jpeg"});

           //  console.log(vm.myBlob)
            formData.append('abc',"abc");
            formData.append('personal_photo',vm.myBlob,vm.realName+".jpg");
            // formData.append('personal_photo', this.file);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            //console.log(formData)
            axios.post('/wechat/nurse/uploadphoto', formData,config
            )
                .then(function (response) {
                    console.log(response);
                    vm.photo_hint="上传完成"
                })
                .catch(function (response) {
                    console.log(response);
                });

        },
        submitForm2(event){
            let vm=this;
            event.preventDefault();
            let formData = new FormData();
            // formData.append(' delivery_id', this.delivery_id);
//                  formData.append('activity_id', this.activityInfo.activity_id);
            //   formData.append('activity_id', this.activity_id);
          //  formData.append('file', this.file2);
            formData.append('file',vm.myBlob,vm.realName+".jpg");


            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            console.log(formData)
            axios.post('/wechat/nurse/uploadworkphoto', formData,config
            )
                .then(function (response) {
                   vm.work_photo_hint="上传完成"
                  //  console.log(response);
                })
                .catch(function (response) {
                 //   console.log(response);
                });

        },
      getNurseInfo(){
          let vm=this;
        axios.get('/wechat/nurse/myCenter')
          .then(function (response) {
            //  console.log("response：")
           //   console.log(response.data)

              vm.tel= response.data.tel;
              vm.realName=response.data.realName;
              vm.IDNo=response.data.IDNo;
              vm.sex=response.data.sex;
              vm.region=response.data.region;
              vm.cardholder=response.data.cardholder;
              vm.owned_bank=response.data.owned_bank;
              vm.card_number=response.data.card_number;
              vm.open_bank=response.data.open_bank;
              vm.post=response.data.post;
              vm.unit_name=response.data.unit_name;
              vm.certificate_No=response.data.certificate_No;
              vm.certificate_file=response.data.certificate_file;
              vm.photo_file=response.data.photo_file;


              vm.dataUrl="/wechat/nurse/getPhoto?userName="+vm.realName;
              vm.dataUrl2="/wechat/nurse/getWorkPhoto?userName="+vm.realName;

            })
            .catch(function (response) {
             // console.log("error response：")
            //  console.log(response);
            })
      },
      onSubmit(){

          if (this.isModify) {
              let vm = this;
              axios.post('/wechat/nurse/myCenter_Save', {
                  tel: vm.tel,
                  realName: vm.realName,
                  IDNo: vm.IDNo,
                  sex: vm.sex,
                  region: vm.region,
                  cardholder: vm.cardholder,
                  owned_bank: vm.owned_bank,
                  card_number: vm.card_number,
                  open_bank: vm.open_bank,
                  post: vm.post,
                  unit_name: vm.unit_name,
                  certificate_No: vm.certificate_No,
                  certificate_file: vm.certificate_file,
                  photo_file: vm.photo_file

              })
                  .then(function (response) {

                      vm.edit0 ="编辑";
                      vm.isModify=false;
                      if(response.data.result=="00") {
                          vm.alertContent = "修改成功";
                          vm.$refs.alertTiming1.Show();

                      }
                      else {
                          vm.alertContent = response.data.name;
                          vm.$refs.alertTiming1.Show();

                      }


                  })
                  .catch(function (response) {
                     // console.log(response);

                      vm.alertContent = response;
                      vm.$refs.alertTiming1.Show();
                  });
          }
          else {
              this.edit0 ="保存";
              this.isModify=true;

          }

      }
    }

  }
</script>
<style>
  .img-responsive {
    display: inline-block;
    height: 100%;
    max-width: 100%;
  }
  .scrollmycenter{
    height:26.7rem;
    overflow-y: auto;
  }
  .edit{
    color:#fff;
    display: block;
    text-align: center;
    line-height:2.3rem;
      font-size:0.7rem;
  }
  .personalTitle{
    height:2.4rem;
    background: #ebebeb;
    border-top:0.05rem solid #dcdcdc;
    padding-left:1.05rem;
    color:#999;
    font-size:0.7rem;
    line-height: 2.4rem;
  }
  .personal_upload {
    position:relative;
    /*height:4.15rem;*/
    display: block;
    background: #fff;
    border-top:1px solid #dcdcdc;
  }
  #personal_phopto,#work_photo{
    display: none;
  }
  .personal_upload .personal_phopto, .personal_upload .work_photo{
    height:3.2rem;
    width:3.15rem;
    border-radius: 0.4rem;
    border:1px solid #dcdcdc;
    background: #f8f8f8;
    margin:0.45rem 1rem 0 1.05rem;
  }
  .personal_upload .askUpload{
    line-height: 4.15rem;
    color:#999;
  }
  .personal_data{
    background: #fff;
    height:21rem;
    padding: 0 0.8rem;
  }
  .personal_data li,.bank_data li{
    height:2.5rem;
    border-bottom:1px solid #dcdcdc;
  }
  .personal_data li.cutBorder,.bank_data li.cutBorder{
    border:0;
  }
  .personal_data div,.bank_data div{
    line-height: 2.5rem;
    color:#333;
    font-size:0.7rem;
  }
  .personal_data input,.bank_data input{
    height:2.5rem;
    width:70%;
    margin-left:1rem;
    border:0;
  }
  .bank_data{
    background: #fff;
    height:11.25rem;
    padding: 0 0.8rem;
    margin-bottom:1rem;
  }
  .getImg li img{
      height: 0.45rem;
      width: 0.45rem;
      margin: 1rem 0.2rem 0 0
  }
    .submitImg{
        position:absolute;
        right:1rem;
        top:1.5rem;
        padding:0.2rem 0.5rem;
        background: #338fff;
        color:#fff;
        z-index: 10;
        line-height: 1rem;
    }
    /*灰色的按钮*/
  .submitImgGray{
      background: #ccc;
  }
</style>
