'use client'
import React from 'react'
import { MdAdd } from 'react-icons/md'
import ScanImage from '@/assets/scan.svg'
import Image from 'next/image'
import { IVerifiedFace } from '@/interfaces'
import { apiVerifyFace } from '@/services/AuthService'
import usePost from '@/hooks/usePost'
import { toast } from 'react-toastify'
import Webcam from "react-webcam";
// import { useRouter } from 'next/navigation'

const initialState: IVerifiedFace = {
  level: '200',
  image: '',
}


const StaffScan = () => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const webcamRef = React.useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = React.useState<string>('');
  const verifyFaceMutation = usePost(apiVerifyFace, {
    requireAuth: true,
    onSuccess: (data) => {
      toast.success(data.message || 'Face verified successfully')
      // router.push('/staff/scan/verify')
    }
  })

  const capture = React.useCallback(async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;
    // const blob: Blob = await fetch(imageSrc).then(r => r.blob())
    // // const blob = await base64Response.blob();
    // const imgs = new File([blob], 'face2', { type: 'image/png' });
    // // const blob: Blob = imageSrc.blob()
    // const file = new File([imageSrc], 'filename.png', { type: 'image/png' })
    // console.log('image', imageSrc, file)
    setImgSrc(imageSrc);
    setModalOpen(false)

    const blob: Blob = await fetch(imageSrc).then(r => r.blob())

    const file = new File([blob], 'face2', { type: 'image/png' });

    const formData = new FormData()
    formData.append('level', '200')
    formData.append('image', file)

    console.log('formdata', file)

    verifyFaceMutation.mutate(formData)
  }, [webcamRef, verifyFaceMutation]);


  return (
    <div className='p-4 overflow-y-auto'>
      <div className="flex items-center gap-4 justify-between mb-12">
        <div className="flex flex-col gap-2">
          <h1 className='text-2xl font-bold'>Welcome Back, Jonathan</h1>
          <p className='text-sm'>You can easily verify students by scanning them</p>
        </div>
        {/* <button className='flex items-center gap-2 bg-primary p-2 pr-3 text-sm text-white'>
          <MdAdd className='text-2xl' />
          Register Course
        </button> */}
      </div>
      <div className="bg-white p-4 pb-12 rounded-md">
        <div className='mb-8'>
          <h3 className="mb-8">
            Scan Students
          </h3>
          <div className="flex justify-center items-center h-64 md:h-96 border-2 border-primary border-dashed rounded-md py-10">
            {/* <Image src={ScanImage} alt='Scan' className='w-full h-full' /> */}
            <>
            {
              !imgSrc ? (
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />
              )
            :
                <Image
                    src={imgSrc}
                    width={640}
                    height={480}
                    alt="Picture of the user"
                />
            } 
          </>
          </div>
          <button onClick={capture} className='mx-auto mt-12 flex items-center justify-center gap-2 bg-primary p-2 pl-5 pr-6 text-sm text-white'>
            Click to Scan
          </button>
        </div>
        <div>
          <h3 className="text-lg mb-8 font-semibold">
            Steps on how to scan properly
          </h3>
          <div className="grid gap-10">
            {[0,1,2,3,4,5,6].map((_, i) => (
            <div key={i} className='flex items-center gap-2 text-xs'>
              <div className="w-3 h-3 rounded-full bg-gray-200" />
              <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatum.</p>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffScan