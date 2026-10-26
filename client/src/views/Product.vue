<template>
  <section class="section">
    <div v-if="error" class="container"><p>{{ error }}</p><RouterLink to="/shop" class="btn btn-outline">Back to Shop</RouterLink></div>
    <div v-else-if="product" class="container detail">
      <div class="img">
        <img :src="product.image" :alt="product.name" />
      </div>
      <div>
        <RouterLink to="/shop" class="back">← Back to shop</RouterLink>
        <h1>{{ product.name }}</h1>
        <div class="price">
          {{ rupees(size.price) }}
          <s v-if="size.mrp > size.price">{{ rupees(size.mrp) }}</s>
          <span v-if="off > 0" class="chip chip-accent">{{ off }}% off</span>
        </div>
        <p class="lead">{{ product.description }}</p>

        <div class="size-pick">
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
        <div class="buy">
          <div class="qty">
            <button @click="qty > 1 && qty--" aria-label="Decrease">−</button>
            <span>{{ qty }}</span>
            <button @click="qty++" aria-label="Increase">+</button>
          </div>
          <button class="btn btn-primary" @click="cart.add(product, size, qty)">Add to Cart</button>
          <button class="btn btn-accent" @click="buyNow">Buy Now</button>
        </div>
        <p class="ship">🚚 Free shipping on orders over ₹999 · Dispatched within 24 hours</p>
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

const route = useRoute();
const router = useRouter();
const cart = useCart();
const product = ref(null);
const error = ref('');
const qty = ref(1);
const sizeIndex = ref(0);

const size = computed(() => product.value.sizes[sizeIndex.value]);
const off = computed(() => discount(size.value));

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
.back {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--forest);
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
.ship {
  margin-top: 1.5rem;
  font-size: 13px;
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
