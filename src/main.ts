import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './style.css';

// Import pages
import Home from '@/pages/Home.vue';
import ShoppingMall from '@/pages/ShoppingMall.vue';
import CountryShop from '@/pages/CountryShop.vue';
import Cart from '@/pages/Cart.vue';
import ShanghaiAirFreight from '@/pages/shippings/ShanghaiAirFreight.vue';
import ShenzhenAirFreight from '@/pages/shippings/ShenzhenAirFreight.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/shopping', name: 'ShoppingMall', component: ShoppingMall },
  { path: '/shop/:country', name: 'CountryShop', component: CountryShop, props: true },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/shanghai', name: 'ShanghaiAirFreight', component: ShanghaiAirFreight},
  { path: '/shenzhen', name: 'ShenzhenAirFreight', component: ShenzhenAirFreight},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
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