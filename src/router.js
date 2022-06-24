import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import PokemonDetail from '@/views/PokemonDetail.vue';

// Config routes
const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/pokemon/:id",
    name: "pokemon",
    component: PokemonDetail,
  }
];

// Create router object
const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/pokevue/' : '/'),
  routes
});

export default router;
