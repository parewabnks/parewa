import { defineQuery } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";

import { PortableText } from "@portabletext/react";
import { ArticleSchema } from "@/schemas/backend_schemas/articleSchema";
import { portableTextComponents } from "@/lib/portable-text";
import { sanityFetch } from "@/sanity/live";
import { urlFor } from "@/sanity/image";
import AuthorDetailsCard from "@/components/cards/AuthorDetailsCard";
import LatestCard from "@/components/cards/LatestCard";
import CategoryArticlesSection from "@/components/cards/CategoryArticles";

const ARTICLE_DETAIL_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug][0]{
    ...,
    "slug": slug.current,
    author->{
      ...,
      "role": role->title,
      "position": position->title,
      "department": department->title,
      "house": house->title,
      "displayName": select(
        _type == "student" => roll + " " + fullName,
        _type == "teacher" => fullName,
        _type == "alumni" => roll + " " + fullName,
        fullName
      )
    },
    category->{
      _id,
      title,
      "slug": slug.current
    },
    "relatedArticles": *[
      _type == "article" &&
      _id != ^._id &&
      category._ref == ^.category._ref
    ] | order(publishedAt desc)[0...3]{
      _id,
      "slug": slug.current,
      title,
      oneLiner,
      featuredImage,
      publishedAt,
      tags,
      category->{
        _id,
        title,
        "slug": slug.current
      },
      author->{
        ...,
        "role": role->title,
        "position": position->title,
        "department": department->title,
        "house": house->title,
        "displayName": select(
          _type == "student" => roll + " " + fullName,
          _type == "teacher" => fullName,
          _type == "alumni" => roll + " " + fullName,
          fullName
        )
      }
    },
    "latestArticles": *[
      _type == "article" &&
      _id != ^._id
    ] | order(publishedAt desc)[0...2]{
      _id,
      "slug": slug.current,
      title,
      oneLiner,
      featuredImage,
      publishedAt,
      tags,
      category->{
        _id,
        title,
        "slug": slug.current
      },
      author->{
        ...,
        "role": role->title,
        "position": position->title,
        "department": department->title,
        "house": house->title,
        "displayName": select(
          _type == "student" => roll + " " + fullName,
          _type == "teacher" => fullName,
          _type == "alumni" => roll + " " + fullName,
          fullName
        )
      }
    }
  }
`);

interface Props {
  searchParams: Promise<{
    id?: string;
  }>;
}

export default async function Page({ searchParams }: Props) {

  const { id: slug } = await searchParams;

  if (!slug) notFound();

  const { data } = await sanityFetch({ query: ARTICLE_DETAIL_QUERY, params: { slug } });

  const parsed = ArticleSchema.safeParse(data);

  if (!parsed.success) notFound();

  const article = parsed.data;

  return (
    <article className="mx-auto flex min-h-screen w-full max-w-352 flex-col gap-3 px-4 py-6 sm:px-6 md:px-8 lg:px-10 lg:py-8">
      <div className="title w-full max-w-3xl font-heading text-2xl leading-tight uppercase underline decoration-1 decoration-muted underline-offset-4 sm:text-3xl md:text-4xl lg:text-5xl">
        {article?.title}
      </div>
      <div className="one_liner w-full max-w-3xl font-secondary text-base leading-relaxed text-foreground/60 sm:text-lg md:text-xl lg:text-2xl">
        {article?.oneLiner}
      </div>
      <div className="authors-details w-full max-w-4xl">
        <AuthorDetailsCard
          displayName={article?.author?.displayName}
          role={article?.author?.role}
          publishedAt={article.publishedAt}
          tags={article?.tags ?? []}
          displayPictureUrl={article?.author?.displayPicture ? urlFor(article?.author?.displayPicture).url() : ""}
        />
      </div>
      <div className="featured-image relative aspect-video w-full max-w-4xl overflow-hidden rounded-sm">
        {article?.featuredImage && (
          <Image
            src={urlFor(article.featuredImage).url()}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-cover"
          />
        )}
      </div>
      {article?.imageDescription && (
        <div className="my-2 w-full max-w-4xl font-mono text-sm text-muted-foreground">
          {article.imageDescription}
        </div>
      )}
      <div className="main flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
        <div className="content min-w-0 flex-1">
          <div className="portable-text">
            <PortableText
              value={article.content}
              components={portableTextComponents}
            />
          </div>
        </div>
        <div className="latest w-full shrink-0 lg:sticky lg:top-12 lg:mt-10 lg:w-64">
          <div className="mb-4 font-heading text-xl uppercase sm:text-2xl lg:mb-6">
            Latest Articles
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {article?.latestArticles?.map((latestArticle) => (
              <LatestCard key={latestArticle._id} article={latestArticle} />
            ))}
          </div>
        </div>
      </div>
      <div className="related flex w-full max-w-4xl flex-col gap-4">
        <div className="mb-4 font-heading text-2xl uppercase underline decoration-1 decoration-muted underline-offset-4 sm:mb-6 sm:text-3xl lg:text-5xl">
          Related Articles
        </div>
        {article?.relatedArticles?.map((relatedArticle) => (
          <CategoryArticlesSection key={relatedArticle._id} article={relatedArticle} />
        ))}
      </div>
    </article>
  );
}