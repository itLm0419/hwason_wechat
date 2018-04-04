<template>
  <div v-show="isShow" class="sales_choiceActivityBg">
    <div class="sales_choiceActivity">
      <ul>
        <li class="clearfix" v-for="(item,index) in items">
          <input type="radio" name="activity" class="fl"  v-model="picked" v-on:change="Selected(index)" v-on:focus="Selected2 "  v-bind:value="index">
          <span class="fl">{{item}}</span>
        </li>

      </ul>
    </div>
  </div>
</template>
<script>


  import Vue from 'vue'

  export default {
    data(){
      return {

        items: [],
        picked:'',
        isShow:false
      }
    },
    created: function () {
//
    },
    components: {},

    methods: {

      Selected(index){

   this.$emit('onSelected',index);

      },
      Selected2(){

        this.$emit('onSelected2');
      }
    }
  }


</script>
<style>
  .sales_choiceActivityBg{
    /*display: none;*/
    position: absolute;
    left:0;
    top:0;
    width: 18.75rem;
    height:33.35rem;
    background: rgba(0,0,0,0.2);
  }
  .sales_choiceActivity{
    position: absolute;
    left:50%;
    top:50%;
    margin-top:-5rem;
    margin-left:-7.5rem;
    width: 15rem;
    background: #fff;
    padding:1rem  0  1rem  1rem;
  }
  .sales_choiceActivity ul li span{
    margin-top:0.7rem;
    /*line-height: 1.1rem;*/
  }
  .sales_choiceActivity ul li input{
    width: 1.1rem;
    height: 1.1rem;
    margin:0.525rem 0.9rem 0 0;
  }


  .activitymodify{
    margin-right:0.6rem;
    width: 2rem;
    height:1.2rem;
    display: block;
    background: #338fff;
    color:#fff;
    font-size:0.6rem;
    line-height: 1.2rem;
    text-align: center;
    border-radius: 0.2rem;
  }
</style>
