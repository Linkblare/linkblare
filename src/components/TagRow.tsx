/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client'

import { api } from '@/trpc/react';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { appendQueryInSearchParams, cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';
import { X } from 'lucide-react';
import { type Tag } from '@prisma/client';

const TagRowItem = (props: { name: string }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname()
    return <Link
        href={`${pathname}?${appendQueryInSearchParams(searchParams.toString(), { key: 'tag', value: props.name.toLowerCase() }, true)}`}
        replace={false}
    > <Button className='capitalize' size={'sm'} variant={searchParams.has('tag', props.name) ? 'default' : 'outline'} >{props.name}</Button>
    </Link>
}

const TagRow = (props: { userId?: string }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const { data: allTags, isLoading } = api.tags.infintList.useInfiniteQuery({take: 500}, {
        getNextPageParam: page => page.nextCursor,
    });
    const tags = allTags?.pages.reduce((acc, page) => {
        return [...acc, ...page.items]
    }, [] as Tag[])


    const removeAllTagsFromUrl = () => {
        const sp = new URLSearchParams(searchParams.toString());
        sp.delete('tag');
        void router.push(`${pathname}${sp.size > 0 ? `?${sp.toString()}` : ''}`)
    }

    return (
        <div className='top-0 left-0 z-20 bg-card sticky flex gap-2 w-full '>
            <div className='flex items-center gap-2 overflow-x-auto py-1 pr-7'>
                {
                    tags?.map(item => {
                        return (
                            <TagRowItem key={nanoid()} name={item.name} />
                        )
                    })
                }

            </div>

            <Button
                className={cn([
                    'absolute top-1 right-0 p-1',
                    { 'hidden': !searchParams.get('tag') }
                ])}
                size={'sm'}
                onClick={removeAllTagsFromUrl}
            ><X className='w-4 h-4' /></Button>

            {
                isLoading && <div className=' flex items-center relative gap-2 overflow-x-auto py-1 '>
                    {
                        Array(5).fill(0).map(() => (<Skeleton className='py-4 px-7 rounded-xl' key={nanoid()}></Skeleton>))
                    }
                </div>
            }
        </div>
    )
}

export default TagRow