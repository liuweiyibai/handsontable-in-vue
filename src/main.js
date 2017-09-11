import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'



import * as Ps from 'perfect-scrollbar';
import './assets/css/index.styl'
import './assets/js/lib/perfect-scrollbar.min.css'
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.echarts = echarts
Vue.prototype.Ps = Ps;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
