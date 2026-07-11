import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import get_author_name from "@/helpers/get_author_name";

type RelatedArticle = {
  _id: string;
  title: string | null;
  one_liner: string | null;
  featured_image: any;
  author?: any;
};

function ArticleRow({ article }: { article: RelatedArticle }) {
  return (
    <Link
      href={`/articles/article?id=${article._id}`}
      className="group flex flex-col sm:flex-row gap-4 sm:gap-6 items-start mb-5"
    >
      {article.featured_image && (
        <div className="relative w-full sm:w-90 sm:shrink-0 aspect-4/3 sm:aspect-video overflow-hidden">
          <Image
            src={urlFor(article.featured_image).width(800).height(600).url()}
            alt={article.title ?? ""}
            fill
            sizes="(min-width: 640px) 360px, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col justify-center">
        <div className="font-heading text-xl sm:text-3xl leading-snug">
          {article.title}
        </div>
        <div className="font-mono text-sm text-primary/70 mt-1">
          - {get_author_name(article.author ?? null)}
        </div>
        <div className="font-secondary text-sm sm:text-base text-foreground/70 mt-2 line-clamp-2">
          {article.one_liner}
        </div>
      </div>
    </Link>
  );
}

export default function RelatedArticles({
  articles,
  title = "Related Articles",
}: {
  articles: RelatedArticle[];
  title?: string;
}) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="related-articles max-w-3xl  mt-10">
      <div className="font-heading text-3xl sm:text-4xl uppercase underline underline-offset-4 decoration-1 decoration-muted mb-6">
        {title}
      </div>
      <div className="flex flex-col gap-8 sm:gap-10">
        {articles.map((article) => (
          <ArticleRow key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
}