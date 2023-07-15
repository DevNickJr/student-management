'use client'
import Table from '@/components/Table'
import { ITableColumn } from '@/interfaces'
import Link from 'next/link'
import React from 'react'
import { MdAdd } from 'react-icons/md'


const StudentCourses = () => {
  const columns: ITableColumn[] = [
    {
      name: 'Nick',
      label: 'Course Code',
    },
    {
      name: 'Jr',
      label: 'Course Title',
    },
    {
      name: 'Jr',
      label: 'Course Units',
    },
    {
      name: 'Jr',
      label: 'Course Type',
    }
  ]

  const data = [
    {
      Nick: 'I am Nick',
      Jr: "Is rough"
    },
    {
      Nick: 'Roses are red',
      Jr: "sTAY wITH ME"
    },
  ]

  return (
    <div className='p-4 md:p-6 overflow-y-auto'>
      <div className="flex items-center gap-4 justify-between mb-8">
        <h1 className='text-2xl font-semibold'>Courses</h1>
        <Link href={'/courses/register'} className='flex items-center gap-2 bg-primary p-2 pr-3 text-xs md:text-sm text-white w-fit'>
          <MdAdd className='text-2xl' />
          Register Course
        </Link>
      </div>
      <div className="bg-white p-4 pb-12 rounded-md">
        <h3 className="text-lg mb-8 md:mb-12 font-semibold">
          Course Registration
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-8 md:mb-16 text-white">
            <div className='bg-primary rounded-md p-4 flex-1 flex flex-col gap-12'>
              <p className='pr-12'>Courses Registered in All Semester</p>
              <div className="flex justify-between gap-4 items-center mb-2">
                <h6 className='font-semibold text-5xl'>65</h6>
                <button className='p-1 px-2 text-sm text-white'>
                  View
                </button>
              </div>
            </div>
            <div className='bg-[#43A2B1] rounded-md p-4 flex-1 flex flex-col gap-12'>
              <p className='pr-12'>Courses Registered in All Semester</p>
              <div className="flex justify-between gap-4 items-center mb-2">
                <h6 className='font-semibold text-5xl'>10</h6>
                <button className='p-1 px-2 text-sm text-white'>
                  View
                </button>
              </div>
            </div>
            <div className='bg-[#C65E34] rounded-md p-4 flex-1 flex flex-col gap-12'>
              <p className='pr-12'>Courses Registered in All Semester</p>
              <div className="flex justify-between gap-4 items-center mb-2">
                <h6 className='font-semibold text-5xl'>122</h6>
                <button className='p-1 px-2 text-sm text-white'>
                  View
                </button>
              </div>
            </div>
        </div>
        <div>
          <Table data={data} columns={columns} />
        </div>
      </div>
    </div>
  )
}

export default StudentCourses