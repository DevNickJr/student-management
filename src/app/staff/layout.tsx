'use client'
import React, { useEffect } from 'react'
import StaffNav from '@/components/StaffNav'
import Head from '@/components/StaffHead'
import AuthHOC from '@/HOC/AuthHOC'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


// import { getServerSession } from 'next-auth/next'

const StaffLayout = ({ children }: { children: React.ReactNode }) => {
  // authenticate with getsession next-auth server side app route
  // const session = getServerSession()
  const router = useRouter()
  const { data } = useSession()

  useEffect(() => {
    if (!data?.user?.userDetails?.is_staff) {
      return router.push('/dashboard')
    }
  }, [data, router])

  return (
      <div className='flex w-full h-screen overflow-hidden bg-footer-bg'>
        <StaffNav />
        <div className="relative flex-1 p-4 py-12 pt-24 pb-2 overflow-hidden overflow-y-auto bg-black/5">
          <Head />
          {children}
        </div>
      </div>
  )
}

export default AuthHOC(StaffLayout)