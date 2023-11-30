
import MainWrapper from "@/components/MainWrapper";
import SortSwitcheGroup from "@/components/SortSwitcheGroup";
import ExploreCollectionLoader from "@/components/collection/ExploreCollectionLoader";

export default function Home() {

  return (
    <>
    <MainWrapper className=" ">
      <SortSwitcheGroup items={[]}/>
      <ExploreCollectionLoader/>
    </MainWrapper>
    </>
  );
}

