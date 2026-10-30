<template>
  <article class="product">
    <RouterLink :to="`/product/${product.id}`" class="img-wrap">
      <span class="halo" aria-hidden="true"></span>
      <img :src="product.image" :alt="product.name" loading="lazy" />
      <span v-if="product.bestseller" class="tag">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
        </svg>
        Bestseller
      </span>
      <span v-if="off > 0" class="off">{{ off }}% off</span>
      <span class="view">View details <span aria-hidden="true">→</span></span>
    </RouterLink>

    <div class="body">
      <RouterLink :to="`/product/${product.id}`" class="name"><h3>{{ product.name }}</h3></RouterLink>

      <p v-if="product.sizes.length === 1" class="single">{{ size.label }}</p>
      <div
        v-else
        class="sizes"
        role="radiogroup"
        :aria-label="`Size for ${product.name}`"
        :style="{ '--count': product.sizes.length, '--i': sizeIndex }"
      >
        <span class="pill" aria-hidden="true"></span>
        <button
          v-for="(s, i) in product.sizes"
          :key="s.label"
          type="button"
          role="radio"
          :aria-checked="i === sizeIndex"
          :class="{ active: i === sizeIndex }"
          @click="sizeIndex = i"
        >
          {{ s.label }}
        </button>
      </div>

      <p v-if="lowStock" class="stock"><span class="dot" aria-hidden="true"></span>Only {{ product.stock }} left in this batch</p>

      <div class="row">
        <div class="price">
          <Transition name="flip" mode="out-in">
            <span :key="size.label">{{ rupees(size.price) }}</span>
          </Transition>
          <s v-if="size.mrp > size.price">{{ rupees(size.mrp) }}</s>
        </div>
        <button class="add" :class="{ added }" @click="addToCart">
          <svg v-if="!added" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 7h12l-1 13H7L6 7Z" /><path d="M9 7a3 3 0 0 1 6 0" />
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m5 12 5 5 9-10" />
          </svg>
          {{ added ? 'Added' : 'Add to Cart' }}
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCart } from '../stores/cart.js';
import { rupees } from '../api.js';
import { defaultSizeIndex, discount } from '../sizes.js';
import { LOW_STOCK } from '../promo.js';

const props = defineProps({ product: { type: Object, required: true } });
const cart = useCart();
const sizeIndex = ref(defaultSizeIndex(props.product));
const size = computed(() => props.product.sizes[sizeIndex.value]);
const off = computed(() => discount(size.value));
const lowStock = computed(() => props.product.stock > 0 && props.product.stock <= LOW_STOCK);

const added = ref(false);
let timer;
function addToCart() {
  cart.add(props.product, size.value);
  added.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => (added.value = false), 1400);
}
</script>

<style scoped>
.product {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 22px;
  overflow: hidden;
  background: var(--white);
  /* gradient hairline border */
  border: 1px solid transparent;
  background-image: linear-gradient(var(--white), var(--white)),
    linear-gradient(160deg, rgba(217, 130, 43, 0.45), rgba(27, 67, 50, 0.12) 40%, rgba(27, 67, 50, 0.3));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 1px 2px rgba(27, 67, 50, 0.06), 0 8px 24px -12px rgba(27, 67, 50, 0.18);
  transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.45s;
}
.product:hover {
  transform: translateY(-6px);
  box-shadow: 0 2px 4px rgba(27, 67, 50, 0.06), 0 28px 50px -20px rgba(27, 67, 50, 0.35);
}

