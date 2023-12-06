const apiKey = process.env.EXTENSION_API_KEY;

export function isAuthorized(req: Request){
    const authHeader = req.headers.get('Authorization');
    if(authHeader){
        const token = authHeader.split(' ')[1];
        if(token === apiKey){
            return req;
        }
    }
    return new Response('Unauthorized', {status: 401});
}