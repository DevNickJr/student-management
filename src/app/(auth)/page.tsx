'use client'
import Link from 'next/link'
import React, { useReducer, FormEvent } from 'react'
import { toast } from 'react-toastify'
import { IUserLogin, ILoginReducerAction } from '@/interfaces'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import usePost from '@/hooks/usePost'
import { apiLogin } from '@/services/AuthService'

const initialState: IUserLogin = {
  email: '',
  password: ''
}


const Login = () => {
  const [active, setActive] = React.useState<'student' | 'staff'>('student')
  const [loading, setLoading] = React.useState(false)
  const [user, dispatch] = useReducer((state: IUserLogin, action: ILoginReducerAction) => {
    return { ...state, [action.type]: action.payload }
}, initialState)

const { mutate } = usePost<IUserLogin, any>(
  apiLogin,
  {
    onSuccess: () => {
        // queryClient.invalidateQueries('user')
        toast.success("Logged in Successfully")
        router.push('/dashboard')
    },
    onError: (error: any) => {
        toast.error(error?.message || "An error occured")
    }
  }
)


  const router = useRouter()

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    try {
      console.log("user", user )
        const res = await signIn('credentials', {
            ...user,
            redirect: true,
            callbackUrl: `${window.location.origin}/dashboard`,
            onUnauthenticated() {
                toast.error("Invalid Credentials")
            }
        })

        console.log("res", res)
    } catch (error: any) {
        console.log("error", error)
        toast.error(error?.message)

    }
    setLoading(false)
}

  return (
    <div className='md:pl-24'>
      <div className="flex justify-center gap-16 items-center mb-12 text-lg">
          <div onClick={() => setActive('student')} className={`py-2 px-4 cursor-pointer ${active==='student' && 'border-b-[3px] border-primary text-primary font-semibold'}`}>Students</div>
          <div onClick={() => setActive('staff')} className={`py-2 px-4 cursor-pointer ${active==='staff' && 'border-b-[3px] border-primary text-primary font-semibold'}`}>Staff</div>
      </div>
      <div className="flex flex-col items-center gap-4 mb-12">
          <h1 className='text-2xl font-bold'>Welcome Back!</h1>
          <p className='text-sm'>Welcome Back! Please Enter your details</p>
      </div>
      <form onSubmit={handleLogin} action="" className="max-w-l">
        <div className='grid gap-10 mb-2'>
            <div className='flex flex-col gap-2 text-xs'>
              <label htmlFor="name">Email Address</label>
              <input  value={user?.email} onChange={(e) => dispatch({ type: "email", payload: e.target.value})} type="text" name="name" id="name" className='border p-3 placeholder:text-sm rounded-md' placeholder='Enter Email Address' />
            </div>
            <div className='flex flex-col gap-2 text-xs'>
              <label htmlFor="name">Password</label>
              <input  value={user?.password} onChange={(e) => dispatch({ type: "password", payload: e.target.value})} type="text" name="password" id="password" className='border p-3 placeholder:text-sm rounded-md' placeholder='Enter Password' />
            </div>
        </div>
        <Link href='/forgot-password' className='text-primary my-2 text-sm font-semibold'>
            Forgot Password?
        </Link>
        <button type='submit' className='mt-12 flex items-center justify-center gap-2 bg-primary p-4 pl-5 pr-6 text-sm text-white rounded-md w-full font-bold'>
            Sign In
        </button>
      </form>
    </div>
  )
}

export default Login