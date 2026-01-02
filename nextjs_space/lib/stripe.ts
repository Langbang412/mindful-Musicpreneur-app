import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

// Product type to Stripe Price ID mapping
export const STRIPE_PRICE_IDS = {
  guide: process.env.STRIPE_PRICE_ID_GUIDE || '',
  planner: process.env.STRIPE_PRICE_ID_PLANNER || '',
  bogo: process.env.STRIPE_PRICE_ID_BOGO || '',
  collective_monthly: process.env.STRIPE_PRICE_ID_COLLECTIVE_MONTHLY || '',
  collective_yearly: process.env.STRIPE_PRICE_ID_COLLECTIVE_YEARLY || '',
}

// Create checkout session for products
export async function createCheckoutSession({
  userId,
  email,
  productType,
  successUrl,
  cancelUrl,
  metadata = {},
}: {
  userId: string
  email: string
  productType: 'guide' | 'planner' | 'bogo' | 'collective_monthly' | 'collective_yearly'
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string>
}) {
  const priceId = STRIPE_PRICE_IDS[productType]
  
  if (!priceId) {
    throw new Error(`Price ID not configured for product: ${productType}`)
  }

  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: productType.startsWith('collective_') ? 'subscription' : 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
      productType,
      ...metadata,
    },
  })

  return session
}

// Verify webhook signature
export function verifyWebhookSignature(payload: string | Buffer, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  
  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not defined')
  }

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
}
