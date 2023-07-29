'use client'
import StaffTable from '@/components/StaffTable'
import useFetch from '@/hooks/useFetch'
import { IProfile, ITableColumn } from '@/interfaces'
import { apiGetUser } from '@/services/AuthService'
import { apiGetStudents, apiGetAnalytics } from '@/services/StaffService'
import Link from 'next/link'
import React from 'react'
import { MdAdd } from 'react-icons/md'


const StaffDashboard = () => {
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
    <div className='p-4 md:p-6 overflow-y-auto'>
      <div className="flex items-center gap-4 justify-between mb-8">
        <h1 className='text-2xl font-semibold'>Students</h1>
      </div>
      <div className="bg-white p-4 pb-12 rounded-md">
        <h3 className="text-lg mb-8 font-semibold">
        Students Records
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-8 md:mb-12 text-white">
            <div className='bg-primary rounded-md p-4 flex-1 flex flex-col justify-between gap-12'>
              <p className='pr-12'>Total Number of Attempted Registration</p>
              <div className="flex justify-between gap-4 items-center mb-2">
                <h6 className='font-semibold text-5xl'>{analytics?.total_students || 0}</h6>
                <button className='p-1 px-2 text-sm text-white'>
                  View
                </button>
              </div>
            </div>
            <div className='bg-[#43A2B1] rounded-md p-4 flex-1 flex flex-col justify-between gap-12'>
              <p className='pr-12'>Total Number of Successful Registration</p>
              <div className="flex justify-between gap-4 items-center mb-2">
                <h6 className='font-semibold text-5xl'>{analytics?.total_verified_students || 0}</h6>
                <button className='p-1 px-2 text-sm text-white'>
                  View
                </button>
              </div>
            </div>
            <div className='bg-[#C65E34] rounded-md p-4 flex-1 flex flex-col justify-between gap-12'>
              <p className='pr-12'>Total Number of Failed Registration</p>
              <div className="flex justify-between gap-4 items-center mb-2">
                <h6 className='font-semibold text-5xl'>{analytics?.total_unverified_students || 0}</h6>
                <button className='p-1 px-2 text-sm text-white'>
                  View
                </button>
              </div>
            </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8 text-sm">
          <span className='font-semibold'>Registered Students</span>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <input type="text" name="search" id="search" placeholder='Type here to search' className='border border-gray-300 px-4 text-sm bg-[#F7F7F7]' />
            <select name="filter" id="filter" className='text-sm py-2 sm:w-fit'>
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

export default StaffDashboard