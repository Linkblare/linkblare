import ErrorView from '@/components/ErrorView'
import MainWrapper from '@/components/MainWrapper'
import ItemLoader from '@/components/items/ItemLoader'
import { api } from '@/trpc/server'
import { notFound } from 'next/navigation'
import React from 'react'
import { z } from 'zod'

const ParamsSchema = z.object({
    id: z.string()
})

const ViewSingleCollectionPage = async ({
    params
}: {
    params: { id: string | string[] }
}) => {
    const validateParams = ParamsSchema.safeParse(params);
    if(!validateParams.success){
        return <ErrorView title='Something went wrong!!' />
    }

    const collection = await api.collection.getById.query({id: parseInt(params.id as string)})

    if(!collection){
        return notFound();
    }

    return (
        <MainWrapper className='py-5'>
            <ItemLoader collectionId={parseInt(params.id as string)} />
        </MainWrapper>
    )
}

export default ViewSingleCollectionPage