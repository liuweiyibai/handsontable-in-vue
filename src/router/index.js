import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const Login = (resolve) => {
    import ('@/components/Login/Login').then((module) => {
        resolve(module);
    })
}
const Register = (resolve) => {
    import ('@/components/Register/Register').then((module) => {
        resolve(module);
    })
}

const Home = (resolve) => {
    import ('@/components/Home/Home').then((module) => {
        resolve(module);
    })
}

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
const BeginManageMission = (resolve) => {
    import ('@/components/FunctionList/Table/Item3/BeginManageMission').then((module) => {
        resolve(module);
    })
}
// 算法已完成
const AlgoComplated = (resolve) => {
    import ('@/components/baseComponent/AlgoComplated').then((module) => {
        resolve(module);
    })
}

// 算法未完成
const AlgoUndone = (resolve) => {
    import ('@/components/baseComponent/AlgoUndone').then((module) => {
        resolve(module);
    })
}

const Item4 = (resolve) => {
    import ('@/components/FunctionList/FunctionItem/Item4').then((module) => {
        resolve(module);
    })
}
const Item4Upload = (resolve) => {
    import ('@/components/FunctionList/Table/Item4/upload').then((module) => {
        resolve(module);
    })
}

const Item4inquireFildListoad = (resolve) => {
    import ('@/components/FunctionList/Table/Item4/inquireFildList').then((module) => {
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

const router = new Router({
    history: false,
    hashbang: true,
    routes: [
        {
            path: "/Home",
            meta: {
                requiresAuth: true
            },
            component: Home,
            meta: true,
            children: [
                {
                    path: "/",
                    component: FunctionList,
                    meta: {
                        requiresAuth: true
                    },
                    children: [
                        {
                            path: "/uploadData",
                            name: "uploadData ",
                            meta: {
                                requiresAuth: true
                            },
                            component: uploadData
                        }, {
                            path: "/",
                            name: "default",
                            meta: {
                                requiresAuth: true
                            },
                            component: Item2
                        }, {
                            path: "/Item2/TraningMission",
                            meta: {
                                requiresAuth: true
                            },
                            component: TraningMission
                        }, {
                            path: "/Item2/CreateMission",
                            meta: {
                                requiresAuth: true
                            },
                            component: CreateMission
                        }, {
                            path: "/Item2/PublishMission",
                            meta: {
                                requiresAuth: true
                            },
                            component: PublishMission
                        }, {
                            path: "/Item2/AnalyiseMission",
                            meta: {
                                requiresAuth: true
                            },
                            component: AnalyiseMission
                        }, {
                            path: "/Item3",
                            meta: {
                                requiresAuth: true
                            },
                            component: Item3
                        }, {
                            path: "/Item3/CreateManageMission",
                            meta: {
                                requiresAuth: true
                            },
                            component: CreateManageMission
                        }, {
                            path: "/Item3/BeginManageMission",
                            meta: {
                                requiresAuth: true
                            },
                            component: BeginManageMission
                        }, {
                            path: "/Item4",
                            meta: {
                                requiresAuth: true
                            },
                            component: Item4,
                            children: [
                                {
                                    path: "/Item4/Upload",
                                    meta: {
                                        requiresAuth: true
                                    },
                                    component: Item4Upload
                                }, {
                                    path: "/Item4/Inquire",
                                    meta: {
                                        requiresAuth: true
                                    },
                                    component: Item4inquireFildListoad
                                }
                            ]
                        }, {
                            path: "/AlgoComplated",
                            meta: {
                                requiresAuth: true
                            },
                            component: AlgoComplated
                        }, {
                            path: "/AlgoUndone",
                            meta: {
                                requiresAuth: true
                            },
                            component: AlgoUndone
                        }
                    ]
                }, {
                    path: "/Form",
                    meta: {
                        requiresAuth: true
                    },
                    name: "Form",
                    component: Form
                }, {
                    path: "/InstrumentBoard",
                    meta: {
                        requiresAuth: true
                    },
                    name: "InstrumentBoard",
                    component: InstrumentBoard
                }, {
                    path: "/uploadData/addFile",
                    meta: {
                        requiresAuth: true
                    },
                    component: addFile
                }
            ]
        }, {
            path: "/",
            component: Login
        }, {
            path: "/Register",
            component: Register
        }, {
            path: "*",
            redirect: "/"
        }
    ]
})
router.beforeEach((to, from, next) => {
    // 可以在路由元信息指定哪些页面需要登录权限
    let islogin = localStorage.getItem('islogin'); // 假设没有登录（这里应从接口获取）
    if (to.meta.requiresAuth && !islogin) { // 需要登录授权，这里还需要判断是否登录
        next('/') // 跳转到登录
        console.log('无法获取登录信息');
        return;
    }else{
        console.log('路由进行跳转');
        next();
    }
});
export default router;