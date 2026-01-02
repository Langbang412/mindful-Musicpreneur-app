import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import {
  sendGuidePurchaseEmail,
  sendPlannerPurchaseEmail,
  sendBogoBuyerEmail,
  sendBogoRecipientEmail,
} from '@/lib/email'
import bcrypt from 'bcryptjs'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = headers().get('stripe-signature')!

    let event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object)
        break

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        // Handle Collective subscription changes
        await handleSubscriptionChange(event.data.object)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: any) {
  const orderId = session.metadata?.orderId
  const userId = session.metadata?.userId
  const productId = session.metadata?.productId
  const isBogoOrder = session.metadata?.isBogoOrder === 'true'

  if (!orderId || !userId) {
    console.error('Missing orderId or userId in webhook metadata')
    return
  }

  // Update order status
  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: 'completed',
      completedAt: new Date(),
      paymentIntentId: session.payment_intent,
    },
  })

  // Grant access to user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    console.error('User not found:', userId)
    return
  }

  // Update user access based on product
  const updates: any = {}

  switch (productId) {
    case 'guide':
      updates.ownsGuide = true
      updates.ownsPlanner = true // Guide includes planner
      break
    case 'planner':
      updates.ownsPlanner = true
      break
    case 'bogo':
      updates.ownsGuide = true
      updates.ownsPlanner = true
      break
    case 'freebie':
      updates.ownsFreebie = true
      break
  }

  await prisma.user.update({
    where: { id: userId },
    data: updates,
  })

  // Handle BOGO - create recipient account and grant access
  if (isBogoOrder) {
    const recipientEmail = session.metadata?.recipientEmail
    const recipientFirstName = session.metadata?.recipientFirstName

    if (recipientEmail && recipientFirstName) {
      // Check if recipient user already exists
      let recipientUser = await prisma.user.findUnique({
        where: { email: recipientEmail.toLowerCase() },
      })

      if (!recipientUser) {
        // Create new user for recipient with random password
        const tempPassword = Math.random().toString(36).slice(-12)
        const hashedPassword = await bcrypt.hash(tempPassword, 10)

        recipientUser = await prisma.user.create({
          data: {
            email: recipientEmail.toLowerCase(),
            firstName: recipientFirstName,
            password: hashedPassword,
            ownsGuide: true,
            ownsPlanner: true,
          },
        })
      } else {
        // Update existing user
        recipientUser = await prisma.user.update({
          where: { id: recipientUser.id },
          data: {
            ownsGuide: true,
            ownsPlanner: true,
          },
        })
      }

      // Update order with recipient user ID
      await prisma.order.update({
        where: { id: orderId },
        data: { recipientUserId: recipientUser.id },
      })

      // Send emails to both buyer and recipient
      await sendBogoBuyerEmail({
        email: user.email,
        firstName: user.firstName,
        recipientFirstName,
        userId: user.id,
      })

      await sendBogoRecipientEmail({
        email: recipientEmail,
        firstName: recipientFirstName,
        buyerFirstName: user.firstName,
        userId: recipientUser.id,
      })
    }
  } else {
    // Send appropriate email based on product
    switch (productId) {
      case 'guide':
        await sendGuidePurchaseEmail({
          email: user.email,
          firstName: user.firstName,
          userId: user.id,
        })
        break
      case 'planner':
        await sendPlannerPurchaseEmail({
          email: user.email,
          firstName: user.firstName,
          userId: user.id,
        })
        break
    }
  }
}

async function handleSubscriptionChange(subscription: any) {
  // Handle Collective subscription updates
  const userId = subscription.metadata?.userId

  if (!userId) {
    console.error('Missing userId in subscription metadata')
    return
  }

  const isActive = subscription.status === 'active'

  await prisma.user.update({
    where: { id: userId },
    data: {
      isCollectiveMember: isActive,
      collectiveStripeSubscriptionId: subscription.id,
    },
  })
}
