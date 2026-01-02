'use client'

import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, DollarSign, Users, FileText, Mail, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface Stats {
  totalOrders: number
  totalRevenue: number
  totalUsers: number
  pendingApplications: number
  collectiveMembers: number
  emailSubscribers: number
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold text-brand-plum mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage your Mindful Musicpreneur platform</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="w-4 h-4 text-brand-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    ${stats?.totalRevenue.toFixed(2) || '0.00'}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    From {stats?.totalOrders || 0} orders
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Users
                  </CardTitle>
                  <Users className="w-4 h-4 text-brand-purple" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {stats?.totalUsers || 0}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Registered accounts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Collective Members
                  </CardTitle>
                  <Users className="w-4 h-4 text-brand-teal" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {stats?.collectiveMembers || 0}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Active members
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Pending Applications
                  </CardTitle>
                  <FileText className="w-4 h-4 text-brand-coral" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {stats?.pendingApplications || 0}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Needs review
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Email Subscribers
                  </CardTitle>
                  <Mail className="w-4 h-4 text-brand-yellow" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {stats?.emailSubscribers || 0}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Active subscribers
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common administrative tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link href="/admin/collective/applications">
                    <Button className="w-full" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Review Applications
                      {stats?.pendingApplications && stats.pendingApplications > 0 && (
                        <span className="ml-2 bg-brand-coral text-white text-xs px-2 py-1 rounded-full">
                          {stats.pendingApplications}
                        </span>
                      )}
                    </Button>
                  </Link>
                  
                  <Link href="/admin/orders">
                    <Button className="w-full" variant="outline">
                      <DollarSign className="w-4 h-4 mr-2" />
                      View Orders
                    </Button>
                  </Link>

                  <Link href="/admin/users">
                    <Button className="w-full" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Users
                    </Button>
                  </Link>

                  <Link href="/admin/collective/members">
                    <Button className="w-full" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Collective Members
                    </Button>
                  </Link>

                  <Link href="/admin/content">
                    <Button className="w-full" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Manage Content
                    </Button>
                  </Link>

                  <Link href="/admin/emails">
                    <Button className="w-full" variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Email List
                    </Button>
                  </Link>

                  <Link href="/admin/analytics">
                    <Button className="w-full" variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  )
}
