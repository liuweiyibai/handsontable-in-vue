<template>
  <div id="start">
    <div class="container">
      <header class="start-header">
        <div class="left">
          <span class="avatar">
            <i class="el-icon-star-on"></i>
          </span>
          <span class="username">
            <i>HI</i>用户名</span>
          <span class="legin">v1</span>
        </div>
        <div class="right">
          <div class="data">
            <p>剩余
              <i>20</i>天试用期</p>
          </div>
          <div class="control">
            <el-button type="primary" size="small">续费升级进入管控台</el-button>
          </div>
        </div>
      </header>
      <aside class="main-container">
        <div class="left">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>我收藏的</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>别人分享给我的</el-menu-item>
          </el-menu>
        </div>
        <div class="main">
          <div class="new-paper">
            <span>新建报表</span>
          </div>
          <ul class="main-step">
            <li>
              <div class="title">添加数据源</div>
              <span class="index">1</span>
              <div class="change">添加数据源</div>
            </li>
            <li>
              <div class="title">添加数据源</div>
              <span class="index">1</span>
              <div class="change">添加数据源</div>
            </li>
            <li>
              <div class="title">添加数据源</div>
              <span class="index">1</span>
              <div class="change">添加数据源</div>
            </li>
            <li>
              <div class="title">添加数据源</div>
              <span class="index">1</span>
              <div class="change">添加数据源</div>
            </li>
          </ul>
        </div>
        <div class="right">
          <div class="tutotrial">
            <div class="tutotrial-top">
              <p style="float:left">使用教程</p>
              <a href="javascript:void(0)" style="float:right;">更多</a>
            </div>
          </div>

        </div>
      </aside>
      <aside class="otherThing">
        <div class="case-dialog">
          <div class="name">报表案例</div>
          <ul class="list">
            <li>
              <div>销售数据情况分析</div>
            </li>
            <li><div>网站会员数据情况分析</div></li>
            <li><div>公司销售大盘</div></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style>
#start {
  margin-left: 50px;
  width: calc(100%-50px);
  min-width: 1200px;
  height: 100vh;
  background-color: #ECECEC;
  overflow-x: hidden;
  overflow-y: auto;
}

.start-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 8vh;
  padding: 15px 19px 14px 27px;
  background-color: #fff;
}

.start-header .left {
  width: 255px;
  border-right: 1px solid #ccc;
  height: 45px;
  display: flex;
  text-align: center;
  box-sizing: border-box;
  line-height: 45px;
}

.start-header .left span {
  display: inline-block;
}

.start-header .left .avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: yellowgreen;
  text-align: center;
}

.start-header .left .username {
  font-size: 12px;
  padding-left: 30px;
}

.start-header .left .legin {
  font-size: 16px;
  color: #CECBCF;
  padding: 1px 5px 1px 100px;
}

.start-header .right {
  width: 409px;
  height: 45px;
}

.start-header .right .data {
  width: 191px;
  color: #B0B0B0;
  font-size: 12px;
  float: left;
}

.start-header .right .data i {
  font-size: 20px;
  font-style: normal;
}

.start-header .right .control {
  float: right;
  margin-top: 10px;
  padding-right: 45px;
}

.main-container {
  display: flex;
  margin-top: 11px;
  height: 60vh;
  padding-bottom: 20px;
  box-sizing: border-box;
}

.main-container .left {
  flex: 0 0 20%;
  height: 40vh;
  margin-left: 12px;
}

.main-container .main {
  margin-left: 12px;
  flex: 0 0 60%;
  height: 100%;
  border-radius: 1px;
  background-color: #fff;
}

.main-container .main .new-paper {
  border-bottom: 1px solid #F2F2F2;
  height: 44px;
  width: 100%;
  line-height: 44px;
  box-sizing: border-box;
  padding-left: 49px;
}

.main-container .main .main-step {
  margin: 20px auto;
  height: 90%;
  width: 100%;
  display: flex;
}

.main-container .main .main-step li {
  flex: 1;
  margin-left: 10px;
  height: 40vh;
  width: 150px;
  background-color: #F9FAFC;
  border: 1px solid #ECECEC;
  border-radius: 1px;
  position: relative;
}

.main-container .main .main-step li .title {
  position: absolute;
  top: 20px;
  left: 45px;
  font-size: 14px;
  color: #6B6762;
}

.main-container .main .main-step li .index {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: block;
  text-align: center;
  line-height: 30px;
  background-color: #4DBEDB;
  position: absolute;
  left: -5px;
  top: 45%;
}

.main-container .main .main-step li .change {
  width: 117px;
  height: 45px;
  border: 1px dashed #4DBEDB;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
  line-height: 45px;
  position: absolute;
  left: 24px;
  bottom: 20px;
}

.main-container .main .main-step li:last-child {
  margin-right: 10px;
}

.main-container .main .new-paper span {
  display: block;
  width: 85px;
  height: 44px;
  font-size: 14px;
  font-weight: 700;
  color: #4DBEDB;
  padding-left: 10px;
  box-sizing: border-box;
  padding-bottom: 1px;
  border-bottom: 2px solid #4DBEDB;
}

.main-container .right {
  flex: 0 0 15%;
  height: 40vh;
  margin-left: 15px;
  padding-right: 10px;
  background-color: #FFFFFF;
}

.main-container .right .tutotrial-top {
  border-bottom: 1px solid #F2F2F2;
  height: 44px;
  width: 100%;
  line-height: 44px;
  box-sizing: border-box;
  padding-left: 5px;
  font-size: 12px;
  color: #000;
}

.main-container .right .tutotrial-top a {
  color: #4DBEDB;
}

.otherThing {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
}

.otherThing .case-dialog {
  margin-left: 48px;
  flex: 0 0 60%;
  height: 22vh;
  min-height: 225px;
  background-color: #fff;
  border-radius: 1px;
}

.otherThing .case-dialog .name {
  height: 44px;
  width: 100%;
  border-bottom: 1px solid #F2F2F2;
  line-height: 44px;
  box-sizing: border-box;
  padding-left: 5px;
  font-size: 12px;
  color: #000;
}
.otherThing .case-dialog .list{
  padding-top: 18px;
  padding-left: 35px;
  display: flex;
  flex: 1;
}
.otherThing .case-dialog .list li{
  width: 200px;
  height: 160px;
  background-color: #F9FAFC;
  margin-left: 10px;
  position: relative;
}
.otherThing .case-dialog .list li div{
  position: absolute;
  width: 100%;
  height: 30px;
  background-color: #B2AFAF;
  bottom:0;
  left:0;
  font-size: 14px;
  color: #fff;
  line-height: 30px;
  text-align: center;
}






.el-menu {
    border-radius: 2px;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #fff !important;
}
</style>

