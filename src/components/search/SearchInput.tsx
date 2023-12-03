'use client'

import { useDebounce } from '@uidotdev/usehooks';
import React, { useState } from 'react'
import { Command, CommandGroup, CommandItem, CommandEmpty, CommandInput, CommandList } from '../ui/command';
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import { api } from '@/trpc/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const SearchInput = ({
    onChange,
    value
}: {
    onChange?: (value: string) => void;
    value?: string;
}) => {
    const [search, setSearch] = useState<string>();
    const debounceSearch = useDebounce(search, 500);
    const { data } = api.collection.inifintSearch.useInfiniteQuery({ search: debounceSearch });
    const router = useRouter()
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={'outline'}>
                        <span className='hidden lg:block'>Search Collection, items or tag</span>
                        <span className=' lg:hidden'>Search...</span>
                        </Button>
                </DialogTrigger>

                <DialogContent>
                    <div className='max-w-2xl max-h-96'>
                        <Command>
                            <CommandInput
                                placeholder="Search..."
                                value={search}
                                onValueChange={(e) => setSearch(e)}
                            />

                            <CommandList>
                                <CommandEmpty>No Collection, items or tags found</CommandEmpty>
                                <CommandGroup heading="Collections">
                                    {
                                        data?.pages.map(page => page.items.map(collection => (
                                            <CommandItem
                                                key={collection.id}
                                                value={collection.slug??''}
                                            >
                                                <Link href={`/${collection.slug}`} className='w-full'>{collection.title}</Link>
                                            </CommandItem>
                                        )))
                                    }
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default SearchInput