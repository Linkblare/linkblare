/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
'use client'

import React, { useEffect } from 'react'
import FileUpload from '../FileUpload'
import { useForm, useWatch } from 'react-hook-form'
import {
  type CollectionOut,
  type CreateCollectionInput,
  CreateCollectionSchema,
  type UpdateCollectionInput,
  UpdateCollectionSchema
} from '@/schema/collection-schema'
import { convertNullToUndefined, getSlug, md5Hash } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import TagInput from '../TagInput'
import { Button } from '../ui/button'
import { api } from '@/trpc/react'
import { toast } from '../ui/use-toast'
import Loading from '../Loading'
import { nanoid } from 'nanoid'


type MutateCollectionFormProps = {
  data?: CollectionOut,
  onDone?: () => void
}

const id = nanoid();

const MutateCollectionForm = ({
  data,
  onDone
}: MutateCollectionFormProps) => {
  const createMutation = api.collection.create.useMutation();
  const updateMutation = api.collection.update.useMutation();
  const form = useForm<CreateCollectionInput | UpdateCollectionInput>({
    defaultValues: data ? {...convertNullToUndefined({...data, tags: data.tags.map(tag => tag.name)})} :  {},
    resolver: zodResolver(data ? UpdateCollectionSchema : CreateCollectionSchema)
  });
  const titleWatch = useWatch({control: form.control, name: 'title'})
  const ctx = api.useUtils().collection;


  const onSubmit = async (values: CreateCollectionInput | UpdateCollectionInput) => {
    try {
      if (data) {
        const res = await updateMutation.mutateAsync(convertNullToUndefined(values));
        toast({
          title: 'Collection Update successfully!!!'
        });
      } else {
        await createMutation.mutateAsync(values);
        toast({
          title: 'Collection Created successfully!!!'
        });
      }
      void ctx.invalidate();
      form.reset({});
      onDone?.();
    } catch (error: any) {
      toast({
        title: 'Collection mutation failed!!',
        description: error.message,
        variant: 'destructive'
      });
    }
  }
  useEffect(() => {
    if(titleWatch){
      form.setValue('slug', getSlug(titleWatch))
    }
  }, [titleWatch])

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} key={id}>

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
            name='title'
            render={({ field }) => {
              return <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Collection title' {...field} />
                </FormControl>
              </FormItem>
            }}
          />
          <FormField
            name='slug'
            render={({ field }) => {
              return <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder='Collection slug' {...field} />
                </FormControl>
              </FormItem>
            }}
          />
          <FormField
            name='description'
            render={({ field }) => {
              return <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder='Collection Description' {...field} />
                </FormControl>
              </FormItem>
            }}
          />
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
    </>
  )
}

export default MutateCollectionForm