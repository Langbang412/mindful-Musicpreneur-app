import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Update email subscriber
    await prisma.emailSubscriber.updateMany({
      where: { email: email.toLowerCase() },
      data: {
        subscribed: false,
        unsubscribedAt: new Date(),
      },
    })

    // Update user if exists
    await prisma.user.updateMany({
      where: { email: email.toLowerCase() },
      data: {
        subscribed: false,
        unsubscribedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
}
