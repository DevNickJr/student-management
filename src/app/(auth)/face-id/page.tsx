
'use client'
import Link from 'next/link'
import React from 'react'
import ScanImage from '@/assets/scan.svg'
import Image from 'next/image'
import Webcam from "react-webcam";
import { IRegisterFace } from '@/interfaces'
import { apiRegisterFace } from '@/services/AuthService'
import usePost from '@/hooks/usePost'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'
import { toast } from 'react-toastify'

const initialState: IRegisterFace = {
  email: '',
  image: '',
}


const FaceId = () => {
  const [active, setActive] = React.useState<'student' | 'staff'>('student')
  const [facingMode, setFacingMode] = React.useState<'user' | 'environment'>('user')
  const [scan, setScan] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)
  const router = useRouter()
  const webcamRef = React.useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = React.useState<string>('');

  const videoConstraints = {
    // width: 1280,
    // height: 720,
    facingMode: { exact: facingMode }
  };

  const registerFaceMutation = usePost(apiRegisterFace, {
    onSuccess: (data) => {
      console.log('data', data)
      router.push('/')
    },
    onError: (error: any) => {
      console.log({error})
        toast.error(error?.response?.data?.errors?.message || "An error occured")
    }
  })

  // console.log({ router, is: sessionStorage.getItem('email') })
  


  const capture = React.useCallback(async () => {
    console.log('capturing 1', scan)


    if (!scan) {
      console.log('capturing 2')
      setScan(true)
      return
    }
    console.log('capturing')
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
  }, [webcamRef, setImgSrc, scan]);

  const registerFace = async () => {
    // console.log('register face')
    const blob: Blob = await fetch(imgSrc).then(r => r.blob())

    const file = new File([blob], 'face2', { type: 'image/png' });

    const formData = new FormData()

    if (window == undefined) {
      return
    }

    console.log('email', sessionStorage.getItem('email'), file)

    formData.append('email', sessionStorage.getItem('email')!)

    formData.append('image', file)

    registerFaceMutation.mutate(formData)
  }  

  const changeCamera = () => {
    console.log('change camera')
    if (facingMode === 'user') {
      setFacingMode('environment')
    } else {
      setFacingMode('user')
    }
  }

  return (
    <div className='py-4 md:pl-24'>
      {registerFaceMutation?.isLoading && <Loader />}
      <div className="flex items-center justify-center gap-16 mb-12 text-lg">
          <div onClick={() => setActive('student')} className={`py-2 px-4 cursor-pointer ${active==='student' && 'border-b-[3px] border-primary text-primary font-semibold'}`}>Students</div>
          <div onClick={() => setActive('staff')} className={`py-2 px-4 cursor-pointer ${active==='staff' && 'border-b-[3px] border-primary text-primary font-semibold'}`}>Staff</div>
      </div>
      <div className="flex flex-col items-center gap-4 mb-12">
          <h1 className='text-2xl font-bold'>Set Up Face ID</h1>
          <p className='text-sm'>Scan your face to register it on the Database</p>
      </div>
      <form className="max-w-lg mx-auto">
        <div className="flex justify-end">
          {/* change camera */}
          <div onClick={changeCamera} className='flex items-center justify-center p-2 text-xs font-semibold text-white cursor-pointer bg-primary'>
            Switch Camera
          </div>
        </div>
        <div className="relative flex items-center justify-center h-48 border-2 border-dashed rounded-md md:h-68 border-primary">
          <div className='flex w-48 h-48'>
            {
              !imgSrc ? (
                <>
                   {
                    scan ? (
                      <Webcam
                          audio={false}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          className='w-full h-full'
                          videoConstraints={videoConstraints}
                          onUserMediaError={(e) => {
                            console.log('error', e)
                            setFacingMode('user')
                            // setScan(false)
                          }}
                      />
                    ) :
                    <Image
                      src={ScanImage}
                      width={100}
                      height={100}
                      alt="Scan"
                      className='w-full h-full'
                  />
                   } 
                </>
              )
            :
                <Image
                    src={imgSrc}
                    width={640}
                    height={480}
                    alt="Picture of the user"
                    className='w-full h-full'
                />
            } 
          </div>
        </div>
        <>
          {
            !imgSrc ? (
            <div onClick={capture} className='flex items-center justify-center w-full gap-2 p-4 pl-5 pr-6 mt-12 text-sm font-bold text-white rounded-md cursor-pointer bg-primary'>
              {!scan ? 'Scan' : 'Capture Image'}
            </div> )
          :
          <div className="flex gap-2">
            <div onClick={registerFace} className='flex items-center justify-center w-full gap-2 p-4 pl-5 pr-6 mt-12 text-sm font-bold text-white rounded-md cursor-pointer bg-primary'>
              Proceed
            </div>
            <div onClick={() => setImgSrc('')} className='flex items-center justify-center w-full gap-2 p-4 pl-5 pr-6 mt-12 text-sm font-semibold bg-white border rounded-md cursor-pointer text-primary border-primary'>
              Retake
            </div>
          </div>
          
          }

        </>
        {/* <input ref={imgRef} type="file" name="image" accept="image/*" capture="environment" /> */}
      </form>
      <p className='mt-3 text-sm text-center'>Already have an account? <Link href='/' className='text-primary'>Sign In</Link></p>
    </div>
  )
}

export default FaceId