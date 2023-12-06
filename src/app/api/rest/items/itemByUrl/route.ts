/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { isValidUrl, removeTrailingSlash } from "@/lib/utils";
import { IsLinkItemExistsSchema, LinkContent } from "@/schema/item-schema";
import { db } from "@/server/db";

export async function POST(req: Request){
    const input = await req.json();
    const validated = IsLinkItemExistsSchema.safeParse(input);

    if(!validated.success){
        return new Response(JSON.stringify(validated.error.issues), {status: 400});
    }

    const {url, collectionId} = validated.data;

   if(!isValidUrl(url)){
        return new Response(JSON.stringify({message: "Invalid URL"}), {status: 400});
    }

    const searchUrl = removeTrailingSlash(url.split('?')[0]!);
    try {
        const res = await db.item.findMany({
            where: {
                type: 'link',
                collectionId,
                content: {
                    path: ['url'],
                    string_starts_with: searchUrl
                }
            },
            include: {
                tags: true
            }
        });
        const isExist = res.find((item) => {
            const content = item.content as LinkContent;
            return content.url.split('?')[0] === searchUrl;
        });
        return new Response(JSON.stringify({data: isExist??null}), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({message: "Internal Server Error"}), {status: 500});
    }
}