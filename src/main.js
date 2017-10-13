import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import axios from 'axios'
import * as Ps from 'perfect-scrollbar';

import './assets/css/index.styl'
import 'element-ui/lib/theme-default/index.css'
import ('../static/css/perfect-scrollbar.min.css')

axios.defaults.withCredentials = true; // 让axios可以设置cookie
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.echarts = echarts
Vue.prototype.Ps = Ps;
Vue.prototype.$Http = axios;
Vue.prototype.url = URL;
const URL = "http://10.1.4.180:4080";

new Vue({el: '#app', router, template: '<App/>', components: {
    App
  }})
