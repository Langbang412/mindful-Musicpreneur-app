'use client'

import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Upload, Save, FileText } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { Label } from '@/components/ui/label'

interface PortalContent {
  zoom_url?: string
  welcome_message?: string
  substack_url?: string
}

export default function ContentPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)
  const [portalContent, setPortalContent] = useState<PortalContent>({})
  const { toast } = useToast()

  useEffect(() => {
    fetchPortalContent()
  }, [])

  const fetchPortalContent = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/content/portal')
      if (res.ok) {
        const data = await res.json()
        setPortalContent(data.content)
      }
    } catch (error) {
      console.error('Failed to fetch portal content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (type: string, file: File) => {
    try {
      setUploading(type)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)

      const res = await fetch('/api/admin/content/upload-pdf', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        toast({
          title: 'Success',
          description: `${data.filename} uploaded successfully`,
        })
      } else {
        toast({
          title: 'Error',
          description: 'Failed to upload PDF',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Failed to upload PDF:', error)
      toast({
        title: 'Error',
        description: 'Failed to upload PDF',
        variant: 'destructive',
      })
    } finally {
      setUploading(null)
    }
  }

  const handleSavePortalContent = async () => {
    try {
      setSaving(true)
      const res = await fetch('/api/admin/content/portal', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portalContent),
      })

      if (res.ok) {
        toast({
          title: 'Success',
          description: 'Portal content updated successfully',
        })
      } else {
        toast({
          title: 'Error',
          description: 'Failed to update portal content',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Failed to save portal content:', error)
      toast({
        title: 'Error',
        description: 'Failed to update portal content',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-playfair font-bold text-brand-plum mb-2">
            Content Management
          </h1>
          <p className="text-gray-600">Manage PDFs and portal content</p>
        </div>

        {/* PDF Upload Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>PDF Management</CardTitle>
            <CardDescription>
              Upload or replace product PDF files. Existing files will be overwritten.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Guide PDF */}
            <div>
              <Label htmlFor="guide-pdf" className="text-base font-semibold mb-2 block">
                The Mindful Musicpreneur Guide
              </Label>
              <div className="flex items-center space-x-3">
                <Input
                  id="guide-pdf"
                  type="file"
                  accept=".pdf"
                  disabled={uploading !== null}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload('guide', file)
                  }}
                  className="flex-1"
                />
                {uploading === 'guide' && <Loader2 className="w-5 h-5 animate-spin" />}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Current file: The_Mindful_Musicpreneur_Guide.pdf
              </p>
            </div>

            {/* Planner PDF */}
            <div>
              <Label htmlFor="planner-pdf" className="text-base font-semibold mb-2 block">
                The Mindful Muse Quarterly Planner
              </Label>
              <div className="flex items-center space-x-3">
                <Input
                  id="planner-pdf"
                  type="file"
                  accept=".pdf"
                  disabled={uploading !== null}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload('planner', file)
                  }}
                  className="flex-1"
                />
                {uploading === 'planner' && <Loader2 className="w-5 h-5 animate-spin" />}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Current file: The_Mindful_Muse_Quarterly_Planner.pdf
              </p>
            </div>

            {/* Freebie PDF */}
            <div>
              <Label htmlFor="freebie-pdf" className="text-base font-semibold mb-2 block">
                Freebie PDF
              </Label>
              <div className="flex items-center space-x-3">
                <Input
                  id="freebie-pdf"
                  type="file"
                  accept=".pdf"
                  disabled={uploading !== null}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload('freebie', file)
                  }}
                  className="flex-1"
                />
                {uploading === 'freebie' && <Loader2 className="w-5 h-5 animate-spin" />}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Current file: Freebie.pdf
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> PDF files should be under 50MB for optimal delivery.
                Uploaded files will be immediately available for download to users.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Portal Content Section */}
        <Card>
          <CardHeader>
            <CardTitle>Collective Portal Content</CardTitle>
            <CardDescription>
              Manage the content displayed in The Collective member portal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="zoom-url" className="text-base font-semibold mb-2 block">
                Zoom Meeting URL
              </Label>
              <Input
                id="zoom-url"
                type="url"
                placeholder="https://zoom.us/j/..."
                value={portalContent.zoom_url || ''}
                onChange={(e) =>
                  setPortalContent({ ...portalContent, zoom_url: e.target.value })
                }
              />
              <p className="text-xs text-gray-500 mt-1">
                Members will see this URL when they click "Join The Collective Call"
              </p>
            </div>

            <div>
              <Label htmlFor="welcome-message" className="text-base font-semibold mb-2 block">
                Welcome Message
              </Label>
              <Textarea
                id="welcome-message"
                rows={6}
                placeholder="Welcome to The Collective! Here's what you can expect..."
                value={portalContent.welcome_message || ''}
                onChange={(e) =>
                  setPortalContent({ ...portalContent, welcome_message: e.target.value })
                }
              />
              <p className="text-xs text-gray-500 mt-1">
                This message appears at the top of the portal page
              </p>
            </div>

            <div>
              <Label htmlFor="substack-url" className="text-base font-semibold mb-2 block">
                Substack URL
              </Label>
              <Input
                id="substack-url"
                type="url"
                placeholder="https://themindfulmusicpreneur.substack.com"
                value={portalContent.substack_url || ''}
                onChange={(e) =>
                  setPortalContent({ ...portalContent, substack_url: e.target.value })
                }
              />
              <p className="text-xs text-gray-500 mt-1">
                Link to your private Substack for members
              </p>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleSavePortalContent}
                disabled={saving}
                className="w-full md:w-auto"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Portal Content
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
