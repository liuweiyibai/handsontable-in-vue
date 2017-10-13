<template>
  <div id="FunctionList">
    <div class="list-left">
      <ul id="uls">
        <router-link to="/uploadData">
          <li class="left-item" :class="{'active':show==1}" @click="changeShow(1)">
            <span class="iconfont icon-tongji"></span>
            统计任务
          </li>
        </router-link>
        <router-link to="Item2">
          <li class="left-item" :class="{'active':show==2}" @click="changeShow(2)">
            <span class="iconfont icon-suanfa"></span>
            算法任务
          </li>
        </router-link>
        <router-link to="Item3">
          <li class="left-item" :class="{'active':show==3}" @click="changeShow(3)">
            <span class="iconfont icon-shuju"></span>
            数据管理
          </li>
        </router-link>
        <router-link to="/Item4">
          <li class="left-item" :class="{'active':show==4}" @click="changeShow(4)">
            <span class="iconfont icon-lixianxiazai"></span>
            离线数据处理任务
          </li>
        </router-link>
        <li class="img"></li>
      </ul>
    </div>
    <div class="list-right">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: 0
    }
  },
  mounted() {
  },
  methods: {
    changeShow(index) {
      this.show = index;
    },
    con() {
      console.log(this.$route);
    }
  }
}
</script>

<style>
#FunctionList {
  height: calc(100vh - 60px);
  /* margin: 60px auto; */
  background-color: #E7EAEC;
}

#FunctionList .list-left {
  width: 220px;
  height: 100%;
  padding-top: 20px;
  box-sizing: border-box;
  box-shadow: 2px 0 3px 0 rgba(0, 0, 0, .1), 1px 0 1px 0 rgba(0, 0, 0, .1);
  float: left;
}

#FunctionList .list-right {
  width: calc(100% - 220px);
  box-sizing: border-box;
  height: 100%;
  float: right;
}

#FunctionList .list-left ul li.left-item {
  line-height: 20px;
  padding: 10px 20px;
  box-sizing: border-box;
  cursor: pointer;
  color: #000;
  font-size: 14px;
}

#FunctionList .list-left ul li.left-item span.iconfont {
  font-size: 16px;
}

#FunctionList .list-left ul li:hover {
  background-color: #F3F5F6;
}

.active {
  background-color: #FFFFFF;
}

.active:hover {
  background-color: #FFFFFF;
}
</style>
