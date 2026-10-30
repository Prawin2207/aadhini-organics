<template>
  <section class="page-hero">
    <div class="container">
      <span class="eyebrow">Our Story</span>
      <h1>Rooted in Nature, <em>Made with Care</em></h1>
      <p class="lead">
        Welcome to The Aadhini Organics, a brand inspired by the goodness of nature and the beauty of traditional
        herbal care.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container story">
      <img src="/images/products/herbal-hair-growth-oil.jpg" alt="Aadhini Organics Herbal Hair Growth Oil" loading="lazy" />
      <div>
        <h2>Simple, gentle, <em>natural</em></h2>
        <p class="lead">
          We believe that self-care should be simple, gentle, and inspired by nature.
        </p>
        <p>
          Our journey began with a passion for herbal beauty care and a desire to bring the goodness of natural
          ingredients into everyday routines.
        </p>
        <p>
          At Aadhini Organics, we focus on creating thoughtfully crafted personal care products inspired by
          traditional ingredients and natural goodness.
        </p>
        <p>
          From herbal hair oils to everyday beauty care, every product reflects our passion for nature, simplicity,
          and self-care.
        </p>
        <RouterLink to="/shop" class="btn btn-primary">Explore Our Oils</RouterLink>
      </div>
    </div>
  </section>

  <section class="section mission">
    <div class="container">
      <span class="eyebrow">Our Mission</span>
      <blockquote>“Our mission is to make natural-inspired beauty care a part of your everyday life.”</blockquote>
      <p class="sign">The Aadhini Organics — <em>Pure Natural Care.</em></p>
      <p class="thanks">Thank you for being a part of our journey!</p>
    </div>
  </section>
</template>

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
  max-width: 480px;
  margin: 0 auto;
  box-shadow: var(--shadow-2);
}
.story .btn {
  margin-top: 0.5rem;
}
.mission {
  background: var(--cream-2);
  border-top: 1px solid var(--bone);
  text-align: center;
}
.mission .container {
  max-width: 820px;
}
blockquote {
  margin: 1rem 0 1.5rem;
  font: italic 500 32px/1.4 var(--serif);
  color: var(--forest);
}
blockquote::after {
  content: '◆';
  display: block;
  width: 120px;
  margin: 1.5rem auto 0;
  font: 9px/12px var(--sans);
  color: var(--turmeric);
  background: linear-gradient(var(--turmeric), var(--turmeric)) left center / 48px 1px no-repeat,
    linear-gradient(var(--turmeric), var(--turmeric)) right center / 48px 1px no-repeat;
}
.sign {
  margin: 0 0 0.5rem;
  font-weight: 600;
  color: var(--forest);
}
.sign em {
  font-family: var(--serif);
  color: var(--turmeric);
}
.thanks {
  margin: 0;
  font-size: 15px;
}
@media (max-width: 1023px) {
  .story {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  blockquote {
    font-size: 24px;
  }
}
</style>
