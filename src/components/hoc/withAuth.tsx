/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React, { type ReactNode } from 'react'

const withAuth = (Component: any, options: {redirectTo?: string, fallback?: ReactNode} = {redirectTo: '/'}) => {
  return function IsAuth(props: any){
    const {data:session, status} = useSession();

    if(!session && status === 'unauthenticated'){
        if(options.fallback){
            return <>{options.fallback}</>
        }else{
            return redirect(options.redirectTo??'/')
        }
    }
    return <Component {...props} />
  }
}

export default withAuth