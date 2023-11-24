/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useDebounce } from "@uidotdev/usehooks";
import { api } from '@/trpc/react';
import { nanoid } from 'nanoid';
import ReactTags, { Tag } from 'react-tag-autocomplete'


type TagInputProps = {
  value?: string[],
  onChange?: (value: string[]) => void,
}

const TagInput = ({
  value,
  onChange
}: TagInputProps) => {

  const [tags, setTags] = useState<Tag[]>(value?.map(tgstr => ({ id: nanoid(), name: tgstr })) ?? [])
  const [search, setSearch] = useState<string | undefined>()
  const { data } = api.tags.list.useQuery({ search })

  const onTagAddHandler = useCallback((tag: Tag) => {
    setTags(tg => [...tg, tag]);
    // onChange

  }, [tags])

  const onDeleteHandler = useCallback((tagIndex: number) => {
    setTags(tags.filter((_, i) => i !== tagIndex))
  }, [tags])


  return (
    <div className='font'>
      <ReactTags
        tags={tags}
        onAddition={onTagAddHandler}
        onDelete={onDeleteHandler}
        noSuggestionsText='To Tags Found'
        suggestions={data?.data}
        
      />
    </div>
  )
}

export default TagInput