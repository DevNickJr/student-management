import React from 'react'
import { MdAdd } from 'react-icons/md'

const RegisterCourse = () => {
  return (
    <div className='p-4 overflow-y-auto'>
      <div className="flex items-center gap-4 justify-between mb-12">
          <h1 className='text-2xl font-semibold'>Courses</h1>
      </div>
      <div className="bg-white p-4 pb-12 rounded-md">
        <h3 className="text-lg mb-8 md:mb-12 font-semibold">
            Course Registration
        </h3>
        <form className="mb-8">
          <div className='flex flex-col items-start gap-10 max-w-md'>
            {[0,1,2].map((_, i) => (
            <div key={i} className='flex flex-col gap-2 text-xs w-full'>
              <label htmlFor="name">Enter Session</label>
              <input type="text" name="name" id="name" className='border p-2 rounded-md' />
            </div>
            ))}
          </div>
          <button type='submit' className='mt-12 flex items-center justify-center gap-2 bg-primary p-2 pl-5 pr-6 text-sm text-white'>
            Save Change
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterCourse