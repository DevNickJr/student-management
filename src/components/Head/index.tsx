'use client'
import React from 'react'
import { BiMenu } from 'react-icons/bi'
import Links from '../SideNav/Links'
import { RxCaretDown } from 'react-icons/rx'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const Head = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { data } = useSession()


  return (
    <div className='fixed top-0 left-0 right-0 z-30 flex items-center justify-between gap-4 p-4 overflow-hidden bg-white shadow sm:ml-60 sm:py-4 md:px-6'>
      <input type="text" placeholder='Search' className='border border-gray-300 rounded-full px-4 min-w-[100px] md:w-96' />
        <div className='flex items-center justify-between gap-2'>
          {/* <div className="w-4 h-4 bg-gray-200 rounded-full" /> */}
          <div className='flex items-center gap-2 text-xs'>
              {/* <div className="w-6 h-6 rounded-full bg-primary/30" /> */}
              <Image src={data?.user.userDetails.profile_picture_url || ''} className="w-6 h-6 rounded-full" width={100} height={100} alt='Profile'  />
              <div className="flex-col hidden gap-1 md:flex">
                <div className='text-sm font-semibold'>{data?.user?.userDetails?.last_name} {data?.user?.userDetails?.first_name}</div>
                <div className='text-xs text-black/70'>{data?.user?.userDetails?.email}</div>
              </div>
            <RxCaretDown className='hidden text-2xl text-gray-dark md:block' />
              { !isOpen && 
                // <MdOutlineClose onClick={() => setIsOpen(false)} className={`cursor-pointer text-3xl md:hidden relative z-50 text-gray-dark`} /> 
                // : 
                <BiMenu onClick={() => setIsOpen(true)} className='relative z-50 text-3xl cursor-pointer md:hidden text-gray-dark' />
              }
          </div>
        </div>
      <Links isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default Head