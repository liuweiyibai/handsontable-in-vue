<template>
  <div id="Mheader">
    <ul class="header-nav">
      <!-- 导航1，开始 -->
      <li class="header-nav-common header-nav-begin">
        <el-tooltip class="item" effect="dark" content="从这里开始" placement="right">
          <router-link tag="a" to="/start" class="a-link a-link-common">
            <span class="iconfont top">&#xe669;</span>
            <span class="bottom">开始</span>
          </router-link>
        </el-tooltip>
      </li>
      <!-- 导航2，到个人中心 -->
      <li class="header-nav-common header-nav-minespace">
        <router-link to="user-mine" class="a-link a-link-common">
          <span class="iconfont top">&#xe621;</span>
          <span class="bottom">我的</span>
        </router-link>
      </li>
      <!-- 导航3，到新建数据 -->
      <li class="header-nav-common header-nav-uploaddata">
        <router-link to="upload-data" class="a-link a-link-common">
          <span class="iconfont top">&#xe614;</span>
          <span class="bottom">新建数据</span>
        </router-link>
      </li>
      <!-- 导航4，到操作日志 -->
      <li class="header-nav-common header-nav-opeatedate">
        <router-link to="upload-data" class="a-link a-link-common">
          <span class="iconfont top">&#xe676;</span>
          <span class="bottom">操作日志</span>
        </router-link>
      </li>
       <li class="header-nav-common header-nav-opeatedate">
        <router-link to="table" class="a-link a-link-common">
          <span class="iconfont top">&#xe676;</span>
          <span class="bottom">工作表</span>
        </router-link>
      </li>
      <!-- 下面三个导航部分 -->
      <!-- 导航5，设置菜单-->
      <li class="header-nav-common header-nav-bottom1">
        <router-link to="setting" class="a-link a-link-common">
          <span class="iconfont top">&#xe600;</span>
          <span class="bottom">设置</span>
        </router-link>
      </li>
      <li class="header-nav-common header-nav-bottom2">
        <router-link to="upload-data" class="a-link a-link-common">
          <span class="iconfont top">&#xe657;</span>
          <span class="bottom">账户名</span>
        </router-link>
      </li>
      <li class="header-nav-common header-nav-bottom3">
        <router-link to="upload-data" class="a-link a-link-common">
          <span class="iconfont top">&#xe6af;</span>
          <span class="bottom">帮助</span>
        </router-link>
      </li>

    </ul>
  </div>
</template>
<script>
export default {
}
</script>

<style scoped>
.header-nav li {
  line-height: 1;
  box-sizing: border-box;
}

#Mheader {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  background-color: #172a3d;
  width: 50px;
  color: #fff;
}

.header-nav-common {
  text-align: center;
  width: 100%;
  padding: 10px 0 5px 0;
}
.header-nav-begin{
  padding-top: 0;
}
.a-link {
  display: block;
  width: 100%;
  height: 100%;
  padding-top: 10px;
  color: #fff;
}

.a-link-common:hover {
  background-color: hsla(0, 0%, 100%, .1);
}

.a-link-common .top {
  display: block;
  width: 25px;
  height: 24px;
  margin: 0 auto
}

.a-link-common .bottom {
  overflow: hidden;
  margin-top: 4px;
  display: block;
  text-align: center;
  font-size: 12px;
  transform: scale(.83333);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, .2);
}

.header-nav-bottom1 {
  position: absolute;
  bottom: 125px;
}

.header-nav-bottom2 {
  position: absolute;
  bottom: 65px;
}

.header-nav-bottom3 {
  position: absolute;
  bottom: 5px;
}
/* .router-link-active{
  background-color: hsla(0,0%,100%,.2);
} */
</style>

