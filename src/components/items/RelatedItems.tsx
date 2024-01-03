/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { api } from '@/trpc/react'
import React from 'react'
import ItemCard from './ItemCard'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { nanoid } from 'nanoid'
import Autoplay from "embla-carousel-autoplay"


type RelatedItemsProps = {
    itemId: number
}

const RelatedItems = ({
    itemId
}: RelatedItemsProps) => {
    const { data, isLoading } = api.items.relatedItems.useQuery({ id: itemId })

    if (data?.items.length === 0) {
        return <div></div>
    }

    return (
        <section className='max-w-[1200px] w-full mx-auto space-y-5 px-4'>
            <h2 className='text-2xl font-bold'>Related Items</h2>
            <Carousel 
            opts={{
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 2000
                })
            ]}
            >
                <CarouselContent>
                    {
                        !data && isLoading && Array(4).fill(0).map((_, i) =>
                            <CarouselItem className='sm:basis-1/2  lg:basis-1/3' key={nanoid()}>
                                <div key={i} className='w-full h-full '>
                                    <ItemCard.Skeleton />
                                </div>
                            </CarouselItem>
                        )
                    }
                    {data?.items.map((item) => (
                        <CarouselItem className='sm:basis-1/2 lg:basis-1/3' key={nanoid()}>
                            <div className='px-2'>
                                <ItemCard item={item as any} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    )
}

export default RelatedItems