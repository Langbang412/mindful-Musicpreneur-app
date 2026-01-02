'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, FileText, Users, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface UserData {
  id: string
  email: string
  firstName: string
  ownsGuide: boolean
  ownsPlanner: boolean
  ownsFreebie: boolean
  isCollectiveMember: boolean
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/dashboard')
    } else if (status === 'authenticated') {
      fetchUserData()
    }
  }, [status, router])

  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/user/me')
      if (res.ok) {
        const data = await res.json()
        setUserData(data)
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
      </div>
    )
  }

  if (!session || !userData) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-playfair font-bold text-brand-plum">
              Welcome back, {userData.firstName}!
            </h1>
            <p className="text-gray-600 mt-2">Access your content and manage your account</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Guide Access */}
            {userData.ownsGuide && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-purple" />
                    The Mindful Musicpreneur Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    200+ page shadow work guide with 450+ song playlists
                  </p>
                  <Link href="/api/downloads/guide">
                    <Button className="w-full bg-brand-purple hover:bg-brand-plum">
                      <Download className="w-4 h-4 mr-2" />
                      Download Guide
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Planner Access */}
            {(userData.ownsGuide || userData.ownsPlanner) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-teal" />
                    Mindful Muse Planner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Quarterly planner for musicians
                  </p>
                  <Link href="/api/downloads/planner">
                    <Button className="w-full bg-brand-teal hover:bg-brand-teal/90">
                      <Download className="w-4 h-4 mr-2" />
                      Download Planner
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Freebie Access */}
            {userData.ownsFreebie && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-coral" />
                    Free Resource
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Your complimentary resource
                  </p>
                  <Link href="/api/downloads/freebie">
                    <Button className="w-full bg-brand-coral hover:bg-brand-coral/90">
                      <Download className="w-4 h-4 mr-2" />
                      Download Resource
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* The Collective Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Collective Access */}
            {userData.isCollectiveMember ? (
              <Card className="bg-gradient-to-br from-brand-plum to-brand-purple text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    The Collective - Member Portal
                  </CardTitle>
                  <CardDescription className="text-gray-200">
                    You're an active Collective member
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/collective/portal">
                    <Button className="w-full bg-brand-yellow text-brand-charcoal hover:bg-brand-tan">
                      Access Portal
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : userData.ownsGuide ? (
              <Card className="border-2 border-brand-purple">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-brand-purple" />
                    The Collective
                  </CardTitle>
                  <CardDescription>
                    You're eligible to apply for The Collective
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Join our private community for female musicians with live monthly sessions, industry experts, and real support.
                  </p>
                  <Link href="/collective/apply">
                    <Button className="w-full bg-brand-purple hover:bg-brand-plum">
                      Apply Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-brand-purple" />
                    The Collective
                  </CardTitle>
                  <CardDescription>
                    Requires The Mindful Musicpreneur Guide
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Get The Mindful Musicpreneur Guide to apply for our private community.
                  </p>
                  <Link href="/products/guide">
                    <Button className="w-full" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{userData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold">{userData.firstName}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* No Content Yet */}
          {!userData.ownsGuide && !userData.ownsPlanner && !userData.ownsFreebie && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>
                  You don't have any content yet. Explore our products to begin your journey!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/products/guide">
                    <Button className="bg-brand-purple hover:bg-brand-plum">
                      Get The Guide
                    </Button>
                  </Link>
                  <Link href="/freebie">
                    <Button variant="outline">
                      Get Free Resource
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
