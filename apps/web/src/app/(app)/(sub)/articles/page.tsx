import { sanityFetch } from "@/sanity/live";
import { defineQuery } from "next-sanity";

interface Props {
  searchParams: Promise<{
    category?: string;
  }>;
}

const ARTICLES_QUERY = defineQuery(`
  *[_type == "article" && category->slug.current == $categorySlug]
  | order(_createdAt desc)[0...7]{
    _id,
    title,
    one_liner,
    tags,
    _createdAt,
    featured_image,
    "categoryTitle": category->title,
    "categorySlug": category->slug.current,
    "author": author->
  }
`)

async function Page({ searchParams }: Props) {

  const SearchParams = await searchParams;

  const categorySlug = SearchParams.category;

  const { data: article } = await sanityFetch({ query: ARTICLES_QUERY, params: { categorySlug } });

  return (
    <div className="min-h-screen px-10">
      <div className="font-heading text-5xl">{categorySlug?.toUpperCase()}</div>
    </div>
  );
}

export default Page;