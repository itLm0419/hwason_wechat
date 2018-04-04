/**
 * Created by win7 on 2017/8/23.
 */
module.exports = {
  UrlSearch:function (){
    var name,value;
    var str=location.href; //取得整个地址栏
    var num=str.indexOf("?");
    str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
    var arr=str.split("&"); //各个参数放到数组里
    for(var i=0;i < arr.length;i++){
      num=arr[i].indexOf("=");
      if(num>0){
        name=arr[i].substring(0,num);
        value=arr[i].substr(num+1);
        this[name]=value;
      }
    }
  },
    setCookie:function(name,value)
    {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    },
    getCookie:function(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    dateFormat: function(date,num) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        if(num==1){
            return y + '-' + m + '-' + d+' '+ h +':'+ minute;
        }else if(num==2){
            return y + '-' + m + '-' + d
        }else{
            return y + '年' + m + '月' + d
        }
    },

    getProjectsNum:function (string) {
    if(string=='PD-A'){
        return 2
    }
    if(string == 'PD-B'||string=='PD-C'){
        return 5
    }
    if(string == 'PD-D'){
        return 14
    }
    let num;
    let firstIndex = 0;
    let lastIndex = 0;
    if (typeof(string) == 'string') {
        for (let i = 0; i < string.length; i++) {
            if (string.charAt(i) >= '0' && string.charAt(i) <= '9') {
                firstIndex = i;
                if (string.charAt(i + 1) >= '0' && string.charAt(i + 1) <= '9') {
                    lastIndex = i + 1;
                    break;
                } else {
                    lastIndex = 0;
                    break;
                }
            }
        }
    }
    if (lastIndex == 0) {
        num = parseInt(string.charAt(firstIndex));
    } else {
        num = parseInt(string.substring(firstIndex, lastIndex + 1));
    }
    return num;
    },
    getDate : function(value){
        var year = parseInt(value.substr(0,4));
        var month = parseInt(value.substr(5,2))-1;
        var day = parseInt(value.substr(-2));
        let date = new Date(year,month,day);
        return date;
    },
    getDate2 : function(value){
        var year = parseInt(value.substr(0,4));
        var month = parseInt(value.substr(5,2))-1;
        var day = parseInt(value.substr(-2))+1;
        let date = new Date(year,month,day);
        return date;
    },
};
