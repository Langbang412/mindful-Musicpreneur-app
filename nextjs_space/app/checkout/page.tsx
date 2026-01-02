'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, ShoppingCart, Lock } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'
import Image from 'next/image'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const productId = searchParams?.get('product') || 'guide'
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [recipientInfo, setRecipientInfo] = useState({
    firstName: '',
    email: '',
  })

  const product = PRODUCTS[productId as keyof typeof PRODUCTS]

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/auth/signin?callbackUrl=/checkout?product=${productId}`)
    }
  }, [status, router, productId])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button onClick={() => router.push('/')}>Go Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const isBogo = productId === 'bogo'
  const price = productId === 'collective' ? product.monthlyPrice : product.price

  const handleCheckout = async () => {
    setError('')
    
    // Validate BOGO recipient info
    if (isBogo) {
      if (!recipientInfo.firstName || !recipientInfo.email) {
        setError('Please provide recipient information for BOGO purchase')
        return
      }
      if (recipientInfo.email === session.user?.email) {
        setError('Recipient email must be different from your email')
        return
      }
    }

    setLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          recipientInfo: isBogo ? recipientInfo : undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed')
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-playfair font-bold text-brand-plum mb-2">
              <ShoppingCart className="inline w-8 h-8 mr-2" />
              Checkout
            </h1>
            <p className="text-gray-600">Complete your purchase securely</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4 mb-6">
                    {product.image && (
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                    </div>
                  </div>

                  {product.includes && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">What's Included:</h4>
                      <ul className="space-y-1">
                        {product.includes.map((item, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="text-brand-purple mr-2">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">${price}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span className="text-brand-purple">${price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Checkout Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>
                    You'll be redirected to our secure payment processor
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* BOGO Recipient Info */}
                  {isBogo && (
                    <div className="bg-brand-cream p-4 rounded-lg space-y-4">
                      <h4 className="font-semibold text-brand-plum">Gift Recipient Information</h4>
                      <div className="space-y-2">
                        <Label htmlFor="recipientFirstName">Recipient First Name</Label>
                        <Input
                          id="recipientFirstName"
                          value={recipientInfo.firstName}
                          onChange={(e) => setRecipientInfo({ ...recipientInfo, firstName: e.target.value })}
                          placeholder="Their first name"
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="recipientEmail">Recipient Email</Label>
                        <Input
                          id="recipientEmail"
                          type="email"
                          value={recipientInfo.email}
                          onChange={(e) => setRecipientInfo({ ...recipientInfo, email: e.target.value })}
                          placeholder="their@email.com"
                          required
                          disabled={loading}
                        />
                      </div>
                      <p className="text-xs text-gray-600">
                        We'll send them an email with their gift and access instructions.
                      </p>
                    </div>
                  )}

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Lock className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Secure Checkout</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Your payment is processed securely via Stripe. We never see or store your full payment details.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-brand-purple hover:bg-brand-plum"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Proceed to Payment - $${price}`
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    Digital products • All sales final • Instant access after payment
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
