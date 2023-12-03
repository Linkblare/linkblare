import DefaultNav from '@/components/DefaultNav';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import PinnedWidget from '@/components/PinnedWidget';
import React, { type PropsWithChildren } from 'react'

const Layout = ({children}: PropsWithChildren) => {
  return (
    <>
    <DefaultNav/>
    <main className='mb-28'>
        {children}
    </main>
    <MobileNav/>
    <PinnedWidget/>
    {/* <Footer/> */}
    </>
  )
}

export default Layout