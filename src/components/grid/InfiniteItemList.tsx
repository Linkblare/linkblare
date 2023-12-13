/* eslint-disable react/display-name */
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'
import { Skeleton } from '../ui/skeleton'
import InfiniteScroll from 'react-infinite-scroll-component'

type ItemGridProps = {
  loading?: boolean,
  loader?: ReactNode,
  bottomLoading?: boolean,
  dataLength: number,
  children: ReactNode,
  fetchNextPage: () => void,
  refetch: () => void,
  className?: string,
  hasMore?: boolean,
} & React.HTMLAttributes<HTMLDivElement>

const DefaultLoader = () => {
  return <Skeleton className='aspect-[1.4/.8] max-w-md' />
}

const InifiniteItemList = React.forwardRef<HTMLDivElement, ItemGridProps>((props) => {
  const Loader = props.loader ?? <DefaultLoader />
  return (
    <>
      <InfiniteScroll
        dataLength={props.dataLength} //This is important field to render the next data
        next={props.fetchNextPage}
        hasMore={props.hasMore ?? false}
        loader={Loader}
        className={cn('space-y-5', props.className)}
        refreshFunction={props.refetch}
      >
        {props.children}
      </InfiniteScroll>
    </>
  )
})

export default InifiniteItemList