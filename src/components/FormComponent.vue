<template>
  <div id="FormComponent" class="container-app">
    <div id="j-FormCompent">
      <div class="left-wrapper" style="overflow:auto">
        <div class="left-wrapper-top">
          <div class="table-name">
            <span style="float:left">test</span>
            <router-link to="upload-data" style="float:right;margin-right:3px;color:#7DE0EF;font-size:10px;">新建数据表</router-link>
          </div>
          <div class="title-bar">
            <span class="text">维度</span>
            <span class="title-bar-input" v-show="!search_show">
              <input type="text" placeholder="请输入关键字">
            </span>
            <span class="title-bar-search">
              <i class="el-icon-search"></i>
            </span>
          </div>
          <div class="tree-ul">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </div>
        </div>

        <div class="left-wrapper-bottom">
          <div class="title-bar">
            <span class="text">度量</span>
            <span class="title-bar-input" v-show="!search_show">
              <input type="text" placeholder="请输入关键字">
            </span>
            <span class="title-bar-search">
              <i class="el-icon-search"></i>
            </span>
          </div>
          <div class="tree-ul">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </div>
        </div>
      </div>
      <div class="right-wrapper" style="overflow-x:hidden;overflow-y:scroll;">
        <div class="right-wrapper-control">
          <div class="top">
            <div class="fl" @click="tabChange(1)" :class="{'active':currentIndex===1}">开始</div>
            <div class="fl" @click="tabChange(2)" :class="{'active':currentIndex===2}">文本</div>
            <div class="fl" @click="tabChange(3)" :class="{'active':currentIndex===3}">表格</div>
            <div class="name">文件名</div>
          </div>
          <div class="bottom">
            <div class="bottom1" v-show="currentIndex===1">
              <button ref="btn111">点击载入数据</button>
              <button id="download">下载</button>
              <button id="add">求和</button>
              <input type="text" id="search_ipt">
              <button id="changeSetting">修改配置</button>
            </div>
            <div v-show="currentIndex===2">文本</div>
            <div v-show="currentIndex===3">表格</div>
          </div>
        </div>
        <div class="right-wrapper-table">
          <div class="fx-control">
            <div class="fx-left"></div>
            <input type="text" size="200" style="width:400px">
          </div>
          <div id="example" style="height:calc(87vh - 26px);width:100%;overflow:hidden;margin-bottom:-2px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '../assets/js/lib/handsontable.full.min.css'
