/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'ue client'

import { CollectionOut } from '@/schema/collection-schema'
import React, { ReactNode, memo } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'
import { EditIcon, List, ListPlus } from 'lucide-react'
import MutateCollectionDialog from './MutateCollectionDialog'
import Link from 'next/link'
import { api } from '@/trpc/react'
import Loading from '../Loading'

type CollectionViewerSheetProps = {
    trigger: ReactNode,
    collection?: CollectionOut,
    collectionId?: number
}

const CollectionViewerSheet = ({
    trigger,
    collection,
    collectionId
}: CollectionViewerSheetProps) => {
    const { data: LCollection, isLoading } = api.collection.getById.useQuery({ id: collectionId! }, { enabled: !collection });
    const coll = collection ?? LCollection;

    if (!collection && isLoading) {
        return <div className='py-20'>
            <Loading />
        </div>
    }
    return (
        <Sheet>
            <SheetTrigger asChild>{trigger}</SheetTrigger>

            <SheetContent>
                <Card className='mt-5'>
                    <div className="relative bg-slate-500 w-full rounded-lg overflow-hidden border">
                        <Image src={coll?.thumbnail ?? ''} alt={coll?.title ?? ''} width={500} height={500} />
                    </div>
                    <CardContent className='pt-5'>
                        <div className='space-y-2'>
                            <CardTitle>{coll?.title}</CardTitle>
                            <CardDescription>{coll?.description}</CardDescription>
                        </div>
                    </CardContent>

                    <div className='flex items-center gap-5 px-5 py-2'>
                        <MutateCollectionDialog
                            trigger={<Button size={'icon'} variant={'secondary'}><EditIcon /></Button>}
                            data={collection}
                        />
                        <Link href={{ pathname: `/admin/items/`, }}><Button variant={'secondary'} size={'icon'}><List /></Button></Link>
                        <Link href={{ pathname: `/admin/items/mutate`, query: { collectionId: coll?.id } }}>
                            <Button variant={'secondary'} size={'icon'}><ListPlus /></Button>
                        </Link>
                    </div>
                </Card>
            </SheetContent>
        </Sheet>
    )
}

export default memo(CollectionViewerSheet)