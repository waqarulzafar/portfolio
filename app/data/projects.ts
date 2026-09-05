export interface PortfolioProject {
  name: string
  category: string
  description: string
  technologies: string[]
  image: string
  imageWidth: number
  imageHeight: number
  imageAlt: string
  forSale?: boolean
}

export const projects: PortfolioProject[] = [
  {
    name: 'Taskr',
    category: 'Freelance marketplace',
    description: 'A marketplace connecting freelancers with businesses looking for talent in web development, mobile apps, AI, data, and more.',
    technologies: ['Laravel', 'Vue.js', 'MySQL', 'Bootstrap'],
    image: '/images/projects/taskr.png',
    imageWidth: 1254,
    imageHeight: 1254,
    imageAlt: 'Taskr freelance marketplace with talent search, freelancer profiles, and service categories'
  },
  {
    name: 'Asan POS',
    category: 'Point-of-sale software',
    description: 'A point-of-sale system for retail, grocery, restaurants, and service businesses. Manage products, sales, inventory, customers, and reports in one place.',
    technologies: ['Sales & billing', 'Inventory', 'Customer management', 'Reports'],
    image: '/images/projects/asan-pos.png',
    imageWidth: 1672,
    imageHeight: 941,
    imageAlt: 'Asan POS showing the sales checkout, product catalog, receipt printer, and business management features',
    forSale: true
  },
  {
    name: 'Restaurant POS System',
    category: 'Restaurant management software',
    description: 'A restaurant point-of-sale system for dine-in, takeaway, and delivery orders. Manage orders, accept cash, card, and wallet payments, and track sales with live reports.',
    technologies: ['Order management', 'Multiple payments', 'Live reports', 'Touch-friendly'],
    image: '/images/projects/restaurant-pos.png',
    imageWidth: 1448,
    imageHeight: 1086,
    imageAlt: 'Restaurant POS System showing a food menu, running orders, table selection, payments, and sales reporting features'
  }
]
