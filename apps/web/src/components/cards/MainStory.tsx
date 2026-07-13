import Image from 'next/image'
import Link from 'next/link';

interface Props {
  _id: string;
  featured_image: string;
  title: string;
  author: string;
  one_liner: string;
  tag: string;
  orientation?: 'left' | 'right';
}

function MainStory({ _id, featured_image, title, author, one_liner, tag, orientation = 'left' }: Props) {
  return (
    <Link className={`w-full flex flex-col gap-5 md:h-82 ${orientation === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'}`} href={`/articles/article?id=${_id}`}>
      <div className="image relative w-full h-64 md:h-auto md:w-1/2">
        <Image
          src={featured_image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className='flex flex-col gap-3 group cursor-pointer w-full md:w-1/2'>
        <div className='bg-tertiary w-20 h-3'></div>
        <div className="tag text-lg md:text-xl text-primary">
          {tag.replace("#", "").charAt(0).toUpperCase() + tag.replace("#", "").slice(1)}
        </div>
        <div className="title font-heading text-2xl sm:text-3xl md:text-4xl text-foreground group-hover:text-primary">
          {title}
        </div>
        <div className="author font-extralight text-sm md:text-md text-primary font-mono">
          {author}
        </div>
        <div className="author font-light text-foreground w-full sm:w-[80%] group-hover:text-primary font-serif">
          {one_liner}
        </div>
      </div>
    </Link>
  )
}

export default MainStory