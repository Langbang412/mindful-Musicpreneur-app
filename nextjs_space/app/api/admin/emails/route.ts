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

    const subscribers = await prisma.emailSubscriber.findMany({
      orderBy: {
        subscribedAt: 'desc',
      },
    })

    return NextResponse.json({ subscribers })
  } catch (error) {
    console.error('Failed to fetch email subscribers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch email subscribers' },
      { status: 500 }
    )
  }
}
