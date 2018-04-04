<template>
  <section class="wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>
    <section class="">
      <a href="javascript:;" class="medicalPkgSave" v-on:click="medicalPkgSave">保存</a>
      <div class="companyName">中国人寿扬州分公司
            <span class="medicalMention" v-model="ifChoice">{{ifChoice}}</span>
      </div>
      <form action="" method="post">
        <dl class="medicalPkgChoice" v-for="(project,index) in allProjects">
          <dt class="clearfix" v-on:click="upOrDown(index)">
            <span class="fl">{{project.category}}检测套餐 </span>
           <span v-model="picked">{{picked[index]}}</span>
            <img v-bind:src="openOrClose"  alt="open" class="fr">
          </dt>
           <dd v-for="name1 in project.projects" v-show="isShow[index]" ><label><input type="radio"  v-bind:name="project.category" v-model="picked[index]" :value="name1">{{name1}}{{showOrHide}}</label></dd>
          <!--<dd v-for="name1 in project.projects" v-show="isShow[index]" ><label><input type="radio"  v-bind:name="project.category" v-model="picked" :value="name1">{{name1}}{{showOrHide}}</label></dd>-->
        </dl>
      </form>
    </section>
  </section>
</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import Vue from 'vue'
  import axios from 'axios'
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"体检套餐",
        ifChoice:'可进行多项选择',
        i:0,
        item:'ccvd',
        picked:[],
        showOrHide:'',
        isShow:[],
        openOrClose:'/static/img/examination/open.png',
        allProjects: [
          {category:"ccvd",
           projects:["ccvd5","ccvd8"]},
          {category:"tm",
            projects:["tm5","tm8"]}
        ]
      }
    },
    methods:{
      upOrDown(index){
          this.i=index;
          this.item=this.allProjects[this.i].category;
          this.showOrHide='asd  ';
          this.showOrHide=' ';
          this.isShow[this.i]= !this.isShow[this.i];
            if(this.isShow[this.i]){
              this.openOrClose="/static/img/examination/close.png"
            }else{
              this.openOrClose="/static/img/examination/open.png"
            }
      },
      getProjects(){
        let vm=this;
//        let showval= document.URL.split('?')[1].split("=")[1];
        axios.get( '/wechat/examination/getProjects',{
         params: {
//           _id: showval;
         }
       })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      medicalPkgSave(){
          if(this.picked.toString().split(',').join('+')){
            window.location.href="#/examinationNext?getNum="+this.picked.toString().split(',');
          }else{
            this.ifChoice="请选择您需要的套餐或返回上一级！"
          }
        console.log()
      }
    },
    mounted:function(){
      this.getProjects();
    },
    created:function(){
//          GetTodayActivity();
    },
    computed:{
      pkg:function(){
         return "package"+this.i;
      }
    },
    components:{
      headerpart,
  }
  }
</script>
<style>
  .medicalPkgSave{
    height:2.2rem;
    width:3rem;
    display:block ;
    position: absolute;
    right:0;
    top:0;
    text-align: center;
    line-height: 2.2rem;
    font-size:0.6rem;
    color:#fff;
  }
  .medicalPkgChoice{
    padding:0 0.8rem;
    background: #fff;
  }
  .medicalMention{
    color:#cd3939;
    padding-left:0.5rem;
  }
  .medicalPkgChoice dt{
    height:2.25rem;
    border-bottom:1px solid #dcdcdc;
  }
  .medicalPkgChoice dd{
    height:2.25rem;

  }
  .medicalPkgChoice dd input{
    width: 1.1rem;
    height: 1.1rem;
    margin:0.525rem 0.9rem 0 0;
  }
  .medicalPkgChoice dd label{
    color:#333;
    font-size:0.7rem;
  }
  .medicalPkgChoice dt span{
    color:#333;
    font-size:0.7rem;
    line-height: 2.25rem;
  }
  .medicalPkgChoice dt a{
    display: block;
    width: 1.1rem;
    height: 1.1rem;
  }
  .medicalPkgChoice dt img{
    width: 1.1rem;
    height: 1.1rem;
    margin-top:0.55rem;
  }
</style>
