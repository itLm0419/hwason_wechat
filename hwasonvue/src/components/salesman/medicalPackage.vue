<template>
  <section class="wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>
    <section>
        <div class="addBlank"></div>
      <a href="javascript:;" class="medicalPkgSave" v-on:click="medicalPkgSave">保存</a>
      <div class="companyName">{{companyName}}
            <span class="medicalMention" v-model="ifChoice">{{ifChoice}}</span>
      </div>
      <form action="" method="post">
        <dl class="medicalPkgChoice" v-for="(project,index) in allProjects.category">
          <dt class="clearfix" v-on:click="upOrDown(index)">
            <span class="fl">{{project}}检测套餐 </span>
           <span v-model="picked">{{picked[index]}}</span>
            <img v-bind:src="openOrClose"  alt="open" class="fr">
          </dt>
           <dd v-for="name1 in allProjects.projects[index]" v-show="isShow[index]" >
               <label @click = "choosePro($event,project,name1,index)">
                   <input type="radio"   v-bind:name="project" v-model="picked[index]" :value="name1">
                   {{name1}}{{showOrHide}}
               </label>
           </dd>
            <mt-popup v-model="popupVisible" closeOnClickModal>
                <div class="choiceItemFrame">
                    <div class="choiceItemFrameTitle clearfix" >
                        <div class="fl itemName">{{project2_name}}</div>
                        <div class="fr itemNum">您还可以选择<span>{{chooseNum}}</span>项</div>
                    </div>
                    <div class="itemCheckBoxs">
                        <div class="clearfix" v-for="pro in projects2.projects">
                            <em class="fl" ref="projects2" @click="choiceItem($event,project,pro.name,pro.count)"></em>
                            <div class="itemDetailName">{{pro.name}}</div>
                        </div>
                    </div>
                    <div class="itemChoicedBtns clearfix">
                        <div class="fl" @click="saveProject2">保存</div>
                        <div class="fl cancelChoiceBtn" @click="cancelProject2">取消</div>
                    </div>
                </div>
            </mt-popup>
          <!--<dd v-for="name1 in project.projects" v-show="isShow[index]" ><label><input type="radio" @click = "choosePro"  v-bind:name="project.category" v-model="picked" :value="name1">{{name1}}{{showOrHide}}</label></dd>-->
        </dl>
      </form>
    </section>
  </section>
</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import util from '../../util/api';
  import Vue from 'vue'
  import axios from 'axios'
  import {mapState,mapMutations} from 'vuex'
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0:"体检套餐",
        companyName:'',
        popupVisible:false,
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
        project2_name:"",
        projects2:{},
        chooseNum:0,
        projectsNum:0,
        chooseProject2:[],
        project2Single:{},
        index:0,
        projectList:[]
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
        'RECORD_PROJECTINFO',
        'RECORD_PROJECTINFO2',
      ]),
        cancelProject2(){
            for(let i in this.chooseProject2){
                if(this.chooseProject2[i].category==this.projects2Category){
                    this.chooseProject2.splice(i)
                }
            }
            this.picked[this.index] = "";
            this.popupVisible =false;
            this.project2Single = {};
            let doms = this.$refs.projects2;
            for(let dom of doms){
                dom.className = "fl";
            }
            console.log(this.chooseProject2,this.project2Single)
        },
        saveProject2(){
            if(this.chooseNum==0){
                for(let i in this.chooseProject2){
                    if(this.chooseProject2[i].category==this.project2Single.category){
                        this.chooseProject2.splice(i)
                    }
                }
                this.chooseProject2.push(this.project2Single);
                this.popupVisible = false;
                let doms = this.$refs.projects2;
                setTimeout(function () {
                    for(let dom of doms){
                        dom.className = "fl";
                    }
                },500)
            }else {
                this.$messagebox({
                    title: "提示",
                    message: "请选择" + this.projectsNum + "项"
                })
            }
        },
        choosePro(event,project,name,index){
            var vm = this;
            this.projects2Category = project;
            this.index = index;
            if(event.srcElement.checked==undefined){
                return false;
            }
            for(var i = 0;i<vm.picked.length;i++){
                if(i!=index&&(vm.picked[i].indexOf(vm.picked[vm.index])>=0||vm.picked[vm.index].indexOf(vm.picked[i])>=0)){
                    var idx = vm.projectList.indexOf(vm.picked[i]);
                    if(idx>=0){
                        vm.projectList.splice(idx,1);
                    }
                    vm.picked[i] = "";
                }
            }
            var index = vm.projectList.indexOf(vm.picked[vm.index])
            if(index<0){
                vm.projectList.push(vm.picked[vm.index])
            }else{
                vm.projectList.splice(index,1)
            }
            if(vm.projectList.indexOf(vm.picked[vm.index])<0){
                vm.picked[vm.index] = "";
            }
          vm.chooseNum =  util.getProjectsNum(name)
          vm.projectsNum =  util.getProjectsNum(name)
          axios.get('/wechat/salesman/getProjects2',{params:{category:project}})
              .then(function (response) {
                  if(response.data&&vm.projectList.indexOf(vm.picked[vm.index])>=0){
                      vm.popupVisible = true;
                      vm.project2Single = {};
                      vm.project2_name = name;
                      vm.projects2 = response.data;
                  }
              });
            setTimeout(function () {
                vm.upOrDown(0)
                vm.upOrDown(0)
            },100)
        },

      choiceItem(event,project,name,count){
           this.project2Single.item = this.project2_name.split("+")[0];
          if(event.srcElement.className=="fl"){
              if(this.chooseNum==0){
                  //this.$toast("你最多可选择"+this.projectsNum+"项");
                  this.$messagebox({
                      title:"提示",
                      message:"你最多可选择"+this.projectsNum+"项"
                  })
                  return false
              }
              event.srcElement.className = "fl changeBg";
              this.project2Single.category = project;
              if(this.project2Single.content){
                  this.project2Single.content.push(name);
              }else{
                  this.project2Single.content = [name];
              }
              if(this.project2Single.num){
                  this.project2Single.num += count;
              }else{
                  this.project2Single.num = count;
              }
              this.chooseNum--
          }else{
              event.srcElement.className = "fl";
              this.project2Single.num -= count;
              let index = this.project2Single.content.indexOf(name);
              this.project2Single.content.splice(index,1);
              this.chooseNum++
          }
          console.log(this.project2Single)
        },
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
            console.log(response,666666666);
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
        this.RECORD_PROJECTINFO2(this.chooseProject2)
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
 .addBlank{
    height:2.2rem;
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
    z-index: 400;
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
 .choiceItemFrame{
     width: 14.8rem;
     height: 19.2rem;
 }
 .choiceItemFrameTitle{
     height: 1.75rem;
     width:14.4rem;
     border-bottom:1px solid #ebebeb;
     margin:0 auto;
    }
 .choiceItemFrameTitle div{
     color:#999;
     font-size:0.5rem;
     line-height: 1.75rem;
 }
    .itemName{
        padding-left:0.4rem;
    }
    .itemNum{
        padding-right:0.75rem;
    }
    .itemNum span{
     color:#ec403e;
     }

 .itemCheckBoxs div em{
     width:1rem;
     height: 1rem;
     margin:0.2rem 0.5rem;
     background: url('../../../static/img/healthRecords/check1.png') no-repeat;
     background-size:cover ;
 }
 .itemCheckBoxs div em.changeBg{
     background: url('../../../static/img/healthRecords/check2.png') no-repeat;
     background-size:cover ;
 }
    .itemDetailName{
        padding:0.3rem 0;
        color:#3f3f3f;
    }
    .itemChoicedBtns{
        width:10rem;
        margin:0.3rem auto 0;
    }
    .itemChoicedBtns div{
        width: 3.85rem;
        height: 1.85rem;
        font-size:0.7rem;
        text-align: center;
        line-height: 1.85rem;
        background: #338fff;
        color:#fff;
        border:1px solid #338fff;
    }
    .itemChoicedBtns div.cancelChoiceBtn{
        color:#338fff;
        background: #fff;
        margin-left:1.65rem;
    }
</style>
