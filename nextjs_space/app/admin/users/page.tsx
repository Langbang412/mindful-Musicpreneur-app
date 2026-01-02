'use client'

import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Loader2, Search, Eye, Check, X } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'
import { format } from 'date-fns'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string | null
  createdAt: string
  ownsGuide: boolean
  ownsPlanner: boolean
  ownsFreebie: boolean
  isCollectiveMember: boolean
  collectiveApprovedAt: string | null
  subscribed: boolean
  _count: {
    orders: number
    applications: number
  }
}

interface UserDetails extends User {
  orders: Array<{
    id: string
    totalAmount: number
    status: string
    createdAt: string
    orderItems: Array<{
      product: {
        name: string
      }
    }>
  }>
  applications: Array<{
    id: string
    status: string
    createdAt: string
  }>
  pdfDownloads: Array<{
    id: string
    productType: string
    createdAt: string
  }>
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [hasPurchaseFilter, setHasPurchaseFilter] = useState('')
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [updatingUser, setUpdatingUser] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchUsers()
  }, [hasPurchaseFilter])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (hasPurchaseFilter) params.append('hasPurchase', hasPurchaseFilter)

      const res = await fetch(`/api/admin/users?${params}`)
      if (res.ok) {
        const data = await res.json()
        setUsers(data.users)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch users',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchUserDetails = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`)
      if (res.ok) {
        const data = await res.json()
        setSelectedUser(data.user)
        setShowDetails(true)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch user details',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Failed to fetch user details:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch user details',
        variant: 'destructive',
      })
    }
  }

  const updateUserAccess = async (userId: string, field: string, value: boolean) => {
    try {
      setUpdatingUser(true)
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      })

      if (res.ok) {
        toast({
          title: 'Success',
          description: 'User access updated',
        })
        // Refresh user details
        fetchUserDetails(userId)
        // Refresh users list
        fetchUsers()
      } else {
        toast({
          title: 'Error',
          description: 'Failed to update user access',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Failed to update user:', error)
      toast({
        title: 'Error',
        description: 'Failed to update user access',
        variant: 'destructive',
      })
    } finally {
      setUpdatingUser(false)
    }
  }

  const handleSearch = () => {
    fetchUsers()
  }

  const filteredUsers = users.filter((user) => {
    if (!search) return true
    const searchLower = search.toLowerCase()
    return (
      user.email.toLowerCase().includes(searchLower) ||
      user.firstName.toLowerCase().includes(searchLower) ||
      (user.lastName && user.lastName.toLowerCase().includes(searchLower))
    )
  })

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-playfair font-bold text-brand-plum mb-2">
            User Management
          </h1>
          <p className="text-gray-600">View and manage all users and their access</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Email or name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button onClick={handleSearch} size="icon">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Purchase Status</label>
                <Select value={hasPurchaseFilter} onValueChange={setHasPurchaseFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All users" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All users</SelectItem>
                    <SelectItem value="true">Has purchases</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
            <CardDescription>
              Click on a user to view full details and manage access
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No users found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">User</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Products</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Orders</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Joined</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium">{user.firstName} {user.lastName}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {user.ownsGuide && <Badge variant="outline" className="text-xs">Guide</Badge>}
                            {user.ownsPlanner && <Badge variant="outline" className="text-xs">Planner</Badge>}
                            {user.ownsFreebie && <Badge variant="outline" className="text-xs">Freebie</Badge>}
                            {user.isCollectiveMember && <Badge className="bg-brand-purple text-xs">Collective</Badge>}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {user._count.orders}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {format(new Date(user.createdAt), 'MMM d, yyyy')}
                        </td>
                        <td className="px-4 py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => fetchUserDetails(user.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Details Dialog */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>User Details & Access Management</DialogTitle>
              <DialogDescription>View and manage user information and product access</DialogDescription>
            </DialogHeader>
            
            {selectedUser && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">User Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span>{selectedUser.firstName} {selectedUser.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span>{selectedUser.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Joined:</span>
                      <span>{format(new Date(selectedUser.createdAt), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email Subscribed:</span>
                      <span>{selectedUser.subscribed ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-600" />}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Product Access</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedUser.ownsGuide}
                          onCheckedChange={(checked) => updateUserAccess(selectedUser.id, 'ownsGuide', !!checked)}
                          disabled={updatingUser}
                        />
                        <span className="font-medium">The Mindful Musicpreneur Guide</span>
                      </div>
                      {selectedUser.ownsGuide && <Badge variant="outline">Active</Badge>}
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedUser.ownsPlanner}
                          onCheckedChange={(checked) => updateUserAccess(selectedUser.id, 'ownsPlanner', !!checked)}
                          disabled={updatingUser}
                        />
                        <span className="font-medium">The Mindful Muse Quarterly Planner</span>
                      </div>
                      {selectedUser.ownsPlanner && <Badge variant="outline">Active</Badge>}
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedUser.isCollectiveMember}
                          onCheckedChange={(checked) => updateUserAccess(selectedUser.id, 'isCollectiveMember', !!checked)}
                          disabled={updatingUser}
                        />
                        <span className="font-medium">The Collective Membership</span>
                      </div>
                      {selectedUser.isCollectiveMember && (
                        <Badge className="bg-brand-purple">Member</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Purchase History ({selectedUser.orders.length})</h3>
                  {selectedUser.orders.length === 0 ? (
                    <p className="text-gray-500 text-sm">No orders yet</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedUser.orders.map((order) => (
                        <div key={order.id} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-medium">${order.totalAmount.toFixed(2)}</div>
                              <div className="text-sm text-gray-500">
                                {format(new Date(order.createdAt), 'MMM d, yyyy')}
                              </div>
                            </div>
                            <Badge variant="outline">{order.status}</Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            {order.orderItems.map((item, idx) => (
                              <span key={idx}>
                                {item.product.name}
                                {idx < order.orderItems.length - 1 && ', '}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Collective Applications ({selectedUser.applications.length})</h3>
                  {selectedUser.applications.length === 0 ? (
                    <p className="text-gray-500 text-sm">No applications</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedUser.applications.map((app) => (
                        <div key={app.id} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                          <div>
                            <div className="text-sm text-gray-500">
                              {format(new Date(app.createdAt), 'MMM d, yyyy')}
                            </div>
                          </div>
                          <Badge variant="outline">{app.status}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Download Activity ({selectedUser.pdfDownloads.length})</h3>
                  {selectedUser.pdfDownloads.length === 0 ? (
                    <p className="text-gray-500 text-sm">No downloads yet</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedUser.pdfDownloads.slice(0, 5).map((download) => (
                        <div key={download.id} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                          <span className="text-sm capitalize">{download.productType}</span>
                          <span className="text-sm text-gray-500">
                            {format(new Date(download.createdAt), 'MMM d, h:mm a')}
                          </span>
                        </div>
                      ))}
                      {selectedUser.pdfDownloads.length > 5 && (
                        <p className="text-sm text-gray-500 text-center">
                          +{selectedUser.pdfDownloads.length - 5} more downloads
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
