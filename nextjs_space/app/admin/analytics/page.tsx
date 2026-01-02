'use client'

import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface AnalyticsData {
  revenueByDate: Record<string, number>
  revenueByProduct: Record<string, number>
  ordersByDate: Record<string, number>
  userGrowth: Record<string, number>
  collective: {
    totalApplications: number
    approvedApplications: number
    activeMembers: number
    approvalRate: number
  }
  downloads: Array<{
    productType: string
    _count: number
  }>
  recentOrders: Array<{
    id: string
    totalAmount: number
    createdAt: string
    user: {
      email: string
      firstName: string
    }
  }>
}

const COLORS = ['#bc13fe', '#ff3131', '#c69434', '#697b2f', '#50dfc4', '#dfff00']

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('30')
  const { toast } = useToast()

  useEffect(() => {
    fetchAnalytics()
  }, [dateRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/admin/analytics?days=${dateRange}`)
      if (res.ok) {
        const data = await res.json()
        setAnalytics(data)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch analytics',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch analytics',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading || !analytics) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
        </div>
      </AdminLayout>
    )
  }

  // Transform data for charts
  const revenueData = Object.entries(analytics.revenueByDate).map(([date, revenue]) => ({
    date,
    revenue: Number(revenue.toFixed(2)),
  }))

  const ordersData = Object.entries(analytics.ordersByDate).map(([date, orders]) => ({
    date,
    orders,
  }))

  const productRevenueData = Object.entries(analytics.revenueByProduct).map(([product, revenue]) => ({
    name: product,
    value: Number(revenue.toFixed(2)),
  }))

  const userGrowthData = Object.entries(analytics.userGrowth).map(([date, users]) => ({
    date,
    users,
  }))

  const totalRevenue = Object.values(analytics.revenueByDate).reduce((a, b) => a + b, 0)
  const totalOrders = Object.values(analytics.ordersByDate).reduce((a, b) => a + b, 0)
  const totalUsers = Object.values(analytics.userGrowth).reduce((a, b) => a + b, 0)

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-brand-plum mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600">Detailed insights and performance metrics</p>
          </div>
          <div className="w-40">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-green">
                ${totalRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Last {dateRange} days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-purple">
                {totalOrders}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Last {dateRange} days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                New Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-teal">
                {totalUsers}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Last {dateRange} days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Collective Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-coral">
                {analytics.collective.activeMembers}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {analytics.collective.approvalRate.toFixed(0)}% approval rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>
              Daily revenue for the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            {revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value: any) => `$${value.toFixed(2)}`}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#bc13fe"
                    strokeWidth={2}
                    dot={{ fill: '#bc13fe', r: 4 }}
                    name="Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No revenue data for this period
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Revenue by Product */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Product</CardTitle>
              <CardDescription>
                Total revenue breakdown by product type
              </CardDescription>
            </CardHeader>
            <CardContent>
              {productRevenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productRevenueData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: $${value.toFixed(0)}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {productRevenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `$${value.toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No product revenue data
                </div>
              )}
            </CardContent>
          </Card>

          {/* Orders Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Orders Over Time</CardTitle>
              <CardDescription>
                Number of orders per day
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ordersData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ordersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" fill="#50dfc4" name="Orders" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No orders data for this period
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Collective Stats */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Collective Statistics</CardTitle>
            <CardDescription>
              Overview of The Collective community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-brand-purple">
                  {analytics.collective.totalApplications}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Applications</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {analytics.collective.approvedApplications}
                </div>
                <div className="text-sm text-gray-600 mt-1">Approved</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-brand-teal">
                  {analytics.collective.activeMembers}
                </div>
                <div className="text-sm text-gray-600 mt-1">Active Members</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-brand-coral">
                  {analytics.collective.approvalRate.toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600 mt-1">Approval Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest 10 completed orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            {analytics.recentOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Order ID
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {analytics.recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-mono text-gray-600">
                          {order.id.slice(0, 8)}...
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div>
                            <div className="font-medium">{order.user.firstName}</div>
                            <div className="text-gray-500">{order.user.email}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium">
                          ${order.totalAmount.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No recent orders
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
