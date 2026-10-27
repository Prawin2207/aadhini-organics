<template>
  <section class="page-hero">
    <div class="container">
      <h1>Your <em>Cart</em></h1>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div v-if="order" class="card done">
        <h2>🌿 Thank you{{ order.name ? `, ${order.name}` : '' }}!</h2>
        <p class="lead">Your order <strong>{{ order.orderId }}</strong> for {{ rupees(order.total) }} has been placed.</p>
        <p>Opening WhatsApp to send your order to us. If it didn't open, tap the button below.</p>
        <div class="done-actions">
          <a :href="order.whatsapp" class="btn btn-accent" target="_blank" rel="noopener">Send Order on WhatsApp</a>
          <RouterLink to="/shop" class="btn btn-outline">Continue Shopping</RouterLink>
        </div>
      </div>

      <div v-else-if="!cart.items.length" class="empty">
        <p class="lead">Your cart is empty.</p>
        <RouterLink to="/shop" class="btn btn-primary">Browse Products</RouterLink>
      </div>

      <div v-else class="layout">
        <div class="lines">
          <div v-for="i in cart.items" :key="i.key" class="card line">
            <img :src="i.image" :alt="i.name" />
            <div class="info">
              <RouterLink :to="`/product/${i.id}`"><h3>{{ i.name }}</h3></RouterLink>
              <small>{{ i.size }} · {{ rupees(i.price) }}</small>
            </div>
            <div class="qty">
              <button @click="cart.setQty(i.key, i.qty - 1)" aria-label="Decrease">−</button>
              <span>{{ i.qty }}</span>
              <button @click="cart.setQty(i.key, i.qty + 1)" aria-label="Increase">+</button>
            </div>
            <strong class="amt">{{ rupees(i.qty * i.price) }}</strong>
            <button class="remove" @click="cart.remove(i.key)" aria-label="Remove">✕</button>
          </div>
        </div>

        <aside class="card summary">
          <h3>Order Summary</h3>
          <div class="row"><span>Subtotal</span><span>{{ rupees(cart.subtotal) }}</span></div>
          <div class="row"><span>Shipping</span><span>{{ cart.shipping ? rupees(cart.shipping) : 'Free' }}</span></div>
          <p v-if="cart.shipping" class="hint">Add {{ rupees(999 - cart.subtotal) }} more for free shipping</p>
          <div class="row total"><span>Total</span><span>{{ rupees(cart.total) }}</span></div>

          <form @submit.prevent="checkout">
            <button class="btn btn-whatsapp btn-block" :disabled="loading">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z" />
              </svg>
              {{ loading ? 'Opening WhatsApp…' : 'Send Cart to WhatsApp' }}
            </button>
            <p class="opt-note">Optional — add your details so we can confirm faster:</p>
            <div class="field"><input v-model="customer.name" class="input" placeholder="Full name (optional)" /></div>
            <div class="field"><input v-model="customer.phone" class="input" placeholder="Phone number (optional)" /></div>
            <div class="field"><textarea v-model="customer.address" class="input addr" placeholder="Delivery address (optional)"></textarea></div>
            <p v-if="error" class="msg-err">{{ error }}</p>
          </form>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useCart } from '../stores/cart.js';
import { api, rupees } from '../api.js';

const cart = useCart();
const customer = reactive({ name: '', phone: '', address: '' });
const loading = ref(false);
const error = ref('');
const order = ref(null);

const WHATSAPP_NUMBER = '919342737514';

function whatsappMessage(orderId) {
  const lines = cart.items.map((i) => `• ${i.name} (${i.size}) × ${i.qty} = ${rupees(i.price * i.qty)}`);
  return [
    `Hello Aadhini Organics, I'd like to place an order.`,
    ``,
    `Order ID: ${orderId}`,
    ...lines,
    ``,
    `Subtotal: ${rupees(cart.subtotal)}`,
    `Shipping: ${cart.shipping ? rupees(cart.shipping) : 'Free'}`,
    `Total: ${rupees(cart.total)} (Cash on Delivery)`,
    ...(customer.name || customer.phone || customer.address ? [''] : []),
    ...(customer.name ? [`Name: ${customer.name}`] : []),
    ...(customer.phone ? [`Phone: ${customer.phone}`] : []),
    ...(customer.address ? [`Address: ${customer.address}`] : [])
  ].join('\n');
}

async function checkout() {
  loading.value = true;
  error.value = '';
  try {
    const res = await api.order({
      customer: { ...customer },
      items: cart.items.map(({ id, size, qty }) => ({ id, size, qty }))
    });
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage(res.orderId))}`;
    order.value = { ...res, name: customer.name, whatsapp: url };
    cart.clear();
    window.location.href = url;
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 2rem;
  align-items: start;
}
.lines {
  display: grid;
  gap: 1rem;
}
.line {
  display: grid;
  grid-template-columns: 80px 1fr auto auto auto;
  gap: 1.25rem;
  align-items: center;
  padding: 1rem;
}
.line:hover {
  transform: none;
}
.line img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: var(--r);
}
.line h3 {
  font-size: 18px;
  margin: 0 0 4px;
}
.qty {
  display: flex;
  align-items: center;
  border: 1px solid var(--bone);
  border-radius: var(--r);
}
.qty button {
  width: 34px;
  height: 36px;
  border: 0;
  background: none;
  cursor: pointer;
  font-size: 18px;
  color: var(--forest);
}
.qty span {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
}
.amt {
  color: var(--forest);
  min-width: 70px;
  text-align: right;
}
.remove {
  border: 0;
  background: none;
  cursor: pointer;
  color: var(--terracotta);
  font-size: 16px;
}
.summary {
  padding: 1.75rem;
  position: sticky;
  top: 96px;
}
.summary:hover {
  transform: none;
}
.row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
}
.total {
  border-top: 1px solid var(--bone);
  margin: 0.75rem 0 1.5rem;
  padding-top: 1rem;
  font-weight: 700;
  font-size: 18px;
  color: var(--forest);
}
.hint {
  font-size: 13px;
  color: var(--terracotta);
  margin: 4px 0 0;
}
.addr {
  min-height: 90px;
}
.empty,
.done {
  text-align: center;
  padding: 3rem 1.5rem;
}
.done:hover {
  transform: none;
}
.btn-whatsapp {
  background: #25d366;
  color: #fff;
  margin-bottom: 1rem;
}
.btn-whatsapp:hover {
  background: #1ebe5b;
}
.opt-note {
  font-size: 13px;
  color: rgba(74, 62, 61, 0.75);
  margin: 0 0 0.75rem;
}
.done-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
@media (max-width: 1023px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 600px) {
  .line {
    grid-template-columns: 64px 1fr auto;
  }
  .line img {
    width: 64px;
    height: 64px;
  }
  .amt {
    grid-column: 2;
    text-align: left;
  }
}
</style>
