import { createRouter, createWebHistory } from 'vue-router'

// Components
import Home from '@/views/Home.vue';
import PokemonSheet from '@/views/PokemonSheet.vue';

// Config de rutas
const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/pokemon/:id",
    name: "pokemon",
    component: PokemonSheet
  }
];

// Creo objeto rutas
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
