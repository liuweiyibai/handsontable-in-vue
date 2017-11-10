<template>
  <div class="container-app">
    <div class="top">
      <div class="content">
        <h2>统计任务</h2>
      </div>
    </div>
    <div class="Maincontent detail-addFile">
      <div class="header">
        <div class="search-bar">
          <el-input size="small" placeholder="输入关键词">
          <i slot="suffix" class="el-input__icon el-icon-search"  @click="handleIconClick"></i>
          </el-input>
        </div>
        <div class="tabbar">
          <el-button size="small" type="primary" @click="dialogVisible = true">选择数据源</el-button>
        </div>
      </div>
      <div class="main">
        <el-table :data="tableData" border max-height="400">
          <el-table-column prop="date" label="名称">
          </el-table-column>
          <el-table-column prop="name" label="所有者">
          </el-table-column>
          <el-table-column prop="province" label="修改时间">
          </el-table-column>
          <el-table-column prop="city" label="数据源">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClickToForm(scope.$index,scope.row.number)" type="text" size="small">表格分析</el-button>
              <el-button @click="handleClickToInstrumentBoard()" type="text" size="small">仪表盘分析</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 上传文件弹层 -->
    <div id="dialogUpload">
      <el-dialog title="新建数据源" :visible.sync="dialogVisible" width="30%">
        <div class="dialog-top" title="本地数据文件">
          <div class="img-content">
            <router-link to="/uploadData/addFile">
              <div class="top-img1">
                <div class="img">
                  <img src="../../assets/img/db_46_big.png" alt="" style="width:100%;height:100%;">
                </div>
                <p class="img-text">
                  CSV文件上传
                </p>
              </div>
            </router-link>
            <router-link to="/uploadData/addFile">
              <div class="top-img1">
                <div class="img">
                  <img src="../../assets/img/db_47_big.png" alt="" style="width:100%;height:100%;">
                </div>
                <p class="img-text">
                  TXT文件上传
                </p>
              </div>
            </router-link>
          </div>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align: center;">
          <div class="txt">建议在chrome下进行文件上传</div>
          <div class="txt">支持文件CSV/TXT格式文件，文件大小在3M</div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { MathRound } from '../../assets/js/common/MathRound'
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        number: 100000
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        number: 100000
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        number: 100000
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        number: 100000
      }],
      dialogVisible: false
    }
  },
  methods: {
    // 表格的搜索
    handleIconClick(data) {
      console.log(data);
    },
    // 切换到表格
    handleClickToForm(one, two) {
      let pwd = one + MathRound(3);
      this.$router.push({ path: '/Form', query: { pwd: pwd }, params: { name: "nitem" } });
    },
    // 切换到仪表盘
    handleClickToInstrumentBoard() {

    }
  }
}
</script>
<style scoped>
.container-app {
  height: calc(100vh - 60px);
  width: 100%;
  box-sizing: border-box;
}

.container-app .top {
  height: 56px;
  width: 100%;
  box-shadow: 2px 0 3px 0 rgba(0, 0, 0, .1), 1px 0 1px 0 rgba(0, 0, 0, .1);
}

.container-app .top .content {
  line-height: 48px;
  height: 48px;
  padding-top: 8px;
  background-color: transparent;
}

.container-app .Maincontent {
  padding: 12px 22px;
  box-sizing: border-box;
}

#dialogUpload .dialog-top {
  width: 100%;
  text-align: center;
}

#dialogUpload .dialog-top .img-content {
  width: 100%;
}

#dialogUpload .dialog-top .img-content .top-img1 {
  width: 150px;
  margin: 0 auto;
  padding: 16px;
  box-sizing: border-box;
  position: relative;
}

#dialogUpload .dialog-top .top-img1 .img {
  width: 120px;
  min-height: 120px;
  min-height: 120px;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, .1);
}

#dialogUpload .dialog-top .top-img1 .img-text {
  color: rgba(10, 18, 32, .87);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  position: absolute;
  bottom: 21px;
  left: 30px;
}









/*这里是header部分的样式表*/

.detail-addFile {
  position: relative;
}

.detail-addFile>.header {
  width: 100%;
  height: 50px;
  color: rgb(102, 102, 102);
  display: flex;
  justify-content: space-between;
}

.detail-addFile>.header>.search-bar {
  float: none;
  padding: 15px 8px;
  padding-top: 8px;
}

.detail-addFile>.header .tabbar {
  display: inline-flex;
  height: 28px;
  background: #FFF;
  box-sizing: border-box;
  margin: 10px 20px;
}

.dialog-footer .txt {
  line-height: 1;
  font-size: 14px;
  color: #9E9E9E;
}

.dialog-footer .txt:first-child {
  box-sizing: border-box;
  margin-bottom: 5px;
}
</style>
