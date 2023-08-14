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
import Loader from '@/components/Loader'
import Bio from './bio/Bio'
import { useSession } from 'next-auth/react'

// import { useRouter } from 'next/navigation'

const initialState: IVerifiedFace = {
  level: '200',
  image: '',
}


const StaffHome = () => {
  const { data } = useSession()
  const [modalOpen, setModalOpen] = React.useState(false)
  const [bioOpen, setBioOpen] = React.useState(false)
  const [scan, setScan] = React.useState(false)
  const webcamRef = React.useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = React.useState<string>('');
  const verifyFaceMutation = usePost(apiVerifyFace, {
    requireAuth: true,
    onSuccess: (data) => {
      toast.success(data?.message || 'Face verified successfully')
      setBioOpen(true)
      // router.push('/staff/scan/verify')
    },
    onError: (data) => {
      console.log({data})
      toast.info(data?.response?.data?.message || 'Failed to verify')
      // router.push('/staff/scan/verify')
    },
  })


  const capture = React.useCallback(async () => {
    if (!scan) {
      setScan(true)
      return
    }

    if (imgSrc) {
      
    }

    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setImgSrc(imageSrc);
    setModalOpen(false)

    const blob: Blob = await fetch(imageSrc).then(r => r.blob())

    const file = new File([blob], 'face2', { type: 'image/png' });

    const formData = new FormData()
    formData.append('level', '300')
    formData.append('image', file)

    console.log('formdata', file)

    verifyFaceMutation.mutate(formData)
  }, [webcamRef, verifyFaceMutation, scan, imgSrc]);

  const reset = () => {
    setImgSrc('')
  }

  console.log(verifyFaceMutation.data)
  return (
    <>
   {!bioOpen ? 
   <div className='p-4 overflow-y-auto'>
      {verifyFaceMutation?.isLoading && <Loader />}
      <div className="flex items-center justify-between gap-4 mb-12">
        <div className="flex flex-col gap-2">
          <h1 className='text-2xl font-bold'>Welcome Back, {data?.user?.userDetails?.first_name}</h1>
          <p className='text-sm'>You can easily verify students by scanning them</p>
        </div>
        {/* <button className='flex items-center gap-2 p-2 pr-3 text-sm text-white bg-primary'>
          <MdAdd className='text-2xl' />
          Register Course
        </button> */}
      </div>
      <div className="p-4 pb-12 bg-white rounded-md">
        <div className='mb-8'>
          <h3 className="mb-8">
            Scan Students
          </h3>
          <div className="flex items-center justify-center h-64 py-10 border-2 border-dashed rounded-md md:h-96 border-primary">
            {/* <Image src={ScanImage} alt='Scan' className='w-full h-full' /> */}
          <div className='flex h-72 w-72'>
            
            {
              !imgSrc ? (
                <>
                  {
                    scan ? 
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className='w-full h-full'
                        />
                     :
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
          {
            !imgSrc ?
            <button onClick={capture} className='flex items-center justify-center gap-2 p-2 pl-5 pr-6 mx-auto mt-12 text-sm text-white bg-primary'>
              Click to Scan
            </button>
            :
            <button onClick={reset} className='flex items-center justify-center gap-2 p-2 pl-5 pr-6 mx-auto mt-12 text-sm text-white bg-primary'>
              Click to reset
          </button>
          }
        </div>
        <div>
          <h3 className="mb-8 text-lg font-semibold">
            Steps on how to scan properly
          </h3>
          <div className="grid gap-6">
            <div className='flex items-center gap-2 text-xs'>
              <div className="w-3 h-3 rounded-full bg-primary" />
              <p className=''>Ask the student to stand in front of the scanner or webcam.</p>
            </div>
            <div className='flex items-center gap-2 text-xs'>
              <div className="w-3 h-3 rounded-full bg-primary" />
              <p className=''>Instruct the student to position their face within the designated area or frame.</p>
            </div>
            <div className='flex items-center gap-2 text-xs'>
              <div className="w-3 h-3 rounded-full bg-primary" />
              <p className=''>Capture their facial image using the scanner or webcam.</p>
            </div>
            <div className='flex items-center gap-2 text-xs'>
              <div className="w-3 h-3 rounded-full bg-primary" />
              <p className=''>Associate the captured facial image with the student&apos;s profile or identification number in the system.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    :
    <Bio closeBio={() => setBioOpen(false)} data={verifyFaceMutation.data} />
    }
    </>
  )
}

export default StaffHome