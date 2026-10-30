<template>
  <!-- Hero -->
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-copy">
        <span class="chip chip-accent">Tamil Nadu Heritage · Farm Direct</span>
        <h1>Pure from the farm, <em>honest</em> to the soil</h1>
        <p class="lead">
          Herbal hair growth oils and pure coconut oil — slow-infused with amla, hibiscus, brahmi and curry
          leaves, made from 100% natural ingredients the way our grandmothers did.
        </p>
        <div class="cta">
          <RouterLink to="/shop" class="btn btn-primary">Shop Now</RouterLink>
          <RouterLink to="/about" class="btn btn-outline">Our Story</RouterLink>
        </div>
        <div class="stats">
          <div><strong>120+</strong><span>Partner farmers</span></div>
          <div><strong>25k</strong><span>Happy kitchens</span></div>
          <div><strong>4.9★</strong><span>Average rating</span></div>
        </div>
      </div>
      <div class="hero-img">
        <img src="/hero.jpg" alt="Natural oils and herbs on a rustic table" />
        <div class="seal">
          <span>100%</span>
          <small>Cold Pressed</small>
        </div>
      </div>
    </div>
  </section>

  <!-- Bestsellers -->
  <section class="section alt">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Bestsellers</span>
        <h2>Loved in <em>25,000</em> kitchens</h2>
      </div>
      <div class="grid-3">
        <ProductCard v-for="p in bestsellers" :key="p.id" :product="p" />
      </div>
      <div class="center">
        <RouterLink to="/shop" class="btn btn-outline">View All Products</RouterLink>
      </div>
    </div>
  </section>

  <!-- Story -->
  <section class="section">
    <div class="container story">
      <div class="story-img">
        <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&q=80" alt="Farmer in a field" loading="lazy" />
      </div>
      <div>
        <span class="eyebrow">Our Story</span>
        <h2>Rooted in <em>trust</em>, grown with care</h2>
        <p class="lead">
          Aadhini began in a small village near Coimbatore with one wooden oil press and a promise: never
          compromise on purity.
        </p>
        <p>
          Today we partner with over 120 farming families across Tamil Nadu. We pay fair prices upfront, help
          farmers transition to natural farming, and press every batch slowly at low temperature so the nutrients
          and aroma stay exactly as nature intended.
        </p>
        <ul class="points">
          <li>✓ No chemicals, preservatives or refining</li>
          <li>✓ Fair, upfront payments to farmers</li>        </ul>
        <RouterLink to="/about" class="btn btn-primary">Read Our Story</RouterLink>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="section alt">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Testimonials</span>
        <h2>What our <em>families</em> say</h2>
      </div>
    </div>
    <!-- Two identical copies scroll left forever; the second is hidden from screen readers -->
    <div class="marquee">
      <div class="marquee-track">
        <div v-for="copy in 2" :key="copy" class="marquee-group" :aria-hidden="copy === 2 ? 'true' : null">
          <figure v-for="t in testimonials" :key="t.name" class="card testi">
            <div class="stars">★★★★★</div>
            <blockquote>“{{ t.quote }}”</blockquote>
            <figcaption>
              <span class="avatar">{{ t.name[0] }}</span>
              <div>
                <strong>{{ t.name }}</strong>
                <small>{{ t.city }}</small>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { api } from '../api.js';

const bestsellers = ref([]);

// Sample reviews — replace with real customer feedback before launch
const testimonials = [
  { name: 'Shanthi', city: 'Madurai', quote: 'Oil unmaiyalumae nalla iruku! Best for my hair, nalla improvement iruku.' },
  { name: 'Lakshmi R.', city: 'Chennai', quote: 'The herbal hair oil smells just like the one my grandmother used to make. My hair fall has reduced.' },
  { name: 'Kavitha M.', city: 'Trichy', quote: 'Hair fall romba kammi aagiduchu. 2 months use panren, semma result!' },
  { name: 'Divya', city: 'Salem', quote: 'Smell romba nalla iruku, sticky-ah illa. Daily use panna perfect-ah iruku.' },
  { name: 'Arun K.', city: 'Bengaluru', quote: 'Using the dandruff care oil for a few months. Light, non-sticky, and well packed.' },
  { name: 'Meena', city: 'Tirunelveli', quote: 'Coconut oil romba pure-ah iruku. En paiyan-ku kooda use panren, no problem at all.' },
  { name: 'Revathi S.', city: 'Erode', quote: 'Dandruff kammi aagiduchu, hair soft-ah aagiduchu. Definitely repeat order panuven!' },
  { name: 'Priya S.', city: 'Coimbatore', quote: 'Pure and fragrant coconut oil — I use it for my skin and hair. Love it!' },
  { name: 'Gayathri', city: 'Vellore', quote: 'Amma kaila senja oil maadhiri iruku. Hair growth-la nalla change theriyudhu.' }
];

onMounted(async () => {
  bestsellers.value = await api.products({ bestseller: 'true' });
});
</script>

<style scoped>
.hero {
  padding: 4rem 0 5rem;
  background: radial-gradient(ellipse at 80% 20%, rgba(233, 196, 106, 0.18), transparent 60%), var(--cream);
}
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: 4rem;
  align-items: center;
}
.hero-copy h1 {
  margin-top: 1.25rem;
}
.cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 2rem 0 2.5rem;
}
.stats {
  display: flex;
  gap: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--bone);
}
.stats strong {
  display: block;
  font: 600 28px/1.2 var(--serif);
  color: var(--forest);
}
.stats span {
  font-size: 13px;
}
.hero-img {
  position: relative;
}
.hero-img img {
  border-radius: var(--r-xl);
  box-shadow: var(--shadow-3);
  aspect-ratio: 4 / 3.4;
  object-fit: cover;
  width: 100%;
}
.seal {
  position: absolute;
  bottom: -24px;
  left: -24px;
  width: 116px;
  height: 116px;
  border-radius: 50%;
  background: var(--turmeric);
  color: #fff;
  display: grid;
  place-content: center;
  text-align: center;
  box-shadow: var(--shadow-2);
  border: 4px solid var(--cream);
}
.seal span {
  font: 600 28px/1 var(--serif);
}
.seal small {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.alt {
  background: var(--cream-2);
}
.center {
  text-align: center;
  margin-top: 3rem;
}

.story {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}
.story-img img {
  border-radius: var(--r-xl);
  aspect-ratio: 4 / 5;
  object-fit: cover;
  width: 100%;
  box-shadow: var(--shadow-2);
}
.points {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
}
.points li {
  padding: 6px 0;
  font-weight: 500;
  color: var(--forest);
}

.marquee {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
  mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 60s linear infinite;
}
.marquee:hover .marquee-track {
  animation-play-state: paused;
}
.marquee-group {
  display: flex;
  gap: var(--gutter);
  padding-right: var(--gutter);
}
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .marquee {
    overflow-x: auto;
  }
  .marquee-track {
    animation: none;
  }
}
.testi {
  margin: 0;
  padding: 1.75rem;
  width: 340px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}
.testi:hover {
  transform: none;
}
.testi figcaption {
  margin-top: auto;
}
.stars {
  color: var(--turmeric);
  letter-spacing: 2px;
}
blockquote {
  margin: 1rem 0 1.5rem;
  font: italic 500 17px/28px var(--serif);
  color: var(--earth);
}
figcaption {
  display: flex;
  gap: 12px;
  align-items: center;
}
figcaption strong,
figcaption small {
  display: block;
}
.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--forest);
  color: var(--cream);
  display: grid;
  place-items: center;
  font-weight: 700;
}

@media (max-width: 1023px) {
  .hero-grid,
  .story {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
@media (max-width: 767px) {
  .seal {
    left: 12px;
    width: 92px;
    height: 92px;
  }
  .stats {
    gap: 1.5rem;
  }
  .testi {
    width: 280px;
  }
}
</style>
