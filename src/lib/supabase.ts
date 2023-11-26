import { createClient } from '@supabase/supabase-js'
import {env} from '../env.mjs';



// Create Supabase client
const Supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_API_KEY)
export const DefaultBucket = "uploads";
export const SupabaseStorage = Supabase.storage.from('uploads');

export const getSupabseUploadUrl = (path?: string) => {
    return `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${path??''}`
}


export default Supabase;