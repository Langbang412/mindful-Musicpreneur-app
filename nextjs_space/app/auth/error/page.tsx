'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Loader2 } from 'lucide-react'

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams?.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.'
      case 'AccessDenied':
        return 'You do not have permission to sign in.'
      case 'Verification':
        return 'The verification link may have expired or already been used.'
      default:
        return 'An error occurred during authentication.'
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-6 h-6 text-red-600" />
        </div>
        <CardTitle className="text-2xl">Authentication Error</CardTitle>
        <CardDescription>
          {getErrorMessage(error)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 text-center">
          If this problem persists, please contact support.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Link href="/auth/signin" className="w-full">
          <Button className="w-full bg-brand-purple hover:bg-brand-plum">
            Try Again
          </Button>
        </Link>
        <Link href="/" className="w-full">
          <Button variant="outline" className="w-full">
            Go Home
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

function LoadingFallback() {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
      </CardContent>
    </Card>
  )
}

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-plum via-brand-purple to-brand-blue p-4">
      <Suspense fallback={<LoadingFallback />}>
        <AuthErrorContent />
      </Suspense>
    </div>
  )
}
