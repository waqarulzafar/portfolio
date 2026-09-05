<script setup lang="ts">
declare global {
  interface Window {
    portfolioAnalytics?: {
      getChoice: () => 'accepted' | 'rejected' | null
      choose: (value: 'accepted' | 'rejected') => void
    }
  }
}
const visible = ref(false)
const settingsButton = ref<HTMLButtonElement | null>(null)
const banner = ref<HTMLElement | null>(null)
const currentChoice = ref<string | null>(null)
onMounted(() => {
  currentChoice.value = window.portfolioAnalytics?.getChoice() ?? null
  visible.value = currentChoice.value === null
})
async function openSettings() {
  visible.value = true
  await nextTick()
  banner.value?.focus()
}
async function choose(value: 'accepted' | 'rejected') {
  window.portfolioAnalytics?.choose(value)
  currentChoice.value = value
  visible.value = false
  await nextTick()
  settingsButton.value?.focus()
}
</script>

<template>
  <div class="analytics-consent">
    <section v-if="visible" ref="banner" class="consent-banner" aria-labelledby="consent-title" tabindex="-1">
      <div>
        <h2 id="consent-title">Your analytics choice</h2>
        <p>May we use Google Analytics cookies to understand visits and improve this website? Analytics stays off until you accept. Advertising features stay off.</p>
        <p class="consent-detail">Your choice is saved on this device for 180 days. You can change it anytime. This choice applies to Google Analytics; HubSpot chat has separate cookie settings. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy (new tab)</a></p>
        <p v-if="currentChoice" class="consent-detail">Current choice: {{ currentChoice === 'accepted' ? 'analytics accepted' : 'analytics rejected' }}.</p>
      </div>
      <div class="consent-actions">
        <button class="button" type="button" @click="choose('rejected')">Reject analytics</button>
        <button class="button" type="button" @click="choose('accepted')">Accept analytics</button>
      </div>
    </section>
    <button ref="settingsButton" class="analytics-settings" type="button" :aria-expanded="visible" @click="openSettings">Analytics settings</button>
  </div>
</template>
