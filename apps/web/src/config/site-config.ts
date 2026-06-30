// Login to fetch the metadta from the content lake from sanity
import type { Metadata } from "next";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";


const METADATA_QUERY = defineQuery(`
  *[_type == "general"][0]{
    _id,
    metaTitle,
    metaDescription,
    title,
    terms,
    announcement->{
      _id,
      // whatever fields you actually need from the announcement doc
    },
    categories->{
      _id,
      // whatever fields you actually need from the category doc
    }
  }
`)

const { data: m_data } = await sanityFetch({ query: METADATA_QUERY });


export const metadata: Metadata = {
  title: m_data?.title,
  description: m_data.me,
};
