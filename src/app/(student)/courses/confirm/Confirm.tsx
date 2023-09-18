'use client'
import React, { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { IProfile, ITableColumn } from '@/interfaces'
import { apiGetUser } from '@/services/AuthService'
import useFetch from '@/hooks/useFetch'
import { apiFilterCourses, apiRegisterCourses } from '@/services/UserService'
import Table from '@/components/Table/CourseReg'
import usePost from '@/hooks/usePost'
import { toast } from 'react-toastify'
import Loader from '@/components/Loader'
import CheckImg from "@/assets/check.png"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ICourse } from '@/interfaces'


interface IProps {
  details: ICourse
}

const ConfirmCourse = ({ details }: IProps) => {
  const { data, error, isLoading, isFetching, fetchStatus } = useFetch<IProfile>({api: apiGetUser, requireAuth: true, key: ['user', 'profile'] })

// console.log({
//   data
// })
  const [totalCourses, setTotalCourses] = useState(0)
  const [totalUnits, setTotalUnits] = useState(0)
  const [courses, setCourses] = React.useState<{ id: string, register: boolean, unit: number }[]>([])
  
  const router = useRouter()
  const [modalOpen, setModalOpen] = React.useState(false)

  const registerCoursesMutation = usePost<any, any>(
    apiRegisterCourses,
    {
      showSuccessMessage: false,
      showErrorMessage: false,
      requireAuth: true,
      onSuccess: (data) => {
          toast.success(data?.data?.message)
          setModalOpen(true)
          console.log(data?.message || '')
      },
      onError: (error: any) => {
        console.log({error})
        toast.error(error?.response?.data?.message || "An error occured")
      }
    }
  )


  const handleSelect = (value: any) => {
    console.log({value})
    setCourses(courses => courses.map((course) => {
      if (course.id != value.id) {
        return course
      }
      if (course?.register) {
        setTotalCourses(prev => prev-1)
        setTotalUnits(prev => prev - course.unit)
      } else {
        setTotalUnits(prev => prev + course.unit)
        setTotalCourses(prev => prev+1)
      }
      return {
        ...course,
        register: !course?.register
      }
    }))
  }

  const handleRegister = () => {
    const registered = courses.filter(course => course.register)
    const course_ids = registered.map(course => course.id)

    if (!course_ids.length) {
      return toast.info("You must select courses to register")
    }

    registerCoursesMutation.mutate({
      course_ids
    })
  }

  const { data: filteredCourses, isLoading: filteredCoursesLoading } = useFetch({
    api: apiFilterCourses, 
    param: {
      level: details.level,
      semester: details.semester
    },
    requireAuth: true, 
    key: ['user', 'filteredCourses', details.semester, details.level],
    select: (data) => data?.data,
    enabled: !!details.semester
  })

  React.useEffect(() => {
    if (filteredCourses) {
      setCourses(filteredCourses?.results)
    }
  }, [filteredCourses])


  const columns: ITableColumn[] = [
    {
      name: 'select',
      label: 'Register',
      extra: true,
      custom: (value, meta) => {
        return (
          <>
          <input onClick={() => handleSelect(meta)} checked={meta?.register} type="checkbox" className='cursor-pointer' name="" id="" />
          </>
        )
      }
    },
    {
      name: 'code',
      label: 'Course Code',
    },
    {
      name: 'title',
      label: 'Course Title',
    },
    {
      name: 'unit',
      label: 'Course Units',
    },
    {
      name: 'Jr',
      label: 'Course Type',
    }
  ]

  const done = () => {
    setModalOpen(false)
    router.push("/courses")
  }
   

  return (
    <div className='p-4 overflow-y-auto'>
      {registerCoursesMutation?.isLoading && <Loader />}
      {
        modalOpen &&
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full p-4 bg-black/50'>
          <div className='min-w-[200px] min-h-40 bg-white rounded-md flex flex-col items-center text-center gap-8 p-8 md:p-16'>
            <Image src={CheckImg} alt={"check image"} />
            <div className="flex flex-col gap-3">
              <h1 className='text-2xl font-semibold'>
                Courses Registered succesfully
              </h1>
              <p className='text-xs'>Hi Jonathan<br />You have successfully created your courses</p>
            </div>
            <Link href={"/courses"} className='flex items-center justify-center w-full gap-2 p-3 pl-5 pr-6 text-sm text-white rounded-sm bg-primary'>
                  Continue
            </Link>
          </div>
        </div>
      }
      <div className="flex items-center justify-between gap-4 mb-12">
          <h1 className='text-2xl font-semibold'>Courses</h1>
      </div>
      <div className="p-4 pb-12 bg-white rounded-md">
        <h3 className="mb-8 text-lg font-semibold md:mb-12">
            Bio Data
        </h3>
        <div className="mb-8">
          <div className='grid gap-2'>
            <div className={`grid md:grid-cols-2 text-xs w-full border rounded-sm border-[#A7E1EA] bg-[#ECF5FF]`}>
              <div className={`flex items-center gap-4 p-2 py-3 border-r border-[#A7E1EA]`}>
                  <div>
                      Full Name:
                  </div>
                  <div>
                      {data?.last_name} {data?.first_name} {data?.middle_name}
                  </div>
              </div>
              <div className='flex items-center gap-4 p-2'>
                  <div>
                      Level:
                  </div>
                  <div>
                    {data?.level} Level
                  </div>
              </div>
            </div>
            <div className={`grid md:grid-cols-2 text-xs w-full border rounded-sm border-[#A7E1EA]`}>
              <div className={`flex items-center gap-4 p-2 py-3 border-r border-[#A7E1EA]`}>
                  <div>
                    Matric Number:
                  </div>
                  <div>
                    {data?.matric_no}
                  </div>
              </div>
              <div className='flex items-center gap-4 p-2'>
                  <div>
                    Student Type:
                  </div>
                  <div>
                    Undergraduate
                  </div>
              </div>
            </div>
            <div className={`grid md:grid-cols-2 text-xs w-full border rounded-sm border-[#A7E1EA] bg-[#ECF5FF]`}>
              <div className={`flex items-center gap-4 p-2 py-3 border-r border-[#A7E1EA]`}>
                  <div>
                    Department:
                  </div>
                  <div>
                    {data?.department || "EEE"}
                  </div>
              </div>
              <div className='flex items-center gap-4 p-2'>
                  <div>
                      Session:
                  </div>
                  <div>
                    {details?.session || data?.session || "N/A"}
                  </div>
              </div>
            </div>
            <div className={`grid md:grid-cols-2 text-xs w-full border rounded-sm border-[#A7E1EA]`}>
              <div className={`flex items-center gap-4 p-2 py-3 border-r border-[#A7E1EA]`}>
                  <div>
                    Option:
                  </div>
                  <div>
                    {data?.option || 'N/A'}
                  </div>
              </div>
              <div className='flex items-center gap-4 p-2'>
                  <div>
                    Faculty:
                  </div>
                  <div>
                    {data?.faculty || "SESET"}
                  </div>
              </div>
            </div>
            <div className={`grid md:grid-cols-2 text-xs w-full border rounded-sm border-[#A7E1EA] bg-[#ECF5FF]`}>
              <div className={`flex items-center gap-4 p-2 py-3 border-r border-[#A7E1EA]`}>
                  <div>
                    Minimum Units:
                  </div>
                  <div>
                    {data?.minimum_units || '16'}
                  </div>
              </div>
              <div className='flex items-center gap-4 p-2'>
                  <div>
                    Maximum Units:
                  </div>
                  <div>
                    {data?.maximum_units || "27"}
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Table total_units={totalUnits || 0} total_courses={totalCourses || 0} data={courses || []} columns={columns} />
          <div className='flex justify-end'>
            <button onClick={handleRegister} type='submit' className='flex items-center justify-center gap-2 p-2 pl-5 pr-6 text-sm text-white bg-primary'>
              Register Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmCourse