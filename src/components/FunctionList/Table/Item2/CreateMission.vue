<template>
  <div id="Item2Table">
    <div class="top">
      <span class="text-back iconfont icon-back"></span>
      <h2 class="text-h2">创建算法任务列表</h2>
    </div>
    <div class="content">
      <el-table :data="tableData" border style="width: 100%;overflow:hidden;" max-height="400">
        <el-table-column label="ID" width="180">
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="算法名称" width="180">
          <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag>{{ scope.row.name }}</el-tag>
              </div>
          </template>
        </el-table-column>
        <el-table-column label="算法描述" width="180">
          <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag>{{ scope.row.name }}</el-tag>
              </div>
          </template>
        </el-table-column>
         <el-table-column label="状态" width="180">
          <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag>{{ scope.row.name }}</el-tag>
              </div>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">创建训练任务</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
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
      }, {
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
      }, {
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
      }, {
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
      }]
    }
  },
  methods:{
    handleEdit(){
       this.$router.push({
        path: "/Item2/TraningMission"
      });
    }
  
  }
}
</script>

<style>
#Item2Table {
  height: calc(100vh - 60px);
  /* margin: 60px auto; */
  box-sizing: border-box;
}

#Item2Table .top {
  width: 100%;
  height: 56px;
  line-height: 56px;
  box-sizing: border-box;
  box-shadow: 2px 0 3px 0 rgba(0, 0, 0, .1), 1px 0 1px 0 rgba(0, 0, 0, .1);
  padding-left: 20px;
}


#Item2Table .content {
  box-sizing: border-box;
  padding: 12px 22px;
  height: 400px;
  width: 100%;
}

#Item2Table .bottom {
  width: 100%;
  height: calc(100vh - 567px);
}
</style>

