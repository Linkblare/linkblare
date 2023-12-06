import { db } from "@/server/db"

export async function GET(
    req: Request,
    { params }: { params: { name?: string[] } }
) {

    console.log(params);
    if(!params.name || params.name.length <= 0){
        return new Response(JSON.stringify({data: []}), {status: 200})
    }

    try {
        const res = await db.tag.findMany({
            where: {
                name: params.name[0]
            }
        });
        return new Response(JSON.stringify({data: res??[]}), {status: 200})
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({error: 'Internal Server Error'}), {status: 500})
    }
}