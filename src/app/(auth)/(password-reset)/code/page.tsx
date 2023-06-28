'use client'
import Link from 'next/link'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const ConfirmOtp = () => {
  const [active, setActive] = React.useState<'student' | 'staff'>('student')
  return (
    <div className='md:pl-24'>
      <div className="flex flex-col items-center gap-4 mb-12">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex justify-center items-center">
                <AiOutlineArrowLeft className='text-primary w-8 h-8' />
            </div>
          <h1 className='text-2xl font-bold'>Reset Password</h1>
          <p className='text-sm'>We have sent a password reset code to  <span className="font-semibold">Jonathanab @gmail.com</span></p>
      </div>
      <form action="" className="max-w-l">
        <div className='flex justify-center gap-3 text-xs'>
          {[1,2,3,4].map((_, i) => (
            <input key={i} type="text" name="name" id="name" className='border border-gray-300 p-3 placeholder:text-sm rounded-md w-16 h-16' placeholder='' />
          ))}
        </div>
        <button type='submit' className='mt-12 mb-8 flex items-center justify-center gap-2 bg-primary p-4 pl-5 pr-6 text-sm text-white rounded-md w-full font-bold'>
          Reset Password
        </button>
        <div className="flex flex-col gap-6 text-sm">
          <div className='flex justify-center items-center gap-2'>
              <p>Didn’t receive the mail?</p>
              <Link href='/forgot-password' className='text-sm text-primary'>
                Click here to resend
              </Link>
          </div>
          <div className='flex justify-center items-center gap-2'>
              <AiOutlineArrowLeft className='' />
              <Link href='/forgot-password' className='text-sm font-semibold'>
                  Back to Login
              </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ConfirmOtp