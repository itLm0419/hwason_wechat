<template>
  <footer>
    <div class="nav clearfix">
      <a  href="javascript:;" to="/nurse/sampling" v-bind:class="{'active':Selected1}" @click="ShowSelected1">
        <img src="/static/img/nurse/sampling.png" alt="">
        <div class="sortNmae">采样</div>
      </a>
     <a  href="javascript:;" to="/nurse/recordeinfo" v-bind:class="{'active':Selected2}" @click="ShowSelected2">
       <img src="/static/img/nurse/recordedinfo.png" alt="">
       <div class="sortNmae">已采样 </div>
     </a>
      <a  href="javascript:;" to="/nurse/instruction" v-bind:class="{'active':Selected3}" @click="ShowSelected3">
        <img src="/static/img/nurse/instructions.png" alt="">
        <div class="sortNmae">操作指南</div>
      </a>
      <a  href="javascript:;" to="/nurse/mycenter" v-bind:class="{'active':Selected4}" @click="ShowSelected4">
        <img src="/static/img/nurse/personcenter.png" alt="">
        <div class="sortNmae">个人中心</div>
      </a>
    </div>
  </footer>
</template>
<script>
    import {mapState,mapMutations} from 'vuex'
    export default{
        data(){
            return {
                Selected1:true,
                Selected2:false,
                Selected3:false,
                Selected4:false



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

                let footerInfo={};
                footerInfo.Selected1=true;
                footerInfo.Selected2=false;
                footerInfo.Selected3=false;
                footerInfo.Selected4=false;
                this.RECORD_FOOTERINFO(footerInfo)
                this.$router.push('/nurse/sampling')



            },
            ShowSelected2(){
                this.Selected2=true;
                this.Selected1=false;
                this.Selected3=false;
                this.Selected4=false;
                let footerInfo={};
                footerInfo.Selected2=true;
                footerInfo.Selected1=false;
                footerInfo.Selected3=false;
                footerInfo.Selected4=false;
                this.RECORD_FOOTERINFO(footerInfo)
                this.$router.push('/nurse/recordeinfo')


            },
            ShowSelected3(){
                this.Selected3=true;
                this.Selected1=false;
                this.Selected2=false;
                this.Selected4=false;
                let footerInfo={};
                footerInfo.Selected3=true;
                footerInfo.Selected1=false;
                footerInfo.Selected2=false;
                footerInfo.Selected4=false;
                this.RECORD_FOOTERINFO(footerInfo)
                this.$router.push('/nurse/instruction')


            },
            ShowSelected4(){
                this.Selected4=true;
                this.Selected2=false;
                this.Selected3=false;
                this.Selected1=false;
                let footerInfo={};
                footerInfo.Selected4=true;
                footerInfo.Selected1=false;
                footerInfo.Selected2=false;
                footerInfo.Selected3=false;
                this.RECORD_FOOTERINFO(footerInfo)
                this.$router.push('/nurse/mycenter')


            },

            goback: function() {
                this.$router.go(-1)
            },

        }
    }
</script>
<!--<style>
  footer nav,footer .nav{
    display:-webkit-box;
  }
  footer nav a,footer .nav a{
    -webkit-box-flex:1;
    height: 2.45rem;
    display: block;
    background: #393b40;
    text-align: center;
  }

  footer nav a.active,footer .nav a.active{
    background: #338fff;;
  }
  footer nav a img,footer .nav a img{
    height: 1.1rem;
    width: 1.1rem;
    margin:0.25rem 0 0;
  }
  footer nav a .sortNmae,footer .nav a .sortNmae{
    color:#fff;
    font-size:0.45rem;
  }
</style>-->
<style>
  footer{
    width:100%;
    position:fixed;
    left:0;
    bottom:0;
  }
  footer .nav{
    display:-webkit-box;
  }
  footer .nav a{
    -webkit-box-flex:1;
    height: 2.45rem;
    display: block;
    background: #393b40;
    text-align: center;
  }
  footer .nav a.active{
    background: #338fff;;
  }
  footer .nav a img{
    height: 1.1rem;
    width: 1.1rem;
    margin:0.25rem 0 0;
  }
  footer .nav a .sortNmae{
    color:#fff;
  }
</style>
