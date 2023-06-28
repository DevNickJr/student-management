'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdOutlineDashboardCustomize, MdLogout, MdOutlineFeedback } from 'react-icons/md'
import { RiTeamLine, RiQuestionnaireLine } from 'react-icons/ri'
import { GiCrownedSkull } from 'react-icons/gi'
import { TbSitemap } from 'react-icons/tb'
import { TiNews } from 'react-icons/ti'
import { FaAward } from 'react-icons/fa'
import { AiTwotoneGold, AiOutlineHome } from 'react-icons/ai'
import Logo from "@/assets/logo.svg"
import Image from 'next/image'
// import { useSession, signIn, signOut } from "next-auth/react"


const SideNav = ({ }) => {
    const pathname = usePathname();
    // console.log({pathname})

  return (
    <div className='no-scrollbar hidden sm:flex flex-col justify-between grad-to-bottom text-black max-h-screen overflow-hidden h-screen min-w-[240px] w-60 pb-4'>
        <div>
            <div className='w-full flex flex-col items-center text-center gap-5 border-b border-white/10 pt-4'>
                <Link href={"/"}>
                    <Image src={Logo} className='w-full h-12 md:h-12 bg-white' alt='' />
                </Link>
                {/* <div className="flex items-center text-xs gap-2">
                    <div className="flex flex-col">
                        <span className='font-bold text-sm'>Administrator</span>
                        <span className='text-black/80 text-[10px] font-bold'>admin@gmail.com</span>
                    </div>
                </div> */}
            </div>
            <div className='flex flex-col gap-2 pb-2 text-black/70 pt-12'>
                <Link className={`py-2.5 pl-6 text-sm flex items-center gap-2 ${(pathname === '/admin') && 'text-black'}`} href="/admin">
                    {/* <span className='w-4 h-4 bg-white flex justify-center items-center rounded border'>
                        <MdTrendingUp color='#000000' size={"0.6rem"} />
                    </span>  */}
                    <MdOutlineDashboardCustomize size={"1.3rem"} />
                    Dashboard
                </Link>
                <Link className={`py-2.5 pl-6 text-sm flex items-center gap-2 ${pathname?.includes("winners") && 'text-black'}`} href={"/admin/winners"}>
                    <GiCrownedSkull size={"1.3rem"} />
                    Courses
                </Link>
                <Link className={`py-2.5 pl-6 text-sm flex items-center gap-2 ${pathname?.includes("advisory") && 'text-black'}`} href={"/admin/advisory"}>
                    <RiTeamLine size={"1.3rem"} />
                    Settings
                </Link>
            </div>
        </div>
        <div onClick={() => ''} className={`py-2.5 pl-6 text-sm flex items-center gap-2 cursor-pointer`}>
            <MdLogout size={"1.3rem"} />
            Logout
        </div>
    </div>
  )
}

export default SideNav