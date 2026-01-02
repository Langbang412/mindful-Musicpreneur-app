# The Mindful Musicpreneur - Full Stack E-Commerce Application

A comprehensive Next.js 14 e-commerce platform for digital products with integrated payment processing, user authentication, and membership management.

## 🎯 Overview

The Mindful Musicpreneur is a 360° system for female musicians, featuring:

- **Digital Product Sales**: Guide, Planner, BOGO packages
- **Subscription Management**: The Collective monthly/yearly memberships
- **User Dashboard**: Secure PDF downloads and account management
- **Application System**: Curated community access with admin approval
- **Member Portal**: Gated content for approved members
- **Email Automation**: Transaction and marketing emails via Resend
- **Admin Dashboard**: Order, user, and content management

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe Checkout & Webhooks
- **Email**: Resend
- **Styling**: Tailwind CSS + shadcn/ui components
- **Deployment**: Vercel (recommended) or any Node.js host

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Stripe account (test mode for development)
- Resend account for emails

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd mindful_musicpreneur_app/nextjs_space
npm install
```

### 2. Environment Setup

Create `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mindful_musicpreneur"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-generate-with-openssl"
NEXTAUTH_URL="http://localhost:3000"

# Stripe (Get from https://dashboard.stripe.com/test/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..." # Get after setting up webhook

# Resend (Get from https://resend.com/api-keys)
RESEND_API_KEY="re_..."

# Admin
ADMIN_EMAIL="your-admin-email@example.com"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Database Setup

```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Seed database with test data
npm run prisma:seed
```

This creates:
- Admin user: Email from ADMIN_EMAIL, Password: `Admin123!`
- Test user: `test@example.com`, Password: `Test123!`
- All products (Guide, Planner, BOGO, Freebie, Collective)
- Sample portal content

### 4. Upload PDF Files

Place your PDF files in `/storage/pdfs/`:

```
storage/pdfs/
├── The_Mindful_Musicpreneur_Guide.pdf
├── The_Mindful_Muse_Quarterly_Planner.pdf
└── Mindful_Musicpreneur_Freebie.pdf
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Test User Accounts

**Admin Account:**
- Email: (value from ADMIN_EMAIL)
- Password: `Admin123!`
- Access: Full admin dashboard

**Regular User:**
- Email: `test@example.com`
- Password: `Test123!`
- Access: User dashboard (owns Guide + Planner)

### Stripe Test Cards

Use these test card numbers in checkout:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0027 6000 3184`

Use any future expiry date, any 3-digit CVC, and any ZIP code.

### Test Workflows

1. **Purchase Flow**
   - Sign up → Browse products → Checkout → Payment → Success page → Dashboard → Download PDFs

2. **BOGO Flow**
   - Purchase BOGO → Enter recipient email → Both receive accounts → Both receive emails → Both can download

3. **Collective Application**
   - Own Guide → Apply to Collective → Admin reviews → Approve → Member accesses portal

4. **Admin Flow**
   - Sign in as admin → View dashboard → Review applications → Manage users → Update content

## 🔧 Development

### Database Management

```bash
# View/edit database in browser
npx prisma studio

# Create new migration
npx prisma migrate dev --name description

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Deploy migrations (production)
npx prisma migrate deploy
```

### Useful Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## 📦 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Import project at [vercel.com/new](https://vercel.com/new)
   - Add all environment variables
   - Deploy!

3. **Set up production database**
   - Create PostgreSQL database (recommend [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) or [Neon](https://neon.tech))
   - Update `DATABASE_URL` in Vercel
   - Run migrations: `npx prisma migrate deploy`
   - Seed: `npm run prisma:seed`

4. **Configure Stripe Webhook**
   - Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Copy signing secret to `STRIPE_WEBHOOK_SECRET`

5. **Update Environment Variables**
   - Set `NEXTAUTH_URL` to your domain
   - Set `NEXT_PUBLIC_APP_URL` to your domain
   - Switch Stripe keys to production mode

### Alternative Hosting

For other platforms (Railway, Render, AWS, etc.):

1. Build the application: `npm run build`
2. Set all environment variables
3. Run migrations: `npx prisma migrate deploy`
4. Start: `npm start`

## 🎨 Customization

### Brand Colors

Edit `/tailwind.config.ts`:

```typescript
colors: {
  brand: {
    plum: '#4A1942',
    teal: '#008B8B',
    coral: '#FF6F61',
    // ... add more
  },
}
```

### Email Templates

Edit `/lib/email.ts` to customize:
- Email subject lines
- HTML content
- Styling

### Product Information

Edit `/lib/products.ts` to update:
- Product names and descriptions
- Pricing
- Features included
- Images

### Portal Content

Manage via admin dashboard or database:
- Zoom meeting URLs
- Welcome messages
- Resource links

## 📝 Key Features

### User Features
- ✅ Account creation and authentication
- ✅ Product browsing and purchasing
- ✅ Secure Stripe checkout
- ✅ PDF downloads from dashboard
- ✅ BOGO gifting system
- ✅ Collective application process
- ✅ Member-only portal access
- ✅ Email notifications
- ✅ Unsubscribe management

### Admin Features
- ✅ Dashboard with statistics
- ✅ Order management
- ✅ User management
- ✅ Application review system
- ✅ Content management
- ✅ Email list export
- ⏳ Advanced analytics (coming soon)
- ⏳ Bulk operations (coming soon)

## 🔐 Security

- Passwords hashed with bcrypt
- Session-based authentication via NextAuth
- API routes protected with authentication checks
- Admin routes restricted to authorized emails
- Stripe webhook signature verification
- SQL injection protection via Prisma
- XSS protection via React/Next.js

## 📊 Database Schema

Key models:
- **User**: Account information, access levels
- **Product**: Digital products and pricing
- **Order**: Purchase records and status
- **CollectiveApplication**: Membership applications
- **PortalContent**: Dynamic portal configuration
- **EmailSubscriber**: Marketing email list
- **PDFDownload**: Download tracking

View full schema in `/prisma/schema.prisma`

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Test connection
npx prisma db pull

# Reset if needed
npx prisma migrate reset
```

### Stripe Webhook Not Working
- Verify webhook secret matches Stripe dashboard
- Check webhook endpoint is accessible (use ngrok for local testing)
- View webhook logs in Stripe dashboard

### Emails Not Sending
- Verify RESEND_API_KEY is correct
- Check Resend dashboard for delivery logs
- Ensure "from" email is verified in Resend

### Admin Access Issues
- Verify ADMIN_EMAIL matches your user email exactly
- Check isAdmin() function in `/lib/admin.ts`

## 📞 Support

- **Issues**: Open an issue in the GitHub repository
- **Email**: hello@themindfulmusicpreneur.com
- **Documentation**: See `/FINAL_BUILD_STATUS.md` for detailed status

## 📄 License

Copyright © 2026 The Mindful Musicpreneur®. All rights reserved.

## 🙏 Acknowledgments

- Built with Next.js, Prisma, Stripe, and Resend
- UI components from shadcn/ui
- Icons from Lucide React

---

**Built with ♥ for female+ musicians everywhere.**
