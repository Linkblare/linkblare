/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import { api } from '@/trpc/react'
import React from 'react'
import CollectionCard from './CollectionCard'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { Separator } from '@/components/ui/separator'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'

type RelatedCollectionProps = {
    collectionId: number,
}


const RelatedCollection = ({
    collectionId
}: RelatedCollectionProps) => {
    const { data, isLoading } = api.collection.relatedCollections.useQuery({ collectionId });
    const { data: collection } = api.collection.getById.useQuery({ id: collectionId });
    const router = useRouter();
    

    if (data?.items.length === 0) {
        return <div></div>
    }

    return (
        <section className=' space-y-5 max-w-[1200px] mx-auto'>
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold max-w-[60%]'>Related Collections</h2>
                {
                    collection && <Link className={buttonVariants({ variant: 'outline' })} href={{ pathname: '/', query: { tag: collection.tags.map(tg => tg.name) } }}>All</Link>
                }
            </div>
            <Carousel>
                <CarouselContent>
                    {
                        !data && isLoading && Array(4).fill(0).map((_, i) =>
                            <CarouselItem className='sm:basis-1/2  lg:basis-1/3' key={i}>
                                <div className='w-full h-full'>
                                    <CollectionCard.Skeleton />
                                </div>
                            </CarouselItem>
                        )
                    }
                    {data?.items.map((item) => (
                        <CarouselItem className='sm:basis-1/2  lg:basis-1/3' key={item.id}>
                            <div className='px-2 '>
                                <div className='px-2 cursor-pointer' onClick={() => router.push(`/${item.slug}`)}> <CollectionCard collection={item} mode="sort" /></div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <Separator className='my-10' />
        </section>
    )
}

export default RelatedCollection