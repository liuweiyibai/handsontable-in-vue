<template>
  <div class="CommonBaseMissionRequire">
    <div class="bottom">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="查询算法任务" name="first">
       <el-table :data="table.dataBaseCreat" border fixed v-show="showTab.one">
        <el-table-column prop="algoId" label="算法ID">
        </el-table-column>
        <el-table-column prop="algoTaskId" label="算法任务ID"></el-table-column>
        <el-table-column prop="algoname" label="算法名称">
        </el-table-column>
        <el-table-column prop="app_status" label="状态" :formatter="__statusCreat">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="changeSomeThing(scope)">查询</el-button>
          </template>
        </el-table-column>
       </el-table>
      </el-tab-pane>
      <el-tab-pane label="查询训练任务" name="second">
        <el-table :data="table.dataBaseTranning" border fixed>
        <el-table-column property="trainid" label="训练ID"></el-table-column>
        <el-table-column property="algoTaskId" label="任务ID"></el-table-column>
        <el-table-column property="status" label="状态" :formatter="__statusTranning"></el-table-column>
        <el-table-column property="updatetime" label="更新时间" :formatter="__timer"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="TranningChangeSomeThing(scope)">查询</el-button>
          </template>
        </el-table-column>
      </el-table>
      </el-tab-pane>
      <el-tab-pane label="查询离线分析任务" name="third">
         <el-table :data="table.OutLine" border fixed>
        <el-table-column property="offlineId" label="离线数据ID"></el-table-column>
        <el-table-column property="trainId" label="训练ID"></el-table-column>
        <el-table-column property="algoName" label="算法名称"></el-table-column>
        <el-table-column property="updatetime" label="更新时间" :formatter="__timer"></el-table-column>
        <el-table-column property="status" label="状态":formatter="__statusOutline"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="lixianshujuInquire(scope)">查询</el-button>
          </template>
        </el-table-column>
      </el-table>
      </el-tab-pane>
      <el-tab-pane label="查询发布任务" name="fourth">
        <el-table :data="table.case" border fixed max-height="400">
          <el-table-column property="deplayId" label="发布ID" type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item :label="key" v-for="(item,key) in props.row.instanceObject[0]" :key="item.index">
                  <span>{{ item }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column property="trainId" label="训练ID"></el-table-column>
          <el-table-column property="algoName" label="算法名称"></el-table-column>
          <el-table-column property="instanceCount" label="实例个数"></el-table-column>
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="changeSomeThing(scope)">查询</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </el-tab-pane>
    </el-tabs>
    </div>
    <!-- 对应训练操作，显示弹窗 -->
    <el-dialog
      title="评估数据"
      :visible.sync="dialogObj.trainpinggushuju">
      <el-form>
        <el-form-item style="margin-bottom: 5px;"
        label-position="left" inline class="demo-table-expand"
        v-for="(item,key) in TranningInquire" :key="item.index" :label="key">
          <span>{{item}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 离线数据中弹出表格 -->
    <el-dialog
      title="离线数据分析"
      :visible.sync="dialogObj.lixianshuju">
      <el-table :data="tableData.lixianshuju" border 
      style="width: 100%;overflow:hidden;" max-height="400">
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
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      showTab: {
        one: true,
        two: false,
        three: false,
        four: false
      },
      tableData:{lixianshuju:[]},
      table: {
        dataBaseCreat: [],
        dataBaseTranning: [],
        OutLine: [],
        case: []
      },
      dialogObj: {
        trainpinggushuju: false,
        lixianshuju: false
      },
      TranningInquire: {}
    };
  },
  mounted() {
    this.undoAlgoMession();
  },
  methods: {
    DOWNLOAD(scope) {
      let self = this;
      let url = `${this.$Http.defaults.baseURL}/down/test?filename=${scope.row
        .name}&id=${scope.row.id}&userId=${self.ID}`;
      let a = document.createElement("a");
      a.href = url;
      a.download = "download";
      a.click();
    },
    // 格式化时间
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
    },
    handleClick(tab, event) {
      let self = this;
      if (tab.name === "first") {
        self.undoAlgoMession();
      } else if (tab.name === "second") {
        self.undoTranningMession();
      } else if (tab.name === "third") {
        self.undoOutLineMession();
      } else {
        self.undoCaseMession();
      }
    },
    // 创建算法任务 —————— 状态
    __statusCreat(row, column) {
      let status = row[column.property];
      if (status === 0) {
        return `初始化`;
      } else if (status === 1) {
        return `完成`;
      } else {
        return `停用`;
      }
    },
    // 训练任务 —————— 状态
    __statusTranning(row, column) {
      let status = row[column.property];
      if (status === 0) {
        return `初始化`;
      } else if (status === 1) {
        return `进行中`;
      } else {
        return `停用`;
      }
    },
    // 离线分析 ————— 状态
    __statusOutline(row, column) {
      let status = row[column.property];
      if (status === 0) {
        return `初始化`;
      } else if (status === 1) {
        return `完成`;
      } else {
        return `停用`;
      }
    },
    __statusCase(row, column) {
      let status = row[column.property];
      if (status === 0) {
        return `提交`;
      } else if (status === 1) {
        return `提交完成`;
      } else if (status === 2) {
        return `提交错误`;
      } else if (status === 3) {
        return `发布已执行`;
      } else if (status === 10) {
        return "运行失败";
      } else if (status === 11) {
        return `主动关闭`;
      } else {
        return `非法状态`;
      }
    },
    // 查询算法任务
    undoAlgoMession() {
      let params = new URLSearchParams(),
        self = this;
      params.append("userId", self.ID);
      // tag 表示已完成状态下
      params.append("tag", "2");
      self.$Http
        .post("algoDispatch/selectAlgoTaskmoney", params)
        .then(m => {
          this.table.dataBaseCreat = m[0].data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询训练任务
    undoTranningMession() {
      let params = new URLSearchParams();
      params.append("userId", this.ID);
      // tag 表示已完成状态下
      params.append("tag", "2");
      this.$Http
        .post("algoDispatch/selectAlgoTrainkmoney", params)
        .then(m => {
          this.table.dataBaseTranning = m[0].data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 离线任务查询
    undoOutLineMession() {
      let params = new URLSearchParams();
      params.append("userId", this.ID);
      // tag 表示已完成状态下
      params.append("tag", "2");
      this.$Http
        .post("algoDispatch/selectAlgoOfflinekmoney", params)
        .then(m => {
          this.table.OutLine = m[0].data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 训练任务表格中查询
    TranningChangeSomeThing(scope) {
      let evalid = scope.row.evalId;
      let self = this;
      let params = new URLSearchParams();
      params.append("evalId", evalid);
      self
        .$Http({
          url: "algoDispatch/evalData",
          method: "post",
          data: params
        })
        .then(m => {
          this.dialogObj.trainpinggushuju = true;
          self.TranningInquire = JSON.parse(m.evaldata);
        });
    },
    // 离线数据表格中的查询
    lixianshujuInquire(scope) {
      this.dialogObj.lixianshuju = true;
      let aid = scope.row.dataId;
      let params = new URLSearchParams();
      params.append("userId", this.ID);
      params.append("id", aid);
      this.$Http({
        url: "offline/dataInfoById",
        method: "post",
        data: params
      }).then(m => {
        let arr = [];
        arr.push(m.idaData);
        this.tableData.lixianshuju = arr;
      });
    },
    // 实例任务查询
    undoCaseMession() {
      let params = new URLSearchParams();
      // tag 表示已完成状态下
      params.append("tag", "2");
      params.append("userId", this.ID);
      this.$Http
        .post("algoDispatch/selectAlgoDeploykmoney", params)
        .then(m => {
          this.table.case = m[0].data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
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
  box-shadow: 2px 0 3px 0 rgba(0, 0, 0, 0.1), 1px 0 1px 0 rgba(0, 0, 0, 0.1);
}

.CommonBaseMissionRequire .bottom {
  width: 100%;
  padding-right: 20px;
  padding: 12px 22px;
  box-sizing: border-box;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
