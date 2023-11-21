import React from 'react'
import NextImage, {ImageProps} from 'next/image';



const Image = (props: ImageProps) => {

  return (
    <NextImage {...props} src={props.src}  />
  )
}

export default Image