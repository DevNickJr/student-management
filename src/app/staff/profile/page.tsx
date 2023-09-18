'use client'
import Loader from '@/components/Loader'
import useFetch from '@/hooks/useFetch'
import usePost from '@/hooks/usePost'
import { IProfile, IReducerAction, IUser } from '@/interfaces'
import { apiGetUser, apiUpdateUser, apiUpdateProfileImage } from '@/services/AuthService'
import { useSession } from 'next-auth/react'
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
  middle_name: '',
  option: '',
}

export interface IProfileReducerAction extends IReducerAction<"email"  | "phone" | "first_name" | "last_name" | "level" | "matric_no" | "middle_name" | "option"> {
  payload: string
}


const StaffProfile = () => {
  // const { update } = useSession()
  const imageRef = React.useRef<HTMLInputElement>(null)
  const [user, dispatch] = React.useReducer((state: IProfile, action: IProfileReducerAction) => {
    return { ...state, [action.type]: action.payload }
}, initialState)
  const { data: profile, error, isLoading, isFetching, remove, refetch, fetchStatus } = useFetch<IProfile>({api: apiGetUser, requireAuth: true, key: ['user', 'profile'] })
  
  const updateProfileMutation = usePost<IProfile, IProfile>(apiUpdateUser, { 
    requireAuth: true,
    onSuccess: (data) => {
      console.log("data", data)
      // update({ user: data })
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
      dispatch({type: 'middle_name', payload: profile?.middle_name})
      dispatch({type: 'option', payload: profile?.option})
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
      {(profilePhotoMutation?.isLoading || updateProfileMutation?.isLoading) && <Loader />}
      <div className="flex items-center justify-between gap-4 mb-12">
          <h1 className='text-2xl font-bold'>Profile Settings</h1>
      </div>
      <div className="p-4 pb-12 bg-white rounded-md">
        <h3 className="mb-8 text-lg font-semibold md:mb-12">
          Profile Image
        </h3>
        <div className='flex items-center gap-6 my-8 text-xs'>
            <div className="flex items-center justify-center w-24 h-24 bg-gray-200 rounded-full">
              <Image src={profile?.profile_picture_url || ''} alt='profile photo' width={100} height={100} className='w-full h-full rounded-full' />
            </div>
            <div className="flex flex-col gap-2">
            <label htmlFor='dp' className='flex items-center justify-center gap-2 p-2 pl-5 pr-6 text-sm text-white cursor-pointer bg-primary'>
              <MdAdd className='text-2xl' />
              Change
            </label>
            <input name='dp' id='dp' type='file' onChange={changeDP} ref={imageRef} className='hidden' />
            <button className='flex items-center justify-center gap-2 p-2 pl-5 pr-6 text-sm text-red-500 border cursor-pointer bg-gray-50'>
              <MdAdd className='text-2xl' />
              Delete
            </button>
            </div>
          </div>
        <form className="mb-8 text-sm" onSubmit={handleSubmit}>
          <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
            <div className='flex flex-col gap-2 text-xs'>
              <label htmlFor="email">Email Address</label>
              <input disabled type="email" name="email" id="email" className='p-2 border rounded-md' value={user?.email} onChange={(e) => dispatch({type: 'email', payload: e.target.value })} />
            </div>
          </div>
          <button type='submit' className='flex items-center justify-center gap-2 p-2 pl-5 pr-6 mt-12 text-sm text-white bg-primary'>
            Save Change
          </button>
        </form>
        <div className="flex flex-col gap-4 text-xs lg:flex-row">
          <div className='flex-1 p-4 bg-gray-200 rounded-md'>
            <div className="flex items-center justify-between gap-4 mb-2">
              <h6 className='text-sm font-semibold'>Password</h6>
              <Link href={'/staff/profile/password'} className='bg-white p-1 px-2 text-[10px] text-primary'>
                Change
              </Link>
            </div>
            <p>You can reset or change your password by clicking here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffProfile