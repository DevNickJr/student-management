'use client'
import { DataTable } from '@/components/Table/DataTable';
import { DataTableRowActions } from '@/components/Table/DataTableRowActions';
import { PaginationState, createColumnHelper } from '@tanstack/react-table';
import React, { useState } from 'react'
import { MdAdd } from 'react-icons/md'

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}


const StaffDashboard = () => {
  const [{ pageIndex, pageSize }, setPagination] =
  useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  
const columnHelper = createColumnHelper<Person>()

const defaultColumns = [
  // Display Column
  columnHelper.display({
    id: 'actions',
    cell: props => <DataTableRowActions row={props.row} />,
  }),
  
]

const columns = [
  columnHelper.accessor('firstName', {
    // cell: info => info.getValue(),
    cell: props => <DataTableRowActions row={props.row} />,
    // footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.lastName, {
    id: 'lastName',
    cell: props => <DataTableRowActions row={props.row} />,
    header: () => <span>Last Name</span>,
    // footer: info => info.column.id,
  }),
]

  return (
    <div className='p-4 overflow-y-auto'>
      <div className="flex items-center gap-4 justify-between mb-12">
        <h1 className='text-2xl font-semibold'>Students</h1>
        {/* <button className='flex items-center gap-2 bg-primary p-2 pr-3 text-sm text-white'>
          <MdAdd className='text-2xl' />
          Register Course
        </button> */}
      </div>
      <div className="bg-white p-4 pb-12 rounded-md">
        <h3 className="text-lg mb-8">
          Student Records
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[0,1,2].map((_, i) => (
          <div key={i} className='bg-primary rounded-md p-4 flex-1 flex flex-col gap-12'>
            <p>Total Number of Attempted Registration</p>
            <div className="flex justify-between gap-4 items-center mb-2">
              <h6 className='font-semibold text-5xl'>792</h6>
              <button className='p-1 px-2 text-sm text-white'>
                View
              </button>
            </div>
          </div>
          ))}
        </div>
        <DataTable
             data={
               []
             }
             columns={[...columns]}
             pageIndex={pageIndex}
              pageSize={pageSize}
             pageCount={10}
             onPaginationChange={setPagination}
           />
      </div>
    </div>
  )
}

export default StaffDashboard