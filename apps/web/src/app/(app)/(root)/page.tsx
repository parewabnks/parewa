import { sanityFetch } from "@/sanity/live";
import { defineQuery } from "next-sanity";

import { Header } from "@/components/layout/Header";
import Slider from "@/components/home/Slider";
import { urlFor } from "@/sanity/image";
import { slideSchema } from "@/schemas/backend_schemas/slideSchema";

const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "general"][0]{
    logoText,
    sliders[]->{
      title,
      author,
      image
    },
    categories[]->{
    "slug": slug.current,
     title 
    },
    supportUs->{
      label,
      openInNewTab,
      url
    },
    about->{
      label,
      openInNewTab,
      url
    },
  }
`)

export default async function Home() {

  const { data: home } = await sanityFetch({ query: HOME_PAGE_QUERY });

  const slides = home?.sliders?.flatMap((slide) => {
    const parsed = slideSchema.safeParse(slide);
    if (!parsed.success) return [];

    return [{
      title: parsed.data.title,
      author: parsed.data.author,
      image: slide.image ? urlFor(slide.image).url() : "https://placehold.co/1920x1080/png"
    }];
  }) || [];

  return (
    <div className="h-full">
      <Header title={home?.logoText ?? ""} />

      <Slider slides={slides} />

      <div className="px-2 md:px-[5%] xl:px-[10%]">
        
      </div>
    </div>
  );
}