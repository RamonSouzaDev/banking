<template>
  <div>
    <Loader />
    <SideMenu></SideMenu>
    <router-view></router-view>

      <!-- Footer -->
      <footer class="iq-footer">
         <div class="container-fluid">
            <div class="row">
               <div class="col-lg-6">
               </div>
               <div class="col-lg-6 text-right">
                  Copyright {{new Date().getFullYear()}} <a href="https://www.banking.com.br/">banking</a> All Rights Reserved.
               </div>
            </div>
         </div>
      </footer>
  </div>
</template>

<script>
import Loader from '@/components/core/loader/Loader.vue'
import { core } from '@/config/pluginInit'
import router from '@/router'
import SideMenu from '@/components/sidemenu/SideMenu.vue'
import 'vue3-toastify/dist/index.css'

export default {
  components: {
    Loader,
    SideMenu
  },
  mounted() {
    if (localStorage.getItem('token') == undefined || localStorage.getItem('token') == '') {
      router.push('auth')
    }
    core.index()
  }
}
</script>
<style>
.btn .btn-primary{

  background-color: var(--iq-primary-shadow-1);
  border-color: var(--iq-primary-shadow-1);
}
</style>
