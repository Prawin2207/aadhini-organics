// Marketing settings — keep these honest: update them whenever the real offer or stock changes.

// Current offer. The countdown shows only until `endsAt`, then the offer bar hides itself.
// While `endsAt` is null no offer is shown. Example:
//   { title: 'Diwali Special', text: '10% off on all oils', endsAt: '2026-11-08T23:59:59+05:30' }
export const offer = {
  title: '',
  text: '',
  endsAt: null
};

// Orders above this amount get free delivery (keep in sync with server/app.js)
export const FREE_SHIPPING_MIN = 1500;
export const SHIPPING_FEE = 60;

// "Only N left" appears when a product's `stock` (server/data/products.json) is at or below this number
export const LOW_STOCK = 10;
