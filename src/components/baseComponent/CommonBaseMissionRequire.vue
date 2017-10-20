<template>
  <div class="CommonBaseMissionRequire">
    <div class="top">
      <el-button>查询算法任务</el-button>
      <el-button>查询训练任务</el-button>
      <el-button>查询离线分析任务</el-button>
      <el-button>查询实例任务</el-button>
    </div>
    <div class="bottom">
      <el-table :data="onetable" style="width: 100%" border>
        <el-table-column prop="date" label="ID" width="200">
        </el-table-column>
        <el-table-column prop="name" label="任务表名称" width="200">
        </el-table-column>
        <el-table-column prop="name" label="状态" width="200">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template scope="scope">
            <el-button type="text" @click="changeSomeThing(scope)">查询</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="算法任务下训练" :visible.sync="dialogVisible" :size="large" :before-close="handleClose">
      <el-table :data="onetable" border style="width: 100%" >
        <el-table-column prop="date" label="ID" width="200">
        </el-table-column>
        <el-table-column prop="name" label="任务表名称" width="200">
        </el-table-column>
        <el-table-column prop="name" label="状态" width="200">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template scope="scope">
            <el-button type="text" @click="changeSomeThing(scope)">查询</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onetable: [{
        date: '2016-05-02',
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
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      dialogVisible: false
    }
  },
  methods: {
    changeSomeThing() {
      this.dialogVisible = true;
    }
  }
}
</script>

<style scoped>
.CommonBaseMissionRequire {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.CommonBaseMissionRequire .top {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 15px;
  box-shadow: 2px 0 3px 0 rgba(0, 0, 0, .1), 1px 0 1px 0 rgba(0, 0, 0, .1);
}

.CommonBaseMissionRequire .bottom {
  width: 100%;
  padding-right: 20px;
  padding: 12px 22px;
  box-sizing: border-box;
}
</style>
