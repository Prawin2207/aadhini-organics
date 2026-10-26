<template>
  <section class="page-hero">
    <div class="container">
      <span class="eyebrow">Natural Oils</span>
      <h1>Shop <em>Aadhini</em></h1>
      <p class="lead">Herbal hair oils and pure coconut oil, made in small batches.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="toolbar">
        <div v-if="categories.length > 1" class="filters">
          <button :class="{ active: !category }" @click="setCategory('')">All</button>
          <button v-for="c in categories" :key="c.slug" :class="{ active: category === c.slug }" @click="setCategory(c.slug)">
            {{ c.name }}
          </button>
        </div>
        <input v-model="q" class="input search" type="search" placeholder="Search products…" />
      </div>

      <p v-if="loading">Loading products…</p>
      <p v-else-if="!products.length">No products match your search.</p>
      <div v-else class="grid-3">
        <ProductCard v-for="p in products" :key="p.id" :product="p" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import { api } from '../api.js';

const route = useRoute();
const router = useRouter();
const categories = ref([]);
const products = ref([]);
const loading = ref(true);
const category = ref(route.query.category || '');
const q = ref(route.query.q || '');

async function load() {
  loading.value = true;
  const params = {};
  if (category.value) params.category = category.value;
  if (q.value) params.q = q.value;
  products.value = await api.products(params);
  loading.value = false;
}

function setCategory(slug) {
  router.replace({ query: slug ? { category: slug } : {} });
}

watch(() => route.query.category, (c) => {
  category.value = c || '';
  load();
});

// Footer links pass ?q= to pre-fill the search
watch(() => route.query.q, (v) => (q.value = v || ''));

let t;
watch(q, () => {
  clearTimeout(t);
  t = setTimeout(load, 250);
});

onMounted(async () => {
  categories.value = await api.categories();
  load();
});
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.filters button {
  padding: 8px 18px;
  border-radius: 9999px;
  border: 1px solid var(--bone);
  background: var(--white);
  font: 600 13px/20px var(--sans);
  color: var(--earth);
  cursor: pointer;
  transition: all 0.2s;
}
.filters button:hover {
  border-color: var(--forest);
}
.filters button.active {
  background: var(--forest);
  border-color: var(--forest);
  color: var(--cream);
}
.search {
  max-width: 280px;
}
@media (max-width: 767px) {
  .search {
    max-width: none;
  }
}
</style>
