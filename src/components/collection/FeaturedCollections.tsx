'use client'

import React from 'react'
import FeaturedCollectionCard from './FeaturedCollectionCard';
import { Separator } from '../ui/separator';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import { nanoid } from 'nanoid';
import { api } from '@/trpc/react';

const FeaturedCollections = () => {
    const { data: featuredCollections, isLoading } = api.collection.inifintList.useQuery({ filter: { featured: true } });

    if (featuredCollections?.items?.length === 0) {
        return null;
    }

    return (
        <div className='pb-10'>
            <div>
                <h2 className='text-xl md:text-4xl font-bold'>Fetured Collections</h2>
            </div>
            <div className=' mt-5 '>
            

                <Carousel>
                    <CarouselContent>
                        {
                            !featuredCollections && isLoading && Array(4).fill(0).map((_, i) =>
                                <CarouselItem className='sm:basis-1/2  lg:basis-1/3' key={i}>
                                    <div className='w-full h-full'>
                                        <FeaturedCollectionCard.Skeleton />
                                    </div>
                                </CarouselItem>
                            )
                        }
                        {featuredCollections?.items.map((item) => (
                            <CarouselItem className='sm:basis-1/2  lg:basis-1/3' key={nanoid()}>
                                <div className='w-full h-full pr-5'>
                                    <FeaturedCollectionCard collection={item} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

            <Separator className='mt-10' />
        </div>
    )
}

export default FeaturedCollections