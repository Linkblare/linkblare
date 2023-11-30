'use client'

import React from 'react'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { Button } from './ui/button'
import { nanoid } from 'nanoid'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'


type SortItem = {
    lable: string,
    sortBy: string
}

type SortSwitcheGroupProps = {
    items: SortItem[]
}

const SortSwitcheGroup = ({
    items
}: SortSwitcheGroupProps) => {

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const mergeParams = (key: string, value: string) => {
        const params: Record<string, string> = {sortBy: key, order: value}
        searchParams.forEach((value, key) => {
            params[key] = value;
        })
        return params;
    }

    const isActive = (key: string, value: string) => {
        return searchParams.has('sortBy')
    }


    return (
        <div className='flex items-center py-2'>
            {/* {
                items.map(it => {
                    return (
                        <Link key={nanoid()} href={{ pathname, query: mergeParams(it.queryKey, it.queryValue) }} >
                            <Button size="sm" variant={searchParams.has(it.queryKey) ? 'default' : 'secondary'} >{it.lable}</Button>
                        </Link>
                    )
                })
            } */}
        </div>
    )
}

export default SortSwitcheGroup