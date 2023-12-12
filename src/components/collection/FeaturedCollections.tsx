import { api } from '@/trpc/server'
import React from 'react'
import FeaturedCollectionCard from './FeaturedCollectionCard';
import { Separator } from '../ui/separator';

const FeaturedCollections = async () => {
    const featuredCollections = await api.collection.inifintList.query({ filter: { featured: true } });

    if (featuredCollections.items.length <= 0) {
        return <div></div>
    }

    return (
        <div className='pb-10'>
            <div>
                <h2 className='text-xl md:text-4xl font-bold'>Fetured Collections</h2>
            </div>
            <div className=' mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-center justify-items-center justify-center'>
                {
                    featuredCollections.items.map(it => (
                        <div key={it.id} className='w-full h-full'>
                            <FeaturedCollectionCard collection={it} />
                        </div>
                    ))
                }
            </div>

            <Separator className='mt-10' />
        </div>
    )
}

export default FeaturedCollections