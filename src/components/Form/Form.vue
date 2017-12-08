<template>
  <aside id="main">
    <div class="left-com">
      <div class="left-com-top">
        <span class="name">数据表</span>
          <router-link :to="{path:'/uploadData',query:{PID: MathRound}}">
            <el-tooltip class="item" effect="dark" content="返回上一级" placement="bottom">
                <i class="iconfont">&#xe60c;</i>
            </el-tooltip>
          </router-link>
      </div>
      <div class="left-com-bottom">
        <div class="top" style="overflow:hidden;">
          <div class="title title1">维度</div>
          <ul class="RowMeasure" style="height:800px;">
            <li class="itemlist itemlist1" :draggable="item.age" title="拖拽添加" 
            :data-index="index" v-for="(item,index) in colsList" :key="index">
              <i class="iconfont">&#xe607;</i>{{item.name}}</li>
          </ul>
        </div>
        <div class="bottom" style="overflow:hidden;">
          <div class="title title2">度量</div>
          <ul class="ColMeasure" style="height:800px;">
            <li class="itemlist itemlist2" :draggable="item.age" title="拖拽添加" :data-index="index" v-for="(item,index) in rolsList" :key="index">
              <i class="iconfont">&#xe607;</i>{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right-com">
      <div class="right-com-top">
        <div class="right-com-top-tab">
          <div class="right-tab">
            <div data-type="button" class="data-button btn1">表格</div>
            <div data-type="button" class="data-button btn2">
              <!-- <router-link to="/InstrumentBoard">图表</router-link> -->
            </div>
            <div data-type="button" class="data-button btn3" @click.stop.prevent="_dataVisual">数据可视化</div>
          </div>
          <div class="left-tab">
            <el-tooltip class="item" effect="dark" content="保存" placement="bottom">
              <span class="icon-btn" @click="_saveData">
                <i class="iconfont">&#xe634;</i>
              </span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="导出" placement="bottom">
              <span class="icon-btn">
                <i class="iconfont">&#xe639;</i>
              </span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分享" placement="bottom">
              <span class="icon-btn">
                <i class="iconfont">&#xe608;</i>
              </span>
            </el-tooltip>
          </div>
        </div>
        <div class="right-com-top-ctl">
          <el-tooltip class="item" effect="dark" content="插入行" placement="bottom">
            <span class="icon-btn" @click="_insertRows">
              <i class="iconfont">&#xe8c4;</i>
            </span>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="插入列" placement="bottom">
            <span class="icon-btn" @click="_insertCols">
              <i class="iconfont">&#xe6d2;</i>
            </span>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除行" placement="bottom">
            <span class="icon-btn" @click.stop.prevent="_deleteRow">
              <i class="iconfont">&#xe6d0;</i>
            </span>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除列" placement="bottom">
            <span class="icon-btn" @click.stop.prevent="_deleteCol">
              <i class="iconfont">&#xe6d1;</i>
            </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除选中" placement="bottom">
            <span class="icon-btn" @click="_deleteSel">
              <i class="iconfont">&#xe61b;</i>
            </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分析还原" placement="bottom">
            <span class="icon-btn" @click.stop.prevent="_analyiseRestart">
              <i class="iconfont">&#xe728;</i>
            </span>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="查询" placement="bottom">
            <span class="icon-btn" @click.stop.prevent="_startRequire">
              <i class="iconfont">&#xe684;</i>
            </span>
          </el-tooltip>
          <!-- 开始 -->
          <!-- <span class="iconfont icon">&#xe601;</span> -->
          <el-tooltip class="item" effect="dark" content="最大值" placement="bottom">
            <span class="icon-btn" @click="__MAX()">
              <i class="iconfont">&#xe67c;</i>
            </span>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="最小值" placement="bottom">
            <span class="icon-btn" @click="__MIN()">
              <i class="iconfont">&#xe67b;</i>
            </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="平均值" placement="bottom">
            <span class="icon-btn" @click="__AVERAGE()">
              <i class="iconfont">&#xe667;</i>
            </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="求和" placement="bottom">
            <span class="icon-btn" @click="_calAdd()">
              <i class="iconfont">&#xe643;</i>
            </span>
          </el-tooltip>
        </div>
      </div>
      <div class="right-com-main">
        <div class="fx-control">
          <div class="fx-left" @click="dialogFormVisible = true">
            <i class="iconfont">&#xe74c;</i>
          </div>
          <input type="text" size="200" style="width:400px" ref="search_ipt" v-model="GLOBALbase">
        </div>
        <div class="main-table" id="example"></div>
      </div>
      <div class="right-com-bottom">
        <span class="el-icon-caret-left"></span>
        <span class="el-icon-caret-right"></span>
        <div class="text" style="display:inline-block">
          第一页
        </div>
      </div>
    </div>

    <!-- 函数列表 -->
    <el-dialog title="函数列表" :visible.sync="dialogFormVisible">
      <el-form size="mini">
        <!-- <el-form-item label="类别" :label-width="formLabelWidth">
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="函数：" :label-width="formLabelWidth">
          <el-select v-model="CalculationFormulaSele" placeholder="请选择活动区域">
            <el-option v-for="item in CalculationFormula" 
            :key="item.index"
            :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="makeCalculate()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 控制面板 -->
    <div class="control-board-filter" ref="controlBoard">
      <div class="filter-inner">
        <div class="filter-inner-drag" style="cursor:move;" ref="dragmunu" @mousedown.stop.prevent="dragThing">
          <span class="text" style="cursor:pointer;">分析面板</span>
          <el-tooltip class="item" effect="dark" content="最小化" placement="bottom">
            <span class="min iconfont" style="cursor:pointer;" @click.stop.prevent="ControlBoardShowThing()">&#xe600;</span>
          </el-tooltip>
        </div>
        <transition name="fold">
          <div class="filter-inner-content" v-show="ControlBoardShow">
            <!-- 行 -->
            <div class="filter-inner-content-item">
              <div class="item-bar">维度&nbsp;
                <el-tooltip class="item" effect="dark" content="拖拽行中名称添加筛选条件" placement="bottom">
                  <i class="iconfont" style="font-size:14px;cursor:pointer;">&#xe62f;</i>
                </el-tooltip>
              </div>
              <div class="item-content dustbin dustbin1" data=1>
                <ul class="">
                  <li class="member" v-for="(item,index) in newColList" :key="index">{{item.name}}
                    <i class="iconfont" @click.stop.prevent="deleteIndexCol(item)">&#xe617;</i>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 列 -->
            <div class="filter-inner-content-item">
              <div class="item-bar">度量&nbsp;
                <el-tooltip class="item" effect="dark" content="拖拽列中名称添加筛选条件" placement="bottom">
                  <i class="iconfont" style="font-size:14px;cursor:pointer;">&#xe62f;</i>
                </el-tooltip>
              </div>
              <div class="item-content dustbin2" data=2>
                <ul class="">
                  <li class="member" v-for="(item,index) in newRolList" :key="index">{{item.name}}
                    <i class="iconfont" @click.stop.prevent="deleteIndexRow(item)">&#xe617;</i>
                  </li>
                </ul>
              </div>
            </div>
            <div class="bottom-control">
              <div class="bottom-control-item">
                <el-button size="mini" @click="begin()" type="primary">检索</el-button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </aside>
