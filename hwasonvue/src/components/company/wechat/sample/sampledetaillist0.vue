<template>
  <section class="content"  >
    <div class="companyName">中国人寿扬州分公司</div>
    <div id="bg">
      <div class="title">中国人寿扬州分公司样本数据明细表</div>
      <!--明细表-->
      <ol class="clearfix titleList">
        <li>报告批次：2017/02/20</li>
        <li>项目：TM</li>
      </ol>
      <div class="clearfix formBox">
        <!--表的固定显示部分-->
        <div class="fl">
          <table border="1" class="table fixTable">
            <tr>
              <th>序号</th>
              <th>条形码</th>
              <th>姓名</th>
            </tr>
            <tr>
              <td>1</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>2</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>3</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>4</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>5</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>6</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>7</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>8</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>9</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>10</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>11</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>12</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>13</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>14</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>15</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>16</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>17</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>18</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>19</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>20</td>
              <td>xc901163</td>
              <td>张三</td>
            </tr>
          </table>
        </div>
        <!--表的滚动显示部分-->
        <div class="fl scrollTableBox">
          <table border="1" class="table scrollTable">
            <tr>
              <th>性别</th>
              <th>年龄</th>
              <th>检测项目</th>
              <th>身份证号码</th>
              <th>业务员姓名</th>
              <th>业务员手机</th>
            </tr>
            <tr v-for="userActivity in userActivities">
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>
            <tr>
              <td>男</td>
              <td>35</td>
              <td>TM3</td>
              <td>302105********7689</td>
              <td>王七</td>
              <td>123335456</td>
            </tr>

          </table>
        </div>
      </div>
    </div>
    <!--按钮-->

    <a href="javascript:;" class="check">报告核对无误</a>
    <a href="javascript:;" class="cancel">取消</a>

    <div class="feedbackBtn clearfix">
      <a href="/wechat/company/demo/feedback" class="fr">
        <span class="fr">问题反馈</span>
        <img src="/images/wechat/company/demo/problem.png" alt="" class="fr">

      </a>
    </div>
  </section>

  </section>
</template>
<script>
  import headerpart from "../headerpart"
  import footerpart from "../footerpart"
  import {mapState,mapMutations} from 'vuex'
  import axios from 'axios'
  export default {
    data(){
      return {
        activity: {
          projects:'',
          activity_time:'',
          sampling_number:'',
          receiver:''
        },
        userActivities:{
          _id: '',
          test_number:'',
          code: '',
          name: '',
          sex: '',
          birthday: '',
          projects:'',
          cardNo: '',
          salesman:{name:'',tel:''},

        }

      }
    },
    components:{
      headerpart,
      footerpart
    },
    mounted:function(){
      this. GetSampleDetailListData()
    },
    computed: {
      ...mapState([
        'activity_id'
      ])
    },
    methods:{
      GetSampleDetailListData(){
          let vm=this;
        console.log("this.activity_id")
          console.log(this.activity_id)
        axios.get('/sample/sampledetaillist',{ params:{activity_id: this.activity_id} })
          .then(function (response) {
            console.log("response：")
            console.log(response.data)
            // console.log(this.TodayActivities)
         //   var i = 0;
            //         console.log("len:"+vm.Activities.length)

          //  vm.samples.splice(0, vm.samples.length)
            if (response.data != null) {

              for (var i = 0; i < response.data.length; i++) {

                vm.samples.push(response.data[i]);
                //  vm.Activities[i]=response.data[i];
//            vm.TodayActivities1[i].project = response.data[i].project;
//            console.log(vm.TodayActivities1[0].project)
//            vm.TodayActivities1[i].sampling_number = response.data[i].sampling_number;
//            vm.TodayActivities1[i].registration_number = response.data[i].registration_number;
              }
            }
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
  #bg{
    background: #fff;
    padding-bottom:1rem;
  }
  /*下载按钮*/
  .dLoadBtn{
    margin:0.5rem 0.8rem 0 0;
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
    margin:0.5rem 0 0.35rem;
  }
  .titleList{
    width: 17.25rem;
    margin:0 auto 0.2rem;
  }
  .titleList li{
    float: left;
    width:50%;
    color:#3f3f3f;
    font-size:0.4rem;
    text-align: center;
  }
  /*明细表*/
  .formBox{
    width:17.15rem;
    height: 16rem;
    margin:0 auto;
    overflow-y:scroll;
  }

  .scrollTableBox{
    width:10rem;
    overflow-x:scroll;
  }

  .scrollTable{
    width:20rem;
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
  }

  .check,.cancel{
    width:16.6rem;
    height:2.25rem;
    margin: 0 auto;
    font-size:1rem;
    border-radius: 0.125rem;
    display: block;
    text-align: center;
    line-height: 2.25rem;
  }
  .check{
    color:#fff;
    margin-top:2rem;
    background: -webkit-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: -o-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: -ms-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: linear-gradient(top, #318ffe 0%,#1d69f0 100%);
  }
  .cancel{
    color:#338fff;
    border:1px solid #338fff;
    margin:0.8rem auto 0.65rem;
  }
  .feedbackBtn a{
    margin:0 1.025rem;
  }
  .feedbackBtn a img{
    height: 0.95rem;
    width:1.1rem;
    margin-right:0.25rem;
  }

</style>
