import { CollectionItemImage } from '@/schema/collection-schema'
import { nanoid } from 'nanoid'
import Image from 'next/image'


const ThumbnailGrid = ({ itemImages }: { itemImages: CollectionItemImage[] }) => {

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
        <div className="grid grid-cols-4 grid-rows-3 gap-1 h-full relative">
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


  export default ThumbnailGrid;