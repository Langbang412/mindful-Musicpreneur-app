import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { isAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !isAdmin(session.user?.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { grantAccess } = body

    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        isCollectiveMember: grantAccess,
        collectiveApprovedAt: grantAccess ? new Date() : null,
      },
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Failed to toggle member access:', error)
    return NextResponse.json(
      { error: 'Failed to toggle member access' },
      { status: 500 }
    )
  }
}
