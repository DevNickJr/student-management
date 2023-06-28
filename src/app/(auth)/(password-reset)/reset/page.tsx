'use client'
import Link from 'next/link'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const ResetPassword = () => {
  const [active, setActive] = React.useState<'student' | 'staff'>('student')
  return (
    <div className='md:pl-24'>
      <div className="flex flex-col items-center gap-4 mb-12">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex justify-center items-center">
                <AiOutlineArrowLeft className='text-primary w-8 h-8' />
            </div>
          <h1 className='text-2xl font-bold'>Set New Password</h1>
          <p className='text-sm'>Enter a new password that only you can figure out</p>
      </div>
      <form action="" className="max-w-l">
        <div className='grid gap-10 mb-2'>
            <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="name">New Password</label>
                <input type="text" name="name" id="name" className='border p-3 placeholder:text-sm rounded-md' placeholder='Enter New Password' />
            </div>
            <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="name">Confirm Password</label>
                <input type="text" name="name" id="name" className='border p-3 placeholder:text-sm rounded-md' placeholder='Confirm New Password' />
            </div>
        </div>
        <button type='submit' className='mt-12 mb-4 flex items-center justify-center gap-2 bg-primary p-4 pl-5 pr-6 text-sm text-white rounded-md w-full font-bold'>
          Reset Password
        </button>
        <div className='flex justify-center items-center gap-2'>
            <AiOutlineArrowLeft className='' />
            <Link href='/forgot-password' className='my-2 text-sm font-semibold'>
                Back to Login
            </Link>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword