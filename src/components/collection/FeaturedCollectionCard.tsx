import React from 'react'
import { CardDescription, CardTitle } from '../ui/card'
import { type CollectionOut } from '@/schema/collection-schema'
import ThumbnailGrid from './ThumbnialGrid'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const FeaturedCollectionCard = ({
    collection
}: {
    collection: CollectionOut
}) => {

    return (
        <div className='rounded-2xl border bg-card' >
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                <div className='rounded-xl overflow-hidden aspect-[4/2.5]'>
                    {
                        collection.itemsImages.length > 0 ?
                            <ThumbnailGrid itemImages={collection.itemsImages} />
                            : <div className='w-full h-full relative'>
                                <Image className='w-full h-auto' fill objectFit='cover' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' src={collection.thumbnail ?? ''} alt='' />
                            </div>
                    }
                </div>

                <div className='p-2 sm:p-5 space-y-3'>
                    <CardTitle>{collection.title}</CardTitle>
                    <CardDescription className='hidden sm:block max-w-md'>{collection.description}</CardDescription>
                </div>
            </div>
        </div>
    )
}

export default FeaturedCollectionCard