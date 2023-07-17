import React from 'react'
import StaffNav from '@/components/StaffNav'
import Head from '@/components/StaffHead'
// import { getServerSession } from 'next-auth/next'

const StaffLayout = ({ children }: { children: React.ReactNode }) => {
  // authenticate with getsession next-auth server side app route
  // const session = getServerSession()

  return (
      <div className='flex bg-footer-bg overflow-hidden h-screen w-full'>
        <StaffNav />
        <div className="flex-1 overflow-y-auto overflow-hidden bg-black/5 relative py-12 pt-24 p-4 pb-2">
          <Head />
          {children}
        </div>
      </div>
  )
}

export default StaffLayout