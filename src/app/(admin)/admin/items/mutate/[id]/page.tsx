/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ErrorView from '@/components/ErrorView'
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader'
import MutateItemForm from '@/components/items/MutateItemForm'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn, validateParams } from '@/lib/utils'
import { ImageSlideContent, ItemTypeEnum, ItemTypes, LinkContent, LinkTypeEnum, PdfContent, SingleItemOut } from '@/schema/item-schema'
import { api } from '@/trpc/server'
import { ListIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { z } from 'zod'

const paramsSchema = z.object({
    id: z.string()
})

const MutateItem = async ({
    params,
}: { params: { id: string } }) => {
    const paramsData = paramsSchema.safeParse(params);
    const data: SingleItemOut<PdfContent | ImageSlideContent | LinkContent> | null = paramsData.success ? await api.items.getById.query({ id: parseInt(params.id) }, {}) : null;

    if (!paramsData.success) {
        return <ErrorView title="Invalid id" />
    }

    if (!data) {
        return <ErrorView title="Item Not Found!" />
    }

    return (
        <>
            <DashboardPageHeader title="Edit Item">
                <div className='flex justify-end items-center w-full'>
                    <Link href={`/admin/items?collectionId=${data.id}`} className={cn([buttonVariants() ,'space-x-2'])}><ListIcon/> <span>View List</span></Link>
                </div>
            </DashboardPageHeader>
            <div className='max-w-xl mx-auto'>
                <MutateItemForm
                    data={data}
                    collectionId={data.collectionId}
                    type={data.type as ItemTypes}
                />
            </div>
        </>
    )
}

export default MutateItem