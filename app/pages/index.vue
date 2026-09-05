<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const menuOpen = ref(false)
const selectedService = ref('Website development')
const projectBrief = ref('')
const emailLink = computed(() => `mailto:me@waqarulzafar.com?subject=${encodeURIComponent(`Project inquiry: ${selectedService.value}`)}&body=${encodeURIComponent(projectBrief.value)}`)
const services = [
  { icon: 'i-lucide-monitor', name: 'Web design & development', description: 'A beautiful, responsive home for your business. From landing pages to custom web applications.', price: '100', label: 'Starting from', features: ['Responsive, thoughtful design', 'Laravel, Nuxt, Next.js & more', 'Built for speed and usability'], inquiry: 'Website development' },
  { icon: 'i-lucide-smartphone', name: 'Mobile app development', description: 'Put your idea in people’s hands with apps designed for Android and iOS.', price: '150', label: 'Starting from', features: ['Android & iOS applications', 'Flutter or native Kotlin', 'Smooth, intuitive experiences'], inquiry: 'Mobile app development' },
  { icon: 'i-lucide-store', name: 'Ready-made POS system', description: 'Make everyday business simpler with a ready-made point-of-sale system.', price: '300', label: 'Ready-made solution', features: ['For restaurants & hotels', 'For gyms & other businesses', 'Discuss the right fit for your team'], inquiry: 'Ready-made POS system' }
]
const steps = [
  { icon: 'i-lucide-messages-square', title: 'Discover', text: 'We talk through your idea, your audience, and what a successful project looks like.' },
  { icon: 'i-lucide-pencil-ruler', title: 'Design', text: 'We shape the experience and agree on the scope, timeline, and visual direction.' },
  { icon: 'i-lucide-code-xml', title: 'Develop', text: 'I bring the design to life, keeping you involved with clear updates along the way.' },
  { icon: 'i-lucide-rocket', title: 'Deliver', text: 'We test, refine, and prepare your product for launch. Every detail counts.' }
]
function chooseService(service: string) { selectedService.value = service }
let animationContext: gsap.Context | undefined
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  animationContext = gsap.context(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-copy > *', { y: 22, opacity: 0, stagger: 0.10, duration: 0.8, ease: 'power2.out' })
      gsap.from('.portrait-area', { y: 24, opacity: 0, duration: 1, delay: 0.2 })
      gsap.to('.portrait-spark', { rotation: 35, duration: 6, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(element => {
        gsap.from(element, { y: 30, opacity: 0, duration: 0.7, scrollTrigger: { trigger: element, start: 'top 92%', once: true } })
      })
    })
  })
})
onBeforeUnmount(() => animationContext?.revert())
const navigation = ['About', 'Services', 'Process', 'Solutions']
</script>

