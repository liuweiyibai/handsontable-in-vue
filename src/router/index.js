import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const uploadData = (resolve) => {
  import ('@/components/uploadData/uploadData').then((module) => {
    resolve(module);
  })
}
const addFile = (resolve) => {
  import ('@/components/uploadData/addFile').then((module) => {
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
  routes: [
    {
      path: "/",
      name: "Root",
      component: uploadData
    }, {
      path: "/Form",
      name: 'Form',
      component: Form
    }, {
      path: "/InstrumentBoard",
      name: "InstrumentBoard",
      component: InstrumentBoard
    }, {
      path: '/uploadData',
      name: 'uploadData ',
      component: uploadData
    },{
      path: "/uploadData/addFile",
      component: addFile
    }
  ]
})
