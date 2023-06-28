
'use client'
import Link from 'next/link'
import React from 'react'
import ScanImage from '@/assets/scan.svg'
import Image from 'next/image'

const FaceId = () => {
  const [active, setActive] = React.useState<'student' | 'staff'>('student')
  return (
    <div className='md:pl-24 py-4'>
      <div className="flex justify-center gap-16 items-center mb-12 text-lg">
          <div onClick={() => setActive('student')} className={`py-2 px-4 cursor-pointer ${active==='student' && 'border-b-[3px] border-primary text-primary font-semibold'}`}>Students</div>
          <div onClick={() => setActive('staff')} className={`py-2 px-4 cursor-pointer ${active==='staff' && 'border-b-[3px] border-primary text-primary font-semibold'}`}>Staff</div>
      </div>
      <div className="flex flex-col items-center gap-4 mb-12">
          <h1 className='text-2xl font-bold'>Set Up Face ID</h1>
          <p className='text-sm'>Scan your face to register it on the Database</p>
      </div>
      <form action="" className="max-w-lg mx-auto">
      <div className="flex justify-center items-center h-48 md:h-68 border-2 border-primary border-dashed rounded-md py-10">
            <Image src={ScanImage} alt='Scan' className='w-full h-full' />
          </div>
        <button type='submit' className='mt-12 flex items-center justify-center gap-2 bg-primary p-4 pl-5 pr-6 text-sm text-white rounded-md w-full font-bold'>
          Scan
        </button>
      </form>
    </div>
  )
}

export default FaceId