</template>
<script>
document.onselectstart = function() {
  return false;
}; // 如果重新加载的话提示用户先保存
// window.onbeforeunload = function() {
//   return 'null';
// };
import "./handsontable.full.min.css";
import { randomString } from "./../../assets/js/common/common";
import setArr from "./../../assets/js/common/setArr";
export default {
  data() {
    return {
      MathRound: randomString(32),
      GLOBALbase: "",
      MAPOBJ: {}, // 防止在存储中的图表需要的数据
      TableCore: [], // mounted后从内存中取到的数据
      options: [],
      value8: "1",
      seleArr: [], // 用户选中的部分进行保存
      colsList: [],
      rolsList: [],
      newColList: [], // 保存用户投放区域数据 1
      newRolList: [], // 保存用户投放区域数据 2
      dragFlag: -1, // 用来判断是不是指定的投放区域
      ControlBoardShow: true, // 是否显示控制面板，默认显示
      currentIndex: 1, // 保存当前页数
      dataVal: [], // 接收存放后台返回的表格数据
      hot: Object, // 保存表格对象
      flagOfsel: false, // 用来判断是否是备选中的状态，如果是true，就是被选中的状态，所以就在当前行或列添加，如果是false，就默认在第一行添加行或列
      startRow: 0, // 开始行
      startCol: 0, //开始列
      endRow: 0, //结束行
      endCol: 0, //结束列
      dialogFormVisible: false,
      CalculationFormula: [
        {
          name: "sum",
          value: "sum"
        },
        {
          name: "max",
          value: "max"
        },
        {
          name: "min",
          value: "min"
        },
        {
          name: "avg",
          value: "avg"
        }
      ],
      CalculationFormulaSele: "sum",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      headers: [],
      formLabelWidth: "120px"
    };
  },
  mounted() {
    if (this.$route.query.PID.length < 32) {
      this.$router.push("/");
      return;
    }
    let _this = this;

    const containerTop = document.querySelector(".left-com-bottom .top");
    _this.PsInit(containerTop);

    const containerBottom = document.querySelector(".left-com-bottom .bottom");
    _this.PsInit(containerBottom);

    // 初始化表格
    _this.InitHot(document.querySelector("#example"));
    _this.hot.addHook("afterSelectionEnd", function(
      startRow,
      startCol,
      endRow,
      endCol
    ) {
      //选中表格鼠标抬时触发 r行，c列
      _this.flagOfsel = true;
      _this.startRow = startRow;
      _this.startCol = startCol;
      _this.endRow = endRow;
      _this.endCol = endCol;
      // let big = _this.hot.getValue(startRow, startCol, endRow, endCol);// 获取到一个格子的值
      let data = _this.hot.getData(startRow, startCol, endRow, endCol);
      let arr = [];
      for (let i = 0, len = data.length; i < len; i++) {
        for (let j = 0, lens = data[i].length; j < lens; j++) {
          arr.push(data[i][j]);
        }
      }
      // 用户选中的数据
      _this.seleArr = arr;
      // 选中的数据所生成的图表数据
      let m = _this.TableCore;
      let headerArr = m.schema.split(",");
      _this._findHeader(startCol, endCol, headerArr);
      // setArr(m.data) // 二维数组
      let yArr = [];
      for (let i = startCol, len = endCol; i <= len; i++) {
        yArr.push(_this.hot.getDataAtCol(i));
      }
      _this.MAPOBJ = {
        x:
          startCol == endCol
            ? [headerArr[startCol]]
            : _this._findHeader(startCol, endCol, headerArr),
        y: yArr
      };
    });

    // 搜索事件
    // _this._GlobalSearch();
    // 载入表格数据
    _this._loadData();
  },
  methods: {
    makeCalculate() {
      let that = this;
      that.dialogFormVisible = false;
      let datas = that.CalculationFormulaSele;
      switch (datas) {
        case "max":
          that.__MAX();
          break;
        case "min":
          that.__MIN();
          break;
        case "sum":
          that._calAdd();
          break;
        case "avg":
          that.__AVERAGE();
          break;
        default:
          break;
      }
    },
    DRAGTHINGCol(list, dustbin, arr, newArr, flag) {
      let index = 0,
        _this = this;
      for (let i = 0, len = list.length; i < len; i++) {
        list[i].ondragstart = function(ev) {
          ev.dataTransfer.effectAllowed = "move";
          ev.dataTransfer.setData("abcd", ev.target.innerHTML);
          ev.dataTransfer.setDragImage(ev.target, 0, 0);
          index = ev.target.getAttribute("data-index");
          _this.dragFlag = flag;
          return true;
        };
        list[i].ondragend = function(ev) {
          ev.dataTransfer.clearData("text");
          return false;
        };
      }
      dustbin.ondragover = function(ev) {
        /*拖拽元素在目标元素头上移动的时候*/
        ev.preventDefault();
        return true;
      };
      dustbin.ondragenter = function(ev) {
        let muflag = ev.target.getAttribute("data");
        if (muflag == _this.dragFlag) {
          dustbin.ondrop = function(ev) {
            newArr.push(arr[index]);
            arr[index].age = false;
            return false;
          };
        } else {
          dustbin.ondrop = null;
        }
        return true;
      };
    },
    _findHeader(i1, i2, arr) {
      let _this = this;
      let newArrs = [];
      if (i1 === i2) return false;
      for (let i = i1; i <= i2; i++) {
        newArrs.push(arr[i]);
      }
      return newArrs;
    },
    // 返回某个元素在数组中的位置
    __findIndex(a, x) {
      let len = a.length,
        pos = 0;
      while (pos < len) {
        pos = a.indexOf(x, pos);
        if (pos === -1) {
          //未找到就退出循环完成搜索
          break;
        }
        return pos;
        pos += 1; //并从下个位置开始搜索
      }
    },
    // 数据可视化
    _dataVisual() {
      // let arr1 = [],
      //   arr2 = [];
      // for (let i = 0, len = newColList.length; i < len; i++) {
      //   arr1.push(this.__findIndex(this.dataVal, newColList[i].name));
      // }
      // for (let i = 0, len = newRolList.length; i < len; i++) {
      //   arr2.push(this.__findIndex(this.dataVal, newRolList[i].name));
      // }
      // let ARR = [];
      // localStorage.setItem("headerArr", JSON.stringify(arr2));
      // localStorage.setItem(
      //   "a1",
      //   JSON.stringify(this.hot.getDataAtCol(arr1[0]))
      // );
      // for (let i = 0, len = arr2.length; i < len; i++) {
      //   ARR.push(this.hot.getDataAtCol(arr2[i]));
      // } // 获取每一列的数据
      // localStorage.setItem("a2", JSON.stringify(ARR));

      let _this = this;
      if (!_this.isEmptyObject(_this.MAPOBJ)) {
        localStorage.setItem("MAPOBJ", JSON.stringify(_this.MAPOBJ));
      } else {
        let newArr = [];
        for (let i = 0, len = _this.hot.countCols(); i < len; i++) {
          newArr.push(_this.hot.getDataAtCol(i));
        }
        let map = {
          x: _this.TableCore.matrics.split(",") || [],
          y: newArr
        };
        localStorage.setItem("MAPOBJ", JSON.stringify(map));
      }
      setTimeout(() => {
        this.$router.push({
          path: "/InstrumentBoard",
          query: {
            PID: randomString(32)
          }
        });
      }, 300);
    },
    // 检索
    begin() {
      let newColList = this.newColList,
        newRolList = this.newRolList,
        self = this,
        m = JSON.parse(localStorage.getItem("tableData")),
        colName = [];
      self.newRolList.forEach(item => {
        colName.push(item.name);
      });
      if (!m) {
        // 如果内存被清除的情况
        return false;
      }
      let data = {
        tableName: m.Hivetable,
        colName: colName.join(",")
      };
      self
        .$Http({
          url: self.URL.ip2 + "searchbysql",
          method: "post",
          data: data
        })
        .then(m => {
          self.hot.loadData(setArr(m.data));
          let newArr = [];
          self.newRolList.forEach(item => {
            newArr.push(item.name);
          });
          // rolsList  这里的。 newRolList
          self.hot.updateSettings({
            colHeaders: newArr
          });
        });
    },
    // 初始化滚动条
    PsInit(dom) {
      let _this = this;
      _this.Ps.initialize(dom, {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20,
        suppressScrollX: true
      });
    },
    // 判断对象是否为空
    isEmptyObject(obj) {
      for (var n in obj) {
        return false;
      }
      return true;
    },
    // 投放区待选条删除1
    deleteIndexCol(item) {
      let _this = this;
      let len = _this.newColList.length,
        index = -1,
        newindex = -1;
      for (let i = 0; i < len; i++) {
        if (_this.newColList[i] === item) {
          newindex = i;
        }
      }
      _this.newColList.splice(newindex, 1);
      for (let j = 0, len = _this.colsList.length; j < len; j++) {
        if (item === _this.colsList[j]) {
          index = j;
        }
      }
      _this.colsList[index].age = true;
    },

    // 投放区待选条删除2
    deleteIndexRow(item) {
      let _this = this;
      let len = _this.newRolList.length,
        index = -1,
        newindex = -1;
      for (let i = 0; i < len; i++) {
        if (_this.newRolList[i] === item) {
          newindex = i;
        }
      }
      _this.newRolList.splice(newindex, 1);
      for (let j = 0; j < _this.rolsList.length; j++) {
        if (item === _this.rolsList[j]) {
          index = j;
        }
      }
      _this.rolsList[index].age = true;
    },
    // 控制面板的显示和隐藏
    ControlBoardShowThing() {
      this.ControlBoardShow = !this.ControlBoardShow;
    },
    // 控制面板的拖拽事件
    dragThing(e) {
      let box = this.$refs.controlBoard;
      let diffX = e.clientX - box.offsetLeft;
      let diffY = e.clientY - box.offsetTop;
      document.onmousemove = function(e) {
        let left = e.clientX - diffX;
        let top = e.clientY - diffY;
        if (left < 0) {
          left = 0;
        } else if (left > window.innerWidth - box.offsetWidth) {
          left = window.innerWidth - box.offsetWidth;
        }
        if (top < 0) {
          top = 0;
        } else if (top > window.innerHeight - box.offsetHeight) {
          top = window.innerHeight - box.offsetHeight;
        }
        //移动时重新得到物体的距离，解决拖动时出现晃动的现象
        box.style.left = left + "px";
        box.style.top = top + "px";
      };
      document.onmouseup = function() {
        document.onmousemove = null;
      };
    },

    // 打开提示，常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。
    openNotice(type, text) {
      if (type === "alert") {
        //普通提示
        this.$message(text);
      } else if (type === "success") {
        // 成功的提示
        this.$message({
          message: text,
          type: "success"
        });
      } else if (type === "warning") {
        // 提出警告
        this.$message({
          message: "警告哦，这是一条警告消息",
          type: "warning"
        });
      } else {
        // error  错误提示
        this.$message.error(text);
      }
    },

    // 插入行
    _insertRows() {
      let _this = this;
      if (_this.flagOfsel) {
        _this.hot.selectCell(_this.startRow, _this.startCol);
        _this.hot.alter("insert_row", _this.startRow);
        _this.flagOfsel = false;
      } else {
        _this.hot.selectCell(0, _this.startCol);
        _this.hot.alter("insert_row", 0);
        _this.flagOfsel = false;
      }
    },

    // 插入列
    _insertCols() {
      let _this = this;
      if (_this.flagOfsel) {
        _this.hot.selectCell(_this.startRow, _this.startCol);
        _this.hot.alter("insert_col", _this.startCol);
        _this.flagOfsel = false;
      } else {
        _this.hot.selectCell(_this.startRow, 0);
        _this.hot.alter("insert_col", 0);
        _this.insert_row = false;
      }
    },

    // 删除行
    _deleteRow() {
      let _this = this,
        count = _this.endRow - _this.startRow + 1;
      if (_this.flagOfsel) {
        _this.hot.selectCell(_this.startRow, _this.startCol);
        _this.hot.alter("remove_row", _this.startRow, count);
      } else {
        _this.hot.selectCell(_this.startRow, 0);
        _this.hot.alter("remove_row", 0);
        _this.flagOfsel = false;
      }
    },

    // 删除列
    _deleteCol() {
      let _this = this,
        count = _this.endCol - _this.startCol + 1;
      if (_this.flagOfsel) {
        _this.hot.selectCell(_this.startRow, _this.startCol);
        _this.hot.alter("remove_col", _this.startCol, count);
      } else {
        _this.hot.alter("remove_col", 0);
        _this.flagOfsel = false;
      }
    },

    // 删除选中的(实际是cut掉)
    _deleteSel() {
      let _this = this;
      if (_this.flagOfsel) {
        _this.hot.selectCell(
          _this.startRow,
          _this.startCol,
          _this.endRow,
          _this.endCol
        );
        _this.hot.getPlugin("copyPaste").cut();
        _this.flagOfsel = false;
      }
    },

    // 打开一个对话框
    _openDialog() {
      let _this = this;
    },
    // 创建对象
    __CreatObj(arr) {
      let newArr = [];
      for (let i = 0, len = arr.length; i < len; i++) {
        newArr.push({
          name: arr[i],
          age: true
        });
      }
      return newArr;
    },
    // 数据还原到最开始的状态
    _analyiseRestart() {
      let _this = this;
      this.$confirm("确定还原此报表吗？自定义数据与操作都将丢失（保存报表之后生效）。", {
        callback: function(data) {
          if (data === "confirm") {
            _this._loadData();
            _this.$message({
              type: "success",
              message: "还原成功!"
            });
          } else {
            _this.$message({
              type: "info",
              message: "已取消删除"
            });
          }
        }
      });
    },

    // 使用公式开始计算
    _startRequire() {},
    // 初始化表格
    InitHot(dom, seeting) {
      let _this = this,
        defSettging = {
          colHeaders: true, // 列表头
          rowHeaders: true, //行表头
          stretchH: "all", // 是否
          startRows: 15,
          startCols: 26,
          minCols: 26,
          minRows: 20,
          manualColumnFreeze: true,
          autoColumnSize: true,
          // fixedRowsBottom: 2,
          // search: true, // 启用搜索
          autoWrapRow: true, //自动换行
          copyPaste: true,
          customBorders: true,
          contextMenu: {
            callback: function(key, options) {
              if (key === "print") {
                setTimeout(_ => {
                  _this._dataVisual();
                }, 0);
              }
            },
            items: {
              row_above: {
                name: "在上面插入行"
              },
              row_below: {
                name: "在下面插入行"
              },
              col_left: {
                name: "在左侧插入列"
              },
              col_right: {
                name: "在右侧插入列"
              },
              hsep1: "---------",
              undo: {
                name: "撤销"
              },
              redo: {
                name: "恢复"
              },
              make_read_only: {
                name: "只读"
              },
              print: {
                name: "数据可视化"
                // disabled: function() {
                //   // if first row, disable this option
                //   alert(1);
                //   // return hot3.getSelected()[0] === 0
                // }
              },
              hsep2: "---------",
              mergeCells: {
                name: "合并单元格"
              },
              freeze_column: {
                name: "冻结该列"
              }
            }
          },
          manualColumnMove: true,
          manualRowMove: true,
          manualColumnResize: true,
          manualRowResize: true,
          mergeCells: true // 合并单元格
        };
      this.hot = new Handsontable(dom, defSettging);
      // seeting == Object ? this.hot = new Handsontable(dom, seeting) : this.hot = new Handsontable(dom, defSettging)
    },

    // 保存数据
    _saveData() {
      let saveDatas = this.hot.getData();
      // console.log(this.hot.mergeCells.mergedCellInfoCollection);
      // 加载 loading
      // 拿到数据后并且保存到后端
    },

    // 全局搜索高亮
    _GlobalSearch() {
      let _this = this,
        doms = this.$refs.search_ipt;
      Handsontable.dom.addEvent(doms, "keyup", function(event) {
        let queryResult = _this.hot.search.query(this.value);
        _this.hot.render();
      });
    },

    // 第一次载入数据
    _loadData() {
      let _this = this;
      let m = (_this.TableCore = JSON.parse(localStorage.getItem("tableData")));
      if (!m) {
        _this.$router.push({
          path: "/uploadData",
          query: { PID: MathRound }
        });
        return false;
      }
      // 设置表头
      _this.hot.updateSettings({
        colHeaders: m.schema.split(",")
      });
      // 载入数据
      _this.dataVal = setArr(m.data);
      _this.hot.loadData(setArr(m.data));

      // m.dimensions 维度 colsList
      try {
        _this.colsList = _this.__CreatObj(m.dimensions.split(","));
      } catch (e) {
        _this.colsList = _this.__CreatObj([m.dimensions]);
      }
      // m.matrics 度量 rolsList
      _this.rolsList = _this.__CreatObj(m.matrics.split(","));

      // 等到dom渲染完成，添加事件
      _this.$nextTick(() => {
        let lis1 = document.querySelectorAll("li.itemlist1"),
          dustbin1 = document.querySelector("div.dustbin1");
        _this.DRAGTHINGCol(lis1, dustbin1, _this.colsList, _this.newColList, 1);
        let lis2 = document.querySelectorAll("li.itemlist2"),
          dustbin2 = document.querySelector(".dustbin2");
        _this.DRAGTHINGCol(lis2, dustbin2, _this.rolsList, _this.newRolList, 2);
      });
    },
    // 求和操作
    _calAdd() {
      let _this = this;
      _this.GLOBALbase = "";
      if (_this.flagOfsel) {
        _this.hot.selectCell(
          _this.startRow,
          _this.startCol,
          _this.endRow,
          _this.endCol
        );
        let arr = _this.seleArr || [],
          result = 0;
        // let a = _this.hot.colToProp(1);
        for (let i = 0, len = arr.length; i < len; i++) {
          // if (arr[i] === null) {
          //   arr[i] = 0;
          // } else {
          //   arr[i] = arr[i].replace(/[^0-9]/g, "");
          // }
          result += parseInt(arr[i]);
        }
        this.GLOBALbase = `SUM=${result}`;
        // _this.flagOfsel = false;
      }
    },
    // 求最大值
    __MAX() {
      let _this = this;
      _this.GLOBALbase = "";
      if (_this.flagOfsel) {
        _this.hot.selectCell(
          _this.startRow,
          _this.startCol,
          _this.endRow,
          _this.endCol
        );
        let arr = _this.seleArr;
        let maxN = eval("Math.max(" + arr.join() + ")");
        this.GLOBALbase = `MAX=${maxN}`;
        // _this.flagOfsel = false;
      }
    },
    // 求最小值
    __MIN() {
      let _this = this;
      _this.GLOBALbase = "";
      if (_this.flagOfsel) {
        _this.hot.selectCell(
          _this.startRow,
          _this.startCol,
          _this.endRow,
          _this.endCol
        );
        let arr = _this.seleArr;
        let minN = eval("Math.min(" + arr.join() + ")");
        this.GLOBALbase = `MIN=${minN}`;
        // _this.flagOfsel = false;
      }
    },
    // 求平均值
    __AVERAGE() {
      let _this = this;
      _this.GLOBALbase = "";
      if (_this.flagOfsel) {
        _this.hot.selectCell(
          _this.startRow,
          _this.startCol,
          _this.endRow,
          _this.endCol
        );
        let arr = _this.seleArr;
        let sum = eval(arr.join("+"));
        let average = ~~(sum / arr.length * 100) / 100;
        this.GLOBALbase = `AVG=${average}`;
        // _this.flagOfsel = false;
      }
    }
  }
};
</script>
<style scoped>
#main {
  height: calc(100vh - 60px);
  position: relative;
}

