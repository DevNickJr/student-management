import React from 'react'
import { MdAdd } from 'react-icons/md'

const ConfirmCourse = () => {
  return (
    <div className='p-4 overflow-y-auto'>
      <div className="flex items-center gap-4 justify-between mb-12">
          <h1 className='text-2xl font-semibold'>Courses</h1>
      </div>
      <div className="bg-white p-4 pb-12 rounded-md">
        <h3 className="mb-4">
            Bio Data
        </h3>
        <div className="mb-8">
          <div className='grid gap-2'>
            {[0,1,2,3,4,5,6].map((_, i) => (
                <div key={i} className={`grid lg:grid-cols-2 text-xs w-full border rounded border-primary ${i % 2 === 0 && 'bg-primary/20'}`}>
                    <div className={`flex items-center gap-4 p-2 border-r`}>
                        <div>
                            Full Name:
                        </div>
                        <div>
                            Nicholas Duadei
                        </div>
                    </div>
                    <div className='flex items-center gap-4 p-2'>
                        <div>
                            Full Name:
                        </div>
                        <div>
                            Nicholas Duadei
                        </div>
                    </div>
                </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmCourse