# The Aadhini Organics

Website for The Aadhini Organics: herbal hair oils, pure coconut oil and herbal soaps. The frontend is Vue 3 and the backend is a Node.js/Express API. Customers check out by sending their cart to WhatsApp, and pay Cash on Delivery.

- **GitHub:** https://github.com/Prawin2207/aadhini-organics
- **Live (Netlify):** https://aadhini.netlify.app
- **Local:** http://localhost:5000 (after `npm run build` and `npm start`)
- **Chat history:** every request and reply from building the site is in [docs/CHAT_HISTORY.md](docs/CHAT_HISTORY.md)

---

## Products and prices

All products live in `server/data/products.json`. Photos are in `client/public/images/products/`.

### Hair oils (category `oils`)

| ID | Product | Sizes and prices | Stock shown | Photo |
| -- | ------- | ---------------- | ----------- | ----- |
| 1 | Herbal Hair Growth Oil | 100 ml ₹150 · 500 ml ₹600 | 8 (sample) | herbal-hair-growth-oil.jpg (green label) |
| 2 | Herbal Dandruff Care Oil | 100 ml ₹150 · 500 ml ₹600 | 6 (sample) | dandruff-care-oil.jpg (black bottle, "Natural Dandruff Control Hair Oil" label) |
| 3 | Pure Coconut Oil | 100 ml ₹150 · 500 ml ₹600 | 9 (sample) | coconut-oil.jpg |

All three oils are marked **Bestseller** and appear on the Home page.

### Herbal soaps (category `soaps`)

Every soap costs **₹120** and is sold as "1 Bar".

| ID | Product | Photo |
| -- | ------- | ----- |
| 4 | Kuppaimeni Soap | kuppaimeni-soap.jpg |
| 5 | Red Wine Soap | red-wine-soap.jpg |
| 6 | Red Chandan Soap | red-chandan-soap.jpg |
| 7 | Vetiver Soap | vetiver-soap.jpg |
| 8 | Rice Soap | rice-soap.jpg |
| 9 | Charcoal Soap | charcoal-soap.jpg |
| 10 | Nalangu Maavu Soap | nalangu-maavu-soap.jpg |
| 11 | Goat Milk Soap | goat-milk-soap.jpg |

### Product fields

```jsonc
{
  "id": 1,
  "name": "Herbal Hair Growth Oil",
  "category": "oils",            // "oils" or "soaps"
  "bestseller": true,            // shown on the Home page
  "stock": 8,                    // optional; "Only N left" appears when 10 or less
  "image": "/images/products/herbal-hair-growth-oil.jpg",
  "tagline": "…",                // optional, gold italic line under the name
  "description": "…",
  "ingredients": "…",            // optional: these four fields fill the
  "benefits": ["…"],             // "Know your …" section on the product page
  "howToUse": ["…"],
  "closing": { "title": "…", "text": "…" },
  "sizes": [
    { "label": "100 ml", "price": 150, "mrp": 150, "default": true },
    { "label": "500 ml", "price": 600, "mrp": 600 }
  ]
}
```

- **Discount:** set `mrp` higher than `price` and a "% off" tag appears automatically.
- **One size:** a product with a single size shows its label (for example "1 BAR") instead of a size picker.

---

## Product content

The full text for each oil is stored in `products.json`. The oils' product pages show it in this order: tagline, description, then Key Ingredients, Benefits, How to Use and a closing line.

| Product | Tagline | Key ingredients | Closing line |
| ------- | ------- | --------------- | ------------ |
| Herbal Hair Growth Oil | Nature's Goodness, Crafted for Your Hair! | A blend of traditional herbs and nourishing natural oils. | Your Hair, Our Natural Care. |
| Herbal Dandruff Care Oil | Healthy Scalp, Natural Care! | Coconut oil and selected herbal ingredients. | Nature's Touch for Your Hair. |
| Pure Coconut Oil | Pure Goodness, Straight from Nature! | 100% Coconut Oil. | Simple. Pure. Naturally Yours. |

The soaps have only a short placeholder description so far.

### Our Story page (`client/src/views/About.vue`)

- **Heading:** Rooted in Nature, *Made with Care*
- **Intro:** Welcome to The Aadhini Organics, a brand inspired by the goodness of nature and the beauty of traditional herbal care.
- **Body:** self-care that is simple, gentle and inspired by nature; a passion for herbal beauty care; thoughtfully crafted personal care products; from herbal hair oils to everyday beauty care.
- **Mission:** "Our mission is to make natural-inspired beauty care a part of your everyday life."
- **Sign-off:** The Aadhini Organics — Pure Natural Care. Thank you for being a part of our journey!

---

## Business rules

| Rule | Value | Where to change it |
| ---- | ----- | ------------------ |
| WhatsApp order number | +91 93427 37514 | `WHATSAPP_NUMBER` in `client/src/views/Cart.vue` |
| Delivery charge | ₹60 | `SHIPPING_FEE` in `client/src/promo.js` and `server/app.js` |
| Free delivery | Orders **above ₹1500** | `FREE_SHIPPING_MIN` in `client/src/promo.js` and `server/app.js` |
| Payment | Cash on Delivery | text only |
| "Only N left" threshold | 10 or less | `LOW_STOCK` in `client/src/promo.js` |
| Offer bar and countdown | Off | `offer` in `client/src/promo.js` |

The delivery rule is in **two places**: `client/src/promo.js` for the cart display and `server/app.js` for the order total. Change both together.

### Checkout flow

