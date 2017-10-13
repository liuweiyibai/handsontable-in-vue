<template>
  <div id="addFile">
    <div class="file-aside">
      <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传TXT/CSV文件，且不超过3MB</div>
      </el-upload>
    </div>
    <div class="table-detail" ref="refTable">
      <el-table :data="tableData3" border style="width: 100%" height="300">
        <el-table-column prop="date" :label="things" >
        </el-table-column>
        <el-table-column prop="name" label="姓名" >
        </el-table-column>
        <el-table-column prop="province" label="省份" >
        </el-table-column>
        <el-table-column prop="city" label="市区" >
        </el-table-column>
        <el-table-column prop="address" label="地址" >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      things:"age",
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  mounted() {
    let doms = this.$refs.refTable;
    this.InitPs(doms);
  },
  methods: {
    InitPs(dom) {
      this.Ps.initialize(dom, {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20,
        suppressScrollY: true
      })
    }
  }
}
</script>
<style >
#addFile {
  width: auto;
  height: calc(100vh - 60px);
  box-sizing: border-box;
  padding: 20px 50px;
}

#addFile .file-aside {
  min-width: 961px;
  text-align: center;
}

#addFile .file-aside .upload-demo,
#addFile .file-aside .upload-demo>div {
  width: 100%;
}

#addFile .file-aside .upload-demo div.el-upload-dragger {
  width: 100%;
}

#addFile .table-detail {
  margin: 20px auto;
  height: 300px;
  background-color: red;
  width: 100%;
}
</style>

