import config from '@/server/config';
import {db} from '@/server/db'

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