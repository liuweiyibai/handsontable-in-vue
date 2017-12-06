<template>
  <div id="Item2Table" class="table--">
    <div class="top">
      <span class="text-back iconfont icon-back"></span>
      <h2 class="text-h2">实时分析</h2>
    </div>
    <div class="content">
      <el-table :data="tableData" border 
      style="width: 100%;overflow:hidden;" max-height="400" ref="tables">
        <el-table-column label="文件名" prop="filename">
        </el-table-column>
        <el-table-column label="文件大小" prop="filesize" :formatter="__Filesize">
        </el-table-column>
        <el-table-column label="创建时间" prop="createtime" :formatter="__timer"> 
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="DOWNLOAD(scope)">下 载</el-button>
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
      tableData: []
    };
  },
  methods: {
    DOWNLOAD(scope) {
      setTimeout(() => {
        let self = this;
        let url = `${self.URL.ip1}/down/test?filename=${scope.row
          .name}&id=${scope.row.id}&userId=${self.ID}`;
        let a = document.createElement("a");
        a.href = url;
        a.download = "download";
        a.click();
      }, 5000);
    },
    aidHttp(aid) {
      let params = new URLSearchParams();
      params.append("userId", this.ID);
      params.append("id", aid);
      this.$Http({
        url: this.URL.ip1+"offline/dataInfoById",
        method: "post",
        data: params
      }).then(m => {
        let arr = [];
        arr.push(m.idaData);
        this.tableData = arr;
      });
    },
    pidHttp(pid) {},
    __timer(row, column) {
      let time = row[column.property];
      let d = new Date(time);
      let tt =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();
      return tt;
    },
    // 文件大小过滤器
    __Filesize(row, column) {
      let filesize = row[column.property];
      if (parseInt(filesize) == 0) return "0 B";
      let k = 1024,
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(filesize) / Math.log(k));
      return (filesize / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
    }
  },
  mounted() {
    let pid = "";
    let aid = "";
    // if (!this.$route.query.pid) {
    //   pid = localStorage.getItem("pubid");
    // } else {
    //   pid = this.$route.query.pid;
    // }
    // let self = this;
    // slef.$Http({

    // })
    if (!this.$route.query.aid) {
      aid = localStorage.getItem("offlineDataid");
    } else {
      aid = this.$route.query.aid;
    }
    setTimeout(() => {
      this.aidHttp(aid);
    },1000);
  }
};
</script>
<style scoped>
@import url("../table.css");
</style>
