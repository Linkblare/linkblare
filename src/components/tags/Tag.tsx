'use client'
import { cn } from '@/lib/utils'
import { type UserActionResult } from '@/schema/user-schema'
import { api } from '@/trpc/react'
import { Tag } from '@prisma/client'
import React from 'react'

const Tag = ({
    data,
    onToggleSelect
}: {
    data: Tag & {isPreferred: boolean},
    onToggleSelect?: (result: UserActionResult) => void
}) => {
    const preferredMutation = api.user.action.useMutation();

    const toggle = async () => {
        try {
            const res = await preferredMutation.mutateAsync({action: 'toggle_preferred_tag', entityId: data.id});
            onToggleSelect?.(res)
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