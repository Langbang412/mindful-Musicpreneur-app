# The Mindful Musicpreneur® E-Commerce Application

A complete Next.js e-commerce platform for The Mindful Musicpreneur brand, featuring digital product sales, membership management, and a private community portal.

## 🎯 Project Overview

This application provides:
- **E-commerce** for digital products (Guide, Planner, BOGO)
- **BOGO Gift System** with recipient email collection and dual account creation
- **Secure PDF Delivery** with authenticated access
- **Freebie Opt-in** with email capture
- **The Collective** - Application-based membership community with manual approval
- **Member Portal** - Gated access for approved Collective members
- **Admin Dashboard** - Comprehensive management interface
- **Email System** - Automated transactional emails for all interactions
- **User Accounts** - Registration, login, and dashboard
- **Stripe Integration** - Payment processing (test mode ready)

## 🏗️ Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Payments:** Stripe
- **Email:** Resend
- **Styling:** Tailwind CSS with brand design system
- **UI Components:** Radix UI + custom components

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Stripe account (test mode)
- Resend account (or other email service)

### 1. Install Dependencies

```bash
cd /home/ubuntu/mindful_musicpreneur_app/nextjs_space
npm install --legacy-peer-deps
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:

```env
# Database
DATABASE_URL="your-postgresql-connection-string"

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Stripe (Test Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Resend Email
RESEND_API_KEY="re_..."

# Admin
ADMIN_EMAIL="your-email@example.com"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Set Up Database

```bash
# Push schema to database
npx prisma db push

# Generate Prisma client
npx prisma generate

# Seed initial data (products, admin user, portal content)
npx tsx prisma/seed.ts
```

**Default Admin Credentials:**
- Email: `admin@themindfulmusicpreneur.com`
- Password: `admin123` (⚠️ **Change this immediately!**)

### 4. Set Up Stripe Products

1. Go to your [Stripe Dashboard](https://dashboard.stripe.com/test/products)
2. Create products for:
   - The Mindful Musicpreneur Guide ($60)
   - The Mindful Muse Quarterly Planner ($15)
   - BOGO - Buy One, Gift One Guide ($100)
   - The Collective - Monthly ($47/month recurring)
   - The Collective - Yearly ($497/year recurring)
3. Copy the Price IDs and add them to your `.env`:

```env
STRIPE_PRICE_ID_GUIDE="price_..."
STRIPE_PRICE_ID_PLANNER="price_..."
STRIPE_PRICE_ID_BOGO="price_..."
STRIPE_PRICE_ID_COLLECTIVE_MONTHLY="price_..."
STRIPE_PRICE_ID_COLLECTIVE_YEARLY="price_..."
```

### 5. Set Up Stripe Webhooks

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
3. Copy the webhook signing secret to your `.env`:
   ```env
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```

For production, create a webhook endpoint in your Stripe Dashboard pointing to:
`https://yourdomain.com/api/webhooks/stripe`

### 6. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

**Note:** This localhost refers to the computer that's running the application, not your local machine. To access it locally or remotely, you'll need to deploy the application on your own system.

## 📁 Project Structure

```
app/
├── api/              # API routes
│   ├── auth/         # NextAuth routes
│   ├── checkout/     # Checkout session creation
│   ├── webhooks/     # Stripe webhooks
│   └── ...
├── products/         # Product pages (Guide, Planner, BOGO)
├── collective/       # The Collective pages
│   ├── apply/        # Application form
│   └── portal/       # Member portal (gated)
├── dashboard/        # User dashboard
├── admin/            # Admin dashboard
├── auth/             # Auth pages (signin, signup)
├── freebie/          # Freebie opt-in
└── page.tsx          # Homepage

components/
├── layout/           # Header, Footer
├── ui/               # UI components (Button, Card, etc.)
└── forms/            # Form components

lib/
├── prisma.ts         # Prisma client
├── auth-options.ts   # NextAuth configuration
├── stripe.ts         # Stripe utilities
├── email.ts          # Email templates and utilities
├── products.ts       # Product definitions
└── utils.ts          # General utilities

prisma/
├── schema.prisma     # Database schema
└── seed.ts           # Seed script

public/
├── *.png             # Brand images
└── *.txt             # Placeholder PDFs (replace with real PDFs)
```

## 🎨 Brand Design

### Colors
- **Plum:** `#4A1942`
- **Teal:** `#008B8B`
- **Coral:** `#FF6F61`
- **Cream:** `#F5F5DC`
- **Charcoal:** `#333333`
- **Red:** `#ff3131`
- **Blue:** `#f371ff`
- **Tan:** `#c69434`
- **Green:** `#697b2f`
- **Purple:** `#bc13fe`
- **Yellow:** `#dfff00`
- **Turquoise:** `#50dfc4`

### Fonts
- **Headlines:** Playfair Display
- **Body:** Poppins
- **Accent:** Raleway

Use via Tailwind: `font-playfair`, `font-poppins`, `font-raleway`

### Brand Voice
Sophisticated, cheeky, genuine, motivational - "Stevie Nicks meets Brené Brown"

## 🔑 Key Features

### 1. E-Commerce
- Browse and purchase digital products
- Stripe checkout integration
- Secure payment processing
- Instant product delivery

### 2. BOGO Gift System
- Buyer enters recipient's name and email at checkout
- System creates accounts for both buyer and recipient
- Sends personalized emails to each:
  - Buyer: "Thank you for your purchase and gift!"
  - Recipient: "You've received a gift from [Buyer Name]!"
- Both receive instant PDF access
- Both eligible to apply for The Collective

### 3. PDF Delivery
- Secure, authenticated downloads
- Unique links tied to user purchases
- Download tracking
- **Current:** Placeholder text files in `/public/`
- **TODO:** Replace with actual PDFs:
  - `guide.pdf` - The Mindful Musicpreneur Guide
  - `planner.pdf` - The Mindful Muse Quarterly Planner
  - `freebie.pdf` - Free resource

### 4. The Collective
- **Application Process:**
  1. User must own the Guide to apply
  2. Fill out application form (5-7 questions)
  3. Admin reviews in admin dashboard
  4. Admin approves or denies with optional message
  5. Approved members get access to gated portal

- **Member Portal:** (Gated - requires approval)
  - Zoom link for live sessions
  - Welcome message
  - Resources
  - Substack link
  - Upcoming events

- **Admin Controls:**
  - Review applications
  - Approve/deny with messages
  - Manually grant/revoke portal access
  - Manage portal content

### 5. Email System
Automated emails for:
- Guide purchase (buyer)
- Planner purchase
- BOGO purchase (buyer)
- BOGO gift (recipient)
- Freebie delivery
- Collective application received
- Collective application approved
- Collective application denied
- All emails include unsubscribe links

### 6. Admin Dashboard
- View/manage all orders
- View/manage all users
- Review Collective applications
- Approve/deny applications
- Manage member portal access
- Manage portal content (Zoom link, messages, resources)
- Email list management with export
- Unsubscribe management
- Basic analytics

### 7. User Dashboard
- View purchase history
- Download PDFs
- Manage profile
- Apply for The Collective
- Access member portal (if approved)

## 🔒 Security Notes

1. **Change Default Admin Password:** The seeded admin account uses `admin123` - change this immediately in production!
2. **Environment Variables:** Never commit `.env` file to version control
3. **Stripe Keys:** Use test keys for development, live keys for production
4. **PDF Access:** All PDF downloads require authentication
5. **Admin Access:** Implement proper admin role checking

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms
- Ensure PostgreSQL database is accessible
- Set all environment variables
- Run `npm run build`
- Start with `npm start`

## 📧 Email Configuration

### Using Resend (Recommended)
1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Verify your domain
4. Update `FROM_EMAIL` in `lib/email.ts`

### Using SendGrid or Other
Replace Resend with your preferred email service in `lib/email.ts`

## 🔄 Stripe Webhook Events

The app listens for these Stripe events:
- `checkout.session.completed` - Order completion
- `customer.subscription.created` - Collective membership start
- `customer.subscription.deleted` - Collective membership cancellation
- `customer.subscription.updated` - Collective membership changes

Webhook handler: `/app/api/webhooks/stripe/route.ts`

## 📝 TODO / Next Steps

### High Priority
1. **Replace placeholder PDFs** with actual PDF files
2. **Configure Stripe products** and add Price IDs to `.env`
3. **Set up Resend** and verify sending domain
4. **Test BOGO flow** end-to-end
5. **Test Collective application** and approval workflow
6. **Change admin password**

### Additional Pages to Build
- [ ] Product detail pages with full copy
- [ ] The Collective full page with detailed info
- [ ] Freebie opt-in page
- [ ] Checkout pages with BOGO recipient fields
- [ ] Thank you pages
- [ ] Terms & Privacy pages
- [ ] Complete user dashboard
- [ ] Complete admin dashboard
- [ ] API routes for all features

### Features to Implement
- [ ] Shopping cart (currently direct checkout)
- [ ] Payment history in dashboard
- [ ] Email list export (CSV)
- [ ] Analytics dashboard
- [ ] Content management for portal
- [ ] PDF upload interface for admin
- [ ] Member directory (optional)

### Testing Needed
- [ ] End-to-end purchase flow
- [ ] BOGO dual account creation
- [ ] Email delivery for all scenarios
- [ ] Collective application workflow
- [ ] Member portal access control
- [ ] PDF download security
- [ ] Stripe webhook handling

## 🆘 Troubleshooting

### Database Issues
```bash
# Reset database
npx prisma db push --force-reset
npx prisma generate
npx tsx prisma/seed.ts
```

### Prisma Client Issues
```bash
npx prisma generate
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📞 Support

For questions about:
- **The Application:** Check this README
- **Stripe:** [Stripe Docs](https://stripe.com/docs)
- **Next.js:** [Next.js Docs](https://nextjs.org/docs)
- **Prisma:** [Prisma Docs](https://www.prisma.io/docs)

## 📄 License

Copyright © 2026 The Mindful Musicpreneur®. All rights reserved.

---

Built with ♥ for female+ musicians everywhere.
