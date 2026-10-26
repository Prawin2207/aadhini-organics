# Aadhini Organics

Website for Aadhini Organics: herbal hair oils and pure coconut oil. The frontend is Vue 3 and the backend is a Node.js/Express API. Orders are sent to WhatsApp.

## Structure

```
client/   Vue 3 + Vite + Pinia + Vue Router (frontend)
server/   Express API (products, newsletter, contact, orders); JSON file storage in server/data
```

## Run

Requires Node.js 16 or newer.

```bash
npm run install:all   # install server and client packages
npm run build         # build the site into client/dist
npm start             # serve the site and API on http://localhost:5000
```

On Windows you can double-click `start-site.bat` after building.

For development with hot reload, run `npm run server` and `npm run client`, then open http://localhost:5173.

## Products and prices

Products, sizes and prices are in `server/data/products.json`. Product photos are in `client/public/images/products/`.

## Ordering

The cart's **Send Cart to WhatsApp** button saves the order and opens WhatsApp with the cart list pre-filled. The number is set in `WHATSAPP_NUMBER` in `client/src/views/Cart.vue`.

## API

| Method | Route | Purpose |
| ------ | ----- | ------- |
| GET | /api/products?category=&bestseller=&q= | List and filter products |
| GET | /api/products/:id | Get one product |
| GET | /api/categories | List categories |
| POST | /api/newsletter | `{ email }` |
| POST | /api/contact | `{ name, email, message }` |
| POST | /api/orders | `{ items: [{ id, size, qty }], customer?: { name, phone, address } }` |

Orders, messages and newsletter sign-ups are saved to `server/data/*.json`, which git ignores.
