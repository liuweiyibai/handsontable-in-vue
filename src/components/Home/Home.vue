<template>
  <div class="home">
      <Mheader></Mheader>
      <router-view></router-view>
  </div>
</template>
<script>
import Mheader from "@/components/baseComponent/Mheader"
export default {
   components: {
    Mheader
  }
}
</script>