.left-com {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 220px;
}

.left-com-top {
  box-sizing: border-box;
  width: 100%;
  height: 47px;
  padding: 0 20px;
  line-height: 47px;
  font-size: 14px;
  color: #000000;
  background-color: #fafdff;
  border-bottom: 2px solid #c8c9cc;
}

.left-com-top span,
.left-com-top i {
  display: inline-block;
}

.left-com-top span {
  float: left;
}

.left-com-top i {
  float: right;
  /* color: #4bb8ff; */
  font-size: 18px;
  cursor: pointer;
}

.left-com-bottom {
  height: calc(100% - 47px);
  background-color: #fafdff;
  font-size: 12px;
  position: relative;
}

.left-com-bottom .top {
  height: 180px;
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #ccc;
}

.left-com-bottom .title {
  box-sizing: border-box;
  height: 30px;
  width: 100%;
  line-height: 30px;
  position: absolute;
  background: #c0c0ba;
  color: #fff;
  padding-left: 15px;
}
.left-com-bottom .title1 {
  top: 0;
  left: 0;
}
.left-com-bottom .title2 {
  top: 182px;
  left: 0;
}
.left-com-bottom .bottom {
  height: calc(100% - 260px);
  width: 100%;
  background: #fff;
  border-top: 1px solid #ccc;
}

