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

    // Get all email subscribers
    const subscribers = await prisma.emailSubscriber.findMany({
      where: {
        subscribed: true,
      },
      select: {
        email: true,
        firstName: true,
        source: true,
        subscribedAt: true,
      },
      orderBy: {
        subscribedAt: 'desc',
      },
    })

    // Convert to CSV
    const csv = [
      ['Email', 'First Name', 'Source', 'Subscribed At'],
      ...subscribers.map(sub => [
        sub.email,
        sub.firstName,
        sub.source,
        sub.subscribedAt.toISOString(),
      ]),
    ]
      .map(row => row.join(','))
      .join('\n')

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="email-subscribers-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Failed to export emails:', error)
    return NextResponse.json(
      { error: 'Failed to export emails' },
      { status: 500 }
    )
  }
}
