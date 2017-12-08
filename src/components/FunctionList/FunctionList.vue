<template>
  <div id="FunctionList">
    <div class="list-left">
      <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" 
      active-text-color="#20a0ff" 
      text-color="#ffffff"     
      unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs"
                        :key="i" :index="subItem.index" style="padding-left: 15px;">
                          <i class="el-me-icon" style="font-size:16px;"></i>
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
import { randomString } from "./../../assets/js/common/common";
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-setting",
          index: "/uploadData?PID=" + randomString(32),
          title: "统计任务"
        },
        {
          icon: "el-icon-menu",
          index: "Home?PID=" + randomString(32),
          title: "算法任务",
          subs: [
            {
              index: "/Home?id=0&PID=" + randomString(32),
              title: "创建算法任务"
            },
            {
              index: "/Home?id=1&PID=" + randomString(32),
              title: "训练任务"
            },
            {
              index: "/Home?id=2&PID=" + randomString(32),
              title: "应用模型"
            },
            {
              index: "/AlgoComplated?PID=" + randomString(32),
              title: "已完成"
            },
            {
              index: "/AlgoUndone?PID=" + randomString(32),
              title: "未完成"
            }
          ]
        },
        {
          icon: "el-icon-date",
          title: "数据预处理",
          index: "/Item3?PID=" + randomString(32),
          subs: [
            {
              icon: "el-icon-star-on",
              index: "/Item3?id=2&PID=" + randomString(32),
              title: "创建数据预处理"
            },
            {
              icon: "el-icon-star-on",
              index: "/Item3?id=3&PID=" + randomString(32),
              title: "执行数据预处理"
            }
          ]
        },
        {
          icon: "el-icon-star-on",
          index: "dataManage",
          title: "数据管理",
          subs: [
            {
              index: "/Item4/Upload?PID=" + randomString(32),
              title: "离线数据上传"
            },
            {
              index: "/Item4/Inquire?PID=" + randomString(32),
              title: "离线数据查询"
            }
          ]
        },
        {
          icon: "el-icon-search",
          index: "11",
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
  width: 200px;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 2px 0 3px 0 rgba(0, 0, 0, 0.1), 1px 0 1px 0 rgba(0, 0, 0, 0.1);
  float: left;
}

#FunctionList .list-left ul {
  height: 100%;
  background-image: -webkit-linear-gradient(#4562e9 0, #56b5fe 100%),
    -webkit-radial-gradient(18% 84%, #5888f5 2%, #586ef5 60%, #7558f4 100%);
  background-image: -o-linear-gradient(#4562e9 0, #56b5fe 100%),
    -o-radial-gradient(18% 84%, #5888f5 2%, #586ef5 60%, #7558f4 100%);
  background-image: linear-gradient(#4562e9 0, #56b5fe 100%),
    radial-gradient(18% 84%, #5888f5 2%, #586ef5 60%, #7558f4 100%);
}

#FunctionList .list-right {
  width: calc(100% - 200px);
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
.list-left .el-submenu__title:hover,
.list-left ul.el-menu .el-menu-item:hover {
  background-color: #3498db !important;
  color: #000 !important;
}
.list-left .el-menu-item:focus, .list-left .el-menu-item:hover{
     background-color: #3498db !important;
  color: #000 !important;
}

.list-left .el-submenu ul.el-menu {
  border-right: 0 none;
  box-sizing: border-box;
}
.list-left li.el-menu-item.is-active {
  color: #000 !important;
  border-right: 5px solid #2750F2 !important;
}
.list-left li.el-menu-item.is-active i.el-me-icon{
  background-color: #fff;
}
.list-left .el-submenu .el-menu .el-menu-item {
  padding-left: 45px !important;
  background-color: #5888f5 !important;
}

.list-left .el-submenu .el-menu .el-menu-item:hover {
  color: #ffff !important;
  background-color: #3498db !important;
}

/* el-icon-me */
.list-left ul.el-menu .el-menu-item i,
.list-left .el-submenu .el-submenu__title i {
  color: #fff;
 
}
.list-left ul.el-menu .el-menu-item i.el-me-icon{
  margin-right: 5px;
  box-sizing: border-box;
   width: 8px;
  height: 8px;
  border:1px solid #fff;
  border-radius: 50%;
  display: inline-block;
  /* background-color: #fff; */
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
