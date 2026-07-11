import { defineQuery } from 'next-sanity'

import MainStory from '@/components/home/cards/main_story'

import SideCalendar from '@/components/home/cards/side_calendar'

import { sanityFetch } from '@/sanity/live';

import { urlFor } from '@/sanity/image';

import get_author_name from '@/helpers/get_author_name';

const MAIN_ARTICLES_QUERY = defineQuery(`*[_type == "article"] | order(_createdAt desc)[0...3]{
  _id,
  title,
  one_liner,
  featured_image,
  "author": author->,
  tags,
  _createdAt
}`)

const ORIENTATIONS = ['left', 'right', 'left'] as const

async function Main() {

  const { data } = await sanityFetch({ query: MAIN_ARTICLES_QUERY });

  const stories = data.map((item, i) => ({
    _id: item._id,
    featured_image: item.featured_image ? urlFor(item.featured_image).url() : "",
    title: item.title || "",
    author: get_author_name(item.author) || "",
    one_liner: item.one_liner || "",
    tag: item.tags ? item.tags[0] : "",
    orientation: ORIENTATIONS[i],
  }))

  return (
    <div className='pt-10 font-bold w-full'>
      <span className='text-4xl md:text-5xl font-heading'>
        Top Stories
      </span>

      <div className="flex justify-between my-6 gap-5 md:gap-0 flex-col md:flex-row">
        <div className='flex flex-col w-full xl:max-w-[55vw] gap-10'>
          {stories.map((story, i) => (
            
            <MainStory key={i} {...story} />
          ))}
        </div>

        <SideCalendar />
      </div>
    </div>
  )
}
export default Main