/* eslint-disable @typescript-eslint/require-await */

import {withAuth} from 'next-auth/middleware'


export default withAuth;

export const config = {
    matcher: ['/me/:path*', "/saved/:path*", "/admin/:path*"]
}