import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      )
    }

    // Retrieve the Stripe session
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId)

    // Find the order
    const order = await prisma.order.findFirst({
      where: {
        stripeSessionId: sessionId,
        userId: session.user.id,
      },
      include: {
        orderItems: true,
      },
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      orderId: order.id,
      status: order.status,
      totalAmount: order.totalAmount,
      productId: order.orderItems[0]?.productId,
      isBogoOrder: order.isBogoOrder,
      createdAt: order.createdAt,
    })
  } catch (error) {
    console.error('Error fetching session:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}
