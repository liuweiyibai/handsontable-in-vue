<template>
  <aside id="instrumentList" class="instruemnt">
    <div class="container-map">
      <div class="slider-map">
        <div class="sidebar">
          <ul class="ulOne unstyled">
            <li style="height:30px; line-height:30px;padding-left:10px;position:relative">数据图 
              <router-link :to="{path:'/Form',query:{PID: MathRound}}" style="display:inline;position:absolute;right: 10px;top: 2px;">
               <el-tooltip class="item" effect="dark" content="返回上一级" placement="top">
                <i class="iconfont" style="font-size:18px;">&#xe60c;</i>
                </el-tooltip>
              </router-link>
            </li>
          </ul>
          <ul class="ul1-map widget unstyled">
            <li @click="setOptionA()">
              <a href="javascript:void(0)">
                <i class="iconfont icon-xianxingtu "></i>
                折线图
              </a>
            </li>
            <li @click="setOptionB()">
              <a href="javascript:void(0)">
              <i class="iconfont icon-zhuzhuangtu " ></i>
              柱状图 
              </a>
            </li>
            <li @click="setOptionC()">
              <a href="javascript:void(0)">
                <i class="iconfont icon-cloud-pie_chart"></i>
                 线性图
              </a>
            </li>
               <li @click="setOptionD">
              <a href="javascript:void(0)" >
                 <i class="iconfont icon-04qipaotu"></i>
                阶梯线
              </a>
            </li> 
               <li @click="setoptionE()">
              <a href="javascript:void(0)">
                <i class="iconfont icon-mianjitu"></i>
                面积图
              </a>
            </li>
          </ul>
          <ul class="ul2-map widget unstyled">
            <li>
              <a href="javascript:void(0)" class="disabled">
                <i class="iconfont icon-sandiantu"></i>
                散点图
              </a>
            </li>

            <li>
              <a href="javascript:void(0)" class="disabled">
                <i class="iconfont icon-shuzhuangtu"></i>
                树状图
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" class="disabled">
                <i class="iconfont icon-ditu"></i>
               地图
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" class="disabled">
                <i class="iconfont icon-bingtuhuanzhuang"></i>
                圆环图
              </a>
            </li>
          </ul>
          <ul class="ul3-map widget unstyled">
            <li>
              <a href="javascript:void(0)" class="disabled">
                 <i class="iconfont icon-pctubiaobanyuanquan151515151515161616"></i>
                圈图
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" class="disabled">
                <i class="iconfont icon-leidatu"></i>
                雷达图
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="module">
        <div class="module-head">
          <h3>数据统计图</h3>
        </div>
        <div class="module-body">
          <div class="chart">
            <div id="map-map">
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
<script>
import { randomString } from "./../../assets/js/common/common";
export default {
  data() {
    return {
      MathRound: randomString(32),
      mapDOM: Object,
      mapCore: null,
      // 横坐标
      mapX: [],
      // 纵坐标
      mapY: [],
      tableHeaders: [],
      Toolpit: [],

      optionA: {
        title: {
          text: "风机数据"
        },
        legend: {
          data: []
        },
        tooltip: {},
        grid: {
          left: "3%",
          right: "6%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: [],
          axisLabel: {
            interval: 0,
            formatter: function(value, index) {
              // if (index % 5 === 0) {
              //   return value;
              // } else {
              //   return "";
              // }
              return value;
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}"
          }
        },
        series: []
      },

      optionB: {
        title: {
          text: "风机数据"
        },
        legend: {
          data: [],
          align: "left"
        },
        tooltip: {},
        xAxis: {
          data: [],
          silent: false,
          splitLine: {
            show: false
          }
        },
        yAxis: {},
        series: []
      },

      optionC: {
        title: {
          text: "风机数据"
        },
        tooltip: {},
        angleAxis: {
          type: "category",
          data: []
        },
        polar: {},
        radiusAxis: {},
        series: [],
        legend: {
          show: true,
          data: []
        }
      },

      optionD: {
        title: {
          text: "风机数据"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: []
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: [],
          axisLabel: {
            interval: 0,
            formatter: function(value, index) {
              if (index % 5 === 0) {
                return value;
              } else {
                return "";
              }
              return value;
            }
          }
        },
        yAxis: {
          type: "value"
        },
        series: []
      },

      optionE: {
        title: {
          text: "风机数据"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: []
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            data: [],
            axisLabel: {
              interval: 0,
              formatter: function(value, index) {
                if (index % 5 === 0) {
                  return value;
                } else {
                  return "";
                }
                return value;
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: []
      }
    };
  },
  mounted() {
    this.mapDOM = this.echarts.init(document.getElementById("map-map"));
    this.loadData();
  },
  methods: {
    // 第一次加载数据
    loadData() {
      // 获取所有的表头
      // 取到x轴数据
      let mapCore = (this.mapCore = JSON.parse(localStorage.getItem("MAPOBJ")));
      this.mapX = mapCore.x;
      this.mapY = mapCore.y;
      this.mapX.forEach((item, index) => {
        this.Toolpit.push(item);
      });
      this.$nextTick(() => {
        this.setOptionA();
      });
    },
    // 折线图
    setOptionA() {
      this.mapDOM.clear();
      let NewArr = [],
        arrX = this.mapX,
        arrY = this.mapY;
      for (let i = 0, len = arrY.length; i < len; i++) {
        NewArr.push({
          name: this.Toolpit[i],
          type: "line",
          data: arrY[i]
        });
      }
      this.optionA.legend.data = this.Toolpit;
      this.optionA.series = NewArr;
      this.optionA.xAxis.data = arrX;
      this.mapDOM.setOption(this.optionA, true);
    },
    // 柱状图
    setOptionB() {
      this.mapDOM.clear();
      let NewArr = [],
        arrX = this.mapX,
        arrY = this.mapY;
      for (let i = 0, len = arrY.length; i < len; i++) {
        NewArr.push({
          name: this.Toolpit[i],
          type: "bar",
          data: arrY[i]
        });
      }
      this.optionB.legend.data = this.Toolpit;
      this.optionB.series = NewArr;
      this.optionB.xAxis.data = arrX;
      this.mapDOM.setOption(this.optionB, true);
    },
    // 线形图
    setOptionC() {
      this.mapDOM.clear();
      let NewArr = [],
        arrX = this.mapX,
        arrY = this.mapY;
      for (let i = 0, len = arrY.length; i < len; i++) {
        // this.Toolpit
        NewArr.push({
          type: "bar",
          data: arrY[i],
          coordinateSystem: "polar",
          name: this.Toolpit[i],
          stack: "a"
        });
      }
      this.optionB.legend.data = this.Toolpit;
      this.optionC.series = NewArr;
      this.optionC.angleAxis.data = arrX.slice(0, 50);
      this.mapDOM.setOption(this.optionC, true);
    },
    // 阶梯线
    setOptionD() {
      this.mapDOM.clear();
      let NewArr = [],
        arrX = this.mapX,
        arrY = this.mapY;
      for (let i = 0, len = arrY.length; i < len; i++) {
        // this.Toolpit
        NewArr.push({
          name: this.Toolpit[i],
          type: "line",
          step: "start",
          data: arrY[i]
        });
      }
      this.optionD.legend.data = this.Toolpit;
      this.optionD.series = NewArr;
      this.optionD.xAxis.data = arrX;
      this.mapDOM.setOption(this.optionD, true);
    },
    setoptionE() {
      this.mapDOM.clear();
      let NewArr = [],
        arrX = this.mapX,
        arrY = this.mapY;
      for (let i = 0, len = arrY.length; i < len; i++) {
        // this.Toolpit
        NewArr.push({
          name: this.Toolpit[i],
          type: "line",
          stack: "总量",
          areaStyle: { normal: {} },
          data: arrY[i]
        });
      }
      this.optionE.legend.data = this.Toolpit;
      this.optionE.series = NewArr;
      this.optionE.xAxis.data = arrX;
      this.mapDOM.setOption(this.optionE, true);
    },
    __ARR(s, e, arr) {
      let newArr = [];
      for (let i = s, len = arr.length; i < e; i++) {
        newArr.push(arr[i]);
      }
      return newArr;
    },
    __time(len) {
      let arrTime = [];
      let that = this;
      let time = new Date();
      let mytime = time.toLocaleTimeString(); //获取当前时间
      arrTime.splice(0, arrTime.length);
      for (let i = 0; i < len; i++) {
        mytime -= 50000;
        arrTime.push(that._TT(mytime));
      }
      return arrTime;
    },
    _TT(t) {
      let time = new Date(t);
      let y = time.getFullYear(); //年
      let m = time.getMonth() + 1; //月
      let d = time.getDate(); //日
      let h = time.getHours(); //时
      let mm = time.getMinutes(); //分
      let s = time.getSeconds(); //秒
      return `${h}:${mm}:${s}`;
    }
  }
};
</script>
<style>
a.disabled {
  pointer-events: none;
  cursor: default;
  color: #767676 !important;
}
.instruemnt {
  height: calc(100vh - 60px);
  width: 100%;
  background-color: #ccc;
  overflow: hidden;
  background: url("../../assets/img/bg-icon.png") #eee;
  border-bottom: 1px solid #bbb;
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 20px;
  /* padding-top: 10px; */
  padding-left: 20px;
  font-size: 14px;
}
.container-map {
  height: calc(100% - 30px);
  margin-right: auto;
  margin-left: auto;
}
.container-map li {
  line-height: 20px;
}
.container-map ul {
  margin: 0 0 10px 25px;
}
ul.unstyled,
ol.unstyled {
  margin-left: 0;
  list-style: none;
}
.slider-map {
  width: 200px;
  height: 100%;
  float: left;
}
.slider-map ul li a:focus {
  background: #35404d;
  color: #fff;
  display: block;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.widget {
  background: #fff;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  overflow: hidden;
}
.ulOne {
  background: #fff;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  overflow: hidden;
}
ul.ulOne > li > a {
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
ul.widget > li > a {
  background-color: #2d2b32;
  color: #fff;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.widget a {
  color: #555;
  display: block;
  line-height: 18px;
  padding: 10px;
  text-decoration: none !important;
}
.widget > li + li {
  border-top: 1px solid #555;
}

.module {
  float: left;
  box-sizing: border-box;
  margin-bottom: 20px;
  border-radius: 4px;
  position: relative;
  width: calc(100% - 220px);
  height: 97%;
  padding: 0px 20px 0 20px;
}
.module-head {
  color: #767676;
  background-color: #f6f6f6;
  border-color: #e9e9e9;
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.module-head h3 {
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  margin: 0;
  font-weight: 700;
}
.module-body {
  padding: 15px;
  height: calc(100% - 71px);
  background-color: #ffffff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  border-color: #e9e9e9;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.module-body .chart {
  width: 100%;
  height: 100%;
  padding: 10px;
}
#map-map {
  width: 100%;
  height: 100%;
}
</style>

