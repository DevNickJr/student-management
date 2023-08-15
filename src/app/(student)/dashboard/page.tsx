'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { MdAdd } from 'react-icons/md'
import { BsFillPersonFill, BsBarChartFill, BsCheck2 } from 'react-icons/bs'
import { FaSchool} from 'react-icons/fa'
import { BiSolidSchool} from 'react-icons/bi'
import { LiaSchoolSolid } from 'react-icons/lia'
import { GoNumber } from 'react-icons/go'
import { CgNotes } from 'react-icons/cg'
import { RiGraduationCapFill } from 'react-icons/ri'
import Link from 'next/link'
import LevelImg from "@/assets/level.svg"
import Image from 'next/image'
import { apiGetUser } from '@/services/AuthService'
import { IProfile } from '@/interfaces'
import useFetch from '@/hooks/useFetch'


const StudentHome = () => {
  const { data } = useSession()
  
  const { data: profile, error, isLoading, isFetching, remove, refetch, fetchStatus } = useFetch<IProfile>({api: apiGetUser, requireAuth: true, key: ['user', 'profile'] })
  console.log("datassssss", data)

  return (
    <div className='relative p-4 overflow-y-auto md:p-6'>
      {/* <div className='absolute top-0 left-0 w-full h-full bg-primaryDark opacity-10'>
            <div className='flex flex-col items-center w-full max-w-lg gap-6 p-4 bg-white md:p-12'>
              <BsCheck2 className='text-2xl' />
            </div>
      </div> */}
      <div className="flex flex-col justify-between gap-3 mb-12 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex flex-col gap-2">
          <h1 className='text-2xl font-bold'>Welcome Back, {profile?.first_name}</h1>
          <p className='text-xs md:text-sm'>You can easily register your courses on Eduverse</p>
        </div>
        <Link href={'/courses/register'} className='flex items-center gap-2 p-2 pr-3 text-xs text-white bg-primary md:text-sm w-fit'>
          <MdAdd className='text-2xl' />
          Register Course
        </Link>
      </div>
      <div className="p-4 pb-12 bg-white rounded-md md:p-8">
        <h3 className="mb-8 text-lg font-semibold md:mb-12">
          User Data
        </h3>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

          <div className='flex items-center gap-4 text-xs'>
            <div className="w-12 h-12 rounded-full bg-[#D4E5F7] flex justify-center items-center">
              <BsFillPersonFill className='text-3xl text-[#1B5390]' />
            </div>
            <div className="flex flex-col gap-2">
             <div className='font-medium'>Full Names</div>
             <div className='text-[11px] text-black/60'>{profile?.last_name} {profile?.first_name} {profile?.middle_name}</div>
            </div>
          </div>
          <div className='flex items-center gap-2 text-xs'>
            <div className="w-12 h-12 rounded-full bg-[#C5EBF1] flex justify-center items-center">
              {/* <GoNumber className='text-3xl text-[#1B5390]' /> */}
              <Image src={LevelImg} alt='level' width={100} height={100} className='text-3xl text-[#28626B] w-[28px] h-[28px]' />
            </div>
            <div className="flex flex-col gap-2">
             <div className='font-medium'>Current Level</div>
             <div className='text-[11px] text-black/60'>{profile?.level}</div>
            </div>
          </div>
          <div className='flex items-center gap-2 text-xs'>
             <div className="w-12 h-12 rounded-full bg-[#F9D0BF] flex justify-center items-center">
              <GoNumber className='text-3xl text-[#C65E34]' />
            </div>
            <div className="flex flex-col gap-2">
             <div className='font-medium'>Matric Number</div>
             <div className='text-[11px] text-black/60'>{profile?.matric_no}</div>
            </div>
          </div>
          <div className='flex items-center gap-2 text-xs'>
             <div className="w-12 h-12 rounded-full bg-[#D4E5F7] flex justify-center items-center">
              <RiGraduationCapFill className='text-3xl text-[#1B5390]' />
            </div>
            <div className="flex flex-col gap-2">
             <div className='font-medium'>Student Type</div>
             <div className='text-[11px] text-black/60'>Undergraduate</div>
            </div>
          </div>
          <div className='flex items-center gap-2 text-xs'>
             <div className="w-12 h-12 rounded-full bg-[#C5EBF1] flex justify-center items-center">
              <BiSolidSchool className='text-3xl text-[#28626B]' />
            </div>
            <div className="flex flex-col gap-2">
             <div className='font-medium'>Department</div>
             <div className='text-[11px] text-black/60'>EEE</div>
            </div>
          </div>
          <div className='flex items-center gap-2 text-xs'>
             <div className="w-12 h-12 rounded-full bg-[#F9D0BF] flex justify-center items-center">
              <LiaSchoolSolid className='text-3xl text-[#C65E34]' />
            </div>
            <div className="flex flex-col gap-2">
             <div className='font-medium'>Option</div>
             <div className='text-[11px] text-black/60'>{profile?.option || "N/A"}</div>
            </div>
          </div>
          <div className='flex items-center gap-2 text-xs'>
             <div className="w-12 h-12 rounded-full bg-[#D4E5F7] flex justify-center items-center">
              <FaSchool className='text-3xl text-[#1B5390]' />
            </div>
            <div className="flex flex-col gap-2">
             <div className='font-medium'>Faculty</div>
             <div className='text-[11px] text-black/60'>{'SESET'}</div>
            </div>
          </div>
          <div className='flex items-center gap-2 text-xs'>
             <div className="w-12 h-12 rounded-full bg-[#C5EBF1] flex justify-center items-center">
              <CgNotes className='text-3xl text-[#28626B]' />
            </div>
            <div className="flex flex-col gap-2">
             <div className='font-medium'>Session</div>
             <div className='text-[11px] text-black/60'>{"2021/2022"}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default StudentHome