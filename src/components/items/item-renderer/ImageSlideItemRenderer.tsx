'use client'
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { nanoid } from 'nanoid'
import Image from 'next/image'
import React, {useRef} from 'react'
import Slider, { type Settings } from 'react-slick'
import { ChevronLeft, ChevronRightIcon, EyeIcon, Fullscreen } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { type ImageSlideContent } from '@/schema/item-schema'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const ImageSlideItemRender = ({
  thumbnail,
  content
}: {
  thumbnail?: string | null,
  content: ImageSlideContent
}) => {
 

  const sliderRef = useRef<Slider>(null);
  const settings: Settings = {
    lazyLoad: 'ondemand',
    fade: true
  }


  return (

    <div className='bg-muted h-full relative overflow-hidden'>

      
        <Slider {...settings} className='flex items-center' ref={sliderRef}>
          {
            content.slides.map((image, index) => {
              return (
                <div key={nanoid()} className='h-full' >
                  <div className='relative flex items-center bg-muted aspect-square '>
                    <Image src={image} alt={nanoid()} width={500} height={500} />
                    <Link className={cn(['absolute top-5 right-5 ', buttonVariants({variant: 'ghost', size: 'icon'})])} href={image} target='_blank' onClick={(e) => {e.stopPropagation()}}>
                      <Fullscreen/>
                    </Link>
                  </div>
                </div>
              )
            })
          }
        </Slider>
   


      <Button onClick={(e) => { e.stopPropagation(); sliderRef.current?.slickNext() }} variant={'secondary'} className='absolute top-1/2 right-0 p-1' ><ChevronRightIcon className='w-4 h-4' /></Button>
      <Button onClick={(e) => { e.stopPropagation(); sliderRef.current?.slickPrev() }} variant={'secondary'} className='absolute top-1/2 left-0 p-1' ><ChevronLeft className='w-4 h-4' /></Button>


      {/* {isViewerOpen && (
        <ImageViewer
          src={content.slides}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )} */}



    </div>

  )
}

export default ImageSlideItemRender