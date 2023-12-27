/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type ImageSlideContent, type LinkContent, type PdfContent, type SingleItemOut } from '@/schema/item-schema'
import React from 'react'
import Image from 'next/image'
import ImageSlideItemRender from './item-renderer/ImageSlideItemRenderer'
import LinkItemRenderer from './item-renderer/LinkItemRenderer'
import PdfItemRenderer from './item-renderer/PdfItemRenderer'
import { CardDescription, CardTitle } from '../ui/card'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { ExternalLinkIcon } from 'lucide-react'
import ActionButton from '../action/ActionButton'
import ShareDropdown from '../utils/ShareDropdown'
import { env } from '@/env.mjs'


const SingleItemViewer = ({
    item
}: {
    item: SingleItemOut
}) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-5 w-full rounded-xl overflow-hidden border bg-card'>
            <div className='bg-gray-800 aspect-square md:col-span-3'>
                {
                    item.type === 'image_slide' ?
                        <ImageSlideItemRender thumbnail={item.thumbnail} content={item.content as ImageSlideContent} />
                        : item.type === 'link' ?
                            <LinkItemRenderer thumbnail={item.thumbnail} content={item.content as LinkContent} />
                            : item.type === 'pdf' ?
                                <PdfItemRenderer thumbnail={item.thumbnail} content={item.content as PdfContent} />
                                : <Image src={item.thumbnail ?? ''} fill={true} objectFit="cover" alt={item.title} />
                }
            </div>

            <div className=' md:col-start-4 md:col-end-6 p-5 relative pb-20'>
                <div className='flex items-center'>
                    <CardTitle className='flex-grow'>{item.title}</CardTitle>

                </div>

                {
                    item.shortDesc &&
                    <div className='pt-2'>
                        <CardDescription className='text-xs'>{item.shortDesc}</CardDescription>
                    </div>
                }
                <div className='pt-5'>
                    <CardDescription>{item.description}</CardDescription>
                </div>


                <div className='absolute bottom-0  left-0 w-full flex items-center justify-end px-5 gap-5 backdrop-blur border-t  bg-card/30 rounded-xl py-1'>
                    <ActionButton action='item_like_toggle' entityId={item.id} />

                    {
                        item.type === 'link'
                        &&
                        <Link
                            className={cn([buttonVariants({ variant: 'ghost', size: 'icon' })])}
                            href={item.content.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            title={item.content.url}
                        >
                            <ExternalLinkIcon className='w-4 h-4'
                            /></Link>
                    }

                    <ShareDropdown
                        title={item.title}
                        url={`${env.NEXT_PUBLIC_SITE_URL}/items/${item.slug}`}
                        image={item.thumbnail ?? ''}
                        description={item.description ?? ''}
                        tags={[...item.tags.map(tag => tag.name), 'linkblare']}
                    />
                </div>
            </div>
        </div>
    )
}

export default SingleItemViewer