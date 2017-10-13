<template>
  <div id="item2" class="item-detail-function">
    <div class="top">
      <div class="content">
        <h2>算法任务</h2>
      </div>
    </div>
    <div class="bottom">
      <div class="img"></div>
      <div class="list">
        <ul class="hover3d">
          <li class="content-btn hoverContainer" @click="AlgorithmOfTask = true">
            <span>创建算法任务</span>
          </li>
          <li class="content-btn" @click="trainingMission = true">
            <span>创建训练任务</span>
          </li>
          <li class="content-btn" @click="JobSubmission = true">
            <span>创建算法发布任务</span>
          </li>
          <li class="content-btn" @click="OffLineAnalysis = true">
            <span>创建离线数据分析任务</span>
          </li>
          <li class="content-btn" @click="disloagInquire = true">
            <span>任务查询</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 创建算法任务 -->
    <el-dialog title="创建算法任务" :visible.sync="AlgorithmOfTask">
      <el-form :model="form">
        <el-form-item label="算法名称" :label-width="formLabelWidth">
          <el-input v-model="arithmeticNameInput" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="算法列表" :label-width="formLabelWidth">
          <el-select v-model="arithmeticName" placeholder="请选择算法">
            <el-option v-for="item in arithmeticList" :key="item.index" :label="item.index" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AlgorithmOfTask = false">取 消</el-button>
        <el-button type="primary" @click="CreateMissionHttp()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 算法训练 -->
    <el-dialog title="创建训练任务" :visible.sync="trainingMission">
      <el-form>
        <el-form-item label="算法任务id" :label-width="formLabelWidth">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="训练数据与测试数据比重" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择算法">
            <el-option label="算法1" value="shanghai"></el-option>
            <el-option label="算法2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="输入数据id" :label-width="formLabelWidth">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="算法插件数据参数" :label-width="formLabelWidth">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="算法插件算法参数" :label-width="formLabelWidth">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="trainingMission = false">取 消</el-button>
        <el-button type="primary" @click="openTable('/Item2/TraningMission','trainingMission')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 算法发布任务 -->
    <el-dialog title="算法发布任务提交" :visible.sync="JobSubmission">
      <el-form>
        <el-form-item label="实例个数" :label-width="formLabelWidth">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="算法训练id" :label-width="formLabelWidth">
          <el-select placeholder="请选择算法">
            <el-option label="算法1" value="shanghai"></el-option>
            <el-option label="算法2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="JobSubmission = false">取 消</el-button>
        <el-button type="primary" @click="openTable('/Item2/PublishMission','JobSubmission')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 离线数据分析任务 -->
    <el-dialog title="离线数据分析任务" :visible.sync="OffLineAnalysis">
      <el-form>
        <el-form-item label="输入数据id" :label-width="formLabelWidth">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="算法插件数据参数" :label-width="formLabelWidth">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="训练id" :label-width="formLabelWidth">
          <el-select placeholder="请选择算法">
            <el-option label="算法1" value="shanghai"></el-option>
            <el-option label="算法2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="OffLineAnalysis = false">取 消</el-button>
        <el-button type="primary" @click="openTable('/Item2/AnalyiseMission','OffLineAnalysis')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 查询任务 -->
    <el-dialog title="任务查询" :visible.sync="disloagInquire">
      <el-table>
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      AlgorithmOfTask: false,
      trainingMission: false,
      JobSubmission: false,
      OffLineAnalysis: false,
      disloagInquire: false,
      arithmeticNameInput: '',// 用户输入的算法名称
      arithmeticName: '', // 算法名称
      arithmeticList: ["LinearRegression"], // 返回的算法列表
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  mounted() {
  },
  methods: {
    openTable(str, val) {
      this[val] = false;
      this.$router.push({
        path: str
      })
    },
    // 打开创建算法任务窗口
    openCreatMission() {
      // 发送请求获取算法列表
      // 打开窗口
    },
    // 创建算法任务请求 
    CreateMissionHttp() {
      let val = this.arithmeticName,
        name = this.arithmeticNameInput;
      if (!val) {
        this.message('必须选择一个算法！');
        return;
      }
      this.$Http({
        url: '/api/DataAnalyzePlatformBA/algoDispatchjson/algoCreateJob',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          "algoName": "Fred",
          "appname": "LinearRegression"
        }
      }).then(function(response) {
        console.log(response);
      })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 消息提示窗
    message(txt) {
      this.$message(txt);
    },
    // 弹出警告框
    notify() {
      const h = this.$createElement;
      this.$notify({
        title: '标题名称',
        message: h('i', { style: 'color: teal' }, '这是提示')
      });
    }
  }
}
</script>

<style>
@import url("base.css");
</style>

