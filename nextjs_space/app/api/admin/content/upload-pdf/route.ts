import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { isAdmin } from '@/lib/admin'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !isAdmin(session.user?.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string // 'guide', 'planner', 'freebie'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!['guide', 'planner', 'freebie'].includes(type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Define file paths
    const fileMap: Record<string, string> = {
      guide: 'The_Mindful_Musicpreneur_Guide.pdf',
      planner: 'The_Mindful_Muse_Quarterly_Planner.pdf',
      freebie: 'Freebie.pdf',
    }

    const filename = fileMap[type]
    const filepath = join(process.cwd(), 'public', 'pdfs', filename)

    // Write file
    await writeFile(filepath, buffer)

    return NextResponse.json({
      success: true,
      filename,
      size: buffer.length,
    })
  } catch (error) {
    console.error('Failed to upload PDF:', error)
    return NextResponse.json(
      { error: 'Failed to upload PDF' },
      { status: 500 }
    )
  }
}
