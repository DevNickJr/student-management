'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdOutlineDashboardCustomize, MdLogout, MdOutlineFeedback } from 'react-icons/md'
import { RiTeamLine, RiQuestionnaireLine } from 'react-icons/ri'
import { GiCrownedSkull } from 'react-icons/gi'
import { BsFillPersonFill } from 'react-icons/bs'
import { TiNews } from 'react-icons/ti'
import { FaAward } from 'react-icons/fa'
import { AiTwotoneGold, AiOutlineHome } from 'react-icons/ai'
import Logo from "@/assets/logo.svg"
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"

// import { useSession, signIn, signOut } from "next-auth/react"


const StaffNav = ({ }) => {
    const pathname = usePathname();
    // console.log({pathname})

  return (
    <div className='no-scrollbar hidden sm:flex flex-col justify-between grad-to-bottom text-black max-h-screen overflow-hidden h-screen min-w-[240px] w-60 pb-4'>
        <div>
            <div className='w-full flex flex-col items-center text-center gap-5 border-b border-white/10 pt-4'>
                <Link href={"/"}>
                    <Image src={Logo} className='w-full h-12 md:h-12 bg-white' alt='' />
                </Link>
            </div>
            <div className='flex flex-col gap-2 pb-2 text-black/70 pt-12'>
                <Link className={`py-2.5 pl-6 text-sm flex items-center gap-2 ${(pathname === '/admin') && 'text-black'}`} href="/staff/scan">
                    <MdOutlineDashboardCustomize size={"1.3rem"} />
                    Students
                </Link>
                <Link className={`py-2.5 pl-6 text-sm flex items-center gap-2 ${pathname?.includes("winners") && 'text-black'}`} href={"/staff/courses"}>
                    <GiCrownedSkull size={"1.3rem"} />
                    Courses
                </Link>
                <Link className={`py-2.5 pl-6 text-sm flex items-center gap-2 ${pathname?.includes("advisory") && 'text-black'}`} href={"/staff/profile"}>
                    <RiTeamLine size={"1.3rem"} />
                    Settings
                </Link>
            </div>
        </div>
        <div onClick={() => signOut()} className={`py-2.5 pl-6 text-sm flex items-center gap-2 cursor-pointer`}>
            <MdLogout size={"1.3rem"} />
            Logout
        </div>
    </div>
  )
}

export default StaffNav