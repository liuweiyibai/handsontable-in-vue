<template>
  <div id="item2" class="item-detail-function">
    <div class="top">
      <div class="content">
        <h2>算法任务</h2>
      </div>
    </div>
    <div class="content--">
      <div class="content-list">
        <ul>
          <li class="content-btn w33" :class="{'bg1':divShowOrHide[0].bg1,'bg2': divShowOrHide[0].bg2}" @click="CHANGETAB(0)">
            <span>创建算法任务</span>
          </li>
          <li class="content-btn w33" :class="{'bg1':divShowOrHide[1].bg1,'bg2': divShowOrHide[1].bg2}" @click="CHANGETAB(1)">
            <span>训练任务</span>
          </li>
          <li class="content-btn w33" :class="{'bg1':divShowOrHide[2].bg1,'bg2': divShowOrHide[2].bg2}" @click="CHANGETAB(2)">
            <span>发布/离线数据分析</span>
          </li>
        </ul>
      </div>
      <div class="content-body">
        <!-- 创建算法任务 -->
        <div class="div-common" v-show="divShowOrHide[0].divshow">
          <el-form>
            <el-form-item label="选择算法" :label-width="formLabelWidth">
              <el-select v-model="arithmeticName" placeholder="请选择算法">
                <el-option v-for="item in arithmeticList" :key="item.index" :label="item.index" :value="item.algoName"></el-option>
              </el-select>
              <span style="margin-left:20px;">{{arithmeticName}}</span>
            </el-form-item>
          </el-form>
          <div class="div-footer">
            <el-button @click="inquireCreatMessionFunc()" size="small">查 询</el-button>
            <el-button type="primary" @click="CreateMissionHttp()" size="small">确 定</el-button>
          </div>
        </div>
        <!-- 创建训练任务 -->
        <div class="div-common" v-show="divShowOrHide[1].divshow">
          <el-form>
            <el-form-item label="算法任务" :label-width="formLabelWidth">
              <span @click="ArithmeticMessionListFunc()" class="el-span">{{TranningMessionObj.algoJobId}}</span>
            </el-form-item>
            <el-form-item label="训练数据与测试数据比重" :label-width="formLabelWidth">
              <span @click="ParamsConfigFunction(TranningMessionParamsConfigObj.algoid)" class="el-span">{{TranningMessionObj.algoParamet}}</span>
            </el-form-item>
            <el-form-item label="输入数据" :label-width="formLabelWidth">
              <span @click="SelectInputDataFunc()" class="el-span">{{TranningMessionObj.inputDataid}}</span>
            </el-form-item>
          </el-form>
          <div class="div-footer">
            <el-button @click="inquireTranningMessionFunc()" size="small">查 询</el-button>
            <el-button type="primary" size="small" @click="confrimCreatTranningMessionFunc()">确 定</el-button>
          </div>
        </div>
        <!-- 创建离线数据分析任务和算法发布 -->
        <div class="div-common" v-show="divShowOrHide[2].divshow">
          <div class="btn-top" style="text-algn:rignt;">
            <el-button size="small" @click="tableShow1=true,tableShow2=false">算法发布</el-button>
            <el-button size="small" @click="tableShow1=false,tableShow2=true">离线数据分析</el-button>
          </div>
          <div class="one-table" v-show="tableShow1">
            <el-form ref="form" label-width="80px">
              <el-form-item label="选择模型">
                <span class="el-span" @click="PublishAltoTranningFunc()">{{PublishAltoTranningObj.model}}</span>
              </el-form-item>
            </el-form>
            <div class="div-footer">
              <el-button size="small" @click="inquirePublishMessionFun()">查 询</el-button>
              <el-button type="primary" size="small">确 定</el-button>
            </div>
          </div>
          <!-- 离线数据分析 -->
          <div class="two-table" v-show="tableShow2">
            <el-form>
              <el-form-item label="输入数据">
                <span class="el-span" @click="OffLineAnalyiseMessionOneFunc()">{{AnalyiseDataObj.input}}</span>
              </el-form-item>
              <el-form-item label="算法插件参数">
                <span class="el-span" @click="dialogObj.OffLineAnalyiseMessionTwoDialog=true">{{AnalyiseDataObj.parameter}}</span>
              </el-form-item>
              <el-form-item label="选择模型">
                <el-select placeholder="请选择模型！" v-model="AnalyiseDataObjSelect">
                  <el-option v-for="item in AnalyiseDataObjSelectArr" :key="item.index" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="div-footer">
              <el-button size="small" @click="inquireOfflineMessionFun()">查 询</el-button>
              <el-button type="primary" size="small">确 定</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="inner"></div>
    </div>

    <!-- 是否立即训练___对话框 -->
    <el-dialog title="算法任务" :visible.sync="dialogObj.ToTranningDialog" size="tiny">
      <span>是否立即训练！</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogObj.ToTranningDialog = false">取 消</el-button>
        <el-button type="primary" @click="ToTranningMissionFunc(TranningMessionObj.algoJobId)">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 算法训练中查询任务算法列表___对话框 -->
    <el-dialog title="算法任务" :visible.sync="dialogObj.requireArithmeticMessionDialog" size="large">
      <el-table :data="TranningMessionArithmeticListObj" style="width:100%">
        <el-table-column label="ID" width="200" prop="algoTaskId"></el-table-column>
        <el-table-column label="算法名称" width="200" prop="algoname"></el-table-column>
        <el-table-column label="状态" width="200" prop="app_status" :formatter="__appStatus"></el-table-column>
        <el-table-column label="开始时间" width="200" prop="starttime"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text" size="small" @click="SecondTranningMessionSelectFunction(scope)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 算法训练任务中的参数配置___对话框 -->
    <el-dialog title="训练数据与测试数据比重" :visible.sync="dialogObj.TranningMessionParamsConfig">
      <el-form label-width="70px">
        <el-form-item v-for="item in TranningMessionParamsConfigObj.list" 
        :key="item.index"
        :label="item.paramName">
          <el-input v-model="item.defaultValues"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogObj.TranningMessionParamsConfig = false">取 消</el-button>
        <el-button type="primary" @click="TranningMessionParamsConfigFunc()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 算法训练任务中输入数据弹窗___对话框 -->
    <el-dialog title="输入数据ID" :visible.sync="dialogObj.SelectInputDataDialog">
      <el-upload class="upload-demo" :before-upload="fileUpload" :show-file-list="false" action="ff">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-table :data="TranningMessionFileListObj" style="width:100%">
        <el-table-column label="文件名称" prop="name" width="200"></el-table-column>
        <el-table-column label="文件大小" prop="fileSize" width="200"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text" size="small" @click="addTranningMessionIdFunction(scope)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 算法发布___对话框 -->
    <el-dialog title="算法模型" :visible.sync="dialogObj.PublishAltoTranningDialog" size="small">
      <el-table :data="requireData" style="width:100%" border>
        <el-table-column label="算法名称" prop="algoname"></el-table-column>
        <el-table-column label="开始时间" prop="starttime"></el-table-column>
        <el-table-column label="状态" prop="app_status" :formatter="__appStatus"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>


    <!-- 离线数据分析任务中输入数据参数树形菜单 -->
    <el-dialog title="输入数据" :visible.sync="dialogObj.OffLineAnalyiseMessionOneDialog">
      <!-- <el-tree :data="data" :props="defaultProps"></el-tree> -->
      <el-table :data="AnalyiseDataObj.inputArr" style="width:100%">
        <el-table-column label="文件名称" prop="name" width="200"></el-table-column>
        <el-table-column label="文件大小" prop="fileSize" width="200"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text" size="small" @click="addOffLineAnalyisegMessionIdFunc(scope)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 离线数据分析任务中算法插件数据参数 -->
    <el-dialog title="离线数据参数" :visible.sync="dialogObj.OffLineAnalyiseMessionTwoDialog">
      <el-form label-width="70px">
        <el-form-item label="dataParameter">
          <el-input v-model="AnalyiseDataObj.parameter.dataParameter"></el-input>
        </el-form-item>
        <el-form-item label="separator">
          <el-input v-model="AnalyiseDataObj.parameter.separator"></el-input>
        </el-form-item>
        <el-form-item label="dataIndex">
          <el-input  v-model="AnalyiseDataObj.parameter.dataIndex"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogObj.OffLineAnalyiseMessionTwoDialog = false">取 消</el-button>
        <el-button type="primary" @click="OffLineAnalyiseMessionTwoConfirmFunc()">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 算法发布任务 -->
    <el-dialog title="确认发布" :visible.sync="dialogObj.FirstArithmeticPublistDialog" size="tiny">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogObj.FirstArithmeticPublistDialog = false">取 消</el-button>
        <el-button type="primary" @click="dialogObj.FirstArithmeticPublistDialog = false">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 创建算法任务查询__弹窗 -->
    <el-dialog title="查询算法任务列表" :visible.sync="dialogObj.inquireCreatMessionDialog" size="large">
      <el-table :data="inquireObj.list1">
        <el-table-column property="algoTaskId" label="ID" width="300"></el-table-column>
        <el-table-column property="algoname" label="算法名称" width="300"></el-table-column>
        <el-table-column property="app_status" label="状态" width="260" :formatter="__appStatus"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="inquireCreatMessionTableFun(scope)">训练</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 训练任务中查询__弹窗 -->
    <el-dialog title="训练任务状态查询" :visible.sync="dialogObj.inquireTranningMessionDialog" size="large">
      <el-table :data="inquireObj.list2">
        <el-table-column property="algoTaskId" label="ID" width="300"></el-table-column>
        <el-table-column property="algoname" label="算法名称" width="300"></el-table-column>
        <el-table-column property="app_status" label="状态" width="260" :formatter="__appStatus"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="inquireTranningMessionTableFun(scope)">训练</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>


    <!-- 发布/离线数据分析__弹窗 -->
    <el-dialog title="算法发布任务查询" :visible.sync="dialogObj.inquirePublishMessionDialog" size="large">
      <el-table :data="inquireObj.list3">
        <el-table-column property="algoTaskId" label="ID" width="300"></el-table-column>
        <el-table-column property="algoname" label="算法名称" width="300"></el-table-column>
        <el-table-column property="app_status" label="状态" width="260" :formatter="__appStatus"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="inquireTranningMessionTableFun(scope)">训练</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

     <!-- 发布/离线数据分析__弹窗 -->
    <el-dialog title="离线数据分析" :visible.sync="dialogObj.inquireAnalyiseMessionDialog" size="large">
      <el-table :data="inquireObj.list4">
        <el-table-column property="algoTaskId" label="ID" width="300"></el-table-column>
        <el-table-column property="algoname" label="算法名称" width="300"></el-table-column>
        <el-table-column property="app_status" label="状态" width="260" :formatter="__appStatus"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="inquireAnalyiseMessionTableFun(scope)">训练</el-button>
            <el-button size="small" type="danger">删除</el-button>
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
      formLabelWidth: "120px",
      tableShow1: true,
      tableShow2: false,
      dialogObj: {
        // 当前组件中所有的弹窗的显示和隐藏控制数据
        ToTranningDialog: false, // 创建算法任务转到算法训练任务____对话框
        requireArithmeticMessionDialog: false, // 算法训练中查询任务算法列表___对话框
        SelectInputDataDialog: false, // 算法训练任务中输入数据____对话框
        PublishAltoTranningDialog: false,
        FirstArithmeticPublistDialog: false,
        inquireCreatMessionDialog: false, // 创建算法任务中查询___对话框
        inquireTranningMessionDialog: false, // 训练任务中的查询___对话框
        inquirePublishMessionDialog: false, // 发布离线数据分析查询___对话框
        inquireAnalyiseMessionDialog: false, // 离线数据分析___对话框
        TranningMessionParamsConfig: false, // 算法训练任务中的参数配置___对话框
        OffLineAnalyiseMessionOneDialog: false, //离线数据分析中输入数据____对话框
        OffLineAnalyiseMessionTwoDialog: false // 离线数据分析中算法插件参数____对话框
      },
      inquireObj: {
        // 每一个操作中的查询列表____弹窗表示
        list1: [], // 算法创建
        list2: [], // 算法训练
        list3: [] // 算法发布
      },
      arithmeticList: [], // 返回的算法列表
      arithmeticName: "", // 算法名称
      // 训练任务获取算法列表的弹出框表格中数据
      TranningMessionArithmeticListObj: [],
      TranningMessionObj: {
        algoJobId: "", // 参数1
        algoParamet: "", // 参数2
        userId: this.ID,
        inputDataid: "",
        fileId: "" // 输入数据
      },
      divShowOrHide: [
        {
          // 控制导航部分切换的变量们
          divshow: true,
          bg1: true,
          bg2: false
        },
        {
          divshow: false,
          bg1: false,
          bg2: true
        },
        {
          divshow: false,
          bg1: false,
          bg2: true
        },
        {
          divshow: false,
          bg1: false,
          bg2: true
        }
      ],
      // 训练数据与测试数据比重中的数据
      TranningMessionParamsConfigObj: {
        list: [],
        algoid: ""
      },
      TranningMessionFileListObj: [], // 训练任务中输入数据的弹出列表
      data: [
        {
          label: "Root",
          children: [
            {
              id: "1",
              label: "website"
            },
            {
              id: "2",
              label: "Home"
            },
            {
              id: "3",
              label: "Src"
            },
            {
              id: "5",
              label: "Page"
            },
            {
              id: "6",
              label: "Person",
              children: [{ label: "one" }]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 算法发布任务的列表中的数据
      PublishAltoTranningObj: {
        list: [],
        model: ""
      },
      // 离线数据中绑定的所有参数
      AnalyiseDataObj: {
        input: "",
        inputFileId: "",
        parameter: {
          dataParameter: "AnalyiseDataObj.parameter.dataParameter",
          separator: "AnalyiseDataObj.parameter.separator",
          dataIndex: "AnalyiseDataObj.parameter.dataIndex"
        },
        inputArr: []
      },
      AnalyiseDataObjSelect: "",
      AnalyiseDataObjSelectArr: [1, 2, 3],
      requireData: [
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  mounted() {
    this.AlgorithmOfTaskFuntion(); // 获取算法任务列表
  },
  methods: {
    // 消息提示窗
    message(txt) {
      this.$message(txt);
    },
    // 弹出警告框
    notify(title, txt) {
      const h = this.$createElement;
      this.$notify({
        title: title,
        message: h("i", { style: "color: teal" }, txt)
      });
    },
    // 所有的状态过滤器
    __appStatus(row, column) {
      let status = row[column.property];
      if (status === undefined) {
        return "";
      } else if (status === 1) {
        return "可用";
      } else if (status === 2) {
        return "停用";
      } else {
        return "删除";
      }
    },
    // 查询1. 创建算法任务---查询
    inquireCreatMessionFunc() {
      let params = new URLSearchParams();
      params.append("userId", this.ID);
      this.$Http
        .post("algoDispatch/selectAlgoTaskmoney", params)
        .then(m => {
          console.log(m);
          this.inquireObj.list1 = m.data[0].data;
          this.dialogObj.inquireCreatMessionDialog = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询1中的表格操作
    inquireCreatMessionTableFun(scope) {
      this.TranningMessionParamsConfigObj.algoid = scope.row.algoId;
      this.ToTranning(scope.row.algoTaskId);
    },
    // 查询2，训练任务中----查询
    inquireTranningMessionFunc() {
      let params = new URLSearchParams();
      params.append("userId", this.ID);
      this.$Http
        .post("algoDispatch/selectAlgoTrainkmoney", params)
        .then(m => {
          this.inquireObj.list2 = m.data[0].data;
          this.dialogObj.inquireTranningMessionDialog = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询2，训练任务中查询表中的训练按钮
    inquireTranningMessionTableFun(scope) {
      console.log(scope);
    },
    // 查询3
    inquirePublishMessionFun() {
      let params = new URLSearchParams();
      params.append("userId", this.ID);
      this.$Http
        .post("algoDispatch/selectAlgoTrainkmoney", params)
        .then(m => {
          this.inquireObj.list3 = m.data[0].data;
          this.dialogObj.inquirePublishMessionDialog = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询4
    inquireOfflineMessionFun() {
      let params = new URLSearchParams();
      params.append("userId", this.ID);
      this.$Http
        .post("algoDispatch/selectAlgoOfflinekmoney", params)
        .then(m => {
          this.inquireObj.list4 = m.data[0].data;
          console.log(m.data[0].data);
           this.dialogObj.inquireAnalyiseMessionDialog = true;
        })
        .catch(err => {
          console.log(err);
        });
     
    },
    // 查询4中表格操作
    inquireAnalyiseMessionTableFun() {},
    openTable(str) {
      this.$router.push({
        path: str
      });
    },
    CHANGETAB(index, ifGo) {
      for (let i = 0, len = this.divShowOrHide.length; i < len; i++) {
        this.divShowOrHide[i].divshow = false;
        this.divShowOrHide[i].bg1 = false;
        this.divShowOrHide[i].bg2 = true;
      }
      this.divShowOrHide[index].divshow = true;
      this.divShowOrHide[index].bg1 = true;
      this.divShowOrHide[index].bg2 = false;
      if (ifGo) {
        this.$router.push({
          path: "/Item2/TraningMission"
        });
      }
    },
    // 创建算法任务,获取算法列表
    AlgorithmOfTaskFuntion() {
      this.$Http
        .get("algoDispatch/selectAlgoname")
        .then(m => {
          this.arithmeticList = m.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 创建算法任务按钮事件
    CreateMissionHttp() {
      let val = this.arithmeticName,
        name = this.arithmeticNameInput,
        params = new URLSearchParams();
      params.append("appAlgoname", val);
      params.append("appname", this.ID);
      if (!val) {
        this.message("必须选择一个算法!");
        return;
      }
      this.$Http({
        url: "algoDispatch/algoCreateJob",
        method: "post",
        data: params
      })
        .then(m => {
          if (m.statusText === "OK") {
            this.message("算法创建成功！");
            this.TranningMessionParamsConfigObj.algoid = m.data[0].algoId;
            this.ToTranning(m.data[0].algoJobId);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 跳到任务查询路由
    disloagInquire() {
      this.$router.push({
        path: "/CommonBaseMissionRequire"
      });
    },
    // 到算法训练
    ToTranning(str) {
      this.dialogObj.ToTranningDialog = true;
      this.TranningMessionObj.algoJobId = str;
    },
    ToTranningMissionFunc(str) {
      this.dialogObj.ToTranningDialog = false;
      this.dialogObj.inquireCreatMessionDialog = false;
      if (str) {
        this.CHANGETAB(1);
      }
    },
    //  算法训练中算法列表获取--http
    ArithmeticMessionListFunc() {
      this.dialogObj.requireArithmeticMessionDialog = true;
      let params = new URLSearchParams();
      params.append("userId", this.ID);
      this.$Http
        .post("algoDispatch/selectAlgoTaskmoney", params)
        .then(m => {
          this.TranningMessionArithmeticListObj = m.data[0].data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 训练任务中训练数据与测试数据比重---http
    ParamsConfigFunction(str) {
      let _this = this;
      if (str) {
        this.dialogObj.TranningMessionParamsConfig = true;
        // 发送请求获取参数
        let params = new URLSearchParams();
        params.append("algoId", str);
        this.$Http({
          url: "algoDispatch/algoParamName",
          method: "post",
          data: params
        })
          .then(m => {
            if (m.statusText === "OK") {
              console.log(m);
              let obj = {
                defaultValues: "",
                paramDescription: "",
                paramId: "",
                paramName: "dataWeight",
                paramType: "",
                pluginId: ""
              };
              _this.TranningMessionParamsConfigObj.list = Array.prototype.slice.call(
                m.data.AlgoParametName
              );
              _this.TranningMessionParamsConfigObj.list.unshift(obj);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message("请先选择算法任务！");
      }
    },
    // 训练任务中输入数据id ---http
    SelectInputDataFunc(userid = 1) {
      if (userid) {
        this.dialogObj.SelectInputDataDialog = true;
        // 发送请求获取参数
        let params = new URLSearchParams();
        params.append("userId", userid);
        this.$Http({
          url: "offline/userDataList",
          method: "post",
          data: params
        })
          .then(m => {
            if (m.statusText === "OK") {
              this.TranningMessionFileListObj = m.data.list;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 训练任务选择任务id表格中的操作的按钮
    addTranningMessionIdFunction(scope) {
      this.TranningMessionObj.inputDataid = scope.row.name;
      this.TranningMessionObj.fileId = scope.row.id;
      this.dialogObj.SelectInputDataDialog = false;
    },
    // 训练任务算法任务选择列表中按钮操作
    SecondTranningMessionSelectFunction(scope) {
      this.TranningMessionObj.algoJobId = scope.row.algoTaskId;
      this.TranningMessionParamsConfigObj.algoid = scope.row.algoId;
      this.dialogObj.requireArithmeticMessionDialog = false;
    },
    // 训练任务中输入数据与比重弹出窗中的确定按钮
    TranningMessionParamsConfigFunc() {
      let arr = [];
      this.dialogObj.TranningMessionParamsConfig = false;
      // this.TranningMessionObj.algoParamet
      this.TranningMessionParamsConfigObj.list.forEach((item, index) => {
        arr.push(item);
      });
      this.TranningMessionObj.algoParamet = arr;
    },
    // 算法训练确认按钮
    confrimCreatTranningMessionFunc() {
      let params = new URLSearchParams(),
        obj = {};
        for(let k in this.TranningMessionObj) {
          obj[k] = this.TranningMessionObj[k];
        };
        let str = JSON.stringify(obj);
        params.append('trainParam',str);
        this.$Http({
          url: "algoDispatch/algoTrain",
          method: "post",
          data: params
        })
        .then(m => {
          console.log(m);
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 算法发布选择模型_____http
    PublishAltoTranningFunc(str) {
      // str = this.PublishAltoTranningObj.model
      this.dialogObj.PublishAltoTranningDialog = true;
      this.$Http({
        url:"",
        method:"post"
      })
    },

    // 离线数据分析中的输入数据
    OffLineAnalyiseMessionOneFunc(userid) {
      userid = this.ID;
      if (userid) {
        this.dialogObj.OffLineAnalyiseMessionOneDialog = true;
        // 发送请求获取参数
        let params = new URLSearchParams();
        params.append("userId", userid);
        this.$Http({
          url: "offline/userDataList",
          method: "post",
          data: params
        })
          .then(m => {
            if (m.statusText === "OK") {
              console.log(m);
              this.AnalyiseDataObj.inputArr = m.data.list;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      // 获取离线数据中选择模型的模型列表
    },
    // 离线数据分析中输入数据表格中的操作按钮————弹出表格
    addOffLineAnalyisegMessionIdFunc(scope) {
      this.AnalyiseDataObj.input = scope.row.name;
      this.dialogObj.OffLineAnalyiseMessionOneDialog = false;
    },
    // 离线数据分析中算法插件参数弹出框中的确认按钮
    OffLineAnalyiseMessionTwoConfirmFunc() {
      this.dialogObj.OffLineAnalyiseMessionTwoDialog = false;
    },

    // 文件上传
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
          console.log(m);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
@import url("base.css");
.item-detail-function .content-- .content-list ul li.w33 {
  width: 33.33%;
}
</style>