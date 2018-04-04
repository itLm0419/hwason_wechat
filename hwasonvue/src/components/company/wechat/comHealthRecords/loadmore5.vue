<template>  
      <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">  
        <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">  
          <ul class="list" v-for="(val, key) in pageList">  
            <li>  
                  <div>我是小11</div>  
                  <div>我是小11</div>  
                </li>  
          </ul>  
            <div>我是小11</div>  
          <div>我是小11</div> 
            <div>我是小11</div>  
          <div>我是小11</div> 
            <div>我是小11</div>  
           <div>我是小11</div> 
            <div>我是小11</div>  
           <div>我是小11</div>  
        </v-loadmore> 
         <div>asd adsasdaddsdaadddsssssssss</div> 

      </div> 

</template>  
<script>
    import {Loadmore} from 'mint-ui';
    export default {
        data:function() {
            return {
                searchCondition:{  //分页属性  
                    pageNo:"1",
                    pageSize:"10"
                },
                pageList:[],
                allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了  
                scrollMode:"auto" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动  
            }
        },
        components: {
            'v-loadmore':Loadmore  // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题  
            // 推荐应用组件时用a-b形式起名  
        },
        mounted(){
            this.loadPageList();  //初次访问查询列表  
        },
        methods: {
            loadTop:function() { //组件提供的下拉触发方法  
                //下拉加载  
                this.loadPageList();
                this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位  
                console.log("loadtop")
            },
            loadBottom:function() {
                // 上拉加载  
                console.log("loadbottom")
                this.more();// 上拉触发的分页查询  
                this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位  
            },
            loadPageList:function (){
                // 查询数据  
//                this.api.PageList(this.searchCondition).then(data =>{
//                    // 是否还有下一页，加个方法判断，没有下一页要禁止上拉  
//                    this.isHaveMore(data.result.haveMore);
//                    this.pageList = data.result.pageList;
//                    this.$nextTick(function () {
//                        // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，  
//                        // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，  
//                        // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好  
//                        this.scrollMode = "touch";
//                    });
//                });
            },
            more:function (){
                // 分页查询  
                console.log("more");
                this.searchCondition.pageNo = parseInt(this.searchCondition.pageNo) + 1;
                this.api.loadPageList(this.searchCondition).then(data=>{
                    this.pageList = this.pageList.concat(data.result.pageList);
                    this.isHaveMore(data.result.haveMore);
                });
            },
            isHaveMore:function(isHaveMore){
                // 是否还有下一页，如果没有就禁止上拉刷新  
                this.allLoaded = true; //true是禁止上拉加载  
                if(isHaveMore){
                    this.allLoaded = false;
                }
            }
        }
    }
</script>  