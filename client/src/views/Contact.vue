<template>
  <section class="page-hero">
    <div class="container">
      <span class="eyebrow">Get in Touch</span>
      <h1>We'd love to <em>hear</em> from you</h1>
      <p class="lead">Questions about our products, bulk orders or farm visits — write to us.</p>
    </div>
  </section>

  <section class="section">
    <div class="container contact">
      <div class="info">
        <div class="card box">
          <h3>📍 Visit</h3>
          <p>Aadhini Organics<br />Coimbatore, Tamil Nadu 641001</p>
        </div>
        <div class="card box">
          <h3>📞 Call / WhatsApp</h3>
          <p>+91 98765 43210<br />Mon–Sat, 9am – 7pm</p>
        </div>
        <div class="card box">
          <h3>✉️ Email</h3>
          <p>hello@aadhiniorganics.in</p>
        </div>
      </div>

      <form class="card form" @submit.prevent="submit">
        <h2>Send a message</h2>
        <div class="field">
          <label for="name">Name</label>
          <input id="name" v-model="form.name" class="input" required />
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="form.email" class="input" type="email" required />
        </div>
        <div class="field">
          <label for="message">Message</label>
          <textarea id="message" v-model="form.message" class="input" required></textarea>
        </div>
        <button class="btn btn-primary" :disabled="loading">{{ loading ? 'Sending…' : 'Send Message' }}</button>
        <p v-if="msg" :class="ok ? 'msg-ok' : 'msg-err'" class="note">{{ msg }}</p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { api } from '../api.js';

const form = reactive({ name: '', email: '', message: '' });
const msg = ref('');
const ok = ref(false);
const loading = ref(false);

async function submit() {
  loading.value = true;
  try {
    msg.value = (await api.contact({ ...form })).message;
    ok.value = true;
    Object.assign(form, { name: '', email: '', message: '' });
  } catch (e) {
    msg.value = e.message;
    ok.value = false;
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.contact {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2.5rem;
  align-items: start;
}
.info {
  display: grid;
  gap: 1rem;
}
.box {
  padding: 1.5rem;
}
.box p {
  margin: 0;
}
.form {
  padding: 2.5rem;
}
.form:hover {
  transform: none;
}
.note {
  margin-top: 1rem;
}
@media (max-width: 1023px) {
  .contact {
    grid-template-columns: 1fr;
  }
  .form {
    padding: 1.5rem;
  }
}
</style>
