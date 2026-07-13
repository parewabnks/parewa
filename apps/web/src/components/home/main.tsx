import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/live';
import MainStory from '../cards/MainStory';
import { mainSchema } from '@/schemas/backend_schemas/mainSchema';
import { urlFor } from '@/sanity/image';
import SideCalendar from '../cards/SideCalendar';

const MAIN_ARTICLES_QUERY = defineQuery(`
  *[_type == "article"] | order(_createdAt desc)[0...3]{
    _id,
    slug,
    title,
    oneLiner,
    featuredImage,
    "author": author->{
    _id,
    _type,
    "displayName": select(
      _type == "student" => roll + " " + fullName,
      _type == "teacher" => fullName,
      _type == "alumni" => roll + " " + fullName,
      fullName
      ),
    },
    tags,
    publishedAt
  }
`)

const ORIENTATIONS = ['left', 'right', 'left'] as const

async function Main() {

  const { data } = await sanityFetch({ query: MAIN_ARTICLES_QUERY });

  console.log(data)

  const parsedArticles = mainSchema.safeParse(data);

  console.log(parsedArticles)

  const stories = parsedArticles.success
    ? parsedArticles.data.map((article, index) => {
      const firstTag = article.tags?.find((tag) => typeof tag === 'string');

      return {
        _id: article._id,
        featured_image: article.featuredImage
          ? urlFor(article.featuredImage).url()
          : 'https://placehold.co/960x640/png',
        title: article.title,
        author: article.author.displayName,
        one_liner: article.oneLiner ?? '',
        tag: typeof firstTag === 'string' ? firstTag : 'news',
        orientation: ORIENTATIONS[index % ORIENTATIONS.length],
      };
    })
    : [];

  return (
    <div className='pt-10 font-bold w-full'>
      <span className='text-4xl md:text-5xl font-heading'>
        Top Stories
      </span>

      <div className="flex justify-between my-6 gap-5 md:gap-0 flex-col md:flex-row">
        <div className='flex flex-col w-full xl:max-w-[55vw] gap-3'>
          {stories.map((story) => (
            <MainStory
              key={story._id}
              _id={story._id}
              featured_image={story.featured_image}
              title={story.title}
              author={story.author}
              one_liner={story.one_liner}
              tag={story.tag}
              orientation={story.orientation}
            />
          ))}
        </div>
        {/* Sidecalendar */}

        <SideCalendar />
      </div>
    </div>
  )
}

export default Main