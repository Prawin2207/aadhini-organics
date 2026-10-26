import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/shop', name: 'shop', component: () => import('./views/Shop.vue') },
    { path: '/product/:id', name: 'product', component: () => import('./views/Product.vue') },
    { path: '/about', name: 'about', component: () => import('./views/About.vue') },
    { path: '/contact', name: 'contact', component: () => import('./views/Contact.vue') },
    { path: '/cart', name: 'cart', component: () => import('./views/Cart.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior(to, from, saved) {
    return saved || { top: 0 };
  }
});
