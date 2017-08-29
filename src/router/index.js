import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
/* 配置路由按需加载 */
const FormComponent = (resolve) => {
  import ('@/components/FormComponent').then((module) => {
    resolve(module);
  })
}

const uploadData = (resolve) => {
  import ('@/components/uploadData/uploadData').then((module) => {
    resolve(module);
  })
}

const start = (resolve) => {
  import ('@/components/start/start').then((module) => {
    resolve(module);
  })
}

const userMine = (resolve) => {
  import ('@/components/userMine').then((module) => {
    resolve(module);
  })
}

const setting = (resolve) => {
  import ('@/components/setting/setting').then((module) => {
    resolve(module);
  })
}

export default new Router({
  mode: 'history',
  routes: [{
      path: "/",
      name: 'root',
      component: start
    },
    {
      path: '/upload-data',
      name: 'uploadData ',
      component: uploadData
    }, {
      path: "/table",
      name: "FormComponent",
      component: FormComponent
    }, {
      path: "/start",
      name: "start",
      component: start
    }, {
      path: '/user-mine',
      name: "userMine",
      component: userMine
    }, {
      path: "/setting",
      name: "setting",
      component: setting
    }

  ]
})
