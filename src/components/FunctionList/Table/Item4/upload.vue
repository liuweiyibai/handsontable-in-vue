<template>
  <div id="item4" class="item-detail-function">
    <div class="top">
      <div class="content">
        <h2>离线数据上传</h2>
      </div>
    </div>
    <div class="content--">
      <div class="content-list">
        <ul id="item4-ul">
          <li class="content-btn w50"
          style="z-index:2">
            离线数据上传
            <em></em>
            <i></i>
          </li>
          <li class="content-btn w50"
          style="z-index:1" >
            文件设置
            <em></em>
            <i></i>
          </li>
        </ul>
      </div>
      <div class="content-body">
        <div class="div-common" v-show="divShowOrHide[0].divshow">
          <div class="box-title">
            <h4>文件上传</h4>
          </div>
          <div class="file-aside">
            <el-upload class="upload-demo" drag action="ff" :before-upload="fileUpload" :show-file-list="false">
              <i class="el-icon-upload" v-if="fileCoplate"></i>
              <div class="el-upload__text" v-if="fileCoplate">将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip" v-if="fileCoplate">
                点击上传文件（.xls,.xlsx,.csv或.txt
                <60M）</div>
                <span v-show="!fileCoplate" style="height:100%;line-height:178px;display:inline-block;">{{fileObj.filename}}</span>
              </el-upload>
          </div>
          <div class="btn-con" style="position:absolute;bottom:15px;right:30px;">
            <el-button size="small" @click="UploadNextStep()" :disabled="btnDisable.btn1">下一步</el-button>
          </div>
        </div>
          <div class="div-common" v-show="divShowOrHide[1].divshow" style="padding:20px 12px;box-sizing:border-box;">
            <el-form ref="form" label-width="120px">
              <el-form-item label="文件路径：">
                <span class="el-span" style="width:100%;" @click="loadTreeData">{{seleFilePath}}</span>
              </el-form-item>
              <el-form-item label="文件名称：">
                <el-input v-model="fileObj.filename" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="标签：">
                <el-input v-model="fileObj.label"></el-input>
              </el-form-item>
              <el-form-item label="描述：">
                <el-input type="textarea" v-model="fileObj.describe"></el-input>
              </el-form-item>
            </el-form>
            <div class="btn-con" style="position:absolute;bottom:15px;right:30px;">
              <el-button size="small" @click="prevStep()">上一步</el-button>
              <el-button size="small" @click="mutation()">提交</el-button>
             </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="inner">
        </div>
      </div>
      <el-dialog
        title="文件路径"
        :visible.sync="dialogRoot"
        width="60%">
        <div v-if="treeData.length>0">
         <tree :list.sync='treeData' 
          :func='nodeClick'
          :expand='expandClick'>
         </tree>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addNodeDialog = true" size="small" style="float:left;">新建文件夹</el-button>
          <el-button @click="dialogRoot = false" size="small">取 消</el-button>
          <el-button type="primary" @click="dialogRoot = false" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 内层dialog，添加新建文件夹的名字 -->
      <el-dialog title="请输入文件夹名称"  :visible.sync="addNodeDialog">
        <el-form>
          <el-form-item>
            <el-input v-model="newfilePath" size="small"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addNodeDialog = false" size="small">取 消</el-button>
          <el-button type="primary" @click="addNode" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import ZTree from "../../../tree/tree";
