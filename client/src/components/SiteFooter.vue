<template>
  <footer class="footer">
    <div class="container cols">
      <div>
        <div class="logo">🌿 Aadhini <em>Organics</em></div>
        <p>Herbal hair oils and pure coconut oil — made from 100% natural ingredients, delivered honest to your doorstep.</p>
        <div class="social">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="Facebook">FB</a>
          <a href="#" aria-label="YouTube">YT</a>
          <a href="#" aria-label="WhatsApp">WA</a>
        </div>
      </div>
      <div>
        <h4>Shop</h4>
        <RouterLink to="/shop?category=oils">Hair Oils</RouterLink>
        <RouterLink to="/shop?category=soaps">Herbal Soaps</RouterLink>
        <RouterLink to="/shop">Bestsellers</RouterLink>
        <RouterLink to="/shop">All Products</RouterLink>
      </div>
      <div>
        <h4>Company</h4>
        <RouterLink to="/about">Our Story</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </div>
      <div>
        <h4>Visit Us</h4>
        <p>Aadhini Organics<br />Coimbatore, Tamil Nadu 641001</p>
        <p>+91 98765 43210<br />hello@aadhiniorganics.in</p>
      </div>
    </div>
    <div class="container bottom">© {{ year }} Aadhini Organics. Pure from the farm.</div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
  background: var(--forest-deep);
  color: rgba(250, 247, 242, 0.75);
  padding-top: 4rem;
}
.cols {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.3fr;
  gap: 2.5rem;
}
.logo {
  font: 600 24px/1 var(--serif);
  color: var(--cream);
  margin-bottom: 1rem;
}
.logo em {
  color: var(--turmeric);
}
h4 {
  color: var(--cream);
  font-family: var(--sans);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
.cols a {
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
}
.cols a:hover {
  color: var(--turmeric-soft);
}
.social {
  display: flex;
  gap: 10px;
}
.social a {
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  border: 1px solid rgba(250, 247, 242, 0.25);
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 700;
}
.bottom {
  border-top: 1px solid rgba(250, 247, 242, 0.12);
  margin-top: 3rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  font-size: 13px;
}
@media (max-width: 767px) {
  .cols {
    grid-template-columns: 1fr 1fr;
  }
  .cols > div:first-child {
    grid-column: 1 / -1;
  }
}
</style>
