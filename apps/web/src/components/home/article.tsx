import { sanityFetch } from "@/sanity/live";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
import Link from "next/link";
import get_author_name from "@/helpers/get_author_name";
import { Teacher, Student, Alumni } from "@/sanity/types";
import { Separator } from "../ui/separator";

const ARTICLES_CARD_QUERY = defineQuery(`*[_type == "article" && category->title == $category] 
  | order(_createdAt desc)[0...4]{
    _id,
    title,
    one_liner,
    _createdAt,
    featured_image,
    "categoryTitle": category->title,
    "author": author->
  }`);

type Article = {
  _id: string;
  title: string;
  one_liner: string;
  _createdAt: string;
  featured_image: any;
  categoryTitle: string;
  author: Teacher | Student | Alumni | null;
};

async function ArticleSection({ category }: { category: string }) {
  const { data } = await sanityFetch({
    query: ARTICLES_CARD_QUERY,
    params: { category },
  });

  const articles = data as Article[];
  const [main, ...rest] = articles;

  if (!main) return null;

  return (
    <div className="w-full my-5 py-5">
      <div className="category font-heading text-6xl mb-8">
        {category}
      </div>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-2/3">
          <Separator />
          <MainArticleCard article={main} author={get_author_name(main.author) ?? ""} />
        </div>

        <div className="flex flex-col gap-6 w-full lg:w-1/3 h-full">
          {rest.map((article) => (
            <div key={article._id}>
              <Separator />
              <SideArticleCard key={article._id} article={article} author={get_author_name(article.author) ?? ""} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArticleSection;

function MainArticleCard({
  article,
  author,
}: {
  article: Article;
  author: string;
}) {
  return (
    <Link href={`/article/${article._id}`} className="group block mt-3">
      <div className="relative w-full aspect-video overflow-hidden rounded-none">
        {article.featured_image && (
          <Image
            src={urlFor(article.featured_image).url()}
            alt={article.title}
            fill
            className="object-cover transition-transform"
          />
        )}
      </div>
      <div className="font-heading text-4xl mt-3  group-hover:text-primary ">
        {article.title}
      </div>
      <div className="author font-extralight text-md text-primary mt-1 font-mono">
        {author}
      </div>
    </Link>
  );
}

function SideArticleCard({ article, author }: { article: Article, author: string }) {
  return (
    <Link href={`/article/${article._id}`} className="group flex gap-3 mt-3">
      <div className="relative w-48 h-32 shrink-0 overflow-hidden rounded-none">
        {article.featured_image && (
          <Image
            src={urlFor(article.featured_image).width(200).height(140).url()}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        )}
      </div>
      <div>
        <h3 className="font-heading text-xl line-clamp-2  group-hover:text-primary ">
          {article.title}
        </h3>
        <div className="author font-extralight text-md text-primary mt-1 font-mono">
          {author}
        </div>
      </div>
    </Link>
  );
}