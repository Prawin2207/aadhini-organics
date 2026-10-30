<template>
  <section class="section product-section">
    <div v-if="error" class="container"><p>{{ error }}</p><RouterLink to="/shop" class="btn btn-outline">Back to Shop</RouterLink></div>
    <div v-else-if="product" class="container nav-bar">
      <button type="button" class="back-btn" @click="goBack">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
        Back
      </button>
      <nav aria-label="Breadcrumb">
        <ol class="crumbs">
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/shop">Shop</RouterLink></li>
          <li v-if="categoryName"><RouterLink :to="`/shop?category=${product.category}`">{{ categoryName }}</RouterLink></li>
          <li aria-current="page">{{ product.name }}</li>
        </ol>
      </nav>
    </div>
    <div v-if="!error && product" class="container detail">
      <div class="img" :class="{ square: product.category === 'soaps' }">
        <img :src="product.image" :alt="product.name" />
      </div>
      <div>
        <h1>{{ product.name }}</h1>
        <p v-if="product.tagline" class="tagline">{{ product.tagline }}</p>
        <div class="price">
          {{ rupees(size.price) }}
          <s v-if="size.mrp > size.price">{{ rupees(size.mrp) }}</s>
          <span v-if="off > 0" class="chip chip-accent">{{ off }}% off</span>
        </div>
        <p class="lead">{{ product.description }}</p>

        <div v-if="product.sizes.length > 1" class="size-pick">
          <span class="label">Select size</span>
          <div class="sizes" role="radiogroup" aria-label="Size">
            <button
              v-for="(s, i) in product.sizes"
              :key="s.label"
              type="button"
              role="radio"
              :aria-checked="i === sizeIndex"
              :class="{ active: i === sizeIndex }"
              @click="sizeIndex = i"
            >
              <strong>{{ s.label }}</strong>
              <small>{{ rupees(s.price) }}</small>
            </button>
          </div>
        </div>

        <div class="chips">
          <span class="chip">100% Natural</span>
          <span class="chip">No Added Chemicals</span>
          <span class="chip">No Preservatives</span>
        </div>

        <div v-if="lowStock" class="stock">
          <p><span class="dot" aria-hidden="true"></span><span>Only <strong>{{ product.stock }}</strong> left in this batch — order soon</span></p>
          <div class="meter" aria-hidden="true"><span :style="{ width: (product.stock / LOW_STOCK) * 100 + '%' }"></span></div>
        </div>

        <div class="buy">
          <div class="qty">
            <button @click="qty > 1 && qty--" aria-label="Decrease">−</button>
            <span>{{ qty }}</span>
            <button @click="qty < maxQty && qty++" aria-label="Increase">+</button>
          </div>
          <button class="btn btn-primary" @click="cart.add(product, size, qty)">Add to Cart</button>
          <button class="btn btn-accent" @click="buyNow">Buy Now</button>
        </div>

        <p v-if="offerActive" class="offer">
          <em>{{ offer.title }}</em> — {{ offer.text }}. Ends in {{ parts.d }}d {{ parts.h }}h {{ parts.m }}m.
        </p>

        <ul class="assure">
          <li>Free delivery above ₹1500</li>
          <li>Cash on Delivery</li>
          <li>Order easily on WhatsApp</li>
          <li>Dispatched within 24 hours</li>
        </ul>
      </div>
    </div>
  </section>

  <section v-if="product && (product.ingredients || product.benefits || product.howToUse)" class="section details">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">The Aadhini Organics</span>
        <h2>Know your <em>{{ product.name }}</em></h2>
      </div>
      <div class="panels">
        <div v-if="product.ingredients" class="panel">
          <span class="num">01</span>
          <h3>Key Ingredients</h3>
          <p>{{ product.ingredients }}</p>
        </div>
        <div v-if="product.benefits" class="panel">
          <span class="num">02</span>
          <h3>Benefits</h3>
          <ul class="ticks">
            <li v-for="b in product.benefits" :key="b">{{ b }}</li>
          </ul>
        </div>
        <div v-if="product.howToUse" class="panel">
          <span class="num">03</span>
          <h3>How to Use</h3>
          <ol class="steps">
            <li v-for="s in product.howToUse" :key="s">{{ s }}</li>
          </ol>
        </div>
      </div>
      <div v-if="product.closing" class="closing">
        <span>{{ product.closing.title }}</span>
        <p>{{ product.closing.text }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCart } from '../stores/cart.js';
import { api, rupees } from '../api.js';
import { defaultSizeIndex, discount } from '../sizes.js';
import { LOW_STOCK, offer } from '../promo.js';
import { useCountdown } from '../useCountdown.js';

const route = useRoute();
const router = useRouter();
const cart = useCart();
const product = ref(null);
const error = ref('');
const qty = ref(1);
const sizeIndex = ref(0);

const size = computed(() => product.value.sizes[sizeIndex.value]);
const off = computed(() => discount(size.value));
const lowStock = computed(() => product.value.stock > 0 && product.value.stock <= LOW_STOCK);
const maxQty = computed(() => (product.value.stock > 0 ? product.value.stock : 99));
const { active: offerActive, parts } = useCountdown(offer.endsAt);

watch(
  () => route.params.id,
  async (id) => {
    if (!id) return;
    error.value = '';
    qty.value = 1;
    try {
      product.value = await api.product(id);
      sizeIndex.value = defaultSizeIndex(product.value);
    } catch (e) {
      error.value = e.message;
    }
  },
  { immediate: true }
);

const CATEGORY_NAMES = { oils: 'Hair Oils', soaps: 'Herbal Soaps' };
const categoryName = computed(() => CATEGORY_NAMES[product.value.category]);

