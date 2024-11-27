'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MemberDashboard } from '@/components/member-dashboard'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if member is authenticated
    const isAuthenticated = localStorage.getItem('memberAuthenticated')
    if (!isAuthenticated) {
      router.push('/member/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('memberAuthenticated')
    router.push('/member/login')
  }

  return <MemberDashboard onLogout={handleLogout} />
}
