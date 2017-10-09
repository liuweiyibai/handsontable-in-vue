import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

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

const setting = (resolve) => {
  import ('@/components/setting/setting').then((module) => {
    resolve(module);
  })
}

const Form = (resolve) => {
  import ('@/components/Form/Form').then((module) => {
    resolve(module);
  })
}

const InstrumentBoard = (resolve) => {
  import ('@/components/InstrumentBoard/InstrumentBoard').then((module) => {
    resolve(module);
  })
}

export default new Router({
  mode: 'history',
  routes: [{
    path: "/Form",
    name: 'Form',
    component: Form
  }, {
    path: "/InstrumentBoard",
    name: "InstrumentBoard",
    component: InstrumentBoard
  }, {
    path: '/upload-data',
    name: 'uploadData ',
    component: uploadData
  }, {
    path: "/start",
    name: "start",
    component: start
  }, {
    path: "/setting",
    name: "setting",
    component: setting
  }]
})
