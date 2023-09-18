'use client'
import React, { useReducer } from 'react'
import { MdAdd } from 'react-icons/md'
import { IAdminCourse, IReducerAction } from '@/interfaces'
import usePost from '@/hooks/usePost'
import { apiAddCourse } from '@/services/StaffService'
import { toast } from 'react-toastify'
import Loader from '@/components/Loader'
  
interface IAdminCourseReducerAction extends IReducerAction<"title" | "code" | "level" | "semester" | "unit" | "reset"> {
  payload: string
}

const initialState: IAdminCourse = {
  title: '',
  code: '',
  semester: '',
  unit: '',
  level: ''
}

// {
//   "title": "Hs Mechanics 3",
//   "code": "ENG 334",
//   "level": 300,
//   "code": "Harmattan",
//   "unit": 3
// }

const RegisterCourse = () => {
  const [registerOpen, setRegisterOpen] = React.useState(false)
  const [details, dispatch] = useReducer((state: IAdminCourse, action: IAdminCourseReducerAction) => {
    if (action.type == "reset") {
      return initialState
    }
    return { ...state, [action.type]: action.payload }
}, initialState)  


    
  const addCourseMutation = usePost<IAdminCourse, IAdminCourse>(apiAddCourse, { 
    requireAuth: true,
    showErrorMessage: true,
    onSuccess: (data) => {
      toast.success("Course Added")
      dispatch({ type: "reset", payload: '' })
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!details.title || !details.code || !details.semester || !details.level || !details.unit ) {
      return toast.info("All Fields are required")
    }
    addCourseMutation.mutate(details)
  }


  return (
      <div className='p-4 overflow-y-auto'>
      {(addCourseMutation?.isLoading) && <Loader />}
        <div className="flex items-center justify-between gap-4 mb-12">
            <h1 className='text-2xl font-semibold'>Courses</h1>
        </div>
        <div className="p-4 pb-12 bg-white rounded-md">
          <h3 className="mb-8 text-lg font-semibold md:mb-12">
              Add Course
          </h3>
          <form onSubmit={handleSubmit} className="mb-8">
            <div className='flex flex-col items-start max-w-md gap-10'>
              <div className='flex flex-col w-full gap-2 text-xs'>
                <label htmlFor="name">Enter Course Title</label>
                <input  value={details?.title} onChange={(e) => dispatch({ type: "title", payload: e.target.value})}  type="text" name="title" id="title" className='p-3 text-sm border rounded-md text-black/70' />
              </div>
              <div className='flex flex-col w-full gap-2 text-xs'>
                <label htmlFor="name">Enter Course Code</label>
                <input  value={details?.code} onChange={(e) => dispatch({ type: "code", payload: e.target.value})}  type="text" name="code" id="code" className='p-3 text-sm border rounded-md text-black/70' />
              </div>
              <div className='flex flex-col w-full gap-2 text-xs'>
                <label htmlFor="name">Enter Unit</label>
                <input  value={details?.unit} onChange={(e) => dispatch({ type: "unit", payload: e.target.value})}  type="text" name="unit" id="unit" className='p-3 text-sm border rounded-md text-black/70' />
              </div>
              <div className='flex flex-col w-full gap-2 text-xs'>
                <label htmlFor="name">Select Semester</label>
                <select  value={details?.semester} onChange={(e) => dispatch({ type: "semester", payload: e.target.value})} name="semester" id="semester" className='p-3 text-sm border rounded-md text-black/70'>
                  <option value="">Select Semester</option>
                  <option value="Rain">Rain</option>
                  <option value="Hamattan">Hamattan</option>
                </select>
              </div>
              <div className='flex flex-col w-full gap-2 text-xs'>
                <label htmlFor="name">Select Level</label>
                <select  value={details?.level} onChange={(e) => dispatch({ type: "level", payload: e.target.value})} name="level" id="level" className='p-3 text-sm border rounded-md text-black/70'>
                  <option value="">Select Level</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="500">500</option>
                  <option value="600">600</option>
                  <option value="700">700</option>
                </select>
              </div>
            </div>
            <button type='submit' className='flex items-center justify-center gap-2 p-3 pl-5 pr-6 mt-12 text-sm font-medium text-white rounded-md bg-primary md:w-36'>
              Submit
            </button>
          </form>
        </div>
        </div>
  )
}

export default RegisterCourse