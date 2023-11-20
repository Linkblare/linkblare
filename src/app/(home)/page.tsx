
import { getServerAuthSession } from "@/server/auth";
import MainWrapper from "@/components/MainWrapper";
import FeedCollection from "@/components/collection/FeedCollection";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();
  if(!session){
    redirect('/explore')
  }
  return (
    <>
    <MainWrapper className="py-5 ">
      <FeedCollection/>
    </MainWrapper>
    </>
  );
}