.left-com-bottom .RowMeasure,
.ColMeasure {
  margin-top: 28px;
  padding: 10px 20px;
  box-sizing: border-box;
}

.left-com-bottom .RowMeasure,
.ColMeasure li {
  height: 22px;
  line-height: 22px;
}

.left-com-bottom .RowMeasure li .iconfont {
  font-size: 14px;
}

.left-com-bottom .ColMeasure li .iconfont {
  font-size: 14px;
}

.right-com {
  position: fixed;
  top: 60px;
  right: 0;
  bottom: 0;
  width: calc(100% - 220px);
}

.right-com-top {
  width: 100%;
  height: 88px;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
}

.right-com-top-tab {
  height: 47px;
  padding: 2px 0;
  line-height: 47px;
  box-sizing: border-box;
  background-color: #f9f9f9;
  border-bottom: 2px solid #c8c9cc;
}

.right-tab {
  width: calc(100% - 250px);
  height: 41px;
  display: inline-block;
  box-sizing: border-box;
  border-right: 1px solid #e1e1e1;
}

.right-tab .data-button {
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  padding-left: 22px;
  color: #4f4f4f;
}

.right-tab .data-button:hover {
  color: #20acf1;
}

.right-tab .btn3 {
  float: right;
  padding-right: 20px;
}

