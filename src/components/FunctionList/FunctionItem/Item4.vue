<template>
  <router-view>
  </router-view>
</template>
<script>
export default {
  data() {
    return {
      dialogObj: {
        uploadDialog: false
      },
      divShowOrHide: [
        {
          divshow: true,
          bg1: true,
          bg2: false
        },
        {
          divshow: false,
          bg1: false,
          bg2: true
        }
      ],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    CHANGETAB(index) {
      for (let i = 0, len = this.divShowOrHide.length; i < len; i++) {
        this.divShowOrHide[i].divshow = false;
        this.divShowOrHide[i].bg1 = false;
        this.divShowOrHide[i].bg2 = true;
      }
      this.divShowOrHide[index].divshow = true;
      this.divShowOrHide[index].bg1 = true;
      this.divShowOrHide[index].bg2 = false;
    }
  }
}
</script>

<style>
@import url("base.css");
.item-detail-function .content-- .content-list ul li.w33 {
  width: 33.33%;
}

.div-common .box-title {
  margin-bottom: 20px;
}

.div-common .box-title h4 {
  position: relative;
  padding-left: 15px;
  border-bottom: 0;
  font-weight: 600;
}

.div-common .box-title h4:before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  width: 2px;
  height: 18px;
  background: #51d2b7;
  overflow: hidden;
}

#item1 .file-aside {
  min-width: 961px;
  text-align: center;
}

#item1 .file-aside .upload-demo,
#item1 .file-aside .upload-demo>div {
  width: 100%;
}

#item1 .file-aside .upload-demo div.el-upload-dragger {
  width: 100%;
}
</style>

