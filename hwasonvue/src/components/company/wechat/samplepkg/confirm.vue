<template>
  <section class="wrap">
    <headerpart :imgaddr="imgaddr0"  :title="title0">  </headerpart>
  <section class="content ">
    <div class="clearfix">
      <div class="companyName fl">中国人寿扬州分公司</div>
      <a href="javascript:;" class="dLoadBtn fr">
        <img src="/images/wechat/company/package/downlode.png" alt="">
        <div class="dLoadFont">报表下载</div>
      </a>
    </div>
    <form action="" method="post" id="apply">
      <table border="1" class="table">
        <tr>
          <th colspan="4" class="formName">中国人寿扬州公司检测包汇总</th>
        </tr>
        <tr class="tr_title">
          <td class="firCol">单号</td>
          <td class="firCol">日期</td>
          <td class="firCol">基因检测包</td>
          <td class="firCol">高档检测包</td>
        </tr>
        <tr>
          <td></td>
          <td id="date" class="firCol"></td>
          <td id="geneNum"></td>
          <td id="highGradeNum"></td>
        </tr>
      </table>
      <div class="btnBox">
        <input type="submit" value="提交" class="submit">
      </div>
    </form>

  </section>
  </section>

</template>
<script>
  import headerpart from "../headerpart"
  import footerpart from "../footerpart"

  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0: "检测包申请及使用"
      }
    },
    mounted:function(){

    },
    components:{
      headerpart,
      footerpart

    },
    methods: {

    }

  }
</script>
<style>

</style>
