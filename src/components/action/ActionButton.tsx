'use client'
import React, { type ReactNode } from 'react'
import { api } from '@/trpc/react'
import { type UserActionResult, type UserActions } from '@/schema/user-schema'
import { useToast } from '../ui/use-toast'
import LikeButton from '../LikeButton'
import SaveButton from '../SaveButton'
import { signIn, useSession } from 'next-auth/react'


type ActionButtonProps = {
    children?: ReactNode,
    onAction?: (res: UserActionResult) => void,
    action: UserActions,
    entityId: number,
    defaultState?: boolean,
    defaultCount?: number
}



const ActionButton = ({
    defaultCount,
    children,
    onAction,
    action,
    entityId,
    defaultState
}: ActionButtonProps) => {
    const actionMutation = api.user.action.useMutation();
    const savedCtx = api.useUtils().user.savedCollection;
    const { toast } = useToast();
    const {data:Session, status} = useSession()
    
    const toggle = async () => {
        if(!Session && status === 'unauthenticated'){
            void signIn();
            return;
            
        }
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
        return <LikeButton  onClick={() => toggle()} state={actionMutation.data?.state ?? defaultState} count={actionMutation.data?.count??defaultCount??0} />
    }

    if (action === 'collection_save_toggle') {
        return <SaveButton  onClick={() => toggle()} state={actionMutation.data?.state ?? defaultState} count={actionMutation.data?.count??defaultCount??0} />
    }
    return (
        <>
            <span></span>
        </>
    )
}

export default ActionButton