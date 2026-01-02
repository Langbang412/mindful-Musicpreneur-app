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

    const content = await prisma.portalContent.findMany()
    
    // Convert to key-value object
    const contentMap = content.reduce((acc: any, item) => {
      acc[item.key] = item.value
      return acc
    }, {})

    return NextResponse.json({ content: contentMap })
  } catch (error) {
    console.error('Failed to fetch portal content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portal content' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !isAdmin(session.user?.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { zoom_url, welcome_message, substack_url } = body

    // Update or create each content item
    const updates = []
    
    if (zoom_url !== undefined) {
      updates.push(
        prisma.portalContent.upsert({
          where: { key: 'zoom_url' },
          update: { value: zoom_url, updatedBy: session.user?.email },
          create: { key: 'zoom_url', value: zoom_url, updatedBy: session.user?.email },
        })
      )
    }
    
    if (welcome_message !== undefined) {
      updates.push(
        prisma.portalContent.upsert({
          where: { key: 'welcome_message' },
          update: { value: welcome_message, updatedBy: session.user?.email },
          create: { key: 'welcome_message', value: welcome_message, updatedBy: session.user?.email },
        })
      )
    }
    
    if (substack_url !== undefined) {
      updates.push(
        prisma.portalContent.upsert({
          where: { key: 'substack_url' },
          update: { value: substack_url, updatedBy: session.user?.email },
          create: { key: 'substack_url', value: substack_url, updatedBy: session.user?.email },
        })
      )
    }

    await prisma.$transaction(updates)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update portal content:', error)
    return NextResponse.json(
      { error: 'Failed to update portal content' },
      { status: 500 }
    )
  }
}
