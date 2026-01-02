'use client'

import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Loader2, Eye, CheckCircle, XCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { format } from 'date-fns'

interface Application {
  id: string
  userId: string
  status: string
  whyJoin: string
  musicGoals: string
  guideImpact: string
  communityHopes: string
  currentStage: string
  additionalInfo: string | null
  createdAt: string
  reviewedAt: string | null
  user: {
    id: string
    email: string
    firstName: string
    lastName: string | null
    ownsGuide: boolean
    ownsPlanner: boolean
    isCollectiveMember: boolean
  }
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showDenyModal, setShowDenyModal] = useState(false)
  const [welcomeMessage, setWelcomeMessage] = useState('')
  const [denialMessage, setDenialMessage] = useState('')
  const [processing, setProcessing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchApplications()
  }, [statusFilter])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)

      const res = await fetch(`/api/admin/collective/applications?${params}`)
      if (res.ok) {
        const data = await res.json()
        setApplications(data.applications)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch applications',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch applications',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    if (!selectedApplication) return

    try {
      setProcessing(true)
      const res = await fetch(`/api/admin/collective/applications/${selectedApplication.id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ welcomeMessage }),
      })

      if (res.ok) {
        toast({
          title: 'Success',
          description: 'Application approved and welcome email sent',
        })
        setShowApproveModal(false)
        setShowDetails(false)
        setWelcomeMessage('')
        fetchApplications()
      } else {
        toast({
          title: 'Error',
          description: 'Failed to approve application',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Failed to approve application:', error)
      toast({
        title: 'Error',
        description: 'Failed to approve application',
        variant: 'destructive',
      })
    } finally {
      setProcessing(false)
    }
  }

  const handleDeny = async () => {
    if (!selectedApplication) return

    try {
      setProcessing(true)
      const res = await fetch(`/api/admin/collective/applications/${selectedApplication.id}/deny`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ denialMessage }),
      })

      if (res.ok) {
        toast({
          title: 'Success',
          description: 'Application denied and email sent',
        })
        setShowDenyModal(false)
        setShowDetails(false)
        setDenialMessage('')
        fetchApplications()
      } else {
        toast({
          title: 'Error',
          description: 'Failed to deny application',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Failed to deny application:', error)
      toast({
        title: 'Error',
        description: 'Failed to deny application',
        variant: 'destructive',
      })
    } finally {
      setProcessing(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'denied':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-playfair font-bold text-brand-plum mb-2">
            Collective Applications
          </h1>
          <p className="text-gray-600">Review and manage applications to The Collective</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-xs">
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="denied">Denied</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Applications ({applications.length})</CardTitle>
            <CardDescription>
              Click on an application to review and take action
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No applications found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Applicant</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Products</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Applied</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium">{app.user.firstName} {app.user.lastName}</div>
                            <div className="text-sm text-gray-500">{app.user.email}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {app.user.ownsGuide && <Badge variant="outline" className="text-xs">Guide</Badge>}
                            {app.user.ownsPlanner && <Badge variant="outline" className="text-xs">Planner</Badge>}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={getStatusColor(app.status)}>
                            {app.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {format(new Date(app.createdAt), 'MMM d, yyyy')}
                        </td>
                        <td className="px-4 py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedApplication(app)
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

        {/* Application Details Dialog */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
              <DialogDescription>Review the application and take action</DialogDescription>
            </DialogHeader>
            
            {selectedApplication && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Applicant Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span>{selectedApplication.user.firstName} {selectedApplication.user.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span>{selectedApplication.user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Applied:</span>
                      <span>{format(new Date(selectedApplication.createdAt), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge className={getStatusColor(selectedApplication.status)}>
                        {selectedApplication.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Why do you want to join The Collective?</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedApplication.whyJoin}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">What are your music career goals for the next 12 months?</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedApplication.musicGoals}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">How has The Mindful Musicpreneur Guide impacted you?</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedApplication.guideImpact}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">What do you hope to gain from The Collective community?</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedApplication.communityHopes}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">What stage are you at in your music career?</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedApplication.currentStage}</p>
                  </div>
                </div>

                {selectedApplication.additionalInfo && (
                  <div>
                    <h3 className="font-semibold mb-2">Additional Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 whitespace-pre-wrap">{selectedApplication.additionalInfo}</p>
                    </div>
                  </div>
                )}

                {selectedApplication.status === 'pending' && (
                  <div className="flex space-x-3 pt-4">
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => setShowApproveModal(true)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Application
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => setShowDenyModal(true)}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Deny Application
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Approve Modal */}
        <Dialog open={showApproveModal} onOpenChange={setShowApproveModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Approve Application</DialogTitle>
              <DialogDescription>
                The applicant will receive a welcome email with portal access.
              </DialogDescription>
            </DialogHeader>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                Optional Welcome Message
              </label>
              <Textarea
                placeholder="Add a personal welcome message (optional)"
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-2">
                This will be included in the welcome email along with the standard message.
              </p>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowApproveModal(false)}
                disabled={processing}
              >
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleApprove}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Approving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve & Send Email
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Deny Modal */}
        <Dialog open={showDenyModal} onOpenChange={setShowDenyModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deny Application</DialogTitle>
              <DialogDescription>
                The applicant will receive an email with your message.
              </DialogDescription>
            </DialogHeader>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                Optional Message
              </label>
              <Textarea
                placeholder="Add a personal message explaining the decision (optional)"
                value={denialMessage}
                onChange={(e) => setDenialMessage(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-2">
                This will be included in the email along with the standard denial message.
              </p>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDenyModal(false)}
                disabled={processing}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeny}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Denying...
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 mr-2" />
                    Deny & Send Email
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
