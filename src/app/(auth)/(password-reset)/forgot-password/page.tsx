'use client'
import usePost from '@/hooks/usePost'
import { IForgotPassword, ILoginReducerAction, IReducerAction } from '@/interfaces'
import { apiForgotPassword } from '@/services/AuthService'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { toast } from 'react-toastify'

const initialState: IForgotPassword = {
  email: '',
  redirect_url: 'http://localhost:3000/reset'
}

export interface IForgotPasswordReducerAction extends IReducerAction<"email"> {
  payload: string
}

const ForgotPassword = () => {
  const [loading, setLoading] = React.useState(false)
  const [user, dispatch] = React.useReducer((state: IForgotPassword, action: IForgotPasswordReducerAction) => {
    return { ...state, [action.type]: action.payload }
}, initialState)
const router = useRouter()

const forgotPasswordMutation = usePost<IForgotPassword, any>(apiForgotPassword, {
  onSuccess: () => {
    toast.success("Password Reset Link Sent")
    router.push('/reset')
  }
})

const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault()
  forgotPasswordMutation.mutate(user)
}

  const [active, setActive] = React.useState<'student' | 'staff'>('student')
  return (
    <div className='md:pl-24'>
      <div className="flex flex-col items-center gap-4 mb-12">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex justify-center items-center">
                <AiOutlineArrowLeft className='text-primary w-8 h-8' />
            </div>
          <h1 className='text-2xl font-bold'>Forgot Password?</h1>
          <p className='text-sm'>Enter your registered Email Address below to receive instructions</p>
      </div>
      <form onSubmit={handleForgotPassword} action="" className="max-w-l">
        <div className='grid gap-10 mb-2'>
            <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="name">Email Address</label>
                <input type="text" name="name" id="name" className='border p-3 placeholder:text-sm rounded-md' placeholder='Enter Email Address' value={user?.email} onChange={(e) => dispatch({ type: "email", payload: e.target.value})}  />
            </div>
        </div>
        <button type='submit' className='mt-12 mb-4 flex items-center justify-center gap-2 bg-primary p-4 pl-5 pr-6 text-sm text-white rounded-md w-full font-bold'>
            Continue
        </button>
        <div className='flex justify-center items-center gap-2'>
            <AiOutlineArrowLeft className='' />
            <Link href='/' className='my-2 text-sm font-semibold'>
                Back to Login
            </Link>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword