'use client'

import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import QueryTag from './QueryTag'
import { nanoid } from 'nanoid'
import { Skeleton } from '../ui/skeleton'

const QueryTags = ({
    queryKey,
    queryInputs,
    className,
    boxMode,
    removable,
    closeButtonOptions,
    loading,
    rowModeOnMobile,
    hasNext,
    fetchNext
}: {
    queryKey: string,
    queryInputs: {
        value: string,
        lable: string,
        defaultActive?: boolean,
        toggleMode?: boolean,
        singleMode?: boolean,
        onClick?: () => void
    }[],
    className?: string,
    boxMode?: 'row' | 'container',
    removable?: boolean,
    loading?: boolean,
    closeButtonOptions?: {
        className?: string
    },
    rowModeOnMobile?: boolean,
    hasNext?: boolean,
    fetchNext?: () => void
}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const removeAllTagsFromUrl = () => {
        const sp = new URLSearchParams(searchParams.toString());
        sp.delete('tag');
        void router.push(`${pathname}${sp.size > 0 ? `?${sp.toString()}` : ''}`)
    }

    const RemoveButton = <Button
        className={cn([
            'absolute top-1 right-1 p-1',
            { 'hidden': !searchParams.get(queryKey) },
            closeButtonOptions?.className
        ])}
        size={'sm'}
        onClick={removeAllTagsFromUrl}
    >
        <X className='w-4 h-4' />
    </Button>


        if(loading){
            return (
                <div className='flex items-center gap-2 flex-wrap'>
                    {
                        Array(5).fill(0).map(() => (<Skeleton className='py-4 px-7 rounded-xl' key={nanoid()}></Skeleton>))
                    }
                </div>
            )
        }

    return (
        <div
            className={cn([
                'flex items-center gap-2 relative p-5',
                { 'overflow-x-auto': boxMode === 'row'??rowModeOnMobile },
                { 'flex-wrap': boxMode === 'container' && !rowModeOnMobile },
                className
            ])}
        >

            {
                removable && RemoveButton
            }

            {
                queryInputs.map(input => <QueryTag key={nanoid()} queryKey={queryKey} {...input} />)
            }

            {
                hasNext ?? <Button className='capitalize' size={'sm'} onClick={fetchNext}>More</Button>
            }

        </div>
    )
}

export default QueryTags