
'use client'
import Link from 'next/link'
import React from 'react'
import ScanImage from '@/assets/scan.svg'
import Image from 'next/image'
import Webcam from "react-webcam";
import { IRegisterFace } from '@/interfaces'
import { apiRegisterFace } from '@/services/AuthService'
import usePost from '@/hooks/usePost'

const initialState: IRegisterFace = {
  email: 'nick@futo.edu.ng',
  image: '',
}


const FaceId = () => {
  const [active, setActive] = React.useState<'student' | 'staff'>('student')
  const [modalOpen, setModalOpen] = React.useState(false)
  const webcamRef = React.useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = React.useState<string>('');
  const registerFaceMutation = usePost(apiRegisterFace, {
    onSuccess: (data) => {
      console.log('data', data)
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
  }, [webcamRef, setImgSrc]);

  const registerFace = async () => {
    console.log('register face')

    const blob: Blob = await fetch(imgSrc).then(r => r.blob())

    const file = new File([blob], 'face2', { type: 'image/png' });

    const formData = new FormData()
    formData.append('email', 'nick2@futo.edu.ng')
    formData.append('image', file)

    registerFaceMutation.mutate(formData)
  }  

  return (
    <div className='md:pl-24 py-4'>
      <div className="flex justify-center gap-16 items-center mb-12 text-lg">
          <div onClick={() => setActive('student')} className={`py-2 px-4 cursor-pointer ${active==='student' && 'border-b-[3px] border-primary text-primary font-semibold'}`}>Students</div>
          <div onClick={() => setActive('staff')} className={`py-2 px-4 cursor-pointer ${active==='staff' && 'border-b-[3px] border-primary text-primary font-semibold'}`}>Staff</div>
      </div>
      <div className="flex flex-col items-center gap-4 mb-12">
          <h1 className='text-2xl font-bold'>Set Up Face ID</h1>
          <p className='text-sm'>Scan your face to register it on the Database</p>
      </div>
      <form className="max-w-lg mx-auto">
        <div className="flex justify-center items-center h-48 md:h-68 border-2 border-primary border-dashed rounded-md py-10">
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
          {/* <Image src={ScanImage} alt='Scan' className='w-full h-full' /> */}
        </div>
        <>
          {
            !imgSrc ? (
            <div onClick={capture} className='mt-12 flex items-center justify-center gap-2 bg-primary p-4 pl-5 pr-6 text-sm text-white rounded-md w-full font-bold'>
              Scan
            </div> )
          :
          <div onClick={registerFace} className='mt-12 flex items-center justify-center gap-2 bg-primary p-4 pl-5 pr-6 text-sm text-white rounded-md w-full font-bold'>
            Proceed
          </div>
          }

        </>
        {/* <input ref={imgRef} type="file" name="image" accept="image/*" capture="environment" /> */}
      </form>

    </div>
  )
}

export default FaceId