import { getStr } from "../../../../assets/js/common/common";
export default {
  data() {
    return {
      fileCoplate: true,
      divShowOrHide: [
        {
          divshow: true,
          bg1: true,
          bg2: false
        },
        {
          divshow: false,
          bg1: false,
          bg2: true
        }
      ],
      dialogRoot: false,
      addNodeDialog: false,
      newfilePath: "",
      nodeModel: null, // 当前点击节点对象
      parentNodeModel: null, // 当前点击节点的父对象
      fileObj: {
        filename: "",
        label: "",
        path: "",
        describe: "",
        filePath: ""
      },
      btnDisable: {
        btn1: true
      },
      // 当前备选中的文件路径，用来做新建文件夹操作
      seleFilePath: "",
      treeData: []
    };
  },
  methods: {
    CreatArr(arr) {
      let newArr = [];
      for (let i = 0, len = arr.length; i < len; i++) {
        newArr.push({
          id: Math.random(100) + i + 1,
          name: getStr(arr[i], "/"),
          iconClass: "iconClassRoot",
          url: arr[i],
          path: arr[i],
          clickNode: false,
          isFolder: false,
          isExpand: false,
          loadNode: 0,
          children: []
        });
      }
      return newArr;
    },
    // 新建文件夹
    newFileHttp(id) {
      if (!id) {
        id = "/";
      } else {
        let params = new URLSearchParams();
        params.append("userId", this.ID);
        params.append("newPath", id);
        this.$Http({
          url: this.URL.ip1 + "upload/craetepath",
          method: "post",
          data: params
        }).then(m => {
          this.newfilePath = "";
          this.loadTreeData();
          console.log(m);
        });
      }
    },
    // 点击节点
    nodeClick(m, parent, trees) {
      this.nodeModel = m; // 当前点击节点对象
      this.parentNodeModel = parent; //当前点击节点父亲对象
      this.seleFilePath = m.path;
    },
    // 第一次加载文件路径
    loadTreeData() {
      let self = this,
        params = new URLSearchParams();
      params.append("userId", self.ID);
      params.append("newPath", "/");
      self
        .$Http({
          url: self.URL.ip1 + "upload/getpath",
          method: "post",
          data: params
        })
        .then(m => {
          self.dialogRoot = true;
          self.treeData = self.CreatArr(m.paths);
        });
    },
    // 点击展开收起，加载子节点
    expandClick(m) {
      let url = m.path;
      let self = this;
      let params = new URLSearchParams();
      params.append("userId", self.ID);
      params.append("newPath", url);
      // 点击异步加载
      if (m.isExpand) {
        // 动态加载子节点, 模拟ajax请求数据
        // 请注意 id 不能重复哦。
        if (m.hasOwnProperty("children")) {
          m.loadNode = 1; // 正在加载节点
          self
            .$Http({
              url: self.URL.ip1 + "upload/getpath",
              method: "post",
              data: params
            })
            .then(result => {
              m.loadNode = 2; // 节点加载完毕
              m.isFolder = !m.isFolder;
              m.children = self.CreatArr(result.paths);
            });
        }
      }
    },
    // 新增节点
    addNode() {
      let self = this;
      let url = "";
      if (self.nodeModel) {
        self.addNodeDialog = false;
        let name = self.newfilePath;
        url = self.nodeModel.path + "/" + self.newfilePath;
        self.nodeModel.children.push({
          id: Math.random(100),
          name: name,
          iconClass: "iconClassRoot",
          clickNode: false,
          isFolder: false,
          isExpand: false,
          path: url,
          loadNode: 0,
          children: []
        });
        self.newFileHttp(url);
        self.nodeModel.isFolder = true;
      } else {
        self.addNodeDialog = false;
        let name = self.newfilePath,
          url = "/" + self.newfilePath;
        self.treeData.push({
          id: Math.random(100),
          name: name,
          iconClass: "iconClassRoot",
          clickNode: false,
          isFolder: false,
          isExpand: false,
          path: url,
          loadNode: 0,
          children: []
        });
        self.newFileHttp(url);
        // self.nodeModel.isFolder = true;
      }
    },
    // 新建文件夹名称过滤器
    message(txt) {
      this.$message(txt);
    },
    CHANGETAB(index) {
      for (let i = 0, len = this.divShowOrHide.length; i < len; i++) {
        this.divShowOrHide[i].divshow = false;
        this.divShowOrHide[i].bg1 = false;
        this.divShowOrHide[i].bg2 = true;
      }
      this.divShowOrHide[index].divshow = true;
      this.divShowOrHide[index].bg1 = true;
      this.divShowOrHide[index].bg2 = false;
    },
    fileUpload(file) {
      let formdate = new FormData(),
        self = this;
      formdate.append("file", file);
      formdate.append("userId", self.ID);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      self
        .$Http({
          url: self.URL.ip1 + "upload/test",
          // url: self.URL.ip2 + "uploadFile",
          method: "post",
          data: formdate,
          config
        })
        .then(m => {
          if (m.status == 1) {
            self.btnDisable.btn1 = false;
            self.fileObj.filename = m.filename;
            self.fileObj.path = m.path;
            self.fileCoplate = false;
            self.message("上传成功！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    UploadNextStep() {
      this.CHANGETAB(1);
      this.fileCoplate = true;
    },
    prevStep() {
      this.CHANGETAB(0);
    },
    // 最后提交操作
    mutation() {
      let param = new URLSearchParams(),
        self = this;
      param.append("filename", self.fileObj.filename);
      param.append("label", self.fileObj.label);
      param.append("path", self.fileObj.path);
      param.append("userId", self.ID);
      param.append("describe", self.fileObj.describe);
      param.append(
        "hdfsname",
        self.seleFilePath == "" ? "/" : self.seleFilePath
      );
      self
        .$Http({
          url: self.URL.ip1 + "upload/upLoadFileParam",
          method: "post",
          data: param
        })
        .then(m => {
          this.message("提交成功");
          this.$router.push({
            path: "/Item4/Inquire"
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    tree: ZTree
  }
};
</script>
<style>
.w50 {
  width: 50%;
}
#item4 .upload-demo {
  width: 100%;
}
#item4 .upload-demo .el-upload {
  width: 100%;
}
#item4 .upload-demo .el-upload .el-upload-dragger {
  width: 100%;
}
#item4-ul {
  height: 32px;
  overflow: hidden;
  width: 100%;
}
#item4-ul li {
  float: left;
  cursor: pointer;
  text-align: center;
  position: relative;
  font-weight: bold;
  font-size: 14px;
  line-height: 32px;
  background-color: #f0f0f0;
}
#item4-ul li em {
  position: absolute;
  right: -24px;
  top: -8px;
  width: 0;
  height: 0;
  line-height: 0;
  border-width: 24px 0 24px 24px;
  border-color: transparent transparent transparent #fff;
  border-style: dashed dashed dashed solid;
}
#item4-ul li i {
  position: absolute;
  right: -16px;
  top: 0;
  width: 0;
  height: 0;
  line-height: 0;
  border-width: 16px 0 16px 16px;
  border-color: transparent transparent transparent #f0f0f0;
  border-style: dashed dashed dashed solid;
}
.item4-active {
  background-color: #fff;
}
li.item4-active em {
  border-color: transparent transparent transparent #f9fbfc;
}
li.item4-active i {
  border-color: transparent transparent transparent #fff;
}
.iconClassRoot {
  width: 15px;
  height: 15px;
  display: inline-block;
  background: url("../../../../components/tree/images/ztree/root.png") no-repeat
    center/100% auto;
}
.iconClassNode {
  width: 15px;
  height: 15px;
  display: inline-block;
  background: url("../../../../components/tree/images/ztree/node.png") no-repeat
    center/100% auto;
}
</style>


