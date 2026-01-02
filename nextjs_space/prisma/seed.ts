import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Clean existing data (optional - comment out if you want to keep existing data)
  await prisma.pDFDownload.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.collectiveApplication.deleteMany()
  await prisma.emailSubscriber.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()
  await prisma.portalContent.deleteMany()
  await prisma.siteSettings.deleteMany()

  // Create Products
  console.log('Creating products...')
  
  const guide = await prisma.product.create({
    data: {
      name: 'The Mindful Musicpreneur Guide',
      slug: 'guide',
      description: '200+ page career-shadow field guide for female musicians',
      price: 60,
      type: 'guide',
      active: true,
    },
  })

  const planner = await prisma.product.create({
    data: {
      name: 'The Mindful Muse Quarterly Planner',
      slug: 'planner',
      description: 'Quarterly planner designed for musicians lives & schedules',
      price: 15,
      type: 'planner',
      active: true,
    },
  })

  const bogo = await prisma.product.create({
    data: {
      name: 'BOGO - Buy One, Gift One Guide',
      slug: 'bogo',
      description: 'Get the Guide for yourself and gift one to another artist',
      price: 100,
      type: 'bogo',
      active: true,
    },
  })

  const freebie = await prisma.product.create({
    data: {
      name: 'Free Resource',
      slug: 'freebie',
      description: 'Get started with our free resource for female musicians',
      price: 0,
      type: 'freebie',
      active: true,
    },
  })

  const collectiveMonthly = await prisma.product.create({
    data: {
      name: 'The Collective - Monthly',
      slug: 'collective-monthly',
      description: 'Monthly membership to The Collective community',
      price: 47,
      type: 'collective_monthly',
      active: true,
    },
  })

  const collectiveYearly = await prisma.product.create({
    data: {
      name: 'The Collective - Yearly',
      slug: 'collective-yearly',
      description: 'Annual membership to The Collective community',
      price: 497,
      type: 'collective_yearly',
      active: true,
    },
  })

  console.log('Products created ✓')

  // Create Admin User
  console.log('Creating admin user...')
  const adminPassword = await bcrypt.hash('Admin123!', 10)
  
  const adminUser = await prisma.user.create({
    data: {
      email: process.env.ADMIN_EMAIL || 'admin@themindfulmusicpreneur.com',
      firstName: 'Admin',
      lastName: 'User',
      password: adminPassword,
      ownsGuide: true,
      ownsPlanner: true,
      isCollectiveMember: true,
    },
  })

  console.log('Admin user created ✓')
  console.log(`Admin email: ${adminUser.email}`)
  console.log('Admin password: Admin123!')

  // Create Test User
  console.log('Creating test user...')
  const testPassword = await bcrypt.hash('Test123!', 10)
  
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: testPassword,
      ownsGuide: true,
      ownsPlanner: true,
    },
  })

  console.log('Test user created ✓')
  console.log('Test email: test@example.com')
  console.log('Test password: Test123!')

  // Create Portal Content
  console.log('Creating portal content...')
  
  await prisma.portalContent.create({
    data: {
      key: 'zoom_url',
      value: 'https://zoom.us/j/your-meeting-id',
    },
  })

  await prisma.portalContent.create({
    data: {
      key: 'welcome_message',
      value: "Welcome to The Collective! This is your space for real talk, radical responsibility, and supporting each other's wins. We're thrilled to have your energy in the room.",
    },
  })

  await prisma.portalContent.create({
    data: {
      key: 'substack_url',
      value: 'https://themindfulmusicpreneur.substack.com',
    },
  })

  console.log('Portal content created ✓')

  // Create Sample Test Order
  console.log('Creating sample order...')
  
  const sampleOrder = await prisma.order.create({
    data: {
      userId: testUser.id,
      status: 'completed',
      totalAmount: 60,
      currency: 'usd',
      completedAt: new Date(),
      orderItems: {
        create: {
          productId: guide.id,
          quantity: 1,
          price: 60,
        },
      },
    },
  })

  console.log('Sample order created ✓')

  // Create Sample Email Subscribers
  console.log('Creating email subscribers...')
  
  await prisma.emailSubscriber.createMany({
    data: [
      {
        email: adminUser.email,
        firstName: adminUser.firstName,
        source: 'signup',
        subscribed: true,
      },
      {
        email: testUser.email,
        firstName: testUser.firstName,
        source: 'signup',
        subscribed: true,
      },
    ],
  })

  console.log('Email subscribers created ✓')

  console.log('')
  console.log('✅ Database seed completed successfully!')
  console.log('')
  console.log('=== Test Accounts ===')
  console.log('Admin User:')
  console.log(`  Email: ${adminUser.email}`)
  console.log('  Password: Admin123!')
  console.log('')
  console.log('Test User:')
  console.log('  Email: test@example.com')
  console.log('  Password: Test123!')
  console.log('')
  console.log('=== Next Steps ===')
  console.log('1. Start the development server: npm run dev')
  console.log('2. Sign in with admin credentials')
  console.log('3. Test the checkout flow with Stripe test cards')
  console.log('4. Upload PDF files to /storage/pdfs/ directory')
  console.log('')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