.left-tab {
  width: 220px;
  height: 41px;
  line-height: 41px;
  display: inline-block;
}

.left-tab .icon-btn {
  cursor: pointer;
  margin-left: 20px;
}

.right-com-top-ctl {
  box-sizing: border-box;
  height: 41px;
  line-height: 40px;
  padding: 2px 0px;
  color: #7b7676;
  background-color: #ffffff;
}
.right-com-top-ctl .icon-btn {
  display: inline-block;
  height: 26px;
  width: 32px;
  text-align: center;
  color: #455564;
  line-height: 26px;
  border: 1px solid rgb(255, 255, 255);
}
.right-com-top-ctl .icon-btn .iconfont {
  font-size: 20px;
}
.right-com-top-ctl .icon-btn:hover {
  background: #f9f9f9;
  border-radius: 3px;
  border: 1px solid #ddd;
}

.right-com-top-ctl .icon {
  margin-left: 10px;
}

.right-com-top-ctl .icon-btn {
  color: #7b7676;
  cursor: pointer;
  margin-left: 20px;
}

.right-com-main {
  height: calc(100% - 128px);
  border-top: 1px solid #ddd;
  box-sizing: border-box;
}

.right-com-main .fx-control {
  position: relative;
  border-bottom: 1px solid #d4d4d4;
  height: 26px;
  border-left: 1px solid #ccc;
  background: #fafafa;
  color: #737373;
}

