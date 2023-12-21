/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useState } from 'react'
import { useToast } from '../ui/use-toast'
import { api } from '@/trpc/react'
import { type TagOut } from '@/schema/tag-schema'
import { convertNullToUndefined } from '@/lib/utils'
import { Switch } from '../ui/switch'


const TagCategoryUpdate = ({
    data
}: {
    data: TagOut
}) => {
    const updateMutation = api.tags.update.useMutation();
    const { toast } = useToast();
    const [checked, setChecked] = useState(data.isCategory);

    const handleCheck = async (value: {isCategory: boolean}) => {
        try {
            const res = await updateMutation.mutateAsync(convertNullToUndefined({ ...data, ...value }));
            setChecked(res.isCategory);
            toast({ title: 'Tag select as Category, Successfully' })
        } catch (error) {
            toast({
                title: 'Error in updating tag',
                variant: 'destructive'
            })
        }
    }

    return (
        <div>
            <Switch onCheckedChange={value => handleCheck({isCategory: value})} checked={checked} />
        </div>
    )
}

export default TagCategoryUpdate