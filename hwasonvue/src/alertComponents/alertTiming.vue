<template>
  <div :class="startClass">
    <div class="alertConfirm">
      <div>content</div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  export default {
    data(){
      return {
        startClass:'alertConfirmBg',
      }
    },
    mounted:function(){
        let vm=this;
        setTimeout(function(){
          vm.startClass='alertConfirmBg hideAlertMsg';
        },3000);
    },
    created:function(){

    },
    methods:{

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
  .alertConfirm{
    position: absolute;
    left:50%;
    top:50%;
    margin-top:-5rem;
    margin-left:-7.5rem;
    width: 15rem;
    background: #fff;
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
