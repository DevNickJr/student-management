'use client'
import Link from 'next/link'
import React, { useReducer, FormEvent } from 'react'
import { IUserRegister, IRegistereducerAction } from '@/interfaces'
import { toast } from 'react-toastify'
import usePost from '@/hooks/usePost'
import { useRouter } from 'next/navigation'
import { apiRegister } from '@/services/AuthService'


const initialState: IUserRegister = {
  email: '',
  password: '', 
  confirm_password: '',
  phone: '',
  first_name: '',      
  last_name: '',        
  level: '',      
  matric_no: '',  
}

const Register = () => {
  const [active, setActive] = React.useState<'student' | 'staff'>('student')
  const [step, setStep] = React.useState<number>(1)
  const [loading, setLoading] = React.useState(false)
  const [user, dispatch] = useReducer((state: IUserRegister, action: IRegistereducerAction) => {
    return { ...state, [action.type]: action.payload }
}, initialState)

const router = useRouter()

const { mutate } = usePost<IUserRegister, any>(
    apiRegister,
    {
      onSuccess: () => {
          // queryClient.invalidateQueries('user')
          toast.success("Registration Successful")
          router.push('/dashboard')
      },
      onError: (error: any) => {
          toast.error(error?.message)
      }
    }
  )


const handleRegister = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault()
  setLoading(true)
  console.log('registering')

  if (step === 1) {
      setStep(2)
      return
  }


  if (user?.password !== user?.confirm_password) {
      toast.error("Password Mismatch")
      return
  }
  if (user?.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
  }
  if (user?.phone.length < 11) {
      toast.error("Phone number must be at least 11 characters")
      return
  }
  

  try {
    console.log("user", user )
    const res = await apiRegister(user)
    console.log({res})
    mutate(user)

      // console.log("res", res)
  } catch (error: any) {
      console.log("error", error)
      toast.error(error?.message)

  }
  setLoading(false)
}


  return (
    <div className='md:pl-24 py-4'>
      <div className="flex justify-center gap-16 items-center mb-12 text-lg">
          <div onClick={() => setActive('student')} className={`py-2 px-4 cursor-pointer ${active==='student' && 'border-b-[3px] border-primary text-primary font-semibold'}`}>Students</div>
          <div onClick={() => setActive('staff')} className={`py-2 px-4 cursor-pointer ${active==='staff' && 'border-b-[3px] border-primary text-primary font-semibold'}`}>Staff</div>
      </div>
      <div className="flex flex-col items-center gap-4 mb-12">
          <h1 className='text-2xl font-bold'>Create an Account</h1>
          <p className='text-sm'>Create an account to Get Started</p>
      </div>
      <form onSubmit={handleRegister} action="" className="max-w-l">
        <div className='grid gap-6 mb-2'>
          {step === 1 && (
            <>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="first_name">First Name</label>
                <input value={user?.first_name} onChange={(e) => dispatch({ type: "first_name", payload: e.target.value})} type='text' name="first_name" id="first_name" className='border p-3 placeholder:text-sm rounded-md' placeholder='Enter First Name' />
              </div>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="last_name">Last Name</label>
                <input value={user?.last_name} onChange={(e) => dispatch({ type: "last_name", payload: e.target.value})}  type="text" name="last_name" id="last_name" className='border p-3 placeholder:text-sm rounded-md' placeholder='Enter Last Name' />
              </div>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="email">Email Address</label>
                <input value={user?.email} onChange={(e) => dispatch({ type: "email", payload: e.target.value})}  type="email" name="email" id="email" className='border p-3 placeholder:text-sm rounded-md' placeholder='Enter Email Address' />
              </div>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="phone">Phone Number</label>
                <input value={user?.phone} onChange={(e) => dispatch({ type: "phone", payload: e.target.value})}  type="tel" name="phone" id="phone" className='border p-3 placeholder:text-sm rounded-md' placeholder='Enter Phone number' />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="level">Level</label>
                <input value={user?.level} onChange={(e) => dispatch({ type: "level", payload: e.target.value})} type='text' name="level" id="level" className='border p-3 placeholder:text-sm rounded-md' placeholder='Enter Level' />
              </div>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="matric_no">Mat No.</label>
                <input value={user?.matric_no} onChange={(e) => dispatch({ type: "matric_no", payload: e.target.value})}  type="text" name="matric_no" id="matric_no" className='border p-3 placeholder:text-sm rounded-md' placeholder='Enter Mat Number' />
              </div>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="password">Password</label>
                <input value={user?.password} onChange={(e) => dispatch({ type: "password", payload: e.target.value})}  type="password" name="password" id="password" className='border p-3 placeholder:text-sm rounded-md' placeholder='Enter Password' />
              </div>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="confirm_password">Confirm Password</label>
                <input value={user?.confirm_password} onChange={(e) => dispatch({ type: "confirm_password", payload: e.target.value})}  type="password" name="confirm_password" id="confirm_password" className='border p-3 placeholder:text-sm rounded-md' placeholder='Confrim Password' />
              </div>
            </>
          )}
        </div>
        <button type='submit' className='mt-12 flex items-center justify-center gap-2 bg-primary p-4 pl-5 pr-6 text-sm text-white rounded-md w-full font-bold'>
          Proceed
        </button>
      </form>
    </div>
  )
}

export default Register