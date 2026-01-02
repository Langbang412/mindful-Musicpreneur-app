# 🚀 Quick Start - Deploy in 15 Minutes

This is a condensed version of the deployment process. For detailed instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md).

---

## ⚡ Prerequisites Setup (5 minutes)

### 1. Create Accounts (if you don't have them already)

- **GitHub**: [github.com/signup](https://github.com/signup)
- **Vercel**: [vercel.com/signup](https://vercel.com/signup) (sign up with GitHub)
- **Database**: [neon.tech](https://neon.tech) - Create a project, copy connection string
- **Stripe**: [dashboard.stripe.com/register](https://dashboard.stripe.com/register) - Get API keys
- **Resend**: [resend.com/signup](https://resend.com/signup) - Get API key

---

## 📦 Step 1: Push to GitHub (2 minutes)

### Option A: Use the Helper Script

```bash
cd /home/ubuntu/mindful_musicpreneur_app/nextjs_space
./deploy-to-github.sh
```

### Option B: Manual Method

1. Create a new repository on GitHub: [github.com/new](https://github.com/new)
2. Name it: `mindful-musicpreneur-app`
3. Don't initialize with README
4. Run these commands:

```bash
cd /home/ubuntu/mindful_musicpreneur_app/nextjs_space
git remote add origin https://github.com/YOUR_USERNAME/mindful-musicpreneur-app.git
git push -u origin master
```

---

## ☁️ Step 2: Deploy to Vercel (3 minutes)

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings - don't change anything
5. **Don't deploy yet!** First, add environment variables...

---

## 🔑 Step 3: Add Environment Variables (5 minutes)

Before clicking Deploy, add these environment variables in Vercel:

```env
# Database (from Neon)
DATABASE_URL=postgresql://user:password@host/database

# Generate this: openssl rand -base64 32
NEXTAUTH_SECRET=your-generated-secret-here

# You'll update this after first deploy
NEXTAUTH_URL=https://your-app.vercel.app

# From Stripe Dashboard → Developers → API Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# From Stripe → Developers → Webhooks (create endpoint first)
STRIPE_WEBHOOK_SECRET=whsec_...

# From Resend Dashboard → API Keys
RESEND_API_KEY=re_...

# Your email
ADMIN_EMAIL=your-email@example.com

# You'll update this after first deploy
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**Important**: 
- Generate `NEXTAUTH_SECRET`: Run `openssl rand -base64 32` in terminal
- For `STRIPE_WEBHOOK_SECRET`: 
  1. In Stripe Dashboard, go to Webhooks
  2. Add endpoint: `https://your-app.vercel.app/api/stripe/webhook` (use placeholder URL for now)
  3. Select events: `checkout.session.completed` and `payment_intent.succeeded`
  4. Copy the signing secret

---

## 🎯 Step 4: Deploy! (1 minute)

1. Click **"Deploy"** in Vercel
2. Wait 2-5 minutes for build to complete
3. Copy your deployed URL (e.g., `https://mindful-musicpreneur-abc123.vercel.app`)

---

## 🔄 Step 5: Post-Deployment Updates (4 minutes)

### 5.1 Update Environment Variables in Vercel

1. Go to **Settings** → **Environment Variables**
2. Update these two variables with your actual Vercel URL:
   - `NEXTAUTH_URL` → Your actual URL
   - `NEXT_PUBLIC_APP_URL` → Your actual URL
3. **Redeploy**: Go to Deployments tab → Click ⋯ on latest → "Redeploy"

### 5.2 Update Stripe Webhook

1. Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Edit your webhook endpoint
3. Update URL to: `https://your-actual-url.vercel.app/api/stripe/webhook`
4. Save

### 5.3 Initialize Database

Run these commands on your local machine (make sure your .env has the production DATABASE_URL):

```bash
cd /home/ubuntu/mindful_musicpreneur_app/nextjs_space
npx prisma migrate deploy
npx prisma db seed
```

---

## ✅ Step 6: Test Everything!

### Test Homepage
Visit: `https://your-url.vercel.app`

### Test Admin Login
1. Go to: `https://your-url.vercel.app/admin/login`
2. Email: `admin@themindfulmusicpreneur.com`
3. Password: `Admin123!` (or what you set in seed file)

### Test Stripe Payment (Test Mode)
1. Add a product to cart
2. Go to checkout
3. Use test card: `4242 4242 4242 4242`
4. Expiry: Any future date, CVC: Any 3 digits
5. Complete payment and verify email received

---

## 🎉 You're Live!

Your app is now deployed and accessible worldwide!

### Making Updates

Just push to GitHub and Vercel auto-deploys:

```bash
git add .
git commit -m "Your changes"
git push origin master
```

---

## 🚨 Common Issues & Quick Fixes

| Issue | Solution |
|-------|----------|
| Build fails | Check Vercel build logs, ensure all dependencies in package.json |
| Database connection error | Verify DATABASE_URL is correct and includes `?sslmode=require` |
| Auth not working | Clear cookies, verify NEXTAUTH_URL matches your deployed URL |
| Stripe webhook fails | Check webhook URL and secret are correct |
| Emails not sending | Verify Resend API key and sender domain is verified |

---

## 📚 Need More Details?

See the complete guide: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

---

## 🎯 Checklist

Before considering deployment complete:

- [ ] App loads at Vercel URL
- [ ] Admin login works
- [ ] Products display correctly
- [ ] Can add products to cart
- [ ] Stripe checkout works with test card
- [ ] Confirmation email received
- [ ] Order appears in admin dashboard
- [ ] All environment variables set correctly
- [ ] Stripe webhook endpoint updated
- [ ] Database migrations run successfully

---

**Happy deploying! 🚀**
