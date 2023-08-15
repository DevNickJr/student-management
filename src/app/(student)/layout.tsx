'use client'
import React from 'react'
import SideNav from '@/components/SideNav'
import Head from '@/components/Head'
import AuthHOC from '@/HOC/AuthHOC'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const StudentLayout = ({ children }: { children: React.ReactNode }) => { 
  const router = useRouter()
  const { data } = useSession()
  // if (!data?.user?.userDetails?.is_staff) {
  //   return router.push('/dashboard')
  // }
  

  return (
      <div className='flex w-full h-screen overflow-hidden bg-footer-bg'>
        <SideNav />
        <div className="relative flex-1 py-10 pt-24 overflow-hidden overflow-y-auto bg-black/5">
          <Head />
          {children}
        </div>
      </div>
  )
}

export default AuthHOC(StudentLayout)