const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
// Bundled with the code so it also works inside a Netlify Function
const catalog = require('./data/products.json');

const app = express();
const DATA_DIR = path.join(__dirname, 'data');

app.use(cors());
app.use(express.json());

const readJson = (file, fallback = []) => {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
  } catch {
    return fallback;
  }
};

// Best effort: serverless hosts (Netlify) have a read-only filesystem
const appendJson = (file, entry) => {
  try {
    const list = readJson(file);
    list.push({ ...entry, createdAt: new Date().toISOString() });
    fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(list, null, 2));
  } catch (e) {
    console.log(`Could not save to ${file}:`, JSON.stringify(entry));
  }
};

const isEmail = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

app.get('/api/categories', (req, res) => {
  res.json([
    { slug: 'oils', name: 'Hair Oils' },
    { slug: 'soaps', name: 'Herbal Soaps' }
  ]);
});

app.get('/api/products', (req, res) => {
  const { category, bestseller, q } = req.query;
  let products = catalog;
  if (category) products = products.filter((p) => p.category === category);
  if (bestseller === 'true') products = products.filter((p) => p.bestseller);
  if (q) {
    const term = String(q).toLowerCase();
    products = products.filter((p) => p.name.toLowerCase().includes(term));
  }
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = catalog.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body || {};
  if (!isEmail(email)) return res.status(400).json({ error: 'Please enter a valid email.' });
  appendJson('subscribers.json', { email });
  res.json({ message: 'Thanks for subscribing!' });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !isEmail(email) || !message) {
    return res.status(400).json({ error: 'Name, valid email and message are required.' });
  }
  appendJson('messages.json', { name, email, message });
  res.json({ message: 'Thank you! We will get back to you soon.' });
});

app.post('/api/orders', (req, res) => {
  const { items, customer } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty.' });
  }
  // Customer details are optional: the order is completed over WhatsApp
  const lines = [];
  for (const { id, size, qty } of items) {
    const p = catalog.find((x) => x.id === Number(id));
    const s = p && p.sizes.find((x) => x.label === size);
    if (!s || !(qty > 0)) return res.status(400).json({ error: 'Invalid item in cart. Please refresh and try again.' });
    lines.push({ id: p.id, name: p.name, size: s.label, price: s.price, qty: Number(qty) });
  }
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const shipping = subtotal > 1500 ? 0 : 60; // free delivery above ₹1500
  const orderId = 'AO' + Date.now().toString().slice(-8);
  appendJson('orders.json', { orderId, customer: customer || {}, lines, subtotal, shipping, total: subtotal + shipping });
  res.json({ orderId, total: subtotal + shipping });
});

module.exports = app;
