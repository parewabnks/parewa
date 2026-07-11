import React from 'react';

import { Badge } from '../ui/badge';

import Image from 'next/image';

interface AuthorCardProps {
  name: string;
  date: string;
  role: string;
  position: string;
  display_image: string;
  tags: string[];
}

export default function AuthorDetailsCard({ name, date, role, position, display_image, tags }: AuthorCardProps) {
  const formattedDate = new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div className="flex flex-col items-start gap-3 m-3">
      <div className='flex gap-3'>
        {display_image ? (
          <Image
            src={display_image}
            alt={name}
            width={48}
            height={48}
            className="h-18 w-18 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-medium text-foreground">
            {name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <span className="font-mono text-sm text-muted-foreground">
            Author of this Article
          </span>
          <span className="text-lg font-mono font-bold leading-none">{name}</span>
          <span className="font-mono text-md text-muted-foreground">
            Published: {formattedDate}
          </span>
        </div>
      </div>
      {tags.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="default"
              className="rounded-full bg-accent text-muted text-md ml-4 p-3 font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}