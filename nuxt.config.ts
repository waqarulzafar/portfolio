// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: { enabled: false },
  colorMode: { preference: 'light' },
  icon: {
    provider: 'none',
    clientBundle: {
      scan: true,
      icons: ['lucide:arrow-up-right', 'lucide:arrow-right', 'lucide:arrow-down', 'lucide:arrow-up', 'lucide:menu', 'lucide:x', 'lucide:code-xml', 'lucide:monitor', 'lucide:smartphone', 'lucide:store', 'lucide:sparkles', 'lucide:check', 'lucide:messages-square', 'lucide:pencil-ruler', 'lucide:rocket', 'lucide:globe', 'lucide:cpu', 'lucide:mail', 'simple-icons:laravel', 'simple-icons:nuxt', 'simple-icons:nextdotjs', 'simple-icons:react', 'simple-icons:vuedotjs', 'simple-icons:flutter', 'simple-icons:kotlin', 'simple-icons:whatsapp', 'simple-icons:upwork', 'simple-icons:fiverr', 'lucide:user-round', 'lucide:layers', 'lucide:route', 'lucide:lightbulb', 'lucide:briefcase-business', 'lucide:award', 'lucide:utensils', 'lucide:building-2', 'lucide:dumbbell', 'lucide:plus']
    }
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
