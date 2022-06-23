import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import PokeModal from '@/components/PokeModal.vue'
import PokeTabs from '@/components/PokeTabs.vue'
import Pokemon from '@/components/Pokemon.vue'
import 'vue3-carousel/dist/carousel.css';

import '@/assets/css/main.css'

const app = createApp(App)
app
    .component('Carousel', Carousel)
    .component('Navigation', Navigation)
    .component('Slide', Slide)
    .component('PokeModal', PokeModal)
    .component('PokeTabs', PokeTabs)
    .component('Pokemon', Pokemon)
app.use(router)
app.config.globalProperties.$http = axios
app.mount('#app')
