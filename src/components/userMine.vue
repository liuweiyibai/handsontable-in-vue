<template>
  <div id="userMine">
    <div class="search">
      <el-input placeholder="请输入关键字" icon="search" v-model="input2" :on-icon-click="handleIconClick">
      </el-input>
    </div>
    <div class="line" style="width:100%;height:10px;"></div>
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我分享的" name="first">
          <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="名称" min-width="20%">
              </el-table-column>
              <el-table-column prop="name" label="所有者" min-width="20%">
              </el-table-column>
              <el-table-column prop="province" label="修改时间" min-width="20%">
              </el-table-column>
              <el-table-column prop="city" label="数据源" min-width="20%">
              </el-table-column>
              <el-table-column label="操作" min-width="20%">
                <template scope="scope">
                  <el-button @click="handleClick" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="分享给我" name="second">
          <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="名称" min-width="20%">
              </el-table-column>
              <el-table-column prop="name" label="所有者" min-width="20%">
              </el-table-column>
              <el-table-column prop="province" label="修改时间" min-width="20%">
              </el-table-column>
              <el-table-column prop="city" label="数据源" min-width="20%">
              </el-table-column>
              <el-table-column label="操作" min-width="20%">
                <template scope="scope">
                  <el-button @click="handleClick" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        activeName:"first"
      }
    }
  }
</script>
<style>
#userMine {
  width: calc(100%-50px);
  margin-left: 50px;
  height: 100vh;
  padding-left: 30px;
  padding-top: 45px;
  padding-right: 10px;
  box-sizing: border-box;
}
#userMine .search{
  width: 225px;
}
</style>

