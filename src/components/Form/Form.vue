<template>
  <aside id="main">
    <div class="left-com">
      <div class="left-com-top">
        <span class="name">数据表</span>
        <el-tooltip class="item" effect="dark" content="新建数据表" placement="bottom">
          <i class="iconfont">&#xe63b;</i>
        </el-tooltip>
      </div>
      <div class="left-com-bottom"></div>
    </div>
    <div class="right-com">
      <div class="right-com-top">
        <div class="right-com-top-tab">
          <div class="right-tab">
            <div data-type="button" class="data-button btn1">表格</div>
            <div data-type="button" class="data-button btn2">图表</div>
            <div data-type="button" class="data-button btn3">重置数据</div>
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
              <i class="iconfont">&#xe600;</i>
            </span>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="插入列" placement="bottom">
            <span class="icon-btn" @click="_insertCols">
              <i class="iconfont">&#xe6d2;</i>
            </span>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除行" placement="bottom">
            <span class="icon-btn">
              <i class="iconfont">&#xe6d0;</i>
            </span>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除列" placement="bottom">
            <span class="icon-btn">
              <i class="iconfont">&#xe6d1;</i>
            </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="冻结行" placement="bottom">
            <span class="icon-btn">
              <i class="iconfont">&#xe65d;</i>
            </span>
          </el-tooltip>
          <span class="iconfont icon">&#xe601;</span>
          <el-tooltip class="item" effect="dark" content="合并单元格" placement="bottom">
            <span class="icon-btn">
              <i class="iconfont">&#xe60e;</i>
            </span>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="拆分单元格" placement="bottom">
            <span class="icon-btn">
              <i class="iconfont">&#xe60d;</i>
            </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="求和" placement="bottom">
            <span class="icon-btn">
              <i class="iconfont">&#xe643;</i>
            </span>
          </el-tooltip>
        </div>
      </div>
      <div class="right-com-main">
        <div class="fx-control">
          <div class="fx-left">
            <i class="iconfont">&#xe74c;</i>
          </div>
          <input type="text" size="200" style="width:400px" ref="search_ipt">
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
  </aside>
