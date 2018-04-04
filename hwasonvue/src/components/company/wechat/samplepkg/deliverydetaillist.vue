<template>
  <section class="wrap">
  <headerpart :imgaddr="imgaddr0"> </headerpart>
  <section class="deliverydetaillist ">
    <!--<div class="clearfix">-->
      <div class="companyname">{{companyName}}</div>
      <!--下载-->
     <!-- <a href="javascript:;" class="dLoadBtn fr">
        <img src="/images/wechat/company/package/downlode.png" alt=""> &lt;!&ndash;<div class="dLoadFont">报表下载</div>&ndash;&gt;
      </a>-->
    <!--</div>-->
    <ul class="clearfix lists">
      <li class="fl"><a href="javascript:;" class="addBorderBottom">检测包明细</a></li>
      <li class="fl"><a href="javascript:;">物料明细</a></li>
    </ul>
    <ul class="activeContent">
      <li class="allActive list">
        <div class="tabContent">
          <div class="title">物料批次明细表</div>
          <!--搜索按钮-->
          <!--<div class="clearfix searchBox">
            <a href="javascript:;" class="fr">
              <img src="/images/wechat/company/package/search.png" alt="">
            </a>
            <div class="fr search"><input type="text" placeholder="Search"></div>
          </div>-->

    <!--表单的显示-->
    <table border="2" class="deliverydetaillist_table">
      <tr>
        <th>发货日期</th>
        <th>快递单号</th>
        <th>发货人</th>
        <th>联系方式</th>
        <th>接收人</th>
      </tr>
    </table>
    <div class="tableScroll">
      <table border="2" class="deliverydetaillist_table tableContent">
        <tr>
          <td>12</td>
          <td>12</td>
          <td>12</td>
          <td>12</td>
          <td>12</td>
        </tr>

            </table>
          </div>
        </div>
      </li>
    </ul>
  </section>
    <footerpart> </footerpart>
  </section>
</template>
<script>
  import headerpart from "../headerpart"
  import footerpart from "../footerpart"
  import {mapState,mapMutations} from 'vuex'

  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        companyName:'',
        delivery:[{
          send_date: {},       //发货日期
          courier_number: '',  //快递单号
          sender:'',          //发货人
          contact: '',         //联系方式
          receiver:''
        }]
      }
    },
    mounted:function(){
        this.companyName=this.companyInfo.companyName;

    },
    components:{
      headerpart,
      footerpart

    },
      computed:{
          ...mapState([
              'companyInfo',
          ]),
      },
    methods: {

      GetDeliveryData(){
        axios.get('/wechat/samplepkg/deliverydetaillist')
          .then(function (response) {
            console.log("response：")
            console.log(response.data)
            // console.log(this.TodayActivities)
            var i =0;
   //         console.log("len:"+vm.Activities.length)

            vm.Activities.splice(0,vm.delivery.length)
            if(response.data !=null)
            {

              for ( var i = 0; i < response.data.length; i++) {

                vm.delivery.push(response.data[i]);
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
      },

    }


</script>
<style>
  .content{
    margin-top:2.22rem;
  }
  .deliverydetaillist{
    background: #fff;
    /*height: 28rem;*/
    overflow-y: auto;
  }
  .companyname{
    color:#338fff;
    background: #ecebeb;
    height:1.65rem;
    font-size:0.55rem;
    line-height: 1.65rem;
    text-indent:0.75rem;
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
  .detailTitle{
    color:#333;
    font-size:0.7rem;
    text-align: center;
    margin-bottom:0.35rem;
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
  .showDetailMsg{
    margin-left:5rem;
    background: #ebebeb;
  }
  .showDetailMsg span{
    padding:0.5rem;
    line-height: 1.3rem;
  }
  .deliverydetaillist_table,.thTitle{
    background: #fff;
    width: 17.25rem;
    margin:0 auto;
    border:1px solid #000;
  }
  .deliverydetaillist_table th,.deliverydetaillist_table td{
    width:3.5rem;
    height:1.05rem;
    text-align: center;
    color:#3f3f3f;
    font-size:0.5rem;
  }
  .tableScroll{
    height: 22rem;
    overflow-y: scroll;
  }
  .active{
    background: #fafafa;
  }

  /*明细表中样式*/
  .firm{
    color:#4a4a4a;
    font-size:0.45rem;
    text-align: center;
  }
  .detailForm{
    width: 17.25rem;
    margin:0 auto;
  }
  .detailForm th,.detailForm td {
    text-align: center;
    color: #3f3f3f;
    font-size: 0.5rem;
    font-weight: normal;
  }
  .lists{
    background: #fff;
    width:100%;
    height:1.6rem;
  }
  .lists li{
    width:50%;
    height:1.6rem;
  }
  .lists li a{
    display: block;
    width:3rem;
    height:1.6rem;
    font-size:0.55rem;
    color:#6c6c6c;
    line-height: 1.6rem;
    margin: 0 auto;
    text-align: center;
  }
  .lists li a.addBorderBottom{
    border-bottom:0.05rem solid #338fff;
    color:#338fff;
  }

</style>
