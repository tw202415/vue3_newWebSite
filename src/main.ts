import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './style.css';

// Import pages
import Home from '@/pages/Home.vue';
import ShoppingMall from '@/pages/ShoppingMall.vue';
import CountryShop from '@/pages/CountryShop.vue';
import Cart from '@/pages/Cart.vue';
import ITT from '@/pages/services/ITT.vue';
import ShanghaiAirFreight from '@/pages/shippings/ShanghaiAirFreight.vue';
import ShenzhenAirFreight from '@/pages/shippings/ShenzhenAirFreight.vue';
import ShenzhenSeaExpress from '@/pages/shippings/ShenzhenSeaExpress.vue';
import Japan from '@/pages/shippings/Japan.vue';
import Korea from '@/pages/shippings/Korea.vue';
import JapanEmsAir from '@/pages/shippings/JapanEmsAir.vue';
import JapanEmsSea from '@/pages/shippings/JapanEmsSea.vue';
import LA from '@/pages/shippings/LA.vue';
import Portland from '@/pages/shippings/Portland.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/shopping', name: 'ShoppingMall', component: ShoppingMall },
  { path: '/shop/:country', name: 'CountryShop', component: CountryShop, props: true },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/itt', name: 'ITT', component: ITT },
  { path: '/shanghaiAirFreight', name: 'ShanghaiAirFreight', component: ShanghaiAirFreight},
  { path: '/shenzhenAirFreight', name: 'ShenzhenAirFreight', component: ShenzhenAirFreight},
  { path: '/shenzhenSeaExpress', name: 'ShenzhenSeaExpress', component: ShenzhenSeaExpress},
  { path: '/japan', name: 'Japan', component: Japan},
  { path: '/korea', name: 'Korea', component: Korea},
  { path: '/japanEmsAir', name: 'JapanEmsAir', component: JapanEmsAir},
  { path: '/japanEmsSea', name: 'JapanEmsSea', component: JapanEmsSea},
  { path: '/la', name: 'LA', component: LA},
  { path: '/portland', name: 'Portland', component: Portland},
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