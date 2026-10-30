import { computed, onMounted, onUnmounted, ref } from 'vue';

// Live countdown to a fixed date; `active` turns false once the date has passed
export function useCountdown(endsAt) {
  const end = endsAt ? new Date(endsAt).getTime() : 0;
  const now = ref(Date.now());
  let timer;
  onMounted(() => (timer = setInterval(() => (now.value = Date.now()), 1000)));
  onUnmounted(() => clearInterval(timer));

  const left = computed(() => Math.max(0, end - now.value));
  const active = computed(() => left.value > 0);
  const parts = computed(() => {
    const s = Math.floor(left.value / 1000);
    const pad = (n) => String(n).padStart(2, '0');
    return { d: Math.floor(s / 86400), h: pad(Math.floor(s / 3600) % 24), m: pad(Math.floor(s / 60) % 60), s: pad(s % 60) };
  });
  return { active, parts };
}
