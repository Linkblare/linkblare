import DefaultNav from '@/components/DefaultNav';
import { getServerAuthSession } from '@/server/auth'
import React, { PropsWithChildren } from 'react'

const Layout =  ({children}: PropsWithChildren) => {
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