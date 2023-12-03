import Link from 'next/link'
import React from 'react'
import bmcButton from '../../src/app/bmc-button.png'
import bmcShort from '../../src/app/bmc-short.png'
import Image from 'next/image'

const BmcButton = ({
    size='sm'
}: {
    size?: 'sm' | 'lg'
}) => {
    return (
        <Link
            href={'https://www.buymeacoffee.com/linkblareweb'}
            className='block rounded overflow-hidden'
        >
            {/* <Image
                src={bmcButton}
                alt="BMC Button"
                width={150}
                height={35}
                className='bmc-button lg:inline-block hidden'
                priority={true}
                loading='eager'
                placeholder='blur'
                quality={100}
                draggable={false}
                unoptimized={true}
            /> */}
            <Image
                src={size == 'sm' ? bmcShort : bmcButton}
                alt="BMC Button"
                width={60}
                height={30}
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