'use client'
import React from 'react'
import { BiMenu } from 'react-icons/bi'
import Links from '../StaffNav/Links'
import { RxCaretDown } from 'react-icons/rx'

const StaffHead = () => {
  const [isOpen, setIsOpen] = React.useState(false)


  return (
    <div className='fixed sm:ml-60 z-30 top-0 left-0 right-0 sm:py-4 p-4 md:px-6 bg-white shadow flex gap-4 justify-between items-center overflow-hidden'>
      <input type="text" placeholder='Search' className='border border-gray-300 rounded-full px-4 min-w-[100px] md:w-96' />
      <div className='flex items-center justify-between gap-2'>
        <div className="w-4 h-4 rounded-full bg-gray-200" />
        <div className='flex items-center gap-2 text-xs'>
        <div className="w-6 h-6 rounded-full bg-primary/30" />
        <div className="hidden md:flex flex-col gap-1">
          <div className='font-semibold text-sm'>Nicholas Duadei</div>
          <div className='text-xs text-black/70'>nicholasduadei14@gmail.com</div>
        </div>
        <RxCaretDown className='text-gray-dark text-2xl hidden md:block' />
          { !isOpen && 
            // <MdOutlineClose onClick={() => setIsOpen(false)} className={`cursor-pointer text-3xl md:hidden relative z-50 text-gray-dark`} /> 
            // : 
            <BiMenu onClick={() => setIsOpen(true)} className='cursor-pointer text-3xl md:hidden relative z-50 text-gray-dark' />
          }
        </div>
      </div>
      <Links isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default StaffHead