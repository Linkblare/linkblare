

import { api } from '@/trpc/server'
import React from 'react'
import FeaturedCollectionCard from './FeaturedCollectionCard';
import { Separator } from '../ui/separator';
import { type Settings } from 'react-slick'
import Slider from '../Slider';

const FeaturedCollections = async () => {
    const featuredCollections = await api.collection.inifintList.query({ filter: { featured: true } });
    const sliderSetting: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        initialSlide: 0,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            
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

    if (featuredCollections.items.length <= 0) {
        return <div></div>
    }

    return (
        <div className='pb-10'>
            <div>
                <h2 className='text-xl md:text-4xl font-bold'>Fetured Collections</h2>
            </div>
            <div className=' mt-5 '>
                <Slider settings={sliderSetting}>
                {
                    featuredCollections.items.map(it => (
                        <div key={it.id} className='w-full h-full pr-5'>
                            <FeaturedCollectionCard collection={it} />
                        </div>
                    ))
                }
                </Slider>
            </div>

            <Separator className='mt-10' />
        </div>
    )
}

export default FeaturedCollections