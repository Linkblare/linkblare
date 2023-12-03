'use client'

import { api } from '@/trpc/react'
import React from 'react'
import Slider, { Settings } from 'react-slick'
import CollectionCard from './CollectionCard'

type RelatedCollectionProps = {
    collectionId: number
}

const sliderSetting: Settings = {

    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
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
    swipeToSlide: true,
    draggable: true,
    touchMove: true
    //         touchThreshold={100}
    // swipe={true}
    //         swipeToSlide={true}
    //         draggable={true}
}

const RelatedCollection = ({
    collectionId
}: RelatedCollectionProps) => {
    const { data, isLoading } =  api.collection.relatedCollections.useQuery({ collectionId })


    if (data?.items.length === 0) {
        return <div></div>
    }

    return (
        <section className='container mx-auto '> 
            <h2 className='text-2xl font-bold'>Related Collections</h2>
            <Slider
                {...sliderSetting}
                className='w-full h-full'
            >
                {
                    !data && isLoading && Array(4).fill(0).map((_, i) =>
                        <div key={i} className='w-full h-full'>
                            <CollectionCard.Skeleton />
                        </div>
                    )
                }
                {data?.items.map((item) => (
                    <div key={item.id} className='w-full h-full'>
                        <CollectionCard collection={item} />
                    </div>
                ))}
            </Slider>
        </section>
    )
}

export default RelatedCollection