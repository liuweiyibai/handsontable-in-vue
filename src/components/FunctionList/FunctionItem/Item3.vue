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
          <li class="content-btn w55" @click="CreatePreprocessingTask = true" style="z-index:2">
            创建预处理任务
            <em></em>
            <i></i>
          </li>
          <li class="content-btn w55" @click="BeginPreprocessingTask = true" style="z-index:1;">
           执行预处理任务
           <em></em>
           <i></i>
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
    };
  },
  methods: {
    openTable(str, val) {
      this[val] = false;
      this.$router.push({
        path: str
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
.item3-active{
  background-color: #fff;
}
li.item3-active em{
  border-color: transparent transparent transparent #F9FBFC;
}
li.item3-active i{
   border-color: transparent transparent transparent #fff;
}
</style>

