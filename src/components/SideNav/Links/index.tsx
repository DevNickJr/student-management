'use client'
import Link from 'next/link'
import React from 'react'
import Button  from '../../Button'
// import { signIn, signOut, useSession } from 'next-auth/react'
import { MdLogout, MdOutlineClose } from 'react-icons/md'
import { BiMenu } from 'react-icons/bi'
import { useSession, signIn, signOut } from "next-auth/react"



const Links = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

  return (
    <div className={`md:hidden shadow fixed top-0 left-0 w-5/6 min-h-screen h-screen bg-white text-black px-4  py-2 md:px-10 z-30 text-sm ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-all duration-300`}>
       { isOpen &&
              <MdOutlineClose onClick={() => setIsOpen(false)} className={`cursor-pointer text-3xl md:hidden z-50 text-gray-dark absolute top-6 right-6 `} /> 
              // : <BiMenu onClick={() => setIsOpen(true)} className='cursor-pointer text-3xl md:hidden relative z-50 text-gray-dark' />
            }
      <nav className="md:hidden flex flex-col h-full justify-between gap-16 p-4 pt-24">
        <ul className='flex flex-col text-dark-light gap-7 md:gap-4 lg:gap-7 font-medium'>
          <li><Link href="/dashboard" className={`pb-1.5 px-1 font-medium`}>Dashboard</Link></li>
          <li><Link href="/courses" className={`pb-1.5 px-1 font-medium`}>Courses</Link></li>
          <li><Link href="/profile" className={`pb-1.5 px-1 font-medium`}>Settings</Link></li>
        </ul>
        <div onClick={() => signOut()} className={`w-fit py-2 pb-2.5 flex items-center gap-2 text-xs font-medium rounded-full`}>
            <MdLogout size={"1.3rem"} />
            Logout
        </div>
      </nav>
    </div>
  )
}

export default Links