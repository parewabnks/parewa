import { sanityFetch } from '@/sanity/live';

import Link from 'next/link';

import { SocialInt } from '@/types/social';

import { defineQuery } from 'next-sanity'

import Social from '../misc/social';
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

async function Footer() {

  const { data } = await sanityFetch({ query: FOOTER_QUERY });

  const socials = (data?.socials ?? []).filter(
    (s): s is SocialInt =>
      !!s.icon?.name && !!s.icon?.provider && !!s.link && !!s.title
  );

  return (
    <footer className='p-5 relative bg-gray-800 text-white mt-5 pt-20'>
      <div className="max-w-4xl mx-auto flex flex-col">
        <div className="flex justify-between border-b border-gray-700 py-5">
          <div className="flex flex-col">
            <h2 className="text-4xl font-bold mb-4 font-oswald text-white text-center md:text-left">PAREWA</h2>
            <p className="text-sm text-gray-300 mb-6 font-roboto mx-auto md:mx-0 max-w-xs text-center md:text-left ">
              {data?.text}
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              {socials !== null && socials.map((social: SocialInt) => (
                <Social key={social.link} social={social} />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-semibold mb-4 text-white text-center md:text-left">Categories</h3>
            {data?.categories?.map((category) => (
              <div key={category.title} className="mb-2">
                <Link href={`/articles?category=${category.title?.toLowerCase()}`} className="hover:text-white transition-colors duration-200">
                  {category.title}
                </Link>
              </div>
            ))}
          </div>
          <div></div>
        </div>
        <div className="flex py-5">
          <FooterNewsletter />
        </div>
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400 text-xs">
          <p>PAREWA © {new Date().getFullYear()} All rights reserved</p>
          <p>6229 Suyog</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer