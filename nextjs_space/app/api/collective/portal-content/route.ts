import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is a Collective member
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user?.isCollectiveMember) {
      return NextResponse.json(
        { error: 'Access denied - Collective membership required' },
        { status: 403 }
      )
    }

    // Fetch portal content from database
    const [zoomUrl, welcomeMessage, substackUrl] = await Promise.all([
      prisma.portalContent.findUnique({ where: { key: 'zoom_url' } }),
      prisma.portalContent.findUnique({ where: { key: 'welcome_message' } }),
      prisma.portalContent.findUnique({ where: { key: 'substack_url' } }),
    ])

    return NextResponse.json({
      zoomUrl: zoomUrl?.value || '',
      welcomeMessage: welcomeMessage?.value || 'Welcome to The Collective! This is your space for real talk, radical responsibility, and supporting each other\'s wins.',
      substackUrl: substackUrl?.value || 'https://themindfulmusicpreneur.substack.com',
    })
  } catch (error) {
    console.error('Error fetching portal content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portal content' },
      { status: 500 }
    )
  }
}
