'use client'
import StaffTable from '@/components/StaffTable'
import useFetch from '@/hooks/useFetch'
import { IProfile, ITableColumn } from '@/interfaces'
import { apiGetUser } from '@/services/AuthService'
import { apiGetStudents, apiGetAnalytics } from '@/services/StaffService'
import Link from 'next/link'
import React from 'react'
import { MdAdd } from 'react-icons/md'


const StudentRecord = () => {
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
    },
    {
      name: 'status',
      label: 'Status',
    },
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
        <div className="flex flex-col justify-between gap-8 mb-8 text-sm md:flex-row md:items-center">
          <span className='font-semibold'>Attempted Registration</span>
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
          <StaffTable data={students?.results || []} columns={columns} colSpan={5} />
        </div>
      </div>
    </div>
  )
}

export default StudentRecord