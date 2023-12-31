'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { Bookmark, CompassIcon, SearchIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import UserAvatarDropdown from './UserAvatarDropdown'
import { useSession } from 'next-auth/react'
import SearchInput from './search/SearchInput'

const MobileNav = () => {
    const pathname = usePathname();
    const isActive = (url: string) => (pathname === url ? true : false)
    const { data: Session } = useSession();
    return (
        <div className='fixed bottom-0 left-0 w-full px-3 py-1 bg-card/20 backdrop-blur-lg flex items-center justify-between lg:hidden'>
            {/* <Link
                href={'/for-you'}
                className={cn([
                    buttonVariants({
                        variant: isActive('/for-you') ? 'default' : 'ghost',
                    })
                ])}
            >
                <HomeIcon />
            </Link> */}
            <Link
                href={'/'}
                className={cn([
                    buttonVariants({
                        variant: isActive('/') ? 'default' : 'ghost',
                    })
                ])}
            >
                <CompassIcon />
            </Link>
            <SearchInput
                triggre={<Button variant={'ghost'}><SearchIcon /></Button>}
            />
            <Link
                href={'/saved'}
                className={cn([
                    buttonVariants({
                        variant: isActive('/saved') ? 'default' : 'ghost',
                    })
                ])}
            >
                <Bookmark />
            </Link>
            <div className={cn([
                { 'hidden': !Session }
            ])}><UserAvatarDropdown /></div>
        </div>
    )
}

export default MobileNav