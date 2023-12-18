/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useCopyMoveContext } from '@/context/CopyMoveContext'
import React from 'react'
import { Button } from '../ui/button'
import { ClipboardPaste, Loader2 } from 'lucide-react'
import { api } from '@/trpc/react'
import { useToast } from '../ui/use-toast'

const MoveItemsToCollection = ({
    toCollectionId
}: {
    toCollectionId: number
}) => {
    const {moveItems, setMoveItems, action, fromCollectionId} = useCopyMoveContext();
    const copyMutation = api.items.copyFromCollection.useMutation();
    const moveMutation = api.items.moveFromCollection.useMutation();
    const {toast} = useToast()

    const handleAction = async () => {
        try {
            if(action === 'copy'){
                await copyMutation.mutateAsync({
                    itemIds: moveItems.map(item => item.id) as number[],
                    fromCollection: fromCollectionId,
                    toCollection: toCollectionId
                })
            }
            if(action === 'move'){
                await moveMutation.mutateAsync({
                    itemIds: moveItems.map(item => item.id) as number[],
                    fromCollectionId,
                    toCollectionId
                })
            }
            setMoveItems([])
            toast({
                title: 'Items moved',
            })
        } catch (error: any) {
            toast({
                title: 'Upnable to paste items',
                description: error.message,
                variant: 'destructive'
            })
        }
    }
  return (
    <Button variant={'secondary'} size={'icon'} disabled={moveItems.length === 0 || copyMutation.isLoading || moveMutation.isLoading} onClick={handleAction} >
       {
        copyMutation.isLoading || moveMutation.isLoading ? <Loader2/> : <ClipboardPaste  />
       }
    </Button>
  )
}

export default MoveItemsToCollection