<template>
  <header class="header" :class="{ scrolled }">
    <div class="container bar">
      <RouterLink to="/" class="logo" @click="open = false">
        <span class="leaf">🌿</span>
        <span>Aadhini <em>Organics</em></span>
      </RouterLink>

      <nav class="nav" :class="{ open }">
        <RouterLink v-for="l in links" :key="l.to" :to="l.to" @click="open = false">{{ l.label }}</RouterLink>
      </nav>

      <div class="actions">
        <RouterLink to="/cart" class="cart" aria-label="Cart">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M6 7h12l-1 13H7L6 7Z" />
            <path d="M9 7a3 3 0 0 1 6 0" />
          </svg>
          <span v-if="cart.count" class="badge">{{ cart.count }}</span>
        </RouterLink>
        <button class="burger" aria-label="Menu" @click="open = !open">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useCart } from '../stores/cart.js';

const cart = useCart();
const open = ref(false);
const scrolled = ref(false);
const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Contact' }
];

const onScroll = () => (scrolled.value = window.scrollY > 10);
onMounted(() => window.addEventListener('scroll', onScroll));
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(250, 247, 242, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.header.scrolled {
  border-color: var(--bone);
  box-shadow: var(--shadow-1);
}
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font: 600 24px/1 var(--serif);
  color: var(--forest);
}
.logo em {
  color: var(--turmeric);
}
.nav {
  display: flex;
  gap: 2.25rem;
}
.nav a {
  font-weight: 500;
  position: relative;
  padding: 4px 0;
}
.nav a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 2px;
  background: var(--turmeric);
  transition: width 0.25s;
}
.nav a:hover::after,
.nav a.router-link-exact-active::after {
  width: 100%;
}
.nav a.router-link-exact-active {
  color: var(--forest);
}
.actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.cart {
  position: relative;
  color: var(--forest);
  display: flex;
}
.badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background: var(--turmeric);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: 9999px;
  display: grid;
  place-items: center;
  padding: 0 4px;
}
.burger {
  display: none;
  background: none;
  border: 0;
  cursor: pointer;
  padding: 6px;
}
.burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--forest);
  margin: 4px 0;
}
@media (max-width: 767px) {
  .burger {
    display: block;
  }
  .nav {
    position: absolute;
    top: 76px;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: var(--cream);
    border-bottom: 1px solid var(--bone);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s;
  }
  .nav.open {
    max-height: 300px;
  }
  .nav a {
    padding: 14px var(--margin);
    border-top: 1px solid var(--bone);
  }
  .nav a::after {
    display: none;
  }
}
</style>
