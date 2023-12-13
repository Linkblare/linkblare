/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import { api } from '@/trpc/react'
import React from 'react'
import Slider, { type Settings } from 'react-slick'
import CollectionCard from './CollectionCard'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'

type RelatedCollectionProps = {
    collectionId: number,
}


const RelatedCollection = ({
    collectionId
}: RelatedCollectionProps) => {
    const { data, isLoading } = api.collection.relatedCollections.useQuery({ collectionId });
    const {data:collection} = api.collection.getById.useQuery({ id:collectionId });
    const router = useRouter();
    const sliderSetting: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        initialSlide: 0,
        slidesToShow: (data && data.items.length < 2) ? 1 : 4,
        slidesToScroll: (data && data.items.length < 2) ? 1 : 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
        swipeToSlide: true
    }

    if (data?.items.length === 0) {
        return <div></div>
    }

    return (
        <section className=' space-y-5'>
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold max-w-[60%]'>Related Collections</h2>
                {
                    collection && <Link className={buttonVariants({variant: 'outline'})} href={{pathname: '/', query: {tag: collection.tags.map(tg => tg.name)}}}>All</Link>
                }
            </div>
            <Slider
                {...sliderSetting}
            >
                {
                    !data && isLoading && Array(4).fill(0).map((_, i) =>
                        <div key={i} className='w-full h-full'>
                            <CollectionCard.Skeleton />
                        </div>
                    )
                }
                {data?.items.map((item) => (
                    <div key={item.id} className='px-2 '>
                        <div className='px-2 cursor-pointer' onClick={() => router.push(`/${item.slug}`)}> <CollectionCard collection={item} mode="sort" /></div>
                    </div>
                ))}
            </Slider>
        </section>
    )
}

export default RelatedCollection