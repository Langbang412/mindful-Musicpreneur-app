'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'

export default function GuidePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-plum via-brand-purple to-brand-blue text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-playfair font-bold leading-tight mb-6">
                  The Mindful Musicpreneur<sup className="text-xl">®</sup> Guide
                </h1>
                <p className="text-xl md:text-2xl mb-4">
                  The 360° System That Transforms Self-Awareness Into Success
                </p>
                <p className="text-lg mb-6 text-gray-200">
                  The first system that connects your inner world to your outer success.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/checkout?product=guide">
                    <Button size="lg" className="w-full sm:w-auto bg-brand-yellow text-brand-charcoal hover:bg-brand-tan">
                      Get The Guide - $60
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src="/360MindfulSystem.png"
                  alt="The Mindful Musicpreneur Guide"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center text-brand-plum mb-12">
              What You Get
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-brand-cream p-8 rounded-lg">
                <h3 className="text-2xl font-playfair font-bold text-brand-plum mb-4">
                  🪩 Recognize hidden doubt cycles
                </h3>
              </div>
              <div className="bg-brand-cream p-8 rounded-lg">
                <h3 className="text-2xl font-playfair font-bold text-brand-teal mb-4">
                  🪩 Build your authentic rhythm
                </h3>
              </div>
              <div className="bg-brand-cream p-8 rounded-lg">
                <h3 className="text-2xl font-playfair font-bold text-brand-coral mb-4">
                  🪩 Clear your shadows
                </h3>
              </div>
              <div className="bg-brand-cream p-8 rounded-lg">
                <h3 className="text-2xl font-playfair font-bold text-brand-purple mb-4">
                  🪩 Become the magnetic, unstoppable, confident artist you were born to be
                </h3>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white border-2 border-brand-plum p-8 rounded-lg">
                <h3 className="text-2xl font-playfair font-bold text-brand-plum mb-4">
                  The Core Shadow Work Guide (200+ Pages)
                </h3>
                <p className="text-gray-700 mb-4">
                  Dismantle limiting beliefs and creative blocks with targeted journal prompts and exercises designed specifically for the artist's psyche.
                </p>
                <p className="text-gray-700 font-semibold mb-2">
                  The Seven Deadly Shadow Saboteurs:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>Lesson One: Conquering self-doubt</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>Lesson Two: Transforming self-sabotage</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>Lesson Three: Breaking co-dependency</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>Lesson Four: Establishing healthy boundaries</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>Lesson Five: Reinforcing self-trust</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>Lesson Six: Relentless resilience</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>Lesson Seven: Radical responsibility</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>Bonus Lesson: The twin flame saboteurs</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-2 border-brand-teal p-8 rounded-lg">
                <h3 className="text-2xl font-playfair font-bold text-brand-teal mb-4">
                  "The Woo of You" Deep-Dive System
                </h3>
                <p className="text-gray-700 mb-4">
                  Go beyond generic advice. We integrate Myers-Briggs, Archetypes, Astrology, and Chakras to help you diagnose your unique creative patterns from multiple, empowering angles.
                </p>
                <p className="text-gray-700">
                  Not used as labels, but as "inward lenses" to understand why you get stuck so you can break the cycle for good.
                </p>
              </div>

              <div className="bg-white border-2 border-brand-coral p-8 rounded-lg">
                <h3 className="text-2xl font-playfair font-bold text-brand-coral mb-4">
                  The 450+ Song Sonic Journey
                </h3>
                <p className="text-gray-700 mb-4">
                  <strong>You can't think your way through shadow work. You have to feel it.</strong>
                </p>
                <p className="text-gray-700 mb-4">
                  Our curated Apple Music playlists are designed to escort you through each chapter and emotional landscape, unlocking insights that words alone can't reach.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-coral mr-2 mt-1 flex-shrink-0" />
                    <span>One Fire & One Flow playlist for each chapter</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-coral mr-2 mt-1 flex-shrink-0" />
                    <span>450+ songs total linked individually section by section</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-coral mr-2 mt-1 flex-shrink-0" />
                    <span>Music becomes your mirror for movement</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-brand-yellow to-brand-tan p-8 rounded-lg text-brand-charcoal">
                <h3 className="text-2xl font-playfair font-bold mb-4">
                  FREE BONUS: Mindful Muse Quarterly Planner
                </h3>
                <p className="mb-4">
                  Ground your inner transformation in outer reality. This planner helps you translate profound self-awareness into tangible, quarterly goals and actions.
                </p>
                <p className="font-semibold">
                  Included FREE with every Guide purchase!
                </p>
              </div>

              <div className="bg-gradient-to-br from-brand-turquoise to-brand-teal p-8 rounded-lg text-white">
                <h3 className="text-2xl font-playfair font-bold mb-4">
                  BONUS: 2 Free Sessions in The Collective
                </h3>
                <p className="mb-4">
                  Experience our Personal Power Happy Hour™ community with 2 complimentary sessions, then apply for ongoing membership.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Works */}
        <section className="py-16 bg-brand-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center text-brand-plum mb-8">
              Why The Mindful Musicpreneur Works
            </h2>
            <div className="prose prose-lg mx-auto text-gray-700">
              <p>
                <strong>No other creative field tunes into your shadows quite like music.</strong>
              </p>
              <p>
                Why? Because there's nowhere to hide—between constant feedback, comparison traps, public successes & (LBR) spectacular fails, not to mention social media trolls. The industry puts your deepest doubts on playback.
              </p>
              <p>
                It's a place where <strong>talent comes second to resilience</strong> & where recurring patterns aren't just "bad habits"... they can be shadow costumes getting more elaborate on every tour stop.
              </p>
              <p className="text-xl font-bold text-brand-purple">
                The Mindful Musicpreneur 360° Guide & 360 System Is Your Blueprint For Turning Inner Clarity Into Outer Success — Because When Your ART ❤ Your MESSAGE & Your MISSION ❤ Finally Align... So Do Your Fans.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-brand-plum to-brand-purple text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Ready to Step Into Your Spotlight?
            </h2>
            <p className="text-xl mb-8">
              Get The Mindful Musicpreneur Guide + FREE Planner + 2 Free Collective Sessions
            </p>
            <Link href="/checkout?product=guide">
              <Button size="lg" className="bg-brand-yellow text-brand-charcoal hover:bg-brand-tan">
                Get Started - $60
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
