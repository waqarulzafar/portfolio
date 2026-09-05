<script setup lang="ts">
import { projects } from '~/data/projects'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
usePortfolioSeo()
const menuOpen = ref(false)
const activeSection = ref('home')
const menuButton = ref<HTMLButtonElement | null>(null)
let sectionObserver: IntersectionObserver | undefined
let desktopQuery: MediaQueryList | undefined
const navIcons: Record<string, string> = { Projects: 'i-lucide-briefcase-business', About: 'i-lucide-user-round', Services: 'i-lucide-layers', Process: 'i-lucide-route', Solutions: 'i-lucide-lightbulb', Contact: 'i-lucide-mail' }
function closeMenu(event?: KeyboardEvent) {
  if (event && event.key !== 'Escape') return
  if (menuOpen.value && event) menuButton.value?.focus()
  menuOpen.value = false
}
function onDesktopChange(event: MediaQueryListEvent) { if (event.matches) closeMenu() }
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
  document.addEventListener('keydown', closeMenu)
  desktopQuery = window.matchMedia('(min-width: 981px)')
  desktopQuery.addEventListener('change', onDesktopChange)
  sectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) activeSection.value = entry.target.id
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 })
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver?.observe(section))
  gsap.registerPlugin(ScrollTrigger)
  animationContext = gsap.context(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const entrance = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })
      entrance.from('.hero-intro, .availability', { y: 16, opacity: 0, stagger: 0.1, duration: 0.65 })
        .from('.hero-copy h1', { y: 45, opacity: 0, duration: 1 }, '-=0.4')
        .from('.hero-description, .hero-actions, .stats', { y: 20, opacity: 0, stagger: 0.12, duration: 0.7 }, '-=0.65')
        .from('.portrait-area', { y: 35, rotation: 2, opacity: 0, duration: 1.1 }, '-=0.9')
      gsap.to('.page-progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.2 } })
      gsap.from('.tech', { opacity: 0, y: 12, stagger: 0.07, duration: 0.5, scrollTrigger: { trigger: '.stack-strip', start: 'top 95%', once: true } })
      ScrollTrigger.batch('.reveal', {
        start: 'top 94%', once: true,
        onEnter: elements => gsap.fromTo(elements, { y: 32, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out', clearProps: 'transform,opacity' })
      })
      media.add('(min-width: 981px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.to('.portrait-frame img', { y: 24, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
      })
    })
  })
})
onBeforeUnmount(() => {
  animationContext?.revert()
  sectionObserver?.disconnect()
  document.removeEventListener('keydown', closeMenu)
  desktopQuery?.removeEventListener('change', onDesktopChange)
})
const navigation = computed(() => [...(projects.length ? ['Projects'] : []), 'About', 'Services', 'Process'])
const faqs = [
  { label: 'What is included in the starting price?', content: 'Website development starts at $100 and mobile app development starts at $150. The final quote depends on the number of pages or screens, features, integrations, and design requirements. We agree on the scope and price before development begins.' },
  { label: 'Can you build for both Android and iOS?', content: 'Yes. I use Flutter for cross-platform Android and iOS applications, and Kotlin for native Android development. The choice depends on your app’s requirements and budget.' },
  { label: 'Is the $300 POS system right for my business?', content: 'The ready-made POS system is offered for $300 for businesses such as restaurants, hotels, and gyms. Contact me with your workflow and device requirements so we can confirm suitability, available features, and any setup or customization costs.' },
  { label: 'How long will my project take?', content: 'The timeline depends on the scope and complexity. Share your requirements and target launch date, and I’ll propose milestones and a delivery schedule before we start.' },
  { label: 'Can you help with AI training and deployment?', content: 'Yes. Tell me about your use case, available data, and where the model needs to run. We can discuss training, deployment, or integrating AI into your existing web or mobile application.' },
  { label: 'What should I send to get started?', content: 'A short description of your idea, the features you need, any reference websites or apps, and your budget or timeline are a good starting point. Email me, use WhatsApp, or start a conversation in the chat widget.' }
]

</script>