.right-com-main .main-table {
  height: calc(100% - 26px);
  overflow: hidden;
  position: relative;
}

.fx-control .fx-left {
  position: absolute;
  width: 33px;
  height: 21px;
  left: 0;
  top: 2px;
  border-right: 1px solid #c7c8c9;
  cursor: pointer;
  text-align: center;
  line-height: 21px;
}

.fx-control .fx-left .iconfont {
  font-size: 18px;
}

.fx-control input {
  width: 100% !important;
  height: 26px;
  font-size: 12px;
  margin-bottom: 0;
  padding: 2px 2px 2px 38px;
  vertical-align: middle;
  border: none;
  background: 0 0;
  outline: 0;
  box-shadow: none;
  color: #737373;
}

.right-com-bottom {
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  background-color: #f9f9f9;
  padding-left: 20px;
  border-left: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 14px;
}

.right-com-bottom span {
  padding-right: 10px;
}
.left-tab .iconfont {
  font-size: 22px;
}
#example,
.handsontable .htMenu {
  color: #333;
  font-family: Verdana, Helvetica, Arial, FreeSans, sans-serif;
  font-size: 12px;
}

#example,
.handsontable .dragdealer .handle {
  -webkit-border-radius: 4px;
  border-radius: 4px;
}

.control-board-filter {
  position: absolute;
  right: 20px;
  top: 55px;
  width: 300px;
  min-width: 300px;
  z-index: 600;
  user-select: none;
  font-size: 12px;
}

