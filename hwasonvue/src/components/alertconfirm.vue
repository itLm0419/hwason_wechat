<template>
  <div :class="startClass">
    <div class="alertConfirm">
        <div>{{content}}</div>
        <div>{{content2}} <span class="specFont">{{content3}}</span></div>
        <div>{{content4}}</div>
       <div class="clearfix">
         <a href="javascript:;" class="componentConfirmBtn fr" v-on:click="alertConfirm">确定</a>
       </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  export default {
    data(){
      return {
        startClass:'alertConfirmBg hideAlertMsg',
      }
    },
    mounted:function(){
        console.log(this.startClass)
    },
    created:function(){

    },
    props:[ 'content','content2','content3','content4'] ,
    methods:{

        Show(){
            let vm=this;
            vm.startClass='alertConfirmBg';
            console.log("vm.content",vm.content);

        },

        alertConfirm(){
          this.startClass='alertConfirmBg hideAlertMsg';
          this.$emit('onAlertConfirming');
        },
    }
  }
</script>
<style>
  .hideAlertMsg{
    display: none;
  }
  .alertConfirmBg{
    /*display: none;*/
    position: absolute;
    left:0;
    top:0;
    width: 18.75rem;
    height:33.35rem;
    background: rgba(0,0,0,0.2);
  }
  .specFont{
      color:#338fff;
      font-size:1rem;
      font-weight: bold;
  }
  .alertConfirm{
    position: absolute;
    left:50%;
    top:50%;
    border-radius:0.4rem ;
    margin-top:-5rem;
    margin-left:-7.5rem;
    width: 15rem;
    background: #fff;
    color:#000;
    font-size:0.8rem;
    padding:1rem  0  1rem  1rem;
  }
  .componentConfirmBtn{
    height:1rem;
    width:2rem;
    color:#fff;
    text-align: center;
    line-height: 1rem;
    background: #338fff;
    border-radius: 0.1rem;
    margin:2rem 2rem 0;
  }
</style>