<template>
  <div>
    <a class="skip-link" href="#main-content">Skip to content</a><header class="header"><div class="page-progress" aria-hidden="true" /><div class="container nav-wrap">
      <a class="brand" href="#home" aria-label="Waqar UL Zafar home"><img class="brand-logo" src="/images/waqarulzafar-logo.png" alt="Waqar UL Zafar logo" width="1024" height="1024"><span>waqarulzafar<span class="purple">.</span></span></a>
      <nav class="desktop-nav" aria-label="Main navigation"><a href="#home" :class="{ active: activeSection === 'home' }" :aria-current="activeSection === 'home' ? 'location' : undefined">Home</a><a v-for="item in navigation" :key="item" :class="{ active: activeSection === item.toLowerCase() }" :aria-current="activeSection === item.toLowerCase() ? 'location' : undefined" :href="`#${item.toLowerCase()}`">{{ item }}</a><a class="button small" href="#hire">Hire me <UIcon name="i-lucide-arrow-up-right" /></a></nav>
      <button ref="menuButton" class="menu-toggle" aria-controls="mobile-navigation" :aria-expanded="menuOpen" aria-label="Toggle navigation" @click="menuOpen = !menuOpen"><UIcon :name="menuOpen ? 'i-lucide-x' : 'i-lucide-menu'" /></button>
    </div><Transition name="menu"><nav v-if="menuOpen" id="mobile-navigation" class="mobile-nav" aria-label="Mobile navigation"><a v-for="item in [...navigation, 'Contact']" :key="item" :href="`#${item.toLowerCase()}`" @click="closeMenu()"><UIcon :name="navIcons[item]" />{{ item }}<UIcon name="i-lucide-arrow-up-right" /></a><a class="mobile-hire" href="#hire" @click="closeMenu()"><UIcon name="i-lucide-briefcase-business" />Hire me<UIcon name="i-lucide-arrow-up-right" /></a></nav></Transition></header><button v-if="menuOpen" class="menu-backdrop" tabindex="-1" aria-label="Close navigation" @click="closeMenu()" />
    <main id="main-content" tabindex="-1">
      <section id="home" class="hero"><div class="container hero-grid">
        <div class="hero-copy"><div class="eyebrow availability"><span /> Available for freelance projects</div><p class="hero-intro">WAQAR UL ZAFAR / FULL-STACK DEVELOPER</p><h1>Thoughtful code.<br><span class="hero-outline">Powerful</span><br>possibilities<span class="purple">.</span></h1><p class="hero-description">I turn ambitious ideas into websites, mobile apps, and AI solutions. From the first conversation to the final detail.</p><div class="hero-actions"><a class="button" href="#hire">Hire me <UIcon name="i-lucide-arrow-up-right" /></a><a class="button hero-secondary" :href="projects.length ? '#projects' : '#services'">{{ projects.length ? 'View my work' : 'Explore my services' }} <UIcon name="i-lucide-arrow-down" /></a></div><div class="stats"><div><UIcon name="i-lucide-award" /><strong>7<span>+</span></strong><span>Years of experience</span></div><div><UIcon name="i-lucide-code-xml" /><strong>Web <span>&</span> App</strong><span>End-to-end development</span></div><div><UIcon name="i-lucide-sparkles" /><strong>AI<span>-</span>ready</strong><span>Built for what's next</span></div></div></div>
        <div class="portrait-area"><div class="portrait-index"><span>INDEPENDENT DEVELOPER</span><span>01 / PROFILE</span></div><div class="portrait-frame"><img src="/images/waqar-ul-zafar-cutout.png" alt="Waqar UL Zafar" width="500" height="500" fetchpriority="high"><div class="portrait-caption"><span>Waqar UL Zafar · Web / Mobile / AI</span><UIcon name="i-lucide-arrow-up-right" /></div></div><div class="portrait-note"><UIcon name="i-lucide-code-xml" /><span>Built with intention.<br>Made for real people.</span><UIcon name="i-lucide-arrow-down" /></div></div>
      </div><div class="container hero-bottom"><span>GOOD IDEAS DESERVE GREAT EXECUTION.</span><a href="#about">A little more about me <UIcon name="i-lucide-arrow-down" /></a></div></section>
      <section class="stack-strip"><div class="container stack-inner"><span class="stack-label">THE TOOLS<br>BEHIND THE WORK</span><span v-for="tech in [{name:'Laravel',icon:'laravel'},{name:'Nuxt.js',icon:'nuxt'},{name:'Next.js',icon:'nextdotjs'},{name:'React',icon:'react'},{name:'Vue.js',icon:'vuedotjs'},{name:'Flutter',icon:'flutter'},{name:'Kotlin',icon:'kotlin'}]" :key="tech.name" class="tech"><UIcon :name="`i-simple-icons-${tech.icon}`" />{{ tech.name }}</span></div></section>


      <section v-if="projects.length" id="projects" data-nosnippet class="section container projects-section"><div class="section-heading reveal"><div><span class="eyebrow">01 / SELECTED CONCEPTS</span><h2>Ideas, brought to life.</h2></div><p>Demo concepts for now.<br>Real project stories coming soon.</p></div><div class="project-grid"><article v-for="project in projects" :key="project.name" class="project-card reveal"><a v-if="project.image && project.url" :href="project.url" target="_blank" rel="noopener noreferrer" class="project-image-link"><img :src="project.image" :alt="`${project.name} application screenshot`" width="1200" height="800" loading="lazy"><span class="project-open"><UIcon name="i-lucide-arrow-up-right" /><span class="sr-only">Visit {{ project.name }}</span></span></a><div v-else class="project-demo" :class="`demo-${project.icon.split('-').pop()}`"><span class="demo-label">DEMO CONCEPT</span><UIcon :name="project.icon" /><strong>{{ project.name }}</strong><span>{{ project.category }}</span><div class="demo-bottom"><span>{{ project.technologies.join(' / ') }}</span><UIcon name="i-lucide-arrow-up-right" /></div></div><span class="eyebrow">{{ project.category }}</span><h3>{{ project.name }}</h3><p>{{ project.description }}</p><p class="project-role">{{ project.contribution }}</p><div class="tag-list"><span v-for="tech in project.technologies" :key="tech">{{ tech }}</span></div></article></div></section>
      <section id="about" class="section container about-grid"><div class="about-heading reveal"><span class="section-symbol"><UIcon name="i-lucide-user-round" /></span><span class="eyebrow">02 / THE DEVELOPER</span><h2>Good code.<br>Even better experiences.</h2></div><div><p class="large-copy">I'm Waqar, a developer who enjoys connecting the dots between an idea and a product people love to use.</p><p>With 7 years of experience across Laravel, Nuxt.js, Next.js, React, Vue.js, Flutter, and native Android development with Kotlin, I build for the web and for the devices in your pocket. From your first website to an AI-powered application, I bring the same attention to every detail.</p><a class="text-link purple" href="#process">Here's how I work <UIcon name="i-lucide-arrow-up-right" /></a></div></section>
      <section id="services" class="services-section section"><div class="container">
        <div class="section-heading reveal"><div><span class="eyebrow">03 / SERVICES</span><h2>Your next idea. Let's build it.</h2></div><p>Practical solutions, thoughtful execution,<br>and a clear place to start.</p></div>
        <div class="service-grid"><article v-for="service in services" :key="service.name" class="service-card reveal"><div class="service-icon"><UIcon :name="service.icon" /></div><h3>{{ service.name }}</h3><p>{{ service.description }}</p><div class="price"><span>{{ service.label }}</span><strong>${{ service.price }}<small> USD</small></strong></div><ul><li v-for="feature in service.features" :key="feature"><UIcon name="i-lucide-check" />{{ feature }}</li></ul><a class="service-cta" href="#contact" @click="chooseService(service.inquiry)">Let's discuss your project <UIcon name="i-lucide-arrow-up-right" /></a></article></div>
        <div class="ai-service reveal"><div class="ai-icon"><UIcon name="i-lucide-sparkles" /></div><div><span class="eyebrow">BUILDING WHAT'S NEXT</span><h3>AI deployment & training</h3><p>Bring intelligence to your product with AI model training, deployment, and application integration.</p></div><a class="button outline" href="#contact" @click="chooseService('AI deployment & training')">Discuss your AI idea <UIcon name="i-lucide-arrow-up-right" /></a></div><p class="pricing-note">Web and app prices are starting rates. Final scope, timeline, and any additional costs are agreed before work begins.</p>
      </div></section>
      <section id="process" class="section container"><div class="center-heading reveal"><span class="eyebrow">04 / HOW WE WORK</span><h2>From “what if” to what's next.</h2><p>A clear process that keeps your idea moving forward.</p></div><div class="process-grid"><article v-for="(step, index) in steps" :key="step.title" class="process-step reveal"><div class="step-top"><span class="service-icon"><UIcon :name="step.icon" /></span><span class="step-number">0{{ index + 1 }}</span></div><h3>{{ step.title }}</h3><p>{{ step.text }}</p></article></div></section>

      <section id="pos" class="section container pos-section"><div class="pos-panel reveal"><div class="pos-copy"><span class="eyebrow">A HEAD START FOR YOUR BUSINESS</span><h2>Less setup.<br>More doing.</h2><p>Start with a ready-made POS system for your business. Let's walk through your daily operations and find out whether it's the right fit.</p><div class="industry-tags"><span><UIcon name="i-lucide-utensils" /> Restaurants</span><span><UIcon name="i-lucide-building-2" /> Hotels</span><span><UIcon name="i-lucide-dumbbell" /> Gyms</span><span><UIcon name="i-lucide-plus" /> And more</span></div><a class="button" href="#contact" @click="chooseService('Ready-made POS system')">Ask about the POS system <UIcon name="i-lucide-arrow-up-right" /></a></div><div class="pos-price-panel"><UIcon name="i-lucide-store" /><span>READY-MADE POS SYSTEM</span><strong><small>$</small>300</strong><span class="pos-currency">USD · Ready-made software</span><div class="pos-divider" /><p>Tell me your business type, required features, and devices. We’ll confirm the details before you commit.</p><a href="https://wa.me/92487347143?text=Hi%20Waqar%2C%20I%27d%20like%20to%20know%20more%20about%20your%20POS%20system." target="_blank" rel="noopener noreferrer">Let's discuss the fit <UIcon name="i-lucide-arrow-up-right" /></a></div></div></section>
      <section id="faq" class="faq-section section"><div class="container faq-grid"><div class="reveal"><span class="eyebrow">A FEW THINGS YOU MIGHT ASK</span><h2>Good questions.<br>Clear answers.</h2><p>Have something else in mind?<br>I'm happy to talk it through.</p><a class="text-link purple" href="mailto:me@waqarulzafar.com">Ask me a question <UIcon name="i-lucide-arrow-up-right" /></a></div><UAccordion :items="faqs" class="faq-list reveal" :ui="{ trigger: 'py-6 text-base font-semibold cursor-pointer', body: 'pb-6 text-base leading-relaxed text-slate-300', item: 'border-b border-slate-700' }" /></div></section>
      <section id="hire" class="hire-section section"><div class="container"><div class="center-heading reveal"><span class="eyebrow">LET'S WORK TOGETHER</span><h2>Your project. Your preferred platform.</h2><p>Start a conversation directly, or hire me through your preferred freelance platform.</p></div><div class="hire-grid"><a class="hire-card hire-whatsapp reveal" href="https://wa.me/92487347143?text=Hi%20Waqar%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer"><UIcon name="i-simple-icons-whatsapp" class="platform-logo" /><span class="hire-platform">LET'S TALK DIRECTLY</span><h3>Chat on WhatsApp</h3><p>Tell me about your idea, budget, and timeline.</p><span class="hire-action">Start a conversation <UIcon name="i-lucide-arrow-up-right" /></span></a><a class="hire-card hire-upwork reveal" href="https://www.upwork.com/freelancers/~01662324b5aab45fe6?mp_source=share" target="_blank" rel="noopener noreferrer"><UIcon name="i-simple-icons-upwork" class="platform-logo" /><span class="hire-platform">WORK WITH ME</span><h3>Hire me on Upwork</h3><p>View my profile and discuss your project with me on Upwork.</p><span class="hire-action">View my Upwork profile <UIcon name="i-lucide-arrow-up-right" /></span></a><a class="hire-card hire-fiverr reveal" href="https://www.fiverr.com/s/qb87RR2" target="_blank" rel="noopener noreferrer"><UIcon name="i-simple-icons-fiverr" class="platform-logo" /><span class="hire-platform">LET'S BUILD YOUR IDEA</span><h3>Hire me on Fiverr</h3><p>Explore my gig and start your next project with me on Fiverr.</p><span class="hire-action">View my Fiverr gig <UIcon name="i-lucide-arrow-up-right" /></span></a></div></div></section>
      <section id="contact" class="section container contact-grid"><div class="reveal"><span class="eyebrow">LET'S MAKE IT HAPPEN</span><h2>Have an idea?<br>I'm all ears<span class="purple">.</span></h2><p>Tell me what you're thinking. We can talk through the possibilities and find the best way forward.</p><a class="contact-link" href="mailto:me@waqarulzafar.com"><span class="service-icon"><UIcon name="i-lucide-mail" /></span><span><small>DROP ME A LINE</small><strong>me@waqarulzafar.com</strong></span><UIcon name="i-lucide-arrow-up-right" /></a><a class="contact-link whatsapp-contact" href="https://wa.me/92487347143" target="_blank" rel="noopener noreferrer"><span class="service-icon"><UIcon name="i-simple-icons-whatsapp" /></span><span><small>LET'S CHAT ON WHATSAPP</small><strong>Chat with me on WhatsApp</strong><span class="contact-number">+92 487 347143</span></span><UIcon name="i-lucide-arrow-up-right" /></a></div>
        <div class="contact-card reveal"><h3>Let's talk about your project.</h3><p>A few details are all we need to get started.</p><label for="service">I'm interested in</label><select id="service" v-model="selectedService"><option>Website development</option><option>Mobile app development</option><option>Ready-made POS system</option><option>AI deployment & training</option><option>Something else</option></select><label for="brief">Your idea</label><textarea id="brief" v-model="projectBrief" rows="4" placeholder="What would you like to build? Share a little about your project, budget, or timeline." /><a :href="emailLink" class="button">Let's start a conversation <UIcon name="i-lucide-arrow-up-right" /></a><span class="form-note">Opens your email app with your project details.</span></div>
      </section>
      <footer class="footer"><div class="container footer-main"><div><span class="eyebrow">HAVE SOMETHING IN MIND?</span><h2>Let's make something<br>worth putting out there<span class="purple">.</span></h2><a href="mailto:me@waqarulzafar.com" class="footer-email">me@waqarulzafar.com <UIcon name="i-lucide-arrow-up-right" /></a></div><div class="footer-links"><div><strong>Explore</strong><a href="#about">About me</a><a v-if="projects.length" href="#projects">Selected projects</a><a v-else href="#services">Services</a><a href="#process">My process</a><a href="#faq">FAQs</a></div><div><strong>Work with me</strong><a href="#services">Web & app development</a><a href="#pos">POS system</a><a href="#services" @click="chooseService('AI deployment & training')">AI solutions</a><a href="https://wa.me/92487347143" target="_blank" rel="noopener noreferrer">WhatsApp <UIcon name="i-lucide-arrow-up-right" /></a></div></div></div><div class="container footer-inner"><a href="#home" class="brand"><img class="brand-logo" src="/images/waqarulzafar-logo.png" alt="Waqar UL Zafar logo" width="1024" height="1024"><span>waqarulzafar<span class="purple">.</span></span></a><span>© {{ new Date().getFullYear() }} Waqar UL Zafar. All rights reserved.</span><a class="text-link" href="#home">Back to top <UIcon name="i-lucide-arrow-up" /></a></div></footer>
    </main><a class="whatsapp-floating" href="https://wa.me/92487347143" target="_blank" rel="noopener noreferrer" aria-label="Chat with Waqar on WhatsApp"><UIcon name="i-simple-icons-whatsapp" /><span>Let's chat</span></a>
  </div>
</template>
