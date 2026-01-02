'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Check, Heart } from 'lucide-react'

export default function BogoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24" style={{ background: 'linear-gradient(135deg, #c69434 0%, #ff3131 50%, #bc13fe 100%)' }}>
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white mb-12">
              <div className="inline-block bg-white text-brand-charcoal px-6 py-2 rounded-full font-bold mb-6">
                SAVE $20
              </div>
              <h1 className="text-4xl md:text-6xl font-playfair font-bold leading-tight mb-6">
                Buy One, Gift One
              </h1>
              <p className="text-2xl md:text-3xl mb-6">
                Rise With Someone + Gift-Lift Someone = A Win-Win
              </p>
            </div>
            <div className="relative h-[400px] md:h-[500px] max-w-4xl mx-auto">
              <Image
                src="/BOGOGIRLS.png"
                alt="BOGO - Rise Together"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-brand-plum mb-6">
                Treat Yourself or Treat Yourself & A Friend
              </h2>
              <p className="text-xl text-gray-700">
                We Included A Buy One-Give One Option Because It's Fun To Take A New Adventure With A Friend & A BOGO Lets You Rise With Someone + Gift-Lift Someone = A Win-Win
              </p>
            </div>

            <div className="prose prose-lg mx-auto text-gray-700 mb-12">
              <p>
                I Love & Believe in Surrounding Myself With Great Energy & Win-Wins, Both in Life & in Business... For me, that embodies everything I want to pay forward with this work & all the work I do.
              </p>
              <p>
                My goal was & is to create value & an expansive, inclusive, intentional network with an accessible entry level that leveled the playing field & created an equitable community of diverse talent...
              </p>
              <p className="text-center text-xl font-semibold text-brand-purple">
                Something with Brandi-level "women supporting women," Gaga's "follow your dreams & take your people with you," P!nk's "turn the grit into a pearl," & Beyoncé's "build the community you want to see" all rolled into one.
              </p>
            </div>

            <div className="bg-gradient-to-br from-brand-yellow to-brand-tan p-8 rounded-lg text-brand-charcoal mb-12">
              <p className="text-xl mb-4">
                When you invest in your own growth & hand that spark to another woman—whether she's a friend, collaborator, bandmate, or someone who needs a little nudge—you amplify your own impact too.
              </p>
              <p className="text-2xl font-bold">
                That's the power move. <br/>
                That's the sisterhood. <br/>
                And that's way more valuable than a coupon.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-brand-cream">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center text-brand-plum mb-12">
              How BOGO Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-4xl font-bold text-brand-purple mb-4">1</div>
                <h3 className="text-xl font-playfair font-bold text-brand-plum mb-3">
                  Two Guides, Two Planners, One Iconic Duo
                </h3>
                <p className="text-gray-700">
                  When you grab the Mindful Musicpreneur Guide for yourself, you can snag a second one for your bestie and save $20. You both get a FREE Mindful Muse Quarterly Planner.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-4xl font-bold text-brand-teal mb-4">2</div>
                <h3 className="text-xl font-playfair font-bold text-brand-plum mb-3">
                  Simple Gifting
                </h3>
                <p className="text-gray-700">
                  Just enter your bestie's email at checkout and—boom—your gift lands in their inbox with a "Congratulations, you've been gifted!" message.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-4xl font-bold text-brand-coral mb-4">3</div>
                <h3 className="text-xl font-playfair font-bold text-brand-plum mb-3">
                  Rise Together
                </h3>
                <p className="text-gray-700">
                  Both of you get the chance to apply for The Collective—so you can deep-dive, level up, and clear the shadows together.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-plum to-brand-purple text-white p-12 rounded-lg text-center">
              <p className="text-2xl font-playfair mb-6">
                Because rising is fun… but giving the gift of rising? <strong>That's legendary.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center text-brand-plum mb-12">
              What Both Of You Get
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-playfair font-bold text-brand-purple mb-4">For You:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>The Mindful Musicpreneur Guide (200+ pages)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>Mindful Muse Quarterly Planner (FREE bonus)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>450+ song Sonic Journey playlists</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>The Woo of You section</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>2 free sessions in The Collective</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-purple mr-2 mt-1 flex-shrink-0" />
                    <span>Eligibility to apply for The Collective</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-playfair font-bold text-brand-coral mb-4">For Your Friend:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-coral mr-2 mt-1 flex-shrink-0" />
                    <span>The Mindful Musicpreneur Guide (200+ pages)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-coral mr-2 mt-1 flex-shrink-0" />
                    <span>Mindful Muse Quarterly Planner (FREE bonus)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-coral mr-2 mt-1 flex-shrink-0" />
                    <span>450+ song Sonic Journey playlists</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-coral mr-2 mt-1 flex-shrink-0" />
                    <span>The Woo of You section</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-coral mr-2 mt-1 flex-shrink-0" />
                    <span>2 free sessions in The Collective</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-brand-coral mr-2 mt-1 flex-shrink-0" />
                    <span>Eligibility to apply for The Collective</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-brand-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center text-brand-plum mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-brand-purple mb-2">How Does BOGO Gifting Work?</h3>
                <p className="text-gray-700">
                  Super Easy: you enter your friend's email at checkout, and the Mindful Musicpreneur Guide + Complimentary Mindful Muse Quarterly Planner gets delivered straight to their inbox with a "You've been gifted!" message. You'll receive your copies at the same time. Each of you receive a guide. Each of you receive a planner. And One Big Spark of Collaborative Magic Begins.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-brand-purple mb-2">Can I get a refund if I gift the guide & the recipient doesn't use it?</h3>
                <p className="text-gray-700">
                  Because this is a digital product, all sales are final. However—if there's ever an issue with the download, a broken link, or anything glitchy—we'll happily send a fresh replacement copy. Your gift will land exactly where it's meant to.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-brand-purple mb-2">What if I want to gift more than one recipient?</h3>
                <p className="text-gray-700">
                  Go for it! Just complete a separate purchase & email address for each person you want to surprise. Each gift is sent individually so every recipient gets their own clean download link, their own planner, and their own invitation to apply for The Collective—no crossed wires, no confusion, just good clean sisterhood energy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-brand-purple via-brand-coral to-brand-yellow text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Heart className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Rise Together
            </h2>
            <p className="text-xl mb-8">
              2 Guides + 2 Planners + 4 Free Collective Sessions = $100 (Save $20)
            </p>
            <Link href="/checkout?product=bogo">
              <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100">
                Get The BOGO - $100
              </Button>
            </Link>
            <p className="mt-6 text-sm text-gray-100">
              Digital download • Instant access for both • All sales final
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
