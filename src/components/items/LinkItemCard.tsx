import { ItemOut, LinkContent } from '@/schema/item-schema'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CardTitle } from '../ui/card'

const LinkItemCard = ({
    item
}: {
    item: ItemOut<LinkContent>
}) => {
    return (
        <div className='bg-card border rounded-2xl overflow-hidden'>
            <div className='rounded-2xl overflow-hidden aspect-[16/9] relative'>
                <Image src={item.thumbnail ?? ''} alt={item.title} layout='fill' objectFit='cover' sizes='100vw' />
            </div>

            <div className='p-4'>
                <Link className='block' href={`/item/${item.slug}`}>
                    <CardTitle>{item.title}</CardTitle>
                </Link>
            </div>
        </div>
    )
}

export default LinkItemCard