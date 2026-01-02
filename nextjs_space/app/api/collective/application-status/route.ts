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

    const application = await prisma.collectiveApplication.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      hasApplication: !!application,
      status: application?.status || null,
      submittedAt: application?.createdAt || null,
    })
  } catch (error) {
    console.error('Error fetching application status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch application status' },
      { status: 500 }
    )
  }
}
