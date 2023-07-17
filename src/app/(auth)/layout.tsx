import React from 'react'
import Image from 'next/image'
import AuthImage from '@/assets/auth.png'
import Logo from '@/assets/logo.svg'
import Link from 'next/link'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {

  return (
      <div className='flex overflow-hidden md:h-screen w-full'>
        <div className="flex-1 relative py-6 p-4 md:px-12 overflow-y-auto">
            <Image src={Logo} alt="Auth Image" className='h-12 mb-4' />
            {children}
        </div>
        <div className="flex-1 hidden md:flex h-screen overflow-hidden">
            <Image src={AuthImage} alt="Auth Image" className='w-full h-full' />
        </div>
      </div>
  )
}

export default AuthLayout