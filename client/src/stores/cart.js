import { defineStore } from 'pinia';

const KEY = 'aadhini-cart-v3';

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

export const useCart = defineStore('cart', {
  state: () => ({ items: load(), toast: '' }),
  getters: {
    count: (s) => s.items.reduce((n, i) => n + i.qty, 0),
    subtotal: (s) => s.items.reduce((n, i) => n + i.qty * i.price, 0),
    shipping() {
      return this.subtotal === 0 || this.subtotal >= 999 ? 0 : 60;
    },
    total() {
      return this.subtotal + this.shipping;
    }
  },
  actions: {
    add(product, size, qty = 1) {
      const key = `${product.id}-${size.label}`;
      const line = this.items.find((i) => i.key === key);
      if (line) line.qty += qty;
      else {
        const { id, name, image } = product;
        this.items.push({ key, id, name, image, size: size.label, price: size.price, qty });
      }
      this.notify(`${product.name} (${size.label}) added to cart`);
      this.save();
    },
    setQty(key, qty) {
      const line = this.items.find((i) => i.key === key);
      if (!line) return;
      if (qty <= 0) this.remove(key);
      else line.qty = qty;
      this.save();
    },
    remove(key) {
      this.items = this.items.filter((i) => i.key !== key);
      this.save();
    },
    clear() {
      this.items = [];
      this.save();
    },
    notify(msg) {
      this.toast = msg;
      clearTimeout(this._t);
      this._t = setTimeout(() => (this.toast = ''), 2200);
    },
    save() {
      try {
        localStorage.setItem(KEY, JSON.stringify(this.items));
      } catch {}
    }
  }
});
