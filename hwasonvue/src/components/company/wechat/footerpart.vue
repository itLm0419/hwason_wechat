<template>
<footer>
  <nav class="clearfix">
      <!--<router-link to="/company/activityinfo" v-bind:class="{'active':Selected1}" @click.native="ShowSelected1">-->
      <!--<img src="/static/img/company/wechat/msg.png" alt="">-->
      <!--<div class="sortNmae">活动咨讯</div>-->
      <!--</router-link>-->
      <!--<router-link to="/company/activity" v-bind:class="{'active':Selected2}" @click.native="ShowSelected2">-->
      <!--<img src="/static/img/company/wechat/activity.png" alt="" >-->
      <!--<div class="sortNmae">活动行事 </div>-->
      <!--</router-link>-->
     <!--<router-link to="/company/samplepkg" v-bind:class="{'active':Selected3}" @click.native="ShowSelected3">-->
      <!--<img src="/static/img/company/wechat/package.png" alt="" >-->
      <!--<div class="sortNmae">检测包</div>-->
     <!--</router-link>-->
     <!--<router-link to="/company/samplelist"  v-bind:class="{'active':Selected4}" @click.native="ShowSelected4">-->
      <!--<img src="/static/img/company/wechat/demo.png" alt="">-->
      <!--<div class="sortNmae">样本跟踪</div>-->
      <!--</router-link>-->
      <!--<router-link to="">-->
      <!--<img src="/static/img/company/wechat/dload.png" alt="">-->
      <!--<div class="sortNmae">二维码下载</div>-->
      <!--</router-link>-->

      <a  href="javascript:;" v-bind:class="{'active':Selected1}" @click="ShowSelected1">
        <img src="/static/img/company/wechat/msg.png" alt="">
        <div class="sortNmae">今日活动</div>
      </a>
      <!--<a href="javascript:;"></a>-->
      <a  href="javascript:;" v-bind:class="{'active':Selected2}" @click="ShowSelected2">
        <img src="/static/img/company/wechat/activity.png" alt="" >
        <div class="sortNmae">活动行事历 </div>
      </a>
      <a href="javascript:;" v-bind:class="{'active':Selected3}" @click="ShowSelected3">
        <img src="/static/img/company/wechat/package.png" alt="" >
        <div class="sortNmae">检测包</div>
      </a>
      <a href="javascript:;" v-bind:class="{'active':Selected4}" @click="ShowSelected4">
        <img src="/static/img/company/wechat/demo.png" alt="">
        <div class="sortNmae">样本跟踪</div>
      </a>
      <a href="javascript:;" v-bind:class="{'active':Selected5}" @click="ShowSelected5">
        <img  src="/static/img/company/wechat/healthRec.png" alt="">
        <div class="sortNmae">健康档案</div>
      </a>
  </nav>
</footer>
<!--<router-view> </router-view>-->
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    export default{
        data(){
            return {
                Selected1:true,
                Selected2:false,
                Selected3:false,
                Selected4:false,
                Selected5:false,



            }

        },
        computed: {
            ...mapState([
                'footerInfo'
            ])
        },
        mounted:function(){
            console.log("footerInfo",this.footerInfo)
            if(this.footerInfo ==null)
            {}
            else {
             this.Selected1=this.footerInfo.Selected1;
             this.Selected2=this.footerInfo.Selected2;
             this.Selected3=this.footerInfo.Selected3;
             this.Selected4=this.footerInfo.Selected4;
             this.Selected5=this.footerInfo.Selected5;
            }

        },
        methods: {
            ...mapMutations([
                'RECORD_FOOTERINFO'


            ]),
            ShowSelected1(){
               this.Selected1=true;
               this.Selected2=false;
               this.Selected3=false;
               this.Selected4=false;
               this.Selected5=false;

               let footerInfo={};
               footerInfo.Selected1=true;
               footerInfo.Selected2=false;
               footerInfo.Selected3=false;
               footerInfo.Selected4=false;
               footerInfo.Selected5=false;
              this.RECORD_FOOTERINFO(footerInfo)
               this.$router.push('/company/activityinfo')
                console.log("footerInfo2",this.footerInfo)


            },
            ShowSelected2(){
                this.Selected2=true;
                this.Selected1=false;
                this.Selected3=false;
                this.Selected4=false;
                this.Selected5=false;
                let footerInfo={};
                footerInfo.Selected2=true;
                footerInfo.Selected1=false;
                footerInfo.Selected3=false;
                footerInfo.Selected4=false;
                footerInfo.Selected5=false;
                this.RECORD_FOOTERINFO(footerInfo)
                this.$router.push('/company/activity')
                console.log("footerInfo2",this.footerInfo)

            },
            ShowSelected3(){
                this.Selected3=true;
                this.Selected1=false;
                this.Selected2=false;
                this.Selected4=false;
                this.Selected5=false;
                let footerInfo={};
                footerInfo.Selected3=true;
                footerInfo.Selected1=false;
                footerInfo.Selected2=false;
                footerInfo.Selected4=false;
                footerInfo.Selected5=false;
                this.RECORD_FOOTERINFO(footerInfo)
                this.$router.push('/company/samplepkg')
                console.log("footerInfo2",this.footerInfo)

            },
            ShowSelected4(){
                this.Selected4=true;
                this.Selected2=false;
                this.Selected3=false;
                this.Selected1=false;
                this.Selected5=false;
                let footerInfo={};
                footerInfo.Selected4=true;
                footerInfo.Selected1=false;
                footerInfo.Selected2=false;
                footerInfo.Selected3=false;
                footerInfo.Selected5=false;
                this.RECORD_FOOTERINFO(footerInfo)
                this.$router.push('/company/samplelist')
                console.log("footerInfo2",this.footerInfo)

            },
            ShowSelected5(){
                this.Selected5=true;
                this.Selected2=false;
                this.Selected3=false;
                this.Selected1=false;
                this.Selected4=false;
                let footerInfo={};
                footerInfo.Selected5=true;
                footerInfo.Selected1=false;
                footerInfo.Selected2=false;
                footerInfo.Selected3=false;
                footerInfo.Selected4=false;
                this.RECORD_FOOTERINFO(footerInfo)
                this.$router.push('/company/healthRecords')
                console.log("footerInfo2",this.footerInfo)

            },

            goback: function() {
                this.$router.go(-1)
            },

        }
    }

</script>
<style>
  footer{
    position:fixed;
    width:100%;
    /*height:100%;*/
    left: 0;
    bottom:0;
  }
  footer nav{
    display:-webkit-box;
  }
  footer nav a{
    -webkit-box-flex:1;
    height: 2.45rem;
    display: block;
    background: #393b40;
    text-align: center;
    color:#fff;
    font-size:1rem;
  }
  footer nav a .sortNmae{
    color:#fff;
  }
  footer nav a.active{
    background: #338fff;
    color:#fff;
  }
  footer nav a img{
    height: 1.1rem;
    width: 1.1rem;
    margin:0.25rem 0 0;
  }

</style>
