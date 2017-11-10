<template>
  <div id="item5" class="item-detail-function">
    <div class="top">
      <div class="content">
        <h2>离线数据下载</h2>
      </div>
    </div>
    <div class="content--">
      <div class="content-list">
        <ul>
          <li class="content-btn" style="width:100%;" @click="CHANGETAB(0)">
           离线数据下载
          </li>
        </ul>
      </div>
      <div class="content-body" style="overflow:hidden;">
        <el-table :data="FILELIST" max-height="350">
          <el-table-column prop="id" label="数据ID">
          </el-table-column>
          <el-table-column prop="name" label="数据名称">
          </el-table-column>
          <el-table-column prop="fileSize" label="大小" :formatter="__Filesize">
          </el-table-column>type
          <el-table-column prop="type" label="文件来源" :formatter="__source">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="DOWNLOAD(scope)">下载</el-button>
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
      FILELIST: []
    };
  },
  mounted() {
    let self = this,
      params = new URLSearchParams();
    params.append("userId", self.ID);
    self
      .$Http({
        url: "offline/userDataList",
        method: "post",
        data: params
      })
      .then(m => {
        if (m.status == 0) {
          self.FILELIST = m.list;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    __source(row, column){
      let source = row[column.property];
      if(source == 0){
        return "用户上传"
      }else{
        return '系统生成'
      }
    },
     __Filesize(row, column) {
      let filesize = row[column.property];
      if (parseInt(filesize)== 0) return "0 B";
      let k = 1024,
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(filesize) / Math.log(k));
      return (filesize / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
    },
    DOWNLOAD(scope) {
      let self = this;
      let url = `${this.$Http.defaults.baseURL}/down/test?filename=${scope.row.name}&id=${scope.row.id}&userId=${self.ID}`
     let a = document.createElement("a");
          a.href = url;
          a.download = 'download';
          a.click();
    }
  }
};
</script>
<style>
#item5 .content-list{
  width: 100%;
  height: 32px;
  line-height: 32px;
 text-align: center;
 background-color: #f0f0f0;
}
#item5 .content-list ul li {
  font-weight: bold;
    font-size: 14px;
    line-height: 32px;
}
</style>

