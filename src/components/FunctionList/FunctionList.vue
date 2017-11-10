<template>
  <div id="FunctionList">
    <div class="list-left">
      <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" 
      active-text-color="#20a0ff" 
      text-color="#ffffff"     
      background-color="#000D3D" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" style="padding-left: 15px;">
                          <i class="el-icon-my" style="font-size:16px;">&#xe604;</i>
                          {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
    <div class="list-right">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: 2,
      items: [
        {
          icon: "el-icon-setting",
          // index: "/uploadData",
          title: "统计任务"
        },
        {
          icon: "el-icon-menu",
          index: "Home",
          title: "算法任务",
          subs: [
            {
              index: "/Home?id=0",
              title: "创建算法任务"
            },
            {
              index: "/Home?id=1",
              title: "训练任务"
            },
            {
              index: "/Home?id=2",
              title: "应用模型"
            },
            {
              index: "/AlgoComplated",
              title: "已完成"
            },
            {
              index: "/AlgoUndone",
              title: "未完成"
            }
          ]
        },
        {
          icon: "el-icon-date",
          // index: "/Item3",
          title: "数据预处理"
        },
        {
          icon: "el-icon-star-on",
          index: "dataManage",
          title: "数据管理",
          subs: [
            {
              index: "/Item4/Upload",
              title: "离线数据上传"
            },
            {
              index: "/Item4/Inquire",
              title: "离线数据查询"
            }
          ]
        },
        {
          icon: "el-icon-search",
          title: "历史任务查询"
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("", "");
    }
  }
};
</script>

<style>
#FunctionList {
  height: calc(100vh - 60px);
}

#FunctionList .list-left {
  width: 220px;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 2px 0 3px 0 rgba(0, 0, 0, 0.1), 1px 0 1px 0 rgba(0, 0, 0, 0.1);
  float: left;
}

#FunctionList .list-left ul {
  height: 100%;
}

#FunctionList .list-right {
  width: calc(100% - 220px);
  box-sizing: border-box;
  height: 100%;
  float: right;
  background-color: #f4f6f7;
}

.list-left .el-menu {
  border-right: 0 none;
  box-sizing: border-box;
}

.list-left ul.el-submenu .el-menu-item:hover,
.el-submenu__title:hover,
.list-left ul.el-menu .el-menu-item:hover {
  background-color: #3498db !important;
  color: #000 !important;
}

.list-left .el-submenu ul.el-menu {
  border-right: 0 none;
  box-sizing: border-box;
}


.list-left .el-submenu .el-menu .el-menu-item {
  background-color: #000 !important;
}

.list-left .el-submenu .el-menu .el-menu-item:hover {
  color: #ffff !important;
  background-color: #3498db !important;
}

.list-left ul.el-menu .el-menu-item i,
.list-left .el-submenu .el-submenu__title i {
  color: #fff;
}
.list-left .el-submenu .el-menu .el-menu-item {
  line-height: 40px !important;
  height: 40px !important;
}
.list-left .el-menu .el-menu-item [class^="el-icon-"],
.list-left .el-menu .el-submenu .el-submenu__title [class^="el-icon-"] {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 16px;
  vertical-align: text-bottom;
}
</style>
