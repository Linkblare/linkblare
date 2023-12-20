/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import config from '@/server/config';
import {db} from '@/server/db'
import { isAuthorized } from '../_utils/isAuthorized';
import { UpdateCollectionSchema, UpdateManyCollectionSchema } from '@/schema/collection-schema';

export async function GET(req: Request){
    const { searchParams } = new URL(req.url);
    const take = searchParams.get('take')??config.limit;
    let cursor = searchParams.get('cursor');

    if(cursor && Number.isNaN(Number(cursor))){
        return new Response(JSON.stringify({error: 'Invalid Cursor'}), {status: 400})
    }
    
    try {
        const data = await db.collection.findMany({
            take: Number(take)+1,
            cursor: cursor ? {id: Number(cursor)}: undefined,
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


// UPDATE MANY COLLECTIONS IN BULK
export async function PATCH(
    req: Request,
) {

    isAuthorized(req);

    const body = await req.json();
    const validate = UpdateManyCollectionSchema.safeParse(body)
    if (!validate.success)
        return new Response(JSON.stringify(validate.error.issues), { status: 400 });

    const {collections} = validate.data;
    try {
        
        const result = await db.$transaction(collections.map(collection => {
            const {tags, ...rest} = collection
            return db.collection.update({
                where: {
                    id: collection.id
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