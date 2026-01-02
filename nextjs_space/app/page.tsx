'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTS } from '@/lib/products'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-plum via-brand-purple to-brand-blue text-white py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-playfair font-bold leading-tight mb-6">
                  The Mindful Musicpreneur<sup className="text-2xl">®</sup>
                </h1>
                <p className="text-xl md:text-2xl font-raleway mb-4">
                  The First 360° System That Merges Strategic Music Career Planning With Deep Shadow Work
                </p>
                <p className="text-lg mb-8 text-gray-200">
                  Finally break your sabotaging patterns & step boldly into your spotlight.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/products/guide">
                    <Button size="lg" className="w-full sm:w-auto bg-brand-yellow text-brand-charcoal hover:bg-brand-tan">
                      Get The Guide
                    </Button>
                  </Link>
                  <Link href="/freebie">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-brand-plum">
                      Free Resource
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src="/TheMindfulMusicpreneurWebsiteHeroImage.png"
                  alt="The Mindful Musicpreneur System"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* What Sets Us Apart */}
        <section className="py-16 bg-brand-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center text-brand-plum mb-12">
              What Sets Us Apart From The Rest...
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-playfair font-bold text-brand-plum mb-4">
                  It's usually 99.9% self-doubt, creative blocks, or a shadow of the fear of truly being seen...
                </h3>
                <p className="text-gray-700 mb-4">
                  If you're like the many artists I work with in my private consulting sessions…
                </p>
                <p className="text-gray-700 mb-4">
                  It's probably because you're trying to fix the output without understanding the input:
                </p>
                <p className="text-xl font-bold text-brand-purple mb-4">
                  Hello- it's YOU you're looking for.
                </p>
                <p className="text-gray-700">
                  Introducing The Mindful Musicpreneur: The only system that connects your inner world to your outer success.
                </p>
              </div>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-bold text-brand-plum mb-2">The Core Shadow Work Guide (200+ Pages)</h4>
                  <p className="text-gray-600 text-sm">
                    Dismantle limiting beliefs and creative blocks with targeted journal prompts designed specifically for the artist's psyche.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-bold text-brand-teal mb-2">"The Woo of You" Deep-Dive System</h4>
                  <p className="text-gray-600 text-sm">
                    We integrate Myers-Briggs, Archetypes, Astrology, and Chakras to help you diagnose your unique creative patterns.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-bold text-brand-coral mb-2">The 450+ Song Sonic Journey</h4>
                  <p className="text-gray-600 text-sm">
                    You can't think your way through shadow work. You have to feel it. Our curated Apple Music playlists unlock insights words alone can't reach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center text-brand-plum mb-12">
              Choose Your Path
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Guide Card */}
              <div className="bg-white border-2 border-brand-plum rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                <div className="relative h-64">
                  <Image
                    src={PRODUCTS.guide.image}
                    alt={PRODUCTS.guide.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-playfair font-bold text-brand-plum mb-2">
                    {PRODUCTS.guide.name}
                  </h3>
                  <p className="text-3xl font-bold text-brand-purple mb-4">
                    ${PRODUCTS.guide.price}
                  </p>
                  <p className="text-gray-600 mb-6">
                    {PRODUCTS.guide.description}
                  </p>
                  <Link href="/products/guide">
                    <Button className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>

              {/* BOGO Card - Featured */}
              <div className="bg-gradient-to-br from-brand-purple to-brand-blue text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform md:scale-105">
                <div className="bg-brand-yellow text-brand-charcoal text-center py-2 font-bold">
                  BEST VALUE
                </div>
                <div className="relative h-64">
                  <Image
                    src={PRODUCTS.bogo.image}
                    alt={PRODUCTS.bogo.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-playfair font-bold mb-2">
                    {PRODUCTS.bogo.name}
                  </h3>
                  <p className="text-3xl font-bold mb-4">
                    ${PRODUCTS.bogo.price}
                  </p>
                  <p className="mb-6">
                    {PRODUCTS.bogo.description}
                  </p>
                  <Link href="/products/bogo">
                    <Button className="w-full bg-brand-yellow text-brand-charcoal hover:bg-brand-tan">
                      Rise Together
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Planner Card */}
              <div className="bg-white border-2 border-brand-teal rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                <div className="relative h-64">
                  <Image
                    src={PRODUCTS.planner.image}
                    alt={PRODUCTS.planner.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-playfair font-bold text-brand-teal mb-2">
                    {PRODUCTS.planner.name}
                  </h3>
                  <p className="text-3xl font-bold text-brand-purple mb-4">
                    ${PRODUCTS.planner.price}
                  </p>
                  <p className="text-gray-600 mb-6">
                    {PRODUCTS.planner.description}
                  </p>
                  <Link href="/products/planner">
                    <Button className="w-full bg-brand-teal hover:bg-brand-teal/90">
                      Get The Planner
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Collective CTA */}
        <section className="py-16 bg-gradient-to-r from-brand-charcoal to-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Ready for The Green Room Vibe?
            </h2>
            <p className="text-xl mb-8">
              Join The Collective - The Personal Power Happy Hour™ for Female Musicians
            </p>
            <Link href="/collective">
              <Button size="lg" className="bg-brand-turquoise hover:bg-brand-teal">
                Learn About The Collective
              </Button>
            </Link>
          </div>
        </section>

        {/* Meet Jen Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center text-brand-plum mb-8">
              Meet Jen
            </h2>
            <div className="prose prose-lg mx-auto text-gray-700">
              <p>
                If Stevie Nicks & Brené Brown teamed up to run a music business & mindfulness bootcamp — you'd probably find Jen Hatcher behind the mic & producing it.
              </p>
              <p>
                A national festival & show promoter, producer for headline talent & elite events + artist consultant, Jen blends hard-won industry experience with mindful strategy and a touch of modern woo. Through The Mindful Musicpreneur, she helps artists & creatives find their rhythm — building careers that are both sustainable and soul-satisfying.
              </p>
              <p>
                Her work bridges the gap between creative intuition & grounded execution — where the hustle meets the healing.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
