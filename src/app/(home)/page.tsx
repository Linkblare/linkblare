/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import MainWrapper from "@/components/MainWrapper";
import ExploreCollectionLoader from "@/components/collection/ExploreCollectionLoader";
import FeaturedCollections from "@/components/collection/FeaturedCollections";
import { api } from "@/trpc/server";
import { collectionSortMap } from "./collectionSort";
import SortArray from "@/components/SortArray";

export default async function Home({
  searchParams
}: {
  searchParams?: {tag?: string, sortBy?: string}
}) {

  const publicCollection = await api.collection.inifintList.query({
    filter: {tags: searchParams?.tag ? [...searchParams.tag] : undefined},
    sort: searchParams?.sortBy ? collectionSortMap.find(s => s.key === searchParams.sortBy)?.sortValue as any : undefined,
  })
  return (
    <>
    <MainWrapper className=" relative">
      <div className="flex items-start gap-2 mt-2">
        <SortArray inputs={collectionSortMap} />
      {/* <TagRow/> */}
      </div>
      <div className="mt-5"></div>
      <div className="mt-5">
        <FeaturedCollections/>
      </div>
      <ExploreCollectionLoader initialData={publicCollection} />
    </MainWrapper>
    </>
  );
}

