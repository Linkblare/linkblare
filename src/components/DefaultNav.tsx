'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Logo from './Logo'
import UserAvatarDropdown from './UserAvatarDropdown'
import LoginButton from './LoginButton'
import { useSession } from 'next-auth/react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from './ui/navigation-menu'
import { cn } from '@/lib/utils'
import { nanoid } from 'nanoid'

const menus = [
    {
        lable: 'For You',
        href: '/'
    },

    {
        lable: 'Explore',
        href: '/explore'
    },

    {
        lable: 'Saved Collection',
        href: '/saved'
    },


]

const DefaultNav = () => {
    const pathName = usePathname();
    const {data:session} = useSession();

    return (
        <nav className='w-full py-2 px-5 flex items-center justify-between bg-card border-b'>
            <div className='flex items-center gap-5'>
                <Link href={'/'}><Logo /></Link>

                <div className='pr-5 hidden md:block'>
                    <NavigationMenu>
                        <NavigationMenuList>
                            {
                                menus.map(menu => (
                                    <NavigationMenuItem key={nanoid()}>
                                        <Link className={cn([
                                            navigationMenuTriggerStyle(),
                                            'text-muted-foreground',
                                            {'text-primary': pathName === menu.href}
                                        ])} href={menu.href}>{menu.lable}</Link>
                                    </NavigationMenuItem>
                                ))
                            }
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
            <div>
                {
                    session ? <UserAvatarDropdown /> : <LoginButton />
                }
            </div>
        </nav>
    )
}

export default DefaultNav