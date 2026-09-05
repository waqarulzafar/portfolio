export interface PortfolioProject {
  name: string
  category: string
  description: string
  contribution: string
  technologies: string[]
  image?: string
  url?: string
  icon: string
  demo?: boolean
}

// Replace these demo entries with real work, screenshots and links before public launch.
export const projects: PortfolioProject[] = [
  { name: 'Restaurant POS', category: 'Business software', description: 'A concept for managing restaurant orders, tables, and daily sales from one place.', contribution: 'Demo project · Illustrative content', technologies: ['Laravel', 'Vue.js'], icon: 'i-lucide-store', demo: true },
  { name: 'Everyday Fitness', category: 'Android & iOS application', description: 'A concept mobile app for workout plans, activity tracking, and personal fitness goals.', contribution: 'Demo project · Illustrative content', technologies: ['Flutter', 'Laravel'], icon: 'i-lucide-dumbbell', demo: true },
  { name: 'Intelligent Support', category: 'AI-powered application', description: 'A concept support assistant that helps visitors find answers and connect with a business.', contribution: 'Demo project · Illustrative content', technologies: ['Next.js', 'AI integration'], icon: 'i-lucide-sparkles', demo: true }
]
