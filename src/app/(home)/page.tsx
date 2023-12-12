/* eslint-disable @typescript-eslint/no-unused-vars */

import MainWrapper from "@/components/MainWrapper";
import TagRow from "@/components/TagRow";
import ExploreCollectionLoader from "@/components/collection/ExploreCollectionLoader";
import FeaturedCollections from "@/components/collection/FeaturedCollections";
import { api } from "@/trpc/server";

export default async function Home({
  searchParams
}: {
  searchParams?: {tag?: string}
}) {

  const publicCollection = await api.collection.inifintList.query({filter: {tags: searchParams?.tag ? [...searchParams.tag] : undefined}})
  return (
    <>
    <MainWrapper className=" relative">
      <TagRow/>
      <div className="mt-5"></div>
      <div className="mt-5">
        <FeaturedCollections/>
      </div>
      <ExploreCollectionLoader initialData={publicCollection} />
    </MainWrapper>
    </>
  );
}

