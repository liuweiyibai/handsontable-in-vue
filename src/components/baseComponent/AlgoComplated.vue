<template>
  <div class="CommonBaseMissionRequire">
    <div class="bottom">
    <el-tabs @tab-click="sleleTab"  v-model="activeName">
    <el-tab-pane label="查询算法任务" name="first" style="overflow:hidden;">
       <!-- 表格1：创建算法任务 -->
      <el-table :data="table.dataBaseCreat" max-height="400" border>
        <el-table-column prop="algoId" label="算法ID" width="150">
        </el-table-column>
        <el-table-column prop="algoTaskId" label="算法任务ID" ></el-table-column>
        <el-table-column prop="algoname" label="算法名称">
        </el-table-column>
        <el-table-column prop="app_status" label="状态" :formatter="__statusCreat">
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="查询训练任务" name="second">
      <el-table :data="table.dataBaseTranning" max-height="400" border>
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
      <el-table :data="table.OutLine" max-height="400" border style="width:100%;overflow-x:hidden;">
        <el-table-column property="offlineId" label="离线数据ID"></el-table-column>
        <el-table-column property="trainId" label="训练ID"></el-table-column>
        <el-table-column property="algoName" label="算法名称" ></el-table-column>
        <el-table-column property="updatetime" label="更新时间" :formatter="__timer"></el-table-column>
        <el-table-column property="status" label="状态" :formatter="__statusOutline"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="lixianshujuInquire(scope)">查询</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="查询发布任务" name="fourth"> 
       <el-table :data="table.case" border fixed>
        <el-table-column property="deplayId" label="发布ID" type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item :label="key" :key="item.index"
              v-for="(item,key) in props.row.instanceObject[0]" >
                <span>{{ item }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column property="trainId" label="训练ID">    
        </el-table-column>
        <el-table-column property="algoName" label="算法名称">     
        </el-table-column>
        <el-table-column property="instanceCount" label="实例个数">
        </el-table-column>
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
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogObj.trainpinggushuju = false">取 消</el-button>
        <el-button type="primary" @click="dialogObj.trainpinggushuju = false">确 定</el-button>
      </span> -->
    </el-dialog>
     <!-- 离线数据中弹出表格 -->
    <el-dialog
      title="离线数据分析"
      :visible.sync="dialogObj.lixianshuju">
      <el-table :data="tableData.lixianshuju" border 
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
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table: {
        dataBaseCreat: [],
        dataBaseTranning: [],
        OutLine: [],
        case: []
      },
      tableData: {
        lixianshuju: []
      },
      TranningInquire: {},
      activeName: "first",
      showTab: {
        one: true,
        two: false,
        three: false,
        four: false
      },
      dialogObj: {
        trainpinggushuju: false,
        lixianshuju: false
      }
    };
  },
  mounted() {
    this.inquireAlgoMessioin();
  },
  methods: {
    DOWNLOAD(scope) {
      let self = this;
      let url = `${self.URL.ip1}/down/test?filename=${scope.row
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
    sleleTab(tab, event) {
      let self = this;
      if (tab.name === "first") {
        self.inquireAlgoMessioin();
      } else if (tab.name === "second") {
        self.inquireTranningMession();
      } else if (tab.name === "third") {
        self.inquireOutLine();
      } else {
        self.inquireCase();
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
      } else if (status === 2) {
        return `可用`;
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
    // 实例 ————— 状态
    __statusCase(row, column) {
      let status = row[column.property];
      if (status === 4 || status === 9) {
        return `已完成`;
      }
    },
    changeSomeThing() {},
    // 查询算法任务
    inquireAlgoMessioin() {
      let params = new URLSearchParams(),
        self = this;
      params.append("userId", self.ID);
      // tag 表示已完成状态下
      params.append("tag", "1");
      self.$Http
        .post(self.URL.ip1 + "algoDispatch/selectAlgoTaskmoney", params)
        .then(m => {
          this.table.dataBaseCreat = m[0].data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询训练任务
    inquireTranningMession() {
      let params = new URLSearchParams();
      params.append("userId", this.ID);
      // tag 表示已完成状态下
      params.append("tag", "1");
      this.$Http
        .post(this.URL.ip1 + "algoDispatch/selectAlgoTrainkmoney", params)
        .then(m => {
          this.table.dataBaseTranning = m[0].data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询离线任务
    inquireOutLine() {
      let params = new URLSearchParams();
      params.append("userId", this.ID);
      // tag 表示已完成状态下
      params.append("tag", "1");
      this.$Http
        .post(this.URL.ip1 + "algoDispatch/selectAlgoOfflinekmoney", params)
        .then(m => {
          this.table.OutLine = m[0].data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询实例任务
    inquireCase() {
      let params = new URLSearchParams();
      // tag 表示已完成状态下
      params.append("tag", "1");
      params.append("userId", this.ID);
      this.$Http
        .post(this.URL.ip1 + "algoDispatch/selectAlgoDeploykmoney", params)
        .then(m => {
          console.log(m);
          this.table.case = m[0].data;
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
      params.append('userId',self.ID);
      self
        .$Http({
          url: self.URL.ip1 + "algoDispatch/evalData",
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
        url: this.URL.ip1 + "offline/dataInfoById",
        method: "post",
        data: params
      }).then(m => {
        let arr = [];
        arr.push(m.idaData);
        this.tableData.lixianshuju = arr;
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
  height: calc(100vh - 120px);
  padding-right: 20px;
  padding: 12px 22px;
  overflow: auto;
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
