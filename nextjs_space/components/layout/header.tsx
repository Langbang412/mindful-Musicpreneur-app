'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function Header() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-playfair font-bold text-brand-plum">
              The Mindful Musicpreneur<sup className="text-xs">®</sup>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products/guide" className="text-gray-700 hover:text-brand-purple transition">
              The Guide
            </Link>
            <Link href="/products/planner" className="text-gray-700 hover:text-brand-purple transition">
              The Planner
            </Link>
            <Link href="/products/bogo" className="text-gray-700 hover:text-brand-purple transition">
              BOGO
            </Link>
            <Link href="/collective" className="text-gray-700 hover:text-brand-purple transition">
              The Collective
            </Link>
            
            {session ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-brand-purple transition">
                  Dashboard
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="bg-brand-purple hover:bg-brand-plum">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/products/guide" className="block text-gray-700 hover:text-brand-purple">
              The Guide
            </Link>
            <Link href="/products/planner" className="block text-gray-700 hover:text-brand-purple">
              The Planner
            </Link>
            <Link href="/products/bogo" className="block text-gray-700 hover:text-brand-purple">
              BOGO
            </Link>
            <Link href="/collective" className="block text-gray-700 hover:text-brand-purple">
              The Collective
            </Link>
            {session ? (
              <>
                <Link href="/dashboard" className="block text-gray-700 hover:text-brand-purple">
                  Dashboard
                </Link>
                <button onClick={() => signOut()} className="block text-gray-700 hover:text-brand-purple">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="block text-gray-700 hover:text-brand-purple">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="block text-gray-700 hover:text-brand-purple">
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
