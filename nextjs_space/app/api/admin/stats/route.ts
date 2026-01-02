import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { isAdmin } from '@/lib/admin'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }

    // Fetch statistics
    const [orders, users, applications, emailSubscribers] = await Promise.all([
      prisma.order.findMany({
        where: { status: 'completed' },
      }),
      prisma.user.count(),
      prisma.collectiveApplication.findMany(),
      prisma.emailSubscriber.count({
        where: { subscribed: true },
      }),
    ])

    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)
    const collectiveMembers = await prisma.user.count({
      where: { isCollectiveMember: true },
    })
    const pendingApplications = applications.filter(app => app.status === 'pending').length

    return NextResponse.json({
      totalOrders: orders.length,
      totalRevenue,
      totalUsers: users,
      pendingApplications,
      collectiveMembers,
      emailSubscribers,
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
