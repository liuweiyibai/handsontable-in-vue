<template>
  <div id="item2" class="item-detail-function">
    <div class="top">
      <div class="content">
        <h2>算法任务</h2>
      </div>
    </div>
    <div class="content--">
      <div class="content-list">
        <ul id="item2-ul">
          <li class="content-btn w33"
          :class="{'item2-active':divShowOrHide[0].classA}"
          style="z-index:3"
           @click="CHANGETAB(0)"> 
            创建算法任务
            <em></em>
            <i></i>
          </li>
          <li class="content-btn w33" 
           :class="{'item2-active':divShowOrHide[1].classA}"
          style="z-index:2"
             @click="CHANGETAB(1)">
            训练任务
            <em></em>
            <i></i>
          </li>
          <li class="content-btn w33" 
           :class="{'item2-active':divShowOrHide[2].classA}"
          style="z-index:1"
            @click="CHANGETAB(2)">
            应用模型
            <em></em>
            <i></i>
          </li>
        </ul>
      </div>
      <div class="content-body">
        <!-- 创建算法任务 -->
        <div class="div-common div-common-first" 
          v-show="divShowOrHide[0].divshow" 
          style="padding-top:30px;box-sizing:border-box;">
          <div class="bg-content"  v-for="(item,index) in arithmeticList" :key="item.index"
          :class="{'bg-img':clickBg === index}" @click.stop="addCreat(index,item.status)">
            <div class="bg-content-top">{{item.algoName}}</div>
            <div class="bg-content-bottom">
              <span class="text-span">
                {{item.algoDesc}}
              </span>
            </div>
          </div> 
          <div class="div-footer">
            <el-button type="primary" @click="CreateMissionHttp()" size="small">开始创建</el-button>
          </div>
        </div>
        <!-- 创建训练任务 -->
        <div class="div-common" v-show="divShowOrHide[1].divshow" 
          style="box-sizing:border-box;padding-bottom:20px;padding:20px 0 0 80px">
            <el-form ref="form" label-width="80px" size="mini">
              <el-form-item label="算法任务">
                <span class="el-span" 
                 @click="ArithmeticMessionListFunc()">{{suanfarenwuName}}
                 </span>
              </el-form-item>
               <el-form-item label="输入数据">
                <span class="el-span" 
                @click="SelectInputDataFunc()">{{TranningMessionObj.inputDataid}}</span>
              </el-form-item>
              <el-form-item label="训练数据占比" label-width="105px">
                <span class="span-top">
                   <i class="iconfont" @click.stop="subtract" ref="i2">&#xe60a;</i> 
                 <input type="text" class="ipt--" v-model="baifeizhi"><span>%  </span>
                   <i class="iconfont" @click.stop="addPlus" ref="i1">&#xe606;</i>
                </span>
              </el-form-item>
              <el-form-item label="算法参数">
                <span class="el-span" 
                @click="suanfancanshuFun">
                <i>{{flagFilter}}</i>
                </span>
              </el-form-item>
            </el-form>
            <!-- 训练任务步骤条 -->
            <el-steps :active="step[0].active" style="margin-left:-130px;"
              align-center
              process-status="finish" 
              finish-status="finish"
              v-show="step[0].show">
              <el-step title="已提交"></el-step>
              <el-step title="运行中"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
            <div class="div-foo" v-show="trainjieshu">
              <div class="el-notification__group">
                <h2 class="el-notification__title">提示</h2>
                <div class="el-notification__content">
                  <p>训练任务已完成，任务ID:&nbsp;&nbsp;<span style="color:#1fbae4;">{{complatedTrainName}}</span>，&nbsp;&nbsp;点击下一步继续任务！</p>
                </div>
              </div>
            </div>
            <div class="div-footer">
              <el-button type="primary" 
              @click="confrimCreatTranningMessionFunc()" 
              :disabled="btnLoading.trainDisable" 
              size="small">训 练</el-button>
               <el-button type="primary" 
              @click="trainNext()" 
              :disabled="btnLoading.trainNext" 
              size="small">下一步</el-button>
            </div>
        </div>
        <!-- 创建离线数据分析任务和算法发布 -->
        <div class="div-common" v-show="divShowOrHide[2].divshow"
           style="box-sizing:border-box;height:100%;padding-bottom:20px;padding:20px 0 0 80px">
          <el-tabs style="height:100%;" @tab-click="tabClick">
            <el-tab-pane label="实时分析" style="height:100%;">
              <div class="one-table">
                <el-form ref="form" size="mini">
                  <el-form-item label="选择模型">
                    <span class="el-span" 
                    @click="PublishAltoTranningFunc()">{{PublishAltoTranningObj.model}}</span>
                  </el-form-item>
                </el-form>
                <!-- 发布的进度条 -->
                <el-steps :active="step[1].active"
                 process-status="finish"  
                 finish-status="finish"
                 align-center
                 v-show="step[1].show">
                  <el-step title="已提交" ></el-step>
                  <el-step title="运行中" ></el-step>
                </el-steps>
                <div class="div-foo" v-show="complatedshishifenxi">
                  <div class="el-notification__group">
                    <h2 class="el-notification__title">提示</h2>
                    <div class="el-notification__content">
                      <p>任务<span style="color:#1fbae4;">{{complatedshishifenxiName}}</span>&nbsp;&nbsp;已经完成训练，点击
                      <el-button type="text" @click="inquireanalyiseRouter()">查 询</el-button>查看结果！</p>
                    </div>
                  </div>
                </div>
                <div class="div-footer">
                  <el-button type="primary" size="small" 
                  :disabled="btnLoading.publish"
                  @click="publishMessionConfirmFunc()">发 布</el-button>
                </div>
              </div>
            </el-tab-pane>
            <!-- 离线数据分析 -->
            <el-tab-pane label="离线分析">
            <div class="two-table">
            <el-form size="mini">
               <el-form-item label="选择模型">
                <span
                class="el-span" 
                @click="dialogObj.OffLineAnalyiseMessionThreeDialog = true,__offlineSelectModelHttp();">
                {{AnalyiseDataObj.trainId}}</span>
              </el-form-item>
              <el-form-item label="输入数据">
                <span class="el-span"
                 @click="OffLineAnalyiseMessionOneFunc()">{{AnalyiseDataObj.input}}</span>
              </el-form-item>
              <!-- <el-form-item label="算法插件">
                <span class="el-span" @click="dialogObj.OffLineAnalyiseMessionTwoDialog=true">
                  {{AnalyiseDataObj.parameter}}
                </span>
              </el-form-item> -->
             
            </el-form>
             <!-- 离线分析的进度条 -->
            <el-steps :active="step[2].active" 
            style="margin-bottom:15px;"
            process-status="finish"  
            finish-status="finish"
            align-center
            v-show="step[2].show">
              <el-step title="已提交" ></el-step>
              <el-step title="运行中" ></el-step>
              <el-step title="完成" ></el-step>
            </el-steps>
            <div class="div-foo" v-show="complatedlixianfenxi">
                  <div class="el-notification__group">
                    <h2 class="el-notification__title">提示</h2>
                    <div class="el-notification__content">
                      <p>任务<span style="color:#1fbae4;">{{complatedlixianfenxiName}}</span>&nbsp;&nbsp;
                      已经完成，点击
                      <el-button type="text" @click="inquireoffline()">查 询</el-button>查看结果！</p>
                    </div>
                  </div>
                </div>
            <div class="div-footer">
              <el-button type="primary" size="small"
                :disabled="btnLoading.analyise"
               @click="AnalyiseDataConfirmFunc()">确 定</el-button>
            </div>
          </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="inner" style="box-sizing:border-box;"> 
      </div>
    </div>

    <!-- 是否立即训练___对话框 -->
    <el-dialog title="算法任务" :visible.sync="dialogObj.ToTranningDialog" width="30%">
      <span>是否立即训练！</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogObj.ToTranningDialog = false">取 消</el-button>
        <el-button type="primary" @click="ToTranningMissionFunc(TranningMessionObj.algoJobId)">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 算法训练中查询任务算法列表___对话框 -->
    <el-dialog title="算法任务" :visible.sync="dialogObj.requireArithmeticMessionDialog" width="80%">
      <el-table :data="TranningMessionArithmeticListObj" border>
        <el-table-column label="ID" prop="algoTaskId"></el-table-column>
        <el-table-column label="算法名称" prop="algoname"></el-table-column>
        <el-table-column label="状态" prop="app_status" :formatter="__appStatus"></el-table-column>
        <el-table-column label="开始时间" prop="starttime"  :formatter="__timer"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="SecondTranningMessionSelectFunction(scope)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 算法训练任务中输入数据弹窗___对话框 -->
    <el-dialog title="输入数据ID" :visible.sync="dialogObj.SelectInputDataDialog"
     style="padding: 6px 20px;">
      <el-table :data="TranningMessionFileListObj" style="width:100%">
        <el-table-column label="文件名称" prop="name" width="200"></el-table-column>
        <el-table-column label="文件大小" prop="fileSize" width="200" :formatter="__Filesize"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addTranningMessionIdFunction(scope)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 算法发布___对话框 -->
    <el-dialog title="算法模型" :visible.sync="dialogObj.PublishAltoTranningDialog" width="70%">
      <el-table :data="PublishAltoTranningObj.list" style="width:100%" border>
        <el-table-column label="训练ID" prop="trainid"></el-table-column>
        <el-table-column label="任务ID" prop="algoTaskId"></el-table-column>
        <el-table-column label="状态" prop="status" :formatter="__appStatus"></el-table-column>
        <el-table-column label="更新时间" prop="updatetime" :formatter="__timer"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="PublishAltoTranningTableFunc(scope)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 离线数据分析任务中输入数据 -->
    <el-dialog title="输入数据" :visible.sync="dialogObj.OffLineAnalyiseMessionOneDialog">
      <el-table :data="AnalyiseDataObj.inputArr" style="width:100%">
        <el-table-column label="文件名称" prop="name" width="200"></el-table-column>
        <el-table-column label="文件大小" prop="fileSize" width="200" :formatter="__Filesize"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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

    <!-- 离线数据分析任务中选择模型 -->
    <el-dialog title="选择模型" :visible.sync="dialogObj.OffLineAnalyiseMessionThreeDialog">
      <el-table :data="AnalyiseDataseleModel" style="width:100%">
         <el-table-column label="训练ID" prop="trainid"></el-table-column>
        <el-table-column label="任务ID" prop="algoTaskId"></el-table-column>
        <el-table-column label="状态" prop="status" :formatter="__appStatus"></el-table-column>
        <el-table-column label="更新时间" prop="updatetime" :formatter="__timer"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="addMdel(scope)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 算法发布任务 -->
    <el-dialog title="确认发布" :visible.sync="dialogObj.FirstArithmeticPublistDialog">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogObj.FirstArithmeticPublistDialog = false">取 消</el-button>
        <el-button type="primary" @click="dialogObj.FirstArithmeticPublistDialog = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 创建算法任务查询__弹窗 -->
    <el-dialog title="查询算法任务列表" :visible.sync="dialogObj.inquireCreatMessionDialog">
      <el-table :data="inquireObj.list1">
        <el-table-column property="algoTaskId" label="ID"></el-table-column>
        <el-table-column property="algoname" label="算法名称"></el-table-column>
        <el-table-column property="app_status" label="状态" :formatter="__appStatus"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="inquireCreatMessionTableFun(scope)">训练</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 训练任务中查询__弹窗 -->
    <el-dialog title="训练任务状态查询" :visible.sync="dialogObj.inquireTranningMessionDialog">
      <el-table :data="inquireObj.list2" border>
        <el-table-column property="trainid" label="训练ID" width="240"></el-table-column>
        <el-table-column property="algoTaskId" label="任务ID" width="230"></el-table-column>
        <el-table-column property="status" label="状态" width="220" :formatter="__appStatus"></el-table-column>
        <el-table-column property="updatetime" label="更新时间" width="220"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="small" @click="inquireTranningMessionTableFun(scope)">训练</el-button> -->
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 发布/离线数据分析__弹窗 -->
    <el-dialog title="算法发布任务查询" :visible.sync="dialogObj.inquirePublishMessionDialog">
      <el-table :data="inquireObj.list3">
        <el-table-column property="deplayId" label="发布ID" width='240'></el-table-column>
        <el-table-column property="trainId" label="训练ID" width="230"></el-table-column>
        <el-table-column property="algoName" label="算法名称" width="220"></el-table-column>
        <el-table-column property="instanceCount" label="实例个数" width="220"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="small" @click="inquireTranningMessionTableFun(scope)">训练</el-button> -->
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

     <!-- 发布/离线数据分析__弹窗 -->
    <el-dialog title="离线数据分析" :visible.sync="dialogObj.inquireAnalyiseMessionDialog">
      <el-table :data="inquireObj.list4">
        <el-table-column property="offlineId" label="离线数据ID" width="150"></el-table-column>
        <el-table-column property="trainId" label="训练ID" width="200"></el-table-column>
        <el-table-column property="algoName" label="算法名称" width="200"></el-table-column>
        <el-table-column property="updatetime" label="更新时间" width="200"></el-table-column>
        <el-table-column property="status" label="状态" width="150"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="inquireAnalyiseMessionTableFun(scope)">训练</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 算法数据参数 -->
    <el-dialog title="算法参数" :visible.sync="suanfancanshu">
      <el-form size="mini">
        <el-form-item v-for="item in TranningMessionParamsConfigObj.list"
          :key="item.index"
          :label="item.paramName"
          label-width="20%">
          <el-input v-model="item.defaultValues" auto-complete="off" label-width="70%"></el-input>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="suanfancanshu = false" size="small">取 消</el-button>
      <el-button type="primary" @click="suanfancanshuquxiao()" size="small">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      trainjieshu: false,
      suanfarenwuName: "",
      baifeizhi: 10,
      complatedTrainName: "",
      complatedshishifenxi: false,
      complatedshishifenxiName: "",
      complatedlixianfenxi: false,
      complatedlixianfenxiName: "",
      offlineDataid: "",
      btnLoading: {
        train: true,
        trainNext: true,
        trainDisable: true,
        publish: false,
        analyise: false
      },
      suanfancanshu: false,
      // 几个重复发送请求任务的定时器
      timer: {
        trainTimer: "",
        pubTimer: "",
        AnaTimer: ""
      },
      flagFilter: "",
      // 步骤条对象
      step: [
        {
          show: true,
          active: 0
        },
        {
          show: false,
          active: 1
        },
        {
          show: false,
          active: 1
        }
      ],
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
        OffLineAnalyiseMessionTwoDialog: false, // 离线数据分析中算法插件参数____对话框
        OffLineAnalyiseMessionThreeDialog: false // 离线数据分析中选择模型
      },
      // 创建算法训练任务中点击添加背景
      clickBg: "1111111",
      AnalyiseDataseleModel: [],
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
        algoname: "",
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
          classA: true
        },
        {
          divshow: false,
          classA: false
        },
        {
          divshow: false,
          classA: false
        }
      ],
      // 训练数据与测试数据比重中的数据
      TranningMessionParamsConfigObj: {
        list: [],
        algoid: ""
      },
      TranningMessionFileListObj: [], // 训练任务中输入数据的弹出列表
      // 算法发布任务的列表中的数据
      PublishAltoTranningObj: {
        list: [],
        model: ""
      },
      // 离线数据中绑定的所有参数
      AnalyiseDataObj: {
        input: "",
        dataId: "",
        parameter: {
          dataParameter: "",
          separator: "",
          dataIndex: ""
        },
        trainId: "",
        inputArr: []
      }
    };
  },
  watch: {
    $route: "changeTabOfRoute"
  },
  mounted() {
    let i1 = this.$refs.i1,
      i2 = this.$refs.i2;
    i1.onselectstart = function() {
      return false;
    };
    i2.onselectstart = function() {
      return false;
    };
    this.AlgorithmOfTaskFuntion(); // 获取算法任务列表
  },
  methods: {
    // 切换tab的时候，清空训练任务中的参数
    clearTianning() {
      this.step[0].show = false;
      this.step[0].active = 0;
      this.btnLoading.trainNext = true;
      this.trainjieshu = false;
      this.suanfarenwuName = "";
      this.flagFilter = "";
      let obj = {
        algoname: "",
        algoJobId: "", // 参数1
        algoParamet: "", // 参数2
        userId: this.ID,
        inputDataid: "",
        fileId: "" // 输入数据
      };
      if (this.timer.trainTimer) {
        clearInterval(this.timer.trainTimer);
      }
      this.TranningMessionObj = obj;
    },
    suanfancanshuquxiao() {
      this.suanfancanshu = false;
      this.flagFilter = "";
      let one = this.TranningMessionParamsConfigObj.list;
      for (let i = 0, len = one.length; i < len; i++) {
        this.flagFilter += one[i].paramName + ":" + one[i].defaultValues + ";";
      }
    },
    // 切换tab的时候，发布隐藏进度条和清除定时器并且要是当前按钮可用
    clearPublish() {
      this.btnLoading.publish = false;
      if (this.timer.pubTimer) {
        clearInterval(this.timer.pubTimer);
      }
      this.PublishAltoTranningObj.model = "";
      this.step[1].show = false;
    },
    // 清除离线
    clearoutLine() {
      this.btnLoading.analyise = false;
      if (this.timer.AnaTimer) {
        clearInterval(this.timer.AnaTimer);
      }
      this.step[2].show = false;
      this.complatedlixianfenxi = false;
      this.AnalyiseDataObj.trainId = "";
      this.AnalyiseDataObj.input = "";
    },
    // 训练数据与测试数据比重 添加
    subtract() {
      let self = this;
      this.baifeizhi -= 1;
      if (self.baifeizhi <= 10) {
        self.baifeizhi = 10;
      }
    },
    // 训练数据与测试数据比重 减少
    addPlus() {
      let self = this;
      this.baifeizhi += 1;
      if (self.baifeizhi >= 100) {
        self.baifeizhi = 100;
      }
    },
    // 应用模型中tab栏的时候
    tabClick(t) {
      // 切换到1的时候，按钮可以用，并且停掉定时器，隐藏进度条
      if (t.index == 0) {
        // this.clearPublish();
        this.btnLoading.publish = false;
        if (this.timer.pubTimer) {
          clearInterval(this.timer.pubTimer);
        }
        this.step[1].show = false;
      }
      // 切换到2的时候，按钮可以用
      if (t.index == 1) {
        this.btnLoading.analyise = false;
        if (this.timer.AnaTimer) {
          clearInterval(this.timer.AnaTimer);
        }
        this.step[2].show = false;
        this.complatedlixianfenxi = false;
      }
    },
    // 根据路由参数进行更改tab
    changeTabOfRoute() {
      let self = this;
      if (!!self.$route.query) {
        let id = self.$route.query.id;
        if (id === "0") {
          self.CHANGETAB(0);
        } else if (id === "1") {
          self.CHANGETAB(1);
        } else if (id === "2") {
          self.CHANGETAB(2);
        }
      }
    },
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
    // 状态过滤器
    __appStatus(row, column) {
      let status = row[column.property];
      if (status === undefined) {
        return "";
      } else if (status === 1) {
        return "可用";
      } else if (status === 2) {
        return "成功";
      } else {
        return "删除";
      }
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
    __changeTwoteb(index, ifGo) {
      for (let i = 0, len = this.divShowOrHide.length; i < len; i++) {
        this.divShowOrHide[i].divshow = false;
        this.divShowOrHide[i].classA = false;
      }
      for (let i = 0, len = this.step.length; i < len; i++) {
        this.step[i].show = false;
      }
      if (index == 1) {
        this.step[0].show = false;
        this.step[0].active = 0;
        this.btnLoading.trainNext = true;
        this.trainjieshu = false;
        this.flagFilter = "";
        this.TranningMessionObj.inputDataid = "";
        if (this.timer.trainTimer) {
          clearInterval(this.timer.trainTimer);
        }
      }
      this.divShowOrHide[index].divshow = true;
      this.divShowOrHide[index].classA = true;
      // if (ifGo) {
      //   this.$router.push({
      //     path: "/Item2/TraningMission"
      //   });
      // }
    },
    // 拿到训练完成的数据，跳转到模型应用页，下一步操作
    __changeThreeteb(index) {
      for (let i = 0, len = this.divShowOrHide.length; i < len; i++) {
        this.divShowOrHide[i].divshow = false;
        this.divShowOrHide[i].classA = false;
      }
      for (let i = 0, len = this.step.length; i < len; i++) {
        this.step[i].show = false;
      }
      this.btnLoading.publish = false;
      this.divShowOrHide[index].divshow = true;
      this.divShowOrHide[index].classA = true;
    },
    CHANGETAB(index, ifGo) {
      for (let i = 0, len = this.divShowOrHide.length; i < len; i++) {
        this.divShowOrHide[i].divshow = false;
        this.divShowOrHide[i].classA = false;
      }
      for (let i = 0, len = this.step.length; i < len; i++) {
        this.step[i].show = false;
      }
      if (index === 1) {
        this.clearTianning();
      }
      if (index === 2) {
        this.clearPublish();
        this.clearoutLine();
        this.complatedlixianfenxi = false;
      }
      this.divShowOrHide[index].divshow = true;
      this.divShowOrHide[index].classA = true;
      // if (ifGo) {
      //   this.$router.push({
      //     path: "/Item2/TraningMission"
      //   });
      // }
    },
    // 创建算法任务,获取算法列表
    AlgorithmOfTaskFuntion() {
      this.$Http
        .get("algoDispatch/selectAlgoname")
        .then(m => {
          this.arithmeticList = m;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addCreat(index, e) {
      this.arithmeticName = "";
      if (e != 4) {
        this.arithmeticName = this.arithmeticList[index].algoName;
        this.clickBg = index;
      } else {
        return;
      }
    },
    // 创建算法任务按钮事件
    CreateMissionHttp() {
      let val = this.arithmeticName,
        self = this;
      let params = {
        appAlgoname: val,
        appname: self.ID
      };
      if (!val) {
        self.message("必须选择一个算法!");
        return;
      }
      self
        .$Http({
          url: "algoDispatch/algoCreateJob",
          method: "post",
          data: self.QS.stringify(params)
        })
        .then(m => {
          self.message("算法创建成功！");
          // 显示是否跳到训练页，并且赋值。
          self.dialogObj.ToTranningDialog = true;
          // 训练数据中需要发送的参数str
          self.TranningMessionParamsConfigObj.algoid = m[0].algoId;
          self.TranningMessionObj.algoJobId = m[0].algoJobId;
          self.TranningMessionObj.algoname = val;
          self.suanfarenwuName =
            m[0].algoId + " | " + m[0].algoJobId + " | " + val;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 创建算法任务跳到训练任务
    ToTranningMissionFunc(str) {
      this.dialogObj.ToTranningDialog = false;
      this.dialogObj.inquireCreatMessionDialog = false;
      if (str) {
        this.__changeTwoteb(1);
      }
    },
    // 算法训练中算法列表获取--http
    ArithmeticMessionListFunc() {
      let self = this;
      self.dialogObj.requireArithmeticMessionDialog = true;
      let params = new URLSearchParams();
      params.append("userId", self.ID);
      params.append("tag", 1);
      self
        .$Http({
          url: "algoDispatch/selectAlgoTaskmoney",
          method: "post",
          data: params
        })
        .then(m => {
          self.TranningMessionParamsConfigObj.list = [];
          self.TranningMessionArithmeticListObj = m[0].data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 算法参数部分
    suanfancanshuFun() {
      if (this.TranningMessionParamsConfigObj.algoid) {
        this.suanfancanshu = true;
        this.ParamsConfigFunction(this.TranningMessionParamsConfigObj.algoid);
      } else {
        this.$message("请先选择算法任务！");
      }
    },
    // 训练任务中训练数据与测试数据比重---http
    ParamsConfigFunction(str) {
      let self = this;
      self.btnLoading.trainDisable = false;
      if (str) {
        // 发送请求获取参数
        let params = new URLSearchParams();
        params.append("algoId", str);
        self
          .$Http({
            url: "algoDispatch/algoParamName",
            method: "post",
            data: params
          })
          .then(m => {
            self.TranningMessionParamsConfigObj.list = m.AlgoParametName;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        self.$message("请先选择算法任务！");
      }
    },
    // 训练任务中输入数据id ---http
    SelectInputDataFunc(userid) {
      let self = this;
      userid = self.ID;
      if (userid) {
        self.dialogObj.SelectInputDataDialog = true;
        // 发送请求获取参数
        let params = new URLSearchParams();
        params.append("userId", userid);
        self
          .$Http({
            url: "offline/userDataList",
            method: "post",
            data: params
          })
          .then(m => {
            this.TranningMessionFileListObj = m.list;
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
      this.suanfarenwuName = " ";
      this.TranningMessionObj.algoJobId = scope.row.algoTaskId;
      this.TranningMessionParamsConfigObj.algoid = scope.row.algoId;
      this.TranningMessionObj.algoname = scope.row.algoname;
      // 清空算法参数
      this.flagFilter = "";
      let d = new Date(scope.row.starttime);
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
      this.suanfarenwuName =
        scope.row.algoId + " | " + scope.row.algoname + " | " + tt;
      this.dialogObj.requireArithmeticMessionDialog = false;
    },
    // 算法训练确认按钮---http
    confrimCreatTranningMessionFunc() {
      this.TranningMessionObj.algoParamet = this.TranningMessionParamsConfigObj.list;
      if (!this.TranningMessionObj.algoJobId) {
        this.$message("请选择算法任务！");
        return;
      }
      if (!this.TranningMessionObj.inputDataid) {
        this.$message("请选择输入数据");
        return;
      }
      // 按钮不可用
      this.btnLoading.trainDisable = true;
      let params = new URLSearchParams(),
        obj = {},
        self = this;
      for (let k in self.TranningMessionObj) {
        obj[k] = self.TranningMessionObj[k];
      }
      obj.dataWeight = self.baifeizhi;
      let str = JSON.stringify(obj);
      params.append("trainParam", str);
      self
        .$Http({
          url: "algoDispatch/algoTrain",
          method: "post",
          data: params
        })
        .then(m => {
          if (m.statusMsg === "OK") {
            const h = this.$createElement;
            this.$notify({
              title: "操作成功",
              message: h("i", { style: "color: #000" }, "训练发布成功，您可以稍后查看运行结果！"),
              type: "success"
            });
            self.PublishAltoTranningObj.model = m.algoTrainId;
            self.AnalyiseDataObj.trainId = m.algoTrainId;
            // self.CHANGETAB(2);
            // 开启进度条
            let id = m.algoTrainId;
            localStorage.setItem("trainid", id);
            self.changeTranningstep(id);
            self.timer.trainTimer = setInterval(() => {
              self.changeTranningstep(id);
            }, 5000);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 训练任务的进度条
    changeTranningstep(id) {
      let self = this,
        tid = "",
        params = new URLSearchParams();
      tid = id ? id : localStorage.getItem("trainid");
      if (!tid) {
        return;
      }
      params.append("trainID", tid);
      for (let i = 0, l = self.step.length; i < l; i++) {
        self.step[i].show = false;
      }
      self.step[0].show = true;
      self
        .$Http({
          url: "algoDispatch/seleceTrainStatus",
          method: "post",
          data: params
        })
        .then(m => {
          let status = m.data.status;
          if (status === 0) {
            self.step[0].active = 0;
          } else if (status === 1) {
            self.step[0].active = 1;
          } else if (status === 2) {
            self.complatedTrainName = self.PublishAltoTranningObj.model;
            self.step[0].active = 2;
            self.trainjieshu = true;
            clearInterval(self.timer.trainTimer);
            self.btnLoading.trainNext = false;
          } else {
            self.step[0].active = 0;
            self.$message("运行出错，请重新开始任务！");
          }
        });
    },
    // 算法训练下一步按钮
    trainNext() {
      // this.CHANGETAB(2);
      this.__changeThreeteb(2);
    },
    // 算法发布选择模型_____http
    PublishAltoTranningFunc() {
      this.dialogObj.PublishAltoTranningDialog = true;
      let self = this,
        params = self.QS.stringify({
          userId: self.ID,
          tag: 1
        });
      self
        .$Http({
          url: "algoDispatch/selectAlgoTrainkmoney",
          method: "post",
          data: params
        })
        .then(m => {
          self.PublishAltoTranningObj.list = m[0].data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 算法发布表格中操作按钮（选择模型）
    PublishAltoTranningTableFunc(scope) {
      this.dialogObj.PublishAltoTranningDialog = false;
      this.PublishAltoTranningObj.model = scope.row.trainid;
      // this.AnalyiseDataObj.trainId = scope.row.trainid;
    },
    //  确定算法发布任务
    publishMessionConfirmFunc() {
      if (this.PublishAltoTranningObj.model === "") {
        this.$message.error("请填写数据项！");
        return;
      }
      let self = this,
        params = new URLSearchParams();
      params.append("instancecount", 1);
      params.append("algoTrainId", self.PublishAltoTranningObj.model);
      params.append("userId", self.ID);
      self.btnLoading.publish = true;
      self
        .$Http({
          url: "algoDispatch/alogDeploy",
          method: "post",
          data: params
        })
        .then(m => {
          if (m[0].status === 0) {
            self.notify("算法发布成功", "您可以稍后查看发布结果！");
            // 请求成功使按钮不可用
            this.btnLoading.publish = true;
            localStorage.setItem("pubid", m[0].deploy);
            self.publishLoading(m[0].deploy);
            self.timer.pubTimer = setInterval(() => {
              self.publishLoading(m[0].deploy);
            }, 5000);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 算法模型发布进度条
    publishLoading(id) {
      let sid = "",
        self = this,
        params = new URLSearchParams();
      sid = id ? id : localStorage.getItem("pubid");
      for (let i = 0, l = self.step.length; i < l; i++) {
        self.step[i].show = false;
      }
      self.step[1].show = true;
      if (!sid) {
        return;
      }
      params.append("deployID", sid);
      self
        .$Http({
          url: "algoDispatch/seleceDeploy",
          method: "post",
          data: params
        })
        .then(m => {
          // 实时分析进度条，0是错误、1是运行中、2是完成
          if (m.data[0].status === 0 || m.data[0].status === 1) {
            self.step[1].active = 0;
          } else if (m.data[0].status === 3) {
            self.step[1].active = 1;
          } else if (m.data[0].status === 4 || m.data[0].status === 9) {
            clearInterval(self.timer.pubTimer);
            self.step[1].active = 1;
          } else {
            self.step[1].active = 0;
            self.$message("运行出错，请重新开始任务！");
          }
        });
    },
    // 完成算法发布可以单独查看的文件方法
    inquireanalyiseRouter() {
      let pid = localStorage.getItem("pubid");
      this.$router.push({
        path: "/Item2/TraningMission",
        query: { pid: pid }
      });
    },
    // 离线数据分析中的输入数据
    OffLineAnalyiseMessionOneFunc(userid) {
      let self = this;
      userid = self.ID;
      // 发起请求帮助获取选择模型中的列表
      if (userid) {
        self.dialogObj.OffLineAnalyiseMessionOneDialog = true;
        // 发送请求获取参数
        let params = new URLSearchParams();
        params.append("userId", userid);
        self
          .$Http({
            url: "offline/userDataList",
            method: "post",
            data: params
          })
          .then(m => {
            self.AnalyiseDataObj.inputArr = m.list;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 离线数据分析中输入数据表格中的操作按钮————弹出表格
    addOffLineAnalyisegMessionIdFunc(scope) {
      this.AnalyiseDataObj.input = scope.row.name;
      this.AnalyiseDataObj.dataId = scope.row.id;
      this.dialogObj.OffLineAnalyiseMessionOneDialog = false;
    },
    // 离线数据分析中算法插件参数弹出框中的确认按钮
    OffLineAnalyiseMessionTwoConfirmFunc() {
      this.dialogObj.OffLineAnalyiseMessionTwoDialog = false;
    },
    // 离线数据中选择模型select
    __offlineSelectModelHttp() {
      let self = this,
        params = self.QS.stringify({
          userId: self.ID,
          tag: 1
        });
      self
        .$Http({
          url: "algoDispatch/selectAlgoTrainkmoney",
          method: "post",
          data: params
        })
        .then(m => {
          this.AnalyiseDataseleModel = m[0].data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 离线数据分析中选择模型中，表格中的添加
    addMdel(scope) {
      let self = this;
      this.dialogObj.OffLineAnalyiseMessionThreeDialog = false;
      self.AnalyiseDataObj.trainId = scope.row.trainid;
    },
    // 离线数据分析中的确定
    AnalyiseDataConfirmFunc() {
      if (
        this.AnalyiseDataObj.trainId === "" ||
        this.AnalyiseDataObj.dataId === ""
      ) {
        this.$message.error("有未填写的数据项！");
        return;
      }
      let self = this,
        params = new URLSearchParams();
      self.btnLoading.analyise = true;
      self.complatedlixianfenxi = false;
      params.append("trainId", self.AnalyiseDataObj.trainId);
      params.append("dataId", self.AnalyiseDataObj.dataId);
      params.append("userId", self.ID);
      params.append("dataParameter", "");
      self
        .$Http({
          url: "algoDispatch/offlineTask",
          method: "post",
          data: params
        })
        .then(m => {
          if (m.status === 0) {
            self.notify("提交成功", "正在分析中，请稍后查看！");
            let aid = m.offilneid;
            self.analyiseStep(aid);
            localStorage.setItem("aid", aid);
            self.timer.AnaTimer = setInterval(() => {
              self.analyiseStep(aid);
            }, 5000);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 离线分析中进度条
    analyiseStep(id) {
      let aid = "",
        self = this,
        params = new URLSearchParams();
      aid = id ? id : localStorage.getItem("analid");
      if (!id) {
        return;
      }
      for (let i = 0, l = self.step.length; i < l; i++) {
        self.step[i].show = false;
      }
      self.step[2].show = true;
      params.append("offlineID", aid);
      self
        .$Http({
          url: "algoDispatch/seleceOffineStatus",
          method: "post",
          data: params
        })
        .then(m => {
          if (m.data.status === 0) {
            self.step[2].active = 0;
          } else if (m.data.status === 1) {
            // 返回成功
            self.step[2].active = 2;
            self.offlineDataid = m.data.dataId;
            self.complatedlixianfenxiName = aid;
            self.complatedlixianfenxi = true;
            self.btnLoading.analyise = false;
            clearInterval(self.timer.AnaTimer);
          } else {
            self.step[2].active = 0;
            self.$message("程序错误！");
          }
        });
    },
    // 离线分析任务完成后进行跳转
    inquireoffline() {
      let aid = this.offlineDataid;
      localStorage.setItem("offlineDataid", aid);
      setTimeout(()=>{
        this.$router.push({
        path: "/Item2/TraningMission",
        query: { aid: aid }
      });
      })
      
    },
    // 文件上传
    fileUpload(file) {
      let formdate = new FormData(),
        config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        },
        self = this;
      formdate.append("file", file);
      self
        .$Http({
          url: "upload/test",
          method: "post",
          data: formdate,
          config
        })
        .then(m => {})
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
@import url("base.css");
#item2 .el-table__body-wrapper {
  overflow: hidden !important;
}
#item2 .el-tabs__nav-wrap::after{
  width: 88%;
}
#item2-ul {
  height: 32px;
  overflow: hidden;
  width: 100%;
}
#item2-ul li {
  box-sizing: border-box;
  float: left;
  cursor: pointer;
  text-align: center;
  position: relative;
  font-weight: bold;
  font-size: 14px;
  line-height: 32px;
  background-color: #f0f0f0;
}
#item2-ul li em {
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
#item2-ul li i {
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
#item2-ul li.item2-active {
  background-color: #fff;
}
#item2-ul li.item2-active:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #3498db;
  width: 100%;
  height: 0;
}
#item2-ul li.item2-active em {
  border-color: transparent transparent transparent #f0f0f0;
}
#item2-ul li.item2-active i {
  border-color: transparent transparent transparent #fff;
}
.item-detail-function .content-- .content-list ul li.w33 {
  width: 33.33%;
}
.bg-content:nth-child(odd) {
  margin-left: 20px;
  float: left;
}
.bg-content:nth-child(even) {
  margin-right: 20px;
  float: right;
}
.bg-content:hover {
  z-index: 99;
  background-color: #fff;
}
.div-foo {
  margin: 0 auto;
  width: 90%;
  padding: 14px 26px 14px 13px;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid #e6ebf5;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s,
    bottom 0.3s;
  overflow: hidden;
}
.bg-content {
  box-sizing: border-box;
  padding: 0 20px;
  width: 45%;
  height: 80px;
  background-color: #fafafb;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
  transition: all 0.2s;
  -moz-transition: all 0.2s;
  -webkit-transition: all 0.2s;
  -o-transition: all 0.2s;
}
.bg-content .bg-content-top {
  box-sizing: border-box;
  padding: 10px 0px;
  font-size: 16px;
  border-bottom: 1px solid #e5edf0;
}
.bg-content:hover {
  background-color: #3498db;
  border: 1px solid #3498db;
}
.bg-content-bottom {
  padding: 10px;
}
.span-top .iconfont {
  font-size: 14px;
  cursor: pointer;
  color: #1fbae4;
}
.span-top .ipt-- {
  box-sizing: border-box;
  width: 50px;
  height: 30px;
  background-color: #fafafb;
  text-align: center;
  color: #1fbae4;
}
.bg-img {
  background-image: url("../../../assets/img/bg.fw.png");
  background-repeat: no-repeat;
  background-position: right top;
}
</style>