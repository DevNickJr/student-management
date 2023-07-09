import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      status: string
      token: {
        refresh: string, 
        access: string   
      },
      userDetails: {
        email: string,
        phone: string,
        first_name: string,
        middle_name: string | null,
        last_name: string,
        profile_picture_url: string,
        is_active: boolean,
        level: '100' | '200' | '300' | '400' | '500' | '600' | '700',
        matric_no: string,
        is_verified: boolean,
        is_staff: boolean,
      }
    }
  }

  interface User {
    /** The user's object. */
      status: string
      token: {
        refresh: string, 
        access: string   
      },
      userDetails: {
        email: string,
        phone: string,
        first_name: string,
        middle_name: string | null,
        last_name: string,
        profile_picture_url: string,
        is_active: boolean,
        level: '100' | '200' | '300' | '400' | '500' | '600' | '700',
        matric_no: string,
        is_verified: boolean,
        is_staff: boolean,
      }
  }
}