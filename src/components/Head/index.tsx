'use client'
import React from 'react'
import { BiMenu } from 'react-icons/bi'
import { MdOutlineClose } from 'react-icons/md'
import Image from 'next/image'
import Links from '../Links'


const Head = () => {
  const [isOpen, setIsOpen] = React.useState(false)


  return (
    <div className='absolute z-30 top-0 left-0 w-full p-4 sm:px-12 bg-white shadow flex gap-4 justify-between items-center overflow-hidden'>
        <div>
          <input type="text" placeholder='Search' className='border border-gray-300 rounded-full px-4 w-96' />
        </div>
        <div className='flex items-center gap-4'>
          <div className="w-3 h-3 rounded-full bg-gray-200" />
          <div className='flex items-center gap-1 text-xs'>
           <div className="w-3 h-3 rounded-full bg-gray-200" />
           <div className="flex flex-col gap-1">
            <div>Nicholas Duadei</div>
            <div>nicholasduadei14@gmail.com</div>
           </div>
            { isOpen ? 
              <MdOutlineClose onClick={() => setIsOpen(false)} className={`cursor-pointer text-3xl md:hidden relative z-50 text-gray-dark`} /> 
              : <BiMenu onClick={() => setIsOpen(true)} className='cursor-pointer text-3xl md:hidden relative z-50 text-gray-dark' />
            }
          </div>
        </div>
        {/* <Links isOpen={isOpen} /> */}
    </div>
  )
}

export default Head