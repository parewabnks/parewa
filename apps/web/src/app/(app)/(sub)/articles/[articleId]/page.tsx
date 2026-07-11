import { sanityFetch } from "@/sanity/live";

import { defineQuery } from "next-sanity";

import { notFound } from "next/navigation";

import Image from "next/image";

import AuthorDetailsCard from "@/components/articles/author_card";

import get_author_name from "@/helpers/get_author_name";

import { urlFor } from "@/sanity/image";

import { ArticleBody } from "@/components/misc/article_content";

import RelatedArticles from "@/components/articles/latest_articles";

const ARTICLE_QUERY = defineQuery(`*[_type == "article" && _id == $id][0]{
  ...,
  author->{
    ...,
    role->,
    position->
  },
  category->,
  "relatedArticles": *[
    _type == "article" &&
    _id != ^._id &&
    category._ref == ^.category._ref
  ] | order(_createdAt desc)[0...2]{
    _id,
    title,
    one_liner,
    featured_image,
    _createdAt,
    author->{
      ...,
      role->,
      position->
    }
  }
}`)

async function Page({ searchParams }: { searchParams: Promise<{ id: string }> }) {

  const params = await searchParams;

  const id = await params.id || "";

  if (id == null || id == "") {
    notFound()
  }

  const { data: article } = await sanityFetch({ query: ARTICLE_QUERY, params: { id } });

  return (
    <div className="max-w-5xl p-2 md:p-0 min-h-screen lg:ml-12">
      <div className="article pt-6 sm:pt-10 max-w-3xl mx-auto lg:mx-0">
        <div className="title font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl uppercase underline underline-offset-4 decoration-1 decoration-muted leading-tight">
          {article?.title}
        </div>
        <div className="flex flex-col text-base mt-4 sm:mt-6">
          <div className="author_component">
            <div className="one_liner font-secondary sm:text-lg md:text-xl leading-relaxed text-foreground/60">
              {article?.one_liner}
            </div>
            <div className="flex flex-col py-3 sm:py-4 gap-4">
              <AuthorDetailsCard
                name={get_author_name(article?.author ?? null) ?? ""}
                date={article?._createdAt ?? ""}
                role={article?.author?.role?.name ?? ""}
                position={article?.author?.position?.name ?? ""}
                display_image={
                  article?.author?.display_picture
                    ? urlFor(article.author.display_picture).url()
                    : ""
                }
                tags={article?.tags ?? []}
              />
            </div>
          </div>
        </div>
        <div className="content mt-2">
          {article?.featured_image && (
            <div className="relative w-full aspect-video mb-6 overflow-hidden rounded-none">
              <Image
                src={urlFor(article.featured_image).width(1600).height(900).url()}
                alt={article.title ?? ""}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          )}
          <ArticleBody content={article?.content} />
        </div>
      </div>
      <div className="related-articles">
        <RelatedArticles articles={article?.relatedArticles ?? []} />
      </div>
    </div>
  )
}

export default Page