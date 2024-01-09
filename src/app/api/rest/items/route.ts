/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { BulkUpddateItemSchema, CreateItemSchema } from '@/schema/item-schema';
import config from '@/server/config';
import {db} from '@/server/db'
import { isAuthorized } from '../_utils/isAuthorized';



export async function GET(req: Request){
    const { searchParams } = new URL(req.url);
    const take = searchParams.get('take')??config.limit;
    let cursor = searchParams.get('cursor');
    const collectionId = searchParams.get('collectionId');
    
    if(collectionId && Number.isNaN(Number(collectionId))){
        return new Response(JSON.stringify({error: 'Invalid Collection ID'}), {status: 400})
    }

    if(cursor && Number.isNaN(Number(cursor))){
        return new Response(JSON.stringify({error: 'Invalid Take'}), {status: 400})
    }

    try {
        const data = await db.item.findMany({
            where: {
                collectionId: collectionId ? Number(collectionId) : undefined,
            },
            include: {
                tags: true
            },
            take: Number(take)+1,
            cursor: cursor ? {id: Number(cursor)} : undefined, 
            orderBy: {
                createdAt: 'desc'
            }
        })

        if (data.length > Number(take)) {
            const lastResult = data.pop();
            if (lastResult) {
                cursor = lastResult.id+''
            }
        }else{
            cursor = null;
        }
        return new Response(JSON.stringify({
            items: data,
            nextCursor: cursor,
        }), {status: 200})
        
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({error: 'Internal Server Error'}), {status: 500})
    }
    
}


export async function POST(req: Request){

    isAuthorized(req)

    const body = await req.json();
    const validatedBody = CreateItemSchema.safeParse(body);

    if(!validatedBody.success){
        return new Response(JSON.stringify({error: 'Invalid Body'}), {status: 400})
    }

    const {tags, collectionId, ...rest} = validatedBody.data;

    try {
        await db.item.create({
            data: {
            ...rest,
            content: rest.content,
            Collection: {
                connect: {
                    id: collectionId
                }
            },
            tags: {
                connectOrCreate: tags.map(name => ({
                    where: { name },
                    create: { name }
                }))
            },
            
        },
        include: {
            tags: true
        }
    })
     await db.collection.update({
        where: {
            id: collectionId
        },
        data: {
            itemsUpdated: new Date()
        }
    })
        return new Response(JSON.stringify({success: true}), {status: 200})
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({error: 'Internal Server Error'}), {status: 500})
    }
}



// UPDATE MANY COLLECTIONS IN BULK
export async function PATCH(
    req: Request,
) {

    isAuthorized(req);

    const body = await req.json();
    const validate = BulkUpddateItemSchema.safeParse(body)
    if (!validate.success)
        return new Response(JSON.stringify(validate.error.issues), { status: 400 });

    const { items } = validate.data;
    try {
        
        const result = await db.$transaction(items.map(item => {
            const {tags, id, ...rest} = item
            return db.item.update({
                where: {
                    id
                },
                data: {
                    ...rest
                }
            })
        }))

        return new Response(JSON.stringify(result), { status: 200 });

    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
    }
}