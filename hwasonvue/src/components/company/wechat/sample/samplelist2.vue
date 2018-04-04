<template>
  <!--标题开始-->
  <section class="wrap">
    <header>
      <div class="mianTitle">样本数据明细表</div>
    </header>
    <!--标题结束-->
    <section class="content"  >
      <div class="clearfix">
        <div class="companyName fl">中国人寿扬州分公司</div>
        <a href="javascript:;" class="dLoadBtn fr">
          <img src="/static/img/company/wechat/samplepkg/download.png" alt="">
          <div class="dLoadFont">报表下载</div>
        </a>
      </div>
      <div id="bg">
        <div class="title">中国人寿扬州分公司样本数据统计表</div>
        <div class="clearfix searchBox">
          <a href="javascript:;" class="fr">
            <img src="/static/img/company/wechat/samplepkg/search.png" alt="">
          </a>
          <div class="fr search">
            <input type="text" placeholder="Search">
          </div>
        </div>

        <!--表单的显示-->
        <div class="clearfix formBox">
          <!--表的固定显示部分-->
          <div class="fl">
            <table border="1" class="table fixTable" >
              <tr>
                <th>报告批次</th>
                <th>项目</th>
              </tr>
              <!--<tr >-->
                <!--<td v-for="time1 in samples.time">{{time1.time}}</td>-->
                <!--<td v-for="sample in samples.dbResult">{{sample.project}}</td>-->
              <!--</tr>-->
              <tr v-for="(projectime,index) in projecttimes" v-on:click="SampleDetailList($index)">
              <td >{{projectime.time}}</td>
               <td >{{projectime.projects}}</td>
              </tr>

            </table>
          </div>
          <!--表的滚动显示部分-->
          <div class="fl scrollTableBox">
            <table border="1" class="table scrollTable" >
              <tr v-for="(sample,index) in samples.dbResult" v-on:click="SampleDetailList($index)">
                <th>{{sample.address}}</th>
                <th>{{sample.sampling_number}}</th>
                <th>{{sample.sample_status}}</th>
                <th>{{sample.receiver}}</th>
                <th>{{sample.feedback_status}}</th>
              </tr>

            </table>
          </div>
        </div>
      </div>
    </section>
    <!--标题结束-->
    <footerpart></footerpart>
  </section>
</template>

<script>
  import headerpart from "../headerpart"
  import footerpart from "../footerpart"
  import {mapState,mapMutations} from 'vuex'
  import axios from 'axios'
  let moment=require("moment")
  export default {
    data(){
      return {
         projecttimes:[{
              time:"",
              projects:""
          }],
        samples: {
          dbResult: [{
            _id:'',
            activity_time: '',
            projects: '',
            address: '',
            sampling_number: 0,
            sample_status: '',
            feedback_state: '',
            receiver: ''
          }],
          time: []
        }
      }
    },
    mounted:function(){
        this.GetSampleListData();

    },
    components: {
      headerpart,
      footerpart
    },
    methods: {
      ...mapMutations([
        'RECORD_ACTIVITIES_ID'
      ]),
      SampleDetailList(index){
        this.$router.push('/sample/sampledetaillist')
        this.RECORD_ACTIVITIES_ID(this.samples.dbResult[index]._id)
        console.log(this.samples.dbResult[index]._id)
      },
      GetSampleListData(){
         let vm=this;
        axios.get('/sample/samplelist')
          .then(function (response) {
            console.log("response：")
            console.log(response.data)
           // vm.samples.splice(0, vm.samples.length)
            if (response.data != null) {
             // vm.samples.push(response.data);
              vm.samples=response.data;
              let tmp=[{projects:'',time:''}]

              for (var i = 0; i < response.data.dbResult.length; i++) {
//                 tmp[i].projects=response.data.dbResult[i].projects;
//                 tmp[i].time=response.data.time[i];
             //    vm.projecttimes[i]={projects:response.data.dbResult[i].projects,time:response.data.time[i]}
                console.log(moment(response.data.dbResult[i].activity_time).format('YYYY-MM-DD HH:mm'));
              }
//              console.log("vm.projecttimes");
//              console.log(vm.projecttimes);


//              for (var i = 0; i < response.data.dbResult.length; i++) {

//                vm.samples.push(response.data.dbResult[i]);
                //  vm.Activities[i]=response.data[i];
//            vm.TodayActivities1[i].project = response.data[i].project;
//            console.log(vm.TodayActivities1[0].project)
//            vm.TodayActivities1[i].sampling_number = response.data[i].sampling_number;
//            vm.TodayActivities1[i].registration_number = response.data[i].registration_number;
              }
           // }
            //            console.log("this.TodayActivities22")
//            console.log(vm.TodayActivities[0])
            //return response.data;

          })
          .catch(function (response) {
            console.log("error response：")
            console.log(response);
          })
      }
    }
  }
</script>
<style>
input::placeholder{
text-align: left;
}
#bg{
background:#fff;
}
/*下载按钮*/
.dLoadBtn{
margin:0.5rem 0.8rem 0.2rem 0;
}
.dLoadBtn img{
height: 0.8rem;
width:0.8rem;
margin-left:0.7rem;
}
.dLoadBtn .dLoadFont{
color:#338fff;
font-size:0.5rem;
line-height: 0.5rem;
}
.title{
color:#333;
font-size:0.7rem;
text-align: center;
padding:0.5rem 0 0.35rem;
}
/*搜索框*/
.searchBox{
margin-bottom:0.25rem;
}
.searchBox .search{
width: 3.6rem;
height: 0.85rem;
border:1px solid #bdc5cb;
}
.searchBox input{
width:100%;
height:100%;
text-indent: 0.4rem;
border:none;
}
.searchBox a img,.searchBox a{
height:0.9rem;
width:0.9rem;
}
.searchBox a{
margin-right:0.8rem;
}
.formBox{
width:17.15rem;
height: 22rem;
margin:0 auto;
overflow-y:scroll;
}

.scrollTableBox{
width:10rem;
overflow-x:scroll;
}

.scrollTable{
width:24rem;
}
.table{
/*height:11rem;*/
float: left;
border:1px solid #000;
}
.table th,.table td{
padding:0 0.2rem;
text-align: center;
font-weight:normal;
color:#7e7e7e;
}
.table td.singed{
color: #00ac2d;
}
.table td.unChecked{
color: #cd3939;
}
.address{
width:2.4rem;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
word-break: break-all;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
/*border:0;*/
}
</style>
