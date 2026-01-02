'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, CheckCircle } from 'lucide-react'

export default function CollectiveApplyPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [alreadyApplied, setAlreadyApplied] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    whyJoin: '',
    musicGoals: '',
    guideImpact: '',
    communityHopes: '',
    currentStage: '',
    additionalInfo: '',
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/collective/apply')
    } else if (status === 'authenticated') {
      checkAccess()
    }
  }, [status, router])

  const checkAccess = async () => {
    try {
      const res = await fetch('/api/user/me')
      if (res.ok) {
        const data = await res.json()
        setHasAccess(data.ownsGuide)
        
        // Check if already applied
        const appRes = await fetch('/api/collective/application-status')
        if (appRes.ok) {
          const appData = await appRes.json()
          setAlreadyApplied(appData.hasApplication)
        }
      }
    } catch (error) {
      console.error('Failed to check access:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const response = await fetch('/api/collective/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application')
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setSubmitting(false)
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
                <CardTitle>The Mindful Musicpreneur Guide Required</CardTitle>
                <CardDescription>
                  You need to own The Mindful Musicpreneur Guide to apply for The Collective.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  The Collective is designed for musicians who are working through The Mindful Musicpreneur Guide. Get the Guide to become eligible to apply.
                </p>
                <Button onClick={() => router.push('/products/guide')} className="bg-brand-purple hover:bg-brand-plum">
                  Get The Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <CardTitle className="text-3xl">Application Submitted!</CardTitle>
                <CardDescription className="text-lg">
                  Thank you for applying to The Collective
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-brand-cream p-6 rounded-lg mb-6">
                  <h3 className="font-bold text-lg mb-3">What Happens Next?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-brand-purple mr-2">✓</span>
                      <span>We'll review your application within 3-5 business days</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-purple mr-2">✓</span>
                      <span>You'll receive an email with our decision</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-purple mr-2">✓</span>
                      <span>If approved, you'll get immediate access to the portal and session calendar</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
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

  if (alreadyApplied) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle>Application Pending</CardTitle>
                <CardDescription>
                  You've already submitted an application to The Collective
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  We're reviewing your application and will get back to you via email soon.
                </p>
                <Button onClick={() => router.push('/dashboard')} variant="outline">
                  Back to Dashboard
                </Button>
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Apply to The Collective</CardTitle>
              <CardDescription>
                Tell us about yourself and why you want to join our community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="whyJoin">Why do you want to join The Collective? *</Label>
                  <Textarea
                    id="whyJoin"
                    value={formData.whyJoin}
                    onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
                    placeholder="Share what drew you to The Collective..."
                    rows={4}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="musicGoals">What are your music career goals for the next 6-12 months? *</Label>
                  <Textarea
                    id="musicGoals"
                    value={formData.musicGoals}
                    onChange={(e) => setFormData({ ...formData, musicGoals: e.target.value })}
                    placeholder="Releases, tours, collaborations, etc..."
                    rows={4}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guideImpact">How has The Mindful Musicpreneur Guide impacted you so far? *</Label>
                  <Textarea
                    id="guideImpact"
                    value={formData.guideImpact}
                    onChange={(e) => setFormData({ ...formData, guideImpact: e.target.value })}
                    placeholder="Share any insights, breakthroughs, or challenges..."
                    rows={4}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="communityHopes">What do you hope to gain from The Collective community? *</Label>
                  <Textarea
                    id="communityHopes"
                    value={formData.communityHopes}
                    onChange={(e) => setFormData({ ...formData, communityHopes: e.target.value })}
                    placeholder="Support, accountability, networking, skills, etc..."
                    rows={4}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentStage">Where are you in your music career journey? *</Label>
                  <Textarea
                    id="currentStage"
                    value={formData.currentStage}
                    onChange={(e) => setFormData({ ...formData, currentStage: e.target.value })}
                    placeholder="Writing, recording, performing, building team, etc..."
                    rows={3}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Anything else you'd like us to know?</Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    placeholder="Optional - any additional context or questions"
                    rows={3}
                    disabled={submitting}
                  />
                </div>

                <div className="bg-brand-cream p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> The Collective is intentionally small and curated. We review each application to ensure the space fits your goals and season of career. You'll hear back within 3-5 business days.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-purple hover:bg-brand-plum"
                  size="lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
