<template>
  <div id="addFile" class="container-app">
    <div class="addFileWraper">
      <div class="nav-addFile">
        <ul class="nav">
          <li class="active">数据表</li>
          <li>仪表盘</li>
        </ul>
      </div>
      <div class="detail-addFile">
        <div class="header">
          <div class="search-bar">
            <el-input size="small" placeholder="输入关键词" icon="search" v-model="input2" :on-icon-click="handleIconClick">
            </el-input>
          </div>
          <div class="tabbar">
            <el-upload ref='upload' class="upload-demo" :show-file-list="false" action="http://www.baidu.com" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="fileSuccess" :before-upload="beforeAvatarUpload" :on-progress="showLayer" :on-error="open">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </div>
        <div class="main">
          <el-table :data="tableData" style="width: 100%">
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
                <el-button @click="handleClick(scope.$index,scope.row.number)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="bottom"></div>
      </div>
    </div>
  </div>
</template>
<script>
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
      }]
    }
  },
  methods: {
    handlePreview() {
      console.log('on priview');
    },
    handleRemove() {
      console.log('on file remove');
    },
    fileSuccess() {
      console.log('fileupload success');
    },
    beforeAvatarUpload(fileData) {
      console.log(fileData);
      console.log(this.$refs.upload.abort);
      console.log('upload before');
    },
    showLayer() {
      // 163317  160k
      console.log('loading')
    },
    handleClick(one, two) {
      console.log(one);
      console.log(two);
    }
  }
}
</script>
<style scoped>
.container-app {
  width: auto;
  height: 100vh;
  margin: 50px auto;
}

.addFileWraper {
  padding: 0 10px;
}

#addFile {
  padding-top: 26px;
}

.nav-addFile {
  width: 100%;
  padding: 0 0 9px;
  margin: 0;
  background: #fff;
  border-bottom: 1px solid #f2f2f2;
}

.nav-addFile>.nav {
  padding-top: 10px;
  margin-bottom: 0;
  height: 40px;
  background-color: #fff;
}

.nav-addFile>.nav>li {
  padding-top: 2px;
  cursor: pointer;
  float: left;
  width: 114px;
  line-height: 44px;
  text-align: center;
  font-size: 16px;
  color: #9b9b9b;
}

.nav-addFile>.nav li.active {
  border-bottom: 3px solid #3bafda;
  color: #4a4a4a;
}










/*这里是header部分的样式表*/

.detail-addFile {
  width: 100%;
  height: 100%;
  min-height: 550px;
  position: relative;
}

.detail-addFile>.header {
  width: 100%;
  height: 50px;
  color: rgb(102, 102, 102);
  padding-top: 3px;
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
  margin: 10px 20px;
}
</style>
