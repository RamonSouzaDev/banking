<template>
  <!-- loader Start -->
  <div id="loading">
    <div id="loading-center"></div>
  </div>
  <!-- loader END -->
</template>
<script>
import { animation } from '@/config/pluginInit'
export default {
  name: 'Loader',
  props: {
    dark: { type: Boolean, default: false }
  },
  watch: {
    $route: function (to, from) {
      const load = document.getElementById('loading')
      animation.fadeIn(load, { duration: 5 })
      load.classList.remove('d-none')
    }
  },
  computed: {},
  mounted() {}
}
</script>
