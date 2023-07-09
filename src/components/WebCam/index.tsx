import Image from "next/image";
import React from "react";
import Webcam from "react-webcam";


const WebcamCapture = () => {
    const webcamRef = React.useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = React.useState<string>('');
    const [modalOpen, setModalOpen] = React.useState(false)


  
    const capture = React.useCallback(() => {
      if (!webcamRef.current) return;
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;
      const file = new File([imageSrc], 'filename.png', { type: 'image/png' })
      console.log('image', imageSrc, file)
      setImgSrc(imageSrc);
      setModalOpen(false)
    }, [webcamRef, setImgSrc]);

    const handleFileChange = (e: any) => {
        const file = e.target.files[0]
        console.log({file})
    }
  
    return (
      <>
        {modalOpen ? (
        <>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <button onClick={capture}>Capture photo</button>
            {imgSrc && (
            <Image
                src={imgSrc}
                width={640}
                height={480}
                alt="Picture of the user"
            />
            )}
        </>
        )
        : 
        <>
        <div onClick={() => setModalOpen(true)} className='mt-12 flex items-center justify-center gap-2 bg-primary p-4 pl-5 pr-6 text-sm text-white rounded-md w-full font-bold'>
        Scan
      </div>
      {/* <input type="file" onChange={handleFileChange} /> */}
      </>
    }
      </>
    );
  };
  
export default WebcamCapture;
  
  