<template>
  <div>
    <header class="header"><div class="container nav-wrap">
      <a class="brand" href="#home" aria-label="Waqar UL Zafar home"><span class="brand-mark">W<span>.</span></span><span>waqarulzafar<span class="purple">.</span></span></a>
      <nav class="desktop-nav" aria-label="Main navigation"><a class="active" href="#home">Home</a><a v-for="item in navigation" :key="item" :href="`#${item.toLowerCase()}`">{{ item }}</a><a class="button small" href="#contact">Let's talk <UIcon name="i-lucide-arrow-up-right" /></a></nav>
      <button class="menu-toggle" :aria-expanded="menuOpen" aria-label="Toggle navigation" @click="menuOpen = !menuOpen"><UIcon :name="menuOpen ? 'i-lucide-x' : 'i-lucide-menu'" /></button>
    </div><nav v-if="menuOpen" class="mobile-nav" aria-label="Mobile navigation"><a v-for="item in [...navigation, 'Contact']" :key="item" :href="`#${item.toLowerCase()}`" @click="menuOpen = false">{{ item }}</a></nav></header>
    <main>
      <section id="home" class="hero"><div class="container hero-grid">
        <div class="hero-copy"><div class="eyebrow availability"><span /> Available for freelance projects</div><h1>Hello, I'm<br>Waqar UL Zafar<span class="purple">.</span></h1><p class="hero-description">A <span class="highlight">full-stack developer</span> turning your ideas into<br class="desktop-break"> thoughtful websites, powerful apps, and intelligent<br class="desktop-break"> AI solutions. Built with care. Made to make a difference.</p><div class="hero-actions"><a class="button" href="#contact">Let's build something <UIcon name="i-lucide-arrow-up-right" /></a><a class="text-link" href="#services">Explore my services <UIcon name="i-lucide-arrow-right" /></a></div><div class="stats"><div><strong>7<span>+</span></strong><span>Years of experience</span></div><div><strong>Web <span>&</span> App</strong><span>End-to-end development</span></div><div><strong>AI<span>-</span>ready</strong><span>Built for what's next</span></div></div></div>
        <div class="portrait-area"><div class="portrait-frame"><img src="/images/waqar-ul-zafar.jpg" alt="Waqar UL Zafar" width="1440" height="1436" fetchpriority="high"><div class="portrait-caption"><span>DEVELOPER. BUILDER. PROBLEM SOLVER.</span><UIcon name="i-lucide-arrow-up-right" /></div></div><div class="floating-badge"><span class="badge-icon"><UIcon name="i-lucide-code-xml" /></span><div><strong>From idea to launch</strong><span>Your development partner</span></div></div><span class="portrait-spark">✳</span></div>
      </div><div class="container hero-bottom"><span>GOOD IDEAS DESERVE GREAT EXECUTION.</span><a href="#about">A little more about me <UIcon name="i-lucide-arrow-down" /></a></div></section>
      <section class="stack-strip"><div class="container stack-inner"><span class="stack-label">THE TOOLS<br>BEHIND THE WORK</span><span v-for="tech in [{name:'Laravel',icon:'laravel'},{name:'Nuxt.js',icon:'nuxt'},{name:'Next.js',icon:'nextdotjs'},{name:'React',icon:'react'},{name:'Vue.js',icon:'vuedotjs'},{name:'Flutter',icon:'flutter'},{name:'Kotlin',icon:'kotlin'}]" :key="tech.name" class="tech"><UIcon :name="`i-simple-icons-${tech.icon}`" />{{ tech.name }}</span></div></section>
      <section id="about" class="section container about-grid"><div><span class="eyebrow">A LITTLE ABOUT ME</span><h2>Good code.<br>Even better experiences.</h2></div><div><p class="large-copy">I'm Waqar, a developer who enjoys connecting the dots between an idea and a product people love to use.</p><p>With 7 years of experience across Laravel, Nuxt.js, Next.js, React, Vue.js, Flutter, and native Android development with Kotlin, I build for the web and for the devices in your pocket. From your first website to an AI-powered application, I bring the same attention to every detail.</p><a class="text-link purple" href="#process">Here's how I work <UIcon name="i-lucide-arrow-up-right" /></a></div></section>
      <section id="services" class="services-section section"><div class="container">
        <div class="section-heading reveal"><div><span class="eyebrow">WHAT I CAN DO FOR YOU</span><h2>Your next idea. Let's build it.</h2></div><p>Practical solutions, thoughtful execution,<br>and a clear place to start.</p></div>
        <div class="service-grid"><article v-for="service in services" :key="service.name" class="service-card reveal"><div class="service-icon"><UIcon :name="service.icon" /></div><h3>{{ service.name }}</h3><p>{{ service.description }}</p><div class="price"><span>{{ service.label }}</span><strong>${{ service.price }}<small> USD</small></strong></div><ul><li v-for="feature in service.features" :key="feature"><UIcon name="i-lucide-check" />{{ feature }}</li></ul><a class="service-cta" href="#contact" @click="chooseService(service.inquiry)">Let's discuss your project <UIcon name="i-lucide-arrow-up-right" /></a></article></div>
        <div class="ai-service reveal"><div class="ai-icon"><UIcon name="i-lucide-sparkles" /></div><div><span class="eyebrow">BUILDING WHAT'S NEXT</span><h3>AI deployment & training</h3><p>Bring intelligence to your product with AI model training, deployment, and application integration.</p></div><a class="button outline" href="#contact" @click="chooseService('AI deployment & training')">Discuss your AI idea <UIcon name="i-lucide-arrow-up-right" /></a></div><p class="pricing-note">Web and app prices are starting rates. Final scope, timeline, and any additional costs are agreed before work begins.</p>
      </div></section>
      <section id="process" class="section container"><div class="center-heading reveal"><span class="eyebrow">SIMPLE, COLLABORATIVE, TRANSPARENT</span><h2>From “what if” to what's next.</h2><p>A clear process that keeps your idea moving forward.</p></div><div class="process-grid"><article v-for="(step, index) in steps" :key="step.title" class="process-step reveal"><div class="step-top"><span class="service-icon"><UIcon :name="step.icon" /></span><span class="step-number">0{{ index + 1 }}</span></div><h3>{{ step.title }}</h3><p>{{ step.text }}</p></article></div></section>
      <section id="solutions" class="solutions-section section"><div class="container solutions-grid"><div class="reveal"><span class="eyebrow">BUILT AROUND YOUR BUSINESS</span><h2>One developer.<br>Many possibilities.</h2><p>Whether you're starting something new or improving what you already have, let's find the right technology for the job.</p><a href="#contact" class="button">Tell me your idea <UIcon name="i-lucide-arrow-up-right" /></a></div><div class="solution-list reveal"><div><span>01</span><div><h3>Websites & web applications</h3><p>Business websites, custom platforms, and experiences that work across screens.</p></div><UIcon name="i-lucide-globe" /></div><div><span>02</span><div><h3>Android & iOS experiences</h3><p>Cross-platform Flutter apps and native Android development with Kotlin.</p></div><UIcon name="i-lucide-smartphone" /></div><div><span>03</span><div><h3>Business tools & AI solutions</h3><p>Ready-made POS software and AI deployment and training for your next project.</p></div><UIcon name="i-lucide-cpu" /></div></div></div></section>
      <section id="contact" class="section container contact-grid"><div class="reveal"><span class="eyebrow">LET'S MAKE IT HAPPEN</span><h2>Have an idea?<br>I'm all ears<span class="purple">.</span></h2><p>Tell me what you're thinking. We can talk through the possibilities and find the best way forward.</p><a class="contact-link" href="mailto:me@waqarulzafar.com"><span class="service-icon"><UIcon name="i-lucide-mail" /></span><span><small>DROP ME A LINE</small><strong>me@waqarulzafar.com</strong></span><UIcon name="i-lucide-arrow-up-right" /></a><a class="contact-link" href="https://wa.me/92487347143" target="_blank" rel="noopener noreferrer"><span class="service-icon"><UIcon name="i-simple-icons-whatsapp" /></span><span><small>LET'S CHAT ON WHATSAPP</small><strong>+92 487 347143</strong></span><UIcon name="i-lucide-arrow-up-right" /></a></div>
        <div class="contact-card reveal"><h3>Let's talk about your project.</h3><p>A few details are all we need to get started.</p><label for="service">I'm interested in</label><select id="service" v-model="selectedService"><option>Website development</option><option>Mobile app development</option><option>Ready-made POS system</option><option>AI deployment & training</option><option>Something else</option></select><label for="brief">Your idea</label><textarea id="brief" v-model="projectBrief" rows="4" placeholder="What would you like to build? Share a little about your project, budget, or timeline." /><a :href="emailLink" class="button">Let's start a conversation <UIcon name="i-lucide-arrow-up-right" /></a><span class="form-note">Opens your email app with your project details.</span></div>
      </section>
      <footer class="footer"><div class="container footer-inner"><a href="#home" class="brand"><span class="brand-mark">W<span>.</span></span><span>waqarulzafar<span class="purple">.</span></span></a><span>© {{ new Date().getFullYear() }} Waqar UL Zafar. All rights reserved.</span><a class="text-link" href="#home">Back to top <UIcon name="i-lucide-arrow-up" /></a></div></footer>
    </main>
  </div>
</template>
