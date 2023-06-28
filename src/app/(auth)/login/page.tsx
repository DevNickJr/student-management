'use client'
import Link from 'next/link'
import React from 'react'

const Login = () => {
  const [active, setActive] = React.useState<'student' | 'staff'>('student')
  return (
    <div className='md:pl-24'>
      <div className="flex justify-center gap-16 items-center mb-12 text-lg">
          <div onClick={() => setActive('student')} className={`py-2 px-4 cursor-pointer ${active==='student' && 'border-b-[3px] border-primary text-primary font-semibold'}`}>Students</div>
          <div onClick={() => setActive('staff')} className={`py-2 px-4 cursor-pointer ${active==='staff' && 'border-b-[3px] border-primary text-primary font-semibold'}`}>Staff</div>
      </div>
      <div className="flex flex-col items-center gap-4 mb-12">
          <h1 className='text-2xl font-bold'>Welcome Back!</h1>
          <p className='text-sm'>Welcome Back! Please Enter your details</p>
      </div>
      <form action="" className="max-w-l">
        <div className='grid gap-10 mb-2'>
            {[0,1].map((_, i) => (
            <div key={i} className='flex flex-col gap-2 text-xs'>
            <label htmlFor="name">Email Address</label>
            <input type="text" name="name" id="name" className='border p-3 placeholder:text-sm rounded-md' placeholder='Enter Email Address' />
            </div>
            ))}
        </div>
        <Link href='/forgot-password' className='text-primary my-2 text-sm font-semibold'>
            Forgot Password?
        </Link>
        <button type='submit' className='mt-12 flex items-center justify-center gap-2 bg-primary p-4 pl-5 pr-6 text-sm text-white rounded-md w-full font-bold'>
            Sign In
        </button>
      </form>
    </div>
  )
}

export default Login