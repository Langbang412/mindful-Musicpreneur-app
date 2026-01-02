'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Check, Users, Sparkles, Heart, Music } from 'lucide-react'

export default function CollectivePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-charcoal via-gray-900 to-brand-plum text-white py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-playfair font-bold leading-tight mb-6">
                  The Collective
                </h1>
                <p className="text-2xl md:text-3xl mb-6">
                  The Personal Power Happy Hour™ For Female Musicians
                </p>
                <p className="text-xl mb-8 text-gray-200">
                  This is where your personal transformation meets professional momentum & REAL COMMUNITY.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/collective/apply">
                    <Button size="lg" className="w-full sm:w-auto bg-brand-turquoise hover:bg-brand-teal">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src="/TheCollectiveBlack.png"
                  alt="The Collective"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* What Is The Collective */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center text-brand-plum mb-8">
              Your Private, Monthly Membership For Women+ In Music Who Are Ready To Play a Bigger Game
            </h2>
            <div className="prose prose-lg mx-auto text-gray-700 text-center">
              <p className="text-xl">
                We're built on a simple truth: <strong>No one understands the journey of a female musician like other women walking the same path.</strong>
              </p>
              <p className="text-lg">
                This is your network, your think tank, your keep it real, let your hair down, chill out... professional connection network & support system, all rolled into one.
              </p>
            </div>
          </div>
        </section>

        {/* The Experience */}
        <section className="py-16 bg-brand-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center text-brand-plum mb-12">
              The Collective Experience
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Music className="w-12 h-12 text-brand-purple mb-4" />
                <h3 className="text-2xl font-playfair font-bold text-brand-plum mb-4">
                  After-Show Green Room Vibe
                </h3>
                <p className="text-gray-700">
                  Modeled on hundreds of hours spent in backstage rooms with artists, crew & managers. It's fun, deeply real & packed with value—a safe container with a direct line to people who move the industry.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Heart className="w-12 h-12 text-brand-coral mb-4" />
                <h3 className="text-2xl font-playfair font-bold text-brand-plum mb-4">
                  The Two-Punch Solution
                </h3>
                <p className="text-gray-700">
                  <strong>First, Your Playbook:</strong> The Mindful Musicpreneur Guide tackles The Seven Deadly Shadow Saboteurs. <strong>Then, The Live Community:</strong> The Collective—where you connect & adapt, fueled by pro insights to step into your power.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-plum to-brand-purple text-white p-8 rounded-lg">
              <p className="text-xl mb-4">
                "I built the community I wished existed: One to truly take on the industry BS… And I knew that to do that first, we have to get our own inner world in order. And that means facing the inherited trauma & self-doubt we all carry."
              </p>
              <p className="font-semibold">- Jen Hatcher, Founder</p>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center text-brand-plum mb-12">
              What's Included
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-brand-cream p-8 rounded-lg">
                <div className="flex items-start mb-4">
                  <Check className="w-6 h-6 text-brand-purple mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-brand-plum mb-2">🎤 Live Monthly Collective Sessions</h3>
                    <p className="text-gray-700">Personal Power Happy Hour™ calls where we check in on career, nervous system, and next right moves. Real talk about releases, touring, money, band dynamics, burnout, boundaries, and the emotional side of the industry.</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-cream p-8 rounded-lg">
                <div className="flex items-start mb-4">
                  <Check className="w-6 h-6 text-brand-teal mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-brand-plum mb-2">📓 Journal Jams & Guided Work Sessions</h3>
                    <p className="text-gray-700">We work through pages from The Mindful Musicpreneur Guide and Mindful Muse Quarterly Planner together. Prompts and reflection around self-doubt, self-sabotage, fear of visibility, radical responsibility.</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-cream p-8 rounded-lg">
                <div className="flex items-start mb-4">
                  <Check className="w-6 h-6 text-brand-coral mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-brand-plum mb-2">🧠 Therapist-led / Mental Health-Informed Support</h3>
                    <p className="text-gray-700">Guest sessions with licensed therapists on nervous system regulation, trauma-informed boundaries, people-pleasing, and staying emotionally safe in an often chaotic industry.</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-cream p-8 rounded-lg">
                <div className="flex items-start mb-4">
                  <Check className="w-6 h-6 text-brand-yellow mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-brand-plum mb-2">🎵 Music Industry Pros & Special Guests</h3>
                    <p className="text-gray-700">Mentors from across the industry (promoters, touring musicians, songwriters) for candid, practical conversations about booking, touring, promotion, and sustainable creative careers.</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-cream p-8 rounded-lg">
                <div className="flex items-start mb-4">
                  <Check className="w-6 h-6 text-brand-turquoise mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-brand-plum mb-2">🎧 The Sonic Journey Playlists</h3>
                    <p className="text-gray-700">Access to the 450+ song "Sonic Journey" playlist library, pre-linked to Apple Music. Integrated into live sessions and Journal Jams as part of the process.</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-cream p-8 rounded-lg">
                <div className="flex items-start mb-4">
                  <Check className="w-6 h-6 text-brand-purple mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-brand-plum mb-2">💬 Open Q&A / Hot Seats</h3>
                    <p className="text-gray-700">Time each session for members to bring real-life situations: unpaid gigs, boundary issues, creative fear and blocks, relationship dynamics in bands/collabs. Unpacked with both psychology + strategy.</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-cream p-8 rounded-lg">
                <div className="flex items-start mb-4">
                  <Check className="w-6 h-6 text-brand-green mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-brand-plum mb-2">🪩 A Private, Off-Social Community Space</h3>
                    <p className="text-gray-700">No algorithms or randoms; just other serious female+ musicians doing the same inner + outer work. A place for the parts of the journey that don't make it onto Instagram.</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-cream p-8 rounded-lg">
                <div className="flex items-start mb-4">
                  <Check className="w-6 h-6 text-brand-red mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-brand-plum mb-2">📚 Resource Library & Replays</h3>
                    <p className="text-gray-700">Session replays, journaling prompts, and key tools, so members can revisit when needed.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-brand-yellow to-brand-tan p-8 rounded-lg text-brand-charcoal md:col-span-2">
                <div className="flex items-start">
                  <Check className="w-6 h-6 text-brand-charcoal mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">💌 Complimentary Private Substack Membership</h3>
                    <p>Collective members get a private Mindful Musicpreneur Substack membership included: Extra Q&As, Journal Jams, behind-the-scenes notes, and select clips from inside The Collective.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-brand-cream">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center text-brand-plum mb-12">
              How It Works
            </h2>
            <div className="space-y-6 mb-12">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold text-brand-purple mb-3">The Structure — Simple & Intentional</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>One live session each month inside our private community</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>Strictly private access — not a public forum or open group</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>Session recordings uploaded to Mindful Musicpreneur Substack — rewatch anytime</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Two Collective sessions come free with every Mindful Musicpreneur Guide</strong></span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>Membership capped at 200 (1st come, first serve)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>First session launches February 2026</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>New members admitted quarterly</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold text-brand-teal mb-3">Monthly Lineup — Growth Tactics From Industry Experts</h3>
                <p className="text-gray-700 mb-3">Every voice you meet is vetted, experienced & willing to pull back the curtain with honesty, humor, & wisdom. <strong>No inflated résumés, no internet-guru energy. Just real pros with real stories & real receipts.</strong></p>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>• Promoters & Producers</strong> — Career builders who know what makes artists stand out</li>
                  <li><strong>• Touring Artists & Musical Directors</strong> — Those who've lived the pivots and reinventions</li>
                  <li><strong>• Venue Directors & Decision-Makers</strong> — The people who choose who gets on stage and why</li>
                  <li><strong>• Entertainment Attorneys</strong> — Contract clarity, negotiation insight, self-protection</li>
                  <li><strong>• Stylists & Brand Specialists</strong> — Identity, presence, visual storytelling</li>
                  <li><strong>• Marketing & Promotion Pros</strong> — Real-world strategy, not trend-chasing hype</li>
                  <li><strong>• Wellness, Woo, & Personality-Typing Experts</strong> — Astrology, MBTI, Archetypes, Chakras, possibly Human Design</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center text-brand-plum mb-12">
              The Collective Is For Female+ Musicians Who Are:
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <Sparkles className="w-6 h-6 text-brand-purple mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700">Serious about building a sustainable career</p>
              </div>
              <div className="flex items-start">
                <Sparkles className="w-6 h-6 text-brand-purple mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700">Ready for clear direction instead of guesswork</p>
              </div>
              <div className="flex items-start">
                <Sparkles className="w-6 h-6 text-brand-purple mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700">Tired of navigating everything solo</p>
              </div>
              <div className="flex items-start">
                <Sparkles className="w-6 h-6 text-brand-purple mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700">Craving honest guidance from people who've actually done the work</p>
              </div>
              <div className="flex items-start">
                <Sparkles className="w-6 h-6 text-brand-purple mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700">Looking for grounded, supportive, collaborative community (not competitive/performative)</p>
              </div>
              <div className="flex items-start">
                <Sparkles className="w-6 h-6 text-brand-purple mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700">Finished chasing hype & ready for substance, clarity, and real movement</p>
              </div>
              <div className="flex items-start md:col-span-2">
                <Sparkles className="w-6 h-6 text-brand-purple mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700"><strong>Ready to move OUT OF their shadows & INTO their spotlights</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-gradient-to-br from-brand-plum to-brand-purple text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-8">
              How To Apply
            </h2>
            <div className="bg-white/10 backdrop-blur p-8 rounded-lg mb-8">
              <p className="text-xl mb-4">
                The Collective is intentionally small and curated so the community stays high-quality, connected, and supportive.
              </p>
              <p className="mb-4">
                You'll complete a short application so we can make sure the space fits your goals, your energy, and your season of career. Once accepted, you'll get immediate access to the private community and upcoming session calendar.
              </p>
              <p className="text-lg font-bold">
                You MUST HAVE The Mindful Musicpreneur Guide to Apply.
              </p>
            </div>
            <div className="text-center">
              <Link href="/collective/apply">
                <Button size="lg" className="bg-brand-yellow text-brand-charcoal hover:bg-brand-tan mb-4">
                  Apply for The Collective
                </Button>
              </Link>
              <p className="text-sm text-gray-200">
                Don't have the Guide yet? <Link href="/products/guide" className="underline hover:text-brand-yellow">Get it here</Link> (includes 2 free Collective sessions)
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
