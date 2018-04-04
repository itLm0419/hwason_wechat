
import Vue from 'vue'
import App from './App'
import store from '../store/'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'



import router from './router/index'
import VueResource from 'vue-resource'
//import Vuex from 'vuex'


Vue.config.productionTip = false;
///Vue.use(Vuex)

///require('es6-promise').polyfill()

Vue.use(VueResource);
Vue.use(MintUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

Vue.prototype.rem = 20;
(function(win,doc){
  Vue.prototype.rem  = 20/375*doc.documentElement.clientWidth;
  doc.documentElement.style.fontSize = Vue.prototype.rem +'px';
  win.addEventListener('resize',function(){
    Vue.prototype.rem  = 20/375*doc.documentElement.clientWidth;
    doc.documentElement.style.fontSize = Vue.prototype.rem +'px';
  },false);
})(window,document);

/*

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import calendar from './components/activitysheet/calendar.vue'
import header from './components/activitysheet/header.vue'
import Hello from './components/hello.vue'

import VueResource from 'vue-resource'
//import 'bootstrap/dist/css/bootstrap.css'

Vue.use(VueRouter)
Vue.use(VueResource)
console.log("startstart")

const routes = [{
  path : '/',
  component : Hello
},{
  path : '/home',
  component : Home
}];

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
// 这灵活得亮瞎了
/*new Vue({
 el: '#app',
 template: '<App/>',
 router,
 components: { App }
 });

 new Vue(Vue.util.extend({
 router
 }, App)).$mount('#app');

 new Vue({
 el:'#app',
 router,
 render:h => h(App)
 });
var app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
}); */
