<template>
  <section class="news">
    <div class="container inner">
      <div>
        <span class="eyebrow">Harvest Letters</span>
        <h2>Get first word on <em>seasonal</em> pressings</h2>
        <p>Recipes, farm updates and early access to limited harvest batches. No spam, ever.</p>
      </div>
      <form @submit.prevent="submit">
        <input v-model="email" class="input" type="email" placeholder="Your email address" required />
        <button class="btn btn-accent" :disabled="loading">{{ loading ? 'Joining…' : 'Subscribe' }}</button>
        <p v-if="msg" :class="ok ? 'msg-ok' : 'msg-err'" class="note">{{ msg }}</p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { api } from '../api.js';

const email = ref('');
const msg = ref('');
const ok = ref(false);
const loading = ref(false);

async function submit() {
  loading.value = true;
  try {
    msg.value = (await api.subscribe(email.value)).message;
    ok.value = true;
    email.value = '';
  } catch (e) {
    msg.value = e.message;
    ok.value = false;
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.news {
  background: var(--forest);
  color: rgba(250, 247, 242, 0.85);
  padding: 5rem 0;
}
.inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: center;
}
h2 {
  color: var(--cream);
}
.eyebrow {
  color: var(--turmeric-soft);
}
form {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
form .input {
  flex: 1;
  min-width: 220px;
}
.note {
  width: 100%;
  margin: 0;
}
.msg-ok {
  color: var(--turmeric-soft);
}
.msg-err {
  color: #ffb4ab;
}
@media (max-width: 767px) {
  .inner {
    grid-template-columns: 1fr;
  }
}
</style>
