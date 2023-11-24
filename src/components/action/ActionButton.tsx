'use client'
import React, { ReactNode } from 'react'
import { Button } from '../ui/button'
import { api } from '@/trpc/react'
import { ThumbsUpIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UserActionResult, UserActions } from '@/schema/user-schema'
import { useToast } from '../ui/use-toast'
import LikeButton from '../LikeButton'
import SaveButton from '../SaveButton'


type ActionButtonProps = {
    viewCount?: boolean,
    children?: ReactNode,
    onAction?: (res: UserActionResult) => void,
    action: UserActions,
    entityId: number,
    defaultState?: boolean
}



const ActionButton = ({
    children,
    viewCount,
    onAction,
    action,
    entityId,
    defaultState
}: ActionButtonProps) => {
    const actionMutation = api.user.action.useMutation();
    const savedCtx = api.useUtils().user.savedCollection;
    const { toast } = useToast();
    
    const toggle = async () => {
        try {
            const res = await actionMutation.mutateAsync({ action, entityId })
            onAction?.(res)

            if(action === 'collection_save_toggle'){
                await savedCtx.invalidate();
            }
            
        } catch (error) {
            console.error(error)
            toast({ title: "There is some problem to complete this action", variant: 'destructive' })
        }
    }

    if (action === 'collection_like_toggle' || action === 'item_like_toggle') {
        return <LikeButton onClick={() => toggle()} state={actionMutation.data?.state ?? defaultState} />
    }

    if (action === 'collection_save_toggle') {
        return <SaveButton onClick={() => toggle()} state={actionMutation.data?.state ?? defaultState} />
    }
    return (
        <>
            <span></span>
        </>
    )
}

export default ActionButton