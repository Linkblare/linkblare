import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import QueryTags from '../query-tag/QueryTags'
import { cn } from '@/lib/utils'
import CollectionTagsCloud from '../collection/CollectionTagsCloud'
import SortArray from '../SortArray'
import { itemSortInputs } from '@/hooks/useItemSort'

const ItemFilter = ({
    categoryTags,
    className,
    collectionId
}: {
    categoryTags: {lable: string, value: string}[],
    className?: string,
    collectionId: number
}) => {
    return (
        <div className={cn(['rounded-2xl border p-2 grid grid-cols-3  gap-3 lg:items-center lg:gap-5 max-w-[1200px] mx-auto items-center justify-items-center', className])}>
            <div className='space-y-2 w-full'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className='w-full ' variant={'secondary'}>Category</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='bg-card/30 backdrop-blur'>
                        <div className=' w-[85vw] md:w-80 lg:w-80 max-w-md'>
                        {
                            categoryTags.length <= 0 ?
                            <p className='text-center text-sm'>No Categories Found</p>
                            : 
                            <QueryTags
                            className='justify-start max-h-56 p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-primary'
                            queryKey='tag'
                            boxMode="container"
                            removable
                            queryInputs={categoryTags.map(it => ({
                                value: it.value,
                                lable: it.value,
                                toggleMode: true,
                                singleMode: false,
                            })) ?? []}
                        />
                        }
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className='space-y-2 w-full'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className='w-full' variant={'secondary'}>Tags</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='bg-card/30 backdrop-blur'>
                        <div className=' w-[85vw] md:w-80 lg:w-80 max-w-md'>
                        <CollectionTagsCloud collectionId={collectionId} />
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className='space-y-2 flex-1 w-full'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className='w-full' variant={'secondary'}>Sort By</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='bg-card/30 backdrop-blur'>
                        <div className='w-[85vw] md:w-80 lg:w-80 max-w-md '>
                        <SortArray inputs={itemSortInputs} className='flex-wrap'/>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default ItemFilter