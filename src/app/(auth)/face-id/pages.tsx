
'use client'
import Link from 'next/link'
import React from 'react'
import ScanImage from '@/assets/scan.svg'
import Image from 'next/image'

const FaceId = () => {
  const [active, setActive] = React.useState<'student' | 'staff'>('student')
  const [modalOpen, setModalOpen] = React.useState(false)
  const [stream, setStream] = React.useState(null)
  const videoRef = React.useRef<any>(null)
  const canvasRef = React.useRef<any>(null)

  async function getMedia() {
    let stream = null;
  
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });
      setModalOpen(true)
      /* use the stream */
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        videoRef.current.setAttribute("playsinline", "true"); /* required to tell iOS safari we don't want fullscreen */
        videoRef.current.setAttribute("autoPlay", "true"); /* required to tell iOS safari we don't want fullscreen */
      }

      console.log({stream})
    } catch (err) {
      /* handle the error */
    }
  }

  const capture = React.useCallback(() => {
    if (videoRef.current) {
      console.log('vidref', videoRef.current.srcObject)
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const data = canvas.toDataURL('image/png');
      console.log({data})
      console.log('vidref', videoRef.current.srcObject)
      // videoRef.current.srcObject.getVideoTracks().forEach((track: any) => track.stop());
    }
  }, [videoRef, canvasRef]);

  

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
          <Image src={ScanImage} alt='Scan' className='w-full h-full' />
        </div>
        <div onClick={getMedia} className='mt-12 flex items-center justify-center gap-2 bg-primary p-4 pl-5 pr-6 text-sm text-white rounded-md w-full font-bold'>
          Scan
        </div>
        {/* <input  type="file" name="image" accept="image/*" capture="environment" /> */}
      </form>
      {modalOpen &&
       <div className='fixed top-0 bottom-0 w-full h-full bg-black/30 flex justify-center items-center py-12 flex-col gap-4'>
        <video width={640} height={480} ref={videoRef} id="player" controls autoPlay className=''></video>
        <button onClick={capture} id="capture" className='border-red-200 border-2 bg-pink-200 p-4'>Capture</button>
        <canvas width={640} height={480} ref={canvasRef} id="canvas"></canvas>
      </div>}
    </div>
  )
}

export default FaceId