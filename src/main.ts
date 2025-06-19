import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './style.css';

// Import pages
import Home from '@/pages/Home.vue';
import ShoppingMall from '@/pages/ShoppingMall.vue';
import CountryShop from '@/pages/CountryShop.vue';
import Cart from '@/pages/Cart.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/shopping', name: 'ShoppingMall', component: ShoppingMall },
  { path: '/shop/:country', name: 'CountryShop', component: CountryShop, props: true },
  { path: '/cart', name: 'Cart', component: Cart }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

const app = createApp(App);
app.use(router);
app.mount('#app');