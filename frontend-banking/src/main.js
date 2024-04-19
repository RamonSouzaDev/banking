import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { core } from '@/config/pluginInit'
import Vue3Toastify from 'vue3-toastify'
import { createPinia } from 'pinia'
import { useMenuStore } from './store/menuStore'; 

import '@/assets/js/jquery.min.js'
import '@/assets/js/bootstrap.min.js'
import '@/assets/css/bootstrap.min.css'
import '@/assets/css/style.css'
import '@/assets/css/responsive.css'
import '@/assets/css/animate.css'
import '@/assets/css/variable.css'
import '@/assets/css/spacer.css'
import '@/assets/css/EcommerceResponsive.css'
import '@/assets/css/slick.css'
import '@/assets/css/slick-theme.css'
import '@/assets/css/Chart.min.css'
import '@/assets/css/magnific-popup.css'
import '@/assets/css/select2.min.css'
import '@/assets/css/custom.css'
import '@/assets/js/apexcharts.js'
import '@/assets/js/smooth-scrollbar.js'

const app = createApp(App)
const pinia = createPinia()


import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})


app.use(pinia)
app.use(vuetify)
app.use(Vue3Toastify, {
  autoClose: 3000
})
app.use(router, axios, core)

const menuStore = useMenuStore();
menuStore.toggleMenu(); 

app.mount('#app')

axios.defaults.baseURL = 'http://localhost:8000/'

