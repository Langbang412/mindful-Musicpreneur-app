'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, Loader2 } from 'lucide-react'

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const email = searchParams?.get('email') || ''
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleUnsubscribe = async () => {
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to unsubscribe')
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <CardTitle className="text-2xl">You've Been Unsubscribed</CardTitle>
                <CardDescription>
                  You will no longer receive marketing emails from us
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6">
                  We're sorry to see you go! You'll still receive important transactional emails related to your purchases.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Change your mind? Email us at hello@themindfulmusicpreneur.com to resubscribe.
                </p>
                <Button onClick={() => window.location.href = '/'} variant="outline">
                  Return to Home
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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Unsubscribe from Emails</CardTitle>
              <CardDescription>
                We'll miss you, but we understand
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="text-center mb-6">
                <p className="text-gray-700 mb-2">
                  Are you sure you want to unsubscribe from marketing emails?
                </p>
                {email && (
                  <p className="text-sm text-gray-600">
                    Email: <strong>{email}</strong>
                  </p>
                )}
              </div>

              <div className="bg-brand-cream p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> You'll continue to receive important emails about your purchases, account, and any active memberships. This only unsubscribes you from marketing and promotional content.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleUnsubscribe}
                  disabled={loading || !email}
                  variant="destructive"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Unsubscribing...
                    </>
                  ) : (
                    'Yes, Unsubscribe Me'
                  )}
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  size="lg"
                  disabled={loading}
                >
                  Never Mind
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

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <UnsubscribeContent />
    </Suspense>
  )
}
