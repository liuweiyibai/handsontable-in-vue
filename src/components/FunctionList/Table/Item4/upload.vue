<template>
  <div id="item1" class="item-detail-function">
    <div class="top">
      <div class="content">
        <h2>离线数据上传</h2>
      </div>
    </div>
    <div class="content--">
      <div class="content-list">
        <ul>
          <li class="content-btn w50" :class="{'bg1':divShowOrHide[0].bg1,'bg2': divShowOrHide[0].bg2}" @click="CHANGETAB(0)">
            <span>离线数据上传</span>
          </li>
          <li class="content-btn w50" :class="{'bg1':divShowOrHide[1].bg1,'bg2': divShowOrHide[1].bg2}" @click="CHANGETAB(1)">
            <span>文件设置</span>
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
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                点击上传文件（.xls,.xlsx,.csv或.txt
                <60M）</div>
            </el-upload>
            </div>
            <el-button size="small" @click="UploadNextStep()" :disabled="btnDisable.btn1">下一步</el-button>
          </div>
          <div class="div-common" v-show="divShowOrHide[1].divshow" style="padding:20px 12px;box-sizing:border-box;">
            <el-form ref="form" label-width="120px">
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
            <el-button size="small" @click="prevStep()">上一步</el-button>
            <el-button size="small" @click="mutation()">提交</el-button>
          </div>
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
      fileObj: {
        filename: "",
        label: "",
        path: "",
        describe: ""
      },
      btnDisable: {
        btn1: true
      }
    };
  },
  methods: {
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
      let formdate = new FormData();
      formdate.append("file", file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$Http({
        url: "upload/test",
        method: "post",
        data: formdate,
        config
      })
        .then(m => {
          if (m.statusText === "OK") {
            this.btnDisable.btn1 = false;
            this.fileObj.filename = m.data.filename;
            this.fileObj.path = m.data.path;
            this.message("上传成功！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    UploadNextStep() {
      this.CHANGETAB(1);
    },
    prevStep() {},
    mutation() {
      let param = new URLSearchParams();
          param.append('file',JSON.stringify(this.fileObj));
      this.$Http({
        url: "upload/upLoadFileParam",
        method: "post",
        data: param 
      })
        .then(m => {
          console.log(m);
           this.message("提交成功");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style>
.w50 {
  width: 50% !important;
}
</style>


