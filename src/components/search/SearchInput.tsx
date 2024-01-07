/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import { useDebounce } from '@uidotdev/usehooks';
import React, { ReactNode, useState } from 'react'
import { Command, CommandGroup, CommandItem, CommandEmpty, CommandInput, CommandList } from '../ui/command';
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import { api } from '@/trpc/react';
import { useRouter, useSearchParams } from 'next/navigation';
import QueryTags from '../query-tag/QueryTags';
import { Search } from '../ui/search-input';


const SearchInput = ({
    onChange,
    value,
    triggre
}: {
    onChange?: (value: string) => void;
    value?: string;
    triggre?: ReactNode
}) => {
    const searchParams = useSearchParams();
    const [open, setOpen] = useState<boolean>(false || searchParams.get('search') !== null)
    const [search, setSearch] = useState<string>(searchParams.get('search') ?? '');
    const debounceSearch = useDebounce(search, 500);
    const { data, isLoading } = api.search.getSearch.useQuery({
        search: debounceSearch,
    });
    const router = useRouter()
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {
                        triggre ??
                            <Button variant={'outline'}>
                                <span className='hidden lg:block'>Search Collection, items or tag</span>
                                <span className=' lg:hidden'>Search...</span>
                            </Button>
                    }
                </DialogTrigger>

                <DialogContent className='overflow-hidden'>
                    <div className='max-w-2xl max-h-96 mt-5 '>

                        <Search
                            placeholder='Search...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            prefix='search'
                        />


                        <div className='space-y-2 mt-4'>
                            <p className='text-xs' > Collection</p>
                            <div className='overflow-y-auto max-h-40 space-y-1'>
                                {
                                    data?.collections.map(collection => (
                                        <div
                                            className='w-full px-2 py-1 hover:border transition-all duration-200 cursor-pointer hover:bg-card rounded-md text-sm'
                                            key={collection.id}
                                            onClick={() => {
                                                router.push(`/${collection.slug}`)
                                                setOpen(false)
                                            }}
                                        >
                                            {collection.title}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className='space-y-2 mt-4'>
                            <p className='text-xs' >Items</p>
                            <div className='overflow-y-auto max-h-40 space-y-1'>
                                {
                                    data?.items.map(item => (
                                        <div
                                            className='w-full px-2 py-1 hover:border transition-all duration-200 cursor-pointer hover:bg-card rounded-md text-sm'
                                            key={item.id}
                                            onClick={() => {
                                                router.push(`/items/${item.slug}`)
                                                setOpen(false)
                                            }}
                                        >
                                            {item.title}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className='space-y-2 mt-4'>
                            <p className='text-xs'>Tags</p>
                            <QueryTags
                                className='justify-center max-h-56 overflow-y-auto mt-4 bg-card'
                                queryKey='tag'
                                boxMode="container"
                                queryInputs={data?.tags.map(it => ({
                                    value: it.name,
                                    lable: it.name,
                                    toggleMode: true,
                                    singleMode: true,
                                    onClick: () => {
                                        setOpen(false)
                                    }
                                })) ?? []}
                                loading={isLoading}
                            />
                        </div>

                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default SearchInput;