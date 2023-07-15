import React from 'react'
import { MdAdd } from 'react-icons/md'

const StudentCourses = () => {

  return (
    <div className='p-4 overflow-y-auto'>
      <div className="flex items-center gap-4 justify-between mb-12">
        <h1 className='text-2xl font-semibold'>Courses</h1>
        <button className='flex items-center gap-2 bg-primary p-2 pr-3 text-sm text-white'>
          <MdAdd className='text-2xl' />
          Register Course
        </button>
      </div>
      <div className="bg-white p-4 pb-12 rounded-md">
        <h3 className="text-lg mb-8 md:mb-12 font-semibold">
          Course Registration
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[0,1,2].map((_, i) => (
          <div key={i} className='bg-primary rounded-md p-4 flex-1 flex flex-col gap-12'>
            <p>Courses Registered in All Semester</p>
            <div className="flex justify-between gap-4 items-center mb-2">
              <h6 className='font-semibold text-5xl'>65</h6>
              <button className='p-1 px-2 text-sm text-white'>
                View
              </button>
            </div>
        </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudentCourses