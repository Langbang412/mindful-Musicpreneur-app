import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { isAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'
import { sendCollectiveDeniedEmail } from '@/lib/email'

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
    const { denialMessage } = body

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
        status: 'denied',
        reviewedAt: new Date(),
        reviewedBy: session.user?.email || 'admin',
        denialMessage,
      },
    })

    // Send denial email
    await sendCollectiveDeniedEmail({
      email: application.user.email,
      firstName: application.user.firstName,
      message: denialMessage,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to deny application:', error)
    return NextResponse.json(
      { error: 'Failed to deny application' },
      { status: 500 }
    )
  }
}
