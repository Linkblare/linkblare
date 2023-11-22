/* eslint-disable @typescript-eslint/require-await */

import {withAuth} from 'next-auth/middleware'


export default withAuth;

export const config = {
    matcher: ['/for-you/:path*', "/saved/:path*", "/admin/:path*"]
}