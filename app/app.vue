<script setup lang="ts">
const isPreloading = ref(true)
let preloadTimeout: ReturnType<typeof setTimeout> | undefined

function finishPreloading() {
  isPreloading.value = false
  if (preloadTimeout) clearTimeout(preloadTimeout)
}

onMounted(() => {
  // Wait only for the above-the-fold portrait, never third-party chat or analytics.
  preloadTimeout = setTimeout(finishPreloading, 2500)
  const portrait = document.querySelector<HTMLImageElement>('.portrait-frame img')
  if (portrait) {
    void portrait.decode().catch(() => {}).finally(finishPreloading)
  } else {
    finishPreloading()
  }
})
onBeforeUnmount(() => {
  if (preloadTimeout) clearTimeout(preloadTimeout)
})

useHead({
  script: [
    {
      key: 'google-tag-loader',
      src: 'https://www.googletagmanager.com/gtag/js?id=G-E4XF1JFR2H',
      async: true,
      tagPosition: 'head'
    },
    {
      key: 'google-tag-config',
      tagPosition: 'head',
      innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-E4XF1JFR2H');`
    },
    {
      id: 'hs-script-loader',
      src: 'https://js-na2.hs-scripts.com/247292806.js?v=20260906-chat',
      type: 'text/javascript',
      async: true,
      defer: true,
      tagPosition: 'bodyClose'
    }
  ],
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'icon', type: 'image/png', href: '/images/waqarulzafar-logo.png' },
    { rel: 'apple-touch-icon', href: '/images/waqarulzafar-logo.png' }
  ]
})
</script>
<template>
  <UApp>
    <Transition name="preloader">
      <div v-if="isPreloading" class="site-preloader" role="status" aria-live="polite" aria-label="Loading Waqar UL Zafar website">
        <picture>
          <source media="(prefers-reduced-motion: reduce)" srcset="/images/waqarulzafar-logo.png">
          <img src="/images/waqarulzafar-loader.gif" alt="" width="600" height="600" fetchpriority="high" class="preloader-image">
        </picture>
        <span class="preloader-label">Loading your experience…</span>
      </div>
    </Transition>
    <NuxtPage />
  </UApp>
</template>
