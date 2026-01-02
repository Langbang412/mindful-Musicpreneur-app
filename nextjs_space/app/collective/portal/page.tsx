'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Video, BookOpen, Music, Users, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface PortalContent {
  zoomUrl: string
  welcomeMessage: string
  substackUrl: string
}

export default function CollectivePortalPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [portalContent, setPortalContent] = useState<PortalContent | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/collective/portal')
    } else if (status === 'authenticated') {
      checkAccess()
    }
  }, [status, router])

  const checkAccess = async () => {
    try {
      const res = await fetch('/api/user/me')
      if (res.ok) {
        const data = await res.json()
        if (data.isCollectiveMember) {
          setHasAccess(true)
          await fetchPortalContent()
        } else {
          setHasAccess(false)
        }
      }
    } catch (error) {
      console.error('Failed to check access:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPortalContent = async () => {
    try {
      const res = await fetch('/api/collective/portal-content')
      if (res.ok) {
        const data = await res.json()
        setPortalContent(data)
      }
    } catch (error) {
      console.error('Failed to fetch portal content:', error)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle>Member Portal Access Required</CardTitle>
                <CardDescription>
                  You need to be an approved Collective member to access this portal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  If you own The Mindful Musicpreneur Guide, you can apply to join The Collective.
                </p>
                <div className="flex gap-4">
                  <Button onClick={() => router.push('/collective/apply')} className="bg-brand-purple hover:bg-brand-plum">
                    Apply to The Collective
                  </Button>
                  <Button onClick={() => router.push('/dashboard')} variant="outline">
                    Back to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-playfair font-bold text-brand-plum mb-2">
              Welcome to The Collective Portal
            </h1>
            <p className="text-gray-600">Your Personal Power Happy Hour™ community space</p>
          </div>

          {/* Welcome Message */}
          {portalContent?.welcomeMessage && (
            <Card className="mb-8 bg-gradient-to-br from-brand-plum to-brand-purple text-white">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed">
                  {portalContent.welcomeMessage}
                </p>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Join Live Session */}
            <Card className="border-2 border-brand-purple">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-brand-purple" />
                  Join The Collective Call
                </CardTitle>
                <CardDescription>
                  Connect with the community live
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Monthly live sessions with industry experts, hot seats, and real talk about your music career.
                </p>
                {portalContent?.zoomUrl ? (
                  <a href={portalContent.zoomUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-brand-purple hover:bg-brand-plum">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Join Zoom Call
                    </Button>
                  </a>
                ) : (
                  <Button disabled className="w-full">
                    Zoom link coming soon
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Substack Access */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-teal" />
                  Private Substack
                </CardTitle>
                <CardDescription>
                  Session replays & resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Access session recordings, journal jams, behind-the-scenes notes, and exclusive content.
                </p>
                <a 
                  href={portalContent?.substackUrl || 'https://themindfulmusicpreneur.substack.com'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-brand-teal hover:bg-brand-teal/90">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Substack
                  </Button>
                </a>
                <p className="text-xs text-gray-500 mt-2">
                  Your complimentary membership will be activated within 48 hours
                </p>
              </CardContent>
            </Card>

            {/* Sonic Journey Playlists */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="w-5 h-5 text-brand-coral" />
                  Sonic Journey Playlists
                </CardTitle>
                <CardDescription>
                  450+ curated songs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Access the complete Sonic Journey playlist library integrated with your Guide work.
                </p>
                <Link href="/dashboard">
                  <Button className="w-full bg-brand-coral hover:bg-brand-coral/90">
                    View in Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-brand-purple" />
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>✓ Safe Space:</strong> What's shared here stays here. Respect confidentiality.</p>
                  <p><strong>✓ No Energy Vampires:</strong> Support each other's growth with honesty and kindness.</p>
                  <p><strong>✓ Show Up Authentically:</strong> Bring your real questions, wins, and struggles.</p>
                  <p><strong>✓ Radical Responsibility:</strong> Own your journey and choices.</p>
                  <p><strong>✓ Lift As You Climb:</strong> Share insights and celebrate others' success.</p>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  First session launches February 2026. You'll receive an email with the full schedule.
                </p>
                <p className="text-xs text-gray-500">
                  Sessions are held monthly and replays are available in Substack.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <p className="text-center text-gray-600">
                Questions or need support? Email us at{' '}
                <a href="mailto:hello@themindfulmusicpreneur.com" className="text-brand-purple hover:underline font-semibold">
                  hello@themindfulmusicpreneur.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
