'use client'

import { api } from '@/trpc/react'
import React, { ReactElement, ReactNode } from 'react'
import { useToast } from '../ui/use-toast'
import { Button } from '../ui/button'
import { DeleteIcon } from 'lucide-react'

type DeleteCollectionProps = {
    collectionId: number,
    trigger?: ReactElement,
    onDeleteSuccesFully?: (id: any) => void
}

const DeleteCollection = ({
    collectionId,
    trigger,
    onDeleteSuccesFully
}: DeleteCollectionProps) => {

    const deleteMutation = api.collection.delete.useMutation();
    const ctx = api.useUtils().collection;
    const { toast } = useToast();

    const deleteAction = async () => {
        try {
            await deleteMutation.mutateAsync({ id: collectionId });
            await ctx.invalidate()
            onDeleteSuccesFully?.(collectionId);
            toast({ title: 'Delete successfully!!' })
        } catch (error: any) {
            toast({
                title: 'Deleting collection failed!!',
                description: `${error.message}`,
                variant: 'destructive'
            })
        }
    }
    if (trigger) {
        return React.cloneElement(trigger, { onClick: () => void deleteAction() })
    }

    return (
        <>
            <Button onClick={() => void deleteAction()} variant={'destructive'} size={'icon'}><DeleteIcon className='w-5 h-5' /></Button>
        </>
    )
}

export default DeleteCollection