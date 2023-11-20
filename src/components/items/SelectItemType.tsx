import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { File, GalleryHorizontal, Link2 } from 'lucide-react'
import { nanoid } from 'nanoid'
import Link from 'next/link'
import React, { ReactNode } from 'react'


const SelectItemCard = ({
    icon,
    title,
    href
}: {
    icon: ReactNode,
    title: string,
    href: string
}) => {
    return (
        <Link href={href} className='block'>
            <Card className='hover:ring ring-primary'>
                <CardHeader>
                    <div className='flex items-center justify-center'>
                        {icon}
                    </div>
                </CardHeader>
                <CardContent>
                    <CardTitle className='text-center'>{title}</CardTitle>
                </CardContent>
            </Card>
        </Link>
    )
}

const SelectItemeType = ({
    collectionId
}: {
    collectionId?: string
}) => {
    const cards = [
        {
            icon: <Link2 className='w-10 h-10 text-muted-foreground' />,
            title: 'Create Link',
            href: `/admin/items/mutate?itemType=link&collectionId=${collectionId}`
        },
        {
            icon: <File className='w-10 h-10 text-muted-foreground' />,
            title: 'Create Pdf',
            href: `/admin/items/mutate?itemType=pdf&collectionId=${collectionId}`
        },
        {
            icon: <GalleryHorizontal className='w-10 h-10 text-muted-foreground' />,
            title: 'Create Image Slide',
            href: `/admin/items/mutate?itemType=image_slide&collectionId=${collectionId}`
        },

    ]
    return (
        <>
            <div className='my-10 space-y-3 text-center'>
                <h1 className='text-4xl'>Select Item</h1>
                <p className='text-muted-foreground'>
                    Select the item types which you want to create
                </p>
            </div>
            <div className="grid grid-cols-3 gap-5">
                {
                    cards.map(card => {
                        return <SelectItemCard key={nanoid()} {...card} />
                    })
                }
            </div>
        </>
    )
}

export default SelectItemeType