import { defineQuery } from "next-sanity";

import { sanityFetch } from "@/sanity/live";

import { Header } from "@/components/layout/header";

import { urlFor } from "@/sanity/image";

import { Separator } from "@/components/ui/separator";

import Slider from "@/components/home/slider";

import ArticleSection from "@/components/home/article";

import Navbar from "@/components/layout/navbar";

import Main from "@/components/home/main";

import ScholarshipSection from "@/components/home/scholarship";

const SLIDER_QUERY = defineQuery(`*[_type == "general"][0]{
  siteTitle,
  sliders[]->{
    title,
    author,
    image
  },
  categories[]->{
    title
  },
  links[]->{
    title,
    link
  }
}`)

export default async function Home() {

  const { data } = await sanityFetch({ query: SLIDER_QUERY });

  const slides = data?.sliders?.map((slide) => ({
    title: slide.title || "",
    author: slide.author || "",
    image: slide.image ? urlFor(slide.image).url() : "https://placehold.co/1920x1080/png"
  })) ?? [];

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
    <div className="h-full">

      <Header title={data?.siteTitle} />

      <Slider data={{ slides }} />

      <div className="px-2 md:px-[5%] xl:px-[10%]">

        <Navbar categories={categories} links={links} className="3xl:mx-auto max-w-7xl" />

        <Main />

        <ArticleSection category={categories[0]} />

        <Separator />

        <ScholarshipSection />

        <ArticleSection category={categories[1]} />

        <Separator />

        <ArticleSection category={categories[2]} />

      </div>
    </div>
  );
}
