<template>
  <div id="item2" class="item-detail-function">
    <div class="top">
      <div class="content">
        <h2>离线数据下载</h2>
      </div>
    </div>
    <div class="content--">
      <div class="content-list">
        <ul>
          <li class="content-btn bg1" style="width:100%;" @click="CHANGETAB(0)">
            <span>离线数据上传</span>
          </li>
        </ul>
      </div>
      <div class="content-body">
        <el-table :data="tableData3" height="250" border style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template scope="scope">
              <el-button size="small">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottom">
      <div class="inner">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  }
}
</script>
