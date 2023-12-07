/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/require-await */
import { env } from '@/env.mjs';
import { ImageResponse } from '@vercel/og';
import { NextResponse } from 'next/server';
// App router includes @vercel/og.
// No need to install it.

// export const runtime = 'edge';

// const logoImageSrc = `${env.SITE_URL}/og-logo.png`

export async function GET(req: Request, { params }: { params: { title?: string } }) {

  const { searchParams } = new URL(req.url);
  const { title } = params;
  const width = (searchParams.get('w') && !isNaN(Number(searchParams.get('w')))) ? Number(searchParams.get('w')) : 1200;
  const height = (searchParams.get('h') && !isNaN(Number(searchParams.get('h')))) ? Number(searchParams.get('h')) : 600;

  try {
    // const satoshiBold = await fetch(new URL("/public/Satoshi-Bold.ttf", import.meta.url)).then(
    //   (res) => res.arrayBuffer(),
    // );
  
  
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: 80,
            backgroundColor: "#030303",
            // backgroundImage:
            //     "radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)",
            // backgroundSize: "100px 100px",
            backgroundPosition: "-30px -10px",
            fontWeight: 600,
            color: "white",
          }}
        >
          <div style={{
            display: 'flex',
            fontSize: '50',
            color: 'white',
            fontWeight: 'bold',
            position: 'absolute',
            top: '-200px',
            left: '100px',
            transform: 'translateX(-50%)',
            borderRadius: '20px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '600px',
            height: '600px'
          }}>
  
            <img src={`${env.SITE_URL}/og-logo.png`} width={500} height={500} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
  
          <h1 style={{
            fontSize: 82,
            fontFamily: "Satoshi Bold",
            margin: "0 0 35px -2px",
            padding: "0 0 5px 0", // otherwise the gradient is cut off on some chars
            lineHeight: 1.1,
            textShadow: "0 2px 30px #000",
            letterSpacing: -4,
            backgroundImage: "linear-gradient(90deg, #fff 40%, #aaa)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textAlign: "center",
          }}>{title ?? 'Linkblare'}</h1>
  
  
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "50px",
              margin: 0,
              fontSize: 30,
              fontFamily: "Satoshi Bold",
              letterSpacing: -1,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
  
            <p style={{ marginLeft: "4px" }}>Linkblare Collections</p>
          </div>
        </div >
      ),
      {
        width,
        height,
        // fonts: [
        //   {
        //     name: "Satoshi Bold",
        //     data: satoshiBold,
        //   },
        // ],
      },
    );
  } catch (e) {
    console.error(e);
    return new NextResponse("Something went wrong");
  }
}