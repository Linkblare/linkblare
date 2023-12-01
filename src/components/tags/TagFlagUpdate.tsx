/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '../ui/use-toast'
import { api } from '@/trpc/react'
import { type TagOut } from '@/schema/tag-schema'
import { convertNullToUndefined } from '@/lib/utils'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Switch } from '../ui/switch'



const TagFlagUpdate = ({
    data
}: {
    data: TagOut
}) => {
    const updateMutation = api.tags.update.useMutation();
    const { toast } = useToast();
    const [checked, setChecked] = useState(data.isFlag);

    const handleCheck = async (value: {isFlag: boolean}) => {
        try {
            const res = await updateMutation.mutateAsync(convertNullToUndefined({ ...data, ...value }));
            setChecked(res.isFlag);
            toast({ title: 'Tag select as Flag, Successfully' })
        } catch (error) {
            toast({
                title: 'Error in updating tag',
                variant: 'destructive'
            })
        }
    }


    return (
        <div>
            <Switch onCheckedChange={value => handleCheck({isFlag: value})} checked={checked} />
        </div>
    )
}

export default TagFlagUpdate