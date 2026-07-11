import { defineQuery } from 'next-sanity'
import NewsletterSignupCard from './cards/newsletter'
import { sanityFetch } from '@/sanity/live';

const PRIVACY_NEWSLETTER_QUERY = defineQuery(`*[_type == "general"][0]{
  privacy,
  terms
}`)

async function ScholarshipSection() {
  const { data: privacyData } = await sanityFetch({ query: PRIVACY_NEWSLETTER_QUERY });

  return (
    <div className='w-full flex justify-end my-5'>
      <NewsletterSignupCard terms={privacyData?.terms ?? ""} privacy={privacyData?.privacy ?? ""}/>
    </div>
  )
}

export default ScholarshipSection