import Vue from 'vue';
import VueRouter from 'vue-router';
/* eslint-disable */
const Menu = () => import('@/views/Menu')
const Mine = () => import('@/views/Mine')
const Search = () => import('@/views/Search')
const Login = () => import('@/views/Login')
const Cart = () => import('@/views/Cart')
const Order = () => import('@/views/Order')
/* eslint-enable */
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Menu',
    component: Menu,
  },
  {
    path: '/Menu',
    name: 'Menu',
    component: Menu,
  },
  {
    path: '/mine',
    name: 'Mine',
    component: Mine,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/order/:id',
    name: 'Order',
    component: Order
  }
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
