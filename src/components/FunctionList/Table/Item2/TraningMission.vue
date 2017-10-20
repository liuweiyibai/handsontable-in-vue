<template>
  <div id="Item2Table" class="table--">
    <div class="top">
      <span class="text-back iconfont icon-back"></span>
      <h2 class="text-h2">训练模型</h2>
    </div>
    <div class="content">
      <el-table :data="tableData" border style="width: 100%;overflow:hidden;" max-height="400" ref="tables">
        <el-table-column type="expand">
          <template scope="props">
            <el-table :data="tableData" style="width: 100%;margin-top:-20px;margin-bottom:-20px;box-sizing:border-box;">
              <el-table-column prop="date" label="名称" width="180">
              </el-table-column>
              <el-table-column prop="name" label="训练成功个数">
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="ID" width="180">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任务表名称" width="180">
          <template scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="ArithmeticPublist(scope.$index, scope.row)">算法发布</el-button>
            <el-button size="small" @click="handleDelete(scope.$index, scope.row)">离线数据分析</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{
        id: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }]
    }
  },
  methods: {
    // 算法发布任务
    ArithmeticPublist() {

    }
  },
  mounted(){
   
  }
}
</script>
<style scoped>
@import url('../table.css');
</style>
