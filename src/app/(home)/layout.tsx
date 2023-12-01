import DefaultNav from '@/components/DefaultNav';
import Footer from '@/components/Footer';
import React, { type PropsWithChildren } from 'react'

const Layout = ({children}: PropsWithChildren) => {
  return (
    <>
    <DefaultNav/>
    <main className='mb-28'>
        {children}
    </main>
    <Footer/>
    </>
  )
}

export default Layout