import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { isAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !isAdmin(session.user?.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const members = await prisma.user.findMany({
      where: {
        isCollectiveMember: true,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        collectiveApprovedAt: true,
        collectiveMembershipType: true,
        collectiveStripeSubscriptionId: true,
        createdAt: true,
        _count: {
          select: {
            pdfDownloads: true,
          },
        },
      },
      orderBy: {
        collectiveApprovedAt: 'desc',
      },
    })

    return NextResponse.json({ members })
  } catch (error) {
    console.error('Failed to fetch members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    )
  }
}
