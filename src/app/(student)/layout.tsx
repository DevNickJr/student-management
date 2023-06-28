import React from 'react'
import SideNav from '@/components/SideNav'
import Head from '@/components/Head'

const StudentLayout = ({ children }: { children: React.ReactNode }) => {
  

  return (
      <div className='flex bg-footer-bg overflow-hidden h-screen w-full'>
        <SideNav />
        <div className="flex-1 overflow-y-auto overflow-hidden bg-black/5 relative py-12 pt-24 p-4 pb-2">
          <Head />
          {children}
        </div>
      </div>
  )
}

export default StudentLayout