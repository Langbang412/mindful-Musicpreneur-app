'use client'

import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, ReactNode } from 'react'
import { isAdmin } from '@/lib/admin'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  FileText,
  UsersRound,
  Settings,
  Mail,
  BarChart3,
  Loader2,
  ShieldAlert,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface AdminLayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Applications', href: '/admin/collective/applications', icon: FileText },
  { name: 'Members', href: '/admin/collective/members', icon: UsersRound },
  { name: 'Content', href: '/admin/content', icon: Settings },
  { name: 'Email List', href: '/admin/emails', icon: Mail },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
]

export function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=' + pathname)
    } else if (status === 'authenticated') {
      if (!isAdmin(session.user?.email)) {
        router.push('/')
      }
    }
  }, [status, session, router, pathname])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
      </div>
    )
  }

  if (!session || !isAdmin(session.user?.email)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <ShieldAlert className="w-6 h-6 text-red-600" />
            </div>
            <CardTitle className="text-center">Access Denied</CardTitle>
            <CardDescription className="text-center">
              You do not have permission to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push('/')} variant="outline">
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200">
          <div className="h-full py-6 px-4">
            <div className="mb-6">
              <h2 className="text-lg font-playfair font-bold text-brand-plum px-3">
                Admin Panel
              </h2>
            </div>
            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                      isActive
                        ? 'bg-brand-purple text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="flex justify-around py-2">
            {navigation.slice(0, 5).map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center px-2 py-1 text-xs',
                    isActive ? 'text-brand-purple' : 'text-gray-600'
                  )}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 bg-gray-50 overflow-auto pb-20 lg:pb-0">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  )
}
