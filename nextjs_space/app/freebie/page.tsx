'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { Check, Download, Sparkles } from 'lucide-react'

export default function FreebiePage() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/freebie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Failed to subscribe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-brand-cream py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-playfair font-bold text-brand-plum mb-4">
                Check Your Email!
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                We've sent your free resource to <strong>{email}</strong>
              </p>
              <p className="text-gray-600 mb-8">
                You're officially part of the movement. Get ready to step boldly into your spotlight! 🎶✨
              </p>
              <Button onClick={() => window.location.href = '/'} className="bg-brand-purple hover:bg-brand-plum">
                Back to Home
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-coral via-brand-yellow to-brand-tan py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-brand-plum text-white px-4 py-2 rounded-full mb-4 font-bold">
                  🎁 FREE RESOURCE
                </div>
                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-brand-charcoal mb-6">
                  Get Your Free Shadow Work Starter Guide
                </h1>
                <p className="text-xl text-gray-800 mb-6">
                  Discover the hidden patterns holding you back & take your first steps toward becoming the magnetic, unstoppable artist you were born to be.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-brand-plum mt-1 flex-shrink-0" />
                    <span className="text-gray-800">Introduction to The Seven Deadly Shadow Saboteurs</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-brand-plum mt-1 flex-shrink-0" />
                    <span className="text-gray-800">3 powerful journal prompts to get started</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-brand-plum mt-1 flex-shrink-0" />
                    <span className="text-gray-800">Curated playlist to support your journey</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-brand-plum mt-1 flex-shrink-0" />
                    <span className="text-gray-800">Instant download - start today!</span>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px]">
                <Image
                  src="/AppArt.png"
                  alt="Free Resource"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-white">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-2 border-brand-purple shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Download className="w-12 h-12 text-brand-purple mx-auto mb-4" />
                  <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-2">
                    Get Instant Access
                  </h2>
                  <p className="text-gray-600">
                    Enter your info below and we'll send your free guide straight to your inbox.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      placeholder="Your first name"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your.email@example.com"
                      className="w-full"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-purple hover:bg-brand-plum text-white py-6 text-lg"
                  >
                    {loading ? 'Sending...' : 'Send Me The Free Guide!'}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to receive emails from The Mindful Musicpreneur®. Unsubscribe anytime.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="py-16 bg-brand-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-playfair font-bold text-center text-brand-plum mb-12">
              What You'll Discover
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-brand-purple mx-auto mb-4" />
                <h3 className="font-bold text-brand-plum mb-2">Recognize Patterns</h3>
                <p className="text-gray-700">Identify the shadow saboteurs that keep you stuck in the same cycles.</p>
              </div>
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-brand-teal mx-auto mb-4" />
                <h3 className="font-bold text-brand-teal mb-2">Start Healing</h3>
                <p className="text-gray-700">Use powerful prompts designed specifically for artists and musicians.</p>
              </div>
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-brand-coral mx-auto mb-4" />
                <h3 className="font-bold text-brand-coral mb-2">Feel Supported</h3>
                <p className="text-gray-700">Connect with curated music that mirrors your emotional journey.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial / Trust */}
        <section className="py-16 bg-gradient-to-r from-brand-plum to-brand-purple text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-2xl font-playfair italic mb-6">
              "If Stevie Nicks & Brené Brown teamed up to run a music business & mindfulness bootcamp — you'd probably find Jen Hatcher behind the mic & producing it."
            </p>
            <p className="text-lg">
              — Created by Jen Hatcher, CEO of Illustris Entertainment
            </p>
          </div>
        </section>

        {/* Upsell */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-playfair font-bold text-brand-plum mb-6">
              Want the Full Experience?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              The complete 200+ page Mindful Musicpreneur® Guide includes all Seven Shadow Saboteurs, 450+ song playlists, The Woo of You deep-dive, FREE planner, and 2 free Collective sessions.
            </p>
            <Button size="lg" className="bg-brand-purple hover:bg-brand-plum" onClick={() => window.location.href = '/products/guide'}>
              Learn More About The Full Guide
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
