<template>
  <div id="Mheader">
    <nav class="default-nav">
      <div class="nav-left">
        <h1>
          <img src="../../assets/img/logo.gif" alt="">
        </h1>
      </div>
      <div class="nav-right">
        <el-menu style="float:left;"
        :default-active="activeIndex2" 
        class="el-menu-demo nav-right-list" 
        mode="horizontal"
        menu-trigger="click"
         >
          <el-submenu index="2">
            <template slot="title">用户名</template>
            <el-menu-item index="2-3" @click="loginOut()">
              登出
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <el-menu style="float:right;"  class="el-menu-demo nav-right-list-help">
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
    };
  },
  methods: {
    loginOut(){
      this.$router.push('/');
    }
  }
};
</script>

<style>
#Mheader {
  box-sizing: border-box;
  height: 60px;
  width: 100%;
}

.default-nav {
  box-sizing: border-box;
  height: inherit;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #FFFFFF;
  z-index: 600;
  min-width: 1200px;
  font-size: 24px;
}

.nav-left {
  width: 220px;
  font-size: 28px;
  color: #fff;
  height: 60px;
  text-align: left;
  padding-left: 25px;
  box-sizing: border-box;
  float: left;
  cursor: pointer;
}
.nav-left h1{
  display: inline-block;
  width: 100%;
  height: 100%;
}


.nav-right {
  box-sizing: border-box;
  float: right;
  width: calc(100% - 220px);
  height: inherit;
  text-align: right;
  padding: 0 20px;
  color: #727881;
  box-shadow: 3px 5px 10px #ccc; 
  border-color:#ccc;
  background:#fff;
}
.nav-right ul.nav-right-list-help {
    border-right: 0 none !important;
}
.nav-right-list {
  background-color: inherit;
  display: inline-block;
  border-bottom: 0 none;
}
.nav-right-list div.el-submenu__title:hover{
  background-color: #fff !important;
}
.nav-right-list-help li.el-menu-item:hover{
  background-color: #fff !important;
}
</style>

