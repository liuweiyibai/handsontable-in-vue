<template>
  <div id="Mheader">
    <nav class="default-nav">
      <div class="nav-left">
        <h1>
          <img src="../../assets/img/logo.gif" alt="" width="100%" height="100%">
        </h1>
      </div>
      <div class="nav-right">
        <el-menu class="el-menu-demo nav-right-list-help">
           <el-menu-item index="1">帮助
            <i class="iconfont">&#xe6af;</i>
          </el-menu-item>
        </el-menu>
        <el-menu style="float:right;"
        :default-active="activeIndex2" 
        class="el-menu-demo nav-right-list" 
        mode="horizontal"
        menu-trigger="click"
         >
          <el-submenu index="2">
            <template slot="title">{{userInfo}}</template>
            <el-menu-item index="2-3" @click="loginOut()">
              登出
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex2: "100",
      userInfo: "用户名"
    };
  },
  mounted() {
    this.userInfo = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : this.userInfo;
  },
  methods: {
    loginOut() {
      this.Cookie("ISLOGIN", null);
      this.Cookie("TOKEN", null);
      this.$router.push("/Item2/TraningMission");
      console.log("clear all CACHE and login out successful！");
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
  background-color: #ffffff;
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
  box-shadow: 1px -1px 10px #ccc;
  box-sizing: border-box;
  float: left;
  cursor: pointer;
}
.nav-left h1 {
  display: inline-block;
  padding-top: 4px;
  width: 67%;
  height: 80%;
}

.nav-right {
  box-sizing: border-box;
  float: right;
  width: calc(100% - 220px);
  height: inherit;
  text-align: right;
  padding: 0 45px;
  color: #727881;
  box-shadow: 5px 5px 10px #ccc;
  border-color: #ccc;
  background: #fff;
}
.nav-right ul.nav-right-list-help {
  border-right: 0 none !important;
  float: right;
  padding-top: 3px;
}
.nav-right ul.nav-right-list-help .iconfont {
  font-size: 20px;
}
.nav-right-list {
  background-color: inherit;
  display: inline-block;
  border-bottom: 0 none;
}
.nav-right-list div.el-submenu__title:hover {
  background-color: #fff !important;
}
.nav-right-list-help li.el-menu-item:hover {
  background-color: #fff !important;
}
</style>

