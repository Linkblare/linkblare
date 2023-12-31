/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client'
import { cn } from '@/lib/utils'
import { type UserActionResult } from '@/schema/user-schema'
import { api } from '@/trpc/react'
import { Tag } from '@prisma/client'
import React from 'react'
import { useToast } from '../ui/use-toast'

const Tag = ({
    data,
    onToggleSelect
}: {
    data: Tag & {isPreferred: boolean},
    onToggleSelect?: (result: UserActionResult) => void
}) => {
    const preferredMutation = api.user.action.useMutation();
    const {toast} = useToast();

    const toggle = async () => {
        try {
            const res = await preferredMutation.mutateAsync({action: 'toggle_preferred_tag', entityId: data.id});
            onToggleSelect?.(res)
            if(res.state){
                toast({
                    title: `${data.name} is now your preferred tag`
                })
            }else{
                toast({
                    title: `${data.name} is no longer your preferred tag`
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <span className={cn([
        'py-1 px-2 border rounded-full capitalize cursor-pointer text-sm',
        {'bg-primary text-primary-foreground': preferredMutation.data?.state ?? data.isPreferred},
    ])} 
    onClick={() => void toggle()}
    >{data.name}</span>
  )
}

export default Tag