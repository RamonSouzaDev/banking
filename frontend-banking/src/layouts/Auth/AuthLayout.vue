<template>
  <!-- loader Start -->
  <div>
    <div id="loading">
      <div id="loading-center"></div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import 'vue3-toastify/dist/index.css'

export default {
  mounted() {
    core.index()
  }
}
</script>
<style>
@import url('@/assets/css/custom.css');
@import url('@/assets/css/bootstrap.min.css');
@import url('@/assets/css/style.css');
@import url('@/assets/css/typography.css');
@import url('@/assets/css/responsive.css');
@import url('@/assets/css/slick.css');
</style>
