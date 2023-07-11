'use client'
import useFetch from '@/hooks/useFetch'
import usePost from '@/hooks/usePost'
import { IProfile, IReducerAction, IUser } from '@/interfaces'
import { apiGetUser, apiUpdateUser, apiUpdateProfileImage } from '@/services/AuthService'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdAdd } from 'react-icons/md'
import { toast } from 'react-toastify'



const initialState: IProfile = {
  email: '',
  phone: '',
  first_name: '',      
  last_name: '',        
  level: '',      
  matric_no: '',  
}

export interface IProfileReducerAction extends IReducerAction<"email"  | "phone" | "first_name" | "last_name" | "level" | "matric_no"> {
  payload: string
}


const StudentProfile = () => {
  const imageRef = React.useRef<HTMLInputElement>(null)
  const [user, dispatch] = React.useReducer((state: IProfile, action: IProfileReducerAction) => {
    return { ...state, [action.type]: action.payload }
}, initialState)
  const { data: profile, error, isLoading, isFetching, remove, refetch, fetchStatus } = useFetch<IProfile>({api: apiGetUser, requireAuth: true, key: ['user', 'profile'] })
  const updateProfileMutation = usePost<IProfile, IProfile>(apiUpdateUser, { 
    requireAuth: true,
    onSuccess: (data) => {
      console.log("data", data)
      refetch()
    }
  })
  
  const profilePhotoMutation = usePost<FormData, FormData>(apiUpdateProfileImage, { 
    requireAuth: true,
    onSuccess: (data) => {
      console.log("data", data)
      refetch()
    }
  })

  React.useEffect(() => {
    if(profile) {
      dispatch({type: 'email', payload: profile?.email})
      dispatch({type: 'phone', payload: profile?.phone})
      dispatch({type: 'first_name', payload: profile?.first_name})
      dispatch({type: 'last_name', payload: profile?.last_name})
      dispatch({type: 'level', payload: profile?.level})
      dispatch({type: 'matric_no', payload: profile?.matric_no})
    }
  }, [profile])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("user", user)
    updateProfileMutation.mutate(user)
  }

  const changeDP = () => {
    const file = imageRef.current?.files?.[0]
    if(file) {
      const formData = new FormData()
      formData.append('profile_picture', file)
      profilePhotoMutation.mutate(formData)
    }
  }



  // console.log("profile", profile)
  return (
    <div className='p-4 overflow-y-auto'>
      <div className="flex items-center gap-4 justify-between mb-12">
          <h1 className='text-2xl font-bold'>Profile Settings</h1>
      </div>
      <div className="bg-white p-4 pb-12 rounded-md">
        <h3 className="text-lg mb-8 md:mb-12 font-semibold">
          Profile Image
        </h3>
        <div className='flex items-center gap-6 text-xs my-8'>
            <div className="w-24 h-24 rounded-full bg-gray-200 flex justify-center items-center">
              <Image src={profile?.profile_picture_url || ''} alt='profile photo' width={100} height={100} className='rounded-full w-full h-full' />
            </div>
            <div className="flex flex-col gap-2">
            <label htmlFor='dp' className='flex items-center justify-center gap-2 bg-primary p-2 pl-5 pr-6 text-sm text-white'>
              <MdAdd className='text-2xl' />
              Change
            </label>
            <input name='dp' id='dp' type='file' onChange={changeDP} ref={imageRef} className='hidden' />
            <button className='flex items-center justify-center gap-2 p-2 pl-5 pr-6 text-sm text-red-500 border bg-gray-50'>
              <MdAdd className='text-2xl' />
              Delete
            </button>
            </div>
          </div>
        <form className="mb-8 text-sm" onSubmit={handleSubmit}>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
            <div className='flex flex-col gap-2 text-xs'>
              <label htmlFor="first_name">First Name</label>
              <input type="text" name="first_name" id="first_name" className='border p-2 rounded-md text-sm' value={user?.first_name} onChange={(e) => dispatch({type: 'first_name', payload: e.target.value })} />
            </div>
            <div className='flex flex-col gap-2 text-xs'>
              <label htmlFor="last_name">Last Name</label>
              <input type="text" name="last_name" id="last_name" className='border p-2 rounded-md' value={user?.last_name} onChange={(e) => dispatch({type: 'last_name', payload: e.target.value })} />
            </div>
            <div className='flex flex-col gap-2 text-xs'>
              <label htmlFor="email">Email Address</label>
              <input type="email" name="email" id="email" className='border p-2 rounded-md' value={user?.email} onChange={(e) => dispatch({type: 'email', payload: e.target.value })} />
            </div>
            <div className='flex flex-col gap-2 text-xs'>
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" name="phone" id="phone" className='border p-2 rounded-md' value={user?.phone} onChange={(e) => dispatch({type: 'phone', payload: e.target.value })} />
            </div>
            <div className='flex flex-col gap-2 text-xs'>
              <label htmlFor="level">Level</label>
              <input type="text" name="level" id="level" className='border p-2 rounded-md' value={user?.level} onChange={(e) => dispatch({type: 'level', payload: e.target.value })} />
            </div>
            <div className='flex flex-col gap-2 text-xs'>
              <label htmlFor="matric">Matric Number</label>
              <input type="text" name="matric" id="matric" className='border p-2 rounded-md' value={user?.matric_no} onChange={(e) => dispatch({type: 'matric_no', payload: e.target.value })} />
            </div>
          </div>
          <button type='submit' className='mt-12 flex items-center justify-center gap-2 bg-primary p-2 pl-5 pr-6 text-sm text-white'>
            Save Change
          </button>
        </form>
        <div className="flex flex-col lg:flex-row gap-4 text-xs">
          <div className='bg-gray-200 rounded-md p-4 flex-1'>
            <div className="flex justify-between gap-4 items-center mb-2">
              <h6 className='font-semibold text-sm'>Password</h6>
              <Link href={'/profile/password'} className='bg-white p-1 px-2 text-[10px] text-primary'>
                Change
              </Link>
            </div>
            <p>You can reset or change your password by clicking here</p>
          </div>
          <div className='bg-gray-200 rounded-md p-4 flex-1'>
            <div className="flex justify-between gap-4 items-center mb-2">
              <h6 className='font-semibold text-sm'>Remove Account</h6>
              <button className='bg-white p-1 px-2 text-[10px] text-primary'>
                Deactivate
              </button>
            </div>
            <p>You can reset or change your password by clicking here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile