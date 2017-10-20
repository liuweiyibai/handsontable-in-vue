<template>
  <div id="item1" class="item-detail-function">
    <div class="top">
      <div class="content">
        <h2>数据预处理</h2>
      </div>
    </div>
    <div class="content--">
      <div class="content-list">
        <ul>
          <li class="content-btn" @click="CreatePreprocessingTask = true">
            <span>创建预处理任务</span>
          </li>
          <li class="content-btn" @click="BeginPreprocessingTask = true">
            <span>执行预处理任务</span>
          </li>
          <li class="content-btn">
            <span>任务查询</span>
          </li>
        </ul>
      </div>
      <div class="content-body"></div>
    </div>

    <div class="bottom">
      <div class="inner"></div>
    </div>
    <!-- 创建预处理任务 -->
    <el-dialog title="创建预处理任务" :visible.sync="CreatePreprocessingTask">
      <el-form>
        <el-form-item label="数据处理方法名称" :label-width="formLabelWidth">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="CreatePreprocessingTask = false">取 消</el-button>
        <el-button type="primary" @click="openTable('Item3/CreateManageMission','CreatePreprocessingTask')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 执行预处理任务 -->
    <el-dialog title="执行预处理任务" :visible.sync="BeginPreprocessingTask">
      <el-form>
        <el-form-item label="数据处理任务id" :label-width="formLabelWidth">
          <el-select placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参数" :label-width="formLabelWidth">
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="BeginPreprocessingTask = false">取 消</el-button>
        <el-button type="primary" @click="openTable('Item3/BeginManageMission','BeginPreprocessingTask')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      CreatePreprocessingTask: false,
      BeginPreprocessingTask: false,
      formLabelWidth: "120px"
    }
  },
  methods: {
    openTable(str, val) {
      this[val] = false;
      this.$router.push({
        path: str
      })
    },
  }
}
</script>

<style>
@import url("base.css");
</style>

