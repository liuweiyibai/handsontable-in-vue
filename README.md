# 数据可视化功能

> A Excel of Vue

## 启动项目

- 安装依赖
- 项目启动

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### 数据统计

- 使用handsontable + elementUI + vue进行搭建

- 对部分handsontable功能进行细化自定义

- 登录和注册页面在One文件中login.html 和 register.html文件中

- 登录后回向Cookie中写入登录状态以及用户ID

- 因为只需要用到用户Token，并无其他共享信息，所以未使用vuex

- 每个接口访问都要加入参数userID在入口文件中绑定到Vue.prototype上

- router.beforech() 会判断当前路由是否需要登录，所有路由都需要登录，并且要检查Cookie中是否存在ISLOGIN

- 使用axios发送Http请求。

## 项目路径配置
```
.
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── dist
     ├── root
     │   ├── liberary  静态文件目录
     │   ├── static
     │   ├── forgetPassWord.html
     │   ├── home.html
     │   ├── index.html
     │   ├── login.html
     │   └── register.html
     ├── static 项目打包生成的文件
     └── index.html 项目访问主页、打包完成后将此文件改名为home.html后放入foot目录，并将foot目录发布到服务器
├── index.html
├── LICENSE
├── package.json
├── README.md
├── src
│   ├── App.vue
│   ├── main.js
│   ├── Ajax
│   │   ├── HTTP.js
│   │   └── IPConfig.js
│   ├── assets
│   │   ├── css 目录
│   │   ├── img 目录
│   │   └── js目录
│   ├── router
│   │   └── index.js
│   ├── components
│   │   ├── baseComponents
│   │   │   ├── AlgoComplated.vue
│   │   │   ├── AlgoUndone.vue
│   │   │   └── Mheader.vue
│   │   ├── From
│   │   │   ├── From.vue
│   │   │   └── handsontable.full.min.css
│   │   ├── FunctionList
│   │   │   ├── FunctionItem
│   │   │   │   ├── base.css
│   │   │   │   ├── Item2.vue
│   │   │   │   ├── Item3.vue
│   │   │   │   └── Item4.vue
│   │   │   ├── Table
│   │   │   │   ├── Item2
│   │   │   │   │   └── TraningMission.vue
│   │   │   │   ├── Item4
│   │   │   │   ├── ├── inquireFileList.vue
│   │   │   │   │   └── upload.vue
│   │   │   │   └── table.css
│   │   │   └── FunctionList.vue
│   ├── Home
│   │   └── Home.vue
│   ├── InstrumentBoard
│   │   └── InstrumentBoard.vue
│   ├── Tables
│   │   └── table.vue
│   ├── tree
│   │   └── tree.vue
│   ├── uploadData
│   │   ├── addFile.vue
│   │   └── uploadData.vue
└── static
    ├── js 目录
    └── css 目录

```