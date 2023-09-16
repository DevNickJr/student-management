'use client'
import React, { useReducer } from 'react'
import { MdAdd } from 'react-icons/md'
import ConfirmCourse from '../confirm/Confirm'
import { IReducerAction, ICourse } from '@/interfaces'


  
interface ICourseReducerAction extends IReducerAction<"session" | "semester" | "level"> {
  payload: string
}

const initialState: ICourse = {
  session: '',
  semester: '',
  level: ''
}

const RegisterCourse = () => {
  const [registerOpen, setRegisterOpen] = React.useState(false)
  const [details, dispatch] = useReducer((state: ICourse, action: ICourseReducerAction) => {
    return { ...state, [action.type]: action.payload }
}, initialState)  

  const handleSubmit = () => {
    setRegisterOpen(true)
  }


  return (
    <>
      {   
      !registerOpen ? 
        <div className='p-4 overflow-y-auto'>
        <div className="flex items-center justify-between gap-4 mb-12">
            <h1 className='text-2xl font-semibold'>Courses</h1>
        </div>
        <div className="p-4 pb-12 bg-white rounded-md">
          <h3 className="mb-8 text-lg font-semibold md:mb-12">
              Course Registration
          </h3>
          <form className="mb-8">
            <div className='flex flex-col items-start max-w-md gap-10'>
              <div className='flex flex-col w-full gap-2 text-xs'>
                <label htmlFor="name">Enter Session</label>
                <select  value={details?.session} onChange={(e) => dispatch({ type: "session", payload: e.target.value})} name="session" id="session" className='p-3 text-sm border rounded-md text-black/70'>
                  <option value="">Select Current Session</option>
                  <option value="2020">2020/2021</option>
                  <option value="2020">2020/2021</option>
                  <option value="2020">2021/2022</option>
                  <option value="2020">2022/2023</option>
                  <option value="2020">2023/2024</option>
                </select>
              </div>
              <div className='flex flex-col w-full gap-2 text-xs'>
                <label htmlFor="name">Semester</label>
                <select  value={details?.semester} onChange={(e) => dispatch({ type: "semester", payload: e.target.value})} name="semester" id="semester" className='p-3 text-sm border rounded-md text-black/70'>
                  <option value="">Select Current Semester</option>
                  <option value="Rain">Rain</option>
                  <option value="Hamattan">Hamattan</option>
                </select>
              </div>
              <div className='flex flex-col w-full gap-2 text-xs'>
                <label htmlFor="name">Level</label>
                <select  value={details?.level} onChange={(e) => dispatch({ type: "level", payload: e.target.value})} name="level" id="level" className='p-3 text-sm border rounded-md text-black/70'>
                  <option value="">Select Current Level</option>
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
            <button onClick={handleSubmit} type='submit' className='flex items-center justify-center gap-2 p-3 pl-5 pr-6 mt-12 text-sm font-medium text-white rounded-md bg-primary md:w-36'>
              Submit
            </button>
          </form>
        </div>
        </div>
        : <ConfirmCourse details={details} />
      }
    </>
  )
}

export default RegisterCourse