'use client'
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react"
import { Blocks } from 'react-loader-spinner'

// import Loader from "../Loader";



export default function AuthHOC(
  ProtectedComponent: React.FC<any>,
) {
  //
  return function AuthComp(props: any) {

    const session = useSession()
    const router = useRouter();

    console.log("session", session)

    if (session.status === "loading") {
      return (
        <div className='w-screen h-screen flex justify-center items-center'>
          <Blocks
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
          />
        </div>
      );
    }

    if (!session.data) {
      signIn()
      return null;
    }

    return <ProtectedComponent user={session} {...props} />;
  };
}