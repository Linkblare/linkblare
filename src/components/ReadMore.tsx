'use client'
import React, { ReactNode, useState } from 'react';
import { Button } from './ui/button';


type ReadMoreProps = {
    characterCount: number,
    children: string
}

const ReadMore = ({ characterCount, children }: ReadMoreProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleReadMore = () => {
    setExpanded(!expanded);
  };

  // If the character count exceeds the specified limit, truncate the content
  const truncatedContent = expanded ? children : `${children.slice(0, characterCount)}...`;

  return (
    <div className='flex flex-wrap'>
      <p>
        {truncatedContent}

      {children.length > characterCount && (
        <Button variant={'link'} className='py-0 h-2' onClick={toggleReadMore}>
          {expanded ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </p>
    </div>
  );
};

export default ReadMore;