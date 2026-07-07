import { sanityFetch } from '@/sanity/live';

import Link from 'next/link';

import { SocialInt } from '@/types/social';

import { defineQuery } from 'next-sanity'

import Social from '@/components/misc/social';

import FooterNewsletter from './footer_newsletter';

const FOOTER_QUERY = defineQuery(`*[_type == "footer"][0]{
  text,
  categories[]->{
    title
  },
  socials[]->{
    icon{
      name,
      provider
    },
    link,
    title
  }
}`)

const PRIVACY_QUERY = defineQuery(`*[_type == "general"][0]{
  privacy
}`)

async function Footer() {

  const { data } = await sanityFetch({ query: FOOTER_QUERY });

  const { data: privacyData } = await sanityFetch({ query: PRIVACY_QUERY });

  const socials = (data?.socials ?? []).filter(
    (s): s is SocialInt =>
      !!s.icon?.name && !!s.icon?.provider && !!s.link && !!s.title
  );

  return (
    <footer className='p-5 relative bg-tertiary text-primary-foreground mt-5 pt-20'>
      <div className="max-w-4xl mx-auto flex flex-col">
        <div className="flex flex-col md:flex-row justify-start gap-10 md:gap-20 border-b border-muted-foreground/40 py-5">
          <div className="flex flex-col">
            <h2 className="text-4xl font-bold mb-4 font-oswald text-primary-foreground text-center md:text-left font-heading">PAREWA</h2>
            <p className="text-sm text-primary-foreground mb-6 font-roboto mx-auto md:mx-0 max-w-xs text-center md:text-left ">
              {data?.text}
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              {socials !== null && socials.map((social: SocialInt) => (
                <Social key={social.link} social={social} />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-semibold mb-3 text-primary-foreground text-center md:text-left">Categories</h3>
            {data?.categories?.map((category) => (
              <div key={category.title} className="mb-2 text-center md:text-start">
                <Link href={`/articles?category=${category.title?.toLowerCase()}`} className="text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-200 space-y-2 text-sm text-center md:text-left">
                  {category.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <FooterNewsletter privacyPolicyLink={privacyData?.privacy ?? ""} />
        
        <div className="mt-10 border-t border-muted-foreground/40 pt-6 text-center text-muted-foreground text-xs">
          <p>PAREWA © {new Date().getFullYear()} All rights reserved</p>
          <p>6229 Suyog</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer