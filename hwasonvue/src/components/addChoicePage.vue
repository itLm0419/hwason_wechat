<template>
  <section class="wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>
    <section class="">
      <div class="companyName">中国人寿扬州分公司</div>
      <div class="salesman_choiceActivities">
        <div class="salesman_choiceOneActivities">请选择活动场次</div>
           <ul class="salesman_choiceActivity">
             <li class="clearfix">
               <input type="radio" name="item" class="fl">
               <span class="fl">1</span>
             </li>
             <li class="clearfix">
               <input type="radio" name="item" class="fl">
               <span class="fl">2</span>
             </li>
           </ul>
      </div>
    </section>
  </section>
</template>
<script>
  import headerpart from './company/wechat/headerpart';
  import Vue from 'vue'
  import axios from 'axios'
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"选择活动场次",
      }
    },
    mounted:function(){
    },
    created:function(){

    },
    components: {
      headerpart,
    },
    methods:{

    }
  }
</script>
<style>
.salesman_changeBg{
  background: #fff;
}
.salesman_choiceActivities{
  background: #fff;
  padding:1rem;
}
  .salesman_choiceOneActivities{
    padding-left:1rem;
    font-size:0.6rem;
  }
.salesman_choiceActivity{
  margin:1rem;
}
.salesman_choiceActivity li{
    width: 5rem;
    height:1.6rem;
}
  .salesman_choiceActivity li input{
    display: block;
    width:0.6rem;
    height:0.6rem;
  }
.salesman_choiceActivity li span{
  font-size:0.6rem;
  padding-left:0.5rem;
}

</style>
