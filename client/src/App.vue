<template>
  <SiteHeader />
  <main>
    <RouterView />
  </main>
  <SiteFooter />
  <Transition name="toast">
    <div v-if="cart.toast" class="toast" role="status">✓ {{ cart.toast }}</div>
  </Transition>
</template>

<script setup>
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
import { useCart } from './stores/cart.js';

const cart = useCart();
</script>

<style>
main {
  min-height: 60vh;
}
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--forest);
  color: var(--cream);
  padding: 12px 20px;
  border-radius: var(--r);
  box-shadow: var(--shadow-3);
  font-weight: 600;
  z-index: 100;
}
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 12px);
}
</style>
