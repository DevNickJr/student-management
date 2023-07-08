import NextAuth, { NextAuthOptions  } from "next-auth";
import { authOptions } from "@/configs/authOptions";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { NextApiRequest, NextApiResponse } from 'next';
// import { apiLogin } from '@/services/AuthService'

const handler = NextAuth(authOptions);

export {
    handler as GET,
    handler as POST
}