.control-board-filter .filter-inner {
  box-shadow: 0 2px 4px #ccc;
  border-radius: 4px;
}

.filter-inner-drag {
  position: relative;
  min-height: 26px;
  /* border: 1px solid #cacaca; */
  border-radius: 4px 4px 0 0;
  /* background: rgba(238, 238, 238, 0.8); */
  background-color: #2d2b32;
  opacity: 0.85;
  color: #fff;
}

.filter-inner-drag span {
  position: absolute;
}

.filter-inner-drag span.text {
  font-size: 14px;
  left: 5px;
  top: 7px;
}

.filter-inner-drag span.min {
  right: 10px;
  top: 1px;
}

.filter-inner-content {
  background: #f7f7f7;
  border: 1px solid #cacaca;
  border-radius: 0 0 5px 5px;
  border-top: none;
}

.item-bar {
  border-top-color: #a2a2a2;
  height: 27px;
  line-height: 26px;
  border-bottom: 1px solid #d5d5d5;
  padding-left: 10px;
  background: #fdfdfd;
  color: #888;
}

.item-content {
  padding: 1px 0 5px 5px;
  height: 142px;
  border-bottom: 1px solid #d5d5d5;
  overflow: auto;
}

.item-content > ul {
  margin: 0;
  padding: 0;
  max-height: 200px;
}

.item-content > ul > li {
  float: left;
  height: 20px;
  list-style-type: none;
  line-height: 20px;
  margin: 4px 5px 0 0;
  padding: 0 6px;
  min-width: 70px;
  max-width: 98%;
  text-align: center;
  white-space: nowrap;
  border-radius: 12px;
}

li.member {
  background: #e5f1ff;
  border: 1px solid #69c;
  color: #2a6085;
  display: inline !important;
  margin-left: 10px;
}

li.member > .iconfont {
  font-size: 14px;
  cursor: pointer;
  margin-left: 5px;
  color: #75827b;
}

.bottom-control {
  padding: 20px 0;
  line-height: 26px;
  padding-left: 10px;
  color: #888;
  position: relative;
}

.bottom-control .bottom-control-item {
  position: absolute;
  right: 10px;
  top: 5px;
}

.fold-enter-active,
.fold-leave-active {
  opacity: 0;
}

.fold-enter,
.fold-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>

