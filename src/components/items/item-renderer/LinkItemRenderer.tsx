import { type LinkContent } from '@/schema/item-schema'
import React from 'react'
import Image from 'next/image'
import { getPlaceholderImage } from '@/lib/utils'
// import { SocialMedia, getSocialMediaFromUrl } from '@/lib/utils'
// import { 
//   FacebookEmbed, 
//   InstagramEmbed, 
//   LinkedInEmbed, 
//   TikTokEmbed,
//   YouTubeEmbed,
//   TwitterEmbed
// } from 'react-social-media-embed';

const LinkItemRenderer = ({
  thumbnail,
  content
}: {
  thumbnail?: string | null
  content: LinkContent
}) => {
  // const socialMediaUrl = getSocialMediaFromUrl(content.url);

  // if(socialMediaUrl){
  //   return(
  //     <div className='w-full h-full relative'>
  //       {
  //         socialMediaUrl === SocialMedia.Facebook ? 
  //         <FacebookEmbed url={socialMediaUrl} width={550} />
  //         : socialMediaUrl === SocialMedia.Instagram ?
  //         <InstagramEmbed url={socialMediaUrl} /> 
  //         : socialMediaUrl === SocialMedia.LinkedIn ?
  //         <LinkedInEmbed url={socialMediaUrl} /> 
  //         : socialMediaUrl === SocialMedia.TikTok ?
  //         <TikTokEmbed url={socialMediaUrl} />
  //         : socialMediaUrl === SocialMedia.YouTube ?
  //         <YouTubeEmbed url={socialMediaUrl} />
  //         : socialMediaUrl === SocialMedia.Twitter ?
  //         <TwitterEmbed url={socialMediaUrl} /> 
  //         : <Image src={thumbnail??''}  alt="" fill objectFit='cover' objectPosition='center' />
  //       }
  //     </div>
  //   )
  // }

  return (
    <div className='w-full h-full relative'>
      <Image src={thumbnail ?? getPlaceholderImage({})} alt="" fill objectFit='cover' objectPosition='center' />
      <div className=' dark:block hidden absolute inset-0 bg-gradient-to-t from-background to-transparent'></div>
    </div>
  )
}

export default LinkItemRenderer