import { imageUpload } from "@/lib/fileUpload";
import { isAuthorized } from "../_utils/isAuthorized";


export async function POST(req: Request){
    isAuthorized(req)
    
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        if(!file){
            return new Response("No file", {status: 400})
        }
        const uploadRes = await imageUpload(file);
        console.log(uploadRes)
        return new Response(JSON.stringify(uploadRes), {status: 200})
        
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify(error), {status: 500})
    }

}