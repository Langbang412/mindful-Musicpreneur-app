import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create products
  const products = [
    {
      name: 'The Mindful Musicpreneur Guide',
      slug: 'mindful-musicpreneur-guide',
      description: '200+ page career-shadow field guide for female musicians',
      price: 60.00,
      type: 'guide',
      active: true,
    },
    {
      name: 'The Mindful Muse Quarterly Planner',
      slug: 'mindful-muse-quarterly-planner',
      description: 'Quarterly planner designed for musicians lives & schedules',
      price: 15.00,
      type: 'planner',
      active: true,
    },
    {
      name: 'BOGO - Buy One, Gift One Guide',
      slug: 'bogo-buy-one-gift-one',
      description: 'Get the Guide for yourself and gift one to another artist',
      price: 100.00,
      type: 'bogo',
      active: true,
    },
    {
      name: 'Free Resource',
      slug: 'freebie',
      description: 'Get started with our free resource for female musicians',
      price: 0.00,
      type: 'freebie',
      active: true,
    },
    {
      name: 'The Collective - Monthly',
      slug: 'the-collective-monthly',
      description: 'Monthly membership to The Collective',
      price: 47.00,
      type: 'collective_monthly',
      active: true,
    },
    {
      name: 'The Collective - Yearly',
      slug: 'the-collective-yearly',
      description: 'Yearly membership to The Collective (save $67)',
      price: 497.00,
      type: 'collective_yearly',
      active: true,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    })
    console.log(`✓ Created/updated product: ${product.name}`)
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@themindfulmusicpreneur.com' },
    update: {},
    create: {
      email: 'admin@themindfulmusicpreneur.com',
      firstName: 'Admin',
      lastName: 'User',
      password: hashedPassword,
    },
  })
  console.log(`✓ Created admin user: ${adminUser.email}`)

  // Create portal content defaults
  const portalContents = [
    {
      key: 'zoom_url',
      value: 'https://zoom.us/j/your-meeting-id',
    },
    {
      key: 'welcome_message',
      value: 'Welcome to The Collective! This is your green room - a space for real talk, radical responsibility, and supporting each other\'s wins.',
    },
    {
      key: 'substack_url',
      value: 'https://themindfulmusicpreneur.substack.com',
    },
  ]

  for (const content of portalContents) {
    await prisma.portalContent.upsert({
      where: { key: content.key },
      update: { value: content.value },
      create: content,
    })
    console.log(`✓ Created/updated portal content: ${content.key}`)
  }

  console.log('✅ Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
