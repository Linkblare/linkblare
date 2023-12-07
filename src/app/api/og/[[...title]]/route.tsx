/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/require-await */
import { env } from '@/env.mjs';
import { ImageResponse } from '@vercel/og';
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';

// const logoImageSrc = `${env.SITE_URL}/og-logo.png`

export async function GET(req: Request, { params }: { params: { title?: string } }) {

  const searchParams = new URLSearchParams(req.url.split('?')[1] ?? '');
  const { title } = params;
  const subtitle = searchParams.get('subtitle');
  const width = searchParams.get('width');
  const height = searchParams.get('height');


  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
          position: 'relative'
        }}
      >
        <div style={{
          display: 'flex',
          fontSize: '50',
          color: 'white',
          fontWeight: 'bold',
          position: 'absolute',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderRadius: '20px',
          alignItems: 'center',
          justifyContent: 'center',
          width: '600px',
          height: '600px'
        }}>

          <img src={`${env.SITE_URL}/og-logo.png`} width={500} height={500} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          margin: '100px auto',
          fontWeight: '700',
          color: 'white',
          maxWidth: '70%'
        }}>{title ?? 'Linkblare'}</div>

      </div>
    ),
    {
      width: 1200,
      height: 630
    },
  );
}