1. The customer adds products to the cart. The cart is saved in the browser under the key `aadhini-cart-v3`.
2. In the cart they click **Send Cart to WhatsApp**. Name, phone and address are optional.
3. The server checks every item against `products.json`, works out the delivery charge and returns an order ID such as `AO12345678`.
4. WhatsApp opens with the order pre-filled: order ID, items, subtotal, delivery, total (Cash on Delivery) and the customer's details if given.

### Offer bar with countdown

The thin bar at the top of every page shows an offer and a live countdown. To turn it on, fill in `client/src/promo.js`:

```js
export const offer = {
  title: 'Diwali Special',
  text: '10% off on all oils',
  endsAt: '2026-11-08T23:59:59+05:30'
};
```

The bar hides itself once `endsAt` has passed and never resets. While `endsAt` is `null`, no offer is shown. Only use real offers and real stock numbers: India's Dark Patterns Guidelines (2023) ban false urgency.

---

## Website features

- **Home:** hero, Bestsellers, Our Story teaser, and testimonials scrolling in a continuous loop (Thanglish and English).
- **Shop:**
  - All / Hair Oils / Herbal Soaps filters and a search box.
  - The footer links open the matching filter (`/shop?category=oils`, `/shop?category=soaps`).
- **Product card:**
  - Bestseller tag, sliding size picker, low-stock note.
  - Price animates when the size changes.
  - Add to Cart shows "✓ Added" after a click.
- **Product page:**
  - Back button and breadcrumbs (Home / Shop / category / product).
  - Size choice, stock meter, quantity capped at stock, Add to Cart and Buy Now.
  - Reassurance row: Free delivery above ₹1500 · Cash on Delivery · WhatsApp · Dispatched within 24 hours.
  - The "Know your …" content section when the product has that content.
- **Cart:** compact header, a free-delivery progress bar, and WhatsApp checkout.
- **Style:**
  - Forest green, cream and turmeric gold.
  - Playfair Display headings with a ——◆—— ornament under section titles.
  - Animations turn off for visitors who have reduced motion enabled.

### Removed on request

- Category section on the Home page.
- Harvest Letters newsletter section.
- Trust strip with emoji icons.
- "Lab tested" claims.
- Shipping Policy and Returns links.

---

## Project structure

```
client/                      Vue 3 + Vite + Pinia + Vue Router
  src/views/                 Home, Shop, Product, Cart, About (Our Story), Contact
  src/components/            SiteHeader, SiteFooter, ProductCard, OfferBar
  src/stores/cart.js         cart (saved in localStorage)
  src/promo.js               offer, delivery and low-stock settings
  src/useCountdown.js        countdown timer
  public/images/products/    product photos
  dist/                      built site (committed so hosts can serve it)
server/
  app.js                     Express API routes
  index.js                   local / Render server; also serves client/dist
  lambda.js                  Netlify Function wrapper
  data/products.json         product catalogue
netlify/functions/api.js     Netlify Function entry
netlify.toml                 Netlify build and redirect settings
render.yaml                  Render settings
```

## Run locally

Requires Node.js 16 or newer.

```bash
npm run install:all   # install server and client packages
npm run build         # build the site into client/dist
npm start             # site and API on http://localhost:5000
```

For development with hot reload, run `npm run server` and `npm run client`, then open http://localhost:5173.

After changing anything in `client/src`, run `npm run build` again. After changing `products.json`, restart `npm start`.

## Deploy

Push to GitHub. Render and Netlify rebuild automatically when connected to the repo.

### Render

| Setting | Value |
| ------- | ----- |
| Build Command | `yarn install; yarn build` |
| Start Command | `yarn start` |

Node 20 is set in `render.yaml`. On the free plan the server sleeps after 15 minutes without visitors, and the first visit after that takes 30–60 seconds. To avoid this, either ping `/api/categories` every 5 minutes with a free monitor such as UptimeRobot, or upgrade to the Starter plan.

### Netlify

| Setting | Value |
| ------- | ----- |
| Base directory | *(empty)* |
| Build command | `npm run build` |
| Publish directory | `client/dist` |
| Functions directory | `netlify/functions` |

The API runs as a Netlify Function, and `netlify.toml` sends `/api/*` to it. If products don't load, check that Base directory is empty, then use **Clear cache and deploy site**. To test, open https://aadhini.netlify.app/api/products, which should list the products as JSON.

Netlify can't save files, so orders and contact messages aren't stored there; they appear only in the function logs. Orders still reach WhatsApp.

## API

| Method | Route | Purpose |
| ------ | ----- | ------- |
| GET | /api/products?category=&bestseller=&q= | List and filter products |
| GET | /api/products/:id | Get one product |
| GET | /api/categories | Hair Oils, Herbal Soaps |
| POST | /api/orders | `{ items: [{ id, size, qty }], customer?: { name, phone, address } }` → `{ orderId, total }` |
| POST | /api/contact | `{ name, email, message }` |
| POST | /api/newsletter | `{ email }` (not used by the site) |

Orders, messages and sign-ups are saved to `server/data/*.json` when the filesystem allows it. Git ignores these files.

---

## To do

- [ ] Replace the sample stock numbers (8, 6, 9) with real stock, or remove `stock`.
- [ ] Add the soap bar weight (for example 100 g) in place of "1 Bar".
- [ ] Add full content for the soaps (ingredients, benefits, how to use).
- [ ] Check that "100% Natural · No Added Chemicals · No Preservatives" is true for the soaps.
- [ ] Replace the sample testimonials on the Home page with real customer reviews.
- [ ] Update the Home hero, whose stats ("120+ partner farmers", "25k happy kitchens", "4.9★") are leftovers from the old design, and the footer address and phone.
- [ ] Fix the Netlify build settings (see above).
