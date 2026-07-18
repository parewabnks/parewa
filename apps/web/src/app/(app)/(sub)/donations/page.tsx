import { sanityFetch } from '@/sanity/live';
import { defineQuery } from 'next-sanity'

const ARTICLES_QUERY = defineQuery(`
  *[_type == "scholarship"]
`)
function Page() {

  return (
    <div className='min-h-screen mx-5'>
      <div className="mb-4 font-heading text-2xl uppercase underline decoration-1 decoration-muted underline-offset-4 sm:mb-6 sm:text-3xl lg:text-5xl">
        Support Our Students
      </div>
    </div>
  )
}

export default Page