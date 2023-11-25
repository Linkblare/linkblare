/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import React, { useCallback, useState } from 'react'
import { useDebounce } from "@uidotdev/usehooks";
import { api } from '@/trpc/react';
import { nanoid } from 'nanoid';
import ReactTags, { type Tag } from 'react-tag-autocomplete'


type TagInputProps = {
  value?: string[],
  onChange?: (value: string[]) => void,
}

const TagInput = ({
  value,
  onChange
}: TagInputProps) => {

  // const [tags, setTags] = useState<Tag[]>(value?.map(tgstr => ({ id: nanoid(), name: tgstr })) ?? [])
  const [search, setSearch] = useState<string | undefined>()
  const debounceSearch = useDebounce(search, 1000)
  const { data, isLoading} = api.tags.list.useQuery({ search: debounceSearch }, {refetchOnWindowFocus: false})

  const onTagAddHandler = useCallback((tag: Tag) => {
    // setTags(tg => [...tg, tag]);
    onChange?.([...(value ?? []), tag.name])
  }, [value])

  const onDeleteHandler = useCallback((tagIndex: number) => {
    onChange?.(value?.filter((_, i) => i !== tagIndex)??[])
  }, [value])


  return (
    <div className=''>
      <ReactTags
        tags={value?.map(val => ({id: nanoid(), name: val}))}
        onAddition={onTagAddHandler}
        onDelete={onDeleteHandler}
        noSuggestionsText='To Tags Found'
        suggestions={data?.data}
        allowNew
        onInput={(query) => {
          if(!isLoading){
            setSearch(query)
          }
        }}
      />
    </div>
  )
}

export default TagInput