
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
  const [scan, setScan] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)
  const router = useRouter()
  const webcamRef = React.useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = React.useState<string>('');
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

    formData.append('email', sessionStorage.getItem('email')!)

    formData.append('image', file)

    registerFaceMutation.mutate(formData)
  }  

  return (
    <div className='md:pl-24 py-4'>
      {registerFaceMutation?.isLoading && <Loader />}
      <div className="flex justify-center gap-16 items-center mb-12 text-lg">
          <div onClick={() => setActive('student')} className={`py-2 px-4 cursor-pointer ${active==='student' && 'border-b-[3px] border-primary text-primary font-semibold'}`}>Students</div>
          <div onClick={() => setActive('staff')} className={`py-2 px-4 cursor-pointer ${active==='staff' && 'border-b-[3px] border-primary text-primary font-semibold'}`}>Staff</div>
      </div>
      <div className="flex flex-col items-center gap-4 mb-12">
          <h1 className='text-2xl font-bold'>Set Up Face ID</h1>
          <p className='text-sm'>Scan your face to register it on the Database</p>
      </div>
      <form className="max-w-lg mx-auto">
        <div className="flex justify-center items-center h-48 md:h-68 border-2 border-primary border-dashed rounded-md relative">
          <div className='h-48 w-48 flex'>
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
                      />
                    ) :
                    <Image
                      src={ScanImage}
                      width={100}
                      height={100}
                      alt="Scan"
                      className='w-full h-full my-10'
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
            <div onClick={capture} className='mt-12 flex items-center justify-center gap-2 bg-primary p-4 pl-5 pr-6 text-sm text-white rounded-md w-full font-bold cursor-pointer'>
              {!scan ? 'Scan' : 'Capture Image'}
            </div> )
          :
          <div onClick={registerFace} className='mt-12 flex items-center justify-center gap-2 bg-primary p-4 pl-5 pr-6 text-sm text-white rounded-md w-full font-bold cursor-pointer'>
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