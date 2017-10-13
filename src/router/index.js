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

const FunctionList = (resolve) => {
  import ('@/components/FunctionList/FunctionList').then((module) => {
    resolve(module);
  })
}

// const Item1 = (resolve) => {   import
// ('@/components/FunctionList/FunctionItem/Item1').then((module) => {
// resolve(module);   }) } 算法任务
const Item2 = (resolve) => {
  import ('@/components/FunctionList/FunctionItem/Item2').then((module) => {
    resolve(module);
  })
}
// 创建算法任务列表
const CreateMission = (resolve) => {
  import ('@/components/FunctionList/Table/Item2/CreateMission').then((module) => {
    resolve(module);
  })
}

// 创建训练任务列表
const TraningMission = (resolve) => {
  import ('@/components/FunctionList/Table/Item2/TraningMission').then((module) => {
    resolve(module);
  })
}
// 算法任务发布
const PublishMission = (resolve) => {
  import ('@/components/FunctionList/Table/Item2/PublishMission').then((module) => {
    resolve(module);
  })
}
// 分析任务
const AnalyiseMission = (resolve) => {
  import ('@/components/FunctionList/Table/Item2/AnalyiseMission').then((module) => {
    resolve(module);
  })
}


// 数据管理
const Item3 = (resolve) => {
  import ('@/components/FunctionList/FunctionItem/Item3').then((module) => {
    resolve(module);
  })
}
// 创建预处理任务
const CreateManageMission = (resolve) => {
  import ('@/components/FunctionList/Table/Item3/CreateManageMission').then((module) => {
    resolve(module);
  })
}
// 执行预处理任务
const BeginManageMission =  (resolve) => {
  import ('@/components/FunctionList/Table/Item3/BeginManageMission').then((module) => {
    resolve(module);
  })
}


const Item4 = (resolve) => {
  import ('@/components/FunctionList/FunctionItem/Item4').then((module) => {
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
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Root",
      component: FunctionList,
      children: [
        {
          path: "/Item2",
          component: Item2
        }, {
          path: "/Item3",
          component: Item3
        }, {
          path: "/Item4",
          component: Item4
        }
      ]
    }, {
      path: "/Form",
      name: "Form",
      component: Form
    }, {
      path: "/InstrumentBoard",
      name: "InstrumentBoard",
      component: InstrumentBoard
    }, {
      path: "/uploadData",
      name: "uploadData ",
      component: uploadData
    }, {
      path: "/uploadData/addFile",
      component: addFile
    }, {
      path: "/Item2/CreateMission",
      component: CreateMission
    },{
      path:"/Item2/TraningMission",
      component:TraningMission
    },{
      path:"/Item2/PublishMission",
      component:PublishMission
    },{
      path:"/Item2/AnalyiseMission",
      component:AnalyiseMission
    },{
      path:"/Item3/CreateManageMission",
      component:CreateManageMission
    },{
      path:"/Item3/BeginManageMission",
      component:BeginManageMission
    }
  ]
})
