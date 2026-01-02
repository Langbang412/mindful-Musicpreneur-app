import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import path from 'path'
import fs from 'fs'

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      )
    }

    const { productId } = params

    // Get user and check access
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if user has access to this product
    let hasAccess = false
    let fileName = ''

    switch (productId) {
      case 'guide':
        hasAccess = user.ownsGuide
        fileName = 'The_Mindful_Musicpreneur_Guide.pdf'
        break
      case 'planner':
        hasAccess = user.ownsPlanner || user.ownsGuide
        fileName = 'The_Mindful_Muse_Quarterly_Planner.pdf'
        break
      case 'freebie':
        hasAccess = user.ownsFreebie
        fileName = 'Mindful_Musicpreneur_Freebie.pdf'
        break
      default:
        return NextResponse.json(
          { error: 'Invalid product' },
          { status: 400 }
        )
    }

    if (!hasAccess) {
      return NextResponse.json(
        { error: 'You do not have access to this product' },
        { status: 403 }
      )
    }

    // Log the download
    await prisma.pDFDownload.create({
      data: {
        userId: user.id,
        productType: productId,
      },
    })

    // In production, you would serve files from S3 or another storage service
    // For now, we'll return a placeholder response
    const filePath = path.join(process.cwd(), 'storage', 'pdfs', fileName)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      // Return a message indicating the file will be added
      return NextResponse.json({
        message: 'PDF will be available soon. Please check back or contact support.',
        productId,
        fileName,
      }, { status: 202 })
    }

    // Read and serve the file
    const fileBuffer = fs.readFileSync(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    )
  }
}
