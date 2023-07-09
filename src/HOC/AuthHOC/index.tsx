'use client'
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react"
// import Loader from "../Loader";



export default function AuthHOC(
  ProtectedComponent: React.FC<any>,
) {
  //
  return function AuthComp(props: any) {

    const session = useSession()
    const router = useRouter();

    // console.log("session", session)

    if (session.status === "loading") {
      return (
        <>  
          Loading...
        </>
      );
    }

    if (!session.data) {
      signIn()
      return null;
    }

    return <ProtectedComponent user={session} {...props} />;
  };
}