'use client'

import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, UserCheck, UserX } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { format } from 'date-fns'

interface Member {
  id: string
  email: string
  firstName: string
  lastName: string | null
  collectiveApprovedAt: string | null
  collectiveMembershipType: string | null
  collectiveStripeSubscriptionId: string | null
  createdAt: string
  _count: {
    pdfDownloads: number
  }
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [showRevokeModal, setShowRevokeModal] = useState(false)
  const [processing, setProcessing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/collective/members')
      if (res.ok) {
        const data = await res.json()
        setMembers(data.members)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch members',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Failed to fetch members:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch members',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleToggleAccess = async (memberId: string, grantAccess: boolean) => {
    try {
      setProcessing(true)
      const res = await fetch(`/api/admin/collective/members/${memberId}/toggle-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grantAccess }),
      })

      if (res.ok) {
        toast({
          title: 'Success',
          description: grantAccess ? 'Member access granted' : 'Member access revoked',
        })
        setShowRevokeModal(false)
        fetchMembers()
      } else {
        toast({
          title: 'Error',
          description: 'Failed to update member access',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Failed to toggle member access:', error)
      toast({
        title: 'Error',
        description: 'Failed to update member access',
        variant: 'destructive',
      })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-playfair font-bold text-brand-plum mb-2">
            Collective Members
          </h1>
          <p className="text-gray-600">Manage active Collective members and their access</p>
        </div>

        {/* Members Table */}
        <Card>
          <CardHeader>
            <CardTitle>Active Members ({members.length})</CardTitle>
            <CardDescription>
              All approved members with portal access
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
              </div>
            ) : members.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No members yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Member</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Membership Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Approved Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Activity</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {members.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium">{member.firstName} {member.lastName}</div>
                            <div className="text-sm text-gray-500">{member.email}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {member.collectiveMembershipType ? (
                            <Badge className="bg-brand-purple">
                              {member.collectiveMembershipType}
                            </Badge>
                          ) : (
                            <span className="text-sm text-gray-500">No subscription</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {member.collectiveApprovedAt
                            ? format(new Date(member.collectiveApprovedAt), 'MMM d, yyyy')
                            : '-'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm">
                            <div>{member._count.pdfDownloads} downloads</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setSelectedMember(member)
                              setShowRevokeModal(true)
                            }}
                          >
                            <UserX className="w-4 h-4 mr-1" />
                            Revoke
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

        {/* Revoke Access Modal */}
        <Dialog open={showRevokeModal} onOpenChange={setShowRevokeModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Revoke Member Access</DialogTitle>
              <DialogDescription>
                Are you sure you want to revoke portal access for{' '}
                <strong>
                  {selectedMember?.firstName} {selectedMember?.lastName}
                </strong>
                ?
              </DialogDescription>
            </DialogHeader>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This will remove their access to The Collective portal.
                Their subscription (if active) will not be cancelled automatically.
              </p>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowRevokeModal(false)}
                disabled={processing}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => selectedMember && handleToggleAccess(selectedMember.id, false)}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Revoking...
                  </>
                ) : (
                  <>
                    <UserX className="w-4 h-4 mr-2" />
                    Revoke Access
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
