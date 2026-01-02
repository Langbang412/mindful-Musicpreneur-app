'use client'

import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Loader2, Search, Eye, Download } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { format } from 'date-fns'

interface Order {
  id: string
  userId: string
  status: string
  totalAmount: number
  currency: string
  isBogoOrder: boolean
  recipientEmail: string | null
  recipientFirstName: string | null
  createdAt: string
  completedAt: string | null
  user: {
    id: string
    email: string
    firstName: string
    lastName: string | null
  }
  orderItems: Array<{
    id: string
    quantity: number
    price: number
    product: {
      id: string
      name: string
      type: string
    }
  }>
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [productFilter, setProductFilter] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchOrders()
  }, [statusFilter, productFilter])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (statusFilter) params.append('status', statusFilter)
      if (productFilter) params.append('product', productFilter)

      const res = await fetch(`/api/admin/orders?${params}`)
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch orders',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch orders',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchOrders()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredOrders = orders.filter((order) => {
    if (!search) return true
    const searchLower = search.toLowerCase()
    return (
      order.id.toLowerCase().includes(searchLower) ||
      order.user.email.toLowerCase().includes(searchLower) ||
      order.user.firstName.toLowerCase().includes(searchLower)
    )
  })

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-playfair font-bold text-brand-plum mb-2">
            Orders Management
          </h1>
          <p className="text-gray-600">View and manage all customer orders</p>
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
                <div className="flex space-x-2">
                  <Input
                    placeholder="Order ID, email, or name"
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
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Product</label>
                <Select value={productFilter} onValueChange={setProductFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All products" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All products</SelectItem>
                    <SelectItem value="guide">Guide</SelectItem>
                    <SelectItem value="planner">Planner</SelectItem>
                    <SelectItem value="bogo">BOGO</SelectItem>
                    <SelectItem value="collective_monthly">Collective Monthly</SelectItem>
                    <SelectItem value="collective_yearly">Collective Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders ({filteredOrders.length})</CardTitle>
            <CardDescription>
              Click on an order to view full details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No orders found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Order ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Customer</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Products</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-mono text-gray-600">
                          {order.id.slice(0, 8)}...
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div>
                            <div className="font-medium">{order.user.firstName} {order.user.lastName}</div>
                            <div className="text-gray-500">{order.user.email}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="space-y-1">
                            {order.orderItems.map((item) => (
                              <div key={item.id} className="text-gray-700">
                                {item.product.name} {item.quantity > 1 && `(x${item.quantity})`}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium">
                          ${order.totalAmount.toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {format(new Date(order.createdAt), 'MMM d, yyyy')}
                        </td>
                        <td className="px-4 py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedOrder(order)
                              setShowDetails(true)
                            }}
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

        {/* Order Details Dialog */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>Full information about this order</DialogDescription>
            </DialogHeader>
            
            {selectedOrder && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Order Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-mono text-sm">{selectedOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge className={getStatusColor(selectedOrder.status)}>
                        {selectedOrder.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-medium">${selectedOrder.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span>{format(new Date(selectedOrder.createdAt), 'MMM d, yyyy h:mm a')}</span>
                    </div>
                    {selectedOrder.completedAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completed:</span>
                        <span>{format(new Date(selectedOrder.completedAt), 'MMM d, yyyy h:mm a')}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span>{selectedOrder.user.firstName} {selectedOrder.user.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span>{selectedOrder.user.email}</span>
                    </div>
                  </div>
                </div>

                {selectedOrder.isBogoOrder && selectedOrder.recipientEmail && (
                  <div>
                    <h3 className="font-semibold mb-2">BOGO Recipient</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span>{selectedOrder.recipientFirstName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span>{selectedOrder.recipientEmail}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.orderItems.map((item) => (
                      <div key={item.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                        <div>
                          <div className="font-medium">{item.product.name}</div>
                          <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                        </div>
                        <div className="font-medium">${item.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
