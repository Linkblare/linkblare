/* eslint-disable @typescript-eslint/no-unused-vars */

import MainWrapper from "@/components/MainWrapper";
import SortSwitcheGroup from "@/components/SortSwitcheGroup";
import TagRow from "@/components/TagRow";
import ExploreCollectionLoader from "@/components/collection/ExploreCollectionLoader";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";

export default async function Home({
  searchParams
}: {
  searchParams?: {tag?: string}
}) {

  const publicCollection = await api.collection.inifintList.query({filter: {tags: searchParams?.tag ? [...searchParams.tag] : undefined}})
  return (
    <>
    <MainWrapper className="space-y-2 relative">
      <TagRow/>

      <ExploreCollectionLoader initialData={publicCollection} />
    </MainWrapper>
    </>
  );
}

