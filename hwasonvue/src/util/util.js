import objectAssign from 'object-assign'

export default {
  mergeOptions:function ($vm, options) {
    const defaults = {}
    for (let i in $vm.$options.props) {
      if (i !== 'value') {
        defaults[i] = $vm.$options.props[i].default
        console.log("default:" + defaults[i])
      }
    }
    const _options = objectAssign({}, defaults, options)
    for (let i in _options) {
      $vm[i] = _options[i]
      console.log("$vm[i]:" + $vm[i])
    }
  },
  getCookie:function(name)
{
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
},
  setCookies:function(name,value)
{
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

}


