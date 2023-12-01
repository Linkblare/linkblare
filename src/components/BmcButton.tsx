import Link from 'next/link'
import React from 'react'
import bmcButton from '../../src/app/bmc-button.png'
import Image from 'next/image'

const BmcButton = () => {
    return (
        <Link
            href={'https://www.buymeacoffee.com/linkblareweb'}
            className='block'
        >
            <Image
                src={bmcButton}
                alt="BMC Button"
                width={150}
                height={35}
                className='bmc-button'
                priority={true}
                loading='eager'
                placeholder='blur'
                quality={100}
                draggable={false}
                unoptimized={true}
            />
        </Link>
    )
}

export default BmcButton