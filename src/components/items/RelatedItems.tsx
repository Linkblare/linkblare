/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { api } from '@/trpc/react'
import React from 'react'
import Slider, { Settings } from 'react-slick'
import ItemCard from './ItemCard'

const sliderSetting: Settings = {

    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
    touchMove: true,
    centerMode: false
    //         touchThreshold={100}
    // swipe={true}
    //         swipeToSlide={true}
    //         draggable={true}
}


type RelatedItemsProps = {
    itemId: number
}

const RelatedItems = ({
    itemId
}: RelatedItemsProps) => {
    const { data, isLoading } =  api.items.relatedItems.useQuery({ id: itemId })

    if (data?.items.length === 0) {
        return <div></div>
    }

    return (
        <section className='container mx-auto space-y-5'> 
            <h2 className='text-2xl font-bold'>Related Items</h2>
            <Slider
                {...sliderSetting}
                className='w-full h-full'
            >
                {
                    !data && isLoading && Array(4).fill(0).map((_, i) =>
                        <div key={i} className='w-full h-full '>
                            <ItemCard.Skeleton />
                        </div>
                    )
                }
                {data?.items.map((item) => (
                    <div key={item.id} className='px-2'>
                        <ItemCard item={item as any} />
                    </div>
                ))}
            </Slider>
        </section>
    )
}

export default RelatedItems