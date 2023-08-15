'use client'
import Link from 'next/link'
import React, { useReducer, FormEvent } from 'react'
import { IUserRegister, IRegistereducerAction } from '@/interfaces'
import { toast } from 'react-toastify'
import usePost from '@/hooks/usePost'
import { useRouter } from 'next/navigation'
import { apiRegister } from '@/services/AuthService'
import Loader from '@/components/Loader'


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

const registerMutation = usePost<IUserRegister, any>(
    apiRegister,
    {
      onSuccess: () => {
          // queryClient.invalidateQueries('user')
          sessionStorage.setItem('email', user.email)
          router.push('/face-id', {
            as: 'sss',
            package: 'dssd',
            query: {
              nes: 'dsd'
            }
          })
      },
      onError: (error: any) => {
        console.log({error})
          toast.error(error?.response?.data?.errors?.message || "An error occured")
      }
    }
  )

  const handleNext = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
      return
    }
  }


const handleRegister = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault()
  setLoading(true)

  console.log('registering')


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
    // const res = await apiRegister(user)
    // console.log({res})
    registerMutation?.mutate(user)
    console.log(registerMutation)

      // console.log("res", res)
  } catch (error: any) {
      console.log("error", error)
      toast.error(error?.response?.data?.data?.message || "An error occured")

  }
  setLoading(false)
}


  return (
    <div className='md:pl-24'>
      {registerMutation?.isLoading && <Loader />}
      <div className="flex items-center justify-center gap-16 mb-8 text-lg">
          <div onClick={() => setActive('student')} className={`py-2 px-4 cursor-pointer ${active==='student' && 'border-b-[3px] border-primary text-primary font-semibold'}`}>Students</div>
          <div onClick={() => setActive('staff')} className={`py-2 px-4 cursor-pointer ${active==='staff' && 'border-b-[3px] border-primary text-primary font-semibold'}`}>Staff</div>
      </div>
      <div className="flex flex-col items-center gap-4 mb-8">
          <h1 className='text-2xl font-bold'>Create an Account</h1>
          <p className='text-sm'>Create an account to Get Started</p>
      </div>
      <div className="">
        <div className='mb-2'>
          {step === 1 && (
            <form className='grid gap-4' onSubmit={handleNext}>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="first_name">First Name</label>
                <input required value={user?.first_name} onChange={(e) => dispatch({ type: "first_name", payload: e.target.value})} type='text' name="first_name" id="first_name" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter First Name' />
              </div>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="last_name">Last Name</label>
                <input required value={user?.last_name} onChange={(e) => dispatch({ type: "last_name", payload: e.target.value})}  type="text" name="last_name" id="last_name" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter Last Name' />
              </div>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="email">Email Address</label>
                <input required value={user?.email} onChange={(e) => dispatch({ type: "email", payload: e.target.value})}  type="email" name="email" id="email" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter Email Address' />
              </div>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="phone">Phone Number</label>
                <input required value={user?.phone} onChange={(e) => dispatch({ type: "phone", payload: e.target.value})}  type="tel" name="phone" id="phone" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter Phone number' />
              </div>
              <button type='submit' className='flex items-center justify-center w-full gap-2 p-4 pl-5 pr-6 mt-8 text-sm font-bold text-white rounded-md bg-primary'>
                Proceed
              </button>
            </form>
          )}
          {step === 2 && (
            <form className='grid gap-4' onSubmit={handleRegister}>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="level">Level</label>
                <input required value={user?.level} onChange={(e) => dispatch({ type: "level", payload: e.target.value})} type='text' name="level" id="level" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter Level' />
              </div>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="matric_no">Mat No.</label>
                <input required value={user?.matric_no} onChange={(e) => dispatch({ type: "matric_no", payload: e.target.value})}  type="text" name="matric_no" id="matric_no" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter Mat Number' />
              </div>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="password">Password</label>
                <input required value={user?.password} onChange={(e) => dispatch({ type: "password", payload: e.target.value})}  type="password" name="password" id="password" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter Password' />
              </div>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="confirm_password">Confirm Password</label>
                <input required value={user?.confirm_password} onChange={(e) => dispatch({ type: "confirm_password", payload: e.target.value})}  type="password" name="confirm_password" id="confirm_password" className='p-3 border rounded-md placeholder:text-sm' placeholder='Confrim Password' />
              </div>
              <button type='submit' className='flex items-center justify-center w-full gap-2 p-4 pl-5 pr-6 mt-8 text-sm font-bold text-white rounded-md bg-primary'>
                Proceed
              </button>
            </form>
          )}
        </div>
        <p className='mt-3 text-sm text-center'>Already have an account? <Link href='/' className='text-primary'>Sign In</Link></p>
        
      </div>
    </div>
  )
}

export default Register