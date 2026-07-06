import Navbar from '@/components/home/navbar'
import { sanityFetch } from '@/sanity/live';
import { defineQuery } from 'next-sanity'
import React from 'react'

const ARTICLES_QUERY = defineQuery(`*[_type == "general"][0]{
  categories[]->{
    title
  },
  links[]->{
    title,
    link
  }
}`)

async function Page() {

  const { data } = await sanityFetch({ query: ARTICLES_QUERY });

  const categories =
    data?.categories
      ?.map((category) => category.title)
      .filter((title): title is string => title != null) ?? [];

  const links =
    data?.links
      ?.map((link) => ({ title: link.title, link: link.link }))
      .filter((link):
        link is { title: string; link: string } => link.title != null && link.link != null) ?? [];
  return (
    <div className='h-[150vh]'>
      <Navbar categories={categories} links={links} />
    </div>
  )
}

export default Page