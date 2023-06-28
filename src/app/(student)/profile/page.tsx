import React from 'react'
import { MdAdd } from 'react-icons/md'

const StudentProfile = () => {
  return (
    <div className='p-4 overflow-y-auto'>
      <div className="flex items-center gap-4 justify-between mb-12">
          <h1 className='text-2xl font-bold'>Profile Settings</h1>
      </div>
      <div className="bg-white p-4 pb-12 rounded-md">
        <h3 className="">
          Profile Image
        </h3>
        <div className='flex items-center gap-6 text-xs my-8'>
            <div className="w-24 h-24 rounded-full bg-gray-200" />
            <div className="flex flex-col gap-2">
            <button className='flex items-center justify-center gap-2 bg-primary p-2 pl-5 pr-6 text-sm text-white'>
              <MdAdd className='text-2xl' />
              Change
            </button>
            <button className='flex items-center justify-center gap-2 p-2 pl-5 pr-6 text-sm text-red-500 border bg-gray-50'>
              <MdAdd className='text-2xl' />
              Delete
            </button>
            </div>
          </div>
        <form className="mb-8">
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {[0,1,2,3,4,5].map((_, i) => (
            <div key={i} className='flex flex-col gap-2 text-xs'>
              <label htmlFor="name">First Name</label>
              <input type="text" name="name" id="name" className='border p-2 rounded-md' />
            </div>
            ))}
          </div>
          <button type='submit' className='mt-12 flex items-center justify-center gap-2 bg-primary p-2 pl-5 pr-6 text-sm text-white'>
            Save Change
          </button>
        </form>
        <div className="flex flex-col lg:flex-row gap-4 text-xs">
          <div className='bg-gray-200 rounded-md p-4 flex-1'>
            <div className="flex justify-between gap-4 items-center mb-2">
              <h6 className='font-semibold text-sm'>Password</h6>
              <button className='bg-white p-1 px-2 text-[10px] text-primary'>
                Change
              </button>
            </div>
            <p>You can reset or change your password by clicking here</p>
          </div>
          <div className='bg-gray-200 rounded-md p-4 flex-1'>
            <div className="flex justify-between gap-4 items-center mb-2">
              <h6 className='font-semibold text-sm'>Remove Account</h6>
              <button className='bg-white p-1 px-2 text-[10px] text-primary'>
                Deactivate
              </button>
            </div>
            <p>You can reset or change your password by clicking here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile