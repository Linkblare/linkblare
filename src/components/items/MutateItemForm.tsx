/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import { convertNullToUndefined, getSlug, md5Hash } from '@/lib/utils'
import { type CreateItemInput, CreateItemSchema, type ItemTypes, type SingleItemOut, type UpdateItemInput, UpdateItemSchema } from '@/schema/item-schema'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useToast } from '../ui/use-toast'
import { nanoid } from 'nanoid'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import FileUpload from '../FileUpload'
import TagInput from '../TagInput'
import { Button } from '../ui/button'
import Loading from '../Loading'
import ImageSlideForm from './ImageSlideForm'
import MutateLinkItem from './MutateLinkItem'
import PdfItemForm from './PdfItemForm'
import { Textarea } from '../ui/textarea'


const id = nanoid();

const MutateItemForm = ({
    type,
    data,
    onDone,
    collectionId
}: {
    collectionId: number,
    type: ItemTypes,
    data?: SingleItemOut,
    onDone?: () => void
}) => {
    const createMutation = api.items.create.useMutation();
    const updateMutation = api.items.update.useMutation();
    const form = useForm<CreateItemInput | UpdateItemInput>({
        defaultValues: data ? convertNullToUndefined({ ...data, tags: data.tags.map(tg => tg.name) }) : { type, collectionId },
        resolver: zodResolver(data ? UpdateItemSchema : CreateItemSchema)
    });
    const titleWatch = useWatch({ control: form.control, name: 'title' });
    const { toast } = useToast()

    const save = async (values: CreateItemInput | UpdateItemInput) => {
        // console.log({values, type})
        try {
            if (data) {
                await updateMutation.mutateAsync(convertNullToUndefined(values));
            } else {
                await createMutation.mutateAsync(values as CreateItemInput);
            }

            toast({ title: 'Item mutation success!!' });
            form.reset();
            onDone?.();
        } catch (error: any) {
            toast({
                title: 'Item mutation failed!!',
                description: error.message,
                variant: 'destructive'
            });
        }
    }

    const handleSubmit = (values: CreateItemInput | UpdateItemInput) => {
        if (createMutation.isLoading || updateMutation.isLoading) return;
        void save(values);
    }

    useEffect(() => {
        if (titleWatch) {
            form.setValue('slug', getSlug(titleWatch))
        }
    }, [titleWatch])




    return (
        <Form {...form}>
            <form key={id} onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
                <FormField
                    name='thumbnail'
                    render={({ field }) => {
                        return <FormItem>
                            <FormLabel>Thumbnail</FormLabel>
                            <FormControl>
                                <FileUpload value={field.value} onChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    }}
                />
                <FormField
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder='Item title' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                                <Input placeholder='Item slug' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="shortDesc"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                                <Input placeholder='Item short Description' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder='Item Description' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {
                    type === 'image_slide' ?
                        <ImageSlideForm form={form} />
                        : type === 'link' ?
                            <MutateLinkItem form={form} />
                            : <PdfItemForm form={form} />
                }

                <FormField
                    name='tags'
                    render={({ field }) => {
                        return <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <TagInput value={field.value ?? []} onChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    }}
                />

                <div className='mt-5'>
                    <Button className='w-full'>
                        {
                            (createMutation.isLoading || updateMutation.isLoading) ?
                                <Loading />
                                : data ? 'Update' : 'Create'
                        }</Button>
                </div>
            </form>
        </Form>
    )
}

export default MutateItemForm