</template>
<script>
document.onselectstart = function() { return false; }
import '../../assets/js/lib/handsontable.full.min.css'
export default {
  data() {
    return {
      currentIndex: 1,
      dataVal: [[1], [2], [3]],
      hot: Object,
      flagOfsel: false, // 用来判断是否是备选中的状态，如果是true，就是被选中的状态，所以就在当前行或列添加，如果是false，就默认在第一行添加行或列
      hotSeeting: {
        colHeaders: true,
        rowHeaders: true,//行表头
        startRows: 30,
        startCols: 15,
        search: true,
        fixedRowsBottom: 2,
        autoWrapRow: true, //自动换行
        contextMenu: true,
        fillHandle: false
      },
      zonghe: 0,
      arr: [],
      doms: "", // 用来保存保存高亮的dom。
      // 用来保存，用户选中的行，来实现插入行和删除行，合并行等等
      clos: 0, // 列
      rows: 0, // 行
      rows1: 0,
      cols2: 0
    }
  },
  mounted() {
    // 初始化表格
    this.InitHot(document.querySelector('#example'), this.hotSeeting);

    // 搜索事件
    this._GlobalSearch();


    // this.hot.loadData(this.dataVal);  重载本地数据

    // this._changeSetting(); // 修改配置



    // this._Statistics();  // 统计所有行数列数

    // this.download(); // 导出文件为CSV

    // this._loadData();

    // this._calAdd();

    // 如果重新加载的话提示用户先保存
    window.onbeforeunload = function() {
      return null;
    };
  },
  methods: {
    addClass(doms) {
      for (var i = 0; i < doms.length; i++) {
        doms[i].classList.add('important');
        doms[i].style.background = 'red !important';
        // background: linear-gradient(180deg, rgba(181, 209, 255, .34) 0, rgba(181, 209, 255, .34));
      };
      console.log(doms);
    },
    removeClass() { },

    // 打开提示，常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。
    openNotice(type, text) {
      if (type === 'alert') {//普通提示
        this.$message(text);
      } else if (type === 'success') {// 成功的提示
        this.$message({
          message: text,
          type: 'success'
        })
      } else if (type === 'warning') {// 提出警告
        this.$message({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      } else {  // error  错误提示
        this.$message.error(text);
      }
    },

    // 插入行
    _insertRows() {
      let _this = this;
      _this.hot.selectCell(_this.rows, _this.clos, _this.rows1, _this.cols2);
      if (_this.insert_row) _this.hot.alter('insert_row', _this.rows);
      else _this.hot.alter('insert_row', 0); _this.insert_row = false;
    },

    // 插入列
    _insertCols() {
      let _this = this;
      _this.hot.selectCell(_this.rows, _this.clos, _this.rows1, _this.cols2);
      if (_this.insert_row) { _this.hot.alter('insert_col', _this.clos); }
      else { _this.hot.alter('insert_col', 0); _this.insert_row = false; }
    },

    // 删除行  ht.alter('remove_col'); 
    _deleteClos() {
      let _this = this;
      if (_this.insert_row) { _this.hot.alter('remove_col', _this.clos); }
      else { _this.hot.alter('remove_col', 0); _this.insert_row = false; }
    },

    // 删除列  ht.alter('remove_row'); 
    _deleteRows() {
      let _this = this;
      if (_this.insert_row) { _this.hot.alter('remove_row', _this.clos); }
      else { _this.hot.alter('remove_row', 0); _this.insert_row = false; }
    },
    // 清空列表
    clear() {
      this.hot.getNowFormatDate();
    },
    // 下载
    download() {
      let _this = this;
      Handsontable.dom.addEvent(document.querySelector('#download'), 'click', function() {
        let exportPlugin = _this.hot.getPlugin('exportFile');
        exportPlugin.downloadFile('csv', {
          filename: Math.random().toString(20).substr(2),
          rowHeaders: false,
          columnHeaders: true,
        });
      })
    },
    InitHot(dom, seeting) {
      let _this = this,
        defSettging = {
          colHeaders: true,// 列表头
          rowHeaders: true,//行表头
          stretchH: 'all', // 是否
          startRows: 15,
          startCols: 26,
          minCols: 26,
          minRows: 20,
          manualColumnFreeze: true,
          autoColumnSize: true,
          fixedRowsBottom: 1,
          search: true,// 启用搜索
          autoWrapRow: true, //自动换行
          copyPaste: true,
          customBorders: true,
          contextMenu: {
            items: {
              "row_above": {
                name: "在上面插入行"
              },
              "row_below": {
                name: "在下面插入行"
              },
              "col_left": {
                name: "在左侧插入列"
              },
              "col_right": {
                name: "在右侧插入列"
              },
              "hsep1": "---------",
              "clear_column": {
                name: "清空所选列"
              },
              "remove_row": {
                name: "删除行"
              },
              "remove_col": {
                name: "删除列"
              },
              "undo": {
                name: "撤销"
              },
              "redo": {
                name: "恢复"
              },
              "make_read_only": {
                name: "只读"
              },
              "hsep2": "---------",
              "alignment": {
                name: "对齐方式"
              },
              "mergeCells": {
                name: "合并单元格"
              },
              "borders": {
                name: "边框样式"
              },
              "copy": {
                name: "复制"
              },
              "cut": {
                name: "剪切"
              },
              "hsep3": "---------",
              "freeze_column": {
                name: "冻结该列"
              },
              "unfreeze_column": {
                name: "解除冻结"
              }
            }
          },
          manualColumnResize: true,
          manualRowResize: true,
          columnSorting: true, //排序，通过方法更改
          mergeCells: true, // 合并单元格
          afterSelectionEnd(r, c, r1, c2) { //选中表格鼠标抬时触发 r行，c列 console.log(`${r}行+${c}列`);
            _this.doms = '';
            _this.flagOfsel = true;
            _this.rows = r;
            _this.clos = c;
            _this.rows1 = r1;
            _this.cols2 = c2;

            let big = _this.hot.getValue(r, c, r1, c2);// 获取到一个格子的值
            let one = _this.hot.getData(r, c, r1, c2);
            _this.doms = document.querySelectorAll('.highlight');
            console.log(_this.doms);
            // console.log(one);
            let arr = [];
            for (let i = 0; i < one.length; i++) {
              for (let j = 0; j < one[i].length; j++) {
                console.log('这是数字' + !isNaN(one[i][j]));
                arr.push(one[i][j]);
              }
            }
            console.log('被选中的值' + arr);//选中结束后拿到所有被选中的值
            _this.arr = arr;
            // console.log(o);
            // console.log(two);
            // console.log(f);
            // console.log(t);
            // let hun = _this.hot.getSelected(o, two, t, f);
            // console.log(hun);
          },
          // 发生更改自定保存数据
          afterChange(change, source) {// 完成文字的输入就会触发该函数
            if (source == 'loadData') return //第一次加载也会触发需要判断
            else {
              let two = _this.hot.getData();
              // _this.dataVal = two;// 如果发生改变就保存
            }
          }
        }
      this.hot = new Handsontable(dom, defSettging);
      // seeting == Object ? this.hot = new Handsontable(dom, seeting) : this.hot = new Handsontable(dom, defSettging)
    },

    // 获取到表中所有的值，执行保存操作的时候获取
    _saveData() {
      let one = this.hot.getData();
      console.log(one);
      // 拿到数据后并且保存到后端
    },

    // 全局搜索高亮
    _GlobalSearch() {
      let _this = this,
        doms = this.$refs.search_ipt;
      Handsontable.dom.addEvent(doms, 'keyup', function(event) {
        console.log('搜索事件启用');
        let queryResult = _this.hot.search.query(this.value);
        _this.hot.render();
      });
    },
    // 统计所有的行数列数
    _Statistics() {
      let _this = this;
      // console.log(_this.hot.countCols());
      // console.log(_this.hot.countRows());
      _this.hot.countCols();// 行数
      _this.hot.countRows(); // 列数
    },
    _loadData() {
      let _this = this;
      Handsontable.dom.addEvent(_this.$refs.btn111, 'click', function(event) {
        console.log('loadDataing...');
        _this.hot.loadData(_this.dataVal);
        console.log('loadDataed...');
      })
    },
    // 求和操作
    _calAdd() {
      let _this = this;
      Handsontable.dom.addEvent(document.querySelector('#add'), 'click', function(event) {
        console.log(_this.hot.getSettings()); //获取对象的配置信息
        console.log("总过选中了" + _this.doms.length + '个数字');
        let arr = _this.arr,
          one;
        for (let i = 0; i < arr.length; i++) {
          if (!isNaN(arr[i]) === false) {
            _this.openNotice('error', '无法对非数字进行计算！');
            return;
          }
        }
        console.log(arr);

        for (let i = 0; i < arr.length; i++) {

        }


        // for ( k in this.arr){
        //     console.log(k);
        // }
        // _this.doms.forEach((item, index) => {
        //   item.classList.add('highlight');
        //   item.classList.add('current');
        //   item.classList.add('area');
        // })
        // _this.zonghe = eval(_this.arr.join("+"));
        // // console.log(_this.zonghe);
      })
    }
  }
}
</script>
<style scoped>
#main {
  height: calc(100vh - 60px);
  margin: 60px auto;
  position: relative;
}

.left-com {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 20%;
}

.left-com-top {
  box-sizing: border-box;
  width: 100%;
  height: 47px;
  padding: 0 20px;
  line-height: 47px;
  font-size: 14px;
  color: #000000;
  background-color: #FAFDFF;
  border-bottom: 2px solid #C8C9CC;
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
  color: #4BB8FF;
  cursor: pointer;
}

.left-com-bottom {
  height: calc(100vh - 47px);
  width: 100%;
  background-color: #FAFDFF;
}

.right-com {
  position: fixed;
  top: 60px;
  right: 0;
  bottom: 0;
  width: 80%;
}

.right-com-top {
  width: 100%;
  height: 98px;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #DDD;
  box-sizing: border-box;
}

.right-com-top-tab {
  height: 47px;
  padding: 2px 0;
  line-height: 47px;
  box-sizing: border-box;
  background-color: #F9F9F9;
  border-bottom: 2px solid #C8C9CC;
}

.right-tab {
  width: calc(100% - 250px);
  height: 41px;
  display: inline-block;
  box-sizing: border-box;
  border-right: 1px solid #E1E1E1;
}

.right-tab .data-button {
  display: inline-block;
  line-height: 46px;
  cursor: pointer;
  font-size: 14px;
  padding-left: 22px;
  color: #4F4F4F;
}

.right-tab .data-button:hover {
  color: #20ACF1;
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
  color: #445463;
  cursor: pointer;
  margin-left: 20px;
}

.right-com-top-ctl {
  box-sizing: border-box;
  height: 51px;
  line-height: 51px;
  padding: 0 10px;
  color: #7B7676;
  background-color: #FFFFFF;
}

.right-com-top-ctl .icon {
  margin-left: 10px;
}

.right-com-top-ctl .icon-btn {
  color: #7B7676;
  cursor: pointer;
  margin-left: 20px;
}

.right-com-main {
  height: calc(100% - 146px);
  border-top: 1px solid #DDD;
  box-sizing: border-box;
}

.right-com-main .fx-control {
  position: relative;
  border-bottom: 1px solid #D4D4D4;
  height: 26px;
  border-left: 1px solid #ccc;
  background: #FAFAFA;
  color: #737373;
}

.right-com-main .main-table {
  height: calc(100% - 26px);
  overflow: hidden;
}

.fx-control .fx-left {
  position: absolute;
  width: 33px;
  height: 21px;
  left: 0;
  top: 2px;
  border-right: 1px solid #C7C8C9;
  cursor: pointer;
  text-align: center;
  line-height: 21px;
}

.fx-control .fx-left .iconfont {
  font-size: 18px;
}

.fx-control input {
  width: 100%!important;
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
  height: 48px;
  line-height: 48px;
  box-sizing: border-box;
  background-color: #F9F9F9;
  padding-left: 20px;
  border-left: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 14px;
}

.right-com-bottom span {
  padding-right: 10px;
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
</style>

