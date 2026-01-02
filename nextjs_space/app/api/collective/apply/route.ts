import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user owns the guide
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user?.ownsGuide) {
      return NextResponse.json(
        { error: 'You must own The Mindful Musicpreneur Guide to apply' },
        { status: 403 }
      )
    }

    // Check if user already has a pending or approved application
    const existingApplication = await prisma.collectiveApplication.findFirst({
      where: {
        userId: session.user.id,
        status: { in: ['pending', 'approved'] },
      },
    })

    if (existingApplication) {
      return NextResponse.json(
        { error: 'You already have a pending or approved application' },
        { status: 409 }
      )
    }

    const body = await request.json()
    const {
      whyJoin,
      musicGoals,
      guideImpact,
      communityHopes,
      currentStage,
      additionalInfo,
    } = body

    // Validation
    if (!whyJoin || !musicGoals || !guideImpact || !communityHopes || !currentStage) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Create application
    const application = await prisma.collectiveApplication.create({
      data: {
        userId: session.user.id,
        status: 'pending',
        whyJoin,
        musicGoals,
        guideImpact,
        communityHopes,
        currentStage,
        additionalInfo: additionalInfo || null,
      },
    })

    return NextResponse.json(
      { 
        success: true,
        applicationId: application.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Application submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}
