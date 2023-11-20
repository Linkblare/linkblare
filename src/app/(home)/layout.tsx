import DefaultNav from '@/components/DefaultNav';
import LoginButton from '@/components/LoginButton';
import Logo from '@/components/Logo';
import UserAvatarDropdown from '@/components/UserAvatarDropdown';
import { getServerAuthSession } from '@/server/auth'
import Link from 'next/link';
import React, { PropsWithChildren } from 'react'

const Layout = async ({children}: PropsWithChildren) => {
    const session = await getServerAuthSession();
  return (
    <>
    <DefaultNav/>
    <main>
        {children}
    </main>
    </>
  )
}

export default Layout