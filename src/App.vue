<template>
  <div id="app">
    <keep-alive>
        <router-view class="child-view"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Mheader from "@/components/baseComponent/Mheader";
export default {
  name: "app",
  components: {
    Mheader
  },
  // data() {
  //   return {
  //     transitionName: "slide-left"
  //   };
  // },
  // mounted() {},
  // //监听路由的路径，可以通过不同的路径去选择不同的切换效果
  // // watch: {
  // //   $route(to, from) {
  // //     if (to.path == "/") {
  // //       this.transitionName = "slide-right";
  // //     } else {
  // //       this.transitionName = "slide-left";
  // //     }
  // //   }
  // // }
};
</script>

<style>
body {
  height: 100%;
}
.child-view {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translateX(20px, 0);
  transform: translateX(20px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translateX(-20px, 0);
  transform: translateX(-20px, 0);
}
</style>
