/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/trpc/server";
import { notFound, redirect } from "next/navigation";

const RedirectPage = async ({
    params
  }: {
    params: { slug: string },
  }) => {

    const slug = params.slug;
    const item = await api.items.getBySlug.query({ slug });

    if(!item || item.type !== "link"){
        notFound();
    }
    const { url } = item.content as any;
    redirect(url as string)
  }
  
  export default RedirectPage;