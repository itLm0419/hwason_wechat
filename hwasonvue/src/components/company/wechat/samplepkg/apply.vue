<template>
  <section class="wrap">
    <headerpart :imgaddr="imgaddr0"> </headerpart>
    <!--标题结束-->
    <section class="content ">
      <div class="clearfix">
        <div class="companyName fl">{{}}</div>
        <a href="javascript:;" class="dLoadBtn fr">
          <img src="/static/img/company/wechat/samplepkg/download.png" alt="">
          <div class="dLoadFont">报表下载</div>
        </a>
      </div>
      <form >
        <table border="1" class="Table">
          <tr>
            <th colspan="3" class="formName">{{companyName}}检测包汇总</th>
          </tr>
          <tr class="tr_title">
            <td class="firCol">项目</td>
            <td class="firCol">数量</td>
            <td class="firCol">备注</td>
          </tr>
          <tr>
            <td class="firCol">基因检测包</td>
            <td><input type="text" placeholder="请输入申请数量" class="applyNum geneNum" v-model="gene_package"></td>
            <td>用于血液检测</td>
          </tr>
          <tr>
            <td  class="firCol">高档检测包</td>
            <td><input type="text" placeholder="请输入申请数量" class="applyNum highGradeNum" v-model="senior_package"></td>
            <td>用于基因检测</td>
          </tr>
          <tr>
            <td  class="firCol">申请日期</td>
            <td colspan="2" class="date">{{date}}</td>
          </tr>
        </table>
        <div class="btnBox">
          <!--<a href="javascript:;" class="login">提交</a>-->
          <input type="submit" class="login" value="提交" v-on:click="submitData">
        </div>
      </form>

        <div class="application">
          <a href="javascript:;">查看已申请表</a>
        </div>


    </section>
    <!--标题结束-->
   <footerpart></footerpart>
  </section>
</template>
<script>
  import headerpart from "../headerpart"
  import footerpart from "../footerpart"
  import axios from 'axios'
  import {mapState,mapMutations} from 'vuex'

  export default {
    data(){
      return {
       companyName:'',
        imgaddr0: "/static/img/home.png",
        date: new Date().toLocaleDateString(),
        gene_package: 0,
        senior_package: 0
      }
    },
    mounted: function () {
        this.companyName=this.companyInfo.companyName;

    },
      computed:{
          ...mapState([
              'companyInfo',
          ]),
      },
    components: {
      headerpart,
      footerpart
    },
    methods: {
      submitData(){
        console.log(this.gene_package);
        console.log(this.senior_package);
        console.log(this.date);
        axios.post('/wechat/samplepkg/apply', {
          gene_package: this.gene_package,
          senior_package: this.senior_package,
          apply_date: this.date
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (response) {
            console.log(response);
          });

      }
    }
  }
</script>
