import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { productId, recipientInfo } = body

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const product = PRODUCTS[productId as keyof typeof PRODUCTS]
    if (!product) {
      return NextResponse.json(
        { error: 'Invalid product' },
        { status: 400 }
      )
    }

    // Validate BOGO recipient info
    const isBogo = productId === 'bogo'
    if (isBogo) {
      if (!recipientInfo?.firstName || !recipientInfo?.email) {
        return NextResponse.json(
          { error: 'Recipient information required for BOGO' },
          { status: 400 }
        )
      }
    }

    // Get or create Stripe product and price
    let priceId: string
    const price = product.price;
    // For this implementation, we'll create prices on-the-fly
    // In production, you'd want to pre-create these in Stripe Dashboard
    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
      metadata: {
        productId,
      },
    })

    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(price * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        productId,
      },
    })

    priceId = stripePrice.id

    // Create pending order in database
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: 'pending',
        totalAmount: price,
        currency: 'usd',
        isBogoOrder: isBogo,
        recipientEmail: recipientInfo?.email || null,
        recipientFirstName: recipientInfo?.firstName || null,
        orderItems: {
          create: {
            productId: productId,
            quantity: 1,
            price,
          },
        },
      },
    })

    // Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: session.user.email || undefined,
      client_reference_id: order.id,
      metadata: {
        orderId: order.id,
        userId: session.user.id,
        productId,
        ...(isBogo && recipientInfo ? {
          isBogoOrder: 'true',
          recipientEmail: recipientInfo.email,
          recipientFirstName: recipientInfo.firstName,
        } : {}),
      },
      success_url: `${APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/checkout?product=${productId}&cancelled=true`,
    })

    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: checkoutSession.id },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
