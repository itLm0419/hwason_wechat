<template>
  <div v-bind:class="startClass">
    <div class="alertConfirm">
      <div>{{content}}</div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'

  export default {
    data(){
      return {
        startClass:'alertConfirmBg',

      }
    },
      props:[ 'content'] ,
    mounted:function(){

      this.startClass='alertConfirmBg hideAlertMsg';
     // this.startClass='alertConfirmBg';

    },
    created:function(){

    },
    methods:{
      Show:function(){
          let vm=this;
        vm.startClass='alertConfirmBg';
        setTimeout(function(){
         vm.startClass='alertConfirmBg hideAlertMsg';

        },2000);

      }

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
    /*background: rgba(0,0,0,0.2);*/
  }
  .alertConfirm{
    position: absolute;
    left:50%;
    top:50%;
    border-radius: 0.25rem;
    margin-top:-5rem;
    margin-left:-5rem;
    width: 10rem;
    background: rgba(0,0,0,0.7);
    color:#fff;
    padding:1rem  0 ;
    text-align: center;
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
