import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendFreebieEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { firstName, email } = await request.json()

    // Validation
    if (!firstName || !email) {
      return NextResponse.json(
        { error: 'First name and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (user) {
      // Update existing user
      user = await prisma.user.update({
        where: { email: email.toLowerCase() },
        data: {
          firstName,
          ownsFreebie: true,
          subscribed: true, // Re-subscribe if they were unsubscribed
        },
      })
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          firstName,
          ownsFreebie: true,
          subscribed: true,
        },
      })
    }

    // Add/update email subscriber
    await prisma.emailSubscriber.upsert({
      where: { email: email.toLowerCase() },
      update: {
        firstName,
        subscribed: true,
        source: 'freebie',
      },
      create: {
        email: email.toLowerCase(),
        firstName,
        source: 'freebie',
        subscribed: true,
      },
    })

    // Send freebie email
    await sendFreebieEmail({
      email: email.toLowerCase(),
      firstName,
    })

    return NextResponse.json({
      success: true,
      message: 'Freebie sent successfully!',
    })
  } catch (error: any) {
    console.error('Freebie subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    )
  }
}
