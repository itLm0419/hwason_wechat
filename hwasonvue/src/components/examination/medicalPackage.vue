<template id="project">
  <!--<section class="wrap" id="tmp">-->
    <section class="wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>
    <section class="content">
        <div class="content2"></div>
      <a href="javascript:;" class="medicalPkgSave" v-on:click="medicalPkgSave">保存</a>
      <div class="companyName">{{companyName}}
            <span class="medicalMention" v-model="ifChoice">{{ifChoice}}</span>
      </div>
      <form action="" method="post">
        <dl class="medicalPkgChoice" v-for="(project,index) in allProjects.category">
          <dt class="clearfix" v-on:click="upOrDown(index)">
            <span class="fl">{{project}}检测套餐</span>
           <span v-model="picked">{{picked[index]}}</span>
            <img v-bind:src="openOrClose"  alt="open" class="fr">
          </dt>
           <dd v-for="name1 in allProjects.projects[index]" v-show="isShow[index]" ><label><input type="radio"  v-bind:name="project" v-model="picked[index]" :value="name1">{{name1}}{{showOrHide}}</label></dd>
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

  import {mapState,mapMutations} from 'vuex'

  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"体检套餐",
        companyName:'',
        ifChoice:'可进行多项选择',
        i:0,
        item:'ccvd',
        picked:[],
        showOrHide:'',
        isShow:[],
        openOrClose:'/static/img/examination/open.png',
        allProjects: {
          category:[],
          projects:[[]]
        },


      }
    },
    computed: {
      ...mapState([
        'activity_id',
        'user_id',
        'companyInfo'
      ])
    },
    props: [
      'isOn'
    ],
    methods:{
      ...mapMutations([
        'RECORD_PROJECTINFO'
      ]),
      upOrDown(index){
          this.i=index;
          this.item=this.allProjects.category[this.i];
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
      // console.log("companyinfo",this.companyInfo)
//        axios.get('/wechat/getProjects',{
//         params: {
//           organization_id: this.companyInfo.organization_id
//         }
          console.log("companyInfo",vm.companyInfo)
        axios.get('/wechat/getProjects',{
          params: {
            organization_id: vm.companyInfo.organization_id
          }
       }).then(function (response) {
            console.log(response);
          if (response.data != null && response.data.result != "01") {

           vm.allProjects=response.data;
            }
          console.log(vm.allProjects)

          for(let i=0;i<vm.allProjects.category.length;i++)
              vm.picked[i]=''
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      medicalPkgSave(){
        let projectInfo={};
            projectInfo.projects=this.picked;
        let j;
        let categories=[];

        for(j=0;j<projectInfo.projects.length;j++) {

         if(projectInfo.projects[j]=="")
          {
              projectInfo.projects.splice(j,1)
            this.allProjects.category.splice(j,1)
          }
        }
        for(j=0;j<this.allProjects.category.length;j++) {
          if(j==0) projectInfo.category=this.allProjects.category[j];
          else {
            projectInfo.category=projectInfo.category+'+'+this.allProjects.category[j];
          }

        }

        this.RECORD_PROJECTINFO(projectInfo)
        this.$router.go(-1)
      }
    },
    mounted:function(){

        console.log("companyInfo:pkg",this.companyInfo)
      this.companyName=this.companyInfo.companyName;
      this.getProjects();
    },
    created:function(){
//          GetTodayActivity();
    },

    components:{
      headerpart,
  }
  }
</script>
<style>

  .content{
      margin-top:2.15rem;
  }
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
