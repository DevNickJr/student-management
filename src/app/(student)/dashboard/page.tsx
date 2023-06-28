import React from 'react'
import { MdAdd } from 'react-icons/md'

const StudentHome = () => {
  return (
    <div className='p-4 overflow-y-auto'>
      <div className="flex items-center gap-4 justify-between mb-12">
        <div className="flex flex-col gap-2">
          <h1 className='text-2xl font-bold'>Welcome Back, Jonathan</h1>
          <p className='text-sm'>You can easily register your courses on Eduverse</p>
        </div>
        <button className='flex items-center gap-2 bg-primary p-2 pr-3 text-sm text-white'>
          <MdAdd className='text-2xl' />
          Register Course
        </button>
      </div>
      <div className="bg-white p-4 pb-12 rounded-md">
        <h3 className="text-lg mb-8">
          User Data
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[0,1,2,3,4,5,6].map((_, i) => (
          <div key={i} className='flex items-center gap-2 text-xs'>
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="flex flex-col gap-1">
             <div>Nicholas Duadei</div>
             <div>nicholasduadei14@gmail.com</div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudentHome