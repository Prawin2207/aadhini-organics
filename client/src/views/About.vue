<template>
  <section class="page-hero">
    <div class="container">
      <span class="eyebrow">Our Story</span>
      <h1>Rooted in <em>tradition</em></h1>
      <p class="lead">From one wooden chekku in a Coimbatore village to 25,000 kitchens across India.</p>
    </div>
  </section>

  <section class="section">
    <div class="container story">
      <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80" alt="Green farm fields" loading="lazy" />
      <div>
        <h2>Why <em>Aadhini</em>?</h2>
        <p class="lead">“Aadhi” means the beginning — a return to how food was grown and prepared at the very start.</p>
        <p>
          We saw our neighbours' kitchens fill with refined oils and polished grains while the farmers around us
          struggled to sell their native crops. Aadhini Organics was founded to bridge that gap: give families honest,
          nutrient-rich food, and give farmers a fair, steady market for growing it naturally.
        </p>
        <p>
          Every hair oil is slow-infused with whole herbs like amla, hibiscus, brahmi and curry leaves. Our coconut
          oil is pure, with no added chemicals or preservatives. Every batch is checked before it reaches you.
        </p>
      </div>
    </div>
  </section>

  <section class="section values">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">What We Stand For</span>
        <h2>Our <em>promises</em></h2>
      </div>
      <div class="grid-4">
        <div v-for="v in values" :key="v.title" class="card value">
          <span class="icon">{{ v.icon }}</span>
          <h3>{{ v.title }}</h3>
          <p>{{ v.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const values = [
  { icon: '🌿', title: 'Whole Herbs', text: 'Amla, hibiscus, brahmi, curry leaves, black seed and fenugreek — nothing synthetic.' },
  { icon: '🤝', title: 'Fair Trade', text: 'Farmers are paid upfront and above market rates — always.' },
  { icon: '🪵', title: 'Wood Pressed', text: 'Slow, low-heat pressing preserves nutrients and natural aroma.' },
  { icon: '🔬', title: 'Lab Tested', text: 'Every batch is tested for purity and adulterants before dispatch.' }
];
</script>

<style scoped>
.story {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}
.story img {
  border-radius: var(--r-xl);
  aspect-ratio: 4 / 5;
  object-fit: cover;
  width: 100%;
}
.values {
  background: var(--cream-2);
}
.value {
  padding: 2rem;
}
.icon {
  font-size: 32px;
  display: block;
  margin-bottom: 1rem;
}
@media (max-width: 1023px) {
  .story {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
