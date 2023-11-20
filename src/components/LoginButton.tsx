'use client'

import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { LogIn } from 'lucide-react'
import { signIn } from 'next-auth/react'

const LoginButton = () => {

    return <Button onClick={() => signIn()} className='space-x-2'><LogIn className='w-4 h-4'/> <span>Login</span></Button>
}

export default LoginButton