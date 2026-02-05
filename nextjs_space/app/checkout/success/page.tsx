'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Download, Loader2 } from 'lucide-react'
import Link from 'next/link'

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams?.get('session_id')
  const [loading, setLoading] = useState(true)
  const [orderData, setOrderData] = useState<any>(null)

  useEffect(() => {
    if (sessionId) {
      fetchOrderData()
    } else {
      setLoading(false)
    }
  }, [sessionId])

  const fetchOrderData = async () => {
    try {
      const res = await fetch(`/api/checkout/session?session_id=${sessionId}`)
      if (res.ok) {
        const data = await res.json()
        setOrderData(data)
      }
    } catch (error) {
      console.error('Failed to fetch order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
      </div>
    )
  }

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
              <CardTitle className="text-3xl">Thank You for Your Purchase!</CardTitle>
              <CardDescription className="text-lg">
                Your order has been confirmed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-brand-cream p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3">What Happens Next?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-brand-purple mr-2">✓</span>
                    <span>You'll receive a confirmation email with your order details</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-purple mr-2">✓</span>
                    <span>Your account has been granted access to your purchased content</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-purple mr-2">✓</span>
                    <span>You can download your PDFs immediately from your dashboard</span>
                  </li>
                  {orderData?.productId === 'guide' && (
                    <li className="flex items-start">
                      <span className="text-brand-purple mr-2">✓</span>
                      <span>You're now eligible to apply for The Collective</span>
                    </li>
                  )}
                  {orderData?.isBogoOrder && (
                    <li className="flex items-start">
                      <span className="text-brand-purple mr-2">✓</span>
                      <span>Your gift recipient will receive a separate email with their access</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-brand-purple hover:bg-brand-plum">
                    <Download className="w-4 h-4 mr-2" />
                    Go to Dashboard
                  </Button>
                </Link>
                <Link href="/">
                  <Button size="lg" variant="outline">
                    Back to Home
                  </Button>
                </Link>
              </div>

              <div className="text-center text-sm text-gray-600">
                <p>Questions? Email us at hello@themindfulmusicpreneur.com</p>
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

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CheckoutSuccessContent />
    </Suspense>
  )
}
