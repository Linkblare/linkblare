/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { PropsWithChildren, ReactElement } from "react";

const SidebarLink = ({
    link,
    icon,
    children
}: PropsWithChildren<{
    link: string,
    icon?: ReactElement
}>) => {
    const router = usePathname();
    const checkActive = () => {
        return router === link
    }
    return (
        <Link href={link} className={cn([
            'text-base hover:text-secondary-foreground font-normal rounded-lg flex items-center p-2 hover:bg-secondary group',
            { 'bg-secondary': checkActive() }
        ])}>
            {
                icon
                &&
                React.cloneElement(icon, {
                    className: cn(['w-6 h-6 text-secondary group-hover:text-primary transition duration-75',{ 'text-primary': checkActive() }, icon.props?.className])
                })
            }
            <span className="ml-3">{children}</span>
        </Link>
    )
}

export default SidebarLink;