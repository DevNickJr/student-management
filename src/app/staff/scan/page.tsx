import React from 'react'
import { MdAdd } from 'react-icons/md'
import ScanImage from '@/assets/scan.svg'
import Image from 'next/image'


const StaffHome = () => {
  return (
    <div className='p-4 overflow-y-auto'>
      <div className="flex items-center gap-4 justify-between mb-12">
        <div className="flex flex-col gap-2">
          <h1 className='text-2xl font-bold'>Welcome Back, Jonathan</h1>
          <p className='text-sm'>You can easily verify students by scanning them</p>
        </div>
        {/* <button className='flex items-center gap-2 bg-primary p-2 pr-3 text-sm text-white'>
          <MdAdd className='text-2xl' />
          Register Course
        </button> */}
      </div>
      <div className="bg-white p-4 pb-12 rounded-md">
        <div className='mb-8'>
          <h3 className="mb-8">
            Scan Students
          </h3>
          <div className="flex justify-center items-center h-64 md:h-96 border-2 border-primary border-dashed rounded-md py-10">
            <Image src={ScanImage} alt='Scan' className='w-full h-full' />
          </div>
          <button type='submit' className='mx-auto mt-12 flex items-center justify-center gap-2 bg-primary p-2 pl-5 pr-6 text-sm text-white'>
            Click to Scan
          </button>
        </div>
        <div>
          <h3 className="text-lg mb-8 font-semibold">
            Steps on how to scan properly
          </h3>
          <div className="grid gap-10">
            {[0,1,2,3,4,5,6].map((_, i) => (
            <div key={i} className='flex items-center gap-2 text-xs'>
              <div className="w-3 h-3 rounded-full bg-gray-200" />
              <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatum.</p>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffHome