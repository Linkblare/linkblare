/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorView from '@/components/ErrorView'
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader'
import MutateItemForm from '@/components/items/MutateItemForm'
import SelectItemeType from '@/components/items/SelectItemType'
import { cn } from '@/lib/utils'
import { ItemTypesArray } from '@/schema/item-schema'
import React from 'react'
import { type ZodError, z } from 'zod'

const searchParamsSchema = z.object({
    itemType: z.enum(ItemTypesArray, { required_error: 'Item type required', invalid_type_error: 'Select Valid item type' }).optional(),
    collectionId: z.string({ required_error: 'Collection id is required', invalid_type_error: 'Collection Id must be only one' })
})

const validateParams = (searchParams: any): { data?: z.TypeOf<typeof searchParamsSchema>, error?: ZodError } => {
    try {
        const result = searchParamsSchema.parse(searchParams);
        return {
            data: result,
            error: undefined
        }
    } catch (error: any) {
        return {
            data: undefined,
            error: error as ZodError
        }
    }
}

const MuatateItemPage = ({
    searchParams
}: {
    searchParams?: Record<string, string | string[] | undefined>
}) => {
    const validatedParams = validateParams(searchParams);

    if (validatedParams.error) {
        return <ErrorView />
    }

    if (!validatedParams.data?.itemType) {
        return <>
            <SelectItemeType collectionId={validatedParams.data?.collectionId} />
        </>
    }

    

    return (
        <>
        <DashboardPageHeader title={
            validatedParams.data.itemType === 'image_slide' ?
                'Create Image Slide'
            : validatedParams.data.itemType === 'link' ? 
                'Create Link Item'
            : validatedParams.data.itemType === 'pdf' ?
                'Create Pdf Item' 
            : 'Create Unknown type item'
        }></DashboardPageHeader>
            <div className={cn([
            'max-w-2xl mx-auto',
            {'max-w-4xl': (validatedParams.data.itemType === 'image_slide')}
        ])}>
            <MutateItemForm type={validatedParams.data.itemType} collectionId={parseInt(validatedParams.data.collectionId)} />
        </div>
        </>
    )
}

export default MuatateItemPage