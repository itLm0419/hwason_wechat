/**
 * Created by Bright xia on 2017/5/22.
 */
import Vue from 'vue'
import VueValidator from 'vue-validator'

Vue.use(VueValidator)
//自定义验证器
//添加一个简单的手机号验证
//匹配0-9之间的数字,并且长度是11位
Vue.validator('tel', {
  check: function (val) {
    return /^[0-9]{11}$/.test(val)
  },
  message: 'Invalid telephone number.'
});
//添加一个密码验证
//匹配6-20位的任何字类字符，包括下划线。与“[A-Za-z0-9_]”等效。
Vue.validator('passw', {
  check: function (val) {
    return /^(\w){6,20}$/.test(val)
  },
  message: 'Invalid password.'
});
Vue.validator('email', {
  check: function (val) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
  },
  message: 'Invalid your mail addres format.'
})
Vue.validator('numeric', {
  numeric: function (val) {
    return /^[-+]?[0-9]+$/.test(val)
  },
  message: 'Invalid number format.'
})

Vue.validator('url', {
  url: function (val) {
    return /^(http\:\/\/|https\:\/\/)(.{4,})$/.test(val)
  },
  message: 'Invalid url format.'
})

