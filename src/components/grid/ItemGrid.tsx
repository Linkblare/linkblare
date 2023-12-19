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

const ItemGrid = React.forwardRef<HTMLDivElement, ItemGridProps>((props) => {
  const Loader = props.loader ?? <DefaultLoader />
  return (
    <>
      <InfiniteScroll
        dataLength={props.dataLength} //This is important field to render the next data
        next={props.fetchNextPage}
        hasMore={props.hasMore ?? false}
        loader={Loader}
        className={cn('grid grid-cols-1 md:grid-cols-3  gap-7 items-center justify-center max-w-[1200px] mx-auto', props.className)}
        // below props only if you need pull down functionality
        refreshFunction={props.refetch}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
      >
        {props.children}
      </InfiniteScroll>
    </>
  )
})

export default ItemGrid