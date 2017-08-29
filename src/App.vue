<template>
  <div id="app">
    <Mheader></Mheader>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Mheader from "@/components/baseComponent/Mheader"
export default {
  name: 'app',
  components: {
    Mheader
  }
}
</script>

<style>
body {
  height: 100%;
}
</style>
