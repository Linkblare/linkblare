'use client'

import { appendQueryInSearchParams } from '@/lib/utils';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button';

const QueryTag = ({
    queryKey,
    value,
    defaultActive,
    toggleMode = true,
    singleMode = false,
    lable,
    onClick
}: {
    queryKey: string,
    value: string,
    lable: string,
    defaultActive?: boolean,
    toggleMode?: boolean,
    singleMode?: boolean,
    onClick?: () => void
}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    return (
        <Link
            key={nanoid()}
            href={`${pathname}?${appendQueryInSearchParams(searchParams.toString(), { key: queryKey, value }, toggleMode, singleMode)}`}
            replace={true}
            onClick={onClick}
        >
            <Button className='capitalize' size={'sm'} variant={(searchParams.has(queryKey, value) || defaultActive) ? 'default' : 'outline'} >{lable}</Button>
        </Link>
    )
}

export default QueryTag