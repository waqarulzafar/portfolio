/** Production identity shared by canonical, social and structured metadata. */
export function usePortfolioSeo() {
  const origin = 'https://waqarulzafar.com'
  const url = `${origin}/`
  const title = 'Waqar UL Zafar | Full-Stack & Mobile App Developer'
  const description = 'Hire Waqar UL Zafar, a developer with 7 years of experience in Laravel, React, Nuxt, Flutter and AI. Websites from $100 and mobile apps from $150.'
  const image = `${origin}/images/waqarulzafar-logo.png`
  const personId = `${url}#person`

  useSeoMeta({
    title,
    description,
    author: 'Waqar UL Zafar',
    robots: 'index, follow, max-image-preview:large',
    themeColor: '#242522',
    ogType: 'website',
    ogSiteName: 'Waqar UL Zafar',
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogLocale: 'en_US',
    ogImage: image,
    ogImageSecureUrl: image,
    ogImageType: 'image/png',
    ogImageWidth: 1024,
    ogImageHeight: 1024,
    ogImageAlt: 'Waqar UL Zafar — full-stack and mobile app developer',
    twitterCard: 'summary',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterImageAlt: 'Waqar UL Zafar developer logo'
  })

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person', '@id': personId,
        name: 'Waqar UL Zafar', alternateName: 'waqarulzafar', url,
        jobTitle: 'Full-Stack and Mobile App Developer',
        description: 'Developer with 7 years of experience in web applications, Android and iOS apps, and AI solutions.',
        image: `${origin}/images/waqar-ul-zafar-cutout.png`,
        email: 'me@waqarulzafar.com', telephone: '+92487347143',
        knowsAbout: ['Laravel', 'Nuxt.js', 'Next.js', 'React', 'Vue.js', 'Flutter', 'Kotlin', 'Android development', 'iOS development', 'AI deployment', 'AI model training'],
        sameAs: ['https://www.upwork.com/freelancers/~01662324b5aab45fe6'],
        subjectOf: { '@type': 'WebPage', url: 'https://www.fiverr.com/s/qb87RR2', name: 'Waqar UL Zafar on Fiverr' }
      },
      {
        '@type': 'WebSite', '@id': `${url}#website`, url,
        name: 'Waqar UL Zafar', alternateName: 'waqarulzafar',
        inLanguage: 'en', publisher: { '@id': personId }
      },
      {
        '@type': 'ProfilePage', '@id': `${url}#webpage`, url,
        name: title, description, inLanguage: 'en',
        mainEntity: { '@id': personId },
        isPartOf: { '@id': `${url}#website` }
      },
      ...[
        ['web-development', 'Web design and development', 'Responsive websites and custom web applications using Laravel, Nuxt.js, Next.js, React and Vue.js. Starting from USD 100.'],
        ['mobile-development', 'Mobile app development', 'Android and iOS application development using Flutter and native Android Kotlin. Starting from USD 150.'],
        ['pos-system', 'Ready-made POS system', 'Ready-made POS software for restaurants, hotels, gyms and other businesses, offered at USD 300. Suitability and any customization costs are confirmed before purchase.'],
        ['ai-development', 'AI deployment and training', 'AI model training, deployment and integration with web and mobile applications.']
      ].map(([id, name, serviceDescription]) => ({
        '@type': 'Service', '@id': `${url}#${id}`, name,
        description: serviceDescription,
        provider: { '@id': personId },
        url: `${url}${id === 'pos-system' ? '#pos' : '#services'}`
      }))
    ]
  }
  useHead({
    link: [{ rel: 'canonical', href: url }],
    script: [{ key: 'portfolio-schema', type: 'application/ld+json', innerHTML: JSON.stringify(graph).replace(/</g, '\\u003c') }]
  })
}
