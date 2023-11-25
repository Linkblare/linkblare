/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'

/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type ImageSlideContent, type LinkContent, type PdfContent, type SingleItemOut } from '@/schema/item-schema'
import React from 'react'
import { CardTitle } from '../ui/card'
import { dateFromNow } from '@/lib/utils'
import { ExternalLinkIcon, File, GalleryHorizontalEnd } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Skeleton } from '../ui/skeleton'
import ActionButton from '../action/ActionButton'
import InfoDialog from '../InfoDialog'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'


const LinkItemRenderer = dynamic(() => import('./item-renderer/LinkItemRenderer'), {
    loading: () => <p>Loading...</p>,
})
const PdfItemRenderer = dynamic(() => import('./item-renderer/PdfItemRenderer'), {
    loading: () => <p>Loading...</p>,
})
const ImageSlideItemRender = dynamic(() => import('./item-renderer/ImageSlideItemRenderer'), {
    loading: () => <p>Loading...</p>,
})


const ItemCard = ({
    item
}: {
    item: SingleItemOut
}) => {

    const router = useRouter();

    return (
        <div className='max-w-full md:max-w-md mrounded-xl border'>
            <div className='min-h-[80px] p-3 space-y-1'>
                <CardTitle className='line-clamp-2'>{item.title}</CardTitle>
                <div className='flex items-center text-muted-foreground text-xs space-x-1'>
                    <span className='text-muted-foreground'>{dateFromNow(item.createdAt)}</span>
                    <span>|</span>
                    {
                        item.type === 'image_slide' ?
                            <div className='flex items-center gap-2'>
                                <span>Image Slide</span>
                                <GalleryHorizontalEnd className='w-3 h-3 text-muted-foreground' />
                            </div>

                            : item.type === 'link' ?
                                <div className='flex items-center gap-2'>
                                    <Link target='_blank' rel={'no-follow'} href={item.content.originUrl}>{new URL(item.content.originUrl as string).hostname}</Link>
                                    <ExternalLinkIcon className='w-3 h-3 text-muted-foreground' />
                                </div>

                                : <div className='flex items-center gap-1'>
                                    <span>Pdf</span>
                                    <File className='w-3 h-3 text-muted-foreground' />
                                </div>
                    }
                </div>
            </div>

            <Link href={`/items/${item.slug}`}  className='aspect-square relative block' >
                {
                    item.type === 'image_slide' ?
                        <ImageSlideItemRender thumbnail={item.thumbnail} content={item.content as ImageSlideContent} />
                        : item.type === 'link' ?
                            <LinkItemRenderer thumbnail={item.thumbnail} content={item.content as LinkContent} />
                            : item.type === 'pdf' ?
                                <PdfItemRenderer thumbnail={item.thumbnail} content={item.content as PdfContent} />
                                : <Image src={item.thumbnail ?? ''} fill={true} objectFit="cover" alt={item.title} />
                }
            </Link>

            <div>
                <div className='flex items-center justify-between text-muted-foreground text-xs p-2'>
                    <span>{item._count.likes}</span>
                </div>
                <div className='flex items-center justify-between border-t '>
                    <ActionButton entityId={item.id} action='item_like_toggle' defaultState={item.liked} />
                    <InfoDialog>
                        {item.description}
                    </InfoDialog>

                </div>
            </div>
        </div>
    )
}

ItemCard.Skeleton = () => {
    return (
        <div className='max-w-xl'>
            <div className='py-2 space-y-1'>
                <Skeleton className='w-full h-[20px]' />
                <Skeleton className='w-1/2 h-[20px]' />
            </div>
            <Skeleton className='aspect-square my-3'></Skeleton>

            <div className='flex items-center justify-between'>
                <Skeleton className='w-[50px] h-[30px]' />
                <Skeleton className='w-[50px] h-[30px]' />
                <Skeleton className='w-[50px] h-[30px]' />
            </div>
        </div>
    )
}


export default ItemCard