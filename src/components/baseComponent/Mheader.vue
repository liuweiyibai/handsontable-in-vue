<template>
  <div id="Mheader">
    <nav class="default-nav">
      <div class="nav-left">
        <h1>LOGO</h1>
      </div>
      <div class="nav-right">
        <el-menu :default-active="activeIndex2" class="el-menu-demo nav-right-list" mode="horizontal" @select="handleSelect">
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">
              <router-link to="/uploadData">选择数源</router-link>
            </el-menu-item>
            <el-menu-item index="2-2">
              <router-link to="/">数据表</router-link>
            </el-menu-item>
            <el-menu-item index="2-3">
              <router-link to="/InstrumentBoard">仪表盘</router-link>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="1">帮助
            <i class="iconfont">&#xe6af;</i>
          </el-menu-item>
        </el-menu>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex2: "100"
    }
  },
  methods: {
    handleSelect() {
      console.log('我被选中了！');

    }
  }
}
</script>

<style scoped>
#Mheader {
  box-sizing: border-box;
  height: 60px;
  width: 100%;
}

.default-nav {
  box-sizing: border-box;
  height: inherit;
  width: 100%;
  border-bottom: 1px solid #465463;
  position: fixed;
  top: 0;
  background-color: #192B3C;
  z-index: 600;
  min-width: 1200px;
  padding: 0 10px;
  font-size: 24px;
}

.nav-left {
  font-size: 28px;
  color: #0D6799;
  line-height: 60px;
  text-align: left;
  padding-left: 10px;
  float: left;
  cursor: pointer;
}

.nav-right {
  text-align: right;
  padding: 0 70px;
  width: 70%;
  float: right;
}

.nav-right-list {
  background-color: inherit;
  display: inline-block;
}
</style>

