<template>
  <div id="addFile">
    <div class="file-aside">
      <el-upload  class="upload-demo"
        ref="upload"
        drag
        :action="url"
        :on-change="onChange"
        :http-request="HttpMutaplile"
        :show-file-list="false"
        :before-upload="fileUploadBefore"
        :auto-upload="false">
      <i class="el-icon-upload" v-if="fileCoplate"></i>
      <div class="el-upload__text" v-if="fileCoplate">将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip" v-if="fileCoplate">
        点击上传文件（.xls,.xlsx,.csv或.txt,小于3M）
      </div>
        <span v-show="!fileCoplate" 
        style="height:100%;line-height:178px;display:inline-block;">{{fileNames}}</span>
      </el-upload>
    </div>
    <div class="button-ls">
      <el-button size="mini">上一步</el-button>
      <el-button size="mini" @click="previewFile()">下一步</el-button>
      <el-button @click="uploadFile()" size="mini" style="float:left;">预览</el-button>
    </div>
    <div class="table-detail" ref="refTable" v-show="tableData3.length > 0">
      <Tables :data="tableData3"></Tables>
    </div>
  </div>
</template>
<script>
import Tables from "./../Tables/table";
import setArr from "./../../assets/js/common/setArr";
import { randomString } from "./../../assets/js/common/common";
export default {
  data() {
    return {
      fileData: {
        userID: 1001,
        userName: "guest"
      },
      fileObj: {},
      fileNames: "multipartFile",
      fileCoplate: true,
      things: "age",
      url: this.URL.ip2 + "uploadFile",
      tableData3: [],
      tableData: {}
    };
  },
  mounted() {
    let doms = this.$refs.refTable;
    this.InitPs(doms);
  },
  components: {
    Tables
  },
  methods: {
    fileUploadBefore(file) {
      // console.log(file);
    },
    uploadFile() {
      this.$refs.upload.submit();
    },
    // 文件发生更改
    onChange(file) {
      let self = this;
      self.fileNames = file.name;
      self.fileCoplate = false;
    },
    // 下一步 ：上传文件
    previewFile() {
      let self = this;
      let params = new FormData(),
        config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
      params.append("Token", self.ID);
      params.append("multipartFile", self.fileObj);
    
      self.$Http({
        url: self.URL.ip2 + "uploadFile",
        method: "post",
        data: params,
        config
      }).then(m=>{
        console.log(m);
          // self.tableData3 = setArr(m.data);
      // self.tableData = m;
      self.nextWork(m);
      });
    },
    // 预览文件
    HttpMutaplile(file) {
      let self = this;
      if (!file) {
        Message.error({ message: "请选中文件!" });
        return;
      }
      self.fileObj = file.file;
      let params = new FormData(),
        config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
      params.append("Token", self.ID);
      params.append("multipartFile", file.file);
      self
        .$Http({
          url: self.URL.ip2 + "previewFile",
          method: "post",
          data: params,
          config
        })
        .then(m => {
          if (!!m) {
            m.rows.forEach(item => {
              self.tableData3.push(item.rowdata.split(","));
            });
          }
        });
    },
    // 下一步操作
    nextWork(m) {
      localStorage.setItem("tableData", JSON.stringify(m));
      this.$router.push({
        path: "/Form",
        query: {
          PID: randomString(32)
        }
      });
    },
    InitPs(dom) {
      this.Ps.initialize(dom, {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20,
        suppressScrollY: true
      });
    }
  }
};
</script>
<style>
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
#addFile .file-aside .upload-demo > div {
  width: 100%;
}

#addFile .file-aside .upload-demo div.el-upload-dragger {
  width: 100%;
}
#addFile .button-ls {
  box-sizing: border-box;
  margin-top: 5px;
  text-align: right;
}
#addFile .table-detail {
  box-sizing: border-box;
  margin: 10px auto;
  height: 270px;
  width: 100%;
}
</style>

