import AdminNav from '@/components/AdminNav';
import AdminSidebar from '@/components/AdminSidebar';
import { getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation';
import React, { PropsWithChildren } from 'react'

const Layout = async ({ children }: PropsWithChildren) => {
    const session = await getServerAuthSession();

    if (!session) {
        redirect('/')
    }

    return (
        <>
            <div className="flex items-center justify-center h-screen text-xl font-medium lg:hidden">
                <p className='px-4 text-center'>Admin Panel is not compatible with this size of screen</p>
            </div>
            <div className='h-screen lg:flex hidden'>
                <AdminSidebar />
                <div className='lg:ml-64  w-full'>
                    <AdminNav />
                    <div className="p-4">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout