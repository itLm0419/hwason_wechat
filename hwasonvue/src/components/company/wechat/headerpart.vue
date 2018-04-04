<template>
<header>
  <ul class="clearfix">
    <li class="fl home">
      <!--<a href="javascript:;" v-on:click="goback" class="backBtn">
        <img v-bind:src="imgaddr" alt="加载失败" >
      </a>-->
      <div v-on:click="goback" class="backBtn">
        <img v-bind:src="imgaddr" alt="加载失败" >
      </div>
    </li>
    <li class="fl loginFont">{{title}}</li>
    <li class="fr reg">
      <span v-on:click="onMyClicking">{{edit}}</span>
       <!-- <a href="javascript:;" >
            <img src="/images/wechat/nurse/return.png" alt="">
        </a>-->
    </li>
  </ul>
</header>
</template>
<script>
  export default{
    data(){
      return {

      }
    },
    props: [
        'imgaddr',
         'title',
         'edit'
    ],
    methods: {
        goback: function() {
          this.$router.go(-1)
        },
      onMyClicking(){
        this.$emit('onMyClicking');
        console.log("onmy Clicking")
      }
    }
  }
</script>
<style>
  input::-webkit-input-placeholder{
    text-align: right;
  }
  header{
    position:fixed;
    width:100%;
    left:0;
    top:0;
    z-index: 200;
  }

  header,header ul{
    height: 2.2rem;
    background:#338fff;
  }
  header ul li{
    height: 100%;
    width:33.3%;
  }
  header .loginFont{
    text-align: center;
    line-height: 2.2rem;
  }
  header .mianTitle{
    color:#fff;
    font-size: 0.8rem;
    line-height: 2.2rem;
    width:100%;
    text-align: center;
  }
  header .home a{
    display: block;
    height: 2.2rem;
    width: 1.7rem;
  }
  header .home .backBtn{
    height: 2.2rem;
    width: 1.7rem;
    margin:0 0 0 1rem;
  }
  header .home img{
    height:1.2rem;
    width:1.4rem;
    margin:0.5rem 0 0 0;
  }
  header .pre img{
    /*height:1rem;
    width:0.6rem;*/
    height:1.2rem;
    width:1.4rem;
    margin:0.5rem 0 0 1.1rem;
  }
  header .loginFont{
    color:#fff;
    font-size: 0.75rem;
    line-height: 2.2rem;
  }
  header .reg span{
    display: block;
    height: 100%;
    width: 100%;
    text-indent: 4rem;
    font-size:0.7rem;
    line-height: 2.2rem;
    color:#fff;
  }
  .companyName{
    color:#338fff;
    height:1.65rem;
    font-size:0.7rem;
    line-height: 1.65rem;
    text-indent:0.75rem;
    background:#ecebeb ;
  }
  .companyName .mention{
    color:#cd3939;
    background: #ecebeb;
    padding-left:0.45rem;
  }

</style>
