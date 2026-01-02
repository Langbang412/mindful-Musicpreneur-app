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

    // Get date range (default to last 30 days)
    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '30')
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Revenue over time
    const orders = await prisma.order.findMany({
      where: {
        status: 'completed',
        completedAt: {
          gte: startDate,
        },
      },
      select: {
        totalAmount: true,
        completedAt: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        completedAt: 'asc',
      },
    })

    // Group by date
    const revenueByDate: Record<string, number> = {}
    const revenueByProduct: Record<string, number> = {}
    const ordersByDate: Record<string, number> = {}

    orders.forEach(order => {
      if (order.completedAt) {
        const date = order.completedAt.toISOString().split('T')[0]
        revenueByDate[date] = (revenueByDate[date] || 0) + order.totalAmount
        ordersByDate[date] = (ordersByDate[date] || 0) + 1

        order.orderItems.forEach(item => {
          const productName = item.product.name
          revenueByProduct[productName] = (revenueByProduct[productName] || 0) + item.price
        })
      }
    })

    // User growth
    const usersByDate = await prisma.user.groupBy({
      by: ['createdAt'],
      _count: true,
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    })

    const userGrowth: Record<string, number> = {}
    usersByDate.forEach(item => {
      const date = item.createdAt.toISOString().split('T')[0]
      userGrowth[date] = (userGrowth[date] || 0) + item._count
    })

    // Collective stats
    const totalApplications = await prisma.collectiveApplication.count()
    const approvedApplications = await prisma.collectiveApplication.count({
      where: { status: 'approved' },
    })
    const activeMembers = await prisma.user.count({
      where: { isCollectiveMember: true },
    })

    // Download stats
    const downloadsByProduct = await prisma.pDFDownload.groupBy({
      by: ['productType'],
      _count: true,
    })

    // Recent activity
    const recentOrders = await prisma.order.findMany({
      take: 10,
      where: { status: 'completed' },
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
          },
        },
      },
      orderBy: {
        completedAt: 'desc',
      },
    })

    return NextResponse.json({
      revenueByDate,
      revenueByProduct,
      ordersByDate,
      userGrowth,
      collective: {
        totalApplications,
        approvedApplications,
        activeMembers,
        approvalRate: totalApplications > 0 ? (approvedApplications / totalApplications) * 100 : 0,
      },
      downloads: downloadsByProduct,
      recentOrders,
    })
  } catch (error) {
    console.error('Failed to fetch analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
