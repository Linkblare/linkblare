'use client'

import React from 'react'
import { TagsInput as TagInputComp } from "react-tag-input-component";

type TagInputProps = {
    value?: string[],
    onChange?: (value: string[]) => void,
}

const TagInput = ({
    value,
    onChange
}: TagInputProps) => {

  return (
    <div className='font'>
        <TagInputComp
            value={value}
            onChange={onChange}
            placeHolder='Enter tags for collection'
            classNames = {{input: 'w-full font-thin'}}
        />
    </div>
  )
}

export default TagInput