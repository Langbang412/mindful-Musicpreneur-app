'use client'

import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Loader2, Search, Download } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { format } from 'date-fns'

interface EmailSubscriber {
  id: string
  email: string
  firstName: string
  source: string
  subscribed: boolean
  subscribedAt: string
  unsubscribedAt: string | null
}

export default function EmailsPage() {
  const [subscribers, setSubscribers] = useState<EmailSubscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sourceFilter, setSourceFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('true')
  const [exporting, setExporting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      setLoading(true)
      // Note: We'll need to create this API endpoint
      const res = await fetch('/api/admin/emails')
      if (res.ok) {
        const data = await res.json()
        setSubscribers(data.subscribers || [])
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch email subscribers',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Failed to fetch subscribers:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch email subscribers',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async () => {
    try {
      setExporting(true)
      const res = await fetch('/api/admin/emails/export')
      if (res.ok) {
        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `email-subscribers-${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast({
          title: 'Success',
          description: 'Email list exported successfully',
        })
      } else {
        toast({
          title: 'Error',
          description: 'Failed to export email list',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Failed to export:', error)
      toast({
        title: 'Error',
        description: 'Failed to export email list',
        variant: 'destructive',
      })
    } finally {
      setExporting(false)
    }
  }

  const filteredSubscribers = subscribers.filter((sub) => {
    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      if (
        !sub.email.toLowerCase().includes(searchLower) &&
        !sub.firstName.toLowerCase().includes(searchLower)
      ) {
        return false
      }
    }

    // Source filter
    if (sourceFilter && sub.source !== sourceFilter) {
      return false
    }

    // Status filter
    if (statusFilter === 'true' && !sub.subscribed) {
      return false
    } else if (statusFilter === 'false' && sub.subscribed) {
      return false
    }

    return true
  })

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-brand-plum mb-2">
              Email List Management
            </h1>
            <p className="text-gray-600">View and export email subscribers</p>
          </div>
          <Button
            onClick={handleExport}
            disabled={exporting || subscribers.length === 0}
          >
            {exporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export to CSV
              </>
            )}
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Email or name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Source</label>
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All sources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All sources</SelectItem>
                    <SelectItem value="freebie">Freebie</SelectItem>
                    <SelectItem value="guide">Guide</SelectItem>
                    <SelectItem value="planner">Planner</SelectItem>
                    <SelectItem value="bogo">BOGO</SelectItem>
                    <SelectItem value="collective">Collective</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All statuses</SelectItem>
                    <SelectItem value="true">Subscribed</SelectItem>
                    <SelectItem value="false">Unsubscribed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Subscribers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{subscribers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Subscribers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {subscribers.filter((s) => s.subscribed).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Unsubscribed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {subscribers.filter((s) => !s.subscribed).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscribers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Subscribers ({filteredSubscribers.length})</CardTitle>
            <CardDescription>
              All email subscribers from various sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
              </div>
            ) : filteredSubscribers.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No subscribers found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Source</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Subscribed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredSubscribers.map((subscriber) => (
                      <tr key={subscriber.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{subscriber.email}</td>
                        <td className="px-4 py-3 text-sm font-medium">
                          {subscriber.firstName}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="capitalize">
                            {subscriber.source}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          {subscriber.subscribed ? (
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          ) : (
                            <Badge variant="outline">Unsubscribed</Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {format(new Date(subscriber.subscribedAt), 'MMM d, yyyy')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