// Go back to wherever the visitor came from; open the shop if they landed here directly
function goBack() {
  if (window.history.state && window.history.state.back) router.back();
  else router.push('/shop');
}

function buyNow() {
  cart.add(product.value, size.value, qty.value);
  router.push('/cart');
}
</script>

<style scoped>
.detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}
.img {
  max-width: 460px;
  width: 100%;
  margin: 0 auto;
}
.img img {
  border-radius: var(--r-xl);
  aspect-ratio: 2 / 3;
  object-fit: cover;
  width: 100%;
  box-shadow: var(--shadow-2);
}
.product-section {
  padding-top: 1.75rem;
}
.nav-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 7px 14px 7px 10px;
  border: 1px solid var(--bone);
  border-radius: 9999px;
  background: var(--white);
  font: 600 13px/1 var(--sans);
  color: var(--forest);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
.back-btn:hover {
  border-color: var(--forest);
  background: var(--cream-2);
}
.crumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 13px;
}
.crumbs li + li::before {
  content: '/';
  margin: 0 8px;
  color: var(--bone);
}
.crumbs a {
  color: rgba(74, 62, 61, 0.75);
  transition: color 0.2s;
}
.crumbs a:hover {
  color: var(--turmeric);
}
.crumbs [aria-current] {
  color: var(--forest);
  font-weight: 600;
}
.img.square img {
  aspect-ratio: 1 / 1;
}
h1 {
  font-size: 44px;
  line-height: 52px;
}
.price {
  display: flex;
  align-items: center;
  gap: 10px;
  font: 700 26px/1 var(--sans);
  color: var(--forest);
  margin-bottom: 1.5rem;
}
.price s {
  font-size: 16px;
  font-weight: 400;
  color: rgba(74, 62, 61, 0.55);
}
.size-pick {
  margin-bottom: 1.5rem;
}
.label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--terracotta);
  margin-bottom: 8px;
}
.sizes {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.sizes button {
  min-width: 96px;
  padding: 10px 16px;
  border-radius: var(--r);
  border: 1.5px solid var(--bone);
  background: var(--white);
  color: var(--earth);
  font-family: var(--sans);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  transition: all 0.2s;
}
.sizes button strong {
  font-size: 15px;
}
.sizes button small {
  font-size: 12px;
  opacity: 0.8;
}
.sizes button:hover {
  border-color: var(--forest);
}
.sizes button.active {
  background: var(--forest);
  border-color: var(--forest);
  color: var(--cream);
}
.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.buy {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
.qty {
  display: flex;
  align-items: center;
  border: 1px solid var(--bone);
  border-radius: var(--r);
  background: var(--white);
}
.qty button {
  width: 44px;
  height: 48px;
  border: 0;
  background: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--forest);
}
.qty span {
  min-width: 28px;
  text-align: center;
  font-weight: 600;
}
.stock {
  max-width: 420px;
  margin-bottom: 1.5rem;
}
.stock p {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 8px;
  font: italic 500 16px/1.3 var(--serif);
  color: #a4501a;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--turmeric);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(217, 130, 43, 0.6);
  }
  70%,
  100% {
    box-shadow: 0 0 0 8px rgba(217, 130, 43, 0);
  }
}
.meter {
  height: 4px;
  border-radius: 4px;
  background: var(--bone);
  overflow: hidden;
}
.meter span {
  display: block;
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--turmeric), #a4501a);
}
.offer {
  margin: 1.5rem 0 0;
  padding: 12px 16px;
  border-left: 2px solid var(--turmeric);
  background: rgba(217, 130, 43, 0.07);
  font-size: 14px;
}
.offer em {
  font: italic 600 16px var(--serif);
  color: var(--forest);
}
.assure {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 22px;
  list-style: none;
  padding: 1.25rem 0 0;
  margin: 1.5rem 0 0;
  border-top: 1px solid var(--bone);
  font-size: 13px;
  letter-spacing: 0.02em;
}
.assure li::before {
  content: '✓';
  margin-right: 6px;
  color: var(--turmeric);
  font-weight: 700;
}
.tagline {
  margin: -0.25rem 0 1rem;
  font: italic 500 20px/1.4 var(--serif);
  color: var(--turmeric);
}

/* Ingredients / Benefits / How to use */
.details {
  background: var(--cream-2);
  border-top: 1px solid var(--bone);
}
.panels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.panel {
  position: relative;
  padding: 2rem 1.75rem;
  background: var(--white);
  border: 1px solid var(--bone);
  border-top: 2px solid var(--turmeric);
  border-radius: var(--r);
}
.num {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  font: italic 600 28px/1 var(--serif);
  color: rgba(217, 130, 43, 0.3);
}
.panel h3 {
  margin-bottom: 1rem;
}
.panel p {
  margin: 0;
}
.ticks,
.steps {
  margin: 0;
  padding: 0;
  list-style: none;
}
.ticks li,
.steps li {
  position: relative;
  padding: 0 0 0.75rem 1.9rem;
}
.ticks li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--turmeric);
  font-weight: 700;
}
.steps {
  counter-reset: step;
}
.steps li::before {
  counter-increment: step;
  content: counter(step);
  position: absolute;
  left: 0;
  top: 1px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--forest);
  color: var(--cream);
  font: 700 11px/20px var(--sans);
  text-align: center;
}
.closing {
  margin-top: 3rem;
  text-align: center;
}
.closing span {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--forest);
}
.closing p {
  margin: 6px 0 0;
  font: italic 500 26px/1.3 var(--serif);
  color: var(--turmeric);
}
@media (max-width: 1023px) {
  .panels {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dot {
    animation: none;
  }
}
@media (max-width: 1023px) {
  .detail {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  h1 {
    font-size: 34px;
    line-height: 42px;
  }
}
</style>
