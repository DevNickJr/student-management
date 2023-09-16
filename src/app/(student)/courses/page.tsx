'use client'
import Table from '@/components/Table/User'
import useFetch from '@/hooks/useFetch'
import { IProfile, ITableColumn } from '@/interfaces'
import { apiGetUser } from '@/services/AuthService'
import { apiGetCourses, apiGetRegisteredCourses } from '@/services/UserService'
import Link from 'next/link'
import React from 'react'
import { MdAdd } from 'react-icons/md'


const StudentCourses = () => {
  const columns: ITableColumn[] = [
    {
      name: 'code',
      label: 'Course Code',
    },
    {
      name: 'title',
      label: 'Course Title',
    },
    {
      name: 'unit',
      label: 'Course Units',
    },
    {
      name: 'Jr',
      label: 'Course Type',
    }
  ]

  const { data: courses, error, isLoading, isFetching, remove, refetch, fetchStatus } = useFetch({
    api: apiGetCourses, 
    requireAuth: true, 
    key: ['user', 'dashboardCourses'] 
  })


  const { data: registeredCourses } = useFetch({
    api: apiGetRegisteredCourses, 
    requireAuth: true, 
    select: ((d: any) => d?.data),
    key: ['user', 'registeredCourses'] 
  })

  console.log({
    courses,
    registeredCourses
  })


  return (
    <div className='p-4 overflow-y-auto md:p-6'>
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className='text-2xl font-semibold'>Courses</h1>
        <Link href={'/courses/register'} className='flex items-center gap-2 p-2 pr-3 text-xs text-white bg-primary md:text-sm w-fit'>
          <MdAdd className='text-2xl' />
          Register Course
        </Link>
      </div>
      <div className="p-4 pb-12 bg-white rounded-md">
        <h3 className="mb-8 text-lg font-semibold md:mb-12">
          Course Registration
        </h3>
        <div className="grid gap-10 mb-8 text-white md:grid-cols-2 lg:grid-cols-3 md:mb-16">
            <div className='flex flex-col flex-1 gap-12 p-4 rounded-md bg-primary'>
              <p className='pr-12'>Courses Registered in All Semester</p>
              <div className="flex items-center justify-between gap-4 mb-2">
                <h6 className='text-5xl font-semibold'>{courses?.total_courses}</h6>
                <button className='p-1 px-2 text-sm text-white'>
                  View
                </button>
              </div>
            </div>
            <div className='bg-[#43A2B1] rounded-md p-4 flex-1 flex flex-col gap-12'>
              <p className='pr-12'>Courses Registered in the Current Session</p>
              <div className="flex items-center justify-between gap-4 mb-2">
                <h6 className='text-5xl font-semibold'>{courses?.total_courses_current_semester}</h6>
                <button className='p-1 px-2 text-sm text-white'>
                  View
                </button>
              </div>
            </div>
            <div className='bg-[#C65E34] rounded-md p-4 flex-1 flex flex-col gap-12'>
              <p className='pr-12'>Total Units Registered in All Semesters</p>
              <div className="flex items-center justify-between gap-4 mb-2">
                <h6 className='text-5xl font-semibold'>{courses?.total_units}</h6>
                <button className='p-1 px-2 text-sm text-white'>
                  View
                </button>
              </div>
            </div>
        </div>
        <div>
          <Table total_units={courses?.total_units || 0} total_courses={courses?.total_courses || 0} data={registeredCourses?.results || []} columns={columns} />
        </div>
      </div>
    </div>
  )
}

export default StudentCourses