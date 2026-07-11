import { PortableText, type PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-6 mb-3">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-5 mb-2">{children}</h2>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed font-serif text-lg">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 italic my-4">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} className="underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
  },
};

export function ArticleBody({ content }: { content: any }) {
  return <PortableText value={content} components={components} />;
}