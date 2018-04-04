<template>
  <section class="wrap" id="wrap">
    <headerpart :imgaddr="imgaddr0" :title="title0"> </headerpart>

    <section>
      <div class="addBlank"></div>
      <div class="clearfix stateAndTime">

        <div class="fl">{{activity_time}}</div>
        <div class="fr tranState">{{sample_status}}</div>
      </div>
      <!--客户信息的呈现-->
      <ul class="stateCustomerBox">
        <li class="clearfix" v-for="(Activity,index) in Activities">
          <img src="/static/img/salesman/user.png" alt="" class="fl">
          <div class="fl ">
            <div class="usermsg">
              <span class="userName">{{Activity.name}}</span>
              <span class="sex">{{Activity.sex}}</span>
            </div>
            <div class="package">{{Activity.projects}}体检套餐</div>
          </div>
          <a href="javascript:;" class="fr revise" @click="ModifyCustomer(index)">修改</a>
        </li>

      </ul>
    </section>
    <!--标题结束-->
  </section>
</template>
<script>
  import headerpart from '../company/wechat/headerpart';
  import api from '../../util/api';
  import Vue from 'vue'
  import axios from 'axios'
  import {mapState,mapMutations} from 'vuex'
  export default {
    data(){
      return {
        imgaddr0: "/static/img/return.png",
        title0: "客户信息详情",
        sample_status:'',
        activity_time:'',
        Activities:[{
          name: '',
          sex: '',
          projects: '',
          checked: false,
          activity_id:'',
          userActivity_id:'',
          user_id:''
        }],
        Activity:{}
      }
    },
    mounted: function () {
      this.GetAllsiteActivities()
    },
    created: function () {
//          GetTodayActivity();
        let urlSearch = new api.UrlSearch();
        this.feedback_state = urlSearch.feedback_state
    },
    computed: {
      ...mapState([
        'activity_id',
        'user_id',
        'projectInfo',
      ])
    },
    components: {
      headerpart,
    },
    methods: {
      ...mapMutations([
        'RECORD_USER_ID',
        'RECORD_USERACTIVITIES_ID'

      ]),
      ModifyCustomer(index){
        this.RECORD_USERACTIVITIES_ID(this.Activities[index].userActivity_id)
        this.RECORD_USER_ID(this.Activities[index].user_id)
        this.$router.push('/salesman/CustomerDetail?feedback_state='+this.feedback_state)
      },
      GetAllsiteActivities(){
        var vm=this;

       console.log("acvitiy_id",this.activity_id)
        axios.get('/wechat/salesman/stateCustomerDetail',{params: {activity_id: this.activity_id}
      })
          .then(function (response) {
//        this.TodayActivities=JSON.parse(response.data);
            console.log("response：")
            console.log(response.data)
            // console.log(this.TodayActivities)
            var i = 0;

//            for ( i = 0; i < vm.Activities.length+2; i++) {
//             // vm.Activities.pop()
//              vm.Activities.splice(0,vm.Activities.length)
//            }
            vm.Activities.splice(0, vm.Activities.length)
            if (response.data != null && response.data.result != "01") {

              for (var i = 0; i < response.data.length; i++) {

                vm.Activities.push(response.data[i]);
                //  vm.Activities[i]=response.data[i];

              }

            }
          })
          .catch(function (response) {
            console.log("error response：")
            console.log(response);
          });
      },

      GotoModify(){
        this.isModify = true;
        this.isModify2 = false;
      },
        /*let data={};
          data.projects=this.projects;
          data.activity_time=this.activity_time;
          data.address=this.address;
          data.name=this.name;
          data.sex=this.sex;
          data.tel=this.tel;
          data.IDNo=this.IDNo;
          data.salesman_name=this.salesman_name;
          data.salesman_number=this.salesman_number;
          data.salesman_name_tel=this.salesman_name_tel;
         let userInfo={};
             userInfo.data=data;
        this.RECORD_USERINFO(userInfo)
        console.log(userInfo)
        this.$router.push('/salesman/modifyCustomer')

      },
*/



    }
  }
</script>
<style>
  .addBlank{
    height:2.2rem;
  }
  .stateAndTime{
    height:1.65rem;
    color:#999;
    padding:0 0.8rem;
    line-height: 1.65rem;
  }
  .stateCustomerBox{
    background: #fff;
    /*height:24.9rem;*/
    padding:0 0.75rem;
    overflow-y: scroll;
  }
  .stateCustomerBox li{
    height: 2.75rem;
    padding-top:0.75rem;
    border-bottom:1px solid #dcdcdc;
    display: block;
  }
  .stateCustomerBox li img{
    width:0.75rem;
    height:0.85rem;
  }
  .stateCustomerBox li .usermsg{
    margin:0 0 0.5rem 0.4rem;
    width:4.75rem;
  }
  .stateCustomerBox li .usermsg .sex{
    padding-left:1rem;
  }
  .stateCustomerBox li .package{
    margin-left:0.4rem;
  }
  .stateCustomerBox li .revise{
    color:#338fff;
  }

</style>
