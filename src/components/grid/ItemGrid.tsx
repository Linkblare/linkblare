/* eslint-disable react/display-name */
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'
import { Skeleton } from '../ui/skeleton'
import { nanoid } from 'nanoid'

type ItemGridProps = {
  loading?: boolean,
  loader?: ReactNode,
  bottomLoading?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const DefaultLoader = () => {
  return <Skeleton className='aspect-[1.4/.8] max-w-md' />
}

const ItemGrid = React.forwardRef<HTMLDivElement, ItemGridProps>((props) => {

  const Loader = props.loader ?? <DefaultLoader />

  if (props.bottomLoading) {
    return (
      <div className={cn([
        'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5',
        props.className
      ])}>
        {props.children}

        {
          props.loading && Array(5).fill(0).map(() => <div key={nanoid()}>{Loader}</div>)
        }
      </div>
    )
  }

  return (
    <div className={cn([
      'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5',
      props.className
    ])}>
      {
        props.loading ? Array(5).fill(0).map(() => <div key={nanoid()}>{Loader}</div>) : props.children
      }
    </div>
  )
})

export default ItemGrid