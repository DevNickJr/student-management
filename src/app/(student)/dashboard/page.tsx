'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { MdAdd } from 'react-icons/md'
import { BsFillPersonFill, BsBarChartFill } from 'react-icons/bs'
import { FaSchool} from 'react-icons/fa'
import { BiSolidSchool} from 'react-icons/bi'
import { LiaSchoolSolid } from 'react-icons/lia'
import { GoNumber } from 'react-icons/go'
import { CgNotes } from 'react-icons/cg'
import { RiGraduationCapFill } from 'react-icons/ri'
import Link from 'next/link'


const StudentHome = () => {
  const { data } = useSession()

  return (
    <div className='p-4 md:p-6 overflow-y-auto'>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 justify-between mb-12">
        <div className="flex flex-col gap-2">
          <h1 className='text-2xl font-bold'>Welcome Back, {data?.user?.userDetails?.first_name}</h1>
          <p className='text-xs md:text-sm'>You can easily register your courses on Eduverse</p>
        </div>
        <Link href={'/courses/register'} className='flex items-center gap-2 bg-primary p-2 pr-3 text-xs md:text-sm text-white w-fit'>
          <MdAdd className='text-2xl' />
          Register Course
        </Link>
      </div>
      <div className="bg-white p-4 md:p-8 pb-12 rounded-md">
        <h3 className="text-lg mb-8 md:mb-12 font-semibold">
          User Data
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          <div className='flex items-center gap-4 text-xs'>
            <div className="w-12 h-12 rounded-full bg-[#D4E5F7] flex justify-center items-center">
              <BsFillPersonFill className='text-3xl text-[#1B5390]' />
            </div>
            <div className="flex flex-col gap-2">
             <div className='font-medium'>Full Names</div>
             <div className='text-[11px] text-black/60'>{data?.user?.userDetails?.last_name} {data?.user?.userDetails?.first_name} {data?.user?.userDetails?.middle_name}</div>
            </div>
          </div>
          <div className='flex items-center gap-2 text-xs'>
             <div className="w-12 h-12 rounded-full bg-[#D4E5F7] flex justify-center items-center">
              <GoNumber className='text-3xl text-[#1B5390]' />
            </div>
            <div className="flex flex-col gap-2">
             <div className='font-medium'>Current Level</div>
             <div className='text-[11px] text-black/60'>{data?.user?.userDetails?.level}</div>
            </div>
          </div>
          <div className='flex items-center gap-2 text-xs'>
             <div className="w-12 h-12 rounded-full bg-[#D4E5F7] flex justify-center items-center">
              <GoNumber className='text-3xl text-[#1B5390]' />
            </div>
            <div className="flex flex-col gap-2">
             <div className='font-medium'>Matric Number</div>
             <div className='text-[11px] text-black/60'>{data?.user?.userDetails?.matric_no}</div>
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
             <div className="w-12 h-12 rounded-full bg-[#D4E5F7] flex justify-center items-center">
              <BiSolidSchool className='text-3xl text-[#1B5390]' />
            </div>
            <div className="flex flex-col gap-2">
             <div className='font-medium'>Department</div>
             <div className='text-[11px] text-black/60'>EEE</div>
            </div>
          </div>
          <div className='flex items-center gap-2 text-xs'>
             <div className="w-12 h-12 rounded-full bg-[#D4E5F7] flex justify-center items-center">
              <LiaSchoolSolid className='text-3xl text-[#1B5390]' />
            </div>
            <div className="flex flex-col gap-2">
             <div className='font-medium'>Option</div>
             <div className='text-[11px] text-black/60'>ECE</div>
            </div>
          </div>
          <div className='flex items-center gap-2 text-xs'>
             <div className="w-12 h-12 rounded-full bg-[#D4E5F7] flex justify-center items-center">
              <FaSchool className='text-3xl text-[#1B5390]' />
            </div>
            <div className="flex flex-col gap-2">
             <div className='font-medium'>Faculty</div>
             <div className='text-[11px] text-black/60'>SSCE</div>
            </div>
          </div>
          <div className='flex items-center gap-2 text-xs'>
             <div className="w-12 h-12 rounded-full bg-[#D4E5F7] flex justify-center items-center">
              <CgNotes className='text-3xl text-[#1B5390]' />
            </div>
            <div className="flex flex-col gap-2">
             <div className='font-medium'>Session</div>
             <div className='text-[11px] text-black/60'>2020/2021</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default StudentHome