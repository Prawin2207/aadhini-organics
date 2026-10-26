<template>
  <article class="card product">
    <RouterLink :to="`/product/${product.id}`" class="img-wrap">
      <img :src="product.image" :alt="product.name" loading="lazy" />
      <span v-if="product.bestseller" class="chip chip-accent tag">Bestseller</span>
      <span v-if="off > 0" class="chip off">{{ off }}% off</span>
    </RouterLink>
    <div class="body">
      <RouterLink :to="`/product/${product.id}`"><h3>{{ product.name }}</h3></RouterLink>
      <div class="sizes" role="radiogroup" :aria-label="`Size for ${product.name}`">
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
      <div class="row">
        <div class="price">
          {{ rupees(size.price) }}
          <s v-if="size.mrp > size.price">{{ rupees(size.mrp) }}</s>
        </div>
        <button class="btn btn-primary btn-sm" @click="cart.add(product, size)">Add to Cart</button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCart } from '../stores/cart.js';
import { rupees } from '../api.js';
import { defaultSizeIndex, discount } from '../sizes.js';

const props = defineProps({ product: { type: Object, required: true } });
const cart = useCart();
const sizeIndex = ref(defaultSizeIndex(props.product));
const size = computed(() => props.product.sizes[sizeIndex.value]);
const off = computed(() => discount(size.value));
</script>

<style scoped>
.product {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.img-wrap {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: var(--cream-2);
}
.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 25%;
  transition: transform 0.5s ease;
}
.product:hover .img-wrap img {
  transform: scale(1.05);
}
.tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #fff3e6;
}
.off {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--forest);
  color: var(--cream);
}
.body {
  padding: 1.1rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}
h3 {
  margin: 0 0 10px;
  font-size: 19px;
  line-height: 26px;
}
.sizes {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
}
.sizes button {
  padding: 4px 12px;
  border-radius: 9999px;
  border: 1px solid var(--bone);
  background: var(--white);
  font: 600 12px/20px var(--sans);
  color: var(--earth);
  cursor: pointer;
  transition: all 0.2s;
}
.sizes button:hover {
  border-color: var(--forest);
}
.sizes button.active {
  background: var(--forest);
  border-color: var(--forest);
  color: var(--cream);
}
.row {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.price {
  font-weight: 700;
  font-size: 18px;
  color: var(--forest);
}
.price s {
  font-weight: 400;
  font-size: 13px;
  color: rgba(74, 62, 61, 0.55);
  margin-left: 4px;
}
</style>
