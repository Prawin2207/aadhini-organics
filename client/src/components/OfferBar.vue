<template>
  <div v-if="active" class="offer-bar" role="region" aria-label="Current offer">
    <div class="container inner">
      <span class="title">✦ {{ offer.title }}</span>
      <span class="sep" aria-hidden="true"></span>
      <span class="text">{{ offer.text }}</span>
      <span class="sep" aria-hidden="true"></span>
      <span class="timer">
        Ends in
        <b>{{ parts.d }}d</b> <b>{{ parts.h }}h</b> <b>{{ parts.m }}m</b> <b>{{ parts.s }}s</b>
      </span>
    </div>
  </div>
</template>

<script setup>
import { offer } from '../promo.js';
import { useCountdown } from '../useCountdown.js';

const { active, parts } = useCountdown(offer.endsAt);
</script>

<style scoped>
.offer-bar {
  background: var(--forest-deep);
  color: rgba(250, 247, 242, 0.85);
  border-bottom: 1px solid rgba(217, 130, 43, 0.35);
  font-size: 13px;
  letter-spacing: 0.02em;
}
.inner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px 14px;
  padding-top: 9px;
  padding-bottom: 9px;
  text-align: center;
}
.title {
  font: italic 600 15px/1 var(--serif);
  color: var(--turmeric-soft);
}
.sep {
  width: 4px;
  height: 4px;
  transform: rotate(45deg);
  background: var(--turmeric);
}
.timer b {
  display: inline-block;
  min-width: 34px;
  padding: 2px 5px;
  margin-left: 2px;
  border: 1px solid rgba(217, 130, 43, 0.45);
  border-radius: 4px;
  color: var(--cream);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
@media (max-width: 600px) {
  .sep:last-of-type {
    display: none;
  }
  .timer {
    flex-basis: 100%;
  }
}
</style>
