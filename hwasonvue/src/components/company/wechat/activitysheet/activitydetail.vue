<template>
  <!-- 详细活动的显示-->
  <div class="upOrDownList">
    <div class="clearfix actBox">
      <div class="fl actDetail">活动情况</div>
      <a href="javascript:;" class="addBtn fr"><img src="/images/wechat/company/activity/addIcon.png" alt="" class="addDemo"></a>
    </div>
    <div class="clearfix activeDetail">
      <div class="fl itemsBox">
        <div class="items">
          <ul class="clearfix">
            <li class="fl"><img src="/images/wechat/company/activity/itemIcon.png" alt="">CCVD检测</li>
            <li class="fr peopleNum"><img src="/images/wechat/company/activity/peopleIcon.png" class="addressIcon" alt="">预计60人</li>
          </ul>
          <ul>
            <li><img src="/images/wechat/company/activity/dateIcon.png" alt="">2017/4/1 上午09:30-10:30</li>
            <li><img src="/images/wechat/company/activity/address.png" alt="">南京市江宁区百家湖国际会议中心</li>
            <li><img src="/images/wechat/company/activity/demoIcon.png" alt="">的点点滴滴多</li>
          </ul>
        </div>
        <div class="items">
          <ul class="clearfix">
            <li class="fl"><img src="/images/wechat/company/activity/itemIcon.png" alt="">CCVD检测</li>
            <li class="fr peopleNum"><img src="/images/wechat/company/activity/peopleIcon.png" class="addressIcon" alt="">预计60人</li>
          </ul>
          <ul>
            <li><img src="/images/wechat/company/activity/dateIcon.png" alt="">2017/4/1 上午09:30-10:30</li>
            <li><img src="/images/wechat/company/activity/address.png" alt="">南京市江宁区百家湖国际会议中心</li>
            <li><img src="/images/wechat/company/activity/demoIcon.png" alt="">的点点滴滴多</li>
          </ul>
        </div>
        <div class="items">
          <ul class="clearfix">
            <li class="fl"><img src="/images/wechat/company/activity/itemIcon.png" alt="">CCVD检测</li>
            <li class="fr peopleNum"><img src="/images/wechat/company/activity/peopleIcon.png" class="addressIcon" alt="">预计60人</li>
          </ul>
          <ul>
            <li><img src="/images/wechat/company/activity/dateIcon.png" alt="">2017/4/1 上午09:30-10:30</li>
            <li><img src="/images/wechat/company/activity/address.png" alt="">南京市江宁区百家湖国际会议中心</li>
            <li><img src="/images/wechat/company/activity/demoIcon.png" alt="">的点点滴滴多</li>
          </ul>
        </div>
        <div class="items">
          <ul class="clearfix">
            <li class="fl"><img src="/images/wechat/company/activity/itemIcon.png" alt="">CCVD检测</li>
            <li class="fr peopleNum"><img src="/images/wechat/company/activity/peopleIcon.png" class="addressIcon" alt="">预计60人</li>
          </ul>
          <ul>
            <li><img src="/images/wechat/company/activity/dateIcon.png" alt="">2017/4/1 上午09:30-10:30</li>
            <li><img src="/images/wechat/company/activity/address.png" alt="">南京市江宁区百家湖国际会议中心</li>
            <li><img src="/images/wechat/company/activity/demoIcon.png" alt="">的点点滴滴多</li>
          </ul>
        </div>
      </div>
      <div class="fr iconsBtn">
        <div class="line"></div>
        <a href="javascript:;" class="retireBtn"> <img src="/images/wechat/company/activity/retire.png" alt=""></a>
        <div class="line"></div>
        <img src="/images/wechat/company/activity/delete.png" alt="" class="deleteIcon">
      </div>
    </div>
  </div>
</template>
<script></script>
<style>
  .content{
    margin-top:2.22rem;
  }
  /*添加活动的显示标记*/
  .oneMonth  li a .span{
    height: 0.3rem;
    width:0.3rem;
    border-radius: 50%;
    background: #338fff;
    margin:0 auto;
    display: block;
  }
  /*选中当前的样式*/
  .on{
    background:#338fff;
    color: #fff;
  }
  /*上个月的选中的样式*/
  .actived{
    background: #c2c2c2;
    color:#fff;
  }
  /*活动详情的样式*/
  .actBox{
    height:1.45rem;
    border-top:1px solid #d6dad8;
    background: #f5f5f5;
  }
  .actBox .actDetail{
    font-weight:bold;
    font-size:0.55rem;
    line-height: 1.45rem;
    margin-left:0.85rem;
  }
  /*添加按钮*/
  .addBtn{
    height: 1.25rem;
    width:1.25rem;
    margin: 0.075rem 1.15rem 0 0;
  }
  /*删除某个活动*/
  .addDemo{
    height: 1.25rem;
    width:1.25rem;
  }
  .activeDetail{
    padding-left:0.85rem;
  }
  /*可以上下拉动的活动区*/
  .upOrDownList{
    position: absolute;
    right:0;
    margin:0 auto;
  }
  .activeDetail li{
    color:#323232;
    font-size:0.55rem;
  }
  .activeDetail li.peopleNum{
    margin-right:2.8rem;
  }
  .activeDetail img{
    height: 0.85rem;
    width: 0.85rem;
    margin-right:0.4rem;
  }
  .activeDetail img.addressIcon{
    width:1.1rem;
  }
  .iconsBtn a{
    display: block;
    height: 1.25rem;
    width:1.25rem;
  }
  .iconsBtn img{
    height: 1.25rem;
    width:1.25rem;
    margin-right:1.1rem;
    display: block;
  }
  .iconsBtn .line{
    height:0.4rem;
    width:0.05rem;
    background: #338fff;
    margin-left:0.6rem;
  }
  .box{
    display: none;
  }
  /*蒙版*/
  .mengban{
    position: fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index: 999;
    background: rgba(0,0,0,0.3);
  }
  /*点击删除按钮显示的内容*/
  .deleteNote{
    position: absolute;
    left:50%;
    top:25%;
    margin-left:-8rem;
    margin-top:-5rem;
    padding:0.75rem 0.5rem 0.5rem 0.95rem;
    width: 14.925rem;
    height:8.125rem;
    background: #fff;
    z-index: 999;
  }
  .deleteNote .alertMeg{
    color:#999;
    font-size:0.6rem;
  }
  .deleteItem p{
    line-height:1rem;
    color:#343434;
    font-size:0.7rem;
  }
  .deleteBtn{
    margin-top:2.8rem;
  }
  .deleteBtn a{
    width:3.3rem;
    height:1.55rem;
    font-size:0.7rem;
    text-align: center;
    border-radius: 0.125rem;
    line-height: 1.55rem;
    border:0;
  }
  .deleteBtn a.delete{
    margin-right:0.9rem;
    color:#fff;
    background: -webkit-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: -o-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: -ms-linear-gradient(top, #318ffe 0%,#1d69f0 100%);
    background: linear-gradient(top, #318ffe 0%,#1d69f0 100%);
  }
  .deleteBtn a.cancel{
    background: #fff;
    color:#338fff;
    border:0.075rem solid #338fff;
  }
  /*活动详情的内容*/
  .itemsBox{
    /*overflow-y:scroll ;*/
    height:10rem;
  }
  .activeDetail .items{
    height:4.5rem;
    width:14.65rem;
    background: #fff;
    padding-top:0.5rem;
    border-bottom: 1px solid #dcdcdc;
  }
  .addBorder{
    border-right:0.2rem solid #338fff;
  }
  .deleteNote img{
    height: 0.8rem;
    width: 0.8rem;
  }
</style>


