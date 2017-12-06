<template>
  <div id="item3" class="item-detail-function">
    <div class="top">
      <div class="content">
        <h2>数据预处理</h2>
      </div>
    </div>
    <div class="content--">
      <div class="content-list">
        <ul id="item3-ul">
          <li class="content-btn w55" @click="CHANGETAB(0)" style="z-index:2">
            创建预处理任务
            <em></em>
            <i></i>
          </li>
          <li class="content-btn w55" @click="CHANGETAB(1)" style="z-index:1;">
           执行预处理任务
           <em></em>
           <i></i>
          </li>
        </ul>
      </div>
      <div class="content-body" style="positon:relative;">
        <div class="div-common" v-show="divSH[0].divShow">
          <el-form>
            <el-form-item label="数据处理方法名称">
               <span class="el-span" @click="dialogOBJ.first=true"
                 >{{shujuFunName}}</span>
            </el-form-item>
          </el-form>
          <div class="div-foo" v-show="shujuyuchuliwancheng">
                  <div class="el-notification__group">
                    <h2 class="el-notification__title">提示</h2>
                    <div class="el-notification__content">
                      <p>任务<span style="color:#1fbae4;">{{shujuyuchuliID}}</span>&nbsp;&nbsp;
                       创建成功！</p>
                    </div>
                  </div>
                </div>
          <div class="btn-footer">
            <el-button size="small" @click="nextWalk()" v-if="btnShow.first">下一步</el-button>
            <el-button size="small" 
            type="primary" @click="CreatMession()">确 定</el-button>
          </div>
        </div>
        <div class="div-common" v-show="divSH[1].divShow">
          <el-form>
            <el-form-item label="数据处理任务id">
                <span class="el-span" @click="dialogOBJ.second=true,getBeginMessList();"
                 >{{shujuFunID}}</span>
            </el-form-item>
            <el-form-item label="参数">
              <el-input style="width:87%;" type="textarea" v-model="argslist"></el-input>
            </el-form-item>
          </el-form>
          <div class="btn-footer">
            <!-- <el-button size="small" >取 消</el-button> -->
            <el-button size="small" 
            type="primary" @click="DoMession()">确 定</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="inner"></div>
    </div>
    <el-dialog title="数据预处理方法列表" :visible.sync="dialogOBJ.first" width="40%">
      <el-table :data="dataOBJ.first" border>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addToCreat(scope)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
     <el-dialog title="数据预处理方法列表" :visible.sync="dialogOBJ.second" width="50%">
      <el-table :data="dataOBJ.second" border>
        <el-table-column label="名称" prop="methodname"></el-table-column>
        <el-table-column label="任务ID" prop="id"></el-table-column>
        <el-table-column label="创建时间" prop="createtime"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addToCreatTwo(scope)">添加</el-button>
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
      CreatePreprocessingTask: false,
      BeginPreprocessingTask: false,
      dialogOBJ: {
        first: false,
        second: false
      },
      btnShow: {
        first: false,
        second: false
      },
      dataOBJ: {
        first: [],
        second: []
      },
      shujuyuchuliwancheng: false,
      shujuFunName: null,
      // 数据预处理任务id，执行任务部分
      shujuFunID: null,
      // 数据预处理任务id，创建任务部分
      shujuyuchuliID: null,
      // 执行数据预处理任务参数列表
      argslist: `{"inputfile":405836564906934384,"outputfile":"asdf"}`,
      divSH: [
        {
          divShow: true
        },
        {
          divShow: false
        }
      ]
    };
  },
  mounted() {
    this.GetMessionList();
  },
  methods: {
    CHANGETAB(index) {
      let that = this;
      that.divSH.map((item, index) => {
        if (index === 1) {
          //
        }
        item.divShow = false;
      });
      that.divSH[index].divShow = true;
    },
    openTable(str, val) {
      this[val] = false;
      this.$router.push({
        path: str
      });
    },
    // 获取数据预处理方法列表
    GetMessionList() {
      let self = this,
        params = new URLSearchParams();
      params.append("token", self.ID);
      self
        .$Http({
          url: self.URL.ip1 + "ida/selectAllMethodByUid",
          method: "post",
          data: params
        })
        .then(m => {
          self.dataOBJ.first = m.methodList;
        });
      //  http://10.1.4.170:5080/DataAnalyzePlatformBA/ida/selectAllMethodByUid?token=23
      // http://10.1.4.170:5080/DataAnalyzePlatformBA/ida/selectAllMethodJobByUid?token=23
    },
    // 数据预处理方法列表中添加
    addToCreat(scope) {
      let self = this;
      self.shujuFunName = scope.row.name;
      self.dialogOBJ.first = false;
    },
    // 取消创建预处理任务
    nextWalk(i) {
      this.CHANGETAB(1);
      this.shujuFunID = !!this.shujuyuchuliID ? this.shujuyuchuliID : null;
    },
    // 确定创建预处任务
    CreatMession() {
      let self = this;
      if (!self.shujuFunName) {
        self.$message.error("请选中一条数据！");
        return;
      }
      let params = new URLSearchParams();
      params.append("functionname", self.shujuFunName);
      params.append("token", self.ID);
      self
        .$Http({
          url: self.URL.ip1 + "ida/create_methodjob",
          method: "post",
          data: params
        })
        .then(m => {
          if (m.status == 200) {
            self.$message({
              message: "任务创建成功!",
              type: "success"
            });
            self.btnShow.first = true;
            self.shujuyuchuliID = m.jobId;
            self.shujuyuchuliwancheng = true;
          }
        });
    },
    // 数据预处理任务ID列表
    getBeginMessList() {
      let self = this,
        params = new URLSearchParams();
      params.append("token", self.ID);
      self
        .$Http({
          url: self.URL.ip1 + "ida/selectAllMethodJobByUid",
          method: "post",
          data: params
        })
        .then(m => {
          self.dataOBJ.second = m.methodJobList;
        });
    },
    addToCreatTwo(scope) {
      this.shujuFunID = scope.row.id;
      this.dialogOBJ.second = false;
    },
    // 执行预处理任务
    DoMession() {
      let self = this;
      let params = new URLSearchParams();
      params.append("jobid", self.shujuFunID);
      params.append("token", self.ID);
      params.append("argslist", self.argslist);
      self
        .$Http({
          url: self.URL.ip1 + "ida/pdatajobexecute",
          method: "post",
          data: params
        })
        .then(m => {
          console.log(m);
          // Object
          // filename:"/user/lzy/DP/1111"
          // status:200
          // statusMsg:"ok"
          // taskid:"405903948109578320"
        });
    }
  }
};
</script>

<style>
@import url("base.css");
.w55 {
  width: 50%;
}
#item3-ul {
  height: 32px;
  overflow: hidden;
  width: 100%;
}
#item3-ul li {
  float: left;
  cursor: pointer;
  text-align: center;
  position: relative;
  font-weight: bold;
  font-size: 14px;
  line-height: 32px;
  background-color: #f0f0f0;
}
#item3-ul li em {
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
#item3-ul li i {
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
.item3-active {
  background-color: #fff;
}
li.item3-active em {
  border-color: transparent transparent transparent #f9fbfc;
}
li.item3-active i {
  border-color: transparent transparent transparent #fff;
}
#item3 .div-common .btn-footer {
  position: absolute;
  bottom: 25px;
  right: 25px;
}
</style>

