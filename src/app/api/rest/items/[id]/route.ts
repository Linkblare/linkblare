/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdateItemSchema } from "@/schema/item-schema";
import { isAuthorized } from "../../_utils/isAuthorized"
import { db } from "@/server/db";
import { md5Hash } from "@/lib/utils";

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {

    isAuthorized(req);

    if (isNaN(Number(params.id)))
        return new Response("Invalid id", { status: 400 });

    const body = await req.json();
    const id = Number(params.id);
    const validate = UpdateItemSchema.safeParse({ id, ...body });
    if (!validate.success)
        return new Response(JSON.stringify(validate.error.issues), { status: 400 });

    const { tags, ...rest } = validate.data;
    try {
        const alreadyExists = await db.item.findFirst({
            where: { id },
            include: { tags: true }
        });
        if (!alreadyExists)
            return new Response(JSON.stringify({ error: 'Item not found!' }), { status: 404 });

        const tagsForConnnect = tags.filter(tag => !alreadyExists.tags.find(tg => tg.name === tag));
        const tagsForDisconnect = alreadyExists.tags.filter(tag => !tags.find(tg => tg === tag.name));

        const res = await db.item.update({
            where: { id },
            data: {
                tags: {
                    connectOrCreate: tagsForConnnect.map(tag => ({ where: { name: tag }, create: { name: tag } })),
                    disconnect: tagsForDisconnect.map(tag => ({ name: tag.name }))
                },
                content: rest.content,
                ...rest,
                hash: md5Hash(rest.title),
            },
            include: {
                tags: true
            }
        });

        return new Response(JSON.stringify(res), { status: 200 });

    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {

    isAuthorized(req);

    if (isNaN(Number(params.id)))
        return new Response("Invalid id", { status: 400 });

    const id = Number(params.id);

    try {
        const res = await db.item.delete({ where: { id } });
        return new Response(JSON.stringify(res), { status: 200 })
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
    }
}


export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {

    isAuthorized(req);

    if (isNaN(Number(params.id)))
        return new Response("Invalid id", { status: 400 });

    const id = Number(params.id);

    try {
        const res = await db.item.findFirst({ 
            where: { id },
            include: {
                Collection: true,
                tags: true,
            }
        });
        return new Response(JSON.stringify(res), { status: 200 })
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
    }
}