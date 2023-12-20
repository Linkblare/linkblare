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
    const {url} = await api.items.getLinkItemUrlBySlug.query({ slug });

    if(!url || url === ""){
        notFound();
    }
  
    redirect(url as string)
  }
  
  export default RedirectPage;