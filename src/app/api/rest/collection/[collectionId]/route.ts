import {db} from '@/server/db'

export async function GET(
    req: Request,
    {params}: {params: {collectionId: string}}
    ){

        const id = isNaN(Number(params.collectionId)) ? undefined : Number(params.collectionId);
        const slug = isNaN(Number(params.collectionId)) ? params.collectionId : undefined;
    try {
        const data = await db.collection.findFirst({
            where: {
                id,
                slug
            }
        })

        if(!data) return new Response(JSON.stringify({error: 'Not Found'}), {status: 404})

        return new Response(JSON.stringify(data), {status: 200})
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({error: 'Internal Server Error'}), {status: 500})
    }
    
}