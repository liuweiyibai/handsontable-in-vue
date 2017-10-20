import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import * as Ps from 'perfect-scrollbar';
import store from './store'
import './assets/css/index.styl'
import 'element-ui/lib/theme-default/index.css'
import ('../static/css/perfect-scrollbar.min.css')

// axios.defaults.withCredentials = true; // 让axios可以设置cookie axios.defaults.//
// 响应时间 axios.defaults.headers.post['Content-Type'] =
// "application/application/x-www-form-urlencoded;charset=UTF-8"; // 配置请求头
// axios.defaults.
import instance from './Ajax/$Http'

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.echarts = echarts
Vue.prototype.Ps = Ps;
Vue.prototype.$Http = instance;
Vue.prototype.ID = store.getters.userInfo.id;

new Vue({
  el: '#app', router,store, template: '<App/>', components: {
    App
  },
  //监听路由检查登录
  watch: {
    "$route": 'checkLogin'
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      //检查是否存在session cookie操作方法在源码里有或者参考网上的即可
      // this.getCookie('session')
      if (!1) {
        //如果没有登录状态则跳转到登录页 this.$router.push('/login');
        console.log('已登录')
      } else {
        //否则跳转到登录后的页面 this.$router.push('/user_info');
        console.log('未登录');
      }
    }
  }
});
