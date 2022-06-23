import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import '@/assets/css/main.css'

const app = createApp(App)
app
    .component('Carousel', Carousel)
    .component('Navigation', Navigation)
    .component('Slide', Slide)
app.use(router)
app.config.globalProperties.$http = axios
app.mount('#app')
