<template>
  <aside id="instrumentList">
    <div class="boardMenu">
      <ul class="borderMenu-main">
        <li class="header">
          <span class="fun-text">图表分类</span>
          <span class="fun-icon icon-Close1">x</span>
        </li>
        <li class="linear"></li>
        <li class="extendAction">
          <a href="http://" class="chart-link">
            <span class="iconfont"></span>
            <span>饼形图</span>
          </a>
        </li>
        <li class="extendAction">
          <a href="http://" class="chart-link">
            <span class="iconfont"></span>
            <span>饼形图</span>
          </a>
        </li>
        
      </ul>
    </div>

  </aside>
</template>
<script>
export default {

}
</script>
<style>
#instrumentList {
  height: calc(100vh - 60px);
  margin: 60px auto;
}

.boardMenu {
  position: fixed;
  /* left: -256px; */
  left: 0;
  top: 60px;
  bottom: 0;
  z-index: 199;
  padding: 0;
  background: #192B3C;
  box-shadow: 1px 2px 5px #0F1013;
  transition: left .5s;
}

.boardMenu .borderMenu-main {
  width: 220px;
  padding: 0;
}

.boardMenu li.header {
  color: #edf0f5;
  height: 42px;
  line-height: 42px;
}

.boardMenu li.header .fun-text {
  font-size: 14px;
  margin-left: 25px;
}

.boardMenu li.header .fun-icon {
  margin-left: 105px;
  font-size: 14px;
  cursor: pointer;
}

.boardMenu li.linear {
  margin: 0 10px;
  border-top: 1px solid #11141B;
  border-bottom: 1px solid #393F4D;
}

.boardMenu li.extendAction {
  height: 28px;
  padding-left: 20px;
  line-height: 28px;
  margin-top: 10px;
  color: #fff;
  font-size: 12px;
  box-sizing: border-box;
}

.boardMenu li.extendAction .chart-link {
  display: block;
  color: #F3F4F6;
  font-size: 12px;
  height: 28px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  box-sizing: border-box;
  line-height: 28px;
}

.boardMenu li.extendAction:hover {
  padding-left: 15px;
  border-left: 5px solid #ffbe57;
  background-color: #30374a;
}
</style>

