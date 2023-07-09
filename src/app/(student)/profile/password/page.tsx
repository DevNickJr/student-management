"use client"
import React from 'react'
import { IReducerAction, IPassword } from '@/interfaces'
import { apiUpdatePassword } from '@/services/AuthService'
import usePost from '@/hooks/usePost'
import { toast } from 'react-toastify'


export interface IPasswordReducer extends IReducerAction<"old_password" | "new_password" | "confirm_password"> {
  payload: string
}
const initialState: IPassword = {
  old_password: '',
  new_password: '',
  confirm_password: ''
}

const StudentPassswordChange = () => {
  const [password, dispatch] = React.useReducer((state: IPassword, action: IPasswordReducer) => {
    return { ...state, [action.type]: action.payload }
  }, initialState)

  const updatePasswordMutation = usePost<IPassword, IPassword>(apiUpdatePassword, { 
    requireAuth: true,
    onSuccess(data, variables, context) {
      dispatch({type: 'old_password', payload: ''})
      dispatch({type: 'new_password', payload: ''})
      dispatch({type: 'confirm_password', payload: ''})
    },
  })

  const changePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password.new_password !== password.confirm_password) {
      return toast.error("Password does not match")
    }

    if (password.new_password.length < 6) {
      return toast.error("Password must be at least 6 characters")
    }
    console.log({password})
    updatePasswordMutation.mutate(password)
  }

  return (
    <div className='p-4 overflow-y-auto'>
      <div className="flex items-center gap-4 justify-between mb-12">
          <h1 className='text-2xl font-bold'>Profile Settings</h1>
      </div>
      <div className="bg-white p-4 pb-12 rounded-md">
        <h3 className="mb-8">
          Change Password
        </h3>
        <form className="mb-8 text-sm" onSubmit={changePassword}>
          <div className='grid md:grid-cols-2 gap-4'>
            <div  className='flex flex-col gap-2 text-xs'>
              <label htmlFor="old_password">Current Password</label>
              <input type="text" name="old_password" id="old_password" className='border border-gray-300 p-2 rounded-md' value={password?.old_password} onChange={(e) => dispatch({type: 'old_password', payload: e.target.value })} />
            </div>
            <div  className='flex flex-col gap-2 text-xs'>
              <label htmlFor="new_password">New Password</label>
              <input type="text" name="new_password" id="new_password" className='border border-gray-300 p-2 rounded-md' value={password?.new_password} onChange={(e) => dispatch({type: 'new_password', payload: e.target.value })} />
            </div>
            <div  className='flex flex-col gap-2 text-xs'>
              <label htmlFor="confirm_password">Confirm New Password</label>
              <input type="text" name="confirm_password" id="confirm_password" className='border border-gray-300 p-2 rounded-md' value={password?.confirm_password} onChange={(e) => dispatch({type: 'confirm_password', payload: e.target.value })} />
            </div>
          </div>
          <button type='submit' className='mt-12 flex items-center justify-center gap-2 bg-primary p-2 pl-5 pr-6 text-sm text-white'>
            Save Change
          </button>
        </form>
      </div>
    </div>
  )
}

export default StudentPassswordChange