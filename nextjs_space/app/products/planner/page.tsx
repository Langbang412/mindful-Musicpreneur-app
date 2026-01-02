'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'

export default function PlannerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-teal via-brand-turquoise to-brand-blue text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-playfair font-bold leading-tight mb-6">
                  The Mindful Muse Quarterly Planner
                </h1>
                <p className="text-xl md:text-2xl mb-4">
                  Plan One Season At A Time
                </p>
                <p className="text-lg mb-6 text-gray-200">
                  Most planners don't fit the reality & fluctuations of a musician's life. The Mindful Muse gets all of that.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/checkout?product=planner">
                    <Button size="lg" className="w-full sm:w-auto bg-brand-yellow text-brand-charcoal hover:bg-brand-tan">
                      Get The Planner - $15
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src="/BootsOnPedals.png"
                  alt="The Mindful Muse Quarterly Planner"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* What It Is */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center text-brand-plum mb-12">
              A Planner That Gets Musicians
            </h2>
            <div className="text-center mb-12">
              <p className="text-xl text-gray-700 mb-4">
                Your low-pressure, totally private (analog or digital) companion designed to help you make meaningful progress for three focused months & reusable quarterly.
              </p>
              <p className="text-lg text-brand-purple font-semibold">
                Works WITH or WITHOUT The Mindful Musicpreneur Guide
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-white border-2 border-brand-teal p-8 rounded-lg">
                <h3 className="text-2xl font-playfair font-bold text-brand-teal mb-4">
                  1. Why The Quarterly Approach Works For Musicians
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-teal mr-2 mt-1 flex-shrink-0" />
                    <span>Plan one season at a time, breaking big goals into daily, weekly & monthly actions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-teal mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Backwards Planning for Gigs & Projects:</strong> Start with your end goal & map out every step</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-teal mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Creative Prompts & Habit Tracking:</strong> Stay inspired, balanced, and mindful on & off-stage</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-teal mr-2 mt-1 flex-shrink-0" />
                    <span>Easy Habit Tracking that supports alignment between health & career</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-2 border-brand-coral p-8 rounded-lg">
                <h3 className="text-2xl font-playfair font-bold text-brand-coral mb-4">
                  2. Organize With Flexibility
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-coral mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Real-Life Resilience:</strong> Designed for those who juggle gigs, travel, last-minute changes, and the realities of a music career</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-coral mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Motivation Without Micromanagement:</strong> Encouraging quotes & gentle reminders keep you inspired & self-aware, not overwhelmed</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-2 border-brand-purple p-8 rounded-lg">
                <h3 className="text-2xl font-playfair font-bold text-brand-purple mb-4">
                  3. Inspirational With Enough Funk To Be Creative
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Built by Creatives, for Creatives:</strong> No apps, logins, random pop-ups, or digital noise—just you, your music & space to plan, reflect & doodle</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>No rigid rules—make it your own. Every page invites you in, doesn't box you in</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>Daily motivational quote included</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-brand-yellow to-brand-tan p-8 rounded-lg text-brand-charcoal">
                <h3 className="text-2xl font-playfair font-bold mb-4">
                  Why It's A Bargain
                </h3>
                <p className="mb-4">
                  You can <strong>duplicate it each quarter</strong> to fill out the schedule and see the year at a glance with a scroll of the laptop, cell phone or tablet… or print it out & make a hard copy—do what fits your life & habits.
                </p>
                <p className="font-semibold">
                  Reusable format = ongoing value for just $15
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-16 bg-brand-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center text-brand-plum mb-8">
              Start Each Day With Intention
            </h2>
            <div className="prose prose-lg mx-auto text-gray-700">
              <p className="text-center text-xl">
                <em>"Consistent, mindful planning isn't about perfection—it's about noticing your progress, finding balance, making sure your habits align with your dreams."</em>
              </p>
              <p className="text-center mt-6">
                With The Mindful Muse, start each day with intention—on your tablet, laptop & phone... or print it out & go analog—before the chaos pulls you away.
              </p>
            </div>
          </div>
        </section>

        {/* Upsell to Guide */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-brand-plum to-brand-purple text-white p-12 rounded-lg">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
                Want The Full System?
              </h2>
              <p className="text-xl mb-8">
                The Mindful Musicpreneur Guide includes this planner FREE, plus 200+ pages of shadow work, 450+ song playlists, and 2 free Collective sessions.
              </p>
              <Link href="/products/guide">
                <Button size="lg" className="bg-brand-yellow text-brand-charcoal hover:bg-brand-tan">
                  Get The Complete Guide - $60
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-brand-teal to-brand-turquoise text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Get Your Mindful Muse Planner
            </h2>
            <p className="text-xl mb-8">
              Just $15 • Reusable Quarterly • Works Alone or With The Guide
            </p>
            <Link href="/checkout?product=planner">
              <Button size="lg" className="bg-brand-yellow text-brand-charcoal hover:bg-brand-tan">
                Get The Planner - $15
              </Button>
            </Link>
            <p className="mt-6 text-sm text-gray-200">
              Digital download • Instant access • All sales final
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
