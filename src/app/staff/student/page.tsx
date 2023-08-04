'use client'
import StaffTable from '@/components/StaffTable'
import useFetch from '@/hooks/useFetch'
import { IProfile, ITableColumn } from '@/interfaces'
import { apiGetUser } from '@/services/AuthService'
import { apiGetStudents, apiGetAnalytics } from '@/services/StaffService'
import Link from 'next/link'
import React from 'react'
import { MdAdd } from 'react-icons/md'


const StudentStaff = () => {
  const { data: students, error, isLoading, isFetching, remove, refetch, fetchStatus } = useFetch({
    api: apiGetStudents, 
    key: ['staff', 'students'],
    select: ((d: any) => d?.data)
  })
  const { data: analytics } = useFetch({
    api: apiGetAnalytics, 
    key: ['analytics'],
  })

  // console.log({ analytics })

  const columns: ITableColumn[] = [
    {
      name: 'matric_no',
      label: 'Reg Number',
    },
    {
      name: 'full_name',
      label: "Student's Name",
    },
    {
      name: 'option',
      label: 'Option',
    },
    {
      name: 'level',
      label: 'Level',
    }
  ]

  // console.log({ students })

  return (
    <div className='p-4 overflow-y-auto md:p-6'>
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className='text-2xl font-semibold'>Students</h1>
      </div>
      <div className="p-4 pb-12 bg-white rounded-md">
        <h3 className="mb-8 text-lg font-semibold">
        Students Records
        </h3>
        <div className="grid gap-10 mb-8 text-white md:grid-cols-2 lg:grid-cols-3 md:mb-12">
            <div className='flex flex-col justify-between flex-1 gap-12 p-4 rounded-md bg-primary'>
              <p className='pr-12'>Total Number of Attempted Registration</p>
              <div className="flex items-center justify-between gap-4 mb-2">
                <h6 className='text-5xl font-semibold'>{analytics?.total_students || 0}</h6>
                <button className='p-1 px-2 text-sm text-white'>
                  View
                </button>
              </div>
            </div>
            <div className='bg-[#43A2B1] rounded-md p-4 flex-1 flex flex-col justify-between gap-12'>
              <p className='pr-12'>Total Number of Successful Registration</p>
              <div className="flex items-center justify-between gap-4 mb-2">
                <h6 className='text-5xl font-semibold'>{analytics?.total_verified_students || 0}</h6>
                <button className='p-1 px-2 text-sm text-white'>
                  View
                </button>
              </div>
            </div>
            <div className='bg-[#C65E34] rounded-md p-4 flex-1 flex flex-col justify-between gap-12'>
              <p className='pr-12'>Total Number of Failed Registration</p>
              <div className="flex items-center justify-between gap-4 mb-2">
                <h6 className='text-5xl font-semibold'>{analytics?.total_unverified_students || 0}</h6>
                <button className='p-1 px-2 text-sm text-white'>
                  View
                </button>
              </div>
            </div>
        </div>
        <div className="flex flex-col justify-between gap-8 mb-8 text-sm md:flex-row md:items-center">
          <span className='font-semibold'>Registered Students</span>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <input type="text" name="search" id="search" placeholder='Type here to search' className='border border-gray-300 px-4 text-sm bg-[#F7F7F7]' />
            <select name="filter" id="filter" className='py-2 text-sm sm:w-fit'>
              <option defaultChecked value="">Filter By</option>
              <option value="name">Name</option>
              <option value="level">Level</option>
              <option value="status">Status</option>
            </select>
          </div>         
        </div>
        <div className='text-[#143E6C]'>
          <StaffTable data={students?.results || []} columns={columns} />
        </div>
      </div>
    </div>
  )
}

export default StudentStaff