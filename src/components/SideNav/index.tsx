'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdOutlineDashboardCustomize, MdLogout } from 'react-icons/md'
import { AiOutlineCopyrightCircle } from 'react-icons/ai'
import Logo from "@/assets/logo.svg"
import CourseImg from "@/assets/course.svg"
import SettingsImg from "@/assets/settings.svg"
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"

// import { useSession, signIn, signOut } from "next-auth/react"


const SideNav = ({ }) => {
    const pathname = usePathname();
    // console.log({pathname})

  return (
    <div className='no-scrollbar hidden sm:flex flex-col justify-between grad-to-bottom text-black max-h-screen overflow-hidden h-screen min-w-[240px] w-60 pb-4'>
        <div>
            <div className='flex flex-col items-center w-full gap-5 pt-4 text-center border-b border-white/10'>
                <Link href={"/"}>
                    <Image src={Logo} className='w-full h-12 bg-white md:h-12' alt='' />
                </Link>
            </div>
            <div className='flex flex-col gap-2 pt-12 pb-2 text-black/70'>
                <Link className={`py-2.5 pl-6 text-sm flex items-center gap-2 ${(pathname === '/dashboard') && 'text-black'}`} href="/dashboard">
                    <MdOutlineDashboardCustomize size={"1.3rem"} />
                    Dashboard
                </Link>
                <Link className={`py-2.5 pl-6 text-sm flex items-center gap-2 ${pathname?.includes("courses") && 'text-black'}`} href={"/courses"}>
                    {/* <GiCrownedSkull size={"1.3rem"} /> */}
                    <Image src={CourseImg} className='w-[18px] h-[18px] bg-white' alt='' />
                    Courses
                </Link>
                <Link className={`py-2.5 pl-6 text-sm flex items-center gap-2 ${pathname?.includes("profile") && 'text-black'}`} href={"/profile"}>
                    <Image src={SettingsImg} className='w-[18px] h-[18px] bg-white' alt='' />
                    {/* <RiTeamLine size={"1.3rem"} /> */}
                    Settings
                </Link>
            </div>
        </div>
        <div className='flex flex-col gap-10 pb-2 text-black/70'>
            <div onClick={() => signOut()} className={`py-2.5 pl-6 text-sm flex items-center gap-2 cursor-pointer`}>
                <MdLogout size={"1.3rem"} />
                Logout
            </div>
            <div className='px-6'>
                <div className={`p-2.5 text-sm flex flex-col gap-4 bg-primaryDark text-white rounded-md`}>
                    <div className='flex items-center gap-4'>
                        <AiOutlineCopyrightCircle size={"1.3rem"} />
                        <p className='text-sm'>Eduverse. 2023</p>
                    </div>
                    <p className='text-[10px] leading-tight'>
                        An Online learning platform for to Lecturers to verify all students in a particular department
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SideNav