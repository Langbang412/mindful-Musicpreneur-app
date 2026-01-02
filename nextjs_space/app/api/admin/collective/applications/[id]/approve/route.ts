import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { isAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'
import { sendCollectiveWelcomeEmail } from '@/lib/email'

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
    const { welcomeMessage } = body

    // Get the application
    const application = await prisma.collectiveApplication.findUnique({
      where: { id: params.id },
      include: {
        user: true,
      },
    })

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    // Update application status
    await prisma.collectiveApplication.update({
      where: { id: params.id },
      data: {
        status: 'approved',
        reviewedAt: new Date(),
        reviewedBy: session.user?.email || 'admin',
      },
    })

    // Grant user access to Collective (but not as member until they subscribe)
    await prisma.user.update({
      where: { id: application.userId },
      data: {
        collectiveApprovedAt: new Date(),
      },
    })

    // Send approval email
    await sendCollectiveWelcomeEmail({
      email: application.user.email,
      firstName: application.user.firstName,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to approve application:', error)
    return NextResponse.json(
      { error: 'Failed to approve application' },
      { status: 500 }
    )
  }
}