export default {
  data() {
    return {
      currentIndex: 1,
      dataVal: [[1], [2], [3]],
      hot: Object,
      hotSeeting: {
        colHeaders: true,
        rowHeaders: true,//行表头
        startRows: 30,
        startCols: 30,
        search: true,
        fixedRowsBottom: 2,
        autoWrapRow: true, //自动换行
        contextMenu: true,
        fillHandle: false
      },
      search_show: true,
      zonghe: 0,
      arr: [],
      doms: "",
      this_cell: null,
      data: [{
        label: '地理位置',
        children: [{
          id: 9,
          label: '省市'
        }, {
          id: 10,
          label: "城市"
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    // let container = document.querySelector('.left-wrapper');

    // Ps.initialize(container);

    // 发送请求获取数据，并且转换为数组放入这个容器中.

    this.InitHot(document.querySelector('#example'), this.hotSeeting); // 初始化

    // this.hot.loadData(this.dataVal);  重载本地数据

    this._changeSetting(); // 修改配置

    this._search();  // 搜索按钮事件

    this._Statistics();  // 统计所有行数列数

    this.download(); // 导出文件为CSV

    this._loadData();

    this._calAdd();

    // 如果重新加载的话提示用户先保存
    window.onbeforeunload = function() {
      return '信息还未'
    }
  },
  methods: {
    openNotice() {
      this.$message('这是一条消息提示');
    },
    //tab切换方法
    tabChange(index) {
      this.currentIndex = index;
    },
    // 清空列表
    clear() {
      this.hot.getNowFormatDate();
    },
    // 下载方法
    download() {
      let _this = this;
      console.log(_this.hot);
      Handsontable.dom.addEvent(document.querySelector('#download'), 'click', function() {
        let exportPlugin = _this.hot.getPlugin('exportFile');
        exportPlugin.downloadFile('csv', {
          filename: Math.random().toString(20).substr(2),
          rowHeaders: false,
          columnHeaders: true,
        });
      })
    },
    _changeSetting() {
      let _this = this;
      let changeSetting = document.getElementById('changeSetting');
      Handsontable.dom.addEvent(changeSetting, 'click', function() {
        let defSettging = {
          colHeaders: true,// 列表头
          rowHeaders: true,//行表头
          stretchH: 'all', // 是否
          startRows: 30,
          startCols: 30,
          minCols: 30,
          minRows: 30,
          manualColumnFreeze: true,
          autoColumnSize: true,
          fixedRowsBottom: 2,
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
          afterSelectionEnd(o, two, t, f) { //选中表格鼠标抬时触发
            let big = _this.hot.getValue(o, two, t, f);// 获取到一个格子的值
            let one = _this.hot.getData(o, two, t, f);
            _this.doms = document.querySelectorAll('.highlight');
            // console.log(_this.doms);
            // console.log(one);
            let arr = [];
            for (let i = 0; i < one.length; i++) {
              for (let j = 0; j < one[i].length; j++) {
                arr.push(one[i][j]);
              }
            }
            console.log(arr);//选中结束后拿到所有被选中的值
            _this.arr = arr;
            // console.log(o);
            // console.log(two);
            // console.log(f);
            // console.log(t);
            let hun = _this.hot.getSelected(o, two, t, f);
            // console.log(hun);
          },
          // 保存数据
          afterChange(change, source) {// 完成文字的输入就会触发该函数
            if (source == 'loadData') return //第一次加载也会触发需要判断
            else {
              let two = _this.hot.getData();
              _this.dataVal = two;// 如果发生改变就保存
            }
          },

        }
        console.log('更新设置中');
        _this.hot.updateSettings(defSettging);
      })
    },
    InitHot(dom, seeting) {
      let _this = this;
      let defSettging = {
        colHeaders: true,// 列表头
        rowHeaders: true,//行表头
        stretchH: 'all', // 是否
        startRows: 30,
        startCols: 30,
        minCols: 30,
        minRows: 30,
        manualColumnFreeze: true,
        autoColumnSize: true,
        fixedRowsBottom: 2,
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
        afterSelectionEnd(o, two, t, f) { //选中表格鼠标抬时触发
          let big = _this.hot.getValue(o, two, t, f);// 获取到一个格子的值
          let one = _this.hot.getData(o, two, t, f);
          _this.doms = document.querySelectorAll('.highlight');
          // console.log(_this.doms);
          // console.log(one);
          let arr = [];
          for (let i = 0; i < one.length; i++) {
            for (let j = 0; j < one[i].length; j++) {
              if (typeof one[i][j] === 'string') {
                _this.openNotice();
              }
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
          let hun = _this.hot.getSelected(o, two, t, f);
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
    getVal() {
      let one = this.hot.getData();
      // console.log(one);
    },
    // 全局搜索高亮
    _search() {
      let _this = this;
      Handsontable.dom.addEvent(document.querySelector('#search_ipt'), 'keyup', function(event) {
        console.log('搜索事件启用');
        let queryResult = _this.hot.search.query(this.value);
        console.log(queryResult);
        console.log(_this.hot);
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
    },
    handleNodeClick() {
      console.log('我是elementUi中tree的事件')
    }
  }
}
</script>


<style scoped>
div {
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 5px;
  height: 16px;
  background-color: #F5F5F5;
}










/*定义滚动条轨道 内阴影+圆角*/

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}













/*定义滑块 内阴影+圆角*/

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #C5C5C5;
}

#j-FormCompent {
  width: 100%;
}

.left-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 50px;
  width: 200px;
  height: 100vh;
  background-color: rgba(255, 255, 255, .9);
}

.left-wrapper .left-wrapper-top {
  display: inline;
}

.left-wrapper-top .table-name {
  padding: 0 0 0 5px;
  height: 30px;
  min-height: 30px;
  line-height: 30px;
  color: #666;
  font-size: 14px;
}

.title-bar {
  position: relative;
  height: 30px;
  min-height: 30px;
  line-height: 26px;
  background: rgba(0, 0, 0, .1);
  padding: 0 5px 0 10px;
}

.title-bar .text {
  display: inline;
  line-height: inherit;
  font-weight: 700;
  font-size: 12px;
}

.title-bar .title-bar-input {
  display: inline-block;
  width: calc(100% - 60px);
}

.title-bar .title-bar-search {
  position: absolute;
  right: 5px;
  top: 2px;
}

.title-bar .title-bar-input input {
  height: 20px;
  min-height: 20px;
  line-height: 20px;
  border: none;
  padding: 0 3px;
  width: 100%;
  border-radius: 2px;
  font-size: 12px;
}

.tree-ul {
  padding: 10px 10px 10px 17px;
}

.tree-ul .el-tree {
  cursor: default;
  background: #fff;
  border: none !important;
}

.right-wrapper {
  position: fixed;
  right: 0;
  width: calc(100% - 250px);
  height: 100%;
  bottom: 0;
}





.right-wrapper-control {
  min-height: 80px;
  height: 13vh;
  min-height: 80px;
  width: 100%;
}

.right-wrapper-control .top {
  height: 30px;
  min-height: 30px;
  background: #F9F9F9;
  font-size: 12px;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #DDD;
  padding-left: 30px;
  margin: 0;
}

.right-wrapper-control .top div.fl {
  width: 50px;
  height: inherit;
  text-align: center;
  display: inline-block;
  line-height: 30px;
  font-size: 14px;
  color: #333;
  border: none;
  border-radius: 0;
  padding: 0;
  cursor: pointer;
}

div.active {
  background: #FFF;
  color: #333;
  margin-bottom: -1px !important;
}

.right-wrapper-control .top div.name {
  display: inline-block;
  line-height: 30px;
  margin-left: 30%;
}

.right-wrapper-control .bottom {
  height: 50px;
  border-bottom: 1px solid #DDD;
  border-left: 1px solid #ccc;
  overflow: visible;
}

.right-wrapper-table {
  width: 100%;
  height: 87vh;
}


.right-wrapper-table .fx-control {
  position: relative;
  border-bottom: 1px solid #D4D4D4;
  height: 26px;
  border-left: 1px solid #ccc;
  background: #FAFAFA;
  color: #737373;
}

.right-wrapper-table .fx-control .fx-left {
  position: absolute;
  width: 33px;
  height: 21px;
  left: 0;
  top: 2px;
  border-right: 1px solid #C7C8C9;
  cursor: pointer;
}

.right-wrapper-table .fx-control input {
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