/* Image */
.img-wrap {
  position: relative;
  display: block;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: var(--cream-2);
}
.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 25%;
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.product:hover .img-wrap img {
  transform: scale(1.06);
}
.halo {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(to top, rgba(18, 46, 34, 0.55), transparent 38%),
    radial-gradient(circle at 50% 110%, rgba(217, 130, 43, 0.25), transparent 55%);
  opacity: 0;
  transition: opacity 0.45s;
}
.product:hover .halo {
  opacity: 1;
}
.tag,
.off {
  position: absolute;
  top: 14px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 9999px;
  font: 700 11px/1 var(--sans);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.tag {
  left: 14px;
  color: #8a4b12;
  background: rgba(255, 243, 230, 0.85);
  border: 1px solid rgba(217, 130, 43, 0.35);
}
.tag svg {
  color: var(--turmeric);
}
.off {
  right: 14px;
  background: rgba(27, 67, 50, 0.85);
  color: var(--cream);
}
.view {
  position: absolute;
  left: 50%;
  bottom: 18px;
  z-index: 2;
  transform: translate(-50%, 12px);
  padding: 9px 18px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.92);
  color: var(--forest);
  font: 600 13px/1 var(--sans);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.35s, transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.product:hover .view {
  opacity: 1;
  transform: translate(-50%, 0);
}

/* Body */
.body {
  position: relative;
  padding: 1.25rem 1.35rem 1.4rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.body::before {
  /* leafy accent line */
  content: '';
  position: absolute;
  top: 0;
  left: 1.35rem;
  width: 36px;
  height: 3px;
  border-radius: 0 0 3px 3px;
  background: linear-gradient(90deg, var(--turmeric), var(--forest));
  transition: width 0.45s;
}
.product:hover .body::before {
  width: 72px;
}
h3 {
  margin: 0.25rem 0 14px;
  font-size: 21px;
  line-height: 28px;
  transition: color 0.25s;
}
.name:hover h3 {
  color: var(--turmeric);
}

.single {
  margin: 0 0 18px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(74, 62, 61, 0.7);
}

/* Segmented size selector with sliding pill */
.sizes {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--count), 1fr);
  width: max-content;
  min-width: 170px;
  padding: 4px;
  margin-bottom: 18px;
  border-radius: 9999px;
  background: var(--cream-2);
  border: 1px solid var(--bone);
}
.pill {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc((100% - 8px) / var(--count));
  transform: translateX(calc(100% * var(--i)));
  border-radius: 9999px;
  background: linear-gradient(135deg, var(--forest), #2d6a4f);
  box-shadow: 0 4px 12px -4px rgba(27, 67, 50, 0.5);
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.sizes button {
  position: relative;
  z-index: 1;
  padding: 7px 16px;
  border: 0;
  background: none;
  font: 600 13px/18px var(--sans);
  color: var(--earth);
  cursor: pointer;
  transition: color 0.3s;
}
.sizes button.active {
  color: var(--cream);
}

.stock {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: -4px 0 14px;
  font: italic 500 14px/1.3 var(--serif);
  color: #a4501a;
}
.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--turmeric);
  box-shadow: 0 0 0 0 rgba(217, 130, 43, 0.6);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  70% {
    box-shadow: 0 0 0 7px rgba(217, 130, 43, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(217, 130, 43, 0);
  }
}

/* Price + CTA */
.row {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px dashed var(--bone);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.price {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font: 700 22px/1 var(--sans);
  letter-spacing: -0.01em;
  font-variant-numeric: lining-nums tabular-nums;
  color: var(--forest);
}
.price s {
  font: 400 13px var(--sans);
  color: rgba(74, 62, 61, 0.55);
}
.flip-enter-active,
.flip-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.flip-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.flip-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.add {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--forest), #2d6a4f);
  color: var(--cream);
  font: 600 14px/1 var(--sans);
  cursor: pointer;
  box-shadow: 0 8px 18px -8px rgba(27, 67, 50, 0.6);
  transition: transform 0.2s, box-shadow 0.3s, background 0.3s;
}
.add::after {
  /* shine sweep */
  content: '';
  position: absolute;
  top: 0;
  left: -60%;
  width: 40%;
  height: 100%;
  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.35), transparent);
  transform: skewX(-20deg);
  transition: left 0.6s;
}
.add:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 22px -8px rgba(27, 67, 50, 0.7);
}
.add:hover::after {
  left: 120%;
}
.add:active {
  transform: scale(0.97);
}
.add.added {
  background: linear-gradient(135deg, var(--turmeric), #c06b1a);
}

@media (prefers-reduced-motion: reduce) {
  .product,
  .img-wrap img,
  .pill,
  .add,
  .add::after {
    transition: none;
  }
  .dot {
    animation: none;
  }
  .product:hover {
    transform: none;
  }
  .product:hover .img-wrap img {
    transform: none;
  }
}
</style>
