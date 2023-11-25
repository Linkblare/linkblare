/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/display-name */
import { CollectionItemImage, CollectionOut } from '@/schema/collection-schema'
import React from 'react'
import { Skeleton } from '../ui/skeleton'
import Image from 'next/image'
import { CardTitle } from '../ui/card'
import { dateFromNow } from '@/lib/utils'
import ActionButton from '../action/ActionButton'
import InfoDialog from '../InfoDialog'
import Link from 'next/link'
import { Separator } from '../ui/separator'
import { nanoid } from 'nanoid'

type CollectionCardProps = {
  collection: CollectionOut
}

const CollectionThumbnailGrid = ({ itemImages }: { itemImages: CollectionItemImage[] }) => {

  const CollectionThumbnailGridImage = ({ src }: { src: string }) => {
    return <Image className='w-full h-auto' fill objectFit='cover' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' src={src} alt='' />
  }

  if (itemImages.length === 2 || itemImages.length === 4) {
    return (
      <div className='grid grid-cols-2 gap-1 h-full'>
        {
          itemImages.map(item => (
            <div className='w-full h-full relative' key={nanoid()}>
              <CollectionThumbnailGridImage src={item?.thumbnail ?? ''} />
            </div>
          ))
        }
      </div>
    )
  }
  if (itemImages.length === 3) {
    return (
      <div className='grid grid-cols-2 grid-rows-2 gap-1 h-full relative'>
        <div className='relative' >
          <CollectionThumbnailGridImage src={itemImages[0]?.thumbnail ?? ''} />
        </div >
        <div className="col-span-2 col-start-1 row-start-2 relative">
          <CollectionThumbnailGridImage src={itemImages[1]?.thumbnail ?? ''} />
        </div>
        <div className="col-start-2 row-start-1 relative">
          <CollectionThumbnailGridImage src={itemImages[2]?.thumbnail ?? ''} />
        </div>

      </div>
    )
  }

  if (itemImages.length === 5) {
    return (
      <div className="grid grid-cols-5 grid-rows-3 gap-1 h-full relative">
        <div className="col-span-5 row-span-2 relative"><CollectionThumbnailGridImage src={itemImages[0]?.thumbnail ?? ''} /></div>
        <div className="row-start-3 relative"><CollectionThumbnailGridImage src={itemImages[1]?.thumbnail ?? ''} /></div>
        <div className="row-start-3 relative"><CollectionThumbnailGridImage src={itemImages[2]?.thumbnail ?? ''} /></div>
        <div className="row-start-3 relative"><CollectionThumbnailGridImage src={itemImages[3]?.thumbnail ?? ''} /></div>
        <div className="row-start-3 relative"><CollectionThumbnailGridImage src={itemImages[4]?.thumbnail ?? ''} /></div>
      </div>
    )
  }



  return (
    <div className='w-full h-full relative'>
      <CollectionThumbnailGridImage src={itemImages[0]?.thumbnail ?? ''} />
    </div>
  )
}

const CollectionCard = ({
  collection
}: CollectionCardProps) => {

  return (
    <div className='rounded-xl overflow-hidden bg-card max-w-full md:max-w-sm border '>
      <div className='rounded-xl overflow-hidden aspect-[4/2.5]'>
        {
          collection.itemsImages.length > 0 ?
            <CollectionThumbnailGrid itemImages={collection.itemsImages} />
            : <div className='w-full h-full relative'>
              <Image className='w-full h-auto' fill objectFit='cover' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' src={collection.thumbnail ?? ''} alt='' />
            </div>
        }
      </div>

      <div className='p-3 h-16'>
        <Link href={`/${collection.slug}`}><CardTitle className='line-clamp-2'>{collection.title}</CardTitle></Link>
        <span className='text-muted-foreground text-xs'>
          {dateFromNow(collection.createdAt)}
        </span>
      </div>

      <div className='flex items-center justify-between py-1 px-2'>
        <ActionButton action={'collection_like_toggle'} entityId={collection.id} defaultState={collection.liked} />
        <ActionButton action={'collection_save_toggle'} entityId={collection.id} defaultState={collection.saved} />
        <InfoDialog>
          <p>{collection.description}</p>
          <Separator />
          <div className='flex gap-3 flex-wrap'>
            {
              collection.tags.map(tag => <span key={nanoid()}>#{tag.name}</span>)
            }
          </div>
        </InfoDialog>
      </div>
    </div>
  )
}

CollectionCard.Skeleton = () => {
  return (
    <div className='max-w-full md:max-w-xs'>
      <Skeleton className='aspect-[1.4/.8] '></Skeleton>
      <div className='py-2 space-y-1'>
        <Skeleton className='w-full h-[20px]' />
        <Skeleton className='w-1/2 h-[20px]' />
      </div>

      <div className='flex items-center justify-between'>
        <Skeleton className='w-[50px] h-[30px]' />
        <Skeleton className='w-[50px] h-[30px]' />
        <Skeleton className='w-[50px] h-[30px]' />
      </div>
    </div>
  )
}


export default CollectionCard
