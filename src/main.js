import Vue from 'vue';
import App from './App';
import router from './router';
import echarts from 'echarts';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as Ps from 'perfect-scrollbar';
import ('../static/css/perfect-scrollbar.min.css');
import store from './store';
import './assets/css/index.styl';
import {setStorage, getStorage} from './assets/js/common/storage';
import instance from './Ajax/$Http';
import IPConfig from './Ajax/IPConfig'
import Cookie from './assets/js/common/Cookie'
import QS from 'qs';
// import ScrollBar from 'vue2-scrollbar'; import
// './assets/css/vue2-scrollbar.css'import router from './router/index';


Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.echarts = echarts;
Vue.prototype.Ps = Ps;
Vue.prototype.$Http = instance;
Vue.prototype.QS = QS;
Vue.prototype.URL = IPConfig;
Vue.prototype.Cookie = Cookie;
Vue.prototype.ID = Cookie('TOKEN');
// Vue.component('ScrollBar', ScrollBar);

// router.boforeEach()
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
  mounted() {
    // Vue.prototype.ID = this.Cookie('token');
    if (!!this.ID) {
      console.log('status sucessful!!');
    }
  }
});
