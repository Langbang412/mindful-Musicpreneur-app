import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, password } = body

    // Validation
    if (!firstName || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName: lastName || null,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    })

    // Also add to email subscriber list
    await prisma.emailSubscriber.upsert({
      where: { email: email.toLowerCase() },
      create: {
        email: email.toLowerCase(),
        firstName,
        source: 'signup',
        subscribed: true,
      },
      update: {},
    })

    return NextResponse.json(
      { 
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}
