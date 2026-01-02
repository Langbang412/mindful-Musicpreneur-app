import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { isAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !isAdmin(session.user?.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        orders: {
          include: {
            orderItems: {
              include: {
                product: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        applications: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        pdfDownloads: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Remove sensitive data
    const { password, ...userWithoutPassword } = user

    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !isAdmin(session.user?.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { ownsGuide, ownsPlanner, isCollectiveMember } = body

    const updates: any = {}
    if (typeof ownsGuide === 'boolean') updates.ownsGuide = ownsGuide
    if (typeof ownsPlanner === 'boolean') updates.ownsPlanner = ownsPlanner
    if (typeof isCollectiveMember === 'boolean') {
      updates.isCollectiveMember = isCollectiveMember
      if (isCollectiveMember && !updates.collectiveApprovedAt) {
        updates.collectiveApprovedAt = new Date()
      } else if (!isCollectiveMember) {
        updates.collectiveApprovedAt = null
      }
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: updates,
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Failed to update user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}
