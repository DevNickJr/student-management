'use client'
import Link from 'next/link'
import React from 'react'

const Register = () => {
  const [active, setActive] = React.useState<'student' | 'staff'>('student')
  return (
    <div className='md:pl-24 py-4'>
      <div className="flex justify-center gap-16 items-center mb-12 text-lg">
          <div onClick={() => setActive('student')} className={`py-2 px-4 cursor-pointer ${active==='student' && 'border-b-[3px] border-primary text-primary font-semibold'}`}>Students</div>
          <div onClick={() => setActive('staff')} className={`py-2 px-4 cursor-pointer ${active==='staff' && 'border-b-[3px] border-primary text-primary font-semibold'}`}>Staff</div>
      </div>
      <div className="flex flex-col items-center gap-4 mb-12">
          <h1 className='text-2xl font-bold'>Create an Account</h1>
          <p className='text-sm'>Create an account to Get Started</p>
      </div>
      <form action="" className="max-w-l">
        <div className='grid gap-6 mb-2'>
            {[0,1,2,3].map((_, i) => (
            <div key={i} className='flex flex-col gap-2 text-xs'>
            <label htmlFor="name">Email Address</label>
            <input type="text" name="name" id="name" className='border p-3 placeholder:text-sm rounded-md' placeholder='Enter Email Address' />
            </div>
            ))}
        </div>
        <button type='submit' className='mt-12 flex items-center justify-center gap-2 bg-primary p-4 pl-5 pr-6 text-sm text-white rounded-md w-full font-bold'>
          Proceed
        </button>
      </form>
    </div>
  )
}

export default Register