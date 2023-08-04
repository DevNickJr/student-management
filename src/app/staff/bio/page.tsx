'use client'
import Image from 'next/image'
import React from 'react'
import { IProfile } from '@/interfaces'
import { apiGetUser } from '@/services/AuthService'
import { MdAdd, MdChevronLeft } from 'react-icons/md'
import useFetch from '@/hooks/useFetch'

const Bio = () => {
  const { data: profile, error, isLoading, isFetching, remove, refetch, fetchStatus } = useFetch<IProfile>({api: apiGetUser, requireAuth: true, key: ['user', 'profile'] })

  return (
    <div className='p-4 overflow-y-auto'>
      <div className="p-4 pb-12 bg-white rounded-md">
        <div className="flex items-center gap-3 mb-8">
          <MdChevronLeft className='text-2xl' />
          <h3 className="font-semibold">
            Student Bio Data
          </h3>
        </div>
        <div className="flex items-center justify-center w-24 h-24 mb-8 bg-gray-200 rounded-full">
              <Image src={profile?.profile_picture_url || ''} alt='profile photo' width={100} height={100} className='w-full h-full rounded-full' />
            </div>
        <div className="mb-8">
          <div className='grid gap-2'>
            {[0,1,2,3].map((_, i) => (
                <div key={i} className={`grid lg:grid-cols-2 text-xs w-full border rounded-sm border-[#A7E1EA] ${i % 2 === 0 && 'bg-[#ECF5FF]'}`}>
                    <div className={`flex items-center gap-4 p-2 py-3 border-r border-[#A7E1EA]`}>
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
          <button type='submit' className='flex items-center justify-center w-full max-w-sm gap-2 p-3 pl-5 pr-6 mx-auto mt-12 text-sm font-semibold text-white rounded bg-primary'>
            Okay
          </button>
        </div>
      </div>
    </div>
  )
}